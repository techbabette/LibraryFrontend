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
      navbarLinks : [
        {
          text : "Pocetna",
          to : "/"
        },
        {
          text : "Knjige",
          to : "/knjige"
        },
        {
          text : "Favoriti",
          to : "/favoriti"
        },
        {
          text : "O autoru",
          to : "autor"
        }
      ],
      footerLinks : [
        {
            "to" : "https://www.facebook.com/",
            "text" : "icomoon-free:facebook",
        },
        {
            "to" : "https://www.twitter.com/",
            "text" : "la:twitter",
        },
        {
            "to" : "documentation.pdf",
            "text" : "fa-file",
        },
        {
            "to" : "sitemap.xml",
            "text" : "bx:sitemap",
        }
    ]
    }
  }
}
</script>

<style>
</style>
