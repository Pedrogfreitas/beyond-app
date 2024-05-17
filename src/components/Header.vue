<template>
  <div>
    <header>
      <div class="container">
        <h1>
          <a href="index.html">
            <img src="img/logo.png" alt="Beyond">
          </a>
        </h1>
        <nav>
          <ul class="principal">
            <v-btn @click="toggleSidebar" color="purple darken-3" class="mt-3">
              <v-icon color="white">mdi-menu</v-icon>
            </v-btn>
          </ul>
        </nav>
      </div>
    </header>

    <v-navigation-drawer
      v-model="sidebar"
      app
      temporary
      right
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ user ? user.email : "Application" }}
          </v-list-item-title>
          <v-list-item-subtitle @click="signOut" style="cursor: pointer; color: blue;">
            Sign Out
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item @click="goTo('/Cursos')">
          <v-list-item-title>Cursos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Users')">
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Calendario')">
          <v-list-item-title>Cronograma</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Forum')">
          <v-list-item-title>Fórum</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Biblioteca')">
          <v-list-item-title>Biblioteca</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { auth } from '@/config/firebase'

export default {
  data() {
    return {
      sidebar: false,
      user: null,
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    signOut() {
      auth.signOut().then(() => {
        this.user = null;
        this.$router.push('/login');
      }).catch((error) => {
        console.error("Sign out error:", error);
      });
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
};
</script>
