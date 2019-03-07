<template>
<h1>Welcome Back {{user.firstname}} </h1>
</template>


<script>


export default {
    name: 'Home',
    data () {
        return {
            user: JSON.parse(localStorage.getItem('user')),
        }   
    }
}
</script>
