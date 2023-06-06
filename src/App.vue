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
export default {
  name: 'App',
  components: {
    NavBarComp,
    LeftMenuNavVue,
    FooterCompVue,
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
