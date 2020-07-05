import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向，如果访问/则重定向到/login
  { path: '/', redirect: '/login' },
  // 配置组件
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/register', component: Register },
]

const router = new VueRouter({
  routes
})
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转
  if(to.path === '/login' || to.path === '/Register') {
    return next();
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next();
})
export default router
