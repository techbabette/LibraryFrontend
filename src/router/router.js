import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/PageLanding.vue";
import BooksPage from "../components/PageBooksSearch.vue";
import BookPage from "../components/PageBookSingle.vue";
import YourBooks from "../components/PageBooksForUser.vue";
import LoginPage from "../components/PageLogin.vue";

const routes = [
    {
      path : "/", component: LandingPage, name : "Home"
    },
    {
      path : "/books", component: BooksPage, name : "Books"
    },
    {
      path : "/book/:id", component: BookPage, name : "Book preview"
    },
    {
      path : "/yourbooks", component : YourBooks, name : "Your books"
    },
    {
      path : "/login", component : LoginPage, name : "Login"
    }
  ]

Vue.use(Router);
  
const router = new Router({
    routes
})


export default router