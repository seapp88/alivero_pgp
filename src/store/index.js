import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['dataset']
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        connectToServer: false
    },
    mutations: {
        setStateConnect(state, val){
            state.connectToServer = val;
        }
    },
    actions: {
        setStateConnect({commit}, val){
            commit('setStateConnect', val);
        }
    },
    modules: {
        dataset: require('./modules/dataSet').default,
        selectedData: require('./modules/selectedData').default
    },
    plugins: [vuexLocal.plugin]
})
