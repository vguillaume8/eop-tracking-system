// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'
import {ClientTable} from 'vue-tables-2'

import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PictureInput from 'vue-picture-input'
import FileUpload from 'vue-simple-upload/dist/FileUpload'

import vSelect from 'vue-select'
// import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VeeValidate, { inject: 'false', fieldsBagName: 'veeFields' })
// eslint-disable-next-line no-undef
Vue.use(ClientTable, {theme: 'bootstrap3'})
Vue.use(FileUpload)
Vue.use(PictureInput)
Vue.component('v-select', vSelect)
Vue.use(BootstrapVue)
Vue.use(VModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
