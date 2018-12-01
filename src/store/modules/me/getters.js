export default {
  isMyProfileLoaded: state => state.myProfile !== undefined,
  profileStatus: state => state.status,
  myProfile: (state, getters) => (key) => {
    if (getters.isMyProfileLoaded) {
      return state.myProfile[key];
    }
    return undefined;
  },
};
