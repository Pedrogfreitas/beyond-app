<template>
    <div class="mainBlock">
        <v-card
        class="overflow-hidden"
        color="#401580"
        dark
        >
        <v-toolbar
            flat
            color="purple darken-2"
        >
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light">
            Login
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-text-field
            color="white"
            label="Nome completo"
            ></v-text-field>
            <v-text-field
            color="white"
            label="Senha"
            ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="purple darken-2">
            Registrar
          </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            color="purple darken-2"
            @click="save"
            >
            Logar
            </v-btn>
        </v-card-actions>
        <v-snackbar
            v-model="hasSaved"
            :timeout="2000"
            absolute
            bottom
            left
        >
            Logged sucessfully
        </v-snackbar>
        </v-card>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        hasSaved: false,
        model: null,
        logged: false,
      }
    },

    methods: {
      customFilter (item, queryText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {
        this.hasSaved = true
        this.logged = true
      },
    },
  }
</script>

<style>
.mainBlock{
    margin: 10% auto;
    max-width: 30%;

}
</style>