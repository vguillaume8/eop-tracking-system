import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
          requiresAuth: true
      }
    }, 
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "log" */ './views/Register.vue'),
    },
    {
        path: '/hi',
        name: 'hi',
        component: () => import(/* webpackChunkName: "log" */ './views/hi.vue'),
      }

]
})

export default router