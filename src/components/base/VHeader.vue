<template>
  <header class="header">
    <span class="header__logo">Spotilist</span>
    <v-button v-if="!isAuthorized" class="header__button" @click="redirectToSpotifyAuth">
      Login
    </v-button>
    <img v-else :src="userPic" alt="user's avatar" class="header__avatar" />
  </header>
</template>
<script lang="ts" setup>
import { useLogin } from '@/composables/useLogin';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { isAuthorized, userPic } = storeToRefs(useAuthStore());

const { redirectToSpotifyAuth } = useLogin();
</script>

<style lang="scss">
.header {
  display: grid;
  grid-auto-flow: column;
  align-content: center;
  justify-content: space-between;
  padding: 20px;
  background-color: oklch(18% 0 0);

  &__logo {
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;
    text-transform: uppercase;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border: 2px solid white;
    border-radius: 30% 70% 71% 29% / 19% 30% 70% 81%;
  }
}
</style>
