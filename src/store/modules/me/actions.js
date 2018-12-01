import coreApi from '@/apis/core';

import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_ERROR,
  RETRIEVE_ME,
  // UPDATE_ME,
} from '@/store/actions/me';

export default {
  [RETRIEVE_ME]: ({ commit }) => new Promise((resolve, reject) => {
    commit(ME_REQUEST);
    const t = localStorage.getItem('user-token');
    console.log(t);
    // { headers: { Authorization: `JWT ${t}` } }
    coreApi.get('profiles/me').then((resp) => {
      commit(ME_SUCCESS, resp.data);
      resolve(resp);
    }).catch((err) => {
      commit(ME_ERROR);
      reject(err);
    });
  }),
};
