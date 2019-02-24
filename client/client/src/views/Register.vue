<template>

<div id="app">
    
  <div id="login">
    <div id="description">
      <h1>Register</h1>
    </div>
    <div id="form">
      <form @submit.prevent="sendPost('/register')">
        <label for="n_id">N-Number</label>
        <input type="text" id="n_id" v-model="input.n_id" placeholder="N-XXXXXXX" autocomplete="off">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="input.firstname" placeholder="eg. John" autocomplete="off">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="input.lastname" placeholder="eg. Smith" autocomplete="off">
        <label for="email">HawkMail</label>
        <input type="text" id="email" v-model="input.email" placeholder="me@hawkmail.newpaltz.edu" autocomplete="off">
        <label for="password">Password</label>&nbsp;
        <i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
        <input :type="passwordType" id="password" v-model="input.password" placeholder="**********">
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../dev.config.js';
export default {
    name: 'Register',
    data(){
        return {
            input : {
                
            }
        }
    },
    computed: {
      passwordType() {
        return this.hidePassword ? 'password' : 'text'
      },
      passwordIcon() {
        return this.hidePassword ? 'fa-eye' : 'fa-eye-slash'
      }
    },
    methods: {
        sendPost(slug){
            this.$http.post(`${api.api}${slug}`, this.input, { headers: { "content-type": "application/json" } }).then(result => {
                if(result.body.success == true){
                  alert("User was sucessfully created");
                  this.$router.push('/login');
                }else{
                  alert(result.body.message);
                }
            });
        }
    }
    
}
</script>

<style scoped>

</style>
