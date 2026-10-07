<template>
  <div class="global-bottom">
    <div class="global-bottom-line"></div>
  </div>
</template>

<style scoped>
.global-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  pointer-events: none;
}

.global-bottom-line {
  height: 2px;
  background: linear-gradient(
    90deg,
    rgb(148 163 184 / 0%) 0%,
    rgb(148 163 184 / 15%) 15%,
    rgb(148 163 184 / 15%) 85%,
    rgb(148 163 184 / 0%) 100%
  );
}
</style>
