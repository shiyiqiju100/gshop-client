// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {Button} from 'mint-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TopHeader from './components/TopHeader/TopHeader.vue'
// webpack在打包时自动解析为js对应的类型(对象)
import './mock/mockServer'  //引入 webpack才能打包 没有暴露 所以不用接


// 注册全局组件
Vue.component('TopHeader', TopHeader)
Vue.component(Button.name, Button) // <mt-button/>


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
