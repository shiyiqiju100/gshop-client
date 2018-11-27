<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShow" ></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqAddress,reqCategory,reqShops} from './api'
  export default {
    name: 'App',
    components:{
      FooterGuide
    },
  async mounted(){
    // const result = await reqAddress('40.10038','116.36867')
   // const result = await reqCategory()
   // const result = await reqShops()
     console.log(result);
  }
  }
</script>

<style>

</style>
