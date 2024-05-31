<template>
  <v-main class="mainBackground">
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

<style>
.mainBackground {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh; 
}
</style>
