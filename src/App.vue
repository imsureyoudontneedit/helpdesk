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
  mounted() {
      setInterval(this.refreshUser, 4*60*1000);
  },
  methods: {
    async refreshUser() {
      const vm = this
      await axios.post('http://banaworld.ru:5003/Auth/api/Auth/Refresh', JSON.stringify(this.$cookies.get('refreshUserToken')), {
        headers: {
                    'Content-Type': 'application/json'
        }
      })
      .then((response)=>{  
                    return response;
                })
      .then(function(response) {
        vm.$cookies.set("accessUserToken",response.data.accessToken);
        vm.$cookies.set("refreshUserToken",response.data.refreshToken);
      })
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
