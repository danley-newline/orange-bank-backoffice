import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'
import VueSimpleAlert from "vue-simple-alert";
import setAuthHeader from "./services/setAuthHeaders.js"
import VueMoment from 'vue-moment'
import Toasted from 'vue-toasted'


Vue.use(VueMoment);
Vue.use(VueSimpleAlert);
Vue.use(Chartkick.use(Chart))
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toasted)


if (localStorage.token) {
  setAuthHeader(localStorage.token);  

  if (window.location.pathname == "/login") {

    // alert("Page Innacessible")
    
    window.location.href = "/";
  }
}
else
{
 
  setAuthHeader(false);
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
