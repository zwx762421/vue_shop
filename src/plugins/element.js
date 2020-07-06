//样式参见https://element.eleme.cn/#/zh-CN
import Vue from 'vue'
import { Button,
  Form,
  FormItem,
  Input,
  Message,
  Select,
  Option,
  Popconfirm,
  Container,
  Header,
  Aside,
  Main ,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Popover,
} from 'element-ui'

Vue.use(Button)// 按钮
Vue.use(Form)// 表单
Vue.use(FormItem)// 表单内置项
Vue.use(Input)// input框
Vue.use(Select)// 选择框
Vue.use(Option)// 选择框选项
Vue.use(Popconfirm)// 提示选择是否框
Vue.use(Container)// 布局
Vue.use(Header)// 布局头
Vue.use(Aside)// 布局侧
Vue.use(Main)// 布局主
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Popover)
Vue.prototype.$message = Message// 全局挂载 弹出框

