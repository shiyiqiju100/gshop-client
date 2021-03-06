import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORY](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  //问题:给有数据绑定的对象添加一个新的属性,这个属性是没有数据绑定效果的
  //解决方法:Vue.set(target,key,value) 新添加的属性有数据绑定效果
  [INCREMENT_FOOD_COUNT](state, {food}) { //增加商品数量
    if (!food.count) { //如果food没有count属性,添加count属性并指定值为1
      // food.count =1 //  没有效果 数据更新-->界面没有更新
      Vue.set(food, 'count', 1) // 有数据绑定效果 数据更新-->界面更新
      //将food添加到购物车中
      state.cartFoods.push(food)
    } else { //有count属性,直接加1
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {//减少商品数量
    if (food.count > 0) { //有值,才去减-1,不能出现-1的情况
      food.count--
      //减少为0,将food从购物车删除
      //根据数组找到对应的下标,再删除
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  //清空购物车
  [CLEAR_CART](state){
    //1.先将购物车中所有food的Count的重置为0
    state.cartFoods.forEach(food=>food.count=0)
    //2.再清空购物车数组
    state.cartFoods=[]
  }
}
