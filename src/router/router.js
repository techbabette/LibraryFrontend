import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/pages/LandingPage.vue";
import BooksPage from "../components/pages/BooksPage.vue";
import BookPage from "../components/pages/BookPage.vue";
import YourBooks from "../components/pages/YourBooks.vue";
import LoginPage from "../components/pages/LoginPage.vue";

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