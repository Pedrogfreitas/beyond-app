<template>
  <v-data-table
    :headers="headers"
    :items="alunos"
    sort-by="nome"
    class="elevation"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
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
      ></v-checkbox>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
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
      alunos: [],
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
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        this.alunos = [
          {
            name: 'Pedro Gabriel',
            email: 'pedrogabriel123@gmail.com',
            phoneNumber: 912345678,
            cpf: '123.456.789-10',
            reproved: false,
          },
          {
            name: 'Felipe Sabino',
            email: 'felipesabino123@gmail.com',
            phoneNumber: 987654321,
            cpf: '109.876.543-21',
            reproved: false,
          },
          {
            name: 'Maria Silva',
            email: 'mariasilva123@gmail.com',
            phoneNumber: 923456789,
            cpf: '234.567.890-11',
            reproved: false,
          },
          {
            name: 'José Santos',
            email: 'josesantos456@gmail.com',
            phoneNumber: 934567890,
            cpf: '345.678.901-22',
            reproved: true,
          },
          {
            name: 'Ana Souza',
            email: 'anasouza789@gmail.com',
            phoneNumber: 945678901,
            cpf: '456.789.012-33',
            reproved: false,
          },
          {
            name: 'Rafael Oliveira',
            email: 'rafaoliveira123@gmail.com',
            phoneNumber: 956789012,
            cpf: '567.890.123-44',
            reproved: true,
          },
          {
            name: 'Carla Mendes',
            email: 'carlamendes456@gmail.com',
            phoneNumber: 967890123,
            cpf: '678.901.234-55',
            reproved: true,
          },
          {
            name: 'Lucas Almeida',
            email: 'lucasalmeida789@gmail.com',
            phoneNumber: 978901234,
            cpf: '789.012.345-66',
            reproved: false,
          },
          {
            name: 'Camila Costa',
            email: 'camilacosta123@gmail.com',
            phoneNumber: 989012345,
            cpf: '890.123.456-77',
            reproved: false,
          },
          {
            name: 'Rodrigo Santos',
            email: 'rodrigosantos456@gmail.com',
            phoneNumber: 998765432,
            cpf: '901.234.567-88',
            reproved: true,
          }
        ]
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

      deleteItemConfirm () {
        this.alunos.splice(this.editedIndex, 1)
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.alunos[this.editedIndex], this.editedItem)
        } else {
          this.alunos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
