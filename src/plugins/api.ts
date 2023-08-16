import type { App } from 'vue';
import { createApi } from '@/services/axios';

export const useApi = createApi();

export default {
  install: (app: App) => {
    app.config.globalProperties.$api = useApi();
  },
};
