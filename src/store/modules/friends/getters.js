export default {
  friendsAreLoading: state => state.status === 'loading',
  pageQp: state => ({page: state.data.current}),
  searchQp: state => (state.search ? {search: state.search} : {}),
  queryParams: (state, getters) => {
    console.error('getters search:', state.search);
    const candidates = [getters.pageQp, getters.searchQp];
    const reducer = (accumulator, value) => Object.assign({}, accumulator, value);
    return candidates.reduce(reducer)
  },
};
