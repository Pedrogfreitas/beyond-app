<template>
    <v-main>
      <UserLogin/>
    </v-main>
</template>

<script>
import UserLogin from '@/components/UserLogin';

export default {
  name: 'App',

  components: {
    UserLogin,
  },

  data: () => ({
    //
  }),
};
</script>