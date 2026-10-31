<script setup lang="ts">
/**
 * 直线电流的磁感线（13.1 P11） 竖直导线穿过水平面（透视压扁成椭圆），磁感线是一圈圈同心圆； step 1 出现同心圆、step 2 高亮「与导线垂直的平面」、step 3 出现环绕箭头； 按钮切换电流方向（@click，不占翻页点击），箭头全部反向。
 * 方向约定：电流向上时，从上方看磁感线逆时针；透视图里近侧（下方）箭头向右、远侧（上方）箭头向左。
 */
import { computed, ref } from "vue";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 620;
const H = 400;
const CX = 310;
const CY = 260; // 平面中心
const RX = 230;
const RY = 88;

const up = ref(true);

/** 近侧（下方）箭头方向：电流向上 → 向右；电流向下 → 向左 */
const nearDir = computed(() => (up.value ? 1 : -1));

const plane = computed(() => `M ${CX - RX} ${CY} L ${CX} ${CY - RY} L ${CX + RX} ${CY} L ${CX} ${CY + RY} Z`);
</script>

<template>
  <div class="mf-wirefield">
    <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
      <!-- 与导线垂直的水平面（透视） -->
      <path
        :d="plane"
        fill="var(--c-surface)"
        :stroke="step >= 2 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="step >= 2 ? 2 : 1.2"
        :opacity="step >= 2 ? 0.9 : 0.5"
      />

      <!-- 同心圆磁感线 -->
      <g v-if="step >= 1" fill="none" stroke="var(--c-field)" stroke-width="1.9" opacity="0.9">
        <ellipse v-for="k in [0.36, 0.62, 0.88]" :key="k" :cx="CX" :cy="CY" :rx="RX * k" :ry="RY * k" />
      </g>

      <!-- 环绕箭头（近侧 / 远侧） -->
      <g v-if="step >= 3">
        <template v-for="k in [0.36, 0.62, 0.88]" :key="k">
          <CourseArrow :from="{ x: CX + 8, y: CY + RY * k }" :to="{ x: CX + 8 + 44 * nearDir, y: CY + RY * k }" stroke="var(--c-field)" :stroke-width="2.6" />
          <CourseArrow :from="{ x: CX - 8, y: CY - RY * k }" :to="{ x: CX - 8 - 44 * nearDir, y: CY - RY * k }" stroke="var(--c-field)" :stroke-width="2.6" />
        </template>
      </g>

      <!-- 竖直导线 -->
      <line :x1="CX" :y1="CY - 200" :x2="CX" :y2="CY + 120" stroke="var(--c-text)" stroke-width="6" stroke-linecap="round" />
      <!-- 电流方向箭头 -->
      <g v-if="step >= 1">
        <line :x1="CX" :y1="up ? CY + 92 : CY - 172" :x2="CX" :y2="up ? CY - 172 : CY + 92" stroke="var(--c-force)" stroke-width="3" stroke-linecap="round" />
        <path
          :d="
            up ? `M ${CX - 8} ${CY - 160} L ${CX} ${CY - 178} L ${CX + 8} ${CY - 160} Z` : `M ${CX - 8} ${CY + 80} L ${CX} ${CY + 98} L ${CX + 8} ${CY + 80} Z`
          "
          fill="var(--c-force)"
        />
        <text :x="CX + 14" :y="CY - 150" font-size="18" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic">I</text>
      </g>
    </svg>

    <div class="mf-ctrl">
      <button type="button" class="mf-btn" :class="{ on: up }" @click="up = true">电流向上</button>
      <button type="button" class="mf-btn" :class="{ on: !up }" @click="up = false">电流向下</button>
    </div>
  </div>
</template>

<style scoped>
.mf-wirefield {
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
  gap: 0.5rem;
  align-items: center;
}
</style>
