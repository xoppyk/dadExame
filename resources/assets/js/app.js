
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import Auth from './classes/Auth.js'
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);
Vue.use(Auth);

Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const user = Vue.component('user', require('./components/users/user.vue'));
const frontend = Vue.component('Game', require('./components/Frontend.vue'));
const userCreate = Vue.component('userCreate', require('./components/users/userCreate.vue'));
const login = Vue.component('login', require('./components/login.vue'));

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/login', component: login },
  { path: '/users', component: user },
  { path: '/regist', component: userCreate },
  { path: '/frontend', component: frontend }
];

const router = new VueRouter({
  routes:routes
});

const app = new Vue({
  router,
  data:{
  }
}).$mount('#app');
