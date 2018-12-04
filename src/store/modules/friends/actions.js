import { coreApi } from '@/apis/index';

import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIEND_SUCCESS,
  FRIENDS_ERROR,
  FRIEND_ERROR,
  LIST_FRIENDS,
  RETRIEVE_FRIEND,
  DESTROY_FRIEND,
} from '@/store/actions/friends';

export default {
  [LIST_FRIENDS]: ({ getters, commit }) => new Promise((resolve, reject) => {
    commit(FRIENDS_REQUEST);
    coreApi.get(`friends${getters.queryParams}`).then((resp) => {
      commit(FRIENDS_SUCCESS, resp.data);
      resolve(resp);
    }).catch((err) => {
      commit(FRIENDS_ERROR);
      reject(err);
    });
  }),
  [RETRIEVE_FRIEND]: ({ commit }, friendshipId) => new Promise((resolve, reject) => {
    commit(FRIENDS_REQUEST);
    coreApi.get(`friends/${friendshipId}`).then((resp) => {
      commit(FRIEND_SUCCESS);
      resolve(resp);
    }).catch((err) => {
      commit(FRIEND_ERROR);
      reject(err);
    });
  }),
  [DESTROY_FRIEND]: ({ commit }, friendshipId) => new Promise((resolve, reject) => {
    commit(FRIENDS_REQUEST);
    coreApi.delete(`friends/${friendshipId}`).then((resp) => {
      commit(FRIEND_SUCCESS);
      resolve(resp);
    }).catch((err) => {
      commit(FRIEND_ERROR);
      reject(err);
    });
  }),
};
