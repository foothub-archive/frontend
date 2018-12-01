/* eslint-disable no-param-reassign */

import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_ERROR,
  ME_NAME,
} from '@/store/actions/me';


export default {
  [ME_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [ME_SUCCESS]: (state, data) => {
    state.status = 'success';
    state.data = data;
  },
  [ME_ERROR]: (state) => {
    state.status = 'error';
  },
  [ME_NAME]: (state, name) => {
    state.data.name = name;
  },
};
