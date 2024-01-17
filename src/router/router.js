import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/pages/LandingPage.vue";
import BooksPage from "../components/pages/BooksPage.vue";

const routes = [
    {
      path : "/", component: LandingPage, name : "Home"
    },
    {
      path : "/books", component: BooksPage, name : "Books"
    }
  ]

Vue.use(Router);
  
const router = new Router({
    routes
})


export default router