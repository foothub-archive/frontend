import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import { AUTH_VERIFY } from './actions/auth';
import me from './modules/me';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
    me,
  },
  strict: debug,
});

if (store.getters.isAuthenticated) {
  store.dispatch(AUTH_VERIFY);
}

export default store;
