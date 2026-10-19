<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

// 第 12 页：电场线是有方向的曲线，曲线上每一点的切线方向就是该点的电场强度方向。
//
// 形态说明（2026-10 按 `.agents/notes/interactive-necessity.md` 自查后降级）：
//   原来是"滑块让 P 沿场线连续滑动"——自查三问：① 本页只要定性（不显示数值）；
//   ② "切线方向 = 场强方向"是**定义性**结论、在任何位置都成立，不存在"调参数才看得到"的变化规律；
//   ③ 教材图 9.3-6 本身就是"静态曲线 + P 点切线"。故去掉滑块，改为**两个预设位置**：
//   靠正电荷处（切线陡）→ 曲线拱顶（切线平）。
//   ⚠️ 降级 ≠ 静态化（复核员提醒）：点击进入下一位置时，P 沿**真实场线按弧长逐帧插值滑动**，
//   切线方向每帧重算 ⇒ 观感是"P 在动、切线在转"，而不是"换了两张图"。
//   （不用 CSS transition：SVG 的 x/y 是表现属性、不是可过渡的 CSS 属性；且线性插值会让 P 离开曲线。）
//
// 物理不变：曲线仍是**真实场线**，由 E = E1 + E2（Ei = kQi/ri²，只取方向 Q1 = +1、Q2 = −1）
// 用中点法沿 dl ∥ E 逐步推进得到；切线方向取相邻两点差分（等价于该点的合成场强方向）。
// 本页是定性页：屏幕上不出任何数值、不出 dl、不出积分号。
const { showArrows, showTangent, showDensity } = defineProps<{
  showArrows?: boolean;
  showTangent?: boolean;
  showDensity?: boolean;
}>();

interface Pt {
  x: number;
  y: number;
}

const Q1 = { x: 360, y: 85 };
const Q2 = { x: 540, y: 85 };

/** 合成场强方向（只取方向，电荷量取 ±1） */
function fieldDir(x: number, y: number): Pt {
  const dx1 = x - Q1.x;
  const dy1 = y - Q1.y;
  const r1 = Math.max(6, Math.hypot(dx1, dy1));
  const dx2 = x - Q2.x;
  const dy2 = y - Q2.y;
  const r2 = Math.max(6, Math.hypot(dx2, dy2));
  // Q1 正：E1 由 Q1 向外；Q2 负：E2 指向 Q2
  const e1 = 1 / (r1 * r1);
  const e2 = 1 / (r2 * r2);
  return {
    x: (e1 * dx1) / r1 - (e2 * dx2) / r2,
    y: (e1 * dy1) / r1 - (e2 * dy2) / r2,
  };
}

/** 从某点出发沿场线推进；direction = 1 顺场强方向、-1 逆场强方向 */
function trace(start: Pt, angleDeg: number, direction: 1 | -1): Pt[] {
  const a = (angleDeg * Math.PI) / 180;
  let x = start.x + Math.cos(a) * 13;
  let y = start.y + Math.sin(a) * 13;
  const STEP = 3;
  const points: Pt[] = [{ x, y }];
  for (let i = 0; i < 420; i += 1) {
    const k1 = fieldDir(x, y);
    const n1 = Math.hypot(k1.x, k1.y) || 1;
    const mx = x + ((direction * k1.x) / n1) * (STEP / 2);
    const my = y + ((direction * k1.y) / n1) * (STEP / 2);
    const k2 = fieldDir(mx, my);
    const n2 = Math.hypot(k2.x, k2.y) || 1;
    x += ((direction * k2.x) / n2) * STEP;
    y += ((direction * k2.y) / n2) * STEP;
    points.push({ x, y });
    if (x < -60 || x > 940 || y < -60 || y > 230) break;
    if (Math.hypot(x - Q2.x, y - Q2.y) < 13) {
      points.push({ x: Q2.x, y: Q2.y });
      break;
    }
    if (Math.hypot(x - Q1.x, y - Q1.y) < 13) {
      points.push({ x: Q1.x, y: Q1.y });
      break;
    }
  }
  return points;
}

function toPath(points: Pt[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

// 固定 polylines：正电荷出发 8 条、负电荷反向追踪 5 条、加密用 8 条（挂载时一次算好、之后冻结）
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const DENSE_ANGLES = [22, 67, 112, 157, 202, 247, 292, 337];
const BACK_ANGLES = [120, 150, 180, 210, 240];

const BASE_CURVES = [
  ...ANGLES.map((a) => trace(Q1, a, 1)),
  ...BACK_ANGLES.map((a) => trace(Q2, a, -1)),
];
const DENSE_CURVES = DENSE_ANGLES.map((a) => trace(Q1, a, 1));

const BASE_PATHS = BASE_CURVES.map(toPath);
const DENSE_PATHS = DENSE_CURVES.map(toPath);

/** 曲线上画方向箭头的位置（约在曲线 55% 处）与方向（相邻两点差分） */
function midArrow(points: Pt[]) {
  const idx = Math.max(1, Math.min(points.length - 2, Math.round(points.length * 0.55)));
  const a = points[idx - 1];
  const b = points[idx + 1] ?? points[idx];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const start = points[idx];
  return {
    from: { x: start.x - (dx / len) * 13, y: start.y - (dy / len) * 13 },
    to: { x: start.x + (dx / len) * 13, y: start.y + (dy / len) * 13 },
  };
}
const BASE_ARROWS = BASE_CURVES.filter((c) => c.length > 6).map(midArrow);

// P 走的那条：从正电荷 45° 出发的弯曲线（靠电荷处切线陡、拱顶处切线平）
const MAIN = BASE_CURVES[1];
const CUM: number[] = [0];
for (let i = 1; i < MAIN.length; i += 1)
  CUM.push(CUM[i - 1] + Math.hypot(MAIN[i].x - MAIN[i - 1].x, MAIN[i].y - MAIN[i - 1].y));

const TOTAL = CUM[CUM.length - 1] || 1;

const RATIO_NEAR = 0.16; // 靠正电荷：切线陡、场线密
const RATIO_ARCH = 0.62; // 曲线拱顶：切线平、场线疏

/** 按弧长比例取点，并给出该点切线方向（相邻两点差分 = 该点合成场强方向） */
function pickedAt(ratio: number) {
  const target = ratio * TOTAL;
  let i = 1;
  while (i < CUM.length - 1 && CUM[i] < target) i += 1;
  const span = Math.max(1e-6, CUM[i] - CUM[i - 1]);
  const t = Math.min(1, Math.max(0, (target - CUM[i - 1]) / span));
  const a = MAIN[i - 1];
  const b = MAIN[i];
  const prev = MAIN[Math.max(0, i - 2)];
  const next = MAIN[Math.min(MAIN.length - 1, i + 1)];
  const dx = next.x - prev.x;
  const dy = next.y - prev.y;
  const len = Math.hypot(dx, dy) || 1;
  const point = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  const dir = { x: dx / len, y: dy / len };
  return {
    point,
    tanStart: { x: point.x - dir.x * 60, y: point.y - dir.y * 60 },
    tanEnd: { x: point.x + dir.x * 60, y: point.y + dir.y * 60 },
    eEnd: { x: point.x + dir.x * 42, y: point.y + dir.y * 42 },
  };
}

// 沿弧长的逐帧滑动：从"靠正电荷"滑到"拱顶"（切线随位置连续转），不是换图
const ratio = ref(RATIO_NEAR);
const picked = computed(() => pickedAt(ratio.value));

let rafId = 0;
function slideTo(target: number): void {
  const start = ratio.value;
  const t0 = performance.now();
  const DURATION = 760;
  cancelAnimationFrame(rafId);
  const frame = (now: number) => {
    const p = Math.min(1, (now - t0) / DURATION);
    // ease-in-out：起止平缓、中间快，看起来像"顺着场线滑过去"
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    ratio.value = start + (target - start) * e;
    if (p < 1) rafId = requestAnimationFrame(frame);
  };
  rafId = requestAnimationFrame(frame);
}

// 第 3 击（疏密对照）时滑到拱顶：位置变、切线方向随之变，同时场线加密
watch(
  () => showDensity,
  (value) => slideTo(value ? RATIO_ARCH : RATIO_NEAR),
);

onBeforeUnmount(() => cancelAnimationFrame(rafId));
</script>

<template>
  <div class="flt">
    <svg viewBox="0 0 880 170" class="flt-fig">
      <path
        v-for="(d, i) in BASE_PATHS"
        :key="`b${i}`"
        :d="d"
        fill="none"
        stroke="var(--c-field)"
        stroke-width="1.8"
      />
      <g :style="{ visibility: showDensity ? 'visible' : 'hidden' }">
        <path
          v-for="(d, i) in DENSE_PATHS"
          :key="`x${i}`"
          :d="d"
          fill="none"
          stroke="var(--c-field)"
          stroke-width="1.4"
        />
      </g>
      <g :style="{ visibility: showArrows ? 'visible' : 'hidden' }">
        <CourseArrow
          v-for="(arrow, i) in BASE_ARROWS"
          :key="`a${i}`"
          :from="arrow.from"
          :to="arrow.to"
          stroke="var(--c-field)"
          :stroke-width="2.2"
        />
      </g>
      <g :style="{ visibility: showTangent ? 'visible' : 'hidden' }">
        <line
          :x1="picked.tanStart.x"
          :y1="picked.tanStart.y"
          :x2="picked.tanEnd.x"
          :y2="picked.tanEnd.y"
          stroke="var(--c-border)"
          stroke-opacity="0.9"
          stroke-width="1.5"
          stroke-dasharray="6 5"
        />
        <circle :cx="picked.point.x" :cy="picked.point.y" r="6" fill="var(--c-accent)" />
        <CourseArrow
          :from="picked.point"
          :to="picked.eEnd"
          stroke="var(--c-force)"
          :stroke-width="3.2"
        />
        <text
          :x="picked.eEnd.x + 9"
          :y="picked.eEnd.y + 4"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-force)"
        >
          E
        </text>
        <text
          :x="picked.point.x - 5"
          :y="picked.point.y - 15"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-accent)"
        >
          P
        </text>
      </g>
      <circle :cx="Q1.x" :cy="Q1.y" r="15" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="Q1.x"
        :y="Q1.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="15"
        fill="#fff"
      >
        +
      </text>
      <circle :cx="Q2.x" :cy="Q2.y" r="15" fill="var(--c-velocity)" fill-opacity="0.9" />
      <text
        :x="Q2.x"
        :y="Q2.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="15"
        fill="#fff"
      >
        −
      </text>
    </svg>
  </div>
</template>

<style scoped>
.flt {
  width: 100%;
}

.flt-fig {
  width: 100%;
  height: 172px;
}
</style>
