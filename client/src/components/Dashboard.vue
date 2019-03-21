<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          <a href="">Home Page</a><span>/</span><span>Dashboard</span>
        </h4>
        <form class="d-flex md-form justify-content-center" style="margin:0;" @submit.prevent="search()">
          <input aria-label="Search" class="form-control" placeholder="Type your query" type="search" v-model="input.search" />
          <mdb-btn color="primary" size="sm" class="my-0" type="submit"><i class="fa fa-search"></i></mdb-btn>
        </form>
      </mdb-card-body>
    </mdb-card>
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" far class="primary-color"/>
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
              <mdb-icon icon="user" class="warning-color"/>
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
              <mdb-icon icon="user" class="light-blue lighten-1"/>
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
              <mdb-icon icon="user" class="red accent-2"/>
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
                  <td>{{capitalize(r.firstname, r.lastname)}}</td>
                  <td>{{r.n_id}}</td>
                  <td>{{r.email}}</td>
                  <td>{{r.role}}</td>
                  <a class="btn btn-success" @click.prevent="downloadReport(r.n_id, r.role)">Generate Report</a>
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
      results: []
    }
  },

  mounted(){
    this.$http.get(`${api.api}/data`).then(result => {
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
      this.$http.get(`${api.api}/data/${this.input.search}`).then(result => {
        this.results = result.body.search;
      })
    },

    downloadReport(student_id, role){

      if(role != 'student'){
        alert("Reports are only available for students");
      }
      
      else{

        axios({
          method: 'get',
          url: `${api.api}/report/${student_id}`,
          responseType: 'arraybuffer',
        }).then(function(response) {
          let blob = new Blob([response.data], { type: 'application/pdf' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'Report.pdf'
          link.click()
        })
      }
    }
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
