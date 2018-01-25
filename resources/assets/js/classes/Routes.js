// import Vue from 'vue';
// import VueRouter from 'vue-router';

import Login from '../components/authentification/login.vue'
import Regist from '../components/authentification/regist.vue'
import BlackJack from '../components/game/blackJack.vue'

// Vue.use(VueRouter)

// const router = new VueRouter ({
//   routes: [
//     {
//       path: "/login",
//       components: Login,
//       meta: {forVisitors:true}
//     },
//     {
//       path: "/regist",
//       components: Regist,
//       meta: {forVisitors:true}
//     },
//     {
//       path: "/blackJack",
//       components: BlackJack,
//       meta: {forAuth:true}
//     }
//   ]
// })
export default [
  {
    path: "/login",
    components: Login,
    meta: {forVisitors:true}
  },
  {
    path: "/regist",
    components: Regist,
    meta: {forVisitors:true}
  },
  {
    path: "/blackJack",
    components: BlackJack,
    meta: {forAuth:true}
  }
]

// router.beforeEach(
//   (to,from,next) => {
//     if(to.matched.some(record => record.meta.forVisitors)) {
//       if(Vue.auth.isAuthentificated()){
//         next({
//           path: '/blackJack'
//         })
//       } else next()
//     }
//     else if(to.matched.some(record => record.meta.forAuth)) {
//       if(!Vue.auth.isAuthentificated()){
//         next({
//           path: '/login'
//         })
//       } else next()
//     }
//   }
// )
//
