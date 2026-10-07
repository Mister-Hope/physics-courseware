<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 椰子装水：球壳 + 水的组合体，重心位置随水位变化。 把水看成球缺，用球缺的体积与一阶矩（对球心）算出水的质心高度， 再按质量加权得到组合体重心——水位从满到空，重心先下降、后上升，
 * 最低点恰好落在"重心与液面相重合"处。
 */

/** 球壳半径、球心、球壳质量（只取装满水时水质量的 1/4，椰壳比较轻） */
const SHELL_R = 118;
const COCO = { x: 300, y: 158 };
const SHELL_MASS = 0.25 * ((4 * Math.PI) / 3);

/** 水位（0 空 ~ 2 满，以球半径为 1）：初始为空椰子 */
const fill = ref(0);

/**
 * 给定水位（从球底算起、以球半径为 1）时水的质心与组合体质心
 *
 * @param height 水位
 * @returns 水质心（距球底）与组合体质心（距球底），都以球半径为 1
 */
const cocoAt = (height: number): { water: number; whole: number } => {
  const h = Math.max(height, 0.02);
  const base = 1 - h;
  const volume = Math.PI * (2 / 3 - base + base ** 3 / 3);

  if (volume < 1e-9) return { water: 0, whole: 1 };

  const moment = -Math.PI * (1 / 4 - (base * base) / 2 + base ** 4 / 4);
  const waterCenter = moment / volume + 1;

  return { water: waterCenter, whole: (SHELL_MASS + volume * waterCenter) / (SHELL_MASS + volume) };
};

const now = computed(() => cocoAt(fill.value));

/** 扫一遍水位（0 ~ 2R），找出重心最低的位置 */
const lowest = computed(() => {
  let best = { height: 0, center: 2 };

  for (let step = 1; step <= 200; step += 1) {
    const height = (step / 200) * 2;
    const { whole } = cocoAt(height);

    if (whole < best.center) best = { height, center: whole };
  }

  return best;
});

/** 水面高度与水面的两条交线（把水面线裁在球内） */
const surface = computed(() => COCO.y + SHELL_R - fill.value * SHELL_R);
const chord = computed(() => {
  const dy = surface.value - COCO.y;
  const half = Math.sqrt(Math.max(SHELL_R * SHELL_R - dy * dy, 0));

  return { x1: COCO.x - half, x2: COCO.x + half };
});
</script>

<template>
  <div class="cw">
    <svg
      class="cw-svg"
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="椰子装水时重心随水位的变化"
    >
      <defs>
        <clipPath id="cw-shell">
          <circle :cx="COCO.x" :cy="COCO.y" :r="SHELL_R" />
        </clipPath>
      </defs>
      <circle
        :cx="COCO.x"
        :cy="COCO.y"
        :r="SHELL_R"
        fill="rgba(148,163,184,0.10)"
        stroke="#cbd5e1"
        stroke-width="3.4"
      />
      <rect
        :x="COCO.x - SHELL_R"
        :y="surface"
        :width="SHELL_R * 2"
        :height="COCO.y + SHELL_R - surface"
        clip-path="url(#cw-shell)"
        fill="rgba(96,165,250,0.34)"
      />
      <line
        :x1="chord.x1"
        :y1="surface"
        :x2="chord.x2"
        :y2="surface"
        stroke="#60a5fa"
        stroke-width="2.6"
      />
      <line
        :x1="COCO.x - SHELL_R - 30"
        :y1="COCO.y + SHELL_R - lowest.center * SHELL_R"
        :x2="COCO.x + SHELL_R + 30"
        :y2="COCO.y + SHELL_R - lowest.center * SHELL_R"
        stroke="#94a3b8"
        stroke-width="1.6"
        stroke-dasharray="6 5"
      />
      <text
        :x="COCO.x + SHELL_R + 36"
        :y="COCO.y + SHELL_R - lowest.center * SHELL_R + 5"
        font-size="15"
        fill="#94a3b8"
      >
        最低
      </text>
      <text
        :x="COCO.x - SHELL_R - 36"
        :y="surface + 5"
        font-size="15"
        fill="#60a5fa"
        text-anchor="end"
      >
        液面
      </text>
      <circle :cx="COCO.x" :cy="COCO.y" r="4" fill="#64748b" />
      <circle
        :cx="COCO.x"
        :cy="COCO.y + SHELL_R - now.whole * SHELL_R"
        r="7"
        fill="#f87171"
        stroke="#0f1425"
        stroke-width="2"
      />
      <text
        :x="COCO.x - SHELL_R - 12"
        :y="COCO.y + SHELL_R - now.whole * SHELL_R + 5"
        font-size="18"
        fill="#f87171"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        重心
      </text>
    </svg>
    <div class="cw-ctrl">
      <label class="cw-label">
        <span>水位（空 ↔ 满）</span>
        <input v-model.number="fill" type="range" min="0" max="2" step="0.02" />
      </label>
      <div class="cw-read">
        水位升高：重心先<b class="cw-num">降低</b>、后<b class="cw-num">升高</b>
        <span class="cw-note">重心最低的时候，恰好是液面与重心相重合的时候（图中虚线）</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cw {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
}

.cw-svg {
  display: block;

  width: auto;
  max-width: 100%;
  height: 11rem;
  margin: 0 auto;
}

.cw-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-items: center;

  width: 100%;
  max-width: 25rem;
}

.cw-label {
  display: flex;
  gap: 0.7rem;
  align-items: center;

  width: 100%;

  color: var(--c-text-dim);

  font-size: 0.78rem;
}

.cw-label input {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.cw-read {
  color: var(--c-text);
  font-size: 0.82rem;
  text-align: center;
}

.cw-num {
  color: var(--c-accent);
  font-size: 0.98rem;
}

.cw-note {
  display: block;
  margin-top: 0.1rem;
  color: var(--c-text-dim);
  font-size: 0.74rem;
}
</style>
