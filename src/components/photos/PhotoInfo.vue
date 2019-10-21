<template>
  <div class="photoinfo-container">
    <h3 class="title">{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dataFromat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr />
    <div class="thumbs">
      <!-- <img
        class="preview-img"
        v-for="(item,index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index,list)"
        :key="index"
      />-->
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get('api/getimageinfo/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0]
        }
      })
    },
    getThumbs() {
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.w = 600
            item.h = 400
            item.msrc = item.src
          })
          this.list = res.body.message
        }
      })
    },
    handleClose() {
      console.log('close event')
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
  }
  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>