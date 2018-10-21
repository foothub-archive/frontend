import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

Vue.use(Router);

export const homeRoute = {
  path: '/',
  name: 'home',
  component: Home,
};

export const loginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
};

export const registerRoute = {
  path: '/register',
  name: 'register',
  component: Register,
};

export const routes = [
  homeRoute,
  loginRoute,
  registerRoute,
];

export default new Router({
  mode: 'history',
  routes,
});
