import './assets/scss/fonts.scss';
import './assets/scss/scaffolding.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import api from '@/plugins/api';

createApp(App).use(createPinia()).use(router).use(api).mount('#app');
