<!--
  第 2 页：提水桶的两种方式（等效替代的实物情境 · 规范火柴人示意图）
  - variant="kids"：两个小孩一左一右，画出肩膀，水桶位置稍低，手臂与拉力 F₁、F₂ 成角；
  - variant="adult"：一个大人，肩膀与颈椎自然相连，手臂垂直下垂提水桶，拉力 F 竖直向上；
  - 纯粹物理示意图：正常火柴人简笔画（纯净圆形脑袋，清晰肩线），原版规范水桶，无多余文字干扰。
-->
<script setup lang="ts">
import { computed } from "vue";

const { variant = "kids" } = defineProps<{ variant?: "kids" | "adult" }>();

/** 视图框与地面高度 */
const VIEW = { width: 320, height: 230 };
const GROUND_Y = 205;

/**
 * 水桶几何：
 *
 * - 小孩提桶时位置稍低一些 (rimY=149, bottomY=196)；
 * - 大人提桶时稍高 (rimY=135, bottomY=182)； 保持水桶本身的规范简笔画风格，无多余材质或纹理。
 */
const BUCKET = computed(() => {
  const isKids = variant === "kids";
  const deltaY = isKids ? 14 : 0;
  return {
    cx: 160,
    rimY: 135 + deltaY,
    rimRx: 28,
    rimRy: 6,
    bottomY: 182 + deltaY,
    bottomHalf: 20,
    handleTopY: 112.5 + deltaY,
  };
});

const handleLeft = computed(() => ({ x: BUCKET.value.cx - BUCKET.value.rimRx, y: BUCKET.value.rimY }));
const handleRight = computed(() => ({ x: BUCKET.value.cx + BUCKET.value.rimRx, y: BUCKET.value.rimY }));
const handleTop = computed(() => ({ x: BUCKET.value.cx, y: BUCKET.value.handleTopY }));

const bucketBody = computed(() => {
  const b = BUCKET.value;
  return `M ${handleLeft.value.x} ${b.rimY} L ${b.cx - b.bottomHalf} ${b.bottomY} Q ${b.cx} ${b.bottomY + 5} ${b.cx + b.bottomHalf} ${b.bottomY} L ${handleRight.value.x} ${b.rimY} Z`;
});

const bucketHandle = computed(() => {
  const b = BUCKET.value;
  const archY = b.rimY - 45;
  return `M ${handleLeft.value.x} ${handleLeft.value.y} Q ${b.cx} ${archY} ${handleRight.value.x} ${handleRight.value.y}`;
});

/** 两个小孩的内侧肩关节位置（拉力与发力手臂连接点） */
const kidLeftShoulder = { x: 102, y: 84 };
const kidRightShoulder = { x: 218, y: 84 };

/** 拉力矢量终点（沿手臂方向指向肩膀） */
const kidsArrows = computed(() => {
  const top = handleTop.value;
  // 左小孩箭头
  const dx1 = kidLeftShoulder.x - top.x;
  const dy1 = kidLeftShoulder.y - top.y;
  const len1 = Math.hypot(dx1, dy1);
  const arrowLen1 = len1 - 8;

  // 右小孩箭头
  const dx2 = kidRightShoulder.x - top.x;
  const dy2 = kidRightShoulder.y - top.y;
  const len2 = Math.hypot(dx2, dy2);
  const arrowLen2 = len2 - 8;

  return [
    {
      to: { x: top.x + (dx1 / len1) * arrowLen1, y: top.y + (dy1 / len1) * arrowLen1 },
      stroke: "var(--c-accent)",
      label: "F₁",
      labelDx: -14,
      labelDy: -6,
    },
    {
      to: { x: top.x + (dx2 / len2) * arrowLen2, y: top.y + (dy2 / len2) * arrowLen2 },
      stroke: "var(--c-accent-2)",
      label: "F₂",
      labelDx: 14,
      labelDy: -6,
    },
  ];
});
</script>

<template>
  <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`" class="select-none overflow-visible">
    <!-- 地面 -->
    <SurfaceHatch :from="{ x: 18, y: GROUND_Y }" :to="{ x: VIEW.width - 18, y: GROUND_Y }" side="below" :thickness="10" :gap="28" />

    <!-- 人物：两个小孩一左一右（画出清晰自然的肩膀，正常圆形脑袋） -->
    <g v-if="variant === 'kids'" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- ─── 左侧小孩 ─── -->
      <g>
        <!-- 头部：正常圆 -->
        <circle cx="88" cy="66" r="10" fill="color-mix(in srgb, var(--c-accent-2) 18%, transparent)" stroke="var(--c-accent-2)" stroke-width="2.4" />
        <!-- 颈部 -->
        <line x1="88" y1="76" x2="88" y2="84" stroke="var(--c-neutral-200)" stroke-width="3.2" />
        <!-- 肩膀线（横向肩横梁，明确左右肩关节） -->
        <line x1="74" y1="84" x2="102" y2="84" stroke="var(--c-neutral-200)" stroke-width="3.2" />
        <!-- 躯干（脊柱从肩膀中点连至髋部） -->
        <line x1="88" y1="84" x2="84" y2="142" stroke="var(--c-neutral-200)" stroke-width="3.4" />
        <!-- 提桶手臂（从内侧肩膀连接到水桶提手最高点） -->
        <line :x1="kidLeftShoulder.x" :y1="kidLeftShoulder.y" :x2="handleTop.x" :y2="handleTop.y" stroke="var(--c-neutral-200)" stroke-width="2.8" />
        <!-- 外侧自然下垂手臂（从外侧肩膀垂落） -->
        <path d="M 74 84 L 66 112 L 68 126" stroke="var(--c-neutral-500)" stroke-width="2.4" />
        <!-- 双腿（自然开立支撑） -->
        <polyline points="84,142 72,174 68,205" stroke="var(--c-neutral-200)" stroke-width="3" />
        <polyline points="84,142 94,174 96,205" stroke="var(--c-neutral-200)" stroke-width="3" />
      </g>

      <!-- ─── 右侧小孩 ─── -->
      <g>
        <!-- 头部：正常圆 -->
        <circle cx="232" cy="66" r="10" fill="color-mix(in srgb, var(--c-accent-2) 18%, transparent)" stroke="var(--c-accent-2)" stroke-width="2.4" />
        <!-- 颈部 -->
        <line x1="232" y1="76" x2="232" y2="84" stroke="var(--c-neutral-200)" stroke-width="3.2" />
        <!-- 肩膀线（横向肩横梁） -->
        <line x1="218" y1="84" x2="246" y2="84" stroke="var(--c-neutral-200)" stroke-width="3.2" />
        <!-- 躯干 -->
        <line x1="232" y1="84" x2="236" y2="142" stroke="var(--c-neutral-200)" stroke-width="3.4" />
        <!-- 提桶手臂（从内侧肩膀连接到水桶提手最高点） -->
        <line :x1="kidRightShoulder.x" :y1="kidRightShoulder.y" :x2="handleTop.x" :y2="handleTop.y" stroke="var(--c-neutral-200)" stroke-width="2.8" />
        <!-- 外侧自然下垂手臂 -->
        <path d="M 246 84 L 254 112 L 252 126" stroke="var(--c-neutral-500)" stroke-width="2.4" />
        <!-- 双腿 -->
        <polyline points="236,142 226,174 224,205" stroke="var(--c-neutral-200)" stroke-width="3" />
        <polyline points="236,142 248,174 252,205" stroke="var(--c-neutral-200)" stroke-width="3" />
      </g>
    </g>

    <!-- 人物：一个更高的大人（肩膀与脊柱骨架自然连结，手臂自左肩垂直下垂） -->
    <g v-else stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 头部：正常圆 -->
      <circle cx="178" cy="32" r="13" fill="color-mix(in srgb, var(--c-accent) 18%, transparent)" stroke="var(--c-accent)" stroke-width="2.8" />
      <!-- 颈部 -->
      <line x1="178" y1="45" x2="178" y2="56" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <!-- 肩膀线：横跨两肩（左肩 x=160 严格与水桶垂直对齐，连接颈椎，通往右肩 x=196） -->
      <line x1="160" y1="56" x2="196" y2="56" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <!-- 躯干脊柱：从肩膀中点连接至髋关节 -->
      <line x1="178" y1="56" x2="178" y2="130" stroke="var(--c-neutral-200)" stroke-width="4.2" />
      <!-- 提水手臂：自左肩 (160, 56) 竖直向下垂落连接提手 (160, 112.5) -->
      <line x1="160" y1="56" x2="160" y2="112.5" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <!-- 右侧自然下垂手臂 -->
      <path d="M 196 56 L 202 88 L 198 120" stroke="var(--c-neutral-500)" stroke-width="3" />
      <!-- 双腿自然开立支撑 -->
      <polyline points="178,130 172,168 170,205" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <polyline points="178,130 186,168 188,205" stroke="var(--c-neutral-200)" stroke-width="3.6" />
    </g>

    <!-- 水桶（规范简洁实物示意，无多余复杂装饰） -->
    <path :d="bucketBody" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <ellipse
      :cx="BUCKET.cx"
      :cy="BUCKET.rimY"
      :rx="BUCKET.rimRx"
      :ry="BUCKET.rimRy"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text-dim)"
      stroke-width="2.4"
    />
    <ellipse
      :cx="BUCKET.cx"
      :cy="BUCKET.rimY + 2"
      :rx="BUCKET.rimRx - 6"
      :ry="BUCKET.rimRy - 2.5"
      fill="color-mix(in srgb, var(--c-accent-2) 38%, transparent)"
    />
    <path :d="bucketHandle" fill="none" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />

    <!-- 手部抓握圆点 -->
    <template v-if="variant === 'kids'">
      <circle :cx="handleTop.x - 2.6" :cy="handleTop.y + 0.6" r="4.2" fill="var(--c-neutral-200)" />
      <circle :cx="handleTop.x + 2.6" :cy="handleTop.y + 2.2" r="4.2" fill="var(--c-neutral-200)" />
    </template>
    <circle v-else :cx="handleTop.x" :cy="handleTop.y" r="5" fill="var(--c-neutral-200)" />

    <!-- 拉力矢量：小孩模式为成角度的拉力 F₁、F₂，大人模式为竖直向上的拉力 F -->
    <template v-if="variant === 'kids'">
      <CourseArrow
        v-for="arrow in kidsArrows"
        :key="arrow.stroke"
        :from="handleTop"
        :to="arrow.to"
        :stroke="arrow.stroke"
        :label="arrow.label"
        :label-dx="arrow.labelDx"
        :label-dy="arrow.labelDy"
        stroke-width="3.2"
        pointer-events="none"
      />
    </template>
    <CourseArrow
      v-else
      :from="handleTop"
      :to="{ x: handleTop.x, y: 64 }"
      stroke="var(--c-physics)"
      stroke-width="3.4"
      label="F"
      :label-dx="-16"
      :label-dy="-4"
      pointer-events="none"
    />
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style>
