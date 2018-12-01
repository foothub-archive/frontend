import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import MyProfile from '@/views/MyProfile.vue';

import store from '@/store';

Vue.use(Router);

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
  meta: { redirectsIfAuth: true },
};

export const homeRoute = {
  path: '/',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true },
};

export const myProfileRoute = {
  path: '/me',
  name: 'me',
  component: MyProfile,
  meta: { requiresAuth: true },
};

export const routes = [
  loginRoute,
  registerRoute,
  homeRoute,
  myProfileRoute,
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        name: loginRoute.name,
        query: { next: to.name },
      });
    }
  }

  if (to.matched.some(record => record.meta.redirectsIfAuth)) {
    if (store.getters.isAuthenticated) {
      next({
        name: homeRoute.name,
      });
    }
  }
  next();
});

export default router;
