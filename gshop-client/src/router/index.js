import Vue from 'vue'
import VueRouter from 'vue-router'

/*import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'*/

// 路由组件懒加载
// 不是放在一个js文件中,一上来就加载所有,而是分别有4个js文件,访问对应的路由路径组件时,才加载
const MSite =()=>import('../pages/MSite/MSite')
const Order =()=>import('../pages/Order/Order')
const Profile =()=>import('../pages/Profile/Profile')
const Search =()=>import('../pages/Search/Search')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'

import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: [
    {
      path: '/msite',//只有当请求对应的path才会执行import()加载对应的包
      component: MSite,
      meta:{
        isShow:true //标识底部Footer
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShow:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShow:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        isShow:true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
        path:'/shop/goods',
        component:ShopGoods
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'  //重定向
        }
      ]
    },
    {
      path:'/a',
      component:A
    },
    {
      path:'/b',
      component:B,
      children:[
        {
          path:'/b/b1',
          component:B1
        },
        {
          path:'/b/b2',
          component:B2
        }

      ]
    },
    {
      path: '/',
      redirect: '/msite'  //重定向
    },
  ]
})

const paths=['/a','/b']
//注册全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果请求的是/a 或/b, 判断是否已经登陆, 如果没有登陆, 自动跳转的登陆页面, 其它所有情况放行
 //console.log('---',to,from,)
  if(paths.indexOf(to.path) >=0){
   if(Vue.store.state.user._id){ //如果有_id 说明已经登陆 放行
     next()
   }else{
     next('/login')
   }
  }else{
    next()
  }

})


export default router

