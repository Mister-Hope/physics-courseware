<!-- 用于第 17 页 / 教材图 5.1-1 的示意：弯道钢球从不同出口滚出，白纸印迹记录速度方向（俯视图） -->
<script setup lang="ts">
interface Point {
  x: number;
  y: number;
}

const rad = (deg: number): number => (deg * Math.PI) / 180;
const point = (x: number, y: number): Point => ({ x, y });
/**
 * 从 from 沿 deg 方向走 len（deg 为屏幕坐标下的角度：向右下为正）
 *
 * @param from 起点
 * @param deg 屏幕坐标下的方向角（度）
 * @param len 沿该方向走的长度
 * @returns 走到的终点
 */
const polar = (from: Point, deg: number, len: number): Point => point(from.x + len * Math.cos(rad(deg)), from.y + len * Math.sin(rad(deg)));

/**
 * 轨道中心线取样用的三次贝塞尔
 *
 * @param a 曲线起点（贝塞尔第一控制点）
 * @param b 起点侧控制点
 * @param control2 终点侧控制点
 * @param d 曲线终点（贝塞尔第四控制点）
 * @param t 曲线参数，0 为起点、1 为终点
 * @returns 参数 t 处的曲线点
 */
// 位置化的贝塞尔数学写法（四个控制点 + 参数按顺序给出），保留签名更贴合公式
// eslint-disable-next-line max-params
const bezier = (a: Point, b: Point, control2: Point, d: Point, t: number): Point => {
  const invT = 1 - t;
  return point(
    invT * invT * invT * a.x + 3 * invT * invT * t * b.x + 3 * invT * t * t * control2.x + t * t * t * d.x,
    invT * invT * invT * a.y + 3 * invT * invT * t * b.y + 3 * invT * t * t * control2.y + t * t * t * d.y,
  );
};
// 同上：位置化的贝塞尔采样写法，d 为终点、count 为取样段数
// eslint-disable-next-line max-params
const sampleBezier = (a: Point, b: Point, control2: Point, d: Point, count: number): Point[] =>
  Array.from({ length: count + 1 }, (_, i) => bezier(a, b, control2, d, i / count));
/**
 * 把中心线整体平移 side，得到一条与中心线等距的轨道边线
 *
 * @param pts 中心线的取样点序列
 * @param side 平移距离（正负号决定偏向哪一侧）
 * @returns 轨道边线的 SVG path 字符串
 */
const rail = (pts: Point[], side: number): string =>
  pts
    .map((centerPoint, i) => {
      const prev = pts[Math.max(i - 1, 0)];
      const next = pts[Math.min(i + 1, pts.length - 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const x = centerPoint.x + (side * dy) / len;
      const y = centerPoint.y - (side * dx) / len;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

/** 入口 C（左）、拆去一段后的出口 B、原轨道末端出口 A（右上） */
const C = point(110, 230);
const pointB = point(640, 205);
/** A 取 (710, 160)：两处出口的切线要求是 B 处 +20°、A 处 −35°， 若把 A 抬到 (700, 140)（弦的斜率 −47°），弦的方向比两端切线都陡， 任何曲线都只能在中间急折（装不出等距的两条边线）；把 A 略放低， 拆掉的那一段才是一条光滑的圆弧。 */
const pointA = point(710, 160);
/** 实线轨道 C → B：入口切线 −15°，出口切线 +20°（向右下） */
const solidA = C;
const solidB = polar(C, -15, 200);
const solidC = polar(pointB, 200, 220);
const solidD = pointB;
/** 被拆掉的一段（虚线）B → A：B 处切线 +20°，A 处切线 −35°（向右上） */
const cutA = pointB;
const cutB = polar(pointB, 20, 40);
const cutC = polar(pointA, 145, 24);
const cutD = pointA;

const RAIL_HALF = 7;
const solidCenter = sampleBezier(solidA, solidB, solidC, solidD, 90);
const cutCenter = sampleBezier(cutA, cutB, cutC, cutD, 48);
const solidOuter = rail(solidCenter, RAIL_HALF);
const solidInner = rail(solidCenter, -RAIL_HALF);
const cutOuter = rail(cutCenter, RAIL_HALF);
const cutInner = rail(cutCenter, -RAIL_HALF);

/** 白纸：铺在桌面右侧，两条印迹都落在纸上 */
const paper = { x: 554, y: 44, width: 320, height: 328 };
/** 印迹：从出口沿切线方向滚出的直线，末端是钢球，再接一小段方向箭头 */
const traceA = polar(pointA, -35, 150);
const arrowA = polar(traceA, -35, 28);
const traceB = polar(pointB, 20, 120);
const arrowB = polar(traceB, 20, 28);
/** 入口滚入方向（青色，画在入口外侧） */
const entryFrom = polar(C, 165, 46);
const entryTo = polar(C, -15, -5);
</script>

<template>
  <svg viewBox="0 0 880 400" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="弯道轨道不同出口处钢球速度方向的俯视示意图">
    <rect
      :x="paper.x"
      :y="paper.y"
      :width="paper.width"
      :height="paper.height"
      fill="rgba(148,163,184,0.08)"
      stroke="#94a3b8"
      stroke-width="2"
      stroke-dasharray="9 7"
      opacity="0.7"
    />
    <text :x="paper.x + paper.width - 54" :y="paper.y + paper.height - 20" font-family="KaTeX_Main" font-size="20" fill="#94a3b8" text-anchor="middle">
      白纸
    </text>
    <path :d="solidOuter" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path :d="solidInner" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path :d="cutOuter" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="7 6" opacity="0.45" stroke-linecap="round" stroke-linejoin="round" />
    <path :d="cutInner" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="7 6" opacity="0.45" stroke-linecap="round" stroke-linejoin="round" />
    <line :x1="pointA.x" :y1="pointA.y" :x2="traceA.x" :y2="traceA.y" stroke="#60a5fa" stroke-width="3.2" stroke-linecap="round" />
    <circle :cx="traceA.x" :cy="traceA.y" r="5" fill="#60a5fa" />
    <CourseArrow :from="traceA" :to="arrowA" stroke="#60a5fa" :stroke-width="3.2" />
    <line :x1="pointB.x" :y1="pointB.y" :x2="traceB.x" :y2="traceB.y" stroke="#60a5fa" stroke-width="3.2" stroke-linecap="round" />
    <circle :cx="traceB.x" :cy="traceB.y" r="5" fill="#60a5fa" />
    <CourseArrow :from="traceB" :to="arrowB" stroke="#60a5fa" :stroke-width="3.2" />
    <CourseArrow :from="entryFrom" :to="entryTo" stroke="#2dd4bf" :stroke-width="3.4" />
    <text x="692" y="138" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="#e2a846">A</text>
    <text x="596" y="234" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="#e2a846">B</text>
    <text x="66" y="204" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="#e2a846">C</text>
    <text x="304" y="230" font-family="KaTeX_Main" font-size="20" fill="#94a3b8" text-anchor="middle">弯道轨道</text>
    <text x="759" y="99" font-family="KaTeX_Main" font-size="20" fill="#60a5fa" text-anchor="middle">印迹</text>
    <text x="686" y="254" font-family="KaTeX_Main" font-size="20" fill="#60a5fa" text-anchor="middle">印迹</text>
  </svg>
</template>

<style scoped>
svg {
  display: block;
  height: auto;
}
</style>
