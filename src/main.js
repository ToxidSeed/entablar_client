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



const gauthOption = {
  clientId: '435471540706-icu11lq037akvpb6p2eep3s49f6v5icc.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(Quasar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
