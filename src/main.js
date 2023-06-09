import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from '@/store/index'

createApp(App).use(router).use(store).use(VueCookies, { expire: '7d'}).mount('#app')
