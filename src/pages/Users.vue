<template>
    <v-main>
      <UserCrud/>
    </v-main>
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