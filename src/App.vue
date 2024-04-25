<template>
  <v-app>
    <v-main>
      <UserCrud/>
    </v-main>
  </v-app>
</template>

<script>
import UserCrud from './components/UserCrud';

export default {
  name: 'App',

  components: {
    UserCrud,
  },

  data: () => ({
    //
  }),
};
</script>