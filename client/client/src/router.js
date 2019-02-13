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
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackCHunkName: "log" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "log" */ './views/Register.vue'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "log" */ './views/Login.vue'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "log" */ './views/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/advisor',
      name: 'advisor',
      component: () => import(/* webpackChunkName: "log" */ './views/Advisor.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'userboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'home'})
      }
  }else {
      next() 
  }
})

export default router