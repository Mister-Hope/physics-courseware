<script setup lang="ts">
/**
 * 奥斯特实验（13.1 P3）
 * 导线沿南北方向架在小磁针上方；按钮控制开关与电流方向（@click，不占翻页点击）。
 * 磁针偏转角用真实关系 tanθ = B导 / B地，B导 = μ0 I / (2πr)，I = 4 A、r = 5 cm、B地 = 3×10⁻⁵ T。
 * 电流向北（屏幕向上）→ 磁针处磁场向西 → N 极向西偏；反向则反向。
 * 屏幕上一律不给读数，只给偏转方向与画面。
 */
import { computed, ref } from "vue";

const { showB = false } = defineProps<{ showB?: boolean }>();

const dir = ref<0 | 1 | -1>(0); // 0 断开；1 电流向北；-1 电流向南
const I = 4;
const R = 0.05;
const B_EARTH = 3e-5;
const B_WIRE = (2e-7 * I) / R; // μ0 I / (2πr)
const THETA = Math.atan(B_WIRE / B_EARTH);

const rot = computed(() => {
  if (dir.value === 0) return 0;
  return ((dir.value > 0 ? -1 : 1) * THETA * 180) / Math.PI;
});

/** 磁针处磁场方向：电流向北 → 向西（屏幕左） */
const bToWest = computed(() => dir.value > 0);

const pick = (d: 0 | 1 | -1) => {
  dir.value = d;
};

const dial = { x: 200, y: 215, r: 62 };
</script>

<template>
  <div class="mf-oersted">
    <div class="mf-ctrl">
      <button type="button" class="mf-btn" :class="{ on: dir === 0 }" @click="pick(0)">断开</button>
      <button type="button" class="mf-btn" :class="{ on: dir > 0 }" @click="pick(1)">电流向北</button>
      <button type="button" class="mf-btn" :class="{ on: dir < 0 }" @click="pick(-1)">电流向南</button>
    </div>

    <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" class="mf-fig-fill">
      <!-- 电路：上部开关与电源，右侧、下侧回到导线 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 200 44 H 260" />
        <path d="M 300 44 H 342" />
        <path d="M 358 44 H 392" />
        <path d="M 392 44 V 292" />
        <path d="M 392 292 H 200" />
      </g>
      <CircuitSwitch :x="280" :y="44" :open="dir === 0" label="S" />
      <CircuitBattery :x="350" :y="44" orientation="horizontal" polarity :flip="dir > 0" />

      <!-- 小磁针刻度盘（从上往下看） -->
      <circle :cx="dial.x" :cy="dial.y" :r="dial.r" fill="none" stroke="var(--c-text-dim)" stroke-width="2" opacity="0.65" />
      <g stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.6">
        <path :d="`M ${dial.x} ${dial.y - dial.r} V ${dial.y - dial.r + 12}`" />
        <path :d="`M ${dial.x} ${dial.y + dial.r} V ${dial.y + dial.r - 12}`" />
        <path :d="`M ${dial.x - dial.r} ${dial.y} H ${dial.x - dial.r + 12}`" />
        <path :d="`M ${dial.x + dial.r} ${dial.y} H ${dial.x + dial.r - 12}`" />
      </g>
      <text :x="dial.x" :y="dial.y - dial.r - 10" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">北</text>
      <text :x="dial.x" :y="dial.y + dial.r + 20" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">南</text>
      <text :x="dial.x - dial.r - 12" :y="dial.y + 5" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">西</text>
      <text :x="dial.x + dial.r + 12" :y="dial.y + 5" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">东</text>

      <!-- 磁针：N 红、S 蓝 -->
      <g :transform="`rotate(${rot} ${dial.x} ${dial.y})`">
        <path :d="`M ${dial.x} ${dial.y - 48} L ${dial.x + 9} ${dial.y} L ${dial.x} ${dial.y + 10} L ${dial.x - 9} ${dial.y} Z`" fill="var(--c-danger)" />
        <path :d="`M ${dial.x - 9} ${dial.y} L ${dial.x + 9} ${dial.y} L ${dial.x} ${dial.y + 46} Z`" fill="var(--c-velocity)" />
        <text :x="dial.x" :y="dial.y - 22" text-anchor="middle" font-size="13" fill="var(--c-text)" font-family="KaTeX_Main">N</text>
      </g>

      <!-- 导线（沿南北方向、架在磁针上方） -->
      <path d="M 200 44 V 292" stroke="var(--c-bg)" stroke-width="9" fill="none" />
      <path d="M 200 44 V 292" stroke="var(--c-text)" stroke-width="3" fill="none" />
      <line
        v-if="dir !== 0"
        :x1="200"
        :y1="dir > 0 ? 150 : 70"
        :x2="200"
        :y2="dir > 0 ? 70 : 150"
        stroke="var(--c-force)"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <path
        v-if="dir !== 0"
        :d="dir > 0 ? 'M 193 82 L 200 66 L 207 82 Z' : 'M 193 138 L 200 154 L 207 138 Z'"
        fill="var(--c-force)"
      />
      <text
        v-if="dir !== 0"
        x="214"
        :y="dir > 0 ? 84 : 140"
        font-size="17"
        fill="var(--c-force)"
        font-family="KaTeX_Math"
        font-style="italic"
      >I</text>

      <!-- 磁针处的磁场方向 -->
      <CourseArrow
        v-if="showB && dir !== 0"
        :from="bToWest ? { x: 122, y: dial.y } : { x: 278, y: dial.y }"
        :to="bToWest ? { x: 40, y: dial.y } : { x: 360, y: dial.y }"
        stroke="var(--c-field)"
        :stroke-width="3.2"
        label="B"
        :label-dx="bToWest ? -14 : 14"
        :label-dy="-12"
      />
    </svg>
  </div>
</template>

<style scoped>
.mf-oersted {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
  min-height: 0;
}

.mf-ctrl {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.mf-fig-fill {
  display: block;
  flex: 1;
  min-height: 0;
  width: 100%;
}
</style>
