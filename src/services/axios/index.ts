import axios from 'axios';
import { defineApi } from '@/services';
import { useAuthStore } from '@/stores/auth';

const baseUrl = import.meta.env.VITE_API_URL;

const config = {
  baseURL: baseUrl,
  timeout: 3000,
  headers: {
    Authorization: null as string | null,
  },
};

const token = localStorage.getItem('token');
if (token !== undefined) {
  config.headers.Authorization = `Bearer ${token}`;
}

export const createApi = () => {
  const instance = axios.create(config);

  const useApi = defineApi(instance);
  const { AuthService } = useApi();

  const refreshCurrentToken = async () => {
    const store = useAuthStore();
    
    try {
      await AuthService.refreshAccessToken();
    } catch {
      store.clearUserProfile();
    }

    await store.getUserProfile();
  };

  instance.interceptors.response.use(
    response => response,
    async error => {
      const now = Date.now();
      const refreshToken = localStorage.getItem('refreshToken');
      const nextRefresh = localStorage.getItem('nextRefreshTime');
      if (
        refreshToken &&
        nextRefresh &&
        error?.response?.status === 401 &&
        +nextRefresh - now <= 0
      ) {
        await refreshCurrentToken();
      }
      return Promise.reject(error);
    }
  );

  return useApi;
};
