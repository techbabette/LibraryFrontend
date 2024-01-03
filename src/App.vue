<template>
  <div id="app">
    <NavigationBar :links="navbarLinks"/>
    <router-view></router-view>
    <FooterBar :links="footerLinks"/>
    <BackToTopButton/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterBar from "./components/FooterBar.vue";
import BackToTopButton from "./components/BackToTopButton.vue";
export default {
  name: 'App',
  components : {
    NavigationBar,
    FooterBar,
    BackToTopButton
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
