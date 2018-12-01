import authApi from '@/apis/auth';

import {
  AUTH_LOGIN, AUTH_REFRESH, AUTH_VERIFY, AUTH_LOGOUT,
  RETRIEVE_USER, CREATE_USER,
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,
  NEW_TOKEN, CLEAR_TOKEN,
  USER_DATA,
} from '@/store/actions/auth';

export default {
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
      console.log('refresh err');
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
      console.log('refresh err');
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
      console.log('refresh err');
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
