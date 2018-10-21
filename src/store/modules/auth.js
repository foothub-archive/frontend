/* eslint-disable no-param-reassign */
import router, { homeRoute } from '@/router';
import authApi, {
  setAuthHeader,
  clearAuthHeader,
} from '@/apis/auth';
import {
  AUTH_REQUEST,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '@/store/actions/auth';

const theState = {
  token: localStorage.getItem('user-token') || '',
  status: '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, userCredentials) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('jwt/token-obtain', userCredentials).then((resp) => {
      localStorage.setItem('user-token', resp.token);
      setAuthHeader(resp.token);
      commit(AUTH_SUCCESS, resp);
      // dispatch(USER_REQUEST);
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      clearAuthHeader();
      reject(err);
    });
  }),
  [AUTH_SIGNUP]: ({ commit }, userData) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('users/create', userData).then((resp) => {
      resolve(resp);
    }).catch((err) => {
      reject(err);
    });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('user-token');
    router.push(homeRoute.path);
    resolve();
  }),
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.token = resp.token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
  },
};

export default {
  state: theState,
  getters,
  actions,
  mutations,
};
