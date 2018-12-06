import { coreApi } from '../../apis';
import {
  _LOADING_G as LOADING_G,
  _LOADED_G as LOADED_G,
  _ID_G as ID_G,
  _REQUEST_M as REQUEST_M,
  _SUCCESS_M as SUCCESS_M,
  _ERROR_M as ERROR_M,
  _NAME_M as NAME_M,
  _GET_A as GET_A,
  _PUT_A as PUT_A,
} from '../constants/me';

const state = {
  client: coreApi,
  url: 'profiles',
  profile: {}, // my profile data
  status: '', // '', loading, success, error
};

const getters = {
  // true when waiting for a response
  [LOADING_G]: state => state.status === 'loading',
  // true after successful response
  [LOADED_G]: state => Object.keys(state.profile).length > 0,
  [ID_G]: (state) => state.profile.uuid,
};

/* eslint-disable no-param-reassign */
const mutations =  {
  // before requesting
  [REQUEST_M]: (state) => {
    state.status = 'loading';
  },
  // on a success request
  [SUCCESS_M]: (state, profile) => {
    state.status = 'success';
    state.profile = profile;
  },
  // on a failed request
  [ERROR_M]: (state) => {
    state.status = 'error';
  },
  // for mutating profile name
  [NAME_M]: (state, name) => {
    state.profile.name = name;
  },
};
/* eslint-enable no-param-reassign */

const actions = {
  [GET_A]: ({ state, commit }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    state.client.get(`${state.url}/me`)
      .then((resp) => {
        commit(SUCCESS_M, resp.data);
        resolve(resp);
      }).catch((err) => {
        commit(ERROR_M);
        reject(err);
      });
  }),
  [PUT_A]: ({ state, getters, commit }, data) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    state.client.put(`${state.url}/${getters.id}`, data)
      .then((resp) => {
        commit(SUCCESS_M, resp.data);
        resolve(resp);
      }).catch((err) => {
        commit(ERROR_M);
        reject(err);
      });
  }),
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
