
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
//import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);
//Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const navbar = Vue.component('navbar', require('./components/navbar.vue'));
const regist = Vue.component('regist', require('./components/authentification/regist.vue'));
const login = Vue.component('login', require('./components/authentification/login.vue'));
const user = Vue.component('user', require('./components/users/user.vue'));

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/login', component: login },
  { path: '/users', component: user },
  { path: '/regist', component: regist }
];

const router = new VueRouter({
  routes:routes
});

const app = new Vue({
  router,
  data:{
  }
}).$mount('#app');
