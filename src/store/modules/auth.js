/* eslint-disable no-param-reassign */
import authApi, {
  setAuthHeader,
  clearAuthHeader,
} from '@/apis/auth';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
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
  [AUTH_LOGIN]: ({ commit }, userCredentials) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    authApi.post('jwt/token-obtain', userCredentials).then((resp) => {
      const { token } = resp.data;
      localStorage.setItem('user-token', token);
      setAuthHeader(token);
      commit(AUTH_SUCCESS, token);
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
    authApi.post('users', userData).then((resp) => {
      commit(AUTH_SUCCESS, '');
      resolve(resp);
    }).catch((err) => {
      commit(AUTH_ERROR);
      reject(err);
    });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('user-token');
    resolve();
  }),
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = '';
    state.token = '';
  },
};

export default {
  state: theState,
  getters,
  actions,
  mutations,
};
