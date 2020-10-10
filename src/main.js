import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

import './assets/css/bamburgh.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'swiper/swiper-bundle.css';
import './assets/fonts/icons_menu/flaticon.css'

import LongPress from 'vue-directive-long-press'
Vue.directive('long-press', LongPress);

import Keyboard from './components/keyboard'
import NumPad from './components/numpad'
Vue.component('keyboard', Keyboard);
Vue.component('num-pad', NumPad);

// const BASE_URL = 'http://10.10.10.10:3000';
const BASE_URL = 'https://alivero.jelastic.regruhosting.ru';

import axios from 'axios'
const instance = axios.create({
    baseURL: BASE_URL + '/api/v1/tsd'
});
Vue.prototype.$http = instance;

const sort = data => {
    data = Object.assign([], data);
    const sorted = [data.shift()];

    while(data.length) {
        const [a] = sorted, c = { d: Infinity };

        for(let [i, b] of Object.entries(data)) {
            const average = Math.floor((
                Math.abs(a.r - b.r) +
                Math.abs(a.g - b.g) +
                Math.abs(a.b - b.b)
            ) / 3);

            if(average < c.d) {
                Object.assign(c, { d: average, i: i });
            }
        }

        sorted.unshift(data.splice(c.i, 1)[0]);
    }

    return sorted.reverse();
};
Vue.prototype.$hexSorter = sort;

Vue.use(VueSweetalert2);

const socket = require('socket.io-client')(BASE_URL);
socket.on('connect', () => {
    store.dispatch('setStateConnect', true)
});
socket.on('disconnect', () => {
    store.dispatch('setStateConnect', false)
});

Vue.config.productionTip = false;


const app = new Vue({
    router,
    store,
    render: h => h(App)
});

store.$app = app;
store.dispatch('dataset/setState').finally(() => {
    app.$mount('#app');
});
