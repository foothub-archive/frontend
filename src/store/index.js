import Vuex from 'vuex';
import { IS_AUTHED_G as IS_AUTHED_G, VERIFY_A as VERIFY_A } from './constants/auth';
import AUTH from './constants/auth';
import auth from './modules/auth';
import ME from './constants/me';
import me from './modules/me';
import FRIENDS from './constants/friends';
import friends from './modules/friends';

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    [AUTH]: auth,
    [ME]: me,
    [FRIENDS]: friends,
  },
  strict: debug,
});

if (store.getters[IS_AUTHED_G]) {
  store.dispatch(VERIFY_A);
}

export default store;
