/* eslint-disable no-param-reassign */

import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIEND_SUCCESS,
  FRIENDS_ERROR,
  FRIEND_ERROR,
  FRIENDS_SEARCH,
} from '@/store/actions/friends';

export default {
  [FRIENDS_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [FRIENDS_SUCCESS]: (state, data) => {
    state.status = 'success';
    state.data = data;
  },
  [FRIEND_SUCCESS]: (state) => {
    state.status = 'success';
  },
  [FRIENDS_ERROR]: (state) => {
    state.status = 'error';
  },
  [FRIEND_ERROR]: (state) => {
    state.status = 'error';
  },
  [FRIENDS_SEARCH]: (state, search) => {
    state.search = search;
  },
};
