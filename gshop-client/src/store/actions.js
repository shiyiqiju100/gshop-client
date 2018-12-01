import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'

import {
  reqAddress,
  reqCategory,
  reqShops,
  reqUser,
  reqLogout,
  reqGoods,
  reqInfo,
  reqRatings
} from '../api/index.js'

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    const {latitude, longitude} = state
    //1.发送ajax请求
    const result = await reqAddress(latitude, longitude)
    //2.根据结果提交mutation
    if(result.code===0){
      commit(RECEIVE_ADDRESS, {address: result.data})
    }
  },
  //异步获取食品列表
  async getCategory({commit}) {
    const result = await reqCategory()
    if(result.code===0){
      commit(RECEIVE_CATEGORY, {categorys: result.data})
    }

  },
  //异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    if(result.code===0){
      commit(RECEIVE_SHOPS, {shops: result.data})
    }

  },

//同步保存用户信息
 saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
// 获取当前用户的异步action
  async getUser({commit}){
    const result = await reqUser()
    if(result.code===0){
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },

  //退出登录
  async logout({commit}){
   const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER)
    }

  },



  //异步获取商家商品列表
  async getGoods ({commit},callBack){
   const result = await reqGoods()
    if(result.code===0){
     const goods = result.data
      //提交 mutaiton 去更新状态
     commit(RECEIVE_GOODS,{goods})
      // 更新状态数据之后调用传入的回调函数
      typeof callBack ==='function' && callBack()
    }
  },

  //异步获取商家信息
  async getInfo ({commit}){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },

  //异步获取商家评价
  async getRatings ({commit}){
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },

  //同步更新商品food数量
  updateFoodCount({commit},{flag,food}){
    if(flag){ //flag为true 添加商品数量
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{ //减少数量
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }

}
