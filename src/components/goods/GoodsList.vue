<template>
  <div class="goods-list">
    <div class="goods-item">
      <img src="../../images/111.jpg" />
      <h1 class="title">woshishouji</h1>
      <div class="info">
        <p class="price">
          <span class="now">xinjiage</span>
          <span class="old">laojige</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="../../images/111.jpg" />
      <h1 class="title">woshishouji</h1>
      <div class="info">
        <p class="price">
          <span class="now">xinjiage</span>
          <span class="old">laojige</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="../../images/111.jpg" />
      <h1 class="title">woshishouji</h1>
      <div class="info">
        <p class="price">
          <span class="now">xinjiage</span>
          <span class="old">laojige</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        padding: 5px;
        margin: 0;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>