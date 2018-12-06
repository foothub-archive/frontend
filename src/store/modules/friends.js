import { coreApi } from '../../apis/index';
import PAGINATED from '../constants/paginated'
import paginated from './paginated'
import {
  _GET_A as GET_A,
  _DELETE_A as DELETE_A,
} from '../constants/friends';

const state = {
  client: coreApi,
  url: 'friends',
};

const getters = {};

const mutations = {};

const actions = {
  [GET_A]: ({ state }, friendshipId) => new Promise((resolve, reject) => {
    state.client.get(`${state.url}/${friendshipId}`)
      .then((resp) => { resolve(resp); })
      .catch((err) => { reject(err); });
  }),
  [DELETE_A]: ({ state }, friendshipId) => new Promise((resolve, reject) => {
    state.client.delete(`${state.url}/${friendshipId}`)
      .then((resp) => { resolve(resp); })
      .catch((err) => { reject(err); });
  }),
};

const namespaced = true;

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
  modules: {
    [PAGINATED]: paginated(state.client, state.url),
  }
};
