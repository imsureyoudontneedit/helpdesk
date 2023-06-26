import {createStore} from 'vuex';
import axios from 'axios';
import { router } from '@/router/index.js';
import VueCookies from 'vue-cookies'
export default createStore({
    state: ()=> ({
        qrNumber: Object.keys(JSON.parse(localStorage.getItem('qrStash')|| '{}')).length,
        user: null,
        accessUserToken: null,
        refreshUserToken: null,
        refreshUserTokenTimeout: null,
    }),
    actions: {
        async login({state, dispatch, commit},userData){
            commit('setUser', await axios.post('http://77.232.44.8:49120/Auth/api/Auth/SignIn', JSON.stringify(userData),{
                headers: {
                   'Content-Type': 'application/json'
               }
           }));

           commit ('setAccessUserToken', state.user.data.accessToken);
           commit ('setRefreshUserToken', state.user.data.refreshToken);
           VueCookies.set('refreshUserToken',state.user.data.refreshToken);
           VueCookies.set('accessUserToken',state.user.data.accessToken);
           dispatch('startRefreshTokenTimer');
           location.assign('/#/equipmentList')
        },
        logout({dispatch, commit}){
            dispatch('stopRefreshTokenTimer');
            commit('setUser',null);
            router.push('/#/');
        },
        async refreshToken({state, dispatch, commit}) {
            
            dispatch('stopRefreshTokenTimer');
            commit('setUser',await axios.post('http://77.232.44.8:49120/Auth/api/Auth/Refresh/',  state.refreshUserToken ,
            {headers: { 
                'Content-Type': 'application/json'
            }}));
            commit ('setAccessUserToken', state.user.data.accessToken);
            commit ('setRefreshUserToken', state.user.data.refreshToken);
            VueCookies.set('refreshUserToken',state.user.data.refreshToken);
            VueCookies.set('accessUserToken',state.user.data.accessToken);
            dispatch('startRefreshTokenTimer');
        },
        async startRefreshTokenTimer({state, commit, dispatch}) {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = state.accessUserToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
    
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            if (!state.refreshTokenTimeout){
                commit('setRefreshUserTokenTimeout',
                setTimeout(()=>{dispatch('refreshToken')}, timeout)); 
            }
             
        },    
        stopRefreshTokenTimer({commit}) {
            commit('clearRefreshUserTokenTimeout')
        }
    },
    mutations: {
        incrementQrNumber(state){
            state.qrNumber++;
        },
        deIncrementQrNumber(state){
            state.qrNumber--;
        },
        setAccessUserToken(state, accessUserToken) {
            state.accessUserToken = accessUserToken;
        },
        setRefreshUserToken(state, refreshUserToken) {
            state.refreshUserToken = refreshUserToken;
        },
        setRefreshUserTokenTimeout(state, refreshUserTokenTimeout) {
            state.refreshUserTokenTimeout = refreshUserTokenTimeout
        },
        setUser(state, user) {
            state.user = user;
        },
        clearRefreshUserTokenTimeout(state){
            clearTimeout(state.refreshUserTokenTimeout);
            state.refreshUserTokenTimeout = null;
        }
    },
});
