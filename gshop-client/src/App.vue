<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShow" ></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'

  export default {
    name: 'App',
    components:{
      FooterGuide
    },
     mounted() {
        // 异步获取address到state中
        this.$store.dispatch('getAddress')
       //异步获取当前用户信息
       this.$store.dispatch('getUser')
      }

  }
</script>

<style>

</style>
