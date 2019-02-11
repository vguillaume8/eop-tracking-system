<template>
<div>

                <div class="form-group">
                    <h4> Register </h4> 
                    <input type="text" name="firstname" v-model="input.firstname" placeholder="First Name" required/>
                    <input type="text" name="lastname" v-model="input.lastname" placeholder="Last Name" required/>
                    <input type="text" name="email" v-model="input.email" placeholder="email" required/>
                    <input type="password" name="password" v-model="input.password" placeholder="password" required/>
                    <input type="text" name="type" v-model="input.type" placeholder="type" required/>
                </div>
                <button class="btn btn-primary" v-on:click="sendPost('/register')">Submit</button> 

      
</div>
</template>

<script>
export default {
    name: 'EOP Tracking',
    data(){
        return {
            input : {
                
            }
        }
    },
    methods: {
        sendPost(slug){
            this.$http.post(`http://localhost:3000/api/v1${slug}`, this.input, { headers: { "content-type": "application/json" } }).then(result => {
                console.log(result.body.status);
                if(result.body.status == 200){
                    
                }else{
                    alert(result.body.message);
                }
            })
        }
    }
    
}
</script>
