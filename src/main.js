import Vue from 'vue';
import '@/plugins/vuex';
import '@/plugins/vue-router';
import '@/plugins/element';
import '@/plugins/font-aswome';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

/******************************************************
 *         _____           _   _   _       _          *
 *        |  ___|__   ___ | |_| | | |_   _| |__       *
 *        | |_ / _ \ / _ \| __| |_| | | | | '_ \      *
 *        |  _| (_) | (_) | |_|  _  | |_| | |_) |     *
 *        |_|  \___/ \___/ \__|_| |_|\__,_|_.__/      *
 *                                                    *
 ******************************************************/

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
