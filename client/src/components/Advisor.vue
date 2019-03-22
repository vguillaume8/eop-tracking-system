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
                        <mdb-btn size="sm" color="success" @click.native="downloadReport(s.n_id, s.firstname, s.lastname)">Report</mdb-btn>
                        <mdb-btn size="sm" color="danger" @click.native="deleteStudentFromList(s.n_id)">Remove</mdb-btn>
                    </tr>
                </tbody>
            </table>   
        </div>
    </section>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import api from '../../configs/dev.config.js';
import Util from '../services/util.js';
import axios from 'axios'

export default {
    name: "Advisor",
    data(){
        return{
            user: JSON.parse(localStorage.getItem('user')), // retrieve user object from local storage
            studentIdList: [],  // List to store advisor students
            students: [],   // list to store student objects
            studentToAdd: "", // stores the student id that will get added
        }
    },

    components: {
        mdbBtn
    },

    // Runs when page loads
    async mounted(){
        await this.getAdvisorStudents(); // Retreives the list of students
        await this.getUserData();   // Turns the advisor student id list into a list of student objects
    },

    methods: { 

        // capitalize function from Util
        capitalize: Util.capitalize,

         // get list of all  users
        async getUserData(){
           
            // Iterates through student list and retrieves the user object 
            for(var i = 0; i < this.studentIdList.length; i++){
                let currentId = this.studentIdList[i];

                await this.$http.get(`${api.api}/user/${currentId}`).then(result => {
                    // Check if its a valid userId
                    if(result.body){
                        // Checks if the list does not already include this user
                        if(!this.students.includes(result.body.id)){
                            if(result.body.advisor == this.capitalize(this.user.firstname, this.user.lastname)){
                                this.students.push(result.body);     
                            }
                                       
                        } 
                    }
                })
            }

            this.$forceUpdate(); // Updates vue
        },

        // gets list of advisor students
        async getAdvisorStudents(){
            let advisor = JSON.parse(localStorage.getItem('user')); // retrives advisor object from local storage
            let advisorId = advisor.n_id; // sets advisor id

            this.students = [];
            // Retrieves list of advisor students from server
            await this.$http.get(`${api.api}/advisor/student/${advisorId}`).then(result => {
                // Checks if successfully retrieved list
                if(result.body.success == true){
                    this.studentIdList = result.body.students; // sets the student ID list
                }
                
                else{
                    alert(result.body.message);
                }  
            })
        },

        // runs when advisor adds a new student to their list
        async addStudent(){ 
            let advisor = JSON.parse(localStorage.getItem('user')); // retrieves user object from local storage
            let advisorId = advisor.n_id; // sets advisor id
            let data = {id: this.studentToAdd}; // parses student id to an object

            // Sends data to the server
            await this.$http.post(`${api.api}/advisor/student/${advisorId}?name=${this.capitalize(advisor.firstname, advisor.lastname)}`, data ).then(result => {
                
                // Checks if the student was successfully added
                if(result.body.success == true){
                    alert(result.body.message);
                }
                
                else{
                    alert(result.body.message);
                }
            })

            await this.getAdvisorStudents(); // retrives updated list of students
            await this.getUserData(); // retireves the user data
            this.$forceUpdate(); // Refreshes page
        },

        // Saves student object to local storage and pushes to progression page
        showStudent(studentId, studentFirst, studentLast){
            let student = {n_id: studentId, name: this.capitalize(studentFirst, studentLast)} 
            localStorage.setItem('student', JSON.stringify(student)); // stores student data to local stoarage
            this.$router.push('/progression'); // pushes to progression page
        },
        
        async deleteStudentFromList(studentId){
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;

            await this.$http.delete(`${api.api}/advisor/student/${advisorId}?student=${studentId}`).then(result => {
                
                if(result.body.success == true){
                    alert(result.body.message);
                }
                else{
                    alert(result.body.message);
                }
            })

            await this.getAdvisorStudents();
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
                link.download = lastname +  firstname + '.pdf'
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
