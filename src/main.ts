import { createApp } from 'vue';
import VueClipboard from 'vue3-clipboard';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(VueClipboard, {});

app.mount('#app');
