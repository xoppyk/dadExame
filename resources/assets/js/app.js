
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// import VueAppAdmin from './VueAppAdmin.vue';
// import VueRouter from 'vue-router';
// import VueSocketio from 'vue-socket.io';

// Vue.use(VueRouter);
// Vue.use(VueSocketio, 'http://192.168.10.10:8080');

Vue.component('administration', require('./VueAppAdmin.vue'));
// Vue.component('users', require('./components/users/user.vue'));

const app = new Vue({
    el: '#app'
});
