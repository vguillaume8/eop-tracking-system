<template>
    <div>
        <h1> Admin Page </h1>
        <p> {{ message }} </p>
        <h4> Advisor </h4>
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <!-- <th scope="col"> Select User</th> -->
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col" >Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="m in message" :key="m.id">
                        <!-- <input type="checkbox" name="vehicle1" value="Bike"> -->
                        <td>{{m.firstname + " " + m.lastname}}</td>
                        <td>{{m.role}}</td>
                        <td>{{m.email}}</td>
                        <a class="btn btn-success" @click.prevent="changeRole(m.n_id)">Change Role </a>
                        <a class="btn btn-primary" @click.prevent="editUser(m.n_id)"> Edit User </a>
                    </tr>
                </tbody>
            </table>    
        </div>

        <modal name="role-modal" id="role-modal" height="auto">
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
import api from '../../dev.config.js';
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
            this.$http.get(`${api.api}/user/`).then(result => {
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
              
               this.$modal.hide('role-modal');
              if (confirm("Do you want to change this role?")) {
                 await this.$http.post(`${api.api}/user/role/${this.userIDToChangeRole}`, role).then(result => {
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
        },
        editUser(id){
            this.$modal.show('user-modal');
        }
    
    }
}
</script>


<style lang="scss">
.add-user {
  &.open {  
    background-color: #FAFAFA;
    padding: 18px 32px;
    border-radius: 5px;
    width: 420px;
    height: 400px;
    cursor: default;
    form {
      opacity: 1;
      transition: opacity 0.1s ease;
      transition-delay: 0.3s;
      height: auto;
    }
  }
  transition: all 0.3s ease;
  background-color: #FFC145;
  height: 144px;
  width: 144px;
  border-radius: 72px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .07);
  cursor: pointer;
  .button-copy {
    text-align: center;
    line-height: 144px;
    text-transform: uppercase;
    font-weight: bold;
    color: #f7f7f7;
  }
  form {
    transition: none;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
  .cancel {
    font-size: 12px;
    text-align: center;
    margin-top: 1em; 
    span {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.submit-button {
  display: block;
  background-color: #3498DB;
  height: 40px;
  border-radius: 20px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.875em;
  border: none;
  font-weight: 700;
  padding: 0 34px;
  margin: 0 auto;
  img {
    position: relative;
    top: 3px;
    right: 6px;
  }
  &:hover {
    background-color: darken(#3498DB, 10%);
    cursor: pointer;
  }
}
.featured-note {
  color: #949494;
  font-size: 12px;
  margin: 4px 0px;
  line-height: 18px;
  font-style: italic;
}
form * {
  outline: none;
}
label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
  &.emoji {
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 21px;
      margin: 0;
      display: none;
      &+span:after {
        content: "😶";
        font-size: 18px;
        top: 2px;
        left: 2px;
        position: relative;
        height: 18px;
        display: inline-block;
      }
      &:checked+span:after {
        content: "😀";
      }
    }
  }
}
.form--field {
  width: 420px;
  margin: 10px 0;
  &.-short {
    width: 120px;
  }
}
.form--price {
  position: absolute;
  line-height: 38px;
  width: 16px;
  color: #C7C7C7;
  text-align: center;
  & + input {
    padding-left: 14px;
  }
}
.form--container {
  width: 420px;
  &.-inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: -12px;
  }
}
.form--element {
  background-color: #fff;
  border: 1px solid #ECECEC;
  border-radius: 3px;
  font-size: 14px;
  line-height: 28px;
  padding: 0 4px;
  color: #3D3D3D;
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  &:focus {
    border: 1px solid #FFC145;
    border-radius: 2px;
  }
  &:not(.texteare) {
    height: 30px;
  }
  &.textarea {
    height: 80px;
    resize: none;
  }
}
a {
  text-decoration: none;
  cursor: pointer;
}
::selection {
  background-color: #F5617A;
  color: #fff;
}
::-moz-selection {
  background-color: #F5617A;
  color: #fff;
}
.like{
    float: right;
}
</style>

