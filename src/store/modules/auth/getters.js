export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  user: state => (key) => {
    if (state.data) {
      return state.data[key];
    }
    return undefined;
  },
};
