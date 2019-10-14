<template>
  <div class="newsInfo-container">
    <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dataFromat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>
    <comment :id="this.newid"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      newid: this.$route.params.id,
      newsinfo: {}
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo(){
      this.$http.get('api/getnew/' + this.newid).then(res=>{
        if(res.body.status === 0){
          this.newsinfo = res.body.message[0]
        }else{
          Toast("获取新闻详情失败");
        }
      })
    }
  },
  components:{
    comment
  }
}
</script>

<style lang="scss">
.newsInfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img{
      width: 100%;
    }
  }
}
</style>