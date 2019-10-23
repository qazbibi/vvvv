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
// 导入并安装 VuePreview 图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 导入并安装 Vuex 
import Vuex from 'vuex'
Vue.use(Vuex)
// 请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//定义发送请求时表单数据格式 
Vue.http.options.emulateJSON = true
// 格式化时间
import moment from 'moment'
Vue.filter('dataFromat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
// 导入 app 组件
import app from './app.vue'
// 按需导入 mint-ui 
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// 全局导入 mint-ui 
import MintUi from 'mint-ui'
// 导入样式
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
Vue.use(MintUi)
// Vue.use(Lazyload)

// 获取本地存储的购物车数据；若没有，则得到一个空数组
var car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addToCar(state, goods) {
      var flag = false
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count += parseInt(goods.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(goods)
      }
      // 将购物车数据存储在本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updataGoodsInfo(state, goods) {
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count = parseInt(goods.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updataGoodsSelected(state, info) {
      state.car.some((item) => {
        if (item.id == info.id) {
          item.selected = info.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    aCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    idArr(state) {
      var a = []
      state.car.forEach(item => {
        a.push(item.id)
      })
      return a
    },
    getGoodsCount(state) {
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var b = {}
      state.car.forEach(item => {
        b[item.id] = item.selected
      })
      return b
    },
    getGoodsCountAndAmount(state) {
      var r = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          r.count += item.count
          r.amount += item.count * item.price
        }
      })
      return r
    }
  }
})

import router from './router.js'
new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store
})