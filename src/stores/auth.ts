import { defineStore } from 'pinia';
import { useApi } from '@/plugins/api';

const { AuthService } = useApi();
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<any>(null);
  const isAuthorized = computed(() => !!user.value);
  const userPic = computed(() => user.value?.images?.[0]?.url);

  const getUserProfile = async () => {
    const { data } = await AuthService.user();
    user.value = data;
    await router.push('/dashboard');
  };

  const clearUserProfile = () => {
    user.value = null;
  };

  return { user, userPic, isAuthorized, getUserProfile, clearUserProfile };
});
