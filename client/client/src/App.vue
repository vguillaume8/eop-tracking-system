<template>
  <div id="app" class="container">
    <div class="display-3">
       <a class="btn btn-sm btn-danger logout" v-on:click="logout">Logout</a>
      <img alt="Vue logo" src="./assets/logo.png" id="logo">
      
      
    </div>
    <Nav />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
//@import url("https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css");
// for registration page
@import url("https://fonts.googleapis.com/css?family=Nunito");
@import url("https://use.fontawesome.com/releases/v5.0.6/css/all.css");
@import "./css/style.css";

#logo { height: 50px;}
</style>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
export default {
  name: 'home',
  components: {
    Nav
  },
  methods: {
    logout(){
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.$router.push('/login');
      //location.reload();
    }
  }
}
</script>