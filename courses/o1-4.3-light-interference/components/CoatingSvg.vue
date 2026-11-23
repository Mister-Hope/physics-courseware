<!-- 第 15 页：薄膜干涉的应用——增透膜与增反膜 -->
<template>
  <svg viewBox="0 0 660 210" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="panel in panels" :key="panel.key">
      <text :x="panel.x" y="26" font-size="14" :fill="panel.color" text-anchor="middle">{{ panel.title }}</text>
      <rect :x="panel.x - 90" y="96" width="180" height="22" rx="3" fill="var(--c-accent)" opacity="0.22" />
      <rect :x="panel.x - 90" y="118" width="180" height="42" rx="3" fill="var(--c-physics)" opacity="0.16" />
      <line :x1="panel.x - 90" :y1="96" :x2="panel.x + 90" :y2="96" stroke="var(--c-accent)" stroke-width="2" />
      <line :x1="panel.x - 90" :y1="118" :x2="panel.x + 90" :y2="118" stroke="var(--c-physics)" stroke-width="2" />
      <line :x1="panel.x" :y1="48" :x2="panel.x" :y2="96" stroke="var(--c-accent)" stroke-width="1.8" />
      <line :x1="panel.x" :y1="96" :x2="panel.x" :y2="118" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.5" />
      <line :x1="panel.x" :y1="118" :x2="panel.x" :y2="48" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.6" />
      <text :x="panel.x" y="190" font-size="13" fill="var(--c-text-dim)" text-anchor="middle">{{ panel.note }}</text>
    </g>
    <text x="16" y="176" font-size="12" fill="var(--c-text-dim)">膜</text>
    <text x="16" y="200" font-size="12" fill="var(--c-text-dim)">玻璃</text>
  </svg>
</template>

<script setup lang="ts">
interface Panel {
  key: string;
  x: number;
  title: string;
  color: string;
  note: string;
}

const panels: Panel[] = [
  { key: "ar", x: 190, title: "增透膜：反射光相互削弱", color: "var(--c-physics)", note: "镜头的透射光更多" },
  { key: "hr", x: 470, title: "增反膜：反射光相互加强", color: "var(--c-accent)", note: "镜面的反射光更强" },
];
</script>
