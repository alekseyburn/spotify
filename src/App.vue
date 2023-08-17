<template>
  <v-header />
  <main>
    <RouterView />
  </main>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useLogin } from '@/composables/useLogin';

const { checkAuth } = useLogin();

onMounted(checkAuth);
</script>
