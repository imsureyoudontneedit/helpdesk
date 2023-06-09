<template>
  <div class="wrapper">
    <nav-bar-comp/>
    <div class="main_show d-flex">
      <left-menu-nav-vue/>
      <router-view class="view"/> 
    </div>
    <footer-comp-vue/>
  </div>
</template>

<script>
import FooterCompVue from './components/Menu/FooterComp'
import LeftMenuNavVue from './components/Menu/LeftMenuNav'
import NavBarComp from './components/Menu/NavBarComp'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBarComp,
    LeftMenuNavVue,
    FooterCompVue,
  },
  data() {
    return {
      user: null,
      refreshTokenTimeout: null
    }
  },
  created() {
    this.refreshToken()
  },
  methods: {
    async refreshToken() {
            const vm = this
            this.user = await axios.post('http://banaworld.ru:5003/Auth/api/Auth/Refresh/', this.$cookies.get('refreshUserToken'),
              {headers: {
                    'Content-Type': 'application/json'
                }}
              )
            .then((response) => {
              vm.$cookies.set("accessUserToken", response.data.accessToken)
            });
            this.startRefreshTokenTimer();
        },
    startRefreshTokenTimer() {
              const jwtBase64 = this.$cookies.get('accessUserToken').split('.')[1];
              const jwtToken = JSON.parse(atob(jwtBase64));
    
              const expires = new Date(jwtToken.exp * 1000);
              const timeout = expires.getTime() - Date.now() - (60 * 1000);
              this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }
  }
}
</script>

<style>
  @font-face {
    font-family: Montserrat-Medium;
    src: url(./assets/fonts/Montserrat/Montserrat-Medium.ttf);
  }

  @font-face {
    font-family: Montserrat;
    src: url(./assets/fonts/Montserrat/Montserrat-Regular.ttf);
  }

  @font-face {
    font-family: Montserrat-SemiBold;
    src: url(./assets/fonts/Montserrat/Montserrat-SemiBold.ttf);
  }

  @font-face {
    font-family: Montserrat-Light;
    src: url(./assets/fonts/Montserrat/Montserrat-Light.ttf);
  }

  #app {
    font-family: Montserrat-SemiBold;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  
</style>
