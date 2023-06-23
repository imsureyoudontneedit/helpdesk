
<template>
        <form @submit.prevent="loginMethod">

            <div class="mb-3 d-flex">
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="user.email" placeholder="E-mail">
            </div>
            <div class="mb-3 d-flex">
                <input type="password" class="form-control" id="inputPassword" v-model="user.password" placeholder="Пароль">
            </div>
            <div class="buttons d-flex justify-content-center">
                <button type="submit" class="btn me-2">Войти</button>
                <router-link to='registration'><button type="button" class="btn">Зарегистрироваться</button></router-link>
            </div>
        </form>
</template>

<script>
// import  { router } from '@/router'

export default {
    data(){
        return {
            user: {
            email: '',
            password: '',
        }
        }
        
    },

    methods: {
        loginMethod(){
            this.$store.dispatch('login', this.user)
        }
    },
}
        
</script>

<style scoped>
    form {
        margin: auto auto;
        font-family: Montserrat-SemiBold;
        color: #585858;
        font-size: 1.563em;
    }

    #inputEmail {
        width: clamp(300px, 40vw, 700px);
        border-radius: 60px;
        height: 60px;
    }
    #inputPassword {
        width: clamp(300px, 40vw, 700px);
        border-radius: 60px;
        height: 60px;
    }

    .btn {
        background-color: #6fbfee;
        border-color: none;
        width: min-content;
        border-radius: 50px;
    }
</style>


       