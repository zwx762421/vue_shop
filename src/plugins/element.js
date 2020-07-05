//样式参见https://element.eleme.cn/#/zh-CN
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message,Select, Option,Popconfirm } from 'element-ui'

Vue.use(Button)// 按钮
Vue.use(Form)// 表单
Vue.use(FormItem)// 表单内置项
Vue.use(Input)// input框
Vue.use(Select)// 选择框
Vue.use(Option)// 选择框选项
Vue.use(Popconfirm)// 提示选择是否框
Vue.prototype.$message = Message// 全局挂载 弹出框

