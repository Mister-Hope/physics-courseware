<script setup lang="ts">
// 用于第 8 页（观察钢球的运动轨迹）：水平桌面上的钢球沿直线前进，
// 点击切换磁铁的位置（正前方 / 侧旁 / 斜后方），看钢球的轨迹怎么变。
// 示意约定：把磁铁对钢球的力当作恒力（大小、方向都不变），轨迹是抛物线；
// 只作定性说明 —— 力与速度共线时轨迹仍是直线，不共线时轨迹变弯。不做数值积分、不上屏数值。
import { computed, ref, useId } from "vue";

interface Point {
  x: number;
  y: number;
}
type CaseKey = "front" | "side" | "behind";

const uid = useId();

/** 钢球开始受磁铁力的位置 */
const origin: Point = { x: 290, y: 162 };
/** 初速度大小（用户单位/秒） */
const SPEED = 155;
/** 加速度大小（用户单位/秒²），只是让弯曲看得清楚 */
const ACC = 290;
/** 画轨迹的取样时长上限（秒） */
const T_MAX = 1.65;

const CASES: { key: CaseKey; label: string; magnet: Point }[] = [
  { key: "front", label: "磁铁放正前方", magnet: { x: 720, y: 162 } },
  { key: "side", label: "磁铁放侧旁", magnet: { x: 470, y: 54 } },
  { key: "behind", label: "磁铁放斜后方", magnet: { x: 148, y: 248 } },
];

const active = ref<CaseKey>("side");

const current = computed(() => CASES.find((item) => item.key === active.value) ?? CASES[1]);

/** 力的方向：指向磁铁 */
const dir = computed<Point>(() => {
  const m = current.value.magnet;
  const dx = m.x - origin.x;
  const dy = m.y - origin.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
});

const acc = computed<Point>(() => ({ x: dir.value.x * ACC, y: dir.value.y * ACC }));

/** 轨迹上的点（恒力下的匀变速运动：r = r₀ + v₀t + ½at²） */
const samples = computed(() => {
  const a = acc.value;
  const m = current.value.magnet;
  const pts: Point[] = [];
  for (let i = 0; i <= 96; i += 1) {
    const t = (i / 96) * T_MAX;
    const point = {
      x: origin.x + SPEED * t + 0.5 * a.x * t * t,
      y: origin.y + 0.5 * a.y * t * t,
    };
    // 钢球被磁铁吸住：走到磁铁极面跟前就停下（正面撞上去）
    if (Math.hypot(point.x - m.x, point.y - m.y) < 46) {
      pts.push(point);
      break;
    }
    if (point.x > 844 || point.y > 276 || point.x < 34 || point.y < 24) break;
    pts.push(point);
  }
  return pts;
});

/** 轨迹上离磁铁最近的点 —— 磁铁的极面朝它摆 */
const nearest = computed(() => {
  const m = current.value.magnet;
  let best: Point = samples.value[0] ?? origin;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const point of samples.value) {
    const dist = Math.hypot(point.x - m.x, point.y - m.y);
    if (dist < bestDist) {
      bestDist = dist;
      best = point;
    }
  }
  return best;
});

/** 磁铁长轴指向轨迹最近点（0° = 长轴水平向右） */
const magnetAngle = computed(() => {
  const m = current.value.magnet;
  const nearestPoint = nearest.value;
  return (Math.atan2(nearestPoint.y - m.y, nearestPoint.x - m.x) * 180) / Math.PI;
});

/** 磁铁 N/S 极文字中心（反向抵消旋转，让 N、S 始终正立易读） */
const magnetPoles = computed(() => {
  const m = current.value.magnet;
  const rad = (magnetAngle.value * Math.PI) / 180;
  const offset = 18;
  return {
    north: { x: m.x + offset * Math.cos(rad), y: m.y + offset * Math.sin(rad) },
    south: { x: m.x - offset * Math.cos(rad), y: m.y - offset * Math.sin(rad) },
  };
});

/** 磁铁文字标签位置（动态避开条形磁铁本体与轨迹） */
const magnetLabelPos = computed(() => {
  const m = current.value.magnet;
  if (active.value === "front") return { x: m.x, y: m.y - 30, anchor: "middle" as const };

  if (active.value === "side") return { x: m.x + 48, y: m.y + 4, anchor: "start" as const };

  return { x: m.x - 46, y: m.y + 6, anchor: "end" as const };
});

const trackPath = computed(() =>
  samples.value
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" "),
);

/**
 * 轨迹上取一个代表点，画这一刻的速度 v 与它受的力 F：
 *
 * - 正前方 (front) 时 v 与 F 同向共线：将两支箭头的起点在竖直方向微错开 ±4.5px、 长度一长一短（v=114, F=76），且标签一上一下（v 在上方，F
 *   在下方），彻底杜绝重叠！
 * - 侧旁 (side) 时取 t = 0.44：此时切线 v 与指向磁铁的力 F 夹角分明， 且 F 标签置于左上方（磁铁侧）、v 标签置于右下方（轨迹外凸侧），互不遮挡。
 */
const probe = computed(() => {
  const t = active.value === "side" ? 0.44 : active.value === "front" ? 0.56 : 0.58;
  const a = acc.value;
  const point = {
    x: origin.x + SPEED * t + 0.5 * a.x * t * t,
    y: origin.y + 0.5 * a.y * t * t,
  };
  const v = { x: SPEED + a.x * t, y: a.y * t };
  const vLen = Math.hypot(v.x, v.y) || 1;
  const ux = v.x / vLen;
  const uy = v.y / vLen;

  if (active.value === "front") {
    const vFrom = { x: point.x, y: point.y - 4.5 };
    const vTip = { x: point.x + 116, y: point.y - 4.5 };
    const fFrom = { x: point.x, y: point.y + 4.5 };
    const fTip = { x: point.x + 76, y: point.y + 4.5 };
    return {
      point,
      vFrom,
      vTip,
      fFrom,
      fTip,
      vLabel: { x: point.x + 92, y: point.y - 20 },
      fLabel: { x: point.x + 56, y: point.y + 27 },
    };
  }

  const vTip = { x: point.x + ux * 102, y: point.y + uy * 102 };
  const fTip = { x: point.x + dir.value.x * 88, y: point.y + dir.value.y * 88 };

  if (active.value === "side") {
    return {
      point,
      vFrom: point,
      vTip,
      fFrom: point,
      fTip,
      // v 标签放在速度箭头右下方，F 标签放在力箭头左上方，分居夹角两侧
      vLabel: { x: vTip.x + 14, y: vTip.y + 12 },
      fLabel: { x: fTip.x - 18, y: fTip.y - 6 },
    };
  }

  return {
    point,
    vFrom: point,
    vTip,
    fFrom: point,
    fTip,
    vLabel: { x: vTip.x + 16, y: vTip.y - 8 },
    fLabel: { x: fTip.x - 16, y: fTip.y + 14 },
  };
});

const endBall = computed(() => samples.value[samples.value.length - 1] ?? origin);
</script>

<template>
  <div class="ssm">
    <div class="ssm-bar">
      <button
        v-for="item in CASES"
        :key="item.key"
        class="ssm-btn"
        :class="{ 'ssm-btn-on': item.key === active }"
        type="button"
        @click="active = item.key"
      >
        {{ item.label }}
      </button>
    </div>
    <svg viewBox="0 0 880 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 3D 轴承钢球径向金属光泽渐变 -->
        <radialGradient :id="`sbmBall-${uid}`" cx="34%" cy="30%" r="68%" fx="30%" fy="26%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="22%" stop-color="#e2e8f0" />
          <stop offset="56%" stop-color="#94a3b8" />
          <stop offset="84%" stop-color="#475569" />
          <stop offset="100%" stop-color="#1e293b" />
        </radialGradient>

        <!-- 条形磁铁 N 极（红）与 S 极（蓝）立体渐变 -->
        <linearGradient :id="`sbmMagN-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f87171" />
          <stop offset="50%" stop-color="#ef4444" />
          <stop offset="100%" stop-color="#b91c1c" />
        </linearGradient>
        <linearGradient :id="`sbmMagS-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa" />
          <stop offset="50%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>

      <!-- 水平桌面（俯视）背景板 -->
      <rect
        x="18"
        y="14"
        width="844"
        height="272"
        rx="18"
        fill="rgba(148,163,184,0.06)"
        stroke="rgba(148,163,184,0.25)"
        stroke-width="2"
      />
      <text x="40" y="44" font-family="KaTeX_Main, sans-serif" font-size="19" fill="#94a3b8">
        水平桌面（俯视）
      </text>

      <!-- 若不受磁力时的原直线方向延伸虚线（在侧旁/斜后方时对比偏折程度） -->
      <line
        v-if="active !== 'front'"
        :x1="origin.x"
        :y1="origin.y"
        x2="780"
        :y2="origin.y"
        stroke="#64748b"
        stroke-width="1.6"
        stroke-dasharray="5 6"
        opacity="0.38"
      />

      <!-- 入射段：原来沿直线前进 -->
      <line
        x1="68"
        :y1="origin.y"
        :x2="origin.x - 12"
        :y2="origin.y"
        stroke="#94a3b8"
        stroke-width="2.4"
        stroke-dasharray="8 7"
        opacity="0.78"
      />
      <text
        x="72"
        :y="origin.y - 16"
        font-family="KaTeX_Main, sans-serif"
        font-size="19"
        fill="#94a3b8"
      >
        原来沿直线前进
      </text>
      <CourseArrow
        :from="{ x: 194, y: origin.y }"
        :to="{ x: origin.x - 14, y: origin.y }"
        stroke="#94a3b8"
        stroke-width="2.4"
      />

      <!-- 钢球实际运动轨迹（青色发光实线） -->
      <path
        :d="trackPath"
        fill="none"
        stroke="rgba(45,212,191,0.22)"
        stroke-width="9"
        stroke-linecap="round"
      />
      <path :d="trackPath" fill="none" stroke="#2dd4bf" stroke-width="3.8" stroke-linecap="round" />

      <!-- 起点 origin 处的钢球虚影位 -->
      <circle
        :cx="origin.x"
        :cy="origin.y"
        r="12.5"
        fill="rgba(45,212,191,0.08)"
        stroke="#2dd4bf"
        stroke-width="2"
        stroke-dasharray="4 3"
      />
      <text
        :x="origin.x"
        :y="origin.y - 20"
        text-anchor="middle"
        font-family="KaTeX_Main, sans-serif"
        font-size="19"
        fill="#cbd5e1"
      >
        钢球
      </text>

      <!-- 一体化条形磁铁（外端圆角、中间红蓝交界处严丝合缝无凹陷，带 N/S 极与磁感线光晕） -->
      <g
        :transform="`translate(${current.magnet.x} ${current.magnet.y}) rotate(${magnetAngle.toFixed(1)})`"
      >
        <!-- 磁铁桌面投影 -->
        <rect x="-36" y="-15" width="76" height="36" rx="5" fill="rgba(2,6,23,0.45)" />

        <!-- 前端 N 极磁吸波纹弧（朝向轨迹最近点） -->
        <path
          d="M 42 -12 A 18 18 0 0 1 42 12"
          fill="none"
          stroke="rgba(248,113,113,0.45)"
          stroke-width="1.8"
          stroke-dasharray="3 3"
          stroke-linecap="round"
        />
        <path
          d="M 49 -17 A 25 25 0 0 1 49 17"
          fill="none"
          stroke="rgba(248,113,113,0.25)"
          stroke-width="1.5"
          stroke-dasharray="3 4"
          stroke-linecap="round"
        />

        <!-- 左半段 S 极（蓝色）：仅外侧左端圆角，中间 x=0 处完全平直 -->
        <path
          d="M 0 -18 L -32 -18 A 5 5 0 0 0 -37 -13 L -37 13 A 5 5 0 0 0 -32 18 L 0 18 Z"
          :fill="`url(#sbmMagS-${uid})`"
        />
        <!-- 右半段 N 极（红色，朝向钢球轨迹）：中间 x=0 处完全平直，仅外侧右端圆角 -->
        <path
          d="M 0 -18 L 32 -18 A 5 5 0 0 1 37 -13 L 37 13 A 5 5 0 0 1 32 18 L 0 18 Z"
          :fill="`url(#sbmMagN-${uid})`"
        />

        <!-- 顶面立体高光条 -->
        <rect x="-34" y="-15" width="68" height="4" rx="2" fill="rgba(255,255,255,0.22)" />

        <!-- 红蓝极性平直分界线 + 整体金属外框（无任何交界凹槽） -->
        <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(15,23,42,0.55)" stroke-width="1.5" />
        <rect
          x="-37"
          y="-18"
          width="74"
          height="36"
          rx="5"
          fill="none"
          stroke="#cbd5e1"
          stroke-width="1.8"
        />
      </g>

      <!-- 磁铁 N / S 极标识（始终保持正立，不随磁铁颠倒） -->
      <text
        :x="magnetPoles.south.x"
        :y="magnetPoles.south.y"
        font-family="KaTeX_Main, sans-serif"
        font-size="15"
        font-weight="700"
        fill="#f8fafc"
        text-anchor="middle"
        dominant-baseline="central"
      >
        S
      </text>
      <text
        :x="magnetPoles.north.x"
        :y="magnetPoles.north.y"
        font-family="KaTeX_Main, sans-serif"
        font-size="15"
        font-weight="700"
        fill="#f8fafc"
        text-anchor="middle"
        dominant-baseline="central"
      >
        N
      </text>

      <!-- 磁铁文字标签（置于磁铁外侧，绝不压住磁铁边缘） -->
      <text
        :x="magnetLabelPos.x"
        :y="magnetLabelPos.y"
        :text-anchor="magnetLabelPos.anchor"
        font-family="KaTeX_Main, sans-serif"
        font-size="20"
        font-weight="600"
        fill="#f1f5f9"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        磁铁
      </text>

      <!-- 速度 v 与磁力 F 矢量箭头（先画箭头，再盖上立体钢球与分侧标签） -->
      <CourseArrow :from="probe.vFrom" :to="probe.vTip" stroke="#60a5fa" stroke-width="3.5" />
      <CourseArrow :from="probe.fFrom" :to="probe.fTip" stroke="#e2a846" stroke-width="3.5" />

      <!-- 速度 v 与磁力 F 的独立防重叠标签 -->
      <text
        :x="probe.vLabel.x"
        :y="probe.vLabel.y"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        v
      </text>
      <text
        :x="probe.fLabel.x"
        :y="probe.fLabel.y"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        F
      </text>

      <!-- 探测点处的 3D 金属钢球 -->
      <g>
        <ellipse
          :cx="probe.point.x + 2"
          :cy="probe.point.y + 9"
          rx="10"
          ry="4"
          fill="rgba(2,6,23,0.45)"
        />
        <circle
          :cx="probe.point.x"
          :cy="probe.point.y"
          r="10.5"
          :fill="`url(#sbmBall-${uid})`"
          stroke="#475569"
          stroke-width="1.2"
        />
        <circle
          :cx="probe.point.x - 3.4"
          :cy="probe.point.y - 3.6"
          r="2.3"
          fill="#ffffff"
          opacity="0.9"
        />
      </g>

      <!-- 轨迹末端的 3D 金属钢球 -->
      <g>
        <ellipse :cx="endBall.x + 2" :cy="endBall.y + 9" rx="10" ry="4" fill="rgba(2,6,23,0.45)" />
        <circle
          :cx="endBall.x"
          :cy="endBall.y"
          r="10.5"
          :fill="`url(#sbmBall-${uid})`"
          stroke="#475569"
          stroke-width="1.2"
        />
        <circle :cx="endBall.x - 3.4" :cy="endBall.y - 3.6" r="2.3" fill="#ffffff" opacity="0.9" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ssm {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  width: 100%;
  min-width: 0;
}

.ssm-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.ssm-btn {
  padding: 0.35rem 0.95rem;
  border: 1px solid rgb(148 163 184 / 25%);
  border-radius: 999px;

  background: rgb(148 163 184 / 10%);
  color: var(--c-text-dim, #94a3b8);

  font-size: 0.92rem;

  cursor: pointer;

  transition: all 0.2s ease;
}

.ssm-btn-on {
  border-color: #e2a846;
  background: #e2a846;
  color: #0f1425;
  font-weight: 700;
}
</style>
