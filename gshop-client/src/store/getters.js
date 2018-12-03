/*
包含n个基于state状态数据的getter计算属性方法的对象
 */

export default {
  //根据cartFoods计算出food的总数量和总价格
  totalCount(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  totalPrice(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },

//根据ratings计算评价的总数量和推荐的数量
  ratingsCount(state) {
    return state.ratings.length
  },
  recommendCount(state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
