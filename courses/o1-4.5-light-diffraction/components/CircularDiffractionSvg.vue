<!-- 4.5 光的衍射：圆孔与不透明圆盘的衍射（屏上图案示意） -->
<template>
  <svg viewBox="0 0 280 220" width="280" xmlns="http://www.w3.org/2000/svg">
    <line v-for="y in waveY" :key="y" x1="18" :y1="y" x2="70" :y2="y" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <rect x="78" y="16" width="9" :height="mode === 'aperture' ? 64 : 84" rx="2" fill="var(--c-neutral-600)" stroke="var(--c-neutral-300)" stroke-width="0.8" />
    <rect
      x="78"
      :y="mode === 'aperture' ? 140 : 120"
      width="9"
      :height="mode === 'aperture' ? 64 : 84"
      rx="2"
      fill="var(--c-neutral-600)"
      stroke="var(--c-neutral-300)"
      stroke-width="0.8"
    />
    <circle v-if="mode === 'aperture'" cx="83" cy="110" r="26" fill="var(--c-neutral-900)" stroke="var(--c-accent)" stroke-width="1.4" />
    <circle v-else cx="83" cy="110" r="18" fill="var(--c-neutral-500)" stroke="var(--c-text)" stroke-width="1.2" />
    <line x1="95" y1="110" x2="208" y2="64" stroke="var(--c-accent)" stroke-width="1.2" opacity="0.6" />
    <line x1="95" y1="110" x2="208" y2="110" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.8" />
    <line x1="95" y1="110" x2="208" y2="156" stroke="var(--c-accent)" stroke-width="1.2" opacity="0.6" />
    <rect x="208" y="26" width="54" height="168" rx="4" fill="var(--c-neutral-900)" stroke="var(--c-border)" stroke-width="1" />
    <g v-if="mode === 'aperture'">
      <circle cx="235" cy="110" r="8" fill="var(--c-accent)" opacity="0.95" />
      <circle cx="235" cy="110" r="17" fill="none" stroke="var(--c-accent)" stroke-width="0.9" opacity="0.45" />
      <circle cx="235" cy="110" r="26" fill="none" stroke="var(--c-accent-2)" stroke-width="0.9" opacity="0.35" />
      <circle cx="235" cy="110" r="35" fill="none" stroke="var(--c-accent-2)" stroke-width="0.9" opacity="0.25" />
    </g>
    <g v-else>
      <circle cx="235" cy="110" r="30" fill="var(--c-neutral-900)" stroke="var(--c-text-mute)" stroke-width="0.8" opacity="0.9" />
      <circle cx="235" cy="110" r="4" fill="var(--c-accent)" opacity="0.95" />
      <circle cx="235" cy="110" r="37" fill="none" stroke="var(--c-accent)" stroke-width="0.8" opacity="0.35" />
      <circle cx="235" cy="110" r="44" fill="none" stroke="var(--c-accent-2)" stroke-width="0.8" opacity="0.22" />
    </g>
    <text x="64" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">{{ mode === "aperture" ? "圆孔" : "不透明圆盘" }}</text>
    <text x="235" y="212" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">屏</text>
  </svg>
</template>

<script setup lang="ts">
const { mode = "aperture" } = defineProps<{ mode?: "aperture" | "obstacle" }>();
const waveY = [44, 64, 84, 104, 124, 144, 164];
</script>
