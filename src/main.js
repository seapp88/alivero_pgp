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

const BASE_URL = 'http://10.10.10.10:3000';
// const BASE_URL = 'https://alivero.jelastic.regruhosting.ru';

import axios from 'axios'
const instance = axios.create({
    baseURL: BASE_URL + '/api/v1/tsd'
});
Vue.prototype.$http = instance;

import hexSorter from 'hexsorter';
Vue.prototype.$hexSorter = hexSorter;

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
