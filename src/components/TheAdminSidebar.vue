<script>
import SmartRouteLink from './SmartRouteLink.vue';
export default {
    name : "TheAdminSidebar",

    components : {
        SmartRouteLink
    },

    props : {
        navigation_links : Array,
        footer_link : Object
    }
}
</script>

<template>
<div class="d-flex flex-column flex-shrink-0 bg-light sidebar-width">
    <ul class="nav nav-flush flex-column mb-auto text-center">
    <SmartRouteLink v-for="link, key in navigation_links" class="sidebar-link" active_class="sidebar-link-dark" :link="link" :key="key"/>
    </ul>
    <ul class="border-top">
        <SmartRouteLink :link="footer_link" class="sidebar-link" active_class="sidebar-link-dark"/>
    </ul>
  </div>
</template>

<style>
.sidebar-link{
    color: grey !important;
    font-size: 20px;
}
.sidebar-link-dark{
    color: black !important;
}
.sidebar-link:hover{
    color: black !important;
}

.sidebar-width{
    width: 20vw !important;
}

@media only screen and (min-width: 600px) {
.sidebar-width{
    width: 10vw !important;
}
}
</style>