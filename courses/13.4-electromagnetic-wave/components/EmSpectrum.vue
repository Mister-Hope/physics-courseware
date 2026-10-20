<!-- 第 11、12 页：电磁波谱带——六类按波长（频率）顺序排列；第 12 页由 step 逐段点亮，第 11 页静态展示 -->
<script setup lang="ts">
import { computed, useId } from "vue";

const { step = -1 } = defineProps<{ step?: number }>();

interface Band {
  key: string;
  label: string;
  isGamma?: boolean;
}

const bands: Band[] = [
  { key: "radio", label: "无线电波" },
  { key: "ir", label: "红外线" },
  { key: "vis", label: "可见光" },
  { key: "uv", label: "紫外线" },
  { key: "xray", label: "X 射线" },
  { key: "gamma", label: "射线", isGamma: true },
];

const uid = useId();
const gradId = `emw-vis-${uid}`;

const active = computed(() => (step >= 1 ? Math.min(step, bands.length) - 1 : -1));

const segX = (i: number): number => 20 + i * 140;
</script>

<template>
  <div class="spec">
    <svg viewBox="0 0 880 130" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient :id="gradId" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" class="vis-a" />
          <stop offset="0.34" class="vis-b" />
          <stop offset="0.67" class="vis-c" />
          <stop offset="1" class="vis-d" />
        </linearGradient>
      </defs>
      <text x="440" y="11" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
        频率
        <tspan font-family="KaTeX_Math" font-style="italic">f</tspan>
        增大
      </text>
      <CourseArrow :from="{ x: 20, y: 16 }" :to="{ x: 860, y: 16 }" stroke="var(--c-accent)" stroke-width="1.5" />
      <g
        v-for="(b, i) in bands"
        :key="b.key"
        class="spec-seg"
        :class="{ active: active === i, 'is-dim': active >= 0 && active !== i }"
      >
        <rect
          class="seg-rect"
          :x="segX(i)"
          y="26"
          width="140"
          height="42"
          rx="5"
          :class="'fill-' + b.key"
          :fill="b.key === 'vis' ? `url(#${gradId})` : undefined"
        />
        <text :x="segX(i) + 70" y="88" text-anchor="middle" font-size="15" fill="var(--c-text)">
          <tspan v-if="b.isGamma" font-family="KaTeX_Math" font-style="italic">γ</tspan>
          <tspan v-if="b.isGamma">射线</tspan>
          <tspan v-if="!b.isGamma">{{ b.label }}</tspan>
        </text>
      </g>
      <text x="440" y="108" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
        波长
        <tspan font-family="KaTeX_Math" font-style="italic">λ</tspan>
        减小
      </text>
      <CourseArrow :from="{ x: 20, y: 114 }" :to="{ x: 860, y: 114 }" stroke="var(--c-physics)" stroke-width="1.5" />
    </svg>
  </div>
</template>

<style scoped>
.spec {
  width: 100%;
}

.spec-seg {
  opacity: 1;
  transition: opacity 0.18s ease;
}

.spec-seg.is-dim {
  opacity: 0.6;
}

.seg-rect {
  stroke: transparent;
  stroke-width: 3;
  transition: stroke 0.18s ease;
}

.spec-seg.active .seg-rect {
  stroke: var(--c-accent);
}

.fill-radio {
  fill: color-mix(in srgb, var(--c-accent-2) 55%, var(--c-surface));
}

.fill-ir {
  fill: color-mix(in srgb, var(--c-danger) 70%, var(--c-accent));
}

.fill-uv {
  fill: color-mix(in srgb, var(--c-accent-2) 60%, var(--c-danger));
}

.fill-xray {
  fill: color-mix(in srgb, var(--c-physics) 35%, var(--c-surface));
}

.fill-gamma {
  fill: color-mix(in srgb, var(--c-accent-2) 80%, var(--c-danger));
}

.vis-a {
  stop-color: var(--c-danger);
}

.vis-b {
  stop-color: var(--c-accent);
}

.vis-c {
  stop-color: var(--c-physics);
}

.vis-d {
  stop-color: var(--c-accent-2);
}
</style>
