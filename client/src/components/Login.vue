<template>
<div>
    <form @submit.prevent="sendPost('/login')">
        <div id="description">
        <h1>Login</h1>
        <h3>Register <router-link to="/register">here </router-link>if you do not have an account</h3>
        </div>
            <!-- Material input -->
        <div class="md-form">
        <i class="fas fa-envelope prefix"></i>
        <input type="text" id="email"  v-model="input.email" class="form-control" placeholder="me@hawkmail.newpaltz.edu">
        <label for="email"></label>
        </div>

        <!-- Material input -->
        <div class="md-form">
        <i class="fas fa-lock prefix"></i>
        <input type="password" id="password" v-model="input.password" class="form-control validate" placeholder="Type your password">
        <label for="password" data-error="wrong" data-success="right"></label>
        </div>
        <button type="submit" class="btn btn-primary btn-md">Login</button>
    </form>
</div>
</template>

<script>
/* eslint-disable */ 

import api from '../../configs/dev.config.js';
export default {
  name: 'Login',
  data () {
    return {
      showRegister: false,
      input: {},
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
          let userType = result.body.user.role;
          localStorage.setItem('user', JSON.stringify(result.body.user));
          localStorage.setItem('jwt', result.body.token);
          
          if(localStorage.getItem('jwt') != null){
            this.$emit('loggedIn');
            
            if(this.$route.params.nextUrl != null){
              this.$router.push(this.$route.params.nextUrl)
            }else {

              if(userType == 'advisor'){
                this.$router.push('/advisor');
              }else if(userType == 'admin'){
                this.$router.push('/admin');
              }else{
                this.$router.push('/');
              }
            }
          }
          
          alert("You have successfully logged in to your account");
        }else{
          alert(result.body.message);
        }
               
      })
    },
        
    logout(){ 
      localStorage.removeItem('user');
    }

  }
}
</script>
