import { authApi } from '../../apis';

import {
  AUTH_LOGIN, AUTH_REFRESH, AUTH_VERIFY, AUTH_LOGOUT,
  RETRIEVE_USER, CREATE_USER,
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,
  NEW_TOKEN, CLEAR_TOKEN,
  USER_DATA,
} from '../constants/auth';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  data: undefined,
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  user: state => (key) => {
    if (state.data) {
      return state.data[key];
    }
    return undefined;
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state) => {
    state.status = 'success';
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [NEW_TOKEN]: (state, token) => {
    state.token = token;
    localStorage.setItem('user-token', token);
  },
  [CLEAR_TOKEN]: (state) => {
    state.token = '';
    localStorage.removeItem('user-token');
  },
  [USER_DATA]: (state, data) => {
    state.data = data;
  },
};

const actions = {
  [AUTH_LOGIN]: ({ commit }, userCredentials) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('jwt/token-obtain', userCredentials).then((resp) => {
      commit(AUTH_SUCCESS);
      commit(NEW_TOKEN, resp.data.token);
      commit(USER_DATA, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      commit(CLEAR_TOKEN);
      commit(USER_DATA, undefined);
      reject(err);
    });
  }),
  [AUTH_REFRESH]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('jwt/token-refresh', {
      token: state.token,
    }).then((resp) => {
      commit(AUTH_SUCCESS);
      commit(NEW_TOKEN, resp.data.token);
      commit(USER_DATA, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      commit(CLEAR_TOKEN);
      commit(USER_DATA, undefined);
      reject(err);
    });
  }),
  [AUTH_VERIFY]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('jwt/token-verify', {
      token: state.token,
    }).then((resp) => {
      commit(AUTH_SUCCESS);
      commit(NEW_TOKEN, resp.data.token);
      commit(USER_DATA, resp.data.user);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      commit(CLEAR_TOKEN);
      commit(USER_DATA, undefined);
      reject(err);
    });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(CLEAR_TOKEN);
    resolve();
  }),
  [RETRIEVE_USER]: ({ commit, state }) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post(`users/${state.data.username}`).then((resp) => {
      commit(AUTH_SUCCESS);
      commit(USER_DATA, resp.data);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      commit(USER_DATA, undefined);
      reject(err);
    });
  }),
  [CREATE_USER]: ({ commit }, data) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('users', data).then((resp) => {
      commit(AUTH_SUCCESS, '');
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      reject(err);
    });
  }),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

