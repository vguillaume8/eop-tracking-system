<template>
  <section id="tables">
   <div>
    <h1> Welcome Back: {{capitalize(user.firstname, user.lastname)}} </h1>
    <h4> Add Student
        <form @submit.prevent="addStudent()"> 
            <input v-model="studentToAdd"><mdb-btn color="success" rounded> Add Student </mdb-btn> 
        </form>
    </h4>
    <h4> Current Students </h4>
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
                <mdb-btn size="sm" color="success" @click.native="downloadReport(s.n_id)">Report</mdb-btn>
                <mdb-btn size="sm" color="danger" @click.native="deleteStudentFromList(s.n_id)">Remove</mdb-btn>
            </tr>
        </tbody>
    </table>   
</div>
  </section>

  
</template>

<script>
import {mdbBtn, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue'
import api from '../../configs/dev.config.js';
import axios from 'axios'
export default {
    name: "Advisor",
    data(){
        return{
            user: JSON.parse(localStorage.getItem('user')),
            studentIdList: [],
            students: [],
            studentToAdd: "",
            SelfActulizationProgress: 0.0,
            totalSteps: 24
        }
    },
    components: {
        mdbBtn
    },

    async mounted(){
        await this.getAdvisorStudents();
        await this.getUserData();
    },

    methods: { 
        async getUserData(){
            // get list of all  users
            this.students = [];
            
            for(var i = 0; i < this.studentIdList.length; i++){
                let currentId = this.studentIdList[i];
                await this.$http.get(`${api.api}/user/${currentId}`).then(result => {
                    if(result.body){
                        if(!this.students.includes(result.body.id)){
                            this.students.push(result.body);                
                        } 
                    }
                   
                });
            }

            this.$forceUpdate();
        },

        // gets list of advisor students
        async getAdvisorStudents(){
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;
            await this.$http.get(`${api.api}/advisor/student/${advisorId}`).then(result => {
                if(result.body.success == true){
                    this.studentIdList = result.body.students;
                }else{
                    alert(result.body.message);
                }  
            })
        },

        // runs when advisor adds a new student to their list
        async addStudent(){ 
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;
            let data = {id: this.studentToAdd};
            await this.$http.post(`${api.api}/advisor/student/${advisorId}?name=${this.capitalize(advisor.firstname, advisor.lastname)}`, data ).then(result => {
                if(result.body.success == true){
                    alert(result.body.message);
                }else{
                    alert(result.body.message);
                }
            });

            await this.getAdvisorStudents();
            await this.getUserData();
            this.$forceUpdate();
        },

        showStudent(studentId, studentFirst, studentLast){
            let student = {n_id: studentId, name: this.capitalize(studentFirst, studentLast)}
            localStorage.setItem('student', JSON.stringify(student));
            this.$router.push('/progression');
        },
        
        async deleteStudentFromList(studentId){
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;
            await this.$http.delete(`${api.api}/advisor/student/${advisorId}?student=${studentId}`).then(result => {
                if(result.body.success == true){
                    alert(result.body.message);
                }else{
                    alert(result.body.message);
                }
            });

            await this.getAdvisorStudents();
            await this.getUserData();
            this.$forceUpdate();
        },

        capitalize(firstname, lastname){
            return firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
        },

        downloadReport(student_id){

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
