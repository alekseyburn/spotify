import type { AxiosInstance } from 'axios';
import { Auth } from '@/services/api/Auth';

export const defineApi = (instance: AxiosInstance) => () => ({
  AuthService: new Auth(instance),
});
