import { createRouter, createWebHistory } from 'vue-router';
import ReportView from '@/views/ReportView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'report',
      component: ReportView,
    },
  ],
});

export default router;
