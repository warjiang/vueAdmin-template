import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('========GET TOKE START==========')
  // console.log(getToken())
  // console.log('========GET TOKE END==========')
  if (getToken()) {
    if (to.path === '/login') {
      // console.log('[1]', to.path)
      next({ path: '/' })
    } else {
      // console.log('[2]', to.path)
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })
        })
      } else {
        // console.log('[3]', to.path)
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
