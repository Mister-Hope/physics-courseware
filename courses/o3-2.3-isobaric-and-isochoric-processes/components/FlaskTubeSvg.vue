<!-- 第 2 页：烧瓶 + 橡胶塞 + 玻璃管 + 小水柱。heated 时水柱向外（右）移动，并留下虚线原位置 -->
<script setup lang="ts">
const { heated = false } = defineProps<{ heated?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 440 280" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M196 52 L196 112 C196 132 168 140 168 178 A52 52 0 0 0 272 178 C272 140 244 132 244 112 L244 52"
      fill="var(--c-surface)"
      fill-opacity=".45"
      stroke="var(--c-text-dim)"
      stroke-width="2.2"
    />
    <circle cx="196" cy="170" r="2.6" fill="var(--c-physics)" fill-opacity=".7" />
    <circle cx="220" cy="190" r="2.6" fill="var(--c-physics)" fill-opacity=".7" />
    <circle cx="244" cy="168" r="2.6" fill="var(--c-physics)" fill-opacity=".7" />
    <circle cx="232" cy="204" r="2.6" fill="var(--c-physics)" fill-opacity=".7" />
    <rect x="186" y="30" width="68" height="22" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="196" y1="38" x2="424" y2="38" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="196" y1="52" x2="424" y2="52" stroke="var(--c-text-dim)" stroke-width="2" />
    <line
      x1="330"
      y1="45"
      x2="354"
      y2="45"
      stroke="var(--c-velocity)"
      stroke-width="9"
      stroke-linecap="round"
      :visibility="heated ? 'visible' : 'hidden'"
      stroke-opacity=".25"
      stroke-dasharray="3 5"
    />
    <line :x1="heated ? 366 : 330" y1="45" :x2="heated ? 390 : 354" y2="45" stroke="var(--c-velocity)" stroke-width="9" stroke-linecap="round" />
    <path d="M188 258 L196 244 L204 258" fill="none" stroke="var(--c-danger)" stroke-width="2" stroke-opacity=".55" />
    <path d="M212 258 L220 244 L228 258" fill="none" stroke="var(--c-danger)" stroke-width="2" stroke-opacity=".55" />
    <path d="M236 258 L244 244 L252 258" fill="none" stroke="var(--c-danger)" stroke-width="2" stroke-opacity=".55" />
    <text x="118" y="226" font-size="12" text-anchor="middle" fill="var(--c-text-dim)">烧瓶</text>
    <text x="300" y="24" font-size="12" text-anchor="middle" fill="var(--c-text-dim)">玻璃管</text>
    <text :x="heated ? 378 : 342" y="84" font-size="12" text-anchor="middle" fill="var(--c-velocity)">水柱</text>
    <text x="220" y="276" font-size="11" text-anchor="middle" fill="var(--c-danger)" fill-opacity=".8">手捂烧瓶</text>
  </svg>
</template>
