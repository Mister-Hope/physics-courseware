<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref, watch } from "vue";

/**
 * 第 9 页「接触带电与平分电荷」（教师补充内容）：两个完全相同的金属球接触后再分开，
 * 用真实公式平分电荷 Q_A' = Q_B' = (Q_A + Q_B) / 2。
 * 页面 clicks: 3 —— 第 1 击两球接触，第 2 击例题一（+Q 与 0），第 3 击例题二（+Q 与 −3Q）。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

/** 以 Q 为单位的四种可选情形（只取 e 的整数倍，避免出现真实电荷的连续值） */
const cases = [
  { qb: 0, tex: "Q_B = 0" },
  { qb: -3, tex: "Q_B = -3Q" },
  { qb: 1, tex: "Q_B = +Q" },
  { qb: -1, tex: "Q_B = -Q" },
];
const idx = ref(0);
const qa = 1; // Q_A = +Q

watch(step, (s) => {
  if (s >= 3) idx.value = 1;
  else if (s >= 2) idx.value = 0;
});

const qb = computed(() => cases[idx.value].qb);
const caseTex = computed(() => cases[idx.value].tex);
const result = computed(() => (qa + qb.value) / 2);

/** 结果写成以 Q 为单位的 LaTeX */
const resultTex = computed(() => {
  const r = result.value;
  if (r === 0) return "0";
  if (r === 0.5) return "+\\dfrac{Q}{2}";
  if (r === -0.5) return "-\\dfrac{Q}{2}";
  return r > 0 ? "+Q" : "-Q";
});
const sumTex = computed(
  () => `\\dfrac{Q_A + Q_B}{2} = \\dfrac{Q + (${cases[idx.value].tex.replace("Q_B = ", "")})}{2}`,
);
/** 球上显示的电荷符号 */
const signB = computed(() => (qb.value === 0 ? "0" : qb.value > 0 ? "+" : "−"));
/** 球 B 的颜色跟随它的电荷正负（滑块可以把它调成 +Q，不能永远是"负电蓝"） */
const colorB = computed(() => (qb.value > 0 ? "var(--c-danger)" : qb.value < 0 ? "var(--c-velocity)" : "var(--c-text-dim)"));
</script>

<template>
  <div class="clab">
    <svg viewBox="0 0 520 250" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 金属球 A -->
      <g>
        <circle cx="150" cy="126" r="40" fill="var(--c-danger)" fill-opacity="0.22" stroke="var(--c-danger)" stroke-width="2.4" />
        <text x="150" y="126" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="30" fill="var(--c-danger)">+</text>
        <text x="150" y="52" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">A</text>
      </g>

      <!-- 金属球 B：接触时向左靠拢 -->
      <g style="transition: transform 0.4s ease" :transform="step >= 1 ? 'translate(-24 0)' : ''">
        <circle cx="370" cy="126" r="40" :fill="colorB" fill-opacity="0.22" :stroke="colorB" stroke-width="2.4" />
        <text x="370" y="126" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="30" :fill="colorB">{{ signB }}</text>
        <text x="370" y="52" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">B</text>
      </g>

      <text x="260" y="212" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">两个完全相同的金属球</text>
    </svg>

    <CourseSlider v-model="idx" :min="0" :max="3" :step="1" label="球 B 的电荷量" accent="blue" aria-label="球 B 的电荷量">
      <template #value><Latex :tex="caseTex" /></template>
    </CourseSlider>

    <div class="clab-out">
      <div class="clab-sum" :class="{ 'clab-hidden': step < 2 }">
        <Latex :tex="sumTex" display />
      </div>
      <div class="clab-res" :class="{ 'clab-hidden': step < 2 }">
        <Latex tex="Q_A' = Q_B' =" />
        <Latex :tex="resultTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clab {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.clab-out {
  text-align: center;
  font-size: 1.1rem;
}

.clab-res {
  /* 常驻占位（step < 2 只是 visibility: hidden），并给足最小高度：
     结果从 +Q/2（分式，更高）变成 -Q 时行高不再变化，
     否则组件高度一变，.half-grid 重新居中会把滑块与提问顶跑（实测 24.7px / 6px）。 */
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
  min-height: 3.1rem;
  margin-top: 0.3rem;
  color: var(--c-accent);
}

.clab-sum {
  /* 等式常驻占位：第 2 击之前只是看不见，宽度/高度都留着 */
  min-height: 2.2rem;
}

.clab-hidden {
  visibility: hidden;
}
</style>
