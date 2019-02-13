<template>
<div id="app">
  <div id="login">
    <div id="description">
      <h1>Login</h1>
      <h3>Register <router-link to="/register">here </router-link>if you do not have an account</h3>
    </div>
    <div id="form">
      <form @submit.prevent="sendPost('/login')">
        <label for="email">HawkMail</label>
        <input type="text" id="email" v-model="input.email" placeholder="me@hawkmail.newpaltz.edy" autocomplete="off">

        <label for="password">Password</label>&nbsp;
        <i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
        <input :type="passwordType" id="password" v-model="input.password" placeholder="**********">

        <button type="submit">Log in</button>
      </form>
    </div>
  </div>
</div>
</template>


<script>
export default {
    name: 'EOP',
    data () {
        return {
            showRegister: false,
            input: {
                    
            },
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
            this.$http.post(`http://localhost:3000/api/v1${slug}`, this.input, { headers: { "content-type": "application/json" } }).then(result => {
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
                                this.$route.push('/home');
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


<style scoped>
    .logout{
        float: right;
    }
</style>