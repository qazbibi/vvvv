// 入口文件
// console.log('ok');
import Vue from 'vue'
import app from './app.vue'
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'

Vue.component(Header.name, Header)

new Vue({
  el: '#app',
  render: h => h(app)
})