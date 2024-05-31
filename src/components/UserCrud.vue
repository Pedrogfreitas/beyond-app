<template>
  <div class="containerMain">
  <v-data-table
    :headers="headers"
    :items="alunos"
    sort-by="nome"
    class="elevation"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de alunos Beyond</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <div>
          <v-dialog v-model="dialogName" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2 mr-2" v-bind="attrs" v-on="on" flat slot="activator">
                Lista Simplificada
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Alunos</v-card-title>
              <v-card-text>
                <v-container>
                  <div v-if="alunos.length > 0">
                    <ul>
                      <li v-for="(aluno, index) in alunos" :key="index">
                        <p>{{ aluno.name }}
                        <span v-if="aluno.reproved" style="color: red"> (Reprovado)</span>
                        <span v-else style="color: green"> (Aprovado)</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <p>Nenhum aluno encontrado.</p>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Adicionar aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome do aluno"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Número de celular"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Tem certeza que deseja deletar o registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:[`item.reproved`]="{ item }">
      <v-checkbox
        v-model="item.reproved"
        @change="saveReproved(item)"
      ></v-checkbox>
    </template>
  </v-data-table>
</div>
</template>
<script>
import { collection,
         getDocs, 
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc, 
        } from "firebase/firestore";
import { db } from '@/config/firebase';

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome do aluno',
          align: 'start',
          value: 'name',
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Número de celular', value: 'phoneNumber', sortable: false  },
        { text: 'CPF', value: 'cpf', },
        { text: 'Reprovado', value: 'reproved', },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      alunos: [
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        reproved: false,
      },
      defaultItem: {
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        reproved: false,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo aluno' : 'Editar informações'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.getDocsFromFirestore()
      },
      async getDocsFromFirestore() {
        this.loading = true
        this.alunos = []
        const querySnapshot = await getDocs(collection(db, "alunos"));
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          this.alunos.push(data);
        });
        this.loading = false
      },

      editItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await deleteDoc(doc(db, 'alunos', this.editedItem.id));
        this.getDocsFromFirestore();
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save() {
        if (
          !this.editedItem.name ||
          !this.editedItem.email ||
          !this.editedItem.phoneNumber ||
          !this.editedItem.cpf
        ) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }

        if (this.editedIndex > -1) {
          await updateDoc(
            doc(db, 'alunos', this.editedItem.id),
             this.editedItem
            );
          this.getDocsFromFirestore();

        } else {
          await addDoc(collection(db, 'alunos'), this.editedItem);
          this.getDocsFromFirestore();
        }
        this.close();
      },

      async saveReproved(item) {
        try {
          await updateDoc(
            doc(db, 'alunos', item.id),
            { reproved: item.reproved }
          );
          console.log('Status de reprovação atualizado com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar status de reprovação:', error);
        }
      },

    },
  }
</script>

<style>
.containerMain {
    background-color: #401580;
    border-radius: 1em;
    padding: 2em;
    margin: 5%;
    margin-top: 3%;
}

.header {
    background-color: #401580;
    padding: 1em 0;
}

body {
	margin: 0;
	padding: 0;
	font-family: 'arial';
	font-size: 62.5%;
}

body.infoBody{
  font-size:larger
}

.container {
	max-width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}

img{
    max-width: 30%;
}

header {
	background: #401580;
	padding: 1em 0;
}

h1 {
	margin: 0;
	padding: 0;
}

ul.principal {
	margin: 3% 0 0 0;
	padding: 0;
	list-style: none;
	font-size: 1.6em;
}

</style>