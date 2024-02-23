import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/PageLanding.vue";
import BooksPage from "../components/PageBooksSearch.vue";
import BookPage from "../components/PageBookSingle.vue";
import YourBooks from "../components/PageUserBooks.vue";
import LoginPage from "../components/PageUserLogin.vue";
import RegistrationPage from "../components/PageUserRegister.vue";
import PageContact from "@/components/PageContact.vue";

import PageAdminDashboard from "../components/PageAdminDashboard.vue"
import PageAdminControl from "../components/PageAdminControl.vue"
import PageAdminLogs from "../components/PageAdminLogs.vue"

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
    },
    {
      path : "/register", component : RegistrationPage, name : "Register"
    },
    {
      path : "/contact", component : PageContact, name : "Contact"
    },
    {
      path : "/admin", component : PageAdminDashboard, name : "Admin Dashboard"
    },
    {
      path : "/admin/control", component : PageAdminControl, name : "Admin Control"
    },
    {
      path : "/admin/logs", component : PageAdminLogs, name : "Admin Logs"
    }
  ]

Vue.use(Router);
  
const router = new Router({
    routes
})


export default router