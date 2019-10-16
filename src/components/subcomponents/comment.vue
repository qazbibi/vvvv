<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入评论内容啦~~（不超过120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFromat }}</div>
        <div class="cmt-body">{{ item.content|| "该用户很懒，什么都没说" }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      pageIndex: 1,
      msg: ''
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$http
        .get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
        .then(res => {
          if (res.body.status === 0) {
            this.comments = this.comments.concat(res.body.message)
          } else {
            Toast('获取评论数据失败')
          }
        })
    },
    getMore() {
      this.pageIndex++
      this.getComments()
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空！')
      }
      this.$http
        .post('api/postcomment/' + this.id, { content: this.msg.trim() })
        .then(function(res) {
          if (res.body.status === 0) {
            var cmt = {
              user_name: '匿名用户',
              add_time: Date.now(),
              content: this.msg.trim()
            }
            this.comments.unshift(cmt)
            this.msg = ''
          }
        })
    }
  },
  props: ['id']
}
</script>

<style lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    font-size: 13px;
    margin: 5px 0;
    .cmt-title {
      line-height: 30px;
      background-color: #ccc;
    }
    .cmt-body {
      line-height: 30px;
      text-indent: 2em;
    }
  }
}
</style>