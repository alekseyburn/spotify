import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, from) => {
  if (!localStorage.getItem('token') && to.path !== '/') {
    return '/';
  }
});

export default router;
