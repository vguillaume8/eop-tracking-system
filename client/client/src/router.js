import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
      // meta: {
      //     requiresAuth: true
      // }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackCHunkName: "log" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true,
        is_advisor: true
      }
    }, 
    {
      path: '/hi',
      name: 'hi',
      component: () => import(/* webpackCHunkName: "log" */ './views/hi.vue'),
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
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/advisor',
      name: 'advisor',
      component: () => import(/* webpackChunkName: "log" */ './views/Advisor.vue'),
      meta: {
        requiresAuth: true,
        is_advisor: true
        
      },
      
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let isUserAdmin = false;
  // let user = JSON.parse(localStorage.getItem('user'));
  // if(user.role == 'admin') isUserAdmin = true
  
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))

          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.role === 'admin'){
                  next()
              }else{
                  next({ name: 'profile'})
              }
          }
          else if(to.matched.some(record => record.meta.is_advisor)){
            if(user.role === 'advisor'){
              next()
            }else{
              next({ name: 'profile'})
            }
          }
           else {
               next()
           }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next('/')
      }
  }else {
      next() 
  }
})

export default router