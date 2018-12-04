import axios from 'axios';

// ensure that we always use the latest saved user-token
function preRequestAuth(config) {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.common.Authorization = `JWT ${token}`; // eslint-disable-line no-param-reassign
  }
  return config;
}

const timeout = 1000;

export const authApi = axios.create({
  baseURL: process.env.VUE_APP_API_AUTH,
  timeout,
});

export const coreApi = axios.create({
  baseURL: process.env.VUE_APP_API_CORE,
  timeout,
});

// use interceptors on instance (on default does not work)
authApi.interceptors.request.use(preRequestAuth, undefined);
coreApi.interceptors.request.use(preRequestAuth, undefined);
