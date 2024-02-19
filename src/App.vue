<template>
  <div id="app">
    <PageLayoutUser v-if="!adminRouteActive"/>
    <PageLayoutAdmin v-if="adminRouteActive"/>
    <ButtonBackToTop/>
    <MessageDisplay/>
  </div>
</template>

<script>
import PageLayoutUser from "./components/PageLayoutUser.vue"
import PageLayoutAdmin from "./components/PageLayoutAdmin.vue";
import ButtonBackToTop from "./components/ButtonBackToTop.vue";
import MessageDisplay from "./components/MessageDisplay.vue";
export default {
  name: 'App',
  components : {
    PageLayoutUser,
    PageLayoutAdmin,
    ButtonBackToTop,
    MessageDisplay
  },
  data(){
    return {
    }
  },
  computed : {
    adminRouteActive : function(){
      return this.$store.getters['navigation/adminRouteActive'];
    }
  }
}
</script>

<style>
    @import '@/assets/styles/user/user.css'
</style>
