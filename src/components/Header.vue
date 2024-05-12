<template>
    <header>
      <div class="container">
        <h1>
          <a href="index.html">
            <img src="img/logo.png" alt="Beyond">
          </a>
        </h1>
        <nav>
          <ul class="principal">
            <v-btn @click="goTo('/Cursos')" class="mb-2 mr-2">Cursos</v-btn>
            <v-btn @click="goTo('/Users')" class="mb-2 mr-2">Alunos</v-btn>
            <v-btn @click="goTo('/Calendario')" class="mb-2 mr-2">Cronograma</v-btn>
            <v-btn @click="goTo('/Forum')" class="mb-2 mr-2">Fórum</v-btn>
            <v-btn @click="goTo('/Biblioteca')" class="mb-2 mr-2">Biblioteca</v-btn>
          </ul>
        </nav>
      </div>
    </header>
</template>