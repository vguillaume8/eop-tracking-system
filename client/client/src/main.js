import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import VueResource from 'vue-resource'
import VueGoodTable from 'vue-good-table';




Vue.use(VueResource);
Vue.use(VModal);
Vue.use(VueGoodTable);
Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
