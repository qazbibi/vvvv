<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <lunbotu :lbtList="lbtList" :isfull="false"></lunbotu>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goods.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goods.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goods.sell_price }}</span>
          </p>
          <p>
            购物数量：
            <goodsnub @getcount="getSelectedCount" :max="goods.stock_quantity"></goodsnub>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goods.goods_no }}</p>
          <p>库存情况：{{ goods.stock_quantity }}件</p>
          <p>上架时间：{{ goods.add_time | dataFromat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import goodsnub from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lbtList: [],
      goods: {},
      ballFlag: false,
      selectedCount: 1
    }
  },
  created() {
    this.getLBT()
    this.getinfo()
  },
  methods: {
    getLBT() {
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.img = item.src
          })
          // console.log(res.body.message)
          this.lbtList = res.body.message
        }
      })
    },
    getinfo() {
      this.$http.get('api/goods/getinfo/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.goods = res.body.message[0]
        }
      })
    },
    goDesc(id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment(id) {
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goods.sell_price,
        selected: true
      }
      this.$store.commit('addToCar', goodsinfo)
      console.log(this.$store.car);
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      el.offsetWidth

      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document
        .getElementById('badge')
        .getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      this.selectedCount = count
      console.log('父组件拿到的数量值为： ' + this.selectedCount)
    }
  },
  components: {
    lunbotu: swiper,
    goodsnub
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16x;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 391px;
    left: 152px;
  }
}
</style>