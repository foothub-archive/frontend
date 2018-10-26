import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import store from '@/store';

Vue.use(Router);

export const homeRoute = {
  path: '/',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true },
};

export const loginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { redirectsIfAuth: true },
};

export const registerRoute = {
  path: '/register',
  name: 'register',
  component: Register,
  meta: { requiresAuth: true },
};

export const routes = [
  homeRoute,
  loginRoute,
  registerRoute,
];

const router = new Router({
  mode: 'history',
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      console.log(to);
      next({
        name: loginRoute.name,
        query: { next: to.name },
      });
    }
  }
  next();
});

export default router;
