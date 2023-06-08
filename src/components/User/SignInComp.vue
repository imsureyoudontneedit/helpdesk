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
import axios from 'axios'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        async loginMethod() {
            var vm = this;
            await axios.post('http://89.110.53.87:5003/Auth/api/Auth/SignIn', JSON.stringify(this.user),{
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
                vm.$cookies.set("accessUserToken",refreshToken);
                vm.$cookies.set("refreshUserToken",refreshToken);
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


       