<template>
    <header class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-dark mk-background">
                <div class="container-fluid" id="actual-navbar">
                    <SmartRouteLink v-if="headerLink" :Link="headerLink" class="h4"/>
                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                   </button>
                <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li v-for="link, key in links" :key="key" class="nav-item">
                            <SmartRouteLink :Link="link"/>
                        </li>
                        <li>
                            <a href="" @click.prevent="attemptLogout" class="nav-link" v-showto="1"><span>Log out</span></a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>
<script>
import SmartRouteLink from './SmartRouteLink.vue';
export default {
  name: 'NavigationBar',
  components : {
    SmartRouteLink
  },
  props: {
    links: Array,
    headerLink: Object
  },
  methods : {
    async attemptLogout(){
            let response = await this.$store.dispatch("attemptLogout");

            if(response.success){
                this.$router.push("/").catch(() => {});
            }
        }
  }
}
</script>