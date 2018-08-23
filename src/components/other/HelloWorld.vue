<template>
  <div class="hello">
    <yd-navbar title="NavBar">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <router-link to="#" slot="right">
            <yd-navbar-next-icon></yd-navbar-next-icon>
        </router-link>
    </yd-navbar>
    <yd-slider autoplay="3000">
        <yd-slider-item>
            <a href="http://www.ydcss.com">
                <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="http://www.ydcss.com">
                <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="http://www.ydcss.com">
                <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
            </a>
        </yd-slider-item>
    </yd-slider>
    <yd-cell-group>
      <yd-cell-item arrow href="#" type="link">
          <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
          <span slot="left">我的订单</span>
          <span slot="right">查看全部订单</span>
      </yd-cell-item>
      <yd-cell-item arrow href="#" type="link">
          <yd-icon slot="icon" name="like-outline" size=".42rem"></yd-icon>
          <span slot="left">我的收藏</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-timeline>
        <yd-timeline-item>
            <p>【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。</p>
            <p style="margin-top: 10px;">2017-08-18 08:24:18</p>
        </yd-timeline-item>
        <yd-timeline-item>
            <p>【南宁市】您的订单已到达【南宁安吉站】</p>
            <p style="margin-top: 10px;">2017-08-18 07:25:08</p>
        </yd-timeline-item>
        <yd-timeline-item>
            <p>【南宁市】您的订单在京东【南宁分拨中心】发货完成，准备送往京东【南宁安吉站】</p>
            <p style="margin-top: 10px;">2017-08-17 21:44:08</p>
        </yd-timeline-item>
    </yd-timeline>
    <yd-list theme="1">
        <yd-list-item v-for="item, key in list" :key="key">
            <img slot="img" :src="item.img">
            <span slot="title">{{item.title}}</span>
            <yd-list-other slot="other">
                <div>
                    <span class="demo-list-price"><em>¥</em>{{item.price}}</span>
                    <span class="demo-list-del-price">¥{{item.w_price}}</span>
                </div>
                <div>content</div>
            </yd-list-other>
        </yd-list-item>
    </yd-list>
    <yd-tabbar>
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="#" dot>
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#" active>
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
            <yd-badge slot="badge" type="danger">2</yd-badge>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '你好',
      list: [
                {img: "//img1.shikee.com/try/2016/06/23/14381920926024616259.jpg", title: "标题111标题标题标题标题", price: 156.23, w_price: 89.36},
                {img: "//img1.shikee.com/try/2016/06/21/10172020923917672923.jpg", title: "标题222标题标题标题标题", price: 256.23, w_price: 89.36},
                {img: "//img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "标题333标题标题标题标题", price: 356.23, w_price: 89.36},
                {img: "//img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "标题444标题标题标题标题", price: 456.23, w_price: 89.36},
                {img: "//img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "标题555标题标题标题标题", price: 556.23, w_price: 89.36},
                {img: "//img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "标题666标题标题标题标题", price: 656.23, w_price: 89.36}
            ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
