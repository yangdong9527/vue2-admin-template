import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRouters = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */'../views/Home.vue'),
        meta: {
          title: '首页',
          hidden: false,
          breadcrumb: true,
          affix: true,
          noCache: false
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '测试页面',
      alwaysShow: true
    },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: '关于我们',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters
})

export default router
