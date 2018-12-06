import { coreApi } from '@/apis';

import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_ERROR,
  RETRIEVE_ME,
  UPDATE_ME,
} from '@/store/actions/me';

export default {
  [RETRIEVE_ME]: ({ commit }) => new Promise((resolve, reject) => {
    commit(ME_REQUEST);
    coreApi.get('profiles/me').then((resp) => {
      commit(ME_SUCCESS, resp.data);
      resolve(resp);
    }).catch((err) => {
      commit(ME_ERROR);
      reject(err);
    });
  }),
  [UPDATE_ME]: ({ commit, getters }, data) => new Promise((resolve, reject) => {
    commit(ME_REQUEST);
    coreApi.put(`profiles/${getters.myProfileId}`, data).then((resp) => {
      commit(ME_SUCCESS, resp.data);
      resolve(resp);
    }).catch((err) => {
      commit(ME_ERROR);
      reject(err);
    });
  }),
};
