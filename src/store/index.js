import Vuex from 'vuex';
import { AUTH_VERIFY } from './actions/auth';
import auth from './modules/auth';
import me from './modules/me';
import friends from './modules/friends';

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
    me,
    friends,
  },
  strict: debug,
});

if (store.getters.isAuthenticated) {
  store.dispatch(AUTH_VERIFY);
}

export default store;
