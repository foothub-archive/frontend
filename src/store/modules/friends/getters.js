export default {
  friendsAreLoading: state => state.status === 'loading',
  friendResults: state => (state.data ? state.data.results : []),
  queryParams: state => (state.search !== '' ? `?search=${state.search}` : ''),
};
