<template>
  <section id="profile">
    <div class="container-fluid">
      <!--Section: Team v.1-->
      <section class="section team-section">
        <!--Grid row-->
        <div class="row text-center">
          <!-- Grid column -->
          <div class="col-md-8 mb-4">
            <!--Card-->
            <div class="card card-cascade cascading-admin-card user-card profile">
              <!--Card Data-->
              <div class="admin-up d-flex justify-content-start">
                <img class="fas fa-users info-color py-4">
                <div class="data">
                  <h5 class="font-weight-bold dark-grey-text">Profile - <span class="text-muted">Edit Information</span></h5>
                </div>
              </div>
              <!--/.Card Data-->
              <!--Card content-->
              <div class="card-body card-body-cascade">
                <!-- Grid row -->
                <div class="row">
                  <!-- Grid column -->
                  <div class="col-lg-4">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form12" class="form-control form-control-sm" v-model="userData.n_id" placeholder="N-ID">
                      <label for="form12" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                  <!-- Grid column -->
                  <div class="col-lg-4">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form3" class="form-control form-control-sm" v-model="userData.firstname" placeholder="First Name">
                      <label for="form6" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                  <!-- Grid column -->
                  <div class="col-lg-4">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form4" class="form-control form-control-sm" v-model="userData.lastname">
                      <label for="form4" class="disabled"></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">
                  <!-- Grid column -->
                  <div class="col-md-6">
                    <div class="md-form form-sm mb-0">
                      <input type="email" id="email" class="form-control form-control-sm" v-model="userData.email" placeholder="HawkMail">
                      <label for="form5" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                  <!-- Grid column -->
                  <div class="col-md-6">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form5" class="form-control form-control-sm" v-model="userData.year" placeholder="Year">
                      <label for="form5" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">
                  <!-- Grid column -->
                  <div class="col-md-12">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="address" class="form-control form-control-sm" v-model="userData.address" placeholder="Address">
                      <label for="form6" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">
                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-12">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="city" class="form-control form-control-sm" v-model="userData.city" placeholder="City">
                      <label for="form7" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-6">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="state" class="form-control form-control-sm" v-model="userData.state" placeholder="State">
                      <label for="form8" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-6">
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="postal" class="form-control form-control-sm" v-model="userData.zip" placeholder="Postal Code">
                      <label for="form9" class=""></label>
                    </div>
                  </div>
                  <!-- Grid column -->
                </div>
                <!-- Grid row -->
                <!-- Grid row -->
                <div class="row">
                  <!-- Grid column -->
                  <div class="col-md-12 about-text">
                    <h4 class="text-muted text-left my-4"><strong>About me</strong></h4>
                    <!--Basic textarea-->
                    <div class="md-form mb-0">
                      <textarea type="text" id="form10" class="md-textarea form-control" rows="3" placeholder="Bio" v-model="userData.bio"></textarea>
                      <label for="form10"></label>
                    </div>
                    <button class="btn btn-primary" type="submit" @click.prevent="updateUser(userData.n_id)">Save</button>
                    <button class="btn btn-danger" type="submit" @click.prevent="changePassword(userData.n_id)">Change Password?</button>
                  </div>
                  <!-- Grid column -->
                </div>
                <!-- Grid row -->
              </div>
              <!--/.Card content-->
            </div>
            <!--/.Card-->
          </div>
          <!-- Grid column -->
          <!-- Grid column -->
          <div class="col-md-4 mb-4">
            <!--Card-->
            <div class="card profile-card">
              <!--Avatar-->
              <div class="avatar z-depth-1-half mb-4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLHx8fq6ur8/PzJycnPz8/5+fnz8/Pe3t7S0tLc3Nzv7+/j4+Ps7OyAOEhDAAAFSklEQVR4nO2d2XarMAxFgwEzw///7YWU3obEScHWcKDaj3nKWbIta7C43QzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDkMdt0f47tMyC8m4sHhm7/DIyZyFjMzR1tqWefxur86t0zrd1XWZhyrpu+lNrdL5v3oh7oMhPqzHvnpfmG0afa//XCFw17pN3p6n8yQzpfHdA38LUncqOeTcdFDgfO/PJqv2/9+KqYucG3NL0ZzFjt+MADZtxOMVudGOUAVczdvgS3Vv/vs+MLbhEVyXpWwCX2CULnFcqsETfJ2zBHwbYK44/7gTDlKDnDZnA+YLjtcUE6ckEzndxbTEhPMkeXClbbTkBYi8ybyR22nqecUdipV0S0Q6bilhgltVYEh25wPm0gZJYMCisgVyG6wkua6802roeoD1Hv6l7lHXKZMIlP6UtbaXiMWEGE0m5lktgNmAYkc+EWQaxEx3ljfuZESFS9By+8D+9trzZhEeT28dAMCLfObMAcLGpKMPCAPrLlHeRzkbUXqY56zmzoK6QW2CmHezzKyx0nT6ru19RVjhcXiG/wD+gUPf2LaFwUFXoBRSqLlPG4PcH1dwweabbFMorZEqymUJTaAoPKBQQqKyQMVUKovD63kIgPFSud3PnofQVihw1l1eoW8+XUKhbYfsDWQyBAFG5hMifL9XuHOJPY2j3ml6/bsHQ0LalubxC/UZTz5zX1+83Ya7jD/pVbpInFu9p1bfhfJq2jBIxOtsu3xPF0z77RaNd4l7Z+6D5OIW2tG+4duIAcMx8wZRyK0F24Y2tSVi3NLqFpWEBoKXtAdJHTyvKjTRPMCROJyiBs0Rqp4i1Ru/Qva+8ox3aB6BtNNUPCwNQbsUCxtc/QtjSXuBtwjt0WSmcy8wWFz3y4yQCl7k7FFbEHo1BILGGFjhLHBP94gjoCLc4n1LbRzfgShvt+yd4A65Enql1D+oGQ8SUFTEyh3txh0un9SmGYP0nr/qjbqPoK8i7aBDfjTF5m3LsTrEPnW+n2LO0nlr4tepSPf40Qmt0+ZiedBtG2Hmm7tbSxBYNQkktgKvSpu09Mt4AzUicTwQMEamz3oO2oC05Ryct0jTTiqdGWqBcVImmJQbACDZmH8jXqVAC+EbXDpzdJuWgHfS7hvvVTKk7zlTkRYmiRMc99WOlVhv0LSRwkagjkCqHvwOdziFBgToSRQVqJOK8rED5ubsiz/I2CM/ddYw3tbcSJd8/iYxSeEXwApc+PD+KUuy0cVKe/hmpB0Lix+gPjUi8mAsMTnqLSE8tZ2v+rwj4DMfX1L2LmrtK7DifHuyiYQ6lODplD8Lblsn/2nAHrF19Is/vf4VxmWIIZJToiNuAo2FrARcZzrYLpsMmRzHhbESWw0YpZArDEkjl2r7+EY4X3vJ5i48wBPzK99FnavL0IpgJGYwIZkIGIyIdpF8QR4piRZj90JZrcjwTEg8jUEoffoY0uSgxlu04hApzvF24QPhhCP5hUFGUZBuReUBLPGR5N5TQ/hUqhaCLNCObkiXx/YNIiKYu4JqQyIgiU1hjIWklBl6kRMsUIJH/HooUP9vnG0mgGGEDvUhJlql6Oe0z6b1STrXk+zvpT9vJp7JQkz6nByeVH2ZKFSjcgnic1L5MqGJFmMSNCJcIfiUxNcz7GVUS0mbZQN+6v0m61lxfIWAy/5Wk9L5H94YLU8pGhKs4hUiqQqGmEbeYwg/ApoK3JCSGIYtqrySU2bgnyhORMLddsWf9CAn97dzfPaAiPpNhClEwhX9Z4Rlip4X4gv45HH5C/KT6wukIH19D/QOIrmD5nMw36wAAAABJRU5ErkJggg==" class="rounded-circle img" alt="First sample avatar image">
              </div>
              <div class="card-body pt-0 mt-0">
                <!--Name-->
                <h3 class="mb-3 font-weight-bold"><strong>{{userData.firstname + " " + userData.lastname}}</strong></h3>
                <h6 class="font-weight-bold cyan-text mb-4">{{userData.year}}</h6>
                <h6 v-if="userData.role == 'student'">{{"Advisor: " + userData.advisor}}</h6>
                <p class="mt-4 text-muted">{{userData.bio}}</p>
                <a class="btn btn-primary" v-if="user.role == 'admin' && userData.role == 'student'" @click.prevent="assignAdvisor(userData.n_id)"> Assign Advisor </a>
                <a class="btn btn-info btn-rounded waves-effect waves-light" v-bind:href="'mailto:' + userData.email"> Email</a>
                <a class="btn btn-success" v-if="userData.role == 'student'" @click.prevent="downloadReport(userData.n_id, userData.firstname, userData.lastname)">Progress Report</a>
                <a class="btn btn-success" v-if="userData.role == 'advisor'" @click.prevent="viewStudents(userData.n_id)">View Students</a>
              </div>
            </div>
            <!--Card-->
          </div>
          <!-- Grid column -->
        </div>
        <!--Grid row-->
      </section>
      <!--Section: Team v.1-->
    </div>

    <mdb-modal size="lg" v-if="passwordModal" @close="passwordModal = false">
      <mdb-modal-header>
        <mdb-modal-title>{{"Do you want to change " + userData.firstname + "'s password?"}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="form-group row">
          <!-- Default input -->
          <label for="password" class="col-sm-2 col-form-label">New Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" v-model="password.new" id="password" v-validate="'required|min:6|max:35|'" ref="password" placeholder="**********" name="password">
          </div>
        </div>
        <!-- Grid row -->

        <!-- Grid row -->
        <div class="form-group row">
          <!-- Default input -->
          <label for="confirm" class="col-sm-2 col-form-label">Confirm Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" v-model="password.confirm" id="confirm"  v-validate="'required|confirmed:password'" placeholder="**********" name="password_confirmation" data-vv-as="password">
         </div>
        </div>
        <!-- ERRORS -->
        <div class="alert alert-danger" v-show="errors.any()">
          <div v-if="errors.has('password')">
            {{ errors.first('password') }}
          </div>
          <div v-if="errors.has('password_confirmation')">
            {{ errors.first('password_confirmation') }}
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="submitPasswordChange()">Yes</mdb-btn>
        <mdb-btn color="secondary" @click.native="passwordModal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>


    <mdb-modal size="lg" v-if="studentsModal" @close="studentsModal = false">
      <mdb-modal-header>
          <mdb-modal-title>Students</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <h4>
            Add Student
            <form @submit.prevent="addStudent()">
              <input v-model="studentToAdd"><mdb-btn color="success" rounded> Add Student </mdb-btn>
            </form>
        </h4>
        <table class="table table-hover">
          <thead>
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">N-Number</th>
                  <th scope="col">Email</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="s in students" :key="s.n_id" >
                  <td>{{capitalize(s.firstname, s.lastname)}}</td>
                  <td>{{s.n_id}}</td>
                  <td>{{s.email}}</td>
                  <mdb-btn size="sm" color="primary" @click.native="showStudent(s.n_id, s.firstname, s.lastname)">Progress</mdb-btn>
                  <mdb-btn size="sm" color="success" @click.native="downloadReport(s.n_id, s.firstname, s.lastname)">Report</mdb-btn>
                  <mdb-btn size="sm" color="danger" @click.native="deleteStudentFromList(s.n_id)">Remove</mdb-btn>
              </tr>
          </tbody>
        </table>
      </mdb-modal-body>
      <mdb-modal-footer>
          <mdb-btn color="secondary" @click.native="studentsModal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>


     <mdb-modal size="lg" v-if="advisorAssign" @close="advisorAssign = false">
      <mdb-modal-header>
          <mdb-modal-title>Assign Advisor</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <table class="table table-hover">
          <thead>
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Amount of Students</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="a in listOfAdvisors" :key="a.n_id" >
                  <td>{{capitalize(a.firstname, a.lastname)}}</td>
                  <td>{{a.email}}</td>
                  <td >{{a.count}}</td>
                  <mdb-btn v-if="capitalize(a.firstname, a.lastname) != userData.advisor" color="success" @click.native="submitAdvisorAssign(a, userData.n_id)">Assign</mdb-btn>
              </tr>
          </tbody>
        </table>
      </mdb-modal-body>
      <mdb-modal-footer>
          <mdb-btn color="secondary" @click.native="advisorAssign = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </section>
</template>

<script>
import {mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn} from 'mdbvue'
import api from '../../configs/dev.config.js';
import Util from '../services/util.js';
import axios from 'axios';

export default {
  name: "Profile",
  data(){
    return{
      user: JSON.parse(localStorage.getItem('user')),
      userData: {},
      passwordModal: false,
      studentsModal: false,
      advisorAssign: false,
      listOfAdvisors: [],
      password: {},
      studentToAdd: "",
      studentIdList: [],
      students: [],
      studentCount: 0
    }
  },

  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
  },

  mounted(){
    this.getUser();
  },

  methods: {

    capitalize: Util.capitalize,

    async getUser(){
      let editUserID = JSON.parse(localStorage.getItem('editUserId'));

      await this.$http.get(`${api.api}/user/${editUserID.id}`).then(result => {
        this.userData = result.body;
      })
    },

    async updateUser(n_id){
      if (confirm("Do you want to update this User's information?")) {
        await this.$http.post(`${api.api}/user/${n_id}`, this.userData).then(result => {

          if(result.body.success == true){
            alert("User's information was updated!");
            this.userData = result.body.user;
            this.$forceUpdate();
          }

          else{
            alert(result.body.message);
          }

        })
      }

      else{
        alert("User's information was not changed");
      }
    },

    async changePassword(){
      this.passwordModal = true;
    },

    async submitPasswordChange(){
      this.submitted = true;
      this.$validator.validate().then(valid => {

        if (valid) {
          this.userData.password = this.password.new;
          this.$http.post(`${api.api}/user/${this.userData.n_id}`, this.userData).then(result => {

            if(result.body.success == true){
              alert("User's password was changed!");
              this.userData = result.body.user;
              this.$router.push('/admin');
            }

            else{
              alert(result.body.message);
            }

          })
        }
      })
    },

     async getUserData(){

        // get list of all  users
        this.students = [];

          for(var i = 0; i < this.studentIdList.length; i++){

            let currentId = this.studentIdList[i];
            await this.$http.get(`${api.api}/user/${currentId}`).then(result => {

              if(result.body){

                if(!this.students.includes(result.body.id)){
                  if(result.body.advisor == this.capitalize(this.userData.firstname, this.userData.lastname)){
                    this.students.push(result.body);
                  }
                }
              }

            })
          }

          this.$forceUpdate();
        },
//---------------------------------------------------------------------------------------------
        async viewStudents(advisorId){

          await this.getAdvisorStudents(advisorId);
          await this.getUserData();
          this.studentsModal = true;

        },


       // gets list of advisor students
        async getAdvisorStudents(advisorId){

          await this.$http.get(`${api.api}/advisor/student/${advisorId}`).then(result => {

            if(result.body.success == true){
              this.studentIdList = result.body.students;
            }
            else{
              alert(result.body.message);
            }
          })
        },

        // runs when advisor adds a new student to their list
        async addStudent(){

          let advisor = this.userData;
          let advisorId = this.userData.n_id;
          let data = {id: this.studentToAdd};

          await this.$http.post(`${api.api}/advisor/student/${advisorId}?name=${this.capitalize(advisor.firstname, advisor.lastname)}`, data ).then(result => {

            if(result.body.success == true){
              alert(result.body.message);
            }

            else{
              alert(result.body.message);
            }
          })

          await this.getAdvisorStudents(this.userData.n_id);
          await this.getUserData();
          this.$forceUpdate();
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
    },

   async deleteStudentFromList(studentId){
      await this.$http.delete(`${api.api}/advisor/student/${this.userData.n_id}?student=${studentId}`).then(result => {

        if(result.body.success == true){
          alert(result.body.message);
        }

        else{
          alert(result.body.message);
        }
      })

      await this.getAdvisorStudents(this.userData.n_id);
      await this.getUserData();
      this.$forceUpdate();
    },

    async assignAdvisor(studentId){

      await this.$http.get(`${api.api}/advisor`).then(result => {

        if(result.body.success == true){
          this.listOfAdvisors = result.body.advisors;
          for(var i = 0; i < this.listOfAdvisors.length; i++){
            this.getStudentCount(this.capitalize(this.listOfAdvisors[i].firstname, this.listOfAdvisors[i].lastname))
          }
        }

        else{
          alert(result.body.message);
        }
      })

      this.advisorAssign = true;
    },

    async submitAdvisorAssign(advisor, studentId,){

      let student = {id: studentId }
      await this.$http.post(`${api.api}/advisor/student/${advisor.n_id}?name=${this.capitalize(advisor.firstname, advisor.lastname)}`, student).then(result => {
        alert(result.body.message)
      })


      this.getUser();
      this.advisorAssign = false;
      this.$forceUpdate();
    },

    async getStudentCount(advisorname){

      await this.$http.get(`${api.api}/data/advisor/${advisorname}`).then(result => {

        if(result.body.success == true){

          for(var i = 0; i < this.listOfAdvisors.length; i++){
            if(this.capitalize(this.listOfAdvisors[i].firstname, this.listOfAdvisors[i].lastname) == advisorname){
              this.listOfAdvisors[i].count = result.body.count;
              this.$forceUpdate();
            }
          }

        }

        else{
          alert(result.body.methods);
        }
      })




    }



  }
}
</script>


<style scoped>
.profile {
  padding: 2%;
}
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
