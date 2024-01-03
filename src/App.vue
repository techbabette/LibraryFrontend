<template>
  <div id="app">
    <NavigationBar :links="navbarLinks"/>
    <router-view></router-view>
    <FooterBar :links="footerLinks"/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterBar from "./components/FooterBar.vue";
export default {
  name: 'App',
  components : {
    NavigationBar,
    FooterBar
  },
  data(){
    return {
    }
  },
  computed : {
    navbarLinks : function(){
      return this.$store.getters.getNavbarLinks;
    },
    footerLinks : function(){
      return this.$store.getters.getFooterLinks;
    }
  }
}
</script>

<style>
</style>
