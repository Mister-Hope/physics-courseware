<!--
  第 4 页：电磁波谱总览条。
  按教材顺序（波长由长到短）排成一条连续的谱带，点击逐段点亮并显示波段名与已知波长范围。
  用 HTML flex 排布，不是坐标图（没有刻度轴），避免手写坐标轴 SVG。
-->
<script setup lang="ts">
interface SpectrumBand {
  key: string;
  name: string;
  range: string;
  rangeTex?: string;
  flex: number;
  gammaName?: boolean;
}

const { step = 0 } = defineProps<{
  /** 已点亮的段数（0 = 全部未点亮） */
  step?: number;
}>();

const bands: SpectrumBand[] = [
  { key: "radio", name: "无线电波", range: "", rangeTex: ">0.1\\ \\text{mm}", flex: 30 },
  { key: "infrared", name: "红外线", range: "介于二者之间", flex: 20 },
  { key: "visible", name: "可见光", range: "", rangeTex: "400 \\sim 760\\ \\text{nm}", flex: 13 },
  { key: "ultraviolet", name: "紫外线", range: "", rangeTex: "10 \\sim 400\\ \\text{nm}", flex: 12 },
  { key: "xray", name: "X 射线", range: "比紫外线短", flex: 13 },
  { key: "gamma", name: "射线", range: "最短", flex: 12, gammaName: true },
];

const boundaries = [
  { left: 30, tex: "0.1\\ \\text{mm}" },
  { left: 50, tex: "760\\ \\text{nm}" },
  { left: 63, tex: "400\\ \\text{nm}" },
  { left: 75, tex: "10\\ \\text{nm}" },
];
</script>

<template>
  <div class="em-spec">
    <div class="em-spec-track">
      <div
        v-for="(band, index) in bands"
        :key="band.key"
        class="em-seg"
        :class="[`em-seg-${band.key}`, { 'em-seg-on': step > index }]"
        :style="{ flex: `${band.flex} 0 0` }"
      >
        <span class="em-seg-name">
          <template v-if="band.gammaName"><Latex tex="\gamma" /> 射线</template>
          <template v-else>{{ band.name }}</template>
        </span>
        <span class="em-seg-range">
          <Latex v-if="band.rangeTex" :tex="band.rangeTex" />
          <template v-else>{{ band.range }}</template>
        </span>
      </div>
    </div>
    <div class="em-ticks" aria-hidden="true">
      <div v-for="tick in boundaries" :key="tick.left" class="em-tick" :style="{ left: `${tick.left}%` }">
        <span class="em-tick-line"></span>
        <Latex :tex="tick.tex" />
      </div>
    </div>
    <div class="em-ends">
      <span>← 波长更长</span>
      <span>波长更短 →</span>
    </div>
  </div>
</template>

<style scoped>
.em-spec {
  width: 100%;
  min-width: 0;
}

.em-spec-track {
  display: flex;

  overflow: hidden;

  width: 100%;
  height: 118px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-bg-soft);
}

.em-seg {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.4rem 0.3rem;

  border-right: 1px solid var(--c-border);

  opacity: 0.55;
  transition:
    opacity 0.35s ease,
    filter 0.35s ease;
  filter: saturate(0.72);
}

.em-seg:last-child {
  border-right: 0;
}

.em-seg-on {
  opacity: 1;
  filter: saturate(1);
}

.em-seg-name,
.em-seg-range {
  max-width: 100%;

  line-height: 1.25;
  text-align: center;
  white-space: nowrap;

  visibility: hidden;
}

.em-seg-on .em-seg-name,
.em-seg-on .em-seg-range {
  visibility: visible;
}

.em-seg-name {
  font-size: 1.12rem;
  font-weight: 600;
}

.em-seg-range {
  color: var(--c-text-dim);
  font-size: 0.78rem;
}

.em-seg-radio {
  background: color-mix(in srgb, var(--c-accent-2) 55%, transparent);
}

.em-seg-infrared {
  background: color-mix(in srgb, var(--c-danger) 42%, transparent);
}

.em-seg-visible {
  background: linear-gradient(
    100deg,
    color-mix(in srgb, var(--c-danger) 26%, transparent),
    color-mix(in srgb, var(--c-accent) 26%, transparent) 35%,
    color-mix(in srgb, var(--c-physics) 26%, transparent) 70%,
    color-mix(in srgb, var(--c-accent-2) 55%, transparent)
  );
}

.em-seg-ultraviolet {
  background: color-mix(in srgb, mediumorchid 60%, transparent);
}

.em-seg-xray {
  background: color-mix(in srgb, var(--c-physics) 48%, transparent);
}

.em-seg-gamma {
  background: color-mix(in srgb, var(--c-accent) 45%, transparent);
}

.em-ticks {
  position: relative;

  height: 34px;
  margin-top: 2px;
}

.em-tick {
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
  transform: translateX(-50%);

  color: var(--c-text-mute);
  font-size: 0.7rem;
  white-space: nowrap;
}

.em-tick-line {
  width: 1px;
  height: 7px;
  background: var(--c-border-glow);
}

.em-ends {
  display: flex;
  justify-content: space-between;

  margin-top: 0.1rem;

  color: var(--c-text-mute);
  font-size: 0.72rem;
}
</style>
