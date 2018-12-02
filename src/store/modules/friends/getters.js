export default {
  friendsLoaded: state => state.data !== undefined,
  friendsStatus: state => state.status,
  friendResults: state => (state.data ? state.data.results : []),
};
