import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import showToDirective from './directives/showToDirective'
Vue.config.productionTip = false

Vue.directive("showto", showToDirective);


await store.dispatch("navigation/fetch");

router.beforeEach(async function (to, from, next){
  let requestedPage = to.name;
  let userAllowedAccess = store.getters['navigation/links'].some(link => link.to === requestedPage);
  if(userAllowedAccess){
    document.title = to.name;
    store.commit("navigation/changeActiveRouteName", requestedPage);
    next();
    return;
  }
  router.push("/").catch(()=>{});
  console.warn("You're not allowed to see the requested page");
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
