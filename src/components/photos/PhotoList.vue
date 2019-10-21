<template>
  <div class="mui-content">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?' mui-active':'']"
            v-for="(item,i) in cates"
            :key="i"
            @tap="getImages(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="(item,i) in list" :key="i" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <h3 class="info-body">{{ item.zhaiyao }}</h3>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  data() {
    return {
      cates: [],
      list: []
    }
  },
  created() {
    this.getAllCategory()
    this.getImages(0)
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getAllCategory() {
      this.$http.get('api/getimgcategory').then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: '全部', id: 0 })
          this.cates = res.body.message
        }
      })
    },
    getImages(cates) {
      this.$http.get('api/getimages/' + cates).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
      border-radius: 5px;
    }
    .info {
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      max-height: 84px;
      .info-title {
        font-size: 14px;
        margin: 5px;
      }
      .info-body {
        margin: 5px;
        font-size: 13px;
      }
    }
    img[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>