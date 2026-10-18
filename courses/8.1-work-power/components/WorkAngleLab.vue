<script setup lang="ts">
import { computed, ref } from "vue";

/** 第 5 页交互：取 F = 10 N、l = 2 m（教材练习与应用 1 的数值），转动夹角 α， 由 W = F·l·cosα 真实计算功，观察 cosα 的符号怎样决定功的正负。 */
const F = 10;
const L = 2;

/** 力 F 与位移 l 的夹角（度） */
const angle = ref(53);

const rad = computed(() => (angle.value * Math.PI) / 180);
const cosA = computed(() => Math.cos(rad.value));
/** 功 W = Fl cosα，真实公式计算（J） */
const work = computed(() => F * L * cosA.value);

const cosText = computed(() => cosA.value.toFixed(3));
const wText = computed(() => `${work.value >= 0 ? "+" : "−"}${Math.abs(work.value).toFixed(1)}`);
const state = computed(() => {
  if (cosA.value > 0.001) return { cls: "wal-ok", text: "力对物体做正功" };
  if (cosA.value < -0.001) return { cls: "wal-bad", text: "力对物体做负功" };
  return { cls: "wal-zero", text: "力对物体不做功" };
});

/** 力的作用点＝物块几何中心；位移方向水平向右 */
const C = { x: 212, y: 215 };
const R = 160;
const tip = computed(() => ({
  x: C.x + R * Math.cos(rad.value),
  y: C.y - R * Math.sin(rad.value),
}));
/** 沿位移方向的分量（投影）：α > 90° 时反向 */
const projTip = computed(() => ({ x: C.x + R * Math.cos(rad.value), y: C.y }));

/** 夹角圆弧（画在夹角内部），α = 0° 时退化成点、不显示 */
const ARC_R = 54;
const arcPath = computed(
  () =>
    `M ${C.x + ARC_R} ${C.y} A ${ARC_R} ${ARC_R} 0 0 0 ${(C.x + ARC_R * Math.cos(rad.value)).toFixed(1)} ${(C.y - ARC_R * Math.sin(rad.value)).toFixed(1)}`,
);
/** α 标注：角平分线上、圆弧外侧 */
const alphaAt = computed(() => {
  const half = rad.value / 2;
  return { x: C.x + 76 * Math.cos(half), y: C.y - 76 * Math.sin(half) };
});
</script>

<template>
  <div class="wal">
    <svg
      viewBox="0 0 480 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="改变夹角时力与位移的几何关系"
    >
      <SurfaceHatch
        :from="{ x: 18, y: 240 }"
        :to="{ x: 462, y: 240 }"
        side="below"
        :thickness="15"
        :gap="24"
      />
      <rect
        x="170"
        y="190"
        width="84"
        height="50"
        rx="9"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="2.4"
      />
      <CourseArrow
        :from="C"
        :to="{ x: 400, y: 215 }"
        stroke="var(--c-velocity)"
        :stroke-width="2.8"
        stroke-dasharray="8 6"
        label="x"
        :label-dy="-11"
      />
      <line
        :x1="tip.x"
        :y1="tip.y"
        :x2="projTip.x"
        :y2="projTip.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="5 5"
      />
      <path :d="arcPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <text
        :x="alphaAt.x"
        :y="alphaAt.y"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-text-dim)"
      >
        α
      </text>
      <CourseArrow
        :from="C"
        :to="projTip"
        stroke="var(--c-physics)"
        :stroke-width="2.8"
        stroke-dasharray="9 6"
      />
      <CourseArrow
        :from="C"
        :to="tip"
        stroke="var(--c-accent)"
        :stroke-width="3.6"
        label="F"
        :label-dx="10"
        :label-dy="-13"
      />
    </svg>
    <div class="wal-panel">
      <div class="wal-const"><Latex tex="F = 10\ \text{N}" />　<Latex tex="l = 2\ \text{m}" /></div>
      <CourseSlider
        v-model="angle"
        :min="0"
        :max="180"
        :step="5"
        label="夹角"
        label-tex="\alpha"
        label-width="4.6rem"
      >
        <template #value>{{ angle }}<Latex tex="^{\circ}" /></template>
      </CourseSlider>
      <div class="wal-eq">
        <Latex tex="\cos\alpha" /> = <b class="wal-num">{{ cosText }}</b>
      </div>
      <div class="wal-out">
        <Latex tex="W = Fl\cos\alpha" /> = <b class="wal-num">{{ wText }}</b>
        <Latex tex="\text{J}" />
      </div>
      <div class="wal-state" :class="state.cls">{{ state.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.wal {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.wal svg {
  display: block;
  flex: 0 0 54%;
  width: 100%;
}

.wal-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
  font-size: 0.95rem;
}

.wal-const {
  color: var(--c-text-dim);
}

.wal-num {
  color: var(--c-accent);
  font-size: 1.15rem;
}

.wal-out {
  padding-top: 0.35rem;
  border-top: 1px solid var(--c-border);
  font-size: 1.05rem;
}

.wal-state {
  align-self: flex-start;
  padding: 0.1rem 0.7rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.wal-ok {
  background: var(--c-ok-soft);
  color: var(--c-ok);
}

.wal-bad {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.wal-zero {
  background: var(--c-accent-soft);
  color: var(--c-text-dim);
}
</style>
