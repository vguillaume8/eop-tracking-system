/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Admin from '@/components/Admin'
import BadGateway from '@/components/BadGateway'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Advisor from '@/components/Advisor'
import Permission from '@/components/Permission'
import Progression from '@/components/Progression'
import Student_Progression from '@/components/Student_Progression'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 1 },
      alias: '/',
      meta: {
        requiresAuth: true,
        not_student: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      props: { page: 2 },
      component: Profile,
      meta: {
        requiresAuth: true,

      }
    },
    {
      path: '/admin',
      name: 'Admin',
      props: { page: 3 },
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/advisor',
      name: 'Advisor',
      props: {page: 4},
      component: Advisor,
      meta: {
        requiresAuth: true,
        is_advisor: true
      }
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 6 },
      component: BadGateway,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      props: {page: 7},
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      props: {page: 8},
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '*',
      props: { page: 5 },
      redirect: '/404'
    },
    {
      path: '/403',
      name: 'Forbidden',
      props: { page: 9 },
      component: Permission,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/progression',
      name: 'Progression',
      props: { page: 10 },
      component: Progression,
      meta: {
        requiresAuth: true,
        is_advisor: true

      }
    },
    {
      path: '/student',
      name: 'Student',
      props: {page: 11},
      component: Student_Progression,
      meta: {
        requiresAuth: true,

      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let isUserAdmin = false;
  // let user = JSON.parse(localStorage.getItem('user'));
  // if(user.role == 'admin') isUserAdmin = true

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))

          if (to.matched.some(record => record.meta.is_admin)) {
            if(user.role === 'admin'){
              next()
            } else{
              next({ name: 'Forbidden'})
            }
          } else if (to.matched.some(record => record.meta.is_advisor)) {
              if (user.role === 'advisor'){
                next()
              } else{
                next({ name: 'Student'})
              }
            } else if (to.matched.some(record => record.meta.not_student)) {
              if (user.role != 'student'){
                next()
              } else {
                next({ name: 'Forbidden'})
              }
            } else if (to.matched.some(record => record.meta.admin_or_student)) {
                if (user.role != 'advisor') {
                  next()
                } else {
                  next({ name: 'Forbidden'})
                }
              }
          else if (to.matched.some(record => record.meta.advisor_or_student)) {
            if (user.role != 'admin') {
              next()
            } else {
              next({ name: 'Forbidden'})
            }
          }
           else {
               next()
           }
      }
  } else if (to.matched.some(record => record.meta.guest)) {
      if (localStorage.getItem('jwt') == null){
          next()
      } else {
          next('/')
      }
  } else {
      next()
  }
})

export default router
