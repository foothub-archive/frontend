import { GET_FRIEND_A, DELETE_FRIEND_A} from '../../actions/friends';

export default {
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
