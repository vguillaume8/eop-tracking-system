<template>
<div>
    <div>
        <h1 align="center"> {{ student.name + "'s profile" }} </h1>
        <h2 align="center"> <a  class="btn btn-primary" @click.prevent="openComment()"> View Comments </a> </h2>
        <mdb-container>
             <mdb-row>
                <mdb-col col="4">
                    <radial-progress-bar  innerStrokeColor="#C5BDBD" :diameter="200" :completed-steps="SelfActulization" :total-steps="totalSteps" @click.prevent="openPillar()">
                        <p> Self Actualization: </p>
                        <p>{{ SelfActulization }}% </p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('SelfActulization')">Open Pillar</mdb-btn>
                    </radial-progress-bar>
                </mdb-col>
                
                <mdb-col col="4">
                    <radial-progress-bar innerStrokeColor="#C5CDBD" :diameter="200" :completed-steps="Emotional" :total-steps="totalSteps">
                        <p>Emotional: </p>
                        <p>{{ Emotional }}%</p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('Emotional')">Open Pillar</mdb-btn>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col col="4">
                    <radial-progress-bar  innerStrokeColor="#D5BDBD" :diameter="200" :completed-steps="Community" :total-steps="totalSteps">
                        <p>Community: </p>
                        <p>{{ Community }}%</p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('Community')">Open Pillar</mdb-btn>
                    </radial-progress-bar>
                </mdb-col>

            </mdb-row>

            <mdb-row>
                <mdb-col sm="4">
                    <radial-progress-bar innerStrokeColor="#C7BDBD" :diameter="200" :completed-steps="Intellectual" :total-steps="totalSteps">
                        <p>Intellectual: </p>
                        <p>{{ Intellectual }}%</p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('Intellectual')">Open Pillar</mdb-btn>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col sm="4">              
                    <radial-progress-bar innerStrokeColor="#C5BEBD" :diameter="200" :completed-steps="Health" :total-steps="totalSteps">
                        <p>Health: </p>
                        <p>{{ Health }}%</p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('Health')">Open Pillar</mdb-btn>
                    </radial-progress-bar>
                </mdb-col>

                <mdb-col sm="4">             
                    <radial-progress-bar innerStrokeColor="#C1BDBD" :diameter="200" :completed-steps="ProfessionalAcademic" :total-steps="totalSteps">
                        <p>Professional</p>
                        <p>Academic:</p>
                        <p>{{ ProfessionalAcademic}}%</p>
                        <mdb-btn size="sm" color="primary" @click.native="openPillar('ProfessionalAcademic')">Open Pillar</mdb-btn>
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

                    <mdb-row>
                    <mdb-btn size="sm" color="danger" @click.native="decrementPillar(bar.name)" class="button-rounded">-</mdb-btn>
                   
                       
                    <b-progress height="2rem" class="w-75 mb-2" >
                        <b-progress-bar :value="bar.value"  :variant="bar.variant" :key="bar.variant" >
                        {{bar.level}}
                        <strong>{{Math.round(bar.value * 100) / 100}}%</strong>
                        </b-progress-bar>
                    </b-progress>
                     <mdb-btn size="sm" color="primary" @click.native="incrementPillar(bar.name)" class="button-rounded">+</mdb-btn>
                    </mdb-row>
                    <div class="description">
                    <mdb-btn size="sm" color="success" @click.native="showPillarDesc(bar.name, bar.level)">View Description</mdb-btn>  
                    </div>
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
            <mdb-container>
            <mdb-row>
            <ul v-for="c in comments" :key="c.id">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <a class="badge badge-default" v-if="c.selfact">Self Actualization</a>
                        <a class="badge badge-primary" v-if="c.emotional">Emotional</a>
                        <a class="badge badge-secondary" v-if="c.community">Community</a>
                        <a class="badge badge-success" v-if="c.intellectual">Intellectual</a>
                        <a class="badge badge-warning" v-if="c.health">Health</a>
                        <a class="badge badge-info" v-if="c.prof">Professional/Academic</a>
                        <h5 class="card-title">{{c.date}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{c.advisor_name}}</h6>
                        <p class="card-text">{{c.comment}}</p>
                        <mdb-btn size="sm" color="danger" @click.native="deleteComment(c._id)">Delete</mdb-btn>
                    </div> 
                </div>
            </ul>
            </mdb-row>
            </mdb-container>
            <form @submit.prevent="submitComment()"> 
                <!-- Material inline 1 -->
            <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" id="self-actual" v-model="commentData.selfact">
            <label class="form-check-label" for="self-actual">Self Actualization</label>
            </div>

            <!-- Material inline 2 -->
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="emotional" v-model="commentData.emotional">
                <label class="form-check-label" for="emotional">Emotional</label>
            </div>

            <!-- Material inline 3 -->
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="community" v-model="commentData.community">
                <label class="form-check-label" for="community">Community</label>
            </div>
            <!-- Material inline 1 -->
            <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" id="intellectual" v-model="commentData.intellectual">
            <label class="form-check-label" for="intellectual">Intellectual</label>
            </div>

            <!-- Material inline 2 -->
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="health" v-model="commentData.health">
                <label class="form-check-label" for="health">Health</label>
            </div>

            <!-- Material inline 3 -->
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="prof-aca" v-model="commentData.prof">
                <label class="form-check-label" for="prof-aca">Professional/Academic</label>
            </div>
                <input class="form-control form-control-large" v-model="commentData.comment" placeholder="New Comment">    
                <button type="submit|reset" class="btn btn-success"> Submit </button>
            </form>
        </mdb-modal-body> 
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="pillarComments = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
</div>
</template>


<script>
import api from '../../configs/dev.config.js';
import Util from '../services/util.js';
import RadialProgressBar from 'vue-radial-progress'
import { GChart } from 'vue-google-charts'
import {mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbCol, mdbRow} from 'mdbvue'
export default {
    name: 'Progression',
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
        mdbRow,
    },

    mounted(){
        this.getUserData();
    },

    methods: {

        capitalize: Util.capitalize, 
        
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

        async incrementPillar(meta){
            let student = JSON.parse(localStorage.getItem('student'));
            await this.$http.post(`${api.api}/pillar/meta/increment/${student.n_id}?type=${this.currentType}&meta=${meta}`,).then(result => {
                if(result.body.success == true){
                    //alert(result.body.message);
                }
                
                else{
                    alert(result.body.message);
                }
            })

            await this.getUserData();
            await this.openPillar(this.currentType);
            this.$forceUpdate();
        },

        async decrementPillar(meta){
            let student = JSON.parse(localStorage.getItem('student'));
            await this.$http.post(`${api.api}/pillar/meta/decrement/${student.n_id}?type=${this.currentType}&meta=${meta}`).then(result => {
                if(result.body.success != true){
                    alert(result.body.message);
                }
            })

            await this.getUserData();
            await this.openPillar(this.currentType);
            this.$forceUpdate();
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

        async submitComment(){
            console.log(this.commentData);
            let student = JSON.parse(localStorage.getItem('student'));
            let user = JSON.parse(localStorage.getItem('user'));
            this.commentData.n_id = student.n_id;
            this.commentData.date = new Date().toLocaleString();
            this.commentData.advisor_name = this.capitalize(user.firstname, user.lastname);

            await this.$http.post(`${api.api}/comment`, this.commentData).then(result => {
                alert(result.body.message);
                
            })

            await this.getComments();
            this.$forceUpdate();
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

        async deleteComment(commentId){
            
           await this.$http.delete(`${api.api}/comment/${commentId}`).then(result => {
                alert(result.body.message);
            })

            await this.getComments();
            this.$forceUpdate();
        },
        
        
    }
}
</script>

<style>
.description{
    margin: 0 auto;
     width: 210px; 
}


</style>

