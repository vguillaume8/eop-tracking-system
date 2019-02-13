<template>
    <div>
        <h1> User Profile </h1>
        <p> {{ message }} </p>
    </div>
</template>


<script>
export default {
    name: 'EOP',
    data () {
        return {
            message: {}
        }
    },
    mounted(){
        // get user details
        let user = JSON.parse(localStorage.getItem('user'));
        let id = user._id;

        this.$http.get(`http://localhost:3000/api/v1/user/${id}`).then(result => {
        this.message = result.body;
        this.$forceUpdate();
        });
    }
}
</script>
