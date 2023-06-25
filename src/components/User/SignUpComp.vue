<template>
        <form @submit.prevent="registrationMethod">
            <div class="mb-3 d-flex">
                <input type="text" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model='user.login' placeholder="Логин">
            </div>
            <div class="mb-3 d-flex">
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model='user.email' placeholder="Email">
            </div>
            <div class="mb-3 d-flex">
                <input type="password" class="form-control" id="inputPassword" v-model='user.password' placeholder="Пароль">
            </div>
            <button type="submit" class="btn">Зарегистрироваться</button>
        </form>
</template>

<script>
import axios from 'axios'
import store from '@/store'
export default {
    data() {
        return {
            user: {
                login: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async registrationMethod() {
            var vm = this;
            await axios.post('http://77.232.44.8:49120/Auth/api/Auth/SignUp', JSON.stringify(this.user),{
                 headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response)=>{  
                    return response;
                })
                .then(function(response) {
                    const accessToken = response.data.accessToken;
                    const refreshToken = response.data.refreshToken;
                vm.$cookies.set("accessUserToken",accessToken);
                vm.$cookies.set("refreshUserToken",refreshToken);
                store.commit('accessUserToken', accessToken);
                store.commit('refreshUserToken', refreshToken);
                if(response.status == '200'){
                        location.assign("/#/equipmentList")
                }
                })
                .catch(function (error) {
                    console.log(error);
                }); 
        }
    }
}
</script>

<style scoped>
   form {
        margin: auto auto;
        font-family: Montserrat-SemiBold;
        color: #424242;
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
        background-color: #63DB93;
        border-color: none;
        width: min-content;
        border-radius: 50px;
    }
</style>