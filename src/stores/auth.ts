import { defineStore } from 'pinia';
import { useApi } from '@/plugins/api';

const { AuthService } = useApi();
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<any>(null);
  const isAuthorized = computed(() => !!user.value);
  const userPic = computed(() => user.value?.images?.[0]?.url);

  const setUserProfile = async () => {
    const { data } = await AuthService.user();
    user.value = data;
  };

  const clearUserProfile = () => {
    user.value = null;
  };

  const logout = async () => {
    AuthService.removeAccessToken();
    clearUserProfile();
    await router.push('/');
  };

  return { user, userPic, isAuthorized, setUserProfile, clearUserProfile, logout };
});
