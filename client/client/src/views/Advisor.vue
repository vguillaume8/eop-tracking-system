<template>
    <div>
        <h1> Advisor Page </h1>
        <h4> Add Student <input v-model="studentToAdd"> <a class="btn btn-success" @click.prevent="addStudent()"> Add Student </a> </h4>
        <h4> Current Students </h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">N-Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Advisor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in students" :key="s.id" >
                    <td @click.prevent="showStudent(s.n_id, s.firstname, s.lastname)">{{s.firstname + " " + s.lastname}}</td>
                    <td @click.prevent="showStudent(s.n_id, s.firstname, s.lastname)">{{s.n_id}}</td>
                    <td @click.prevent="showStudent(s.n_id, s.firstname, s.lastname)">{{s.email}}</td>
                    <td @click.prevent="showStudent(s.n_id, s.firstname, s.lastname)">{{s.advisor}}</td>
                    <a class="btn btn-danger" @click.prevent="deleteStudentFromList(s.n_id)"> Remove </a>
                </tr>
            </tbody>
        </table>      
    </div>
</template>


<script>
export default {
    name: "Advisor",
    data(){
        return{
            studentIdList: [],
            students: [],
            studentToAdd: "",
            SelfActulizationProgress: 0.0,
            totalSteps: 24
        }
    },
    async mounted(){
        await this.getAdvisorStudents();
        await this.getUserData();
    },
    methods: { 
         async getUserData(){
            // get list of all  users
            let advisor = JSON.parse(localStorage.getItem('user'));
            this.students = [];
            
            for(var i = 0; i < this.studentIdList.length; i++){
                let currentId = this.studentIdList[i];
                await this.$http.get(`http://localhost:3000/api/v1/user/${currentId}`).then(result => {
                    if(!this.students.includes(result.body.id)){
                        //if((result.body.advisor.trim())== (advisor.firstname.charAt(0).toUpperCase() + advisor.firstname.slice(1) + advisor.lastname.charAt(0).toUpperCase() + advisor.lastname.slice(1)).trim()){
                            this.students.push(result.body);
                      //  }
                        
                    }
                    
                });
            }
            this.$forceUpdate();
        },
        // gets list of advisor students
        async getAdvisorStudents(){
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;
            await this.$http.get(`http://localhost:3000/api/v1/advisor/student/${advisorId}`).then(result => {
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
            await this.$http.post(`http://localhost:3000/api/v1/advisor/student/${advisorId}?name=${advisor.firstname.charAt(0).toUpperCase() + advisor.firstname.slice(1) + " " + advisor.lastname.charAt(0).toUpperCase() + advisor.lastname.slice(1)}`, data ).then(result => {
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
            let student = {n_id: studentId, name: studentFirst.charAt(0).toUpperCase() + studentFirst.slice(1) + " " + studentLast.charAt(0).toUpperCase() + studentLast.slice(1)}
            localStorage.setItem('student', JSON.stringify(student));
            this.$router.push('/profile');
            
        },
        
        async deleteStudentFromList(studentId){
            let advisor = JSON.parse(localStorage.getItem('user'));
            let advisorId = advisor.n_id;
            let data = {id: studentId};
            await this.$http.delete(`http://localhost:3000/api/v1/advisor/student/${advisorId}?student=${studentId}`).then(result => {
                if(result.body.success == true){
                    alert(result.body.message);
                }else{
                    alert(result.body.message);
                }
            
            });

            await this.getAdvisorStudents();
            await this.getUserData();
            this.$forceUpdate();
        }
    }
   
}
</script>
