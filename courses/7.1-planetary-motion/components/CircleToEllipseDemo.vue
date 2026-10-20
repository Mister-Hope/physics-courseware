<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 6 页：椭圆是怎么来的——把一个圆沿一个方向均匀压扁，就得到椭圆。 长轴方向的长度不变（半长轴 a 不变），短轴方向被压短（半短轴 b < a）； 压得越扁，两个焦点分得越开（c =
 * √(a² − b²)），这正是“离心率 e = c/a”反映形状变化的原因。
 */
/** 圆的半径 = 半长轴（压扁时不变） */
const A = 108;
/** 压扁程度：0 = 圆，越大越扁 */
const flat = ref(0.4);
/** 半短轴 b = a(1 − 压扁程度)、半焦距 c = √(a² − b²)、离心率 e = c/a */
const semiMinor = computed(() => A * (1 - flat.value));
const cFocal = computed(() => Math.sqrt(Math.max(0, A * A - semiMinor.value ** 2)));
const eccentricity = computed(() => cFocal.value / A);
const ratio = computed(() => semiMinor.value / A);
const C = { x: 250, y: 145 };
/** 两个焦点（压扁后才出现） */
const F1 = computed(() => ({ x: C.x - cFocal.value, y: C.y }));
const F2 = computed(() => ({ x: C.x + cFocal.value, y: C.y }));
/** “压扁”的两个箭头：从圆外指到椭圆的上下顶点 */
const squeeze = computed(() => ({
  top: { from: { x: C.x, y: C.y - A - 24 }, to: { x: C.x, y: C.y - semiMinor.value - 8 } },
  bottom: { from: { x: C.x, y: C.y + A + 24 }, to: { x: C.x, y: C.y + semiMinor.value + 8 } },
}));
const aria = computed(
  () =>
    `把一个半径为 a 的圆沿竖直方向压扁：半短轴 b = ${ratio.value.toFixed(2)}a，离心率 e = ${eccentricity.value.toFixed(2)}。`,
);
</script>

<template>
  <div class="ce">
    <svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
      <line
        x1="30"
        y1="34"
        x2="62"
        y2="34"
        stroke="#94a3b8"
        stroke-width="1.6"
        stroke-dasharray="6 5"
        opacity="0.8"
      />
      <text x="70" y="40" font-size="15" fill="#94a3b8">圆</text>
      <line x1="30" y1="58" x2="62" y2="58" stroke="#e2a846" stroke-width="2.4" />
      <text x="70" y="64" font-size="15" fill="#94a3b8">椭圆</text>
      <circle
        :cx="C.x"
        :cy="C.y"
        :r="A"
        fill="none"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.55"
      />
      <ellipse
        :cx="C.x"
        :cy="C.y"
        :rx="A"
        :ry="semiMinor"
        fill="none"
        stroke="#e2a846"
        stroke-width="2.4"
      />
      <g v-if="flat > 0.02">
        <CourseArrow
          :from="squeeze.top.from"
          :to="squeeze.top.to"
          stroke="#60a5fa"
          stroke-width="2.2"
        />
        <CourseArrow
          :from="squeeze.bottom.from"
          :to="squeeze.bottom.to"
          stroke="#60a5fa"
          stroke-width="2.2"
        />
      </g>
      <g v-if="flat > 0.02">
        <circle :cx="F1.x" :cy="F1.y" r="4.6" fill="none" stroke="#e2a846" stroke-width="1.8" />
        <circle :cx="F2.x" :cy="F2.y" r="4.6" fill="none" stroke="#e2a846" stroke-width="1.8" />
        <text :x="F1.x" :y="F1.y + 22" text-anchor="middle" font-size="14" fill="#e2a846">
          焦点
        </text>
        <text :x="F2.x" :y="F2.y + 22" text-anchor="middle" font-size="14" fill="#e2a846">
          焦点
        </text>
      </g>
    </svg>

    <div class="ce-panel">
      <div class="ce-row">
        <span class="ce-label">压扁程度</span>
        <input v-model.number="flat" class="ce-range" type="range" min="0" max="0.9" step="0.05" />
        <span class="ce-value">b / a = {{ ratio.toFixed(2) }}</span>
      </div>
      <div class="ce-row ce-row-note">
        <span>沿一个方向均匀压扁：长轴不变，短轴变短</span>
        <span class="ce-shape">{{ flat === 0 ? "圆（a = b）" : "椭圆（b < a）" }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ce {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  min-width: 0;
}

.ce svg {
  display: block;
  width: 100%;
  height: auto;
}

.ce-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.ce-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.8rem;
}

.ce-label {
  white-space: nowrap;
}

.ce-range {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.ce-value {
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.ce-row-note {
  justify-content: space-between;
}

.ce-shape {
  color: var(--c-accent);
  white-space: nowrap;
}
</style>
