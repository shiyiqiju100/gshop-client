<template>
  <section class="msite">
    <!--首页头部-->
    <TopHeader :title="address.name">
            <span class="header_search" slot="left">
              <i class="iconfont icon-sousuo"></i>
            </span>
      <span class="header_login" slot="right">
              <span class="header_login_text">登录|注册</span>
            </span>
    </TopHeader>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide"  v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+ c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>

          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg" alt="">
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'
  import TopHeader from '../../components/TopHeader/TopHeader'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    name: "msite",
    components: {
      TopHeader,
      ShopList
    },
    mounted() {
      this.$store.dispatch('getShops')
      this.$store.dispatch('getCategory')
    },
    computed: {
      ...mapState(['address', 'categorys']),
      //根据categorys一维数组生成二维数组
      categorysArr() {
        //取出categorys
        const {categorys} = this
        //准备二维数组(放小数组)
        const bigArr = []
        //准备小数组(最大length为8)
        let smallArr = []
        categorys.forEach(c => {
          if (smallArr.length === 0) {
            bigArr.push(smallArr)//小数组放进大数组
          }
          smallArr.push(c) //将c放进小数组
          if (smallArr.length === 8) {
            //准备一个新的小数组
            smallArr = []
          }

        })
        return bigArr
      }

    },
    watch: {
      // 注意: 更新状态数据==>调用监视回调 ==> 异步更新界面
      categorys () { // categorys状态数据更新了: [] ==> [ [],[] ]

        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它
        this.$nextTick(() => {
          // 必须在列表数据显示之后创建才能正常形成轮播
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
