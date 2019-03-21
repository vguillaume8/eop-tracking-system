<template>
  <section id="tables">
    <div>
      <h1> Admin Page </h1>
      <select  @change="onManage($event)">
        <option value="">Manage</option>
        <option value="upload">Upload User Info</option>
        <option value="downloadAll">Download All Student Data</option>
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
            <tr v-for="u in users" :key="u.id">
              <td>{{u.firstname + " " + u.lastname}}</td>
              <td>{{u.role}}</td>
              <td>{{u.email}}</td>
              <a class="btn btn-success" @click.prevent="changeRole(u.n_id)">Change Role </a>
              <a class="btn btn-primary" @click.prevent="editUser(u.n_id)"> Edit User </a>
              <a class="btn btn-danger" @click.prevent="deleteUser(u.n_id)"> Delete User </a>
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
      <a class=" btn btn-success" @click.prevent="sendRoleChange()"> Change </a>
    </modal>

    <mdb-modal size="lg" v-if="uploadStudentInfoModal" @close="uploadStudentInfoModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Upload Student List</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form enctype="multipart/form-data">
          <input type="file" name="file" v-on:change="fileChange($event.target.files)" accept="csv" required />
          <button class="btn btn-primary" type="button" v-on:click="upload()">Upload</button>
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
import PictureInput from 'vue-picture-input';
import FileUpload from 'vue-simple-upload/dist/FileUpload'
import {mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue';

export default {

  name: 'Admin',
  data () {
    return {
      users: "", // All of the users in the database
      files: new FormData(), //  for file upload processing
      selected: "student", // default option for user role change
      userIDToChangeRole: "", // the id of the user role change
      uploadStudentInfoModal: false, // currently hidden

      // For user role change
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
    // Receives list of users when this page is loaded
    this.getUsers();
  },
  
  methods: {

    // get list of all  users
    getUsers(){
      this.$http.get(`${api.api}/user/`).then(result => {
        this.users = result.body;
        this.selected = result.body.role;
        this.$forceUpdate();
      })
    },

    // Sets user role id and opens role change modal
    changeRole(n_id){
      this.userIDToChangeRole = n_id; // sets the id of the user role change
      this.$modal.show('role-modal'); // shows the user role change  modal
    },

    // Sends the role change to the server
    async sendRoleChange(){
      let role = this.selected.value; // retrieves value from option list
      role= {role}; // parses to object
      this.$modal.hide('role-modal'); // hides the modal

      // Asks the user for confirmation
      if (confirm("Do you want to change this role?")){ 
        await this.$http.post(`${api.api}/user/role/${this.userIDToChangeRole}`, role).then(result => {
          
          // Checks if role was successfully changed
          if(result.body.success == true){
            alert("User's role was updated!");
          }
          
          else{
            alert("Could not update user's role");
          }
        })
      }
      
      else{
        alert("User's role was not changed")
      }

      
      this.getUsers(); // Retrieves list of users again
      this.$forceUpdate(); // Updates the view
    },

    // Sets the user object in local storage and pushes to edit profile component
    editUser(id){
      let editUserId = {id: id} // parses id to a object
      localStorage.setItem('editUserId', JSON.stringify(editUserId)); // stores to local storage
      this.$router.push('profile'); // pushes to profile component
    },

    // Delete's user from database
    async deleteUser(n_id){

      // Ask user for confirmation
      if(confirm("Do you want to delete this User?")){ 
        await this.$http.delete(`${api.api}/user/${n_id}`).then(result => {
          
          // Check is user was successfully deleted
          if(result.body.success == true){
            alert("User account was deleted!");
          }
          
          else{
            alert(result.body.methods);
          }
        }
      )}
      
      else{
        alert("User's information was not changed");
      }

      this.getUsers(); // retrieves list of users
      this.$forceUpdate(); // Updates view
    },

    // Event method
    onManage(event){
      // checks if event is an upload event
      if(event.target.value == 'upload'){
        this.uploadStudentInfoModal = true; // shows modal
      }

      // checks if it is a download event
      if(event.target.value == 'downloadAll'){
        this.downloadAll();
      }
    },

    // Appends file for sending to server
    fileChange(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
    },

    // Sends uploaded file to server
    async upload() {
      await axios({ method: "POST", "url": `${api.api}/data/student`, "data": this.files }).then(result => {
          
        // Checks if file was successfully processed
        if(result.data.success == true){
          alert(result.data.message);
          this.uploadStudentInfoModal = false;
        }
        
        else{
          alert(result.data.message);
        }
      })

      this.$forceUpdate(); // updates the vue
    },

    // Downloads the student data from the server
    downloadAll(){

      // Asks for user confirmation
      if(confirm("Do you want to download all student data?")){

        this.$http.get(`${api.api}/download/student`).then(result =>{
          let csv = result.body; // stores response body

          let filename = "students.csv"; // sets the name of the file

          var downloadLink; // create download link variable

          // CSV file
          let csvFile = new Blob([csv], {type: "text/csv"});
          // Download link
          downloadLink = document.createElement("a");
          // File name
          downloadLink.download = filename;
          // Create a link to the file
          downloadLink.href = window.URL.createObjectURL(csvFile);
          // Hide download link
          downloadLink.style.display = "none";
          // Add the link to DOM
          document.body.appendChild(downloadLink);
          // Click download link
          downloadLink.click();
        })
      }

      else{
        this.$forceUpdate(); // Refresh page
      }
    },
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
