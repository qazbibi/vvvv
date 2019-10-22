<template>
  <div>
    <!-- 轮播图 -->
    <lunbotu :lbtList="lbtList" :isfull="true"></lunbotu>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      lbtList: []
    }
  },
  created() {
    this.getLBT()
  },
  methods: {
    getLBT() {
      this.$http.get('api/getlunbo').then(res => {
        // console.log(res.body);
        if (res.body.status === 0) {
          this.lbtList = res.body.message
          // Toast('加载轮播图成功')
        } else {
          Toast('加载轮播图失败。。')
        }
      })
    }
  },
  components: {
    lunbotu: swiper
  }
}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>