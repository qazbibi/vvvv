// 入口文件
// console.log('ok');
// 导入 Vue 包
import Vue from 'vue'
// 导入并安装 VueRouter 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入并安装 VueResource 请求资源
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 格式化时间
import moment from 'moment'
Vue.filter('dataFromat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})
// 导入 app 组件
import app from './app.vue'
// 按需导入 mint-ui 
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
// 导入样式
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
import router from './router.js'
new Vue({
  el: '#app',
  render: h => h(app),
  router
})