import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from '@/helper/cookie.js'

import Main from '../layout/Main.vue'
import Login from '../layout/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: 'SDGsDesa',
      requiresAuth: true
    },
    children:
      [
        {
          path: '/',
          name: 'Home',
          component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
        },
        {
          path: '/desa',
          name: 'Desa',
          meta: {
            superadmin: true
          },
          component: () => import(/* webpackChunkName: "Desa" */ '../views/Desa.vue')
        },
        {
          path: '/rt',
          name: 'Rt',
          component: () => import(/* webpackChunkName: "TR/RW" */ '../views/Rt.vue')
        },
        {
          path: '/kk',
          name: 'Kk',
          component: () => import(/* webpackChunkName: "Kartu Keluarga" */ '../views/Kk.vue')
        },
        {
          path: '/penduduk',
          name: 'Penduduk',
          component: () => import(/* webpackChunkName: "Penduduk" */ '../views/Penduduk.vue')
        },
        {
          path: '/lkd',
          name: 'LKD',
          component: () => import(/* webpackChunkName: "LKD" */ '../views/Lkd.vue')
        },
        {
          path: '/user',
          name: 'User',
          meta: {
            superadmin: true
          },
          component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  var myCookie = Cookie.get('myCookie')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!myCookie) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const session = JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      if (to.matched.some(record => record.meta.superadmin)) {
        if (session.user_lvl === "1") {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
