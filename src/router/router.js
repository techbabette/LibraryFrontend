import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/pages/LandingPage.vue";

const routes = [
    {
      path : "/", component: LandingPage, name : "Home page"
    },
  ]

Vue.use(Router);
  
const router = new Router({
    routes
})


export default router