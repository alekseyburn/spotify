<template>
  <v-header />
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useLogin } from '@/composables/useLogin';
const { checkAuth } = useLogin();

onMounted(checkAuth);
</script>
