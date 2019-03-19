// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PictureInput from 'vue-picture-input'
import * as VueGoogleMaps from 'vue2-google-maps'
import FileUpload from 'vue-simple-upload/dist/FileUpload'
import vSelect from 'vue-select'
// import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(FileUpload)
Vue.use(PictureInput)
Vue.component('v-select', vSelect)
Vue.use(BootstrapVue)
Vue.use(VModal)
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
