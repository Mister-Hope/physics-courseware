<!--
  第二课时 · v 与 B 成夹角 θ 时的正交分解
  （《$v$ 与 $B$ 平行时》与《$v$ 与 $B$ 成夹角 $\theta$ 时》两页共用）
  —— 把 v 分解为沿 B 的 v∥ = v cosθ 与垂直 B 的 v⊥ = v sinθ：
       · v∥ 不受洛伦兹力 → 匀速直线运动；
       · v⊥ 受 F = qBv⊥ → 匀速圆周运动；
       · 合运动 = 螺旋线（θ = 0 时 v⊥ = 0，退化成匀速直线；θ = 90° 时 v∥ = 0，退化成圆）。
  与第一课时的呼应：第一课时"分解 B"（只有 B⊥ 产生力）得到 F = qvB sinθ；
                    第二课时"分解 v"（只有 v⊥ 受力）分析运动。同一个 sinθ 的两条路。
  《成夹角 θ 时》用按钮切换 θ（0°/30°/45°/60°/90°）；
  《平行时》只讲 θ = 0，传 picker=false 藏起整排按钮，只留底部结论行。
  公式标注走 ChartLabel 渲染真 KaTeX。
-->
<script setup>
import { computed, ref } from "vue";

const {
  initialTheta = 45,
  hint = true,
  picker = true,
} = defineProps({
  /** 初始夹角（讲 v ∥ B 时传 0） */
  initialTheta: { type: Number, default: 45 },
  /** 是否显示底部那句结论（先问后答：讲 v ∥ B 时先藏起来） */
  hint: { type: Boolean, default: true },
  /** 是否显示底部的夹角选择（讲 v ∥ B 时传 false，只留结论行） */
  picker: { type: Boolean, default: true },
});

const THETAS = [0, 30, 45, 60, 90];
const thetaDeg = ref(initialTheta);
const th = computed(() => (thetaDeg.value * Math.PI) / 180);

const OX = 130;
const OY = 250;
const L = 175; // v 的长度（用户单位）
const R_ARC = 72;

const tip = computed(() => ({ x: OX + L * Math.cos(th.value), y: OY - L * Math.sin(th.value) }));
const arcEnd = computed(() => ({
  x: OX + R_ARC * Math.cos(th.value),
  y: OY - R_ARC * Math.sin(th.value),
}));
/** θ 角弧：以 O 为圆心（半径 72），两端正好落在 B 与 v 两条射线上 */
const arc = computed(
  () =>
    `M ${OX + R_ARC} ${OY} A ${R_ARC} ${R_ARC} 0 0 0 ${arcEnd.value.x.toFixed(1)} ${arcEnd.value.y.toFixed(1)}`,
);

/**
 * ChartLabel 按 viewBox(520×330) 百分比定位
 *
 * @param x 用户单位横坐标
 * @param y 用户单位纵坐标
 * @returns 换算后的百分比坐标
 */
const pct = (x, y) => ({ x: (x / 520) * 100, y: (y / 300) * 100 });
const labelPar = computed(() => pct(OX + (L * Math.cos(th.value)) / 2, OY + 8));
const labelPerp = computed(() => pct(tip.value.x + 16, (OY + tip.value.y) / 2));
const labelTheta = computed(() =>
  pct(OX + 96 * Math.cos(th.value / 2), OY - 96 * Math.sin(th.value / 2)),
);

const perpZero = computed(() => thetaDeg.value === 0);
const parZero = computed(() => thetaDeg.value === 90);
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div
      class="relative flex min-h-0 w-full flex-1 items-center justify-center"
      style="aspect-ratio: 520 / 300"
    >
      <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
        <!-- B：水平方向（磁场方向） -->
        <CourseArrow
          :from="{ x: 60, y: OY }"
          :to="{ x: 480, y: OY }"
          stroke="var(--c-accent)"
          stroke-width="4"
          stroke-dasharray="10 7"
          style="opacity: 0.9"
        />
        <text
          x="492"
          y="258"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="var(--c-accent)"
        >
          B
        </text>

        <!-- v 的分解：v∥（沿 B，金）与 v⊥（垂直 B，青） -->
        <template v-if="!parZero">
          <CourseArrow
            :from="{ x: OX, y: OY }"
            :to="{ x: tip.x, y: OY }"
            stroke="var(--c-accent)"
            stroke-width="3.4"
          />
        </template>
        <template v-if="!perpZero">
          <CourseArrow
            :from="{ x: tip.x, y: OY }"
            :to="{ x: tip.x, y: tip.y }"
            stroke="var(--c-physics)"
            stroke-width="3.4"
          />
        </template>

        <!-- v：与 B 成 θ -->
        <CourseArrow
          :from="{ x: OX, y: OY }"
          :to="tip"
          stroke="var(--c-velocity)"
          stroke-width="4.6"
        />
        <text
          :x="tip.x + 12"
          :y="tip.y - 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="var(--c-velocity)"
        >
          v
        </text>

        <!-- 直角标记（v∥ ⊥ v⊥） -->
        <template v-if="!parZero && !perpZero">
          <path
            :d="`M ${tip.x - 12} ${OY} L ${tip.x - 12} ${OY - 12} L ${tip.x} ${OY - 12}`"
            fill="none"
            stroke="color-mix(in srgb, var(--c-text) 40%, transparent)"
            stroke-width="1.6"
          />
        </template>

        <!-- θ 角弧：以 O 为圆心 -->
        <template v-if="thetaDeg > 0">
          <path :d="arc" fill="none" stroke="var(--c-neutral-50)" stroke-width="2.2" />
        </template>

        <!-- 电荷（作用点） -->
        <circle :cx="OX" :cy="OY" r="9" fill="var(--c-velocity)" />
        <line
          :x1="OX - 4"
          :y1="OY"
          :x2="OX + 4"
          :y2="OY"
          stroke="var(--c-bg-soft)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <!-- 公式标注（真 KaTeX）：v∥ = v cosθ 只在 θ = 90°（v∥ = 0）时藏起来 -->
      <ChartLabel
        v-if="!parZero"
        :x-percent="labelPar.x"
        :y-percent="labelPar.y"
        :parts="[{ tex: 'v_{\\parallel} = v\\cos\\theta' }]"
        color="#e2a846"
        :size="19"
        halo
        :dy="14"
      />
      <ChartLabel
        v-if="!perpZero"
        :x-percent="labelPerp.x"
        :y-percent="labelPerp.y"
        anchor="right"
        :parts="[{ tex: 'v_{\\perp} = v\\sin\\theta' }]"
        color="#2dd4bf"
        :size="19"
        halo
      />
      <ChartLabel
        v-if="thetaDeg > 0"
        :x-percent="labelTheta.x"
        :y-percent="labelTheta.y"
        :parts="[{ tex: '\\theta' }]"
        color="#f8fafc"
        :size="20"
        halo
      />
    </div>

    <div class="mt-1 flex shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <template v-if="picker">
        <span class="shrink-0 whitespace-nowrap text-sm text-dim"
          >夹角 <Latex tex="\theta"
        /></span>
        <button
          v-for="opt in THETAS"
          :key="opt"
          type="button"
          class="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full text-sm border transition-colors"
          :class="thetaDeg === opt ? 'text-amber-300' : 'text-dim'"
          :style="{ borderColor: thetaDeg === opt ? 'var(--c-accent-light)' : 'var(--c-neutral-600)' }"
          @click="thetaDeg = opt"
        >
          {{ opt }}°
        </button>
      </template>
      <span
        class="shrink-0 whitespace-nowrap text-sm"
        :class="[hint ? '' : 'invisible', perpZero ? 'text-accent' : 'text-[var(--c-neutral-300)]']"
      >
        <template v-if="perpZero">
          <Latex tex="v_\perp = 0 \Rightarrow F = 0" />：匀速直线运动
        </template>
        <template v-else-if="parZero">
          <Latex tex="v_\parallel = 0" />：平面内匀速圆周运动
        </template>
        <template v-else>
          <Latex tex="F = qvB\sin\theta = qB\,v_\perp" />：只有 <Latex tex="v_\perp" /> 受力
        </template>
      </span>
    </div>
  </div>
</template>
