import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import 'quasar-extras/mdi'
import Quasar from 'quasar'
import router from '@/routes.js';
import axios from 'axios'
import app_config from '@/config.js'

console.log(app_config)
console.log(app_config.gauth_client_id)

const gauthOption = {
  clientId: app_config.gauth_client_id,
  scope: 'profile email',
  prompt: 'select_account'
}

console.log(gauthOption)

Vue.use(GAuth, gauthOption)
Vue.use(Quasar)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL  = "http://127.0.0.1:5000/entablar/"


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
