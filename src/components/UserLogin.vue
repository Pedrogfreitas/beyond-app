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
            label="Email"
            ></v-text-field>
            <v-text-field
            color="white"
            label="Senha"
            ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="purple darken-2"
          @click="createAcc">
            Registrar
          </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            color="purple darken-2"
            @click="login"
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
        email: "",
        password: "",
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      },
      createAcc() {
        this.$store.dispatch("create", {
          email: this.email,
          password: this.password,
        });
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