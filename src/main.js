import Vue from "vue";
import App from "./App.vue";
import vuetify from './plugins/vuetify';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
