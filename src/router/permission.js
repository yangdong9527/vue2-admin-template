import router from './index'
import { getToken } from '../utils/cookies'

const whiteList = ['/login']
router.beforeEach((to, form, next) => {
  // 判断是否登录
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: `/login?redirect=${to.fullPath}` })
    }
  }
})
