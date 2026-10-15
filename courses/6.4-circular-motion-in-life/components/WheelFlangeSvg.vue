<script setup lang="ts">
/**
 * 内外轨等高时的火车转弯（俯视）—— 6.4 生活中的圆周运动·第 3 页
 *
 * 画的是什么：弯道圆心在画布左侧（画外），两条同心圆弧是外轨（外侧、半径大）与内轨（内侧、半径小）； 两轨等高，之间铺枕木，一列火车横跨两轨。转弯时车轮的轮缘（车轮内侧伸出的凸缘）顶在外轨的内侧面上， 外轨对轮缘的弹力 F_N 沿半径指向圆心，是火车转弯向心力的主要来源。 `showForces`
 * 打开后再补上轮缘、接触点、弹力 F_N 与"轮缘挤压外轨"的标注（`visibility` 占位，不顶跑已出现的内容）。 弹力按课程规范从车厢几何中心起画、沿半径指向圆心。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：轮缘、接触点、弹力 F_N 与说明标注 */
  showForces?: boolean;
}>();

/**
 * 角度 → 弧度
 *
 * @param deg 角度（°）
 * @returns 弧度
 */
const rad = (deg: number): number => (deg * Math.PI) / 180;

/* ── 弯道几何：圆心 C 在画布左侧画外，两轨是同心圆弧 ── */
/** 弯道圆心（在画布外，所以只画圆弧、不画圆心） */
const C = { x: -60, y: 160 };
/** 圆弧半张角（°）：轨道只画出弯道的一小段 */
const HALF_ANGLE = 17;
/** 外轨中心线半径（外侧轨道，半径大） */
const R_OUT = 324;
/** 轨距：两轨中心线的间距 */
const GAUGE = 56;
/** 内轨中心线半径 */
const R_IN = R_OUT - GAUGE;
/** 钢轨带宽（示意夸张一点，才看得清轮缘与外轨内侧面接触） */
const RAIL_W = 16;
/** 枕木在钢轨两侧各伸出的长度 */
const SLEEPER_EXT = 12;
/** 枕木根数（沿弧均匀分布） */
const SLEEPER_COUNT = 9;

/**
 * 以弯道圆心为极点取点
 *
 * @param radius 到圆心的距离
 * @param deg 极角（°，0° 指向右、正值向下）
 * @returns 画布坐标
 */
const polar = (radius: number, deg: number): { x: number; y: number } => ({
  x: C.x + radius * Math.cos(rad(deg)),
  y: C.y + radius * Math.sin(rad(deg)),
});

/**
 * 以弯道圆心为心的圆弧路径
 *
 * @param radius 圆弧半径
 * @param from 起始极角（°）
 * @param to 终止极角（°）
 * @param steps 分段数
 * @returns SVG 路径的 d 属性
 */
const arcPath = (radius: number, from: number, to: number, steps = 36): string =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const point = polar(radius, from + ((to - from) * i) / steps);

    return `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }).join(" ");

/**
 * 以任意一点为心的圆弧路径（画轮缘用）
 *
 * @param center 圆心
 * @param radius 半径
 * @param from 起始极角（°）
 * @param to 终止极角（°）
 * @returns SVG 路径的 d 属性
 */
const arcAround = (center: { x: number; y: number }, radius: number, from: number, to: number): string => {
  const steps = 16;

  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = rad(from + ((to - from) * i) / steps);

    return `${i === 0 ? "M" : "L"} ${(center.x + radius * Math.cos(a)).toFixed(1)} ${(center.y + radius * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
};

const outerPath = arcPath(R_OUT, -HALF_ANGLE, HALF_ANGLE);
const innerPath = arcPath(R_IN, -HALF_ANGLE, HALF_ANGLE);

/** 枕木：沿半径方向跨在两轨之间、两端各伸出一截（浅色、画在钢轨下面） */
const sleepers = Array.from({ length: SLEEPER_COUNT }, (_, i) => {
  const deg = -HALF_ANGLE + (2 * HALF_ANGLE * i) / (SLEEPER_COUNT - 1);

  return { from: polar(R_IN - SLEEPER_EXT, deg), to: polar(R_OUT + SLEEPER_EXT, deg) };
});

/* ── 车厢：横跨两轨；车身沿该处轨道的切线方向，俯视看是竖向的长圆角矩形 ── */
const CAR = { x: C.x + (R_OUT + R_IN) / 2, y: C.y, halfLength: 69, halfWidth: 58 };

/* ── 车轮与轮缘：轮心沿半径向外偏移 SHIFT 后，轮缘顶尖正好顶住钢轨内侧面 ── */
/** 踏面（车轮外缘）半径 */
const R_TREAD = 11;
/** 轮缘半径：比踏面大出一圈，凸出的一圈就是"轮缘" */
const R_FLANGE = 16;
/** 轮心相对钢轨中心线向外偏移的量：偏移后轮缘顶尖恰好落在钢轨朝向两轨中间的侧面上 */
const SHIFT = R_FLANGE - RAIL_W / 2;
/** 前后两个轮对所在的极角（°）；轮轴沿半径方向，两个车轮分别压在两轨上 */
const AXLE_ANGLE = 9.5;
/** 轮缘弧覆盖的角度范围（以"朝向两轨中间"的方向为中心向两侧展开） */
const FLANGE_SPAN = 58;

/** 四个车轮：前后各一个轮对；每个轮对的外侧轮压在外轨、内侧轮压在内轨，轮缘都朝向两轨中间 */
const wheels = [-AXLE_ANGLE, AXLE_ANGLE].flatMap((deg) => {
  const outer = polar(R_OUT + SHIFT, deg);
  const inner = polar(R_IN - SHIFT, deg);

  return [
    {
      key: `outer-${deg}`,
      center: outer,
      outer: true,
      flange: arcAround(outer, R_FLANGE, deg + 180 - FLANGE_SPAN, deg + 180 + FLANGE_SPAN),
    },
    {
      key: `inner-${deg}`,
      center: inner,
      outer: false,
      flange: arcAround(inner, R_FLANGE, deg - FLANGE_SPAN, deg + FLANGE_SPAN),
    },
  ];
});

/** 两个轮对的轮轴：连接同一轮对的两个车轮 */
const axles = [-AXLE_ANGLE, AXLE_ANGLE].map((deg) => ({
  key: `axle-${deg}`,
  from: polar(R_IN - SHIFT, deg),
  to: polar(R_OUT + SHIFT, deg),
}));

/** 接触点：外侧前轮的轮缘顶尖，正好落在外轨内侧面上 */
const contact = polar(R_OUT - RAIL_W / 2, -AXLE_ANGLE);
/** 弹力作用在车厢上：按规范从车厢的几何中心起画、沿半径指向圆心 */
const CART_CENTER = { x: CAR.x, y: CAR.y };
const F_N_LEN = 140;
const fnTip = { x: CART_CENTER.x - F_N_LEN, y: CART_CENTER.y };

/* ── 标注位置：都摆在图形之外，不与轨道、车身重叠 ── */
/** 外轨标注（贴在外轨端部外侧） */
const outerRailLabel = { x: 276, y: 62 };
/** 内轨标注（贴在内轨端部外侧） */
const innerRailLabel = { x: 182, y: 80 };
/** 车（写在车厢里、弹力箭头之上） */
const carLabel = { x: CAR.x, y: 118 };
/** 弹力符号 F_N（跟在箭头尖端下方）：下标紧贴 F，不散开 */
const forceLabel = { x: 90, y: 194 };
/** 说明文字 */
const caption = { x: 100, y: 104 };
</script>

<template>
  <div>
    <svg
      viewBox="38 40 276 230"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="内外轨等高时火车转弯：外侧车轮的轮缘挤压外轨，外轨对轮缘的弹力沿半径指向圆心"
    >
      <defs>
        <linearGradient id="wheel-flange-car" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="color-mix(in srgb, var(--c-velocity) 26%, transparent)" />
          <stop offset="1" stop-color="color-mix(in srgb, var(--c-accent-2) 9%, transparent)" />
        </linearGradient>
      </defs>
      <!-- 枕木 -->
      <g stroke="color-mix(in srgb, var(--c-text-dim) 34%, transparent)" stroke-width="6" stroke-linecap="round">
        <line v-for="(sleeper, i) in sleepers" :key="`sleeper-${i}`" :x1="sleeper.from.x" :y1="sleeper.from.y" :x2="sleeper.to.x" :y2="sleeper.to.y" />
      </g>
      <!-- 内轨与外轨：深色轨腰 + 浅色轨面（外轨更亮，是要被挤压的那条） -->
      <path :d="innerPath" fill="none" stroke="color-mix(in srgb, var(--c-neutral-500) 55%, transparent)" :stroke-width="RAIL_W" stroke-linecap="round" />
      <path :d="outerPath" fill="none" stroke="color-mix(in srgb, var(--c-neutral-500) 55%, transparent)" :stroke-width="RAIL_W" stroke-linecap="round" />
      <path :d="innerPath" fill="none" stroke="var(--c-text-dim)" stroke-width="7" stroke-linecap="round" />
      <path :d="outerPath" fill="none" stroke="var(--c-neutral-300)" stroke-width="7" stroke-linecap="round" />
      <!-- 前后两个轮对：轮轴 + 四个车轮；轮缘点击后才画出来 -->
      <g stroke="var(--c-neutral-500)" stroke-width="3" stroke-linecap="round">
        <line v-for="axle in axles" :key="axle.key" :x1="axle.from.x" :y1="axle.from.y" :x2="axle.to.x" :y2="axle.to.y" />
      </g>
      <g v-for="wheel in wheels" :key="wheel.key">
        <circle :cx="wheel.center.x" :cy="wheel.center.y" :r="R_TREAD" fill="var(--c-neutral-700)" :stroke="wheel.outer ? '#cbd5e1' : '#94a3b8'" stroke-width="2.2" />
        <path :class="{ 'turn-hidden': !showForces }" :d="wheel.flange" fill="none" stroke="var(--c-accent)" stroke-width="4.6" stroke-linecap="round" />
      </g>
      <!-- 车厢：半透明，能透出下面的车轮与轨道 -->
      <rect
        :x="CAR.x - CAR.halfWidth"
        :y="CAR.y - CAR.halfLength"
        :width="CAR.halfWidth * 2"
        :height="CAR.halfLength * 2"
        rx="18"
        fill="url(#wheel-flange-car)"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
      />
      <text :x="carLabel.x" :y="carLabel.y" text-anchor="middle" font-size="16" fill="var(--c-velocity-light)">车</text>
      <!-- 接触点与弹力：外轨对轮缘的弹力沿半径指向圆心 -->
      <g :class="{ 'turn-hidden': !showForces }">
        <circle :cx="contact.x" :cy="contact.y" r="3.6" fill="var(--c-accent)" />
        <CourseArrow :from="CART_CENTER" :to="fnTip" stroke="var(--c-accent)" :stroke-width="3.4" />
        <text :x="forceLabel.x" :y="forceLabel.y" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="var(--c-accent)">F</text>
        <text :x="forceLabel.x + 13" :y="forceLabel.y + 7" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-accent)">N</text>
        <text :x="caption.x" :y="caption.y" text-anchor="middle" font-size="16" fill="var(--c-accent)">轮缘挤压外轨</text>
      </g>
      <!-- 两轨标注：颜色与各自的钢轨一致 -->
      <text :x="outerRailLabel.x" :y="outerRailLabel.y" font-size="16" fill="var(--c-neutral-300)">外轨</text>
      <text :x="innerRailLabel.x" :y="innerRailLabel.y" text-anchor="end" font-size="16" fill="var(--c-text-dim)">内轨</text>
    </svg>
  </div>
</template>

<style scoped>
.turn-hidden {
  visibility: hidden;
}
</style>
