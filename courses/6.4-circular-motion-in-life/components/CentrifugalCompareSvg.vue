<script setup lang="ts">
/**
 * 实际受力与所需向心力的大小关系 —— 三态轨迹对比（6.4 生活中的圆周运动） 同一起点、同一初速度（都沿切线方向），只改变"指向圆心的实际力"与所需向心力 m v²/r 的比值 λ，用数值积分画出三段真实轨迹： λ = 1 → 圆周运动；λ < 1 → 逐渐远离圆心（离心）；λ > 1 → 逐渐靠近圆心。
 * 三段轨迹由同一套真实运动方程积分得到（起点、初速度、积分步数都相同）， 位置差异只来自 λ，不是随手画的装饰弧线。
 */
/** 起点半径、初速度、积分步长（无量纲） */
const R0 = 88;
const V0 = 1;
const DT = 0.5;
/** 三段轨迹积分同样步数 ⇒ 经过相同时长，便于横向比较 */
const STEPS = 700;
/** 绘图放大系数：图内文字因此相对变小，圆心空档里才放得下完整图例 */
const K = 1.5;
/** 圆心在 viewBox 中的位置（由图形范围 + 约 16 的边距定出：整幅图形左右居中，虚线参考圆不被画布切掉） */
const CX = 148.5;
const CY = 168;
/** 起点半径（viewBox 单位） */
const R = R0 * K;

// 按比值 λ 数值积分一条轨迹，返回映射到 viewBox 之后、可直接用的 SVG path
const trajectory = (lambda: number): string => {
  const a0 = (lambda * V0 * V0) / R0;
  let p = { x: 0, y: -R0 };
  let v = { x: V0, y: 0 };
  const points = [p];

  let prevR = R0;
  let prevDr = 0;

  for (let i = 0; i < STEPS; i++) {
    const r = Math.hypot(p.x, p.y);
    const ax = (-a0 * p.x) / r;
    const ay = (-a0 * p.y) / r;

    v = { x: v.x + ax * DT, y: v.y + ay * DT };
    p = { x: p.x + v.x * DT, y: p.y + v.y * DT };
    points.push(p);

    // 画到"首次径向折返"为止：力偏小时停在最远处、力偏大时停在最近处，
    // 于是轨迹单调地向外张 / 向内收，与"逐渐远离 / 靠近圆心"的说法一致。
    const rr = Math.hypot(p.x, p.y);
    const dr = rr - prevR;
    prevR = rr;

    if (i > 5 && Math.abs(dr) > 0.004) {
      if (prevDr !== 0 && Math.sign(dr) !== Math.sign(prevDr)) break;
      prevDr = dr;
    }
  }

  return points.map((pt, i) => `${i === 0 ? "M" : "L"} ${(CX + pt.x * K).toFixed(1)} ${(CY + pt.y * K).toFixed(1)}`).join(" ");
};

const cases = [
  { key: "circle", color: "#60a5fa", path: trajectory(1), note: "力恰好 → 圆周" },
  { key: "outward", color: "#e2a846", path: trajectory(0.62), note: "力偏小 → 远离" },
  { key: "inward", color: "#2dd4bf", path: trajectory(1.5), note: "力偏大 → 靠近" },
];

/** 三条轨迹的公共起点（圆最高点） */
const start = { x: CX, y: CY - R };
/** 初速度沿切线：起点处水平向右 */
const vTip = { x: CX + 56 * K, y: CY - R };
/** 图例（摆在圆心空档里）：色条 + 说明，颜色与曲线一一对应 */
const legend = { x: CX - 76, swatch: 22, textX: CX - 46, firstY: CY - 86, gap: 26 };
</script>

<template>
  <div class="centri-compare">
    <svg
      viewBox="0 0 346 336"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="同一起点、同一初速度下，实际受力小于、等于、大于所需向心力时，三段轨迹分别向外张开、沿圆周、向内收拢"
    >
      <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="#94a3b8" stroke-width="2.2" stroke-dasharray="9 9" opacity="0.45" />

      <path
        v-for="item in cases"
        :key="item.key"
        :d="item.path"
        fill="none"
        :stroke="item.color"
        stroke-width="5.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <circle :cx="CX" :cy="CY" r="8" fill="#94a3b8" />
      <text :x="CX - 18" :y="CY + 12" font-family="KaTeX_Main" font-size="18" fill="#94a3b8" text-anchor="middle">O</text>

      <circle :cx="start.x" :cy="start.y" r="9.6" fill="#f1f5f9" stroke="#0f1425" stroke-width="3" />
      <CourseArrow :from="start" :to="vTip" stroke="#60a5fa" :stroke-width="5.1" label="v" :label-dx="55" :label-dy="-6" />

      <g v-for="(item, i) in cases" :key="item.key">
        <line
          :x1="legend.x"
          :y1="legend.firstY + i * legend.gap"
          :x2="legend.x + legend.swatch"
          :y2="legend.firstY + i * legend.gap"
          :stroke="item.color"
          stroke-width="4.5"
          stroke-linecap="round"
        />
        <text :x="legend.textX" :y="legend.firstY + 6 + i * legend.gap" font-size="16" :fill="item.color">{{ item.note }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.centri-compare {
  min-width: 0;
}

.centri-compare svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
