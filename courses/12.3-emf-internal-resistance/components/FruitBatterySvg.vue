<script setup lang="ts">
/** 水果电池：铜片、锌片相隔约 1 cm 插入水果（教材 §12.3 参考案例 2 的示意图） */
</script>

<template>
  <div class="fruit-wrap">
    <svg viewBox="0 0 360 240" class="fruit-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 果身 -->
      <path
        d="M 150 52 C 168 52 178 72 182 96 C 186 120 206 138 206 164 C 206 190 182 206 150 206 C 118 206 94 190 94 164 C 94 138 114 120 118 96 C 122 72 132 52 150 52 Z"
        fill="rgba(226,168,70,0.16)"
        stroke="#e2a846"
        stroke-width="2.4"
      />
      <line x1="150" y1="52" x2="157" y2="32" stroke="#4ade80" stroke-width="3" stroke-linecap="round" />
      <!-- 引线 -->
      <g fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round">
        <path d="M 127.5 88 V 30 H 300" />
        <path d="M 173.5 88 V 56 H 300" />
      </g>
      <circle cx="300" cy="30" r="3.4" fill="#cbd5e1" />
      <circle cx="300" cy="56" r="3.4" fill="#cbd5e1" />
      <!-- 铜片（正极）与锌片（负极） -->
      <rect x="124" y="88" width="7" height="76" rx="2" fill="#f87171" />
      <rect x="170" y="88" width="7" height="76" rx="2" fill="#cbd5e1" />
      <text x="116" y="80" text-anchor="end" font-size="19" fill="#f87171">铜片（正极）</text>
      <text x="186" y="80" font-size="19" fill="#cbd5e1">锌片（负极）</text>
      <!-- 两片相距约 1 cm -->
      <g stroke="#94a3b8" stroke-width="1.4" stroke-linecap="round">
        <line x1="131" y1="178" x2="170" y2="178" />
        <line x1="131" y1="173" x2="131" y2="183" />
        <line x1="170" y1="173" x2="170" y2="183" />
      </g>
      <text x="150" y="200" text-anchor="middle" font-size="17" fill="#94a3b8">约 1 cm</text>
    </svg>
  </div>
</template>

<style scoped>
.fruit-wrap {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.fruit-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
