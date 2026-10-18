<script setup lang="ts">
/**
 * 第 10 页示意图（教材图 8.2-5 口径）：以二楼地面为参考平面——二楼房间的 A 在上方（E_p 为正）， 一楼房间的 B 在下方（E_p 为负）。
 *
 * ShowSigns：点击后在 A、B 旁出现 + / − 记号。 viewBox 580×260，页面里按 400px 宽渲染（≈179px 高）。
 */
const { showSigns = false } = defineProps<{
  /** 点击后出现：A 旁的 + 与 B 旁的 − */
  showSigns?: boolean;
}>();
</script>

<template>
  <svg
    viewBox="0 0 580 260"
    width="100%"
    style="max-width: 340px"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="以二楼地面为参考平面时楼上物体为正、楼下物体为负"
  >
    <SurfaceHatch :from="{ x: 100, y: 230 }" :to="{ x: 480, y: 230 }" side="below" :thickness="12" :gap="20" />
    <line x1="120" y1="40" x2="120" y2="230" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="460" y1="40" x2="460" y2="230" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="96" y1="140" x2="484" y2="140" stroke="var(--c-accent)" stroke-width="3" />
    <text x="126" y="132" font-size="17" fill="var(--c-accent)" class="rps-lbl">参考平面</text>

    <circle cx="290" cy="85" r="11" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />
    <text x="312" y="92" font-size="21" fill="var(--c-text)" class="rps-lbl">A</text>
    <circle cx="290" cy="185" r="11" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />
    <text x="312" y="192" font-size="21" fill="var(--c-text)" class="rps-lbl">B</text>

    <g v-if="showSigns">
      <circle cx="252" cy="85" r="14" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="2" />
      <text x="252" y="93" font-size="22" fill="var(--c-accent)" text-anchor="middle">+</text>
      <circle cx="252" cy="185" r="14" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
      <text x="252" y="193" font-size="22" fill="var(--c-accent-2)" text-anchor="middle">−</text>
    </g>
  </svg>
</template>

<style scoped>
.rps-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
