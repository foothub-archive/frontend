export default {
  isMyProfileLoaded: state => state.data !== undefined,
  profileStatus: state => state.status,
  myProfile: (state, getters) => (key) => {
    if (getters.isMyProfileLoaded) {
      return state.data[key];
    }
    return undefined;
  },
  myProfileId: (state, getters) => getters.myProfile('uuid'),
};
