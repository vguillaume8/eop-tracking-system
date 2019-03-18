<template>
  <section id="tables">
    <div>
  <h1> Admin Page </h1>
    <select  @change="onManage($event)">
  <option value="">Manage</option>
  <option value="upload">Upload User Info</option>
</select>
  <h4> Users </h4>

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

    <mdb-modal size="lg" v-if="uploadStudentInfoModal" @close="uploadStudentInfoModal = false">
        <mdb-modal-header>
            <mdb-modal-title>{{}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
         <form>
           <form enctype="multipart/form-data">
            <input type="file" name="file" v-on:change="fileChange($event.target.files)" accept="csv" required />
            <button class="btn btn-primary" type="button" v-on:click="upload()">Upload</button>
        </form>
         </form>

        </mdb-modal-body> 
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="uploadStudentInfoModal = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
  </section>

  
</template>

<script>
import axios from "axios";
import api from '../../configs/dev.config.js';
import PictureInput from 'vue-picture-input';import FileUpload from 'vue-simple-upload/dist/FileUpload'

import {mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue';
export default {
  name: 'Admin',
  data () {
    return {
      message: "",
      files: new FormData(),
      selected: "student",
      userIDToChangeRole: "",
      uploadStudentInfoModal: false,
      roles: [
        {value: 'advisor',   name: 'Advisor'},
        {value: 'admin', name: 'Admin'},
        {value: 'student', name: 'Student'}
      ]
    }
  },
    components: {
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
        mdbBtn,
        mdbContainer,
        mdbCol,
        mdbRow,
        
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
      this.$router.push('profile');
      this.$modal.show('user-modal');
    },

    async deleteUser(n_id){
      if(confirm("Do you want to delete this User?")){
        await this.$http.delete(`${api.api}/user/${n_id}`).then(result => {
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
    },

    onManage(event){
      if(event.target.value){
        this.uploadStudentInfoModal = true;
      }
    },

    fileChange(fileList) {
        this.files.append("file", fileList[0], fileList[0].name);
    
    },
    async upload() {
        await axios({ method: "POST", "url": `${api.api}/data/student`, "data": this.files }).then(result => {
           console.log(result);
           if(result.data.success == true){
              alert(result.data.message);
              this.uploadStudentInfoModal = false;
              

            }else{
              alert(result.data.message);
            }
        }
        );

        this.$forceUpdate();
    }
    
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}
</style>
