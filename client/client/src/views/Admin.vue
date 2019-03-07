<template>
<div>
  <h1> Admin Page </h1>
  <h4> Advisor </h4>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col" >Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in message" :key="m.id">
          <td>{{m.firstname + " " + m.lastname}}</td>
          <td>{{m.role}}</td>
          <td>{{m.email}}</td>
          <a class="btn btn-success" @click.prevent="changeRole(m.n_id)">Change Role </a>
          <a class="btn btn-primary" @click.prevent="editUser(m.n_id)"> Edit User </a>
          <a class="btn btn-danger" @click.prevent="deleteUser(m.n_id)"> Delete User </a>
        </tr>
      </tbody>
    </table>    
  </div>

  <modal name="role-modal" id="role-modal" height="auto">
    <select v-model="selected">
      <option value="">Select a role...</option>
      <option v-for="r in roles" :key="r.value" v-bind:value="{ value: r.value, text: r.name }">
        {{ r.name }}
      </option>
    </select>
    <a class=" btn btn-success" @click.prevent="sendPost()"> Change </a>
  </modal>
</div>
</template>




<script>
import api from '../../configs/dev.config.js';
export default {
  name: 'Admin',
  data () {
    return {
      message: "",
      selected: "student",
      userIDToChangeRole: "",
      roles: [
        {value: 'advisor',   name: 'Advisor'},
        {value: 'admin', name: 'Admin'},
        {value: 'student', name: 'Student'}
      ]
    }
  },

  mounted(){
    this.getUsers();
  },
  
  methods: {

    getUsers(){
      // get list of all  users
      this.$http.get(`${api.api}/user/`).then(result => {
        this.message = result.body;
        this.selected = result.body.role;
        this.$forceUpdate();
      });
    },

    changeRole(n_id){
      this.userIDToChangeRole = n_id;
      this.$modal.show('role-modal');
    },

    async sendPost(){
      let role = this.selected.value;
      role= {role};
      this.$modal.hide('role-modal');
      if (confirm("Do you want to change this role?")){
        await this.$http.post(`${api.api}/user/role/${this.userIDToChangeRole}`, role).then(result => {
          if(result.body.success == true){
            alert("User's role was updated!");
          }else{
            alert("Could not update user's role");
          }
        });
      }else{
        alert("User's role was not changed")
      }
      this.getUsers();
      this.$forceUpdate();
    },

    editUser(id){
      let editUserId = {id: id}
      localStorage.setItem('editUserId', JSON.stringify(editUserId));
      this.$router.push('edituser');
      this.$modal.show('user-modal');
    },

    async deleteUser(n_id){
      if(confirm("Do you want to delete this User?")){
        await this.$http.delete(`http://localhost:3000/api/v1/user/${n_id}`).then(result => {
          if(result.body.success == true){
            alert("User account was deleted!");
          }else{
            alert(result.body.methods);
          }
      })}else{
        alert("User's information was not changed");
      }

      this.getUsers();
      this.$forceUpdate();
    }
    
  }
}
</script>




