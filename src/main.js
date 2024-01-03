import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
Vue.config.productionTip = false

require('@/assets/styles/style.css')

router.beforeEach(function (to, from, next){
  let requestedPage = to.name;
  let userAllowedAccess = true;
  if(userAllowedAccess){
    document.title = to.name;
    store.commit("changeActiveRouteName", requestedPage);
    next();
    return;
  }
  router.push("/");
  console.warn("You're not allowed to see the requested page");
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
