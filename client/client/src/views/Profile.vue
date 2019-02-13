<template>
    <div>
        <h1> User Profile </h1>
        <p> {{ message }} </p>
        <p> {{ pillar }} </p>
    </div>
</template>


<script>
export default {
    name: 'EOP',
    data () {
        return {
            message: {},
            pillar: {}
        }
    },
    mounted(){
        this.getUserData();


    },
    methods: {
        getUserData(){
            // get user details
            let user = JSON.parse(localStorage.getItem('user'));
            let id = user.n_id;

            this.$http.get(`http://localhost:3000/api/v1/user/${id}`).then(result => {
            this.message = result.body;
            this.$forceUpdate();
            });

            this.$http.get(`http://localhost:3000/api/v1/user/pillar/${id}`).then(result => {
                this.pillar = result.body;
                this.$forceUpdate();
            })
        }
    }
}
</script>
