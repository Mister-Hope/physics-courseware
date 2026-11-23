<!-- 全反射主交互：改变入射角和介质，实时看折射/全反射 -->
<script setup lang="ts">
import { computed, ref } from "vue";

const rad = (d: number): number => (d * Math.PI) / 180;
const deg = (r: number): number => (r * 180) / Math.PI;

const media = [
  { id: "water", name: "水", n: 1.33 },
  { id: "glass", name: "玻璃", n: 1.5 },
  { id: "diamond", name: "金刚石", n: 2.42 },
];
const nId = ref("water");
const theta = ref(45);

const n = computed(() => media.find((m) => m.id === nId.value)?.n ?? 1.33);
const mediumName = computed(() => media.find((m) => m.id === nId.value)?.name ?? "水");
const C = computed(() => deg(Math.asin(1 / n.value)));
const theta2 = computed(() => {
  const s = n.value * Math.sin(rad(theta.value));
  return s <= 1 ? deg(Math.asin(s)) : null;
});
const isTotal = computed(() => theta.value >= C.value);

const origin = { x: 210, y: 200 };
const L = 150;
const incStart = computed(() => ({
  x: origin.x - L * Math.sin(rad(theta.value)),
  y: origin.y + L * Math.cos(rad(theta.value)),
}));
const refEnd = computed(() => ({
  x: origin.x + L * Math.sin(rad(theta.value)),
  y: origin.y + L * Math.cos(rad(theta.value)),
}));
const refrEnd = computed(() =>
  theta2.value == null
    ? null
    : {
        x: origin.x + L * Math.sin(rad(theta2.value)),
        y: origin.y - L * Math.cos(rad(theta2.value)),
      },
);
const critEnd = computed(() => ({
  x: origin.x + 118 * Math.sin(rad(C.value)),
  y: origin.y - 118 * Math.cos(rad(C.value)),
}));
const label1 = computed(() => {
  const phi = rad(90 + theta.value / 2);
  return { x: origin.x + 55 * Math.cos(phi), y: origin.y + 55 * Math.sin(phi) };
});
const label2 = computed(() => {
  const phi = rad(-90 + (theta2.value ?? 60) / 2);
  return { x: origin.x + 55 * Math.cos(phi), y: origin.y + 55 * Math.sin(phi) };
});
const arc1 = computed(() => {
  const a = rad(theta.value);
  return `M ${origin.x} ${origin.y + 44} A 44 44 0 0 1 ${origin.x - 44 * Math.sin(a)} ${origin.y + 44 * Math.cos(a)}`;
});
const arc2 = computed(() => {
  const t = rad(theta2.value ?? 0);
  return `M ${origin.x} ${origin.y - 44} A 44 44 0 0 1 ${origin.x + 44 * Math.sin(t)} ${origin.y - 44 * Math.cos(t)}`;
});

const btnStyle = (id: string): Record<string, string> =>
  id === nId.value
    ? {
        background: "rgba(226, 168, 70, .18)",
        borderColor: "var(--c-accent)",
        color: "var(--c-accent)",
      }
    : {};
</script>

<template>
  <div class="tir-demo">
    <div class="tir-figure">
      <svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="10"
          y="10"
          width="440"
          height="190"
          fill="#0b1a33"
          stroke="#1e3a5f"
          stroke-width="1.2"
        />
        <rect
          x="10"
          y="200"
          width="440"
          height="110"
          fill="#0f2a4a"
          stroke="#1e3a5f"
          stroke-width="1.2"
        />
        <line x1="10" y1="200" x2="450" y2="200" stroke="#93c5fd" stroke-width="1.6" />
        <line
          x1="210"
          y1="28"
          x2="210"
          y2="300"
          stroke="#cbd5e1"
          stroke-width="1"
          stroke-dasharray="5 6"
          opacity=".55"
        />
        <line
          :x1="origin.x"
          :y1="origin.y"
          :x2="critEnd.x"
          :y2="critEnd.y"
          stroke="#f87171"
          stroke-width="1.4"
          stroke-dasharray="6 5"
        />
        <CourseArrow
          :from="incStart"
          :to="origin"
          stroke="#60a5fa"
          :stroke-width="2.2"
          :head-size="9"
        />
        <CourseArrow
          :from="origin"
          :to="refEnd"
          stroke="#93c5fd"
          :stroke-width="2"
          :head-size="8"
        />
        <CourseArrow
          v-if="!isTotal && refrEnd"
          :from="origin"
          :to="refrEnd"
          stroke="#e2a846"
          :stroke-width="2.2"
          :head-size="9"
        />
        <path :d="arc1" fill="none" stroke="#60a5fa" stroke-width="1.3" opacity=".8" />
        <path
          v-if="!isTotal"
          :d="arc2"
          fill="none"
          stroke="#e2a846"
          stroke-width="1.3"
          opacity=".8"
        />
        <text
          :x="label1.x"
          :y="label1.y"
          fill="#60a5fa"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          text-anchor="middle"
        >
          θ<tspan baseline-shift="sub" font-size="12">1</tspan>
        </text>
        <text
          v-if="!isTotal && theta2 !== null"
          :x="label2.x"
          :y="label2.y"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          text-anchor="middle"
        >
          θ<tspan baseline-shift="sub" font-size="12">2</tspan>
        </text>
        <text
          :x="critEnd.x + 7"
          :y="critEnd.y + 4"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
        >
          C
        </text>
        <text x="34" y="52" fill="#94a3b8" font-size="16">空气</text>
        <text x="34" y="292" fill="#93c5fd" font-size="16">{{ mediumName }}</text>
        <text x="218" y="302" fill="#64748b" font-size="15">O</text>
        <text x="218" y="50" fill="#64748b" font-size="15">法线</text>
        <text x="58" y="226" fill="#60a5fa" font-size="16">入射光</text>
        <text x="330" y="286" fill="#93c5fd" font-size="16">反射光</text>
        <text v-if="!isTotal" x="330" y="150" fill="#e2a846" font-size="16">折射光</text>
        <text v-if="isTotal" x="278" y="92" fill="#f87171" font-size="17">全反射</text>
      </svg>
    </div>
    <div class="tir-panel">
      <div class="tir-controls">
        <div class="tir-medium">
          <span class="tir-label">介质</span>
          <button
            v-for="m in media"
            :key="m.id"
            class="tir-btn"
            :style="btnStyle(m.id)"
            @click.stop="nId = m.id"
          >
            {{ m.name }}
          </button>
        </div>
        <CourseSlider
          v-model="theta"
          :min="0"
          :max="89"
          :step="1"
          label="入射角"
          label-tex="\theta_1"
          accent="gold"
        />
      </div>
      <div class="tir-readouts">
        <div class="tir-readout">
          <span class="tir-k">临界角 C</span>
          <span class="tir-v">{{ C.toFixed(1) }}°</span>
        </div>
        <div class="tir-readout">
          <span class="tir-k">折射角 θ₂</span>
          <span class="tir-v">{{ theta2 === null ? "—" : theta2.toFixed(1) + "°" }}</span>
        </div>
      </div>
      <div class="tir-status" :class="{ 'is-total': isTotal }">
        {{
          isTotal
            ? "入射角大于临界角，折射光消失，只剩反射光。"
            : "入射角小于临界角，折射光和反射光同时存在。"
        }}
      </div>
    </div>
  </div>
</template>
