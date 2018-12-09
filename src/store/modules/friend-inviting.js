import { coreApi } from '../../apis/index';
import PAGINATED from '../constants/paginated'
import paginated from './paginated'
import {
  _POST_A as POST_A,
  _DELETE_A as DELETE_A,
} from '../constants/friend-inviting';

const state = {
  client: coreApi,
  url: 'created_friend_invitations',
};

const getters = {};

const mutations = {};

const actions = {
  [POST_A]: ({ state }, profileUuid) => new Promise((resolve, reject) => {
    state.client.post(`${state.url}`, {friend_uuid: profileUuid})
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
