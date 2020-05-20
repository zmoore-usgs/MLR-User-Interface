import Vue from "vue";
import App from "@/App.vue";
import vuetify from '@/plugins/vuetify';
import router from "@/plugins/router";
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
