<template>
    <div>
        <h1> Admin Page </h1>
        <p> {{ message }} </p>
         <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col" >Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="m in message" :key="m.id">
                    <td>{{m.firstname + " " + m.lastname}}</td>
                    <td>{{m.role}}</td>
                    <td>{{m.email}}</td>
                    <a class="btn btn-success" @click.prevent="changeRole(m.n_id)">Change Role </a>
                </tr>
            </tbody>
        </table>     
        <!-- <ul class="list-group list-group-flush">


                    <li v-for="m in message" :key="m.id"
                    class="list-group-item">{{m.firstname + " " + m.lastname + " " + m.role}}
                    <a class="btn btn-success" @click.prevent="changeRole(m.n_id)">Change Role </a>
                    </li>
                    
        </ul> -->

        <modal name="role-modal" id="role-modal" class="modal-body" height="auto">
          <select v-model="selected">
              <option value="">Select a role...</option>
       <option v-for="r in roles" :key="r.value" v-bind:value="{ value: r.value, text: r.name }">
         {{ r.name }}
       </option>
   </select>
            <a class=" btn btn-success" @click.prevent="sendPost()"> Change </a>
        </modal>
    </div>
</template>




<script>
export default {
    name: 'EOP',
    data () {
        return {
            message: "",
                selected: "student",
                userIDToChangeRole: "",
                roles: [
                    {value: 'advisor',   name: 'Advisor'},
                    {value: 'admin', name: 'Admin'},
                    {value: 'student', name: 'Student'}
                ]
            
        }
    },
    mounted(){
        this.getUsers();
    },
    methods: {
        getUsers(){
            // get list of all  users
            this.$http.get(`http://localhost:3000/api/v1/user/`).then(result => {
                this.message = result.body;
                this.selected = result.body.role;
                this.$forceUpdate();
            });
        },
        changeRole(n_id){
            this.userIDToChangeRole = n_id;
            this.$modal.show('role-modal');
        },
        async sendPost(){
            let role = this.selected.value;
            role= {role};
              let txt = null;
               this.$modal.hide('role-modal');
              if (confirm("Do you want to change this role?")) {
                 await this.$http.post(`http://localhost:3000/api/v1/user/role/${this.userIDToChangeRole}`, role).then(result => {
                     if(result.body.success == true){
                         alert("User's role was updated!");
                     }else{
                         alert("Could not update user's role");
                     }
                //this.message = result.body;
                //this.$forceUpdate();
                });
            } else {
                alert("User's role was not changed")
            }
           
           
            this.getUsers();
            this.$forceUpdate();
        }
    
    }
}
</script>
