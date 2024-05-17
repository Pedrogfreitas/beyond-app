<template>
  <v-main>
    <Header/>
    <UserCrud/>
  </v-main>
</template>

<script>
import UserCrud from '@/components/UserCrud';
import Header from '@/components/Header.vue';

export default {
  name: 'App',

  components: {
    UserCrud,
    Header,
  },

  data: () => ({
    //
  }),
};
</script>