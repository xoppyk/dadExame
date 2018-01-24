
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

window.axios.defaults.headers.common['Accept'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();


const user = Vue.component('user', require('./components/users/user.vue'));
const frontend = Vue.component('Game', require('./components/Frontend.vue'));
const userCreate = Vue.component('userCreate', require('./components/users/userCreate.vue'));
const login = Vue.component('login', require('./components/login.vue'));

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/login', component: login, meta: {forVisitors:true} },
  { path: '/users', component: user, meta: {forAuth:true} },
  { path: '/regist', component: userCreate, meta: {forVisitors:true}  },
  { path: '/frontend', component: frontend, meta: {forAuth:true} }
];

const router = new VueRouter({
  routes:routes
});

router.beforeEach(
  (to,from,next) => {
    if(to.matched.some(record => record.meta.forVisitors)) {
      if(Vue.auth.isAuthentificated()){
        next({
          path: '/frontend'
        })
      } else next()
    }
    else if(to.matched.some(record => record.meta.forAuth)) {
      if(!Vue.auth.isAuthentificated()){
        next({
          path: '/login'
        })
      } else next()
    }
  }
)


const app = new Vue({
  router,
  data:{
  }
}).$mount('#app');
