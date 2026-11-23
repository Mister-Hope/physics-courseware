<script setup lang="ts">
// 第 4 页：单摆实验装置（铁架台 + 铁夹 + 细线 + 摆球）
// step：1 = 铁架台与铁夹（夹口伸出桌外），2 = 细线与摆球，3 = 悬点要固定
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 700 320" role="img" aria-label="单摆实验装置">
    <SurfaceHatch :from="{ x: 36, y: 300 }" :to="{ x: 664, y: 300 }" side="below" />
    <g
      v-if="step >= 1"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      stroke-dasharray="6 5"
    >
      <rect x="134" y="44" width="216" height="242" rx="10" />
    </g>
    <g v-if="step >= 2">
      <line
        x1="332"
        y1="86"
        x2="332"
        y2="214"
        stroke="var(--c-accent-2)"
        stroke-width="8"
        opacity="0.16"
      />
      <circle
        cx="332"
        cy="227"
        r="23"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="1.6"
        stroke-dasharray="5 4"
      />
    </g>
    <rect
      x="140"
      y="286"
      width="170"
      height="13"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-border)"
      stroke-width="1.4"
    />
    <rect
      x="212"
      y="56"
      width="9"
      height="232"
      fill="var(--c-surface-solid)"
      stroke="var(--c-border)"
      stroke-width="1.4"
    />
    <rect
      x="204"
      y="62"
      width="24"
      height="20"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-border)"
      stroke-width="1.4"
    />
    <rect
      x="228"
      y="68"
      width="104"
      height="8"
      rx="2"
      fill="var(--c-surface-solid)"
      stroke="var(--c-border)"
      stroke-width="1.4"
    />
    <rect
      x="318"
      y="60"
      width="28"
      height="26"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-border)"
      stroke-width="1.4"
    />
    <circle cx="332" cy="84" r="4.5" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" />
    <line
      x1="332"
      y1="86"
      x2="332"
      y2="296"
      stroke="var(--c-text-dim)"
      stroke-width="1.2"
      stroke-dasharray="4 6"
      opacity="0.3"
    />
    <line x1="332" y1="86" x2="332" y2="214" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="332" cy="227" r="20" fill="var(--c-accent)" opacity="0.12" />
    <circle
      cx="332"
      cy="227"
      r="13.5"
      fill="var(--c-accent)"
      stroke="var(--c-accent-glow)"
      stroke-width="1.2"
    />
    <circle cx="327" cy="222" r="3.6" fill="var(--c-accent-light)" opacity="0.55" />
    <line x1="350" y1="70" x2="392" y2="64" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="146" y="278" font-size="15" fill="var(--c-text-dim)">铁架台</text>
    <text x="398" y="62" font-size="15" fill="var(--c-text-dim)">铁夹</text>
    <text x="346" y="150" font-size="15" fill="var(--c-text-dim)">细线</text>
    <text x="354" y="232" font-size="15" fill="var(--c-text-dim)">摆球</text>
    <text x="650" y="290" font-size="15" fill="var(--c-text-dim)" text-anchor="end">实验桌</text>
    <g v-if="step >= 3">
      <circle cx="332" cy="86" r="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
      <text x="352" y="108" font-size="15" fill="var(--c-accent)">悬点</text>
    </g>
  </svg>
</template>
