import { coreApi } from '../../apis/index';
import paginated from './paginated'
import { GET_FRIEND_A, DELETE_FRIEND_A} from '../constants/friends';

const state = {
  client: coreApi,
  url: 'friends',
};

const getters = {};

const mutations = {};

const actions = {
  [GET_FRIEND_A]: ({ state }, friendshipId) => new Promise((resolve, reject) => {
    state.client.get(`${state.url}/${friendshipId}`)
      .then((resp) => { resolve(resp); })
      .catch((err) => { reject(err); });
  }),
  [DELETE_FRIEND_A]: ({ state }, friendshipId) => new Promise((resolve, reject) => {
    state.client.delete(`${state.url}/${friendshipId}`)
      .then((resp) => { resolve(resp); })
      .catch((err) => { reject(err); });
  }),
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
  modules: {
    paginated: paginated(state.client, state.url),
  }
};
