import Vue from 'vue';
import axios from 'axios';

export const setAuthHeader = (token) => {
  Vue.axios.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export default axios.create({
  baseURL: process.env.VUE_APP_API_AUTH,
  timeout: 1000,
});
