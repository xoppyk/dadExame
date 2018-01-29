
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// import VueRouter from 'vue-router';
import Auth from './classes/Auth.js'
import VueSocketio from 'vue-socket.io';
import VueAppGame from './VueAppGame.vue';
import Router from './classes/Routes.js'

Vue.use(Auth);
Vue.use(VueSocketio, 'http://127.0.0.1:8080');
// Vue.use(VueSocketio, 'http://192.168.10.10:8080');

window.axios.defaults.headers.common['Accept'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();


// const routes = [
//   { path: '/', redirect: '/blackJack' },
//   { path: '/login', component: require('./components/authentification/login.vue'), meta: {forVisitors:true} },
//   { path: '/regist', component: require('./components/authentification/regist.vue'), meta: {forVisitors:true}  },
//   { path: '/blackJack', component: require('./components/game/blackJack.vue'), meta: {forAuth:true} }
// ];
//
// const router = new VueRouter({
//   routes:routes
// });

Router.beforeEach(
  (to,from,next) => {
    if(to.matched.some(record => record.meta.forVisitors)) {
      if(Vue.auth.isAuthenticated()){
        next({
          path: '/blackJack'
        })
      } else next()
    }
    else if(to.matched.some(record => record.meta.forAuth)) {
      if(!Vue.auth.isAuthenticated()){
        next({
          path: '/login'
        })
      } else next()
    }
  }
)


new Vue({
  el: '#app',
  render: h => h(VueAppGame),
  router: Router
})
