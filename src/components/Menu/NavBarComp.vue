<template>
  <div class="navbar_comp">
    <nav class="navbar navbar-light">
        <div class="container-fluid justify-content-around">
            <a class="navbar-brand"><img src="../../assets/img/logo.png" alt="Help Desk" class="nav_img"></a>
            <form class="d-flex formWrapper">
              <input class="form-control me-2" type="search" placeholder="" aria-label="Search">
            </form>
            <div class="user" v-if="accessToken == true">
              <div class="username"></div>
              <img src="" alt="">
            </div>
            <div class="d-flex">
              <div v-if="this.$cookies.get('accessUserToken') != null">
                <button type="button" class="btn btn-light"  @click='remove' onclick="location.reload();">Выйти</button>
                <router-link to='/qrPrinter'><div class="position-relative d-inline-block"><img src="@/assets/img/icon/qr-code-scan.png" class="qrPrinter" alt="" ><span class='qrPrinterCounter'>{{$store.state.qrNumber}}</span> </div></router-link>
              </div>
                <router-link to='login' v-if="$store.state.accessUserToken == null"><button class="btn btn-light" >Войти</button></router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
export default {
    data() {
      return {
        
        accessUserToken: this.$cookies.get("accessUserToken")
      }
    },
    methods: {
      remove() {
        const vm = this;
        vm.$cookies.remove("accessUserToken")
        vm.$cookies.remove("refreshUserToken")
        localStorage.removeItem('page')
        store.commit('accessUserToken','')
        store.commit('refreshUserToken','')
      },
    },
    mounted() {    
      const accessToken=this.$cookies.get('accessUserToken');
      const refreshToken=this.$cookies.get('refreshUserToken');
      if(!accessToken || !refreshToken){
        router.push('/login');
      }else{
        store.commit('accessUserToken', accessToken);
        store.commit('refreshUserToken',refreshToken);
      }
        
    },
}
</script>

<style scoped>
  .navbar_comp {
    font-family: Montserrat-SemiBold;
    color: #424242;
  }
  .navbar{
    background-color: #63B0DB;
    height: 130px;
    width: 100%;
  }

  .nav_img {
    width: clamp(1.5rem, 20vw, 12rem);
    height: clamp(1.5rem, 12vw, 6rem);
  }
  .formWrapper {
    width: 47%;
  }

  .form-control {
    height: 60px;
    min-width: 100px;
    min-height: 20px;
    border-radius: 30px;
    background: url(../../assets/img/icon/search.png) no-repeat scroll 20px 7px;
    background-color: white;
    padding-left: 90px;
  }

  .btn {
    border: none;
    border-radius: 30px;
    width: clamp(1.5rem, 15vw, 10rem);
    height: clamp(1.5rem, 7vw, 4rem);
    font-size: clamp(0.75rem, 3vw, 2rem);
  }
  .qrPrinter {
    width: 75px;
    height: 75px;
    position: relative;
  }
  .qrPrinterCounter{
    text-align:center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute !important;
    z-index:999 !important;
    right: 0 !important;
    top: 0 !important;
    background: white;
    color: black;
  }
</style>