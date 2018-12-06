import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import paginated from '../../mixins/paginated'

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
