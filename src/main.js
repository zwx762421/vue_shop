import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
//引入axios
import axios from 'axios'
Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:9999/Myself/'
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  //在最后必须return config
  return config;
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
