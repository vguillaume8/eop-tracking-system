<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          <a href="">Home Page</a><span>/</span><span>Dashboard</span>
        </h4>
        <form class="d-flex md-form justify-content-center" style="margin:0;" @submit.prevent="search()">
          <input aria-label="Search" class="form-control" placeholder="Search by first name" type="search" v-model="input.search" />
          <mdb-btn color="primary" size="sm" class="my-0" type="submit"><i class="fa fa-search"></i></mdb-btn>
        </form>
      </mdb-card-body>
    </mdb-card>
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" far class="grey"/>
              <div class="data">
                <p>USERS</p>
                <h4>
                  <strong>{{userData.all}}</strong>
                </h4>
              </div>
            </div>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" class="primary-color"/>
              <div class="data">
                <p>STUDENTS</p>
                <h4>
                  <strong>{{userData.student}}</strong>
                </h4>
              </div>
            </div>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" class="red"/>
              <div class="data">
                <p>ADVISORS</p>
                <h4>
                  <strong>{{userData.advisor}}</strong>
                </h4>
              </div>
            </div>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" class="success-color accent-2"/>
              <div class="data">
                <p>ADMINS</p>
                <h4>
                  <strong>{{userData.admin}}</strong>
                </h4>
              </div>
            </div>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <section>
      <div>
        <table class="table table-hover">
          <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">N-Number</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="r in results" :key="r.n_id" >
                  <td v-bind:class="{'table-danger': r.role=='advisor', 'table-success': r.role=='admin', 'table-primary': r.role=='student'}">{{capitalize(r.firstname, r.lastname)}}</td>
                  <td v-bind:class="{'table-danger': r.role=='advisor', 'table-success': r.role=='admin', 'table-primary': r.role=='student'}">{{r.n_id}}</td>
                  <td v-bind:class="{'table-danger': r.role=='advisor', 'table-success': r.role=='admin', 'table-primary': r.role=='student'}">{{r.email}}</td>
                  <td v-bind:class="{'table-danger': r.role=='advisor', 'table-success': r.role=='admin', 'table-primary': r.role=='student'}">{{r.role}}</td>
                  <mdb-btn size="sm" color="success" v-if="r.role=='student'" @click.native="downloadReport(r.n_id, r.role, r.firstname, r.lastname)">Generate Report</mdb-btn>
                  <mdb-btn size="sm" color="primary" v-if="r.role=='student'" @click.native="showStudent(r.n_id, r.firstname, r.lastname)">Progression</mdb-btn>
              </tr>
          </tbody>
      </table>   
    </div>
    </section>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardBody,mdbIcon } from 'mdbvue'
import api from '../../configs/dev.config.js';
import Util from '../services/util.js';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbIcon,
  },

  data () {
    return {
      userData: {},
      input: {},
      results: [],
      header: {headers: {'x-access-token': `${JSON.parse(localStorage.getItem('jwt'))}`}}
    }
  },

  mounted(){
    

    this.$http.get(`${api.api}/data`, this.header ).then(result => {
      this.userData.all = result.body.count;
      this.userData.student = result.body.student;
      this.userData.advisor = result.body.advisor;
      this.userData.admin = result.body.admin;
      this.$forceUpdate();
    })
  },

  methods: {

    capitalize: Util.capitalize,

    search(){
      this.$http.get(`${api.api}/data/${this.input.search}`, this.header).then(result => {
        this.results = result.body.search;
      })
    },

    downloadReport(student_id, role, firstname, lastname){

      if(role != 'student'){
        alert("Reports are only available for students");
      }
      
      else{

        axios({
          method: 'get',
          url: `${api.api}/report/${student_id}`,
          headers: this.header,
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

    showStudent(studentId, studentFirst, studentLast){
          let student = {n_id: studentId, name: this.capitalize(studentFirst, studentLast)} 
          localStorage.setItem('student', JSON.stringify(student)); // stores student data to local stoarage
          this.$router.push('/student'); // pushes to progression page
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>
