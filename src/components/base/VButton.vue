<template>
  <button class="button shadow" @click="emits('click')">
    <slot />
  </button>
</template>
<script lang="ts" setup>
const emits = defineEmits<{ click: [] }>();
</script>

<style lang="scss">
.button {
  display: grid;
  place-content: center;
  padding: 8px 24px;
  border-radius: 150% / 50%;
  color: black;
  font-weight: 500;
  font-size: 24px;
  background-color: oklch(76% 0.27 145);

  &:hover {
    background-color: oklch(83% 0.3 145);
    box-shadow:
      0 0 15px 0 oklch(89% 0.235 142.7 / 50%),
      0 0 10px 0 oklch(89% 0.235 142.7 / 10%);
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
