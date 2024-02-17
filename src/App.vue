<template>
  <div id="app">
    <NavigationBar :links="navbarLinks" :header-link="HeaderLink"/>
    <router-view></router-view>
    <FooterBar :links="footerLinks"/>
    <BackToTopButton/>
    <MessageDisplay/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterBar from "./components/FooterBar.vue";
import BackToTopButton from "./components/BackToTopButton.vue";
import MessageDisplay from "./components/MessageDisplay.vue";
export default {
  name: 'App',
  components : {
    NavigationBar,
    FooterBar,
    BackToTopButton,
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
