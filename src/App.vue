<template>
  <div id="app">
    <TheUserNavigationBar :links="navbarLinks" :header-link="HeaderLink"/>
    <router-view></router-view>
    <TheUserFooterBar :links="footerLinks"/>
    <ButtonBackToTop/>
    <MessageDisplay/>
  </div>
</template>

<script>
import TheUserNavigationBar from "./components/TheUserNavigationBar.vue";
import TheUserFooterBar from "./components/TheUserFooterBar.vue";
import ButtonBackToTop from "./components/ButtonBackToTop.vue";
import MessageDisplay from "./components/MessageDisplay.vue";
export default {
  name: 'App',
  components : {
    TheUserNavigationBar,
    TheUserFooterBar,
    ButtonBackToTop,
    MessageDisplay
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
    },
    HeaderLink : function(){
        return this.$store.getters.getHeaderLink;
    }
  }
}
</script>

<style>
</style>
