import { createRouter, createWebHistory } from 'vue-router';
import ReportView from '@/views/ReportView.vue';
import TildaComponents from '@/views/TildaComponents.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'report',
      component: ReportView,
    },
    {
      path: '/tilda-components',
      name: 'tilda',
      component: TildaComponents,
    },
  ],
});

export default router;
