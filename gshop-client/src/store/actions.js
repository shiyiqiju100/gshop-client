import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqCategory,
  reqShops
} from '../api/index.js'

export default {
  //异步获取数据
  async getAddress({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqAddress(latitude, longitude)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  async getCategory({commit}) {
    const result = await reqCategory()
    commit(RECEIVE_CATEGORY, {category: result.data})
  },
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    commit(RECEIVE_SHOPS, {shops: result.data})
  }
}
