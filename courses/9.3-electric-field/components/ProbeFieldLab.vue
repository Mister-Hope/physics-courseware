<script setup lang="ts">
import { computed, ref } from "vue";

// 第 7 页：电场中同一点，试探电荷的电荷量 q 变化时，F 与 F/q 怎么变。
// 真实公式：E = kQ/r²，F = Eq = kQq/r²，F/q = kQ/r²（与 q 无关，只与 Q、r 有关）。
// showRatio（第 1 击）：显示 F/q 读数行（用 visibility 占位，不顶跑上面的读数）。
//
// 形态说明（2026-10 按 `.agents/notes/interactive-necessity.md` 自查后调整）：
//   q 用**连续滑块**——"F 随 q 线性变、而 F/q 不变"正是本页要建立的关系（指南 §2 A+B）；
//   r 改为**两档离散按钮**（同一点 / 另一点）——本页对 r 的诉求只是教材行 239–241 的"离散对照"
//   （不同位置比值一般不同），连续调 r 的主场是第 10 页的点电荷场强 E = kQ/r²。
defineProps<{ showRatio?: boolean }>();

const K = 9e9;
const Q = 1e-6; // 场源电荷的电荷量，单位 C

const q = ref(1e-8); // 试探电荷的电荷量，单位 C
const R_NEAR = 0.2; // 同一点：P 到场源电荷的距离，单位 m
const R_FAR = 0.34; // 另一点
const atNearPoint = ref(true);
const r = computed(() => (atNearPoint.value ? R_NEAR : R_FAR));

const E = computed(() => (K * Q) / (r.value * r.value));
const F = computed(() => E.value * q.value);
const ratio = computed(() => F.value / q.value);

// 力箭头长度：按全部可调范围内的最大受力归一化，任何取值都不越出 viewBox
const F_MAX = (K * Q * 3e-8) / (0.1 * 0.1);
const arrowLen = computed(() => 10 + (F.value / F_MAX) * 46);

const QX = 80;
const QY = 84;
const px = computed(() => QX + 110 + ((r.value - 0.1) / 0.3) * 250);

function sci(value: number, digits = 2) {
  const e = Math.floor(Math.log10(value));
  const m = value / 10 ** e;
  return { m: m.toFixed(digits), e };
}
// 滑块自带的读数会按 toFixed 显示（q ~ 1e-8 时被压成 0.0），故用 #value 槽自己给科学计数法。
// 指数固定为 10⁻⁸（本页 q 只取 0.5–3.0 ×10⁻⁸）：否则跨过 1.0 时指数会从 10⁻⁹ 跳到 10⁻⁸，
// 读数宽度跟着变、拖动时滑块宽度会抖。
const qTex = computed(() => `${(q.value / 1e-8).toFixed(1)}\\times 10^{-8}\\ \\text{C}`);
const fTex = computed(() => {
  const s = sci(F.value);
  return `F = ${s.m}\\times 10^{${s.e}}\\ \\text{N}`;
});
const ratioTex = computed(() => {
  const s = sci(ratio.value);
  return `\\dfrac{F}{q} = ${s.m}\\times 10^{${s.e}}\\ \\text{N/C}`;
});
</script>

<template>
  <div class="pfl">
    <svg viewBox="0 0 700 165" class="pfl-fig">
      <line
        :x1="QX"
        :y1="QY"
        :x2="px"
        :y2="QY"
        stroke="var(--c-neutral-500)"
        stroke-opacity="0.45"
        stroke-width="1.6"
        stroke-dasharray="4 6"
      />
      <text
        :x="(QX + px) / 2"
        :y="QY - 14"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-neutral-500)"
      >
        r
      </text>
      <circle :cx="QX" :cy="QY" r="18" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="QX"
        :y="QY"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#fff"
      >
        +
      </text>
      <text
        :x="QX"
        :y="QY + 46"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-danger)"
      >
        Q
      </text>
      <circle :cx="px" :cy="QY" r="9" fill="var(--c-accent)" fill-opacity="0.9" />
      <text
        :x="px"
        :y="QY + 32"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-accent)"
      >
        q
      </text>
      <CourseArrow
        :from="{ x: px, y: QY }"
        :to="{ x: px + arrowLen, y: QY }"
        stroke="var(--c-force)"
        :stroke-width="3"
      />
      <text
        :x="px + arrowLen / 2"
        :y="QY - 16"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-force)"
      >
        F
      </text>
    </svg>
    <div class="pfl-panel">
      <CourseSlider
        v-model="q"
        :min="0.5e-8"
        :max="3e-8"
        :step="0.1e-8"
        label-tex="q"
        label-width="2.4rem"
        accent="gold"
      >
        <template #value
          ><span class="pfl-q"><Latex :tex="qTex" /></span
        ></template>
      </CourseSlider>
      <button class="pfl-toggle" type="button" @click="atNearPoint = !atNearPoint">
        {{ atNearPoint ? "同一点" : "另一点" }}
      </button>
      <div class="pfl-read"><Latex :tex="fTex" /></div>
      <div class="pfl-read pfl-ratio" :class="{ 'pfl-hidden': !showRatio }">
        <Latex :tex="ratioTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfl {
  display: flex;
  gap: 1.25rem;
  align-items: stretch;
}

.pfl-fig {
  flex: 1 1 0;
  min-width: 0;
  height: 152px;
}

.pfl-panel {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: center;

  width: 13rem;
}

.pfl-toggle {
  align-self: flex-start;

  padding: 0.2rem 0.9rem;
  border: 1px solid rgb(148 163 184 / 30%);
  border-radius: 999px;

  background: var(--c-surface);
  color: var(--c-text);

  cursor: pointer;
}

.pfl-read {
  font-size: 0.88rem;
}

/* 科学计数法读数比默认 text-xl 窄一档，给滑块留出可拖动宽度（右栏只有 13rem） */
.pfl-q {
  font-size: 0.85rem;
}

.pfl-ratio {
  color: var(--c-accent);
}

.pfl-hidden {
  visibility: hidden;
}
</style>
