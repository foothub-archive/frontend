import Vue from 'vue';
import '@/plugins/vuex';
import '@/plugins/vue-router';
import '@/plugins/axios';
import '@/plugins/element';
import '@/plugins/font-aswome';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
