<script setup lang="ts">
/**
 * 通电螺线管的磁场（13.1 P15）
 * 螺线管（多匝线圈）＋磁感线：内部平行密集、外部像条形磁体；
 * step 1 外部线 + 电流方向、step 2 内部线 + N/S 极、step 3 管口外「疏」、step 4（页面文字）内部更强。
 * 按钮切换电流方向（@click）：N/S 极互换、内部箭头与外部线方向反向。
 */
import { computed, ref } from "vue";
import { type Pole, arrowsAlong, traceLine } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 640;
const H = 330;
const CY = 165;
const NX = 520;
const SX = 120;
const reverse = ref(false);

const nX = computed(() => (reverse.value ? SX : NX));
const sX = computed(() => (reverse.value ? NX : SX));
const poles = computed<Pole[]>(() => [
  { x: nX.value, y: CY, s: 1 },
  { x: sX.value, y: CY, s: -1 },
]);
const bounds = { x: 20, y: 24, w: W - 40, h: H - 48 };

/** 外部磁感线：从 N 极面外侧出发、绕回 S 极 */
const outer = computed(() => {
  const face = reverse.value ? -1 : 1;
  const out: { d: string; arrow: string }[] = [];
  for (const d of [-52, -32, -14, 0, 14, 32, 52]) {
    const line = traceLine([nX.value + face * 10, CY + d], poles.value, bounds, { stopRadius: 14 });
    if (line && line.points.length > 12) {
      const arrows = arrowsAlong(line, [0.5], 7);
      out.push({ d: line.d, arrow: arrows[0].d });
    }
  }
  return out;
});

const innerYs = [-22, 0, 22];
const coilTurns = [1, 2, 3, 4, 5, 6, 7];
</script>

<template>
  <div class="mf-solenoid">
    <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
      <!-- 外部磁感线 -->
      <g v-if="step >= 1" fill="none" stroke="var(--c-field)" stroke-width="1.7" opacity="0.8">
        <path v-for="(l, i) in outer" :key="i" :d="l.d" />
      </g>
      <g v-if="step >= 1" fill="var(--c-field)" opacity="0.8">
        <path v-for="(l, i) in outer" :key="`a${i}`" :d="l.arrow" />
      </g>

      <!-- 线圈（多匝，透视） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="2.8" opacity="0.9">
        <ellipse v-for="i in coilTurns" :key="i" :cx="104 + i * 48" :cy="CY" rx="22" ry="58" />
      </g>

      <!-- 电流方向 -->
      <g v-if="step >= 1">
        <line
          :x1="178"
          :y1="CY - 58"
          :x2="reverse ? 150 : 310"
          :y2="CY - 58"
          stroke="var(--c-force)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          :d="reverse ? `M 162 ${CY - 65} L 146 ${CY - 58} L 162 ${CY - 51} Z` : `M 294 ${CY - 65} L 310 ${CY - 58} L 294 ${CY - 51} Z`"
          fill="var(--c-force)"
        />
        <text :x="reverse ? 142 : 318" :y="CY - 68" font-size="15" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic">I</text>
      </g>

      <!-- 内部磁感线（平行密集，指向 N 极） -->
      <g v-if="step >= 2">
        <g stroke="var(--c-field)" stroke-width="1.9" opacity="0.95">
          <line
            v-for="(y, i) in innerYs"
            :key="i"
            :x1="reverse ? 452 : 128"
            :y1="CY + y"
            :x2="reverse ? 128 : 452"
            :y2="CY + y"
          />
        </g>
        <g fill="var(--c-field)">
          <path
            v-for="(y, i) in innerYs"
            :key="`ia${i}`"
            :d="reverse ? `M 146 ${CY + y - 5} L 128 ${CY + y} L 146 ${CY + y + 5} Z` : `M 434 ${CY + y - 5} L 452 ${CY + y} L 434 ${CY + y + 5} Z`"
          />
        </g>
      </g>

      <!-- N / S 极 -->
      <g v-if="step >= 2">
        <text :x="nX" :y="CY - 74" text-anchor="middle" font-size="19" font-weight="700" fill="var(--c-danger)" font-family="KaTeX_Main">N</text>
        <text :x="sX" :y="CY - 74" text-anchor="middle" font-size="19" font-weight="700" fill="var(--c-velocity)" font-family="KaTeX_Main">S</text>
      </g>

      <!-- 内部密 / 管口外疏 -->
      <g v-if="step >= 3">
        <text :x="W / 2" :y="CY + 84" text-anchor="middle" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">内部密</text>
        <text :x="reverse ? SX : NX" :y="CY + 96" text-anchor="middle" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">管口外疏</text>
      </g>
    </svg>

    <div class="mf-ctrl">
      <button type="button" class="mf-btn" :class="{ on: !reverse }" @click="reverse = false">电流方向 ①</button>
      <button type="button" class="mf-btn" :class="{ on: reverse }" @click="reverse = true">电流方向反向</button>
    </div>
  </div>
</template>

<style scoped>
.mf-solenoid {
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
