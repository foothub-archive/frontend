import Vuex from 'vuex';
import { IS_AUTHED_G as IS_AUTHED_G, VERIFY_A as VERIFY_A } from './constants/auth';
import AUTH from './constants/auth';
import auth from './modules/auth';
import USER from './constants/user';
import user from './modules/user';
import ME from './constants/me';
import me from './modules/me';
import FRIENDS from './constants/friends';
import friends from './modules/friends';
import FRIEND_INVITED from './constants/friend-invited';
import friendInvited from './modules/friend-invited'
import FRIEND_INVITING from './constants/friend-inviting'
import friendInviting from './modules/friend-inviting'
import FRIEND_PROFILES from './constants/friend-profiles'
import friendProfiles from './modules/friend-profiles'

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    [AUTH]: auth,
    [USER]: user,
    [ME]: me,
    [FRIENDS]: friends,
    [FRIEND_INVITED]: friendInvited,
    [FRIEND_INVITING]: friendInviting,
    [FRIEND_PROFILES]: friendProfiles,
  },
  strict: debug,
});

if (store.getters[IS_AUTHED_G]) {
  store.dispatch(VERIFY_A);
}

export default store;
