<template>
  <div id="app">
    <TheUserNavigationBar :links="navbarLinks" :header_link="HeaderLink"/>
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
      return this.$store.getters['navigation/userNavbar'];
    },
    footerLinks : function(){
      return this.$store.getters['navigation/userFooter'];
    },
    HeaderLink : function(){
        return this.$store.getters['navigation/headerLink'];
    }
  }
}
</script>

<style>
</style>
