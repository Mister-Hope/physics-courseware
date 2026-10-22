<script setup lang="ts">
/**
 * 第 2 页：提水桶的两种方式（等效替代的实物情境）。
 *
 * - `variant="kids"`：两个小孩一左一右，手都抓在水桶提手的最高点，两条手臂各成一个方向——两个拉力 F₁、F₂ 就沿着手臂；
 * - `variant="adult"`：一个更高的大人，手臂自然下垂提着同一只水桶，一个竖直向上的拉力 F 沿着手臂。
 *
 * 两个水桶用同一套几何常量画出来，保证两边"一模一样"；人物是简笔火柴人，比例参照 3.3 的掰手腕图。
 */
const { variant = "kids" } = defineProps<{ variant?: "kids" | "adult" }>();

/** 视图框（用户单位）与地面高度 */
const VIEW = { width: 320, height: 230 };
const GROUND_Y = 205;

/** 水桶几何（两种人物共用） */
const BUCKET = {
  cx: 160,
  rimY: 135,
  rimRx: 28,
  rimRy: 6,
  bottomY: 182,
  bottomHalf: 20,
};
const handleLeft = { x: BUCKET.cx - BUCKET.rimRx, y: BUCKET.rimY };
const handleRight = { x: BUCKET.cx + BUCKET.rimRx, y: BUCKET.rimY };
/** 提手弧的最高点：两个小孩都抓在这里 */
const handleTop = { x: BUCKET.cx, y: 112.5 };

const bucketBody = `M ${handleLeft.x} ${BUCKET.rimY} L ${BUCKET.cx - BUCKET.bottomHalf} ${BUCKET.bottomY} Q ${BUCKET.cx} ${BUCKET.bottomY + 5} ${BUCKET.cx + BUCKET.bottomHalf} ${BUCKET.bottomY} L ${handleRight.x} ${BUCKET.rimY} Z`;
const bucketHandle = `M ${handleLeft.x} ${handleLeft.y} Q ${BUCKET.cx} 90 ${handleRight.x} ${handleRight.y}`;

/** 两个小孩的肩膀：手臂从这里连到提手最高点，拉力就沿这条手臂 */
const KID_SHOULDERS = [
  { x: 88, y: 82 },
  { x: 232, y: 82 },
];
const KID_HEADS = [
  { x: 88, y: 62 },
  { x: 232, y: 62 },
];
/** 拉力箭头：从提手最高点沿手臂指向肩膀（与手臂重合，只留肩膀前一小段手臂可见） */
const kidsArrows = KID_SHOULDERS.map((shoulder, index) => {
  const dx = shoulder.x - handleTop.x;
  const dy = shoulder.y - handleTop.y;
  const length = Math.hypot(dx, dy);
  const arrowLength = length - 8;

  return {
    to: {
      x: handleTop.x + (dx / length) * arrowLength,
      y: handleTop.y + (dy / length) * arrowLength,
    },
    stroke: index === 0 ? "var(--c-accent)" : "var(--c-accent-2)",
  };
});
</script>

<template>
  <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
    <!-- 地面 -->
    <SurfaceHatch :from="{ x: 18, y: GROUND_Y }" :to="{ x: VIEW.width - 18, y: GROUND_Y }" side="below" :thickness="10" :gap="28" />

    <!-- 人物：两个小孩一左一右，手都抓在水桶提手的最高点 -->
    <g v-if="variant === 'kids'" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <template v-for="(head, index) in KID_HEADS" :key="`kid-${index}`">
        <circle :cx="head.x" :cy="head.y" r="10" fill="color-mix(in srgb, var(--c-accent-2) 18%, transparent)" stroke="var(--c-accent-2)" stroke-width="2.4" />
        <line :x1="head.x" :y1="head.y + 10" :x2="head.x" y2="138" stroke="var(--c-neutral-200)" stroke-width="3.4" />
        <path :d="`M ${head.x} 138 L ${head.x - 9} 200 M ${head.x} 138 L ${head.x + 9} 200`" stroke="var(--c-neutral-200)" stroke-width="3" />
        <!-- 伸向提手最高点的手臂 -->
        <line :x1="KID_SHOULDERS[index].x" :y1="KID_SHOULDERS[index].y" :x2="handleTop.x" :y2="handleTop.y" stroke="var(--c-neutral-200)" stroke-width="2.8" />
        <!-- 另一只自然下垂的手 -->
        <path :d="`M ${head.x} 82 L ${head.x + (index === 0 ? -15 : 15)} 122`" stroke="var(--c-neutral-500)" stroke-width="2.4" />
      </template>
    </g>

    <!-- 人物：一个更高的大人，手臂自然下垂提着桶 -->
    <g v-else stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="175" cy="28" r="14" fill="color-mix(in srgb, var(--c-accent) 18%, transparent)" stroke="var(--c-accent)" stroke-width="2.8" />
      <line x1="175" y1="42" x2="175" y2="130" stroke="var(--c-neutral-200)" stroke-width="4.2" />
      <path d="M 175 130 L 163 200 M 175 130 L 187 200" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <!-- 自然下垂、提着桶的手臂：竖直向下连到提手最高点 -->
      <line x1="160" y1="58" x2="160" y2="112" stroke="var(--c-neutral-200)" stroke-width="3.6" />
      <path d="M 175 72 L 196 124" stroke="var(--c-neutral-500)" stroke-width="3" />
    </g>

    <!-- 水桶（两边完全相同） -->
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

    <!-- 手：两个小孩各一只手抓在最高点（两只手并排），大人一只手抓在最高点 -->
    <template v-if="variant === 'kids'">
      <circle :cx="handleTop.x - 2.6" :cy="handleTop.y + 0.6" r="4.4" fill="var(--c-neutral-200)" />
      <circle :cx="handleTop.x + 2.6" :cy="handleTop.y + 2.2" r="4.4" fill="var(--c-neutral-200)" />
    </template>
    <circle v-else :cx="handleTop.x" :cy="handleTop.y" r="5.2" fill="var(--c-neutral-200)" />

    <!-- 拉力：两个小孩是两个成角度的力（沿各自手臂），大人是一个竖直向上的力（沿下垂的手臂） -->
    <template v-if="variant === 'kids'">
      <CourseArrow
        v-for="arrow in kidsArrows"
        :key="arrow.stroke"
        :from="handleTop"
        :to="arrow.to"
        :stroke="arrow.stroke"
        stroke-width="3.4"
        pointer-events="none"
      />
    </template>
    <CourseArrow v-else :from="handleTop" :to="{ x: handleTop.x, y: 66 }" stroke="var(--c-physics)" stroke-width="3.6" pointer-events="none" />
  </svg>
</template>
