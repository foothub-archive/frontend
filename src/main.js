import Vue from 'vue';
import '@/plugins/vuex';
import '@/plugins/vue-router';
import '@/plugins/element';
import '@/plugins/font-aswome';
import App from './App.vue';
import router from './router';
import { authApi, coreApi } from './services';

import store from './shared/src/vuex-store';
import { TOKEN_M } from './client-shared/src/vuex-store/constants/auth'
import registerInterceptors from './client-shared/src/interceptors';

registerInterceptors([authApi, coreApi]);

Vue.config.productionTip = false;

store.commit(TOKEN_M, localStorage.getItem('user-token'));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
