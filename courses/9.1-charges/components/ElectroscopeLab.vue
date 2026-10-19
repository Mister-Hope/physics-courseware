<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 5 页「检验物体是否带电」——按人教版**初中**口径做**接触带电**： ① 带电体**接触**验电器的金属球 → 电荷转移到金属箔上，两片金属箔带同种电荷相斥而张开； ② 移开带电体 →
 * 金属箔**仍然张开**（验电器已经带上了电）。 图跟着**翻页**走（页面 clicks: 2）：组件内不再有自己的状态，避免「文字在走、图不动」。 只做「张合」的定性判定，不出任何数值。
 */
const { $clicks } = useSlideContext();
/** 0 远处（箔闭）→ 1 接触（箔张）→ 2 移开（仍张） */
const phase = computed(() => Math.max(0, Math.min($clicks.value, 2)));

const touching = computed(() => phase.value === 1);
const charged = computed(() => phase.value >= 1);
const open = computed(() => phase.value >= 1);
</script>

<template>
  <svg viewBox="0 0 420 292" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 玻璃瓶 -->
    <rect
      x="110"
      y="118"
      width="190"
      height="170"
      rx="14"
      fill="var(--c-surface)"
      fill-opacity="0.3"
      stroke="var(--c-text-dim)"
      stroke-width="2"
    />
    <!-- 绝缘瓶塞 -->
    <rect x="180" y="98" width="50" height="26" rx="6" fill="var(--c-neutral-700)" />
    <!-- 导体棒与顶端金属球 -->
    <line
      x1="205"
      y1="44"
      x2="205"
      y2="214"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle cx="205" cy="42" r="13" fill="var(--c-text)" fill-opacity="0.85" />

    <!-- 带电后金属杆与两片金属箔都带上同种电荷（正） -->
    <g v-if="charged">
      <text
        x="222"
        y="120"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text
        x="222"
        y="164"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text
        x="186"
        y="260"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text
        x="224"
        y="260"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
    </g>

    <!-- 两片金属箔：带电后相互排斥而张开 -->
    <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(16 205 214)' : ''">
      <line
        x1="205"
        y1="214"
        x2="203"
        y2="256"
        stroke="var(--c-accent)"
        stroke-width="3"
        stroke-linecap="round"
      />
    </g>
    <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(-16 205 214)' : ''">
      <line
        x1="205"
        y1="214"
        x2="207"
        y2="256"
        stroke="var(--c-accent)"
        stroke-width="3"
        stroke-linecap="round"
      />
    </g>

    <!-- 带电体 C：接触时移到金属球上（真正碰上），其余时候在右侧画面内远处 -->
    <g style="transition: transform 0.45s ease" :transform="touching ? '' : 'translate(140 120)'">
      <line
        x1="205"
        y1="16"
        x2="262"
        y2="52"
        stroke="var(--c-neutral-600)"
        stroke-width="7"
        stroke-linecap="round"
      />
      <circle cx="205" cy="16" r="18" fill="var(--c-danger)" fill-opacity="0.88" />
      <text
        x="205"
        y="16"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="20"
        fill="#0c1122"
      >
        +
      </text>
      <text
        x="270"
        y="34"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-danger)"
      >
        C
      </text>
    </g>

    <!-- 构件标注 -->
    <g font-size="15" fill="var(--c-text-dim)">
      <text x="100" y="64" text-anchor="end">金属球</text>
      <line
        x1="106"
        y1="60"
        x2="188"
        y2="52"
        stroke="var(--c-text-dim)"
        stroke-width="1.1"
        opacity="0.6"
      />
      <text x="100" y="112" text-anchor="end">绝缘瓶塞</text>
      <line
        x1="106"
        y1="108"
        x2="176"
        y2="108"
        stroke="var(--c-text-dim)"
        stroke-width="1.1"
        opacity="0.6"
      />
      <text x="100" y="180" text-anchor="end">金属杆</text>
      <line
        x1="106"
        y1="176"
        x2="196"
        y2="176"
        stroke="var(--c-text-dim)"
        stroke-width="1.1"
        opacity="0.6"
      />
      <text x="100" y="246" text-anchor="end">金属箔</text>
      <line
        x1="106"
        y1="242"
        x2="186"
        y2="242"
        stroke="var(--c-text-dim)"
        stroke-width="1.1"
        opacity="0.6"
      />
    </g>
  </svg>
</template>
