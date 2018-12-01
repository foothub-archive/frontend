import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export const setAuthHeader = () => {
  const token = localStorage.getItem('user-token');
  if (token) {
    Vue.axios.defaults.headers.common.Authorization = `JWT ${token}`;
  }
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

setAuthHeader();
