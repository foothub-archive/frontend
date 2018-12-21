import axios from 'axios';

const timeout = 1000;

export const authApi = axios.create({
  baseURL: process.env.VUE_APP_API_AUTH,
  timeout,
});

export const coreApi = axios.create({
  baseURL: process.env.VUE_APP_API_CORE,
  timeout,
});
