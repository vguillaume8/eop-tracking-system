<template>
<div>
    <div>
        <h1 align="center"> {{ student.name + "'s profile" }} </h1>
        <h2 align="center"> <a  class="btn btn-primary" @click.prevent="openComment()"> View Comments </a> </h2>
        <mdb-container>
             <mdb-row>

                <mdb-col col="4">
                    <radial-progress-bar  innerStrokeColor="#C5BDBD" :diameter="200" :completed-steps="SelfActulization" :total-steps="totalSteps" @click.prevent="openPillar()">
                        <p> Self Actulization: </p>
                        <p>{{ SelfActulization }}% </p>
                        <a class="btn btn-primary" @click.prevent="openPillar('SelfActulization')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>
                
                <mdb-col col="4">
                    <radial-progress-bar innerStrokeColor="#C5CDBD" :diameter="200" :completed-steps="Emotional" :total-steps="totalSteps">
                        <p>Emotional: </p>
                        <p>{{ Emotional }}%</p>
                        <a class="btn btn-primary" @click.prevent="openPillar('Emotional')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col col="4">
                    <radial-progress-bar  innerStrokeColor="#D5BDBD" :diameter="200" :completed-steps="Community" :total-steps="totalSteps">
                        <p>Community: </p>
                        <p>{{ Community }}%</p>
                        <a class="btn btn-primary" @click.prevent="openPillar('Community')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>

            </mdb-row>

            <mdb-row>
                <mdb-col sm="4">
                    <radial-progress-bar innerStrokeColor="#C7BDBD" :diameter="200" :completed-steps="Intellectual" :total-steps="totalSteps">
                        <p>Intellectual: </p>
                        <p>{{ Intellectual }}%</p>
                        <a class="btn btn-primary" @click.prevent="openPillar('Intellectual')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col sm="4">              
                    <radial-progress-bar innerStrokeColor="#C5BEBD" :diameter="200" :completed-steps="Health" :total-steps="totalSteps">
                        <p>Health: </p>
                        <p>{{ Health }}%</p>
                        <a class="btn btn-primary" @click.prevent="openPillar('Health')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col sm="4">             
                    <radial-progress-bar innerStrokeColor="#C1BDBD" :diameter="200" :completed-steps="ProfessionalAcademic" :total-steps="totalSteps">
                        <p>Professional / Academic: </p>
                        <p>{{ ProfessionalAcademic}}%</p>
                        <a class="btn btn-primary" @click.prevent="openPillar('ProfessionalAcademic')"> Open Pillar </a>
                    </radial-progress-bar>
                </mdb-col>

            </mdb-row>

        </mdb-container>
    </div>

    <mdb-modal size="lg" v-if="pillarModal" @close="pillarModal = false">
        <mdb-modal-header>
            <mdb-modal-title>{{pillarType}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <div v-for="bar in bars" :key="bar.id" class="row mb-1">
                <div class="col-sm-10 pt-1">
                    <div class="col-sm-2">{{ bar.name}}:</div>
                    <a class="btn btn-success" @click.prevent="showPillarDesc(bar.name, bar.level)">View Description</a>     
                    <b-progress height="2rem">
                        <b-progress-bar :value="bar.value"  :variant="bar.variant" :key="bar.variant">
                        {{bar.level}}
                        <strong>{{Math.round(bar.value * 100) / 100}}%</strong>
                        </b-progress-bar>
                    </b-progress>
                </div>
            </div>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="pillarModal = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="lg" v-if="pillarDesc" @close="pillarDesc = false">
        <mdb-modal-header>
            <mdb-modal-title>{{pillarLevel}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <h1> {{pillarDescription.name}} </h1>
            <p>{{ pillarDescription }} </p>
        </mdb-modal-body> 
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="pillarDesc = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>



    <mdb-modal size="lg" v-if="pillarComments" @close="pillarComments = false">
        <mdb-modal-header>
            <mdb-modal-title>Comments</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <ul v-for="c in comments" :key="c.id">
                
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <a class="badge badge-default" v-if="c.selfact">Self Actualization</a>
                        <a class="badge badge-primary" v-if="c.emotional">Emotional</a>
                        <a class="badge badge-secondary" v-if="c.community">Community</a>
                        <a class="badge badge-success" v-if="c.intllectual">Intellectual</a>
                        <a class="badge badge-warning" v-if="c.health">Health</a>
                        <a class="badge badge-info" v-if="c.prof">Professional/Academic</a>
                        <h5 class="card-title">{{c.date}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{c.advisor_name}}</h6>
                        <p class="card-text">{{c.comment}}</p>
                    </div>
                </div>
            </ul>
          
        </mdb-modal-body> 
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="pillarComments = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>

</div>
</template>


<script>
import api from '../../configs/dev.config.js';
import RadialProgressBar from 'vue-radial-progress'
import {mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue'
export default {
    name: 'Student_Progression',
    data () {
        return {
            pillar: {},
            bars: [],
            student: JSON.parse(localStorage.getItem('student')),
            pillarDescriptionData: {},
            pillarDescription: "",

            // Dynamic Data
            SelfActulization: 0.0,
            Emotional: 0.0,
            Community: 0.0,
            Intellectual: 0.0,
            Health: 0.0,
            ProfessionalAcademic: 0.0,
            currentType: "",
            totalSteps: 100,


            commentData: {},
            comments: [],
            pillarModal: false,
            pillarDesc: false,
            pillarComments: false,
            pillarLevel: "",
            pillarType: ""
        }
    },

    components: {
        RadialProgressBar,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
        mdbBtn,
        mdbContainer,
        mdbCol,
        mdbRow
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
            this.$http.get(`${api.api}/user/${user.n_id}`).then(result => {
                this.message = result.body;
                this.$forceUpdate();
            });

            // retrieve pillar data
            this.$http.get(`${api.api}/pillar/${user.n_id}`).then(result => {
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

            this.$http.get(`${api.api}/pillar/meta/${student.n_id}?type=${type}`).then(result => {
                if(result.body.success == true){
                    this.bars = result.body.metaArray;
                    this.pillarDescriptionData = result.body.description;
                    this.pillarType = type;
                }
                
                else{
                    alert(result.body.message);
                }
            })

            this.currentType = type;
            this.pillarModal = true
        },

        showPillarDesc(name, level){
            for(var i = 0; i< this.pillarDescriptionData.length; i++){
                if(this.pillarDescriptionData[i].name == name){
                    this.pillarDescription = this.pillarDescriptionData[i][level];
                    this.pillarLevel = level;
                }
            }
            
            this.pillarDesc = true;
        },

        openComment(){
            this.getComments();
            this.pillarComments = true;
        },

        getComments(){
            let student = JSON.parse(localStorage.getItem('student'));

            this.$http.get(`${api.api}/comment/${student.n_id}`).then(result =>{
                if(result.body.success == true){
                    this.comments = result.body.comments;
                }
                
                else{
                    alert(result.body.message);
                }
            })
        },
    }
}
</script>


