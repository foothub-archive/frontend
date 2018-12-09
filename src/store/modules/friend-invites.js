import { coreApi } from '../../apis/index';
import PAGINATED from '../constants/paginated'
import paginated from './paginated'
import {
  _ACCEPT_A as ACCEPT_A,
  _DELETE_A as DELETE_A,
} from '../constants/friend-invites';

const state = {
  client: coreApi,
  url: 'received_friend_invitations',
};

const getters = {};

const mutations = {};

const actions = {
  [ACCEPT_A]: ({ state }, inviteId) => new Promise((resolve, reject) => {
    state.client.post(`${state.url}/${inviteId}/accept`)
      .then((resp) => { resolve(resp); })
      .catch((err) => { reject(err); });
  }),
  [DELETE_A]: ({ state }, inviteId) => new Promise((resolve, reject) => {
    state.client.delete(`${state.url}/${inviteId}`)
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
