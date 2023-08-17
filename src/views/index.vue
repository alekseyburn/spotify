<template>
  <section class="main-page">
    <h1 class="main-page__header">Perfect place for curating your playlists</h1>
  </section>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'MainPage',
});
</script>

<style lang="scss">
.main-page {
  display: grid;
  place-content: center;
  height: 100%;
  background-image: linear-gradient(180deg, rgba(black, 0.7) 0%, rgba(black, 0.7) 100%),
    url('public/bg-main.jpeg');
  background-position: center;
  background-size: cover;

  &__header {
    position: relative;
    z-index: 1;
    max-width: 400px;
    font-weight: 700;
    font-size: 48px;
    text-align: center;

    &::before {
      position: absolute;
      inset: -100% -20%;
      border-radius: 62% 47% 82% 35% / 45% 45% 80% 66%;
      box-shadow:
        0 0 400px 0 oklch(76% 0.27 145),
        inset 0 0 100px oklch(76% 0.27 145);
      animation: sliderShape 10s linear infinite;
      content: '';
      will-change: border-radius, transform, opacity;
    }
  }
}

@keyframes sliderShape {
  0%,
  100% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  34% {
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
  }
  50% {
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
  }
}
</style>
