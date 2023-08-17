<template>
  <button class="button" @click="emits('click')">
    <slot />
  </button>
</template>
<script lang="ts" setup>
const emits = defineEmits<{ click: [] }>();
</script>
