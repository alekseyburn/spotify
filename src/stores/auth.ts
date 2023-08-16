import { defineStore } from 'pinia';
import { useApi } from '@/plugins/api';

const { AuthService } = useApi();
export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const isAuthorized = computed(() => !!user.value);
  const userPic = computed(() => user.value?.images?.[0]?.url);

  const getUserProfile = async () => {
    const { data } = await AuthService.user();
    user.value = data;
  };

  const clearUserProfile = () => {
    user.value = null;
  };

  return { user, userPic, isAuthorized, getUserProfile, clearUserProfile };
});
