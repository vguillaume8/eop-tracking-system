<template>
    <div>
        <div>
            <h1> {{ student.name + "'s profile" }} </h1>
            <p> {{ pillar }} </p>
                <radial-progress-bar :diameter="200" :completed-steps="SelfActulization" :total-steps="totalSteps" @click.prevent="openPillar()">
                    <p > Self Actulization: </p>
                    <p>{{ SelfActulization }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('SelfActulization')"> Open Pillar </a>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="Emotional" :total-steps="totalSteps">
                    <p>Emotional: </p>
                    <p>{{ Emotional }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('Emotional')"> Open Pillar </a>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="Community" :total-steps="totalSteps">
                    <p>Community: </p>
                    <p>{{ Community }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('Community')"> Open Pillar </a>
                </radial-progress-bar>

                <radial-progress-bar :diameter="200" :completed-steps="Intellectual" :total-steps="totalSteps">
                    <p>Intellectual: </p>
                    <p>{{ Intellectual }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('Intellectual')"> Open Pillar </a>
                </radial-progress-bar>
                    
                <radial-progress-bar :diameter="200" :completed-steps="Health" :total-steps="totalSteps">
                    <p>Health: </p>
                    <p>{{ Health }}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('Health')"> Open Pillar </a>
                </radial-progress-bar>
                
                <radial-progress-bar :diameter="200" :completed-steps="ProfessionalAcademic" :total-steps="totalSteps">
                    <p>Professional / Academic: </p>
                    <p>{{ ProfessionalAcademic}}%</p>
                    <a class="btn btn-primary" @click.prevent="openPillar('ProfessionalAcademic')"> Open Pillar </a>
                </radial-progress-bar>
        </div>

        <modal name="pillar-modal" id='pillar-modal' height="auto" :scrollable="true">
                <div>
                    
                <div v-for="bar in bars" :key="bar" class="row mb-1">
                
                    <div class="col-sm-10 pt-1">
                        <div class="col-sm-2">{{ bar.name }}:</div>
                        <a class="btn btn-danger" @click.prevent="decrementPillar(bar.name)">-</a>
                        <a class="btn btn-primary" @click.prevent="incrementPillar(bar.name)">+</a>
                        <b-progress height="2rem">
                        <b-progress-bar :value="bar.value"  :variant="bar.variant" :key="bar.variant" >
                        {{bar.level}}
                        <strong>{{Math.round(bar.value * 100) / 100}}%</strong>
                        
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
            SelfActulization: 0.0,
            Emotional: 0.0,
            Community: 0.0,
            Intellectual: 0.0,
            Health: 0.0,
            ProfessionalAcademic: 0.0,
            currentType: "",
            totalSteps: 100
            
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
                this.SelfActulization = Math.round(result.body.SelfActulization * 100) / 100;
                this.Emotional = Math.round(result.body.Emotional * 100) / 100;
                this.Community = Math.round(result.body.Community * 100) / 100;
                this.Intellectual = Math.round(result.body.Intellectual * 100) / 100;
                this.Health = Math.round(result.body.Health * 100) / 100;
                this.ProfessionalAcademic = Math.round(result.body.ProfessionalAcademic * 100) / 100;
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
            this.currentType = type;
            this.$modal.show('pillar-modal');
        },
        async incrementPillar(meta){
            let student = JSON.parse(localStorage.getItem('student'));
            await this.$http.post(`http://localhost:3000/api/v1/pillar/meta/increment/${student.n_id}?type=${this.currentType}&meta=${meta}`,).then(result => {
                if(result.body.success == true){
                    //alert(result.body.message);
                }else{
                    alert(result.body.message);
                }
            })
            await this.getUserData();
            await this.openPillar(this.currentType);
            this.$forceUpdate();
        },

        async decrementPillar(meta){
            let student = JSON.parse(localStorage.getItem('student'));
            await this.$http.post(`http://localhost:3000/api/v1/pillar/meta/decrement/${student.n_id}?type=${this.currentType}&meta=${meta}`,).then(result => {
                if(result.body.success == true){
                    //alert(result.body.message);
                }else{
                    alert(result.body.message);
                }
            })
            await this.getUserData();
            await this.openPillar(this.currentType);
            this.$forceUpdate();
        }
    }
}
</script>
