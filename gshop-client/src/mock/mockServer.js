//使用mockjs来 mock数据

import Mock from 'mockjs'

import data from './data.json'

//暴露/goods
Mock.mock('/goods',{code:0,data:data.goods})
// 暴露/info
Mock.mock('/info',{code:0,data:data.info})
// 暴露/ratings
Mock.mock('/ratings',{code:0,data:data.ratings})

console.log('执行了mockServer')
