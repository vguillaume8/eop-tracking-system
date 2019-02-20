<template>
    <div>
        <div>
            <h1> {{ student.name + "'s profile" }} </h1>
            <p> {{ pillar }} </p>
                <radial-progress-bar :diameter="200" :completed-steps="SelfActulizationProgress" :total-steps="totalSteps" @click.prevent="openPillar()">
                    <p > Self Actulization: </p>
                    <p>{{ SelfActulizationProgress }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('SelfActulization')"> Open Pillar </a>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="EmotionalProgress" :total-steps="totalSteps">
                    <p>Emotional: </p>
                    <p>{{ EmotionalProgress }}%</p>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="CommunityProgress" :total-steps="totalSteps">
                    <p>Community: </p>
                    <p>{{ CommunityProgress }}%</p>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="IntellectualProgress" :total-steps="totalSteps">
                    <p>Intellectual: </p>
                    <p>{{ IntellectualProgress }}%</p>
                </radial-progress-bar>
                    
                <radial-progress-bar :diameter="200" :completed-steps="HealthProgress" :total-steps="totalSteps">
                    <p>Health: </p>
                    <p>{{ HealthProgress }}%</p>
                </radial-progress-bar>
                
                <radial-progress-bar :diameter="200" :completed-steps="ProfessionalProgress" :total-steps="totalSteps">
                    <p>Professional / Academic: </p>
                    <p>{{ ProfessionalProgress }}%</p>
                </radial-progress-bar>
        </div>

        <modal name="pillar-modal" id='pillar-modal' height="auto">
                <div>
                    
                <div v-for="bar in bars" :key="bar" class="row mb-1">
                
                <div class="col-sm-10 pt-1">
                    <div class="col-sm-2">{{ bar.variant }}:</div>
                    <b-progress height="3rem">
                    <b-progress-bar :value="bar.value" :variant="bar.variant" :key="bar.variant"  >
                       {{bar.level}}
                       <strong>{{bar.value}}%</strong>
                       
                    </b-progress-bar>
                    </b-progress>
                </div>
                </div>
            </div>

        </modal>
    </div>
</template>


<script>
import RadialProgressBar from 'vue-radial-progress'
export default {
    name: 'EOP',
    data () {
        return {
            bars: [],
            student: JSON.parse(localStorage.getItem('student')),
            message: {},
    //         pillar: {},
    //         SelfActulizationProgress: 0.0,
    //         EmotionalProgress: 0.0,
    //         CommunityProgress: 0.0,
    //         IntellectualProgress: 0.0,
    //         HealthProgress: 0.0,
    //         ProfessionalProgress: 0.0,
    //   totalSteps: 24
            
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
            this.$http.get(`http://localhost:3000/api/v1/pillar/${user.n_id}`).then(result => {
                this.pillar = result.body;
                let sum = result.body.SelfActulization.Morals + result.body.SelfActulization.Perception + 
                result.body.SelfActulization.Gratitude + result.body.SelfActulization.Happiness + result.body.SelfActulization.Social +
                result.body.SelfActulization.Other;
                sum = sum / 4;
                this.SelfActulizationProgress  = sum;
                this.EmotionalProgress = sum;
                this.CommunityProgress = sum;
                this.IntellectualProgress = sum,
                this.HealthProgress = sum,
                this.ProfessionalProgress = sum,
                this.$forceUpdate();
            })
        },


        openPillar(type){
            let student = JSON.parse(localStorage.getItem('student'));
            this.$http.get(`http://localhost:3000/api/v1/pillar/meta/${student.n_id}?type=${type}`).then(result => {
                if(result.body.success == true){
                    this.bars = result.body.metaArray;
                }else{
                    alert(result.body.message);
                }
            })

            this.$modal.show('pillar-modal');
        }
    }
}
</script>
