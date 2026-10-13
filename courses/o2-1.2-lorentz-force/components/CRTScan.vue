<!--
  显像管磁偏转（应用页，教材"电子束的磁偏转"）
  —— 电子枪射出电子束，偏转区加磁场后电子束弯曲，光点打在荧光屏不同位置：
     step0 无磁场 → 打屏中央 O；step1 B⊙ → 打上方 A；step2 B⊗ → 打下方 B；
     step3 扫描动画：偏转磁场的大小与方向周期性变化，光点上下扫过屏面。
  意图：把"F_洛 ⊥ v 只改变运动方向"落到真实装置；先让学生思考"打上方 A 需要什么磁场"，
         再逐步看到 ⊙/⊗ 的偏转，最后以扫描动画收尾（引下节课"电子在磁场中的轨迹"）。

  几何（本版重排）：
  · 显像管画成一条连续轮廓：细管颈 → 喇叭形过渡 → 平屏面（外轮廓 TUBE_PATH）。
  · 偏转区是喇叭段里的一块矩形区域（淡色底 + 虚线边框 + ⊙/⊗ 阵列），整块被
    clipPath 裁到管腔内——"不出管"由几何裁切保证，不靠把曲线掰弯。
  · 电子束 = 枪口 → 沿轴直线 → **磁场区内真正的圆弧** → 出射点切线方向的直线 → 屏面。
    区内圆弧半径 R_px 与真实半径 r = mv/(qB) 成正比；出磁场后不再受力，走切线，
    落点由"切线与屏面交点"自动算出（没有手摆的落点坐标）。
  · 磁场记号阵列的疏密 / 大小 / 透明度都由 |B|/B_peak 驱动：B 大 → 密，B 小 → 疏。
-->
<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const { step = 0 } = defineProps({
  step: { type: Number, default: 0 },
});

/* ═══════════ 1. 版面坐标（viewBox 920×372，管轴水平；屏幕坐标 y 向下） ═══════════ */
const C = 190; // 管轴 y
const GUN_TIP_X = 158; // 电子枪喷口 = 束流起点
const X_IN = 480; // 偏转磁场区**入射面**（x 坐标）
const X_OUT = 720; // 偏转磁场区**出射面**（电子在此离开磁场）
const SCREEN_X = 840; // 荧光屏着屏面
const A_Y = 90; // 屏上 A 点（相对管轴上偏 100）
const O_Y = 190; // 屏上 O 点（管轴上）
const B_Y = 290; // 屏上 B 点（相对管轴下偏 100）
const DEFLECT_PX = 100; // A/B 到管轴的距离（px）——用它反标定圆弧的像素半径
const TUBE_PATH = "M 46 160 L 424 160 L 860 50 L 860 330 L 424 220 L 46 220 Z";

/* ═══════════ 2. 真实物理量（半径、落点全部由此算出，禁止写死） ═══════════ */
const E_Q = 1.6e-19; // 电子电荷量 q（C）
const E_M = 9.11e-31; // 电子质量 m（kg）
const V = 3e6; // 电子速率 v（m/s）
const B_PEAK = 1e-3; // 打到 A/B 时偏转磁场的磁感应强度（T，≈1 mT）

/* ═══════════ 3. 圆弧几何（匀强磁场内 v ⊥ B 的匀速圆周运动） ═══════════
   物理链：入射时 v 沿 +x（管轴），F = qv×B ⊥ v ⇒ 圆心必在过入射点、垂直于轴的
   方向上（屏幕坐标里就是入射点正上方/正下方 R_px 处）⇒ 圆弧在入射点与管轴**相切**。
   · 入射点 P0 = (X_IN, C)
   · 圆心   O_c = (X_IN, C − dir·R_px)      dir = +1 向上偏 / −1 向下偏
   · 弧上点 P(θ) = (X_IN + R_px·sinθ, C − dir·R_px(1 − cosθ))
     出射面在 x = X_OUT ⇒ 出射角 θ = asin(D/R_px)，D = X_OUT − X_IN
   · 出射点 P1 = (X_OUT, C − dir·R_px(1 − cosθ))
   · 出射后不受力：沿 P1 处切线 T = (cosθ, −dir·sinθ) 匀速直线运动
     ⇒ 落点 tipY = C − dir·[R_px(1−cosθ) + (SCREEN_X − X_OUT)·tanθ]

   方向与左手定则一致：电子带负电，B⊙（垂直纸面向外）时 F = qv×B 沿纸面向上，
   所以 dir = +1（光点打到屏上方 A）；B⊗ 则 dir = −1（打到下方 B）。
   像素半径与真实半径成正比：R_px = PX_PER_M · r，r = mv/(qB)。 */
const D = X_OUT - X_IN; // 磁场区沿轴长度（px）
const L = SCREEN_X - X_OUT; // 出射面到屏面（px）

/**
 * 像素半径 R 对应的屏上偏转量 Δ(R) = R(1−cosθ) + L·tanθ，θ = asin(D/R)
 *
 * @param R 圆弧的像素半径
 * @returns 光点相对管轴的偏转量（px）
 */
const dropOf = (R) => {
  const sinT = D / R;
  const cosT = Math.sqrt(Math.max(0, 1 - sinT * sinT));
  // 1 − cosθ = sin²θ/(1+cosθ)：小角度下也稳定（扫描到轴附近时 R 很大）
  return (R * sinT * sinT) / (1 + cosT) + (L * sinT) / cosT;
};

/** 标定 R_PEAK：让"打到 A/B"的偏转量正好 = DEFLECT_PX（Δ(R) 单调减，二分；加载时算一次） */
const R_PEAK = (() => {
  let lo = D * 1.0001;
  let hi = 1e6;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (dropOf(mid) > DEFLECT_PX) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
})();

/**
 * 真实半径 r = mv/(qB)（m，与 B 成反比）
 *
 * @param B 磁感应强度（T）
 * @returns 圆运动半径（m）
 */
const radiusMeters = (B) => (E_M * V) / (E_Q * Math.abs(B));

/** 比例系数（px/m）：由 B_PEAK ↔ R_PEAK 标定 */
const PX_PER_M = R_PEAK / radiusMeters(B_PEAK);

/**
 * 像素半径 R_px = PX_PER_M · r ∝ r = mv/(qB)
 *
 * @param B 磁感应强度（T）
 * @returns 圆弧的像素半径（px）
 */
const pxRadius = (B) => PX_PER_M * radiusMeters(B);

/**
 * 给定偏转磁场 B（T，带方向符号）算圆弧与落点
 *
 * @param B 偏转磁场（T，>0 = ⊙ 向外 / <0 = ⊗ 向里）
 * @returns 方向 dir、像素半径 R、出射角正弦 sinT、出射点 exitY、落点 tipY
 */
const trace = (B) => {
  const dir = B > 0 ? 1 : -1; // B>0 = ⊙ = 垂直纸面向外 = 电子向上偏
  const R = pxRadius(B);
  const sinT = D / R;
  const cosT = Math.sqrt(Math.max(0, 1 - sinT * sinT));
  const sag = (R * sinT * sinT) / (1 + cosT); // R(1−cosθ)：出射点离开管轴的距离
  const exitY = C - dir * sag; // 出射点 P1
  const tipY = C - dir * (sag + (L * sinT) / cosT); // 切线与屏面交点 = 落点

  return { dir, R, sinT, exitY, tipY };
};

/* ═══════════ 4. 扫描动画：B 的大小与方向都随时间周期性变化 ═══════════ */
const phase = ref(0);
let raf = 0;
const frame = () => {
  phase.value += 0.016;
  raf = requestAnimationFrame(frame);
};
watch(
  () => step >= 3,
  (on) => {
    if (on && !raf) {
      raf = requestAnimationFrame(frame);
    } else if (!on && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  },
  { immediate: true },
);
onBeforeUnmount(() => raf && cancelAnimationFrame(raf));

/** B(t) = B_PEAK·sin(2πt/T)（周期 2.4s）：方向随光点过轴翻转，大小随之增大/减小 */
const scanSin = computed(() => Math.sin((phase.value * 2 * Math.PI) / 2.4));

/** 当前偏转磁场（T）：step0 无磁场；step1 B⊙；step2 B⊗；step3 周期性变化 */
const fieldB = computed(() => {
  if (step >= 3) return B_PEAK * scanSin.value;
  if (step === 2) return -B_PEAK;
  if (step === 1) return B_PEAK;

  return 0;
});

/** |B|/B_peak ∈ [0,1]：磁场记号的疏密、大小、透明度全部由它驱动 */
const density = computed(() => Math.min(1, Math.abs(fieldB.value) / B_PEAK));

/** 磁场方向：true = ⊙（垂直纸面向外），false = ⊗（垂直纸面向里） */
const fieldOut = computed(() => fieldB.value > 0);

/** 电子束路径：枪口直线 → 区内圆弧（A 命令）→ 出射点切线直线到屏面 */
const beam = computed(() => {
  const B = fieldB.value;
  if (Math.abs(B) < B_PEAK * 4e-3) {
    // |B|→0：R→∞，直接画沿轴直线（此时偏转量 < 0.4px，与圆弧解无可见差别；
    // 顺带避免把 1e6 量级的圆弧半径塞进 path——个别渲染器对超大半径不友好）
    return {
      dir: 1,
      R: 0,
      sinT: 0,
      exitY: C,
      tipY: C,
      d: `M ${GUN_TIP_X} ${C} L ${SCREEN_X} ${C}`,
    };
  }
  const t = trace(B);
  // 圆心在入射点上方（dir=+1）时，弧从入射点到出射点是"角度减小"方向 ⇒ sweep-flag = 0
  const sweep = t.dir > 0 ? 0 : 1;
  const d =
    `M ${GUN_TIP_X} ${C} L ${X_IN} ${C} ` +
    `A ${t.R.toFixed(1)} ${t.R.toFixed(1)} 0 0 ${sweep} ${X_OUT} ${t.exitY.toFixed(2)} ` +
    `L ${SCREEN_X} ${t.tipY.toFixed(2)}`;

  return { ...t, d };
});

/* ═══════════ 5. 磁场记号阵列：疏密随 |B| 变化 ═══════════
   固定格点（不随 B 移动位置，避免动画里"跳"），按三层嵌套子集显示：
     1 层 = 行列都为偶数的 1/4 格点（最疏，间距 52×60）
     2 层 = 再补上棋盘格的一半格点（间距减半）
     3 层 = 全部格点（最密，间距 26×30）
   同时记号半径与透明度随 |B| 连续增大 ⇒ "B 大 → 更密更大更亮"。 */
const FIELD_DX = 26; // 格点横间距（px）
const FIELD_DY = 30; // 格点纵间距（px）
const FIELD_COLS = 9;
const FIELD_ROWS = 5;
const LEVEL_DENSITY = [0.05, 0.34, 0.66]; // 三层格点各自出现的 |B|/B_peak 门槛

/** 当前档位 0–3：阵列只在换档时重建（动画里逐帧变的只有半径/透明度，省得每帧 diff 整个阵列） */
const symbolTier = computed(() => {
  const d = density.value;

  return LEVEL_DENSITY.reduce((tier, need) => tier + (d >= need ? 1 : 0), 0);
});

const fieldSymbols = computed(() => {
  const tier = symbolTier.value;
  const cells = [];
  if (tier === 0) return cells;
  for (let i = 0; i < FIELD_COLS; i += 1) {
    for (let j = 0; j < FIELD_ROWS; j += 1) {
      const level = i % 2 === 0 && j % 2 === 0 ? 1 : (i + j) % 2 === 0 ? 2 : 3;
      if (level > tier) continue;
      cells.push({
        key: `${i}-${j}`,
        x: X_IN + 16 + i * FIELD_DX,
        y: C + (j - 2) * FIELD_DY,
      });
    }
  }

  return cells;
});

const symR = computed(() => 3 + 2.4 * density.value); // 记号半径 3 → 5.4
const symOpacity = computed(() => 0.45 + 0.55 * density.value);
const headR = computed(() => 9 + 8 * density.value); // 图上方 B 记号半径
const regionOpacity = computed(() => 0.3 + 0.5 * density.value); // 磁场区虚线边框

/**
 * 命中的目标点（容差比较，避免浮点相等判断）
 *
 * @param y 目标 y 坐标
 * @returns 当前光点是否命中该目标
 */
const hit = (y) => Math.abs(beam.value.tipY - y) < 8;

const statusText = computed(() => {
  if (step >= 3) return "偏转磁场不断变化：光点上下扫描，整个屏面发光（每秒 50 场）";
  if (step === 2) return "磁场 ⊗ 向纸面里：电子束向下偏转，光点打在屏下方 B 点";
  if (step === 1) return "磁场 ⊙ 向纸面外：电子束向上偏转，光点打在屏上方 A 点";

  return "无磁场：电子束沿直线飞行，光点打在屏中央 O 点";
});
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-col">
    <svg viewBox="0 0 920 372" xmlns="http://www.w3.org/2000/svg" class="min-h-0 w-full flex-1">
      <defs>
        <clipPath id="crt-scan-field-clip">
          <path :d="TUBE_PATH" />
        </clipPath>
      </defs>
      <!-- 显像管玻璃外壳：细管颈 → 喇叭形过渡 → 平屏面（一条连续轮廓） -->
      <path
        :d="TUBE_PATH"
        fill="rgba(148,163,184,0.06)"
        stroke="rgba(148,163,184,0.45)"
        stroke-width="2"
      />
      <!-- 荧光屏（束流的终点面；光点落在它上面） -->
      <rect
        x="838"
        y="54"
        width="18"
        height="272"
        rx="5"
        fill="rgba(96,165,250,0.1)"
        stroke="rgba(96,165,250,0.5)"
        stroke-width="2"
      />
      <text x="848" y="34" text-anchor="middle" font-size="19" fill="#94a3b8">荧光屏</text>
      <!-- 偏转磁场区：淡色底 + 虚线边框 + ⊙/⊗ 阵列；整块裁到管腔内（几何保证不出管） -->
      <g clip-path="url(#crt-scan-field-clip)">
        <rect x="480" y="60" width="240" height="260" fill="rgba(226,168,70,0.1)" />
        <rect
          x="480"
          y="60"
          width="240"
          height="260"
          fill="none"
          stroke="rgba(226,168,70,0.55)"
          stroke-width="1.6"
          stroke-dasharray="7 5"
          :opacity="regionOpacity"
        />
        <g
          fill="none"
          stroke="#e2a846"
          stroke-width="1.6"
          :opacity="symOpacity"
          stroke-linecap="round"
        >
          <template v-for="s in fieldSymbols" :key="s.key">
            <circle :cx="s.x" :cy="s.y" :r="symR" />
            <circle
              v-if="fieldOut"
              :cx="s.x"
              :cy="s.y"
              :r="symR * 0.34"
              fill="#e2a846"
              stroke="none"
            />
            <template v-else>
              <line
                :x1="s.x - symR * 0.68"
                :y1="s.y - symR * 0.68"
                :x2="s.x + symR * 0.68"
                :y2="s.y + symR * 0.68"
              />
              <line
                :x1="s.x + symR * 0.68"
                :y1="s.y - symR * 0.68"
                :x2="s.x - symR * 0.68"
                :y2="s.y + symR * 0.68"
              />
            </template>
          </template>
        </g>
      </g>
      <!-- 电子枪：枪身 + 阴极灯丝 + 加速/聚焦孔 + 喷口（束流从喷口出发） -->
      <g>
        <rect
          x="64"
          y="168"
          width="84"
          height="44"
          rx="8"
          fill="rgba(30,41,59,0.9)"
          stroke="rgba(148,163,184,0.6)"
          stroke-width="1.8"
        />
        <path
          d="M 74 190 L 80 180 L 86 200 L 92 180 L 98 200 L 104 190"
          fill="none"
          stroke="#f87171"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g stroke="rgba(148,163,184,0.85)" stroke-width="2" stroke-linecap="round">
          <line x1="116" y1="174" x2="116" y2="185" />
          <line x1="116" y1="195" x2="116" y2="206" />
          <line x1="132" y1="174" x2="132" y2="185" />
          <line x1="132" y1="195" x2="132" y2="206" />
        </g>
        <path
          d="M 146 170 L 158 184 L 158 196 L 146 210 Z"
          fill="rgba(30,41,59,0.9)"
          stroke="rgba(148,163,184,0.6)"
          stroke-width="1.8"
        />
        <text x="112" y="252" text-anchor="middle" font-size="19" fill="#94a3b8">电子枪</text>
      </g>
      <!-- 三个目标点 A / O / B -->
      <g font-size="22" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic">
        <circle
          :cx="SCREEN_X"
          :cy="A_Y"
          r="4"
          :fill="hit(A_Y) ? '#f8fafc' : 'rgba(148,163,184,0.5)'"
        />
        <circle
          :cx="SCREEN_X"
          :cy="O_Y"
          r="4"
          :fill="hit(O_Y) ? '#f8fafc' : 'rgba(148,163,184,0.5)'"
        />
        <circle
          :cx="SCREEN_X"
          :cy="B_Y"
          r="4"
          :fill="hit(B_Y) ? '#f8fafc' : 'rgba(148,163,184,0.5)'"
        />
        <text :x="SCREEN_X - 14" :y="A_Y + 7" text-anchor="end">A</text>
        <text :x="SCREEN_X - 14" :y="O_Y + 7" text-anchor="end">O</text>
        <text :x="SCREEN_X - 14" :y="B_Y + 7" text-anchor="end">B</text>
      </g>
      <!-- 电子束：枪口 → 沿轴直线 → 磁场区内真圆弧 → 出射点切线 → 屏面（暗底衬让束流压过记号） -->
      <path
        :d="beam.d"
        fill="none"
        stroke="rgba(9,13,26,0.55)"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :d="beam.d"
        fill="none"
        stroke="#7dd3fc"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- 偏转磁场标注：B 的大小 → 记号大小/透明度，方向 → ⊙ / ⊗ -->
      <g v-if="step >= 1">
        <text
          x="573"
          y="64"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="#e2a846"
        >
          B
        </text>
        <g :opacity="symOpacity">
          <circle cx="617" cy="50" :r="headR" fill="none" stroke="#e2a846" stroke-width="2.4" />
          <circle v-if="fieldOut" cx="617" cy="50" :r="headR * 0.3" fill="#e2a846" />
          <template v-else>
            <line
              :x1="617 - headR * 0.7"
              :y1="50 - headR * 0.7"
              :x2="617 + headR * 0.7"
              :y2="50 + headR * 0.7"
              stroke="#e2a846"
              stroke-width="2.4"
            />
            <line
              :x1="617 + headR * 0.7"
              :y1="50 - headR * 0.7"
              :x2="617 - headR * 0.7"
              :y2="50 + headR * 0.7"
              stroke="#e2a846"
              stroke-width="2.4"
            />
          </template>
        </g>
        <line
          x1="600"
          y1="80"
          x2="600"
          y2="114"
          stroke="rgba(226,168,70,0.5)"
          stroke-width="1.6"
          stroke-dasharray="5 4"
        />
      </g>
      <!-- 命中光点（辉光） -->
      <circle :cx="SCREEN_X" :cy="beam.tipY" r="17" fill="rgba(96,165,250,0.22)" />
      <circle :cx="SCREEN_X" :cy="beam.tipY" r="7" fill="rgba(248,250,252,0.92)" />
    </svg>

    <div class="mt-1 shrink-0 text-center text-base" style="color: #cbd5e1">{{ statusText }}</div>
  </div>
</template>
