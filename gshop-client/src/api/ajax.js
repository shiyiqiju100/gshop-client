/*ajax请求函数模块*/
import axios from 'axios'

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((reslove, reject) => {
    let promise
    if (method === 'GET') {
      // 准备url query参数
      let queryStr = ''
      Object.keys(data).forEach(key => {
        queryStr += key + '=' + data[key] + '&'
      })
      if (queryStr !== '') {
        queryStr = queryStr.substring(0, queryStr.lastIndexOf('&'))
        url = url + '?' + queryStr
      }
      //发送get请求
      promise = axios.get(url)
    } else {
      //发送post请求
      promise = axios.post(url, data)
    }
    promise.then(response => {
      reslove(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })

}
