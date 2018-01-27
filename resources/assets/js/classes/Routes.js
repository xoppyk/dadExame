import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/authentication/login.vue'
import register from '../components/authentication/regist.vue'
import blackJack from '../components/game/blackJack.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/blackJack'
    },
    {
      path: '/login',
      component: login,
      meta: { forVisitors: true}
    },
    {
      path: '/regist',
      component: register,
      meta: { forVisitors: true}
    },
    {
      path: '/blackJack',
      component: blackJack,
      meta: { forAuth: true}
    }
  ],
  linkActiveClass: 'active'
})
