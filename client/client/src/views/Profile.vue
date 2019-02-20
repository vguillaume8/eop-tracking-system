<template>
    <div>
        <h1> {{ student.name + "'s profile" }} </h1>
        <p> {{ pillar }} </p>
           <radial-progress-bar :diameter="200" :completed-steps="SelfActulizationProgress" :total-steps="totalSteps">
                <p>Self Actulization: </p>
                <p>{{ SelfActulizationProgress }}%</p>
            </radial-progress-bar>

            <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps">
                <p>Emotional: </p>
                <p>{{ completedSteps }}%</p>
            </radial-progress-bar>

            <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps">
                <p>Community: </p>
                <p>{{ completedSteps }}%</p>
            </radial-progress-bar>

            <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps">
                <p>Intellectual: </p>
                <p>{{ completedSteps }}%</p>
            </radial-progress-bar>
                
            <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps">
                <p>Health: </p>
                <p>{{ completedSteps }}%</p>
            </radial-progress-bar>
            
            <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :total-steps="totalSteps">
                <p>Professional / Academic: </p>
                <p>{{ completedSteps }}%</p>
            </radial-progress-bar>
    </div>
</template>


<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
    name: 'EOP',
    data () {
        return {
            student: JSON.parse(localStorage.getItem('student')),
            message: {},
            pillar: {},
            SelfActulizationProgress: 0.0,
      totalSteps: 24
            
        }
    },
     components: {
    RadialProgressBar
  },
    mounted(){
        this.getUserData();
        


    },
    methods: {
        getUserData(){
            // get user details
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.role != 'student'){
                user = JSON.parse(localStorage.getItem('student'));
            }
            
            // retrieve user data
            this.$http.get(`http://localhost:3000/api/v1/user/${user.n_id}`).then(result => {
            this.message = result.body;
            this.$forceUpdate();
            });

            // retrieve pillar data
            this.$http.get(`http://localhost:3000/api/v1/user/pillar/${user.n_id}`).then(result => {
                this.pillar = result.body;
                let sum = result.body.SelfActulization.Morals + result.body.SelfActulization.Perception + 
                result.body.SelfActulization.Gratitude + result.body.SelfActulization.Happiness + result.body.SelfActulization.Social +
                result.body.SelfActulization.Other;
                sum = sum / 4;
                this.SelfActulizationProgress  = sum;
                this.$forceUpdate();
            })
        }
    }
}
</script>
