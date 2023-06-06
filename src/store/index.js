import {createStore} from 'vuex';
export default createStore({
    state: ()=> ({
        accessUserToken: null,
        refreshUserToken: null,
    }),
    mutations: {
        accessUserToken(state, accessUserToken) {
            state.accessUserToken = accessUserToken;
        },
        refreshUserToken(state, refreshUserToken) {
            state.refreshUserToken = refreshUserToken;
        }
    },
});
