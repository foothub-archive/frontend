import { coreApi } from '../../apis';

import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_ERROR,
  ME_NAME,
  RETRIEVE_ME,
  UPDATE_ME,
} from '../constants/me';


const state = {
  data: undefined,
  status: '',
};

const getters = {
  isMyProfileLoaded: state => state.data !== undefined,
  profileStatus: state => state.status,
  myProfile: (state, getters) => (key) => {
    if (getters.isMyProfileLoaded) {
      return state.data[key];
    }
    return undefined;
  },
  myProfileId: (state, getters) => getters.myProfile('uuid'),
};

/* eslint-disable no-param-reassign */
const mutations =  {
  [ME_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [ME_SUCCESS]: (state, data) => {
    state.status = 'success';
    state.data = data;
  },
  [ME_ERROR]: (state) => {
    state.status = 'error';
  },
  [ME_NAME]: (state, name) => {
    state.data.name = name;
  },
};
/* eslint-enable no-param-reassign */

const actions = {
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

export default {
  state,
  getters,
  actions,
  mutations,
};
