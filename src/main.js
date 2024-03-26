import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { Icon } from '@iconify/vue2';
import showToDirective from './directives/showToDirective'
Vue.config.productionTip = false

Vue.directive("showto", showToDirective);

Vue.component("IconifyIcon", Icon);

router.beforeEach(async function (to, from, next){
  let requestedPage = to.name;
  document.title = requestedPage;
  store.commit("navigation/changeActiveRouteName", requestedPage);
  next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
