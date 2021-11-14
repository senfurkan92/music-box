import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/Anasayfa',
    meta: {
      requiresAuth: false,
    },
    component: Home,
  },
  {
    path: '/Manage',
    name: 'Manage',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Manage.vue'),
    beforeEnter: (to, from, next) => {
      next();
    },
  },
  {
    path: '/Home',
    redirect: { name: 'Home' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.getUser && store.getters.getToken) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router;
