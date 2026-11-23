<script setup lang="ts">
/**
 * 第 13 页（算一算：质量比对碰后速度的影响）：m₁ 以 v₁ 撞静止的 m₂， 弹性碰撞下 v₁′ = (m₁−m₂)/(m₁+m₂)·v₁、v₂′ = 2m₁/(m₁+m₂)·v₁。
 * 拖动滑块改变质量比 k = m₂/m₁，两根速度箭头随之变长、反向或归零。
 */
import { computed, ref } from "vue";

const k = ref(1);
const scale = 155;
const x0 = 170;

const v1 = computed(() => (1 - k.value) / (1 + k.value));
const v2 = computed(() => 2 / (1 + k.value));

const fmt = (value: number) => (Math.abs(value) < 0.005 ? "0" : value.toFixed(2));
const kLabel = computed(() => `k = m_2/m_1 = ${k.value.toFixed(1)}`);
const v1Text = computed(() => `v_1' = ${fmt(v1.value)}\\,v_1`);
const v2Text = computed(() => `v_2' = ${fmt(v2.value)}\\,v_1`);

const v1Stop = computed(() => Math.abs(v1.value) < 0.05);
</script>

<template>
  <div class="coll-ratio">
    <div class="figure">
      <svg viewBox="0 0 500 152" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line
          x1="170"
          y1="14"
          x2="170"
          y2="136"
          stroke="var(--c-text-dim)"
          stroke-width="1"
          stroke-dasharray="4 5"
          opacity="0.4"
        />
        <CourseArrow
          v-if="!v1Stop"
          :from="{ x: x0, y: 52 }"
          :to="{ x: x0 + v1 * scale, y: 52 }"
          stroke="var(--c-accent)"
          :stroke-width="3"
          :head-size="10"
        />
        <circle v-else :cx="x0" :cy="52" r="4.5" fill="var(--c-accent)" />
        <text
          :x="x0 + v1 * scale + (v1 >= 0 ? 14 : -14)"
          y="46"
          :text-anchor="v1 >= 0 ? 'start' : 'end'"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-accent)"
        >
          v′<tspan font-size="10" dy="4">1</tspan>
        </text>
        <CourseArrow
          :from="{ x: x0, y: 108 }"
          :to="{ x: x0 + v2 * scale, y: 108 }"
          stroke="var(--c-physics)"
          :stroke-width="3"
          :head-size="10"
        />
        <text
          :x="x0 + v2 * scale + 14"
          y="102"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-physics)"
        >
          v′<tspan font-size="10" dy="4">2</tspan>
        </text>
        <text x="20" y="32" font-size="13" fill="var(--c-text-mute)">
          碰后 <tspan font-family="KaTeX_Math" font-style="italic">m</tspan
          ><tspan font-family="KaTeX_Math" font-style="italic" font-size="9" dy="4">1</tspan
          ><tspan dy="-4"> 的速度</tspan>
        </text>
        <text x="20" y="88" font-size="13" fill="var(--c-text-mute)">
          碰后 <tspan font-family="KaTeX_Math" font-style="italic">m</tspan
          ><tspan font-family="KaTeX_Math" font-style="italic" font-size="9" dy="4">2</tspan
          ><tspan dy="-4"> 的速度</tspan>
        </text>
      </svg>
    </div>
    <div class="coll-ratio-row">
      <span class="coll-ratio-k"><Latex :tex="kLabel" /></span>
      <CourseSlider
        v-model="k"
        :min="0.1"
        :max="5"
        :step="0.1"
        layout="bare"
        aria-label="质量比 m₂ / m₁"
      />
      <span class="coll-ratio-read"><Latex :tex="v1Text" /></span>
      <span class="coll-ratio-read"><Latex :tex="v2Text" /></span>
    </div>
  </div>
</template>
