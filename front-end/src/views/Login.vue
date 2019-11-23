<template>
     <div class="container">
         <h1>Login</h1>
         <form @submit.prevent="login">
             <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
             <input type="text" placeholder="Password" class="form-control my-2" v-model="user.password">
             <b-button class="btn-block" type="submit">Access</b-button>
         </form>
         <div v-if="message != ''">
             <p>{{ message }}</p>
         </div>
     </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            user: {
                email: 'stivenramireza@gmail.com',
                password: 'anutibara'
            },
            message: ''
        }
    },
    methods: {
        ...mapActions(['saveUser']),
        login(){
            this.axios.post('/login', this.user)
                .then(res => {
                    console.log(res.data);
                    const token = res.data.token;
                    this.saveUser(token);
                })
                .catch(e => {
                    console.log(e.response);
                    this.message = e.response.data.message
                })
        }
    },
}
</script>