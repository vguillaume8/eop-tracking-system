<template>

<div id="app">
  <div id="login">
    <div id="description">
      <h1>Edit User</h1>
      <a class="btn btn-danger" @click.prevent="deleteUser(userData.n_id)"> Delete User </a>
    </div>
    <div id="form">
      <form>
        <label for="n_id">N-Number</label>
        <input type="text" id="n_id" v-model="userData.n_id" placeholder="N-XXXXXXX" autocomplete="off">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="userData.firstname" autocomplete="off">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname"  v-model="userData.lastname" placeholder="eg. Smith" autocomplete="off">
        <label for="email">HawkMail</label>
        <input type="text" id="email" v-model="userData.email" placeholder="me@hawkmail.newpaltz.edu" autocomplete="off">
        <label for="year">Year</label>
        <input type="text" id="year" v-model="userData.year" placeholder="year" autocomplete="off">
        <button type="submit" @click.prevent="updateUser(userData.n_id)">Save</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "EditUser",
    data(){
        return{
            userData: {}
        }
    },
    mounted(){
        this.getUser();
    },
    methods: {
        async getUser(){
            let editUserID = JSON.parse(localStorage.getItem('editUserId'));

            await this.$http.get(`http://localhost:3000/api/v1/user/${editUserID.id}`).then(result => {
                this.userData = result.body;
            })
        },

        async updateUser(n_id){
            if (confirm("Do you want to update this User's information?")) {
                await this.$http.post(`http://localhost:3000/api/v1/user/${n_id}`, this.userData).then(result => {

                    if(result.body.success == true){
                        alert("User's information was updated!");
                        this.userData = result.body.user;
                        this.$router.push('/admin');
                    }else{
                        alert(result.body.message);
                    }
                })
            }else{
                alert("User's information was not changed");
            }
            
        },

        deleteUser(n_id){
            if(confirm("Do you want to delete this User?")){
                this.$http.delete(`http://localhost:3000/api/v1/user/${n_id}`).then(result => {

                    if(result.body.success == true){
                        alert("User account was deleted!");
                        this.$router.push('/admin');
                    }else{
                        alert(result.body.methods);
                    }
                })
            }else{
                alert("User's information was not changed");
            }
        }
    }
}
</script>
