<template>
<div>

    <!-- Default horizontal form -->
<form @submit.prevent="sendPost('/register')">
  <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="N-id" class="col-sm-2 col-form-label">N-Number</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" v-model="input.n_id" id="N-id" placeholder="eg. N12345678">
    </div>
  </div>
  <!-- Grid row -->

   <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="first-name" class="col-sm-2 col-form-label">First Name</label>
    <div class="col-sm-10">
      <input type="test" class="form-control" v-model="input.firstname" id="first-name" placeholder="eg. John">
    </div>
  </div>
  <!-- Grid row -->

   <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="last-name" class="col-sm-2 col-form-label">Last Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" v-model="input.lastname" id="last-name" placeholder="eg. Smith">
    </div>
  </div>
  <!-- Grid row -->

     <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="email" class="col-sm-2 col-form-label">Hawk Mail</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" v-model="input.email" id="email" placeholder="me@hawkmail.newpaltz.edu">
    </div>
  </div>
  <!-- Grid row -->

   <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="password" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" v-model="input.password" id="password" placeholder="**********">
    </div>
  </div>
  <!-- Grid row -->

  <!-- Grid row -->
  <div class="form-group row">
    <!-- Default input -->
    <label for="confirm" class="col-sm-2 col-form-label">Confirm Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" v-model="confirmPassword" id="confirm" placeholder="**********">
    </div>
  </div>
  <!-- Grid row -->

  <!-- Grid row -->
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary btn-md">Register</button>
    </div>
  </div>
  <!-- Grid row -->
</form>
<!-- Default horizontal form -->
</div>
</template>


<script>
import api from '../../configs/dev.config.js';
export default {
  name: 'Register',
  data(){
    return {
      input : {},
      confirmPassword: ""
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

        if(this.input.password == this.confirmedPassword){
          alert("These Passwords Do Not Match")
        } else{
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
    
}
</script>

