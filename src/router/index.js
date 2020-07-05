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

export default router
