<script>
import TheAdminSidebar from './TheAdminSidebar.vue';
export default {
  name: 'AdminLayout',
  components : {
    TheAdminSidebar
  },
  data(){
    return {
    }
  },
  computed : {
    navbarLinks : function(){
      return this.$store.getters['navigation/adminNavbar'];
    },
    footerLinks : function(){
      return this.$store.getters['navigation/adminFooter'];
    },
  }
}
</script>

<template>
    <div class="d-flex flex-row min-vh-100">
        <TheAdminSidebar :navigation_links="navbarLinks" :footer_link="footerLinks"/>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.page{}
</style>
