/* eslint-disable no-param-reassign */

import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,
  NEW_TOKEN, CLEAR_TOKEN,
  USER_DATA,
} from '@/store/actions/auth';

export default {
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
