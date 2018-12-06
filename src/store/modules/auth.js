import { authApi } from '../../apis';

import {
  _IS_AUTHED_G as IS_AUTHED_G,
  _REQUEST_M as REQUEST_M,
  _SUCCESS_M as SUCCESS_M,
  _ERROR_M as ERROR_M,
  _TOKEN_M as TOKEN_M,
  _CLEAR_TOKEN_M as CLEAR_TOKEN_M,
  _USER_M as USER_M,
  _CLEAR_USER_M as CLEAR_USER_M,
  _LOGIN_A as LOGIN_A,
  _REFRESH_A as REFRESH_A,
  _VERIFY_A as VERIFY_A,
  _LOGOUT_A as LOGOUT_A,
  _POST_USER_A as POST_USER_A,
  _GET_USER_A as GET_USER_A,
} from '../constants/auth';

const state = {
  client: authApi,
  url: 'auth',
  token: localStorage.getItem('user-token') || '',
  status: '',
  user: {},
};

const getters = {
  [IS_AUTHED_G]: state => !!state.token,
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
  [TOKEN_M]: (state, token) => {
    state.token = token;
    localStorage.setItem('user-token', token);
  },
  [CLEAR_TOKEN_M]: (state) => {
    state.token = '';
    localStorage.removeItem('user-token');
  },
  [USER_M]: (state, data) => {
    state.data = data;
  },
  [CLEAR_USER_M]: (state) => {
    state.data = {};
  },
};

const actions = {
  [LOGIN_A]: ({ commit }, userCredentials) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post('jwt/token-obtain', userCredentials).then((resp) => {
      commit(SUCCESS_M);
      commit(TOKEN_M, resp.data.token);
      commit(USER_M, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(ERROR_M);
      commit(CLEAR_TOKEN_M);
      commit(CLEAR_USER_M);
      reject(err);
    });
  }),
  [REFRESH_A]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post('jwt/token-refresh', {
      token: state.token,
    }).then((resp) => {
      commit(SUCCESS_M);
      commit(TOKEN_M, resp.data.token);
      commit(USER_M, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(ERROR_M);
      commit(CLEAR_TOKEN_M);
      commit(CLEAR_USER_M);
      reject(err);
    });
  }),
  [VERIFY_A]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post('jwt/token-verify', {
      token: state.token,
    }).then((resp) => {
      commit(SUCCESS_M);
      commit(TOKEN_M, resp.data.token);
      commit(USER_M, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(ERROR_M);
      commit(CLEAR_TOKEN_M);
      commit(CLEAR_USER_M);
      reject(err);
    });
  }),
  [LOGOUT_A]: ({ commit }) => new Promise((resolve) => {
    commit(CLEAR_TOKEN_M);
    commit(CLEAR_USER_M);
    resolve();
  }),
  [POST_USER_A]: ({ commit }, data) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post('users', data).then((resp) => {
      commit(SUCCESS_M, '');
      resolve(resp);
    }).catch((err) => {
      commit(ERROR_M);
      reject(err);
    });
  }),
  [GET_USER_A]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    authApi.post(`users/${state.data.username}`).then((resp) => {
      commit(SUCCESS_M);
      commit(USER_M, resp.data);
      resolve(resp);
    }).catch((err) => {
      commit(ERROR_M);
      commit(CLEAR_USER_M);
      reject(err);
    });
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

