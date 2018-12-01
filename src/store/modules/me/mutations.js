/* eslint-disable no-param-reassign */

import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_ERROR,
} from '@/store/actions/me';


export default {
  [ME_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [ME_SUCCESS]: (state, myProfile) => {
    state.status = 'success';
    state.myProfile = myProfile;
  },
  [ME_ERROR]: (state) => {
    state.status = 'error';
    state.myProfile = undefined;
  },
};
