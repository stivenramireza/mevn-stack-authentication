<template>
    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
            <input type="password" placeholder="Password" class="form-control my-2" v-model="user.password">
            <b-button class="btn-block" type="submit">Login</b-button>
        </form>
        <div v-if="message != ''">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            message: ''
        }
    },
    methods: {
        ...mapActions(['saveUser']),
        login(){
            this.axios.post('/login', this.user)
                .then(res => {
                    console.log(res.data)
                    this.message = null;
                    const token = res.data.token;
                    this.saveUser(token);
                })
                .catch(e => {
                    console.log(e.response)
                    this.message = e.response.data.message;
                })
        }
    },
}
</script>