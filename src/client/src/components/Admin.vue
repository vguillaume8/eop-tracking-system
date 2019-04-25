<template>
  <section id="tables">
    <div>
      <h1> Admin Page </h1>
      <select  @change="onManage($event)">
        <option value="">Manage</option>
        <option value="advisor">Create Advisor</option>
        <option value="upload">Upload User Info</option>
        <option value="downloadAll">Download All Student Data</option>
      </select>
      <h4> Users </h4>
      <div>
        <v-client-table name="Users" :data="users" :columns="columns" :options="options">

          <a slot="actions" slot-scope="props" class="fa fa-edit" @click.prevent="advisorAction(props.row.n_id, props.row.role, props.row.firstname, props.row.lastname)"></a>

        </v-client-table>   
      </div>
    </div>

    <mdb-modal size="lg" v-if="roleModal" @close="roleModal = false">

      <mdb-modal-header>
        <mdb-modal-title>Actions</mdb-modal-title>
      </mdb-modal-header>

      <mdb-modal-body>
        <select v-model="selected">
          <option value="">Select a role...</option>
          <option v-for="r in roles" :key="r.value" v-bind:value="{ value: r.value, text: r.name }">
            {{ r.name }}
          </option>
        </select>

        <a class=" btn btn-success" @click.prevent="sendRoleChange()"> Change </a>
      </mdb-modal-body> 

      <mdb-modal-footer>
       <mdb-btn color="secondary" @click.native="roleModal = false">Close</mdb-btn>
  </mdb-modal-footer>
</mdb-modal>
  

      <mdb-modal size="lg" v-if="adminActionsModal" @close="adminActionsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Actions</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
      <!-- <td v-bind:class="{'table-danger': u.role=='advisor', 'table-success': u.role=='admin', 'table-primary': u.role=='student'}">{{capitalize(u.firstname, u.lastname)}}</td> -->
              <!-- <td v-bind:class="{'table-danger': u.role=='advisor', 'table-success': u.role=='admin', 'table-primary': u.role=='student'}">{{u.role}}</td>
              <td v-bind:class="{'table-danger': u.role=='advisor', 'table-success': u.role=='admin', 'table-primary': u.role=='student'}">{{u.email}}</td> -->
              <mdb-btn size="sm" color="success" @click.native="changeRole(currentUser.n_id)">Change Role</mdb-btn>
              <mdb-btn size="sm" color="primary" @click.native="editUser(currentUser.n_id)"> View User</mdb-btn>
              <mdb-btn size="sm" color="danger" @click.native="deleteUser(currentUser.n_id)"> Delete User </mdb-btn>
              <mdb-btn size="sm" color="primary" v-if="currentUser.role=='student'" @click.native="showStudent(currentUser.n_id, currentUser.firstname, currentUser.lastname)">Progression</mdb-btn>
              <mdb-btn size="sm" color="success" v-if="currentUser.role=='student'" @click.native="downloadReport(currentUser.n_id, currentUser.firstname, currentUser.lastname)">Report</mdb-btn>

      </mdb-modal-body> 
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="adminActionsModal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="lg" v-if="uploadStudentInfoModal" @close="uploadStudentInfoModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Upload Student List</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form enctype="multipart/form-data">
          <input type="file" id="file" ref="file" name="file" v-on:change="fileChange()" accept=".csv" required />
          <button class="btn btn-primary" type="button" v-on:click="upload()">Upload</button>
        </form>
      </mdb-modal-body> 
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="uploadStudentInfoModal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="lg" v-if="createAdvisorModal" @close="createAdvisorModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Create Advisor</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
       <form @submit.prevent="createAdvisor()">
          <!-- Grid row -->
          <div class="form-group row">
            <!-- Default input -->
            <label for="N-id" class="col-sm-2 col-form-label">N-Number</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="advisorCreate.n_id" id="N-id" placeholder="eg. N12345678">
            </div>
          </div>
          <div class="form-group row">
            <!-- Default input -->
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="advisorCreate.email" id="N-id" placeholder="me@newpaltz.edu">
            </div>
          </div>

            <div class="form-group row">
            <!-- Default input -->
            <label for="first-name" class="col-sm-2 col-form-label">First Name</label>
            <div class="col-sm-10">
              <input type="test" class="form-control" v-model="advisorCreate.firstname" id="first-name" placeholder="eg. John">
            </div>
          </div>
          <!-- Grid row -->

          <!-- Grid row -->
          <div class="form-group row">
            <!-- Default input -->
            <label for="last-name" class="col-sm-2 col-form-label">Last Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="advisorCreate.lastname" id="last-name" placeholder="eg. Smith">
            </div>
          </div>
          <mdb-btn color="primary" type="submit">Create</mdb-btn>
       </form>
      </mdb-modal-body> 
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="createAdvisorModal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </section>
</template>

<script>
import axios from "axios";
import api from '../../configs/dev.config.js';
import Util from '../services/util.js'
import PictureInput from 'vue-picture-input';
import FileUpload from 'vue-simple-upload/dist/FileUpload'
import {mdbDatatable, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue';

export default {

  name: 'Admin',
  data () {
    return {
      users: [], // All of the users in the database
      test: [{n_id: 453}],
      file: '', //  for file upload processing
      selected: "student", // default option for user role change
      userIDToChangeRole: "", // the id of the user role change
      uploadStudentInfoModal: false, // currently hidden
      createAdvisorModal: false,
      adminActionsModal: false,
      roleModal: false, 
      advisorCreate: {},
      currentUser: {},
      // For user role change
      roles: [
        {value: 'advisor',   name: 'Advisor'},
        {value: 'admin', name: 'Admin'},
        {value: 'student', name: 'Student'}
      ],

       columns: ['n_id', 'firstname', 'lastname', 'email', 'role', 'actions'],
        options: {
            // see the options API
            theme: 'bootstrap3',
            highlightMatches: true,
            sortIcon: { base:'glyphicon', up:'glyphicon-chevron-up', down:'glyphicon-chevron-down', is:'glyphicon-sort' }
        }
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
    mdbDatatable

  },

  mounted(){
    // Receives list of users when this page is loaded
    this.getUsers();
  },
  
  methods: {
  
    capitalize: Util.capitalize,

    // get list of all  users
     async getUsers(){

    await this.getUsersAxios().then(data => {
      this.users = data
      
      
     
    })
     this.$forceUpdate()
     console.log(this.users)
     
     
     
      // this.$http.get(`${api.api}/user/`).then(result => {
      //   this.users = result.body;
      //  // this.selected = result.body.role;
      //   this.$forceUpdate();
      // })
    },

    getUsersAxios(){
     return axios({
        method: 'GET',
        url: `${api.api}/user/`,
        

      }).then(function(response) {

        return response.data
      }) .catch(function (error) {
    console.log(error);
  });
    },

    // Sets user role id and opens role change modal
    changeRole(n_id){
      this.userIDToChangeRole = n_id; // sets the id of the user role change
      this.adminActionsModal = false;
      this.roleModal = true // shows the user role change  modal
    },

    // Sends the role change to the server
    async sendRoleChange(){
      let role = this.selected.value; // retrieves value from option list
      role= {role}; // parses to object
      this.roleModal = false; // hides the modal

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

      if(event.target.value == 'advisor'){
        this.createAdvisorModal = true;
      }
    },

    // Appends file for sending to server
    fileChange() {
      this.file = this.$refs.file.files[0];
      //console.log(this.files);
    },

    // Sends uploaded file to server
    async upload() {
      let formData = new FormData();
      formData.append('file', this.file);

      await axios.post(`${api.api}/data/student`,formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(result =>{
        
        if(result.data.success == true){
          alert(result.data.message);
          this.uploadStudentInfoModal = false;
        }
        
        else{
          alert(result.data.message);
        }
      })
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

    createAdvisor(){
      this.advisorCreate.password = 'newpaltz';
      this.advisorCreate.role = 'advisor';
      this.$http.post(`${api.api}/register/advisor`, this.advisorCreate).then(result => {

        alert(result.body.message);

        if(result.body.success == true){
          this.createAdvisorModal = false;
        }
      })
    },


    advisorAction(n_id, role, firstname, lastname){
      this.currentUser.n_id = n_id;
      this.currentUser.role = role;
      this.currentUser.firstname = firstname;
      this.currentUser.lastname = lastname;

      this.adminActionsModal = true;
    },

    showStudent(studentId, studentFirst, studentLast){
          let student = {n_id: studentId, name: this.capitalize(studentFirst, studentLast)} 
          localStorage.setItem('student', JSON.stringify(student)); // stores student data to local stoarage
          this.$router.push('/student'); // pushes to progression page
    },

    downloadReport(student_id, firstname, lastname){

      axios({
        method: 'get',
        url: `${api.api}/report/${student_id}`,
        responseType: 'arraybuffer',

      }).then(function(response) {
        let blob = new Blob([response.data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = lastname + firstname + '.pdf';
        link.click()
      })
    }
  },


   
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


.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
  background-color: aqua
}
</style>
