import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:
      [
        {
          path: '/desa',
          name: 'Desa',
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
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
