<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <!--如果用v-if会有问题,因为隐藏时是删除,显示时是创建,当后续进行切换时,创建的元素的没有控制滚动的style样式-->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food,index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {MessageBox,Toast} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'
  import CartControl from '../../components/CartControl/CartControl'

  export default {
    name: "shop-cart",
    data() {
      return {
        isShow: false
      }
    },
    components: {
      CartControl
    },
    computed: {
      ...mapState(['cartFoods', 'info']),
      ...mapGetters(['totalCount', 'totalPrice']),
      payClass() {
        const {totalPrice} = this
        const {minPrice} = this.info
        return totalPrice < minPrice ? 'not-enough' : 'enough'
      },
      payText() {
        const {totalPrice} = this
        const {minPrice} = this.info
        if (totalPrice === 0) {
          return `￥${minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      //根据isShow和totalCount判断购物车列表是否需要显示
      listShow() {
        if (this.totalCount === 0) { //总数量为0时,购物车列表不应该显示,所以isShow必须为false
          this.isShow = false
          return false
        }

        if(this.isShow){
      //    console.log('---') 点击一次+ 就会执行一次

          this.$nextTick(()=>{ //列表显示之后,再创建控制滚动的对象
            /* 单例对象
         *     1.创建之前:判断不存在
         *    2.创建之后,保存创建的对象
         * */
            if(!this.scroll){ //如果不存在,才去创建,保证只创建一个
            //  console.log('+++') //不管点击多少次,listShow()执行几次,只会创建一个scroll对象,执行一次
              //将创建的滚动对象保存在this上
             this.scroll= new BScroll('.list-content',{ //添加控制滑动的style
                click:true
              })
            }else{
              // 有scroll对象,通知scroll刷新一下(重新计算),看要不要形成滑动
              this.scroll.refresh() //不添加style
            }

          })
        }
        return this.isShow
      }
    },
    methods: {
      //切换购物车的显示和隐藏
      toggleShow() {
        if(this.totalCount>0){ //有数量 点击时才去切换
          this.isShow = !this.isShow
        }

      },
    //结算
      pay(){
        const {totalPrice}=this
        const {minPrice} = this.info
        if(totalPrice>=minPrice){
          Toast(`需要支付${totalPrice}元`)
        }
      },
      //清空购物车
      clearCart(){
       MessageBox.confirm('确定清空购物车吗?').then(
         action=>{
           this.$store.dispatch('clearCart')
         },

       )
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

