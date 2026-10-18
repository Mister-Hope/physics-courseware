<script setup lang="ts">
/**
 * 第 5 页：库仑扭秤（9-text.md 行 115–116）
 *
 * 细银丝的下端悬挂一根绝缘棒：一端是小球 A、另一端通过物体 B 使棒平衡（悬丝自然状态）。
 * 带电的金属小球 C 与 A 带同种电荷；C 靠近 A 时，A 因斥力远离（图上用虚线"被推开的位置"+ 力箭头 F 表示）。
 * 扭转悬丝（扭转顶部旋钮）使 A 回到初始位置并静止，**扭转的角度可以比较力的大小**。
 *
 * 装置不画数值：教材没给 r、F 的数值 ⇒ 屏幕上只有符号（A、B、C、F、θ）。
 */
const { showForce = false, showTwistAngle = false } = defineProps<{
  showForce?: boolean;
  showTwistAngle?: boolean;
}>();

const VB_W = 560;
const VB_H = 300;

/** 悬丝的固定端（扭转旋钮）与下端（绝缘棒中点，棒的转轴） */
const HEAD = { x: 300, y: 42 };
const PIVOT = { x: 300, y: 116 };
/** 绝缘棒两端的小球 A 与配重 B（关于转轴对称，棒处于平衡） */
const A = { x: 152, y: 166 };
const B = { x: 448, y: 66 };
/** 带电体 C（与 A 等高，位于 A 的外侧） */
const C = { x: 62, y: 166 };

/** 旋钮指针：未扭转时指向右侧；扭转过 θ 之后偏下 20° */
const pointerRef = { x: HEAD.x + 42, y: HEAD.y };
const pointerTurned = { x: HEAD.x + 42 * Math.cos((20 * Math.PI) / 180), y: HEAD.y + 42 * Math.sin((20 * Math.PI) / 180) };

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="tb-host">
    <svg viewBox="0 0 560 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 固定座与扭转旋钮 -->
      <rect x="250" y="14" width="100" height="14" rx="5" fill="var(--c-neutral-700)" fill-opacity="0.75" />
      <circle :cx="HEAD.x" :cy="HEAD.y" r="11" fill="none" stroke="var(--c-neutral-500)" stroke-width="2" />
      <!-- 玻璃容器 -->
      <rect x="24" y="48" width="480" height="204" rx="22" fill="none" stroke="var(--c-neutral-600)" stroke-width="1.6" opacity="0.45" />
      <!-- 细银丝：自然状态竖直 -->
      <line :x1="HEAD.x" :y1="HEAD.y + 11" :x2="PIVOT.x" :y2="PIVOT.y" stroke="var(--c-neutral-300)" stroke-width="1.6" />
      <!-- 绝缘棒（A—转轴—B） -->
      <line :x1="A.x" :y1="A.y" :x2="B.x" :y2="B.y" stroke="var(--c-text)" stroke-width="3.4" stroke-linecap="round" />
      <!-- 小球 A -->
      <circle :cx="A.x" :cy="A.y" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="A.x"
        :y="A.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#0c1122"
      >
        +
      </text>
      <text
        :x="A.x"
        :y="202"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        fill="var(--c-text)"
      >
        A
      </text>
      <!-- 配重 B -->
      <circle :cx="B.x" :cy="B.y" r="13" fill="var(--c-neutral-600)" />
      <text
        :x="B.x - 3"
        :y="B.y + 34"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        fill="var(--c-text-dim)"
      >
        B
      </text>
      <!-- 带电体 C -->
      <circle :cx="C.x" :cy="C.y" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="C.x"
        :y="C.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#0c1122"
      >
        +
      </text>
      <text
        :x="C.x"
        :y="202"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        fill="var(--c-text)"
      >
        C
      </text>
      <g v-if="showForce">
        <circle cx="208" cy="166" r="16" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" />
        <CourseArrow :from="{ x: A.x, y: A.y }" :to="{ x: 188, y: 166 }" stroke="var(--c-force)" stroke-width="3.2" label="F" :label-dy="22" />
      </g>
      <g v-if="showTwistAngle">
        <line
          :x1="HEAD.x"
          :y1="HEAD.y"
          :x2="pointerRef.x"
          :y2="pointerRef.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="5 5"
        />
        <line
          :x1="HEAD.x"
          :y1="HEAD.y"
          :x2="pointerTurned.x"
          :y2="pointerTurned.y"
          stroke="var(--c-accent)"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <path
          :d="`M ${pointerRef.x} ${pointerRef.y} A 42 42 0 0 1 ${pointerTurned.x.toFixed(1)} ${pointerTurned.y.toFixed(1)}`"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
        />
      </g>
    </svg>
    <ChartLabel
      v-bind="pct(376, 62)"
      :parts="[{ tex: '\\theta' }]"
      :visible="showTwistAngle"
      :size="18"
      color="var(--c-accent)"
    />
  </div>
</template>

<style scoped>
.tb-host {
  position: relative;
  width: 100%;
}

.tb-host > svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
