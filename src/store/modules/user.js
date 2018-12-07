import { authApi } from '../../apis';

import {
  _LOADED_G as LOADED_G,
  _REQUEST_M as REQUEST_M,
  _SUCCESS_M as SUCCESS_M,
  _ERROR_M as ERROR_M,
  _USER_M as USER_M,
  _CLEAR_USER_M as CLEAR_USER_M,
  _POST_A as POST_A,
  _GET_A as GET_A,
} from '../constants/user';

const state = {
  client: authApi,
  url: 'users',
  status: '', // '', loading, success, error
  user: {}, // user data
};

const getters = {
  // true after successful response
  [LOADED_G]: state => Object.keys(state.user).length > 0,

};

/* eslint-disable no-param-reassign */
const mutations = {
  [REQUEST_M]: (state) => {
    state.status = 'loading';
  },
  [SUCCESS_M]: (state) => {
    state.status = 'success';
  },
  [ERROR_M]: (state) => {
    state.status = 'error';
  },
  [USER_M]: (state, user) => {
    state.user = user;
  },
  [CLEAR_USER_M]: (state) => {
    state.user = {};
  },
};

const actions = {
  [POST_A]: ({ commit }, data) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post('users', data)
      .then((resp) => {
        commit(SUCCESS_M, '');
        resolve(resp);
      }).catch((err) => {
        commit(ERROR_M);
        reject(err);
      });
  }),
  [GET_A]: ({ state, commit }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    console.error(`${state.url}/me not implemented - faking user state`);
    commit(SUCCESS_M); // todo: remove this
    commit(USER_M, {username: 'John Doe', email: 'followMeOnFootHub@fh.com'});
    resolve();
    /**
    state.client.post(`${state.url}/me`)
      .then((resp) => {
        commit(SUCCESS_M);
        commit(USER_M, resp.data);
        resolve(resp);
      }).catch((err) => {
        commit(ERROR_M);
        commit(CLEAR_USER_M);
        reject(err);
      });
    */
  }),
};

const namespaced = true;

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
};
