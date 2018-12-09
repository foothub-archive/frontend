/**
 * reusable state, getters, mutations and actions for paginated-response data
 * example request:
 *    GET http://api/resources?page=3&search=example
 * example response (JSON):
 *    data: {
 *      "results": [{id: 14, name: 'Acci', id: 12, Chicho}],
 *      "current": 3,
 *      "itemCount": 10,
 *      "next": 4,
 *      "previous": 2,
 *    }
 */

import {
  _LOADING_G as LOADING_G,
  _HAS_RESULTS_G as HAS_RESULTS_G,
  _PER_PAGE_QPARAMS_G as PER_PAGE_QPARAMS_G,
  _PAGE_QPARAMS_G as PAGE_QPARAMS_G,
  _SEARCH_QPARAMS_G as SEARCH_QPARAMS_G,
  _QPARAMS_G as QPARAMS_G,
  _REQUEST_M as REQUEST_M,
  _SUCCESS_M as SUCCESS_M,
  _ERROR_M as ERROR_M,
  _PER_PAGE_M as PER_PAGE_M,
  _CURRENT_M as CURRENT_M,
  _SEARCH_M as SEARCH_M,
  _LIST_A as LIST_A,
} from '../constants/paginated';

// state is the output of a function so it can be reused
const buildState = (client, url, perPage) => ({
  // these must be provided by whoever is using this module
  client: client, // http client (axios instance)
  url: url, // url that should be queried

  status: '', // '', loading, success, error
  search: '', // search keyword, used when getting data

  results: [], // list of items
  current: 1, // current page number
  count: 0, // total item count
  perPage: perPage || 14, // number of items per page (default is 14)
});

const getters = {
  // true when waiting for a response
  [LOADING_G]: state => state.status === 'loading',
  [HAS_RESULTS_G]: state => state.results.length > 0,
  // number of items per page for query params
  [PER_PAGE_QPARAMS_G]: state => ({page_size: state.perPage}),
  // page related query parameters obj
  [PAGE_QPARAMS_G]: state => ({page: state.current}),
  // search related query params obj
  [SEARCH_QPARAMS_G]: state => (state.search ? {search: state.search} : {}),
  // build final query params obj
  [QPARAMS_G]: (state, getters) => {
    const qps = [
      getters[PER_PAGE_QPARAMS_G],
      getters[PAGE_QPARAMS_G],
      getters[SEARCH_QPARAMS_G],
    ];
    return qps.reduce((accumulator, value) => Object.assign({}, accumulator, value));
  },
};

/* eslint-disable no-param-reassign */
export const mutations = {
  // before requesting
  [REQUEST_M]: (state) => {
    state.status = 'loading';
  },
  // on a success request
  [SUCCESS_M]: (state, data) => {
    state.status = 'success';
    state.results = data.results;
    state.currentPage = data.current;
    state.itemCount = data.count;
  },
  // on a failed request
  [ERROR_M]: (state) => {
    state.status = 'error';
  },
  // for mutating the per page item count
  [PER_PAGE_M]: (state, perPage) => {
    state.perPage = perPage;
  },
  // for mutating the current page
  [CURRENT_M]: (state, current) => {
    state.current = current;
  },
  // for mutating the search pattern
  [SEARCH_M]: (state, search) => {
    state.search = search;
  },
};
/* eslint-enable no-param-reassign */

const actions = {
  // fetches items, mutates state
  [LIST_A]: ({ state, getters, commit }) => new Promise((resolve, reject) => {
    commit(REQUEST_M);
    state.client.get(state.url, { params: getters[QPARAMS_G] })
      .then((resp) => {
        commit(SUCCESS_M, resp.data);
        resolve(resp);
      })
      .catch((err) => {
        commit(ERROR_M);
        reject(err);
      });
  }),
};

const namespaced = true;

const paginated = (client, url, perPage) => ({
  state : buildState(client, url, perPage),
  getters,
  mutations,
  actions,
  namespaced,
});

export default paginated
