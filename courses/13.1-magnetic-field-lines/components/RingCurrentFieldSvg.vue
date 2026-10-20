<script setup lang="ts">
/**
 * 环形电流的磁场（13.1 P13） 水平放置的环形电流（透视图）；step 1 磁感线、step 2 环上电流方向箭头、step 3 轴线上磁场方向。 按钮切换电流方向（@click）：环上箭头、磁感线方向、轴线磁场（⊙ ↔ 向上/向下）全部反向。
 * 物理：右手四指沿电流环绕方向，拇指指向轴线上磁场的方向；轴线磁场方向即环内磁场方向。
 */
import { computed, ref } from "vue";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 560;
const H = 400;
const CX = 280;
const CY = 240;
const RX = 150;
const RY = 52;

/** 电流方向：true = 俯视逆时针（轴线磁场向上） */
const ccw = ref(true);
/** 近侧（下方）电流箭头方向：俯视逆时针 → 近侧向右 */
const nearDir = computed(() => (ccw.value ? 1 : -1));
/** 轴线磁场方向：逆时针 → 向上（屏幕向上） */
const bUp = computed(() => ccw.value);

/** 磁感线：穿过环内部、外部绕回的两组闭合曲线（示意图） */
const loops = [
  "M 280 232 C 280 172 320 126 376 132 C 434 138 460 210 440 274 C 420 338 354 368 302 346 C 264 330 250 290 258 260 C 264 240 270 238 280 232 Z",
  "M 280 232 C 280 194 306 170 340 174 C 378 178 394 220 384 256 C 374 292 338 310 306 296 C 284 286 276 266 280 246 Z",
];
</script>

<template>
  <div class="mf-ring">
    <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
      <!-- 磁感线 -->
      <g v-if="step >= 1" fill="none" stroke="var(--c-field)" stroke-width="1.9" opacity="0.9">
        <path v-for="(d, i) in loops" :key="i" :d="d" />
      </g>
      <g v-if="step >= 1" fill="var(--c-field)">
        <path :d="bUp ? 'M 276 210 L 280 190 L 284 210 Z' : 'M 276 270 L 280 290 L 284 270 Z'" />
      </g>

      <!-- 环（透视图） -->
      <ellipse :cx="CX" :cy="CY" :rx="RX" :ry="RY" fill="none" stroke="var(--c-text)" stroke-width="4" />
      <!-- 环上电流方向箭头 -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: CX - 40, y: CY + RY + 6 }" :to="{ x: CX + 20 + 50 * nearDir, y: CY + RY + 6 }" stroke="var(--c-force)" :stroke-width="2.8" />
        <CourseArrow :from="{ x: CX + 40, y: CY - RY - 6 }" :to="{ x: CX - 20 - 50 * nearDir, y: CY - RY - 6 }" stroke="var(--c-force)" :stroke-width="2.8" />
        <text :x="CX + 96" :y="CY + RY + 14" font-size="16" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic">I</text>
      </g>

      <!-- 轴线与轴线磁场方向 -->
      <g v-if="step >= 3">
        <line :x1="CX" :y1="CY + 96" :x2="CX" :y2="CY - 130" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="8 6" />
        <CourseArrow :from="{ x: CX, y: CY - 40 }" :to="{ x: CX, y: CY - 146 }" stroke="var(--c-field)" :stroke-width="3.4" label="B" :label-dx="16" />
      </g>
    </svg>

    <div class="mf-ctrl">
      <button type="button" class="mf-btn" :class="{ on: ccw }" @click="ccw = true">电流逆时针（俯视）</button>
      <button type="button" class="mf-btn" :class="{ on: !ccw }" @click="ccw = false">电流顺时针（俯视）</button>
    </div>
  </div>
</template>

<style scoped>
.mf-ring {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}

.mf-fig {
  display: block;
  width: 100%;
}

.mf-ctrl {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
</style>
