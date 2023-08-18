import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/plugins/api';

const { AuthService } = useApi();

const setAccessToken = async (code: string) => {
  const params = AuthService.getAccessTokenUrlParams(code);
  await AuthService.setAccessToken(params);
};

export const useLogin = () => {
  const redirectToSpotifyAuth = async () => {
    document.location = await AuthService.getRedirectToSpotifyUrl();
  };

  const checkAuth = async () => {
    const store = useAuthStore();
    const router = useRouter();

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      await setAccessToken(code);
      history.pushState(history.state, document.title, window.location.pathname);
    }

    const token = localStorage.getItem('token');

    if (!store.isAuthorized && token) {
      await store.setUserProfile();
      await router.push('/dashboard');
    }
  };

  return { redirectToSpotifyAuth, checkAuth };
};
