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

// state is the output of a function so it can be reused
const buildState = (client, url) => ({
  // these must be provided by whoever is using this module
  client: client, // http client (axios instance)
  url: url, // url that should be queried
  // namespaced so it can be merged "carelessly"
  status: '', // '', loading, success, error
  search: '', // search keyword, used when getting data

  results: [], // list of items
  current: 1, // current page number
  count: 0, // total item count
});

const getters = {
  // true when waiting for a response
  loading: state => state.status === 'loading',
  hasResults: state => state.results.length > 0,
  // page related query parameters obj
  pageQueryParam: state => ({page: state.current}),
  // search related query params obj
  searchQueryParam: state => (state.search ? {search: state.search} : {}),
  // build final query params obj
  queryParams: (state, getters) => {
    const reducer = (accumulator, value) => Object.assign({}, accumulator, value);
    return [getters.pageQueryParam, getters.searchQueryParam].reduce(reducer)
  },
};

// todo: move these constants to a separate file. used them.
export const PAGINATED_REQUEST_M = 'PAGINATED_REQUEST_M';
export const PAGINATED_SUCCESS_M = 'PAGINATED_SUCCESS_M ';
export const PAGINATED_ERROR_M = 'PAGINATED_ERROR_M';

export const PAGINATED_SEARCH_M = 'PAGINATED_SEARCH_M';
export const PAGINATED_CURRENT_M = 'PAGINATED_CURRENT_M';

/* eslint-disable no-param-reassign */
export const mutations = {
  // before requesting
  [PAGINATED_REQUEST_M]: (state) => {
    state.status = 'loading';
  },
  // on a success request
  [PAGINATED_SUCCESS_M]: (state, data) => {
    state.status = 'success';
    state.results = data.results;
    state.currentPage = data.current;
    state.itemCount = data.count;
  },
  // on a failed request
  [PAGINATED_ERROR_M]: (state) => {
    state.status = 'error';
  },
  // for mutating the search pattern
  [PAGINATED_SEARCH_M]: (state, search) => {
    state.search = search;
  },
  // for mutating the current page
  [PAGINATED_CURRENT_M]: (state, current) => {
    state.current = current;
  },
};
/* eslint-enable no-param-reassign */

// todo: move these constants to a separate file. used them.
export const PAGINATED_LIST_A = 'PAGINATED_LIST_A';

const actions = {
  // fetches items, mutates state
  [PAGINATED_LIST_A]: ({ state, getters, commit }) => new Promise((resolve, reject) => {
    commit(PAGINATED_REQUEST_M);
    state.client.get(state.url, { params: getters.queryParams })
      .then((resp) => {
        commit(PAGINATED_SUCCESS_M, resp.data);
        resolve(resp);
      })
      .catch((err) => {
        commit(PAGINATED_ERROR_M);
        reject(err);
      });
  }),
};

const paginated = (client, url) => ({
  state : buildState(client, url),
  getters,
  mutations,
  actions,
  namespaced: true,
});

export default paginated
