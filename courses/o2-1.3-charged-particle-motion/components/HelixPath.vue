<!--
  第 23 页《合运动：螺旋线》
  ── 这一页画的是什么 ──
  v 与 B 成 θ 时：v∥ = v cosθ 沿 B 不受力（匀速直线，每个周期沿轴前进一个螺距）、v⊥ = v sinθ 垂直 B
  （匀速圆周，r = mv⊥/(qB)、T = 2πm/(qB)），合运动 = 绕在圆柱面上的螺旋线，螺距 d = v∥T = v cosθ·2πm/(qB)。
  本图按电子（q = −e、ω = eB/m）画旋向：v∥ 沿 +B 时 (y, z) = R(cosφ, sinφ)、φ 随 t 增大（正电荷要反过来）。
  θ 只改分解比例，T 与 θ、v 无关，所以只有 d 随 θ 变。
  ── 投影（全图只有这一套；螺旋线、圆柱、轴线、O/A、尺寸线全部走 project()，不许个别元素自己加偏移）──
  世界坐标：x 沿 B（也就是圆柱轴），y 世界竖直向上，z 与 x、y 成右手系；R = mv⊥/(qB)，P = v∥T。
  视角两角：yaw = −32°（绕竖直轴 y 转，相机偏到左前方，端面圆才张得开、不再压成一条线）；
            pitch = +22°（相机抬高俯视，轴在画面里向右偏上约 13°，像教材的立体图）。
  正交投影 = 把世界点投到三个两两正交的视图基上（不是斜投影）：
    r = ( cos(yaw), 0, −sin(yaw) )                                     屏幕右
    u = ( −sin(pitch)·sin(yaw), cos(pitch), −sin(pitch)·cos(yaw) )     屏幕上
    w = r × u                                                          指向观察者（判遮挡用）
    X = p·r = x·cos(yaw) − z·sin(yaw)
    Y = p·u = y·cos(pitch) − ( x·sin(yaw) + z·cos(yaw) )·sin(pitch)     （向上为正）
    depth = p·w = x·sin(yaw)cos(pitch) + y·sin(pitch) + z·cos(yaw)cos(pitch)
  作图：screen.x = (X − minX)·s + PAD_X、screen.y = (maxY − Y)·s + PAD_TOP（SVG 的 y 轴向下，故取负）；
  s 与 viewBox 由「所有元素的统一包围盒」一次算出，螺旋线两圈自动铺满 viewBox，不再缩在中间。
  遮挡：圆柱面 φ 处的外法线 n = (0, cosφ, sinφ)；n·w > 0 ⇒ 这一侧朝观察者（画实线），n·w < 0 ⇒ 在背面（画虚线）。
-->
<script setup>
import { computed, ref } from "vue";

const { showPitch = true } = defineProps({
  /** 是否标出 O、A 与螺距尺寸线（关掉就只看螺旋线本身） */
  showPitch: { type: Boolean, default: true },
});

const THETAS = [30, 45, 60];
const thetaDeg = ref(45);
const th = computed(() => (thetaDeg.value * Math.PI) / 180);

// 与 CircularOrbit 同一套常量：电子，v = 1.0×10⁶ m/s，B = 1.0 mT
const E = 1.6e-19;
const M_E = 9.11e-31;
const V = 1e6;
const B = 1e-3;
// 周期：只跟 m、q、B 有关，与 θ、v 无关
const T = (2 * Math.PI * M_E) / (E * B);

const vPar = computed(() => V * Math.cos(th.value)); // m/s
const vPerp = computed(() => V * Math.sin(th.value)); // m/s
const rMM = computed(() => ((M_E * vPerp.value) / (E * B)) * 1000); // mm
const pitchMM = computed(() => vPar.value * T * 1000); // mm

// ── 视角：正交投影的两个角（理由见文件头）──
const DEG = Math.PI / 180;
const YAW = -32 * DEG;
const PITCH = 22 * DEG;
const CY = Math.cos(YAW);
const SY = Math.sin(YAW);
const CP = Math.cos(PITCH);
const SP = Math.sin(PITCH);

// 唯一的一套投影：世界坐标 (x, y, z) → 视图坐标（X 向右、Y 向上），与 z 一起构成右手系
const project = (x, y, z) => ({
  X: x * CY - z * SY,
  Y: y * CP - (x * SY + z * CY) * SP,
});

// 圆柱面 φ 处的外法线 n = (0, cosφ, sinφ) 是否朝向观察者：n·w = cosφ·sin(pitch) + sinφ·cos(pitch)cos(yaw)
// ——螺旋线与端面圆的「实线 / 虚线」分段都用它判定，与投影同源（必须是布尔值：带符号的数每步都在变，
// 拿它当"段"的判据会一点一段，折线退化成一根根单点、整条曲线画不出来）
const facingViewer = (phi) => Math.cos(phi) * SP + Math.sin(phi) * CP * CY > 0;

// 螺旋线圈数（O 起点 → A 差一个螺距 = 正好一圈）
const TURNS = 2;
// 起点相位 90°：把 O 摆到最靠观察者的那条母线（φ=90° 处 n·w 最大）上，起点看得最清楚
const PHI0 = Math.PI / 2;
const HELIX_SAMPLES_PER_TURN = 240;
const RING_SAMPLES = 180;

// viewBox 高固定（字形、线宽都按这套 px 用户单位给）；内容包围盒自动缩放铺满，四周留白按标签实际占位给足
const VB_H = 300;
const PAD_TOP = 16;
const PAD_BOTTOM_PITCH = 14;
const PAD_BOTTOM_PLAIN = 12;
const PAD_X = 32;

// 视图坐标里的一条折线 → SVG path（1 位小数够用）
const toPath = (pts) => `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`;

// 把一条以 φ 参数化的曲线按「朝观察者 / 背面」拆成若干段（相邻两段共用分界点，接缝看不出）
const splitByFacing = (count, at) => {
  const segs = [];
  let cur = null;
  for (let i = 0; i <= count; i += 1) {
    const { phi, p } = at(i / count);
    const front = facingViewer(phi);
    if (!cur || cur.front !== front) {
      cur = { front, pts: [] };
      segs.push(cur);
    }
    cur.pts.push(p);
  }
  return segs;
};

// 螺旋线：绕 TURNS 圈，x 每个周期沿 B 前进一个螺距 P
const sampleHelix = (R, P) =>
  splitByFacing(HELIX_SAMPLES_PER_TURN * TURNS, (u) => {
    const phi = PHI0 + u * TURNS * 2 * Math.PI;
    return { phi, p: project(u * TURNS * P, R * Math.cos(phi), R * Math.sin(phi)) };
  });

// 端面圆：x 处的整圈，拆成「近半圈（实线）/ 远半圈（虚线）」
const sampleRing = (R, x) =>
  splitByFacing(RING_SAMPLES, (u) => {
    const phi = u * 2 * Math.PI;
    return { phi, p: project(x, R * Math.cos(phi), R * Math.sin(phi)) };
  });

// 母线：4 条（含穿过 O、A 的那一条，正好把「同相位、差一个螺距」摆在明面上）
const sampleGeneratrices = (R, L) =>
  [0, 1, 2, 3].map((k) => {
    const phi = PHI0 + (k * Math.PI) / 2;
    const at = (x) => project(x, R * Math.cos(phi), R * Math.sin(phi));
    return { a: at(0), b: at(L) };
  });

// 沿 B 的视图方向（unit）+ 与之垂直、指向屏幕下方（down）——尺寸线沿这个下方向让开圆柱
const axisFrame = (from, to) => {
  const dx = to.X - from.X;
  const dy = to.Y - from.Y;
  const len = Math.hypot(dx, dy) || 1;
  const unit = { X: dx / len, Y: dy / len };
  return { unit, down: { X: unit.Y, Y: -unit.X } };
};

// 沿视图坐标里的某个方向平移一点
const shift = (p, dir, d) => ({ X: p.X + dir.X * d, Y: p.Y + dir.Y * d });

// 所有元素共用的同一个映射：包围盒（视图坐标）→ viewBox 用户单位（SVG 的 y 轴向下，所以取负）
const fitView = (pts, withPitch) => {
  const xs = pts.map((p) => p.X);
  const ys = pts.map((p) => p.Y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padBottom = withPitch ? PAD_BOTTOM_PITCH : PAD_BOTTOM_PLAIN;
  const s = (VB_H - PAD_TOP - padBottom) / (maxY - minY);
  return {
    viewBox: `0 0 ${((maxX - minX) * s + 2 * PAD_X).toFixed(1)} ${VB_H}`,
    toScreen: (p) => ({ x: (p.X - minX) * s + PAD_X, y: (maxY - p.Y) * s + PAD_TOP }),
  };
};

// 整幅图一次算完：先在视图坐标里采样所有几何元素 → 统一包围盒 → 统一映射到 viewBox
const buildScene = (R, P, withPitch) => {
  const L = TURNS * P;
  const helix = sampleHelix(R, P);
  const rings = [0, L].flatMap((x) => sampleRing(R, x));
  const generatrices = sampleGeneratrices(R, L);

  // 磁场 B：画在圆柱轴线上（不是表面），两端各探出一点
  const axisA = project(-0.12 * L, 0, 0);
  const axisB = project(1.12 * L, 0, 0);

  // O = 螺旋线起点（圆柱面上、相位 φ0）；A = 沿 B 前进一个螺距后的同相位点（也在圆柱面上）
  const O = project(0, R * Math.cos(PHI0), R * Math.sin(PHI0));
  const A = project(P, R * Math.cos(PHI0), R * Math.sin(PHI0));

  // 螺距尺寸线：沿投影后的 B 方向量 O→A，整体沿「屏幕向下」的法向挪开，避免压到圆柱
  const { down } = axisFrame(axisA, axisB);
  const off = 1.15 * R;
  const dimA = shift(O, down, off);
  const dimB = shift(A, down, off);

  const outline = [
    ...helix.flatMap((seg) => seg.pts),
    ...rings.flatMap((seg) => seg.pts),
    ...generatrices.flatMap((g) => [g.a, g.b]),
    axisA,
    axisB,
    O,
    A,
    ...(withPitch ? [dimA, dimB] : []),
  ];
  const { viewBox, toScreen } = fitView(outline, withPitch);

  const dimStart = toScreen(dimA);
  const dimEnd = toScreen(dimB);
  const downScreen = { x: down.X, y: -down.Y }; // 屏幕坐标（y 向下）里「垂直 B、朝下」的方向
  const dimMid = { x: (dimStart.x + dimEnd.x) / 2, y: (dimStart.y + dimEnd.y) / 2 };

  // 尺寸线两端的短刻度：与尺寸线垂直
  const tick = (p) => ({
    x1: p.x - downScreen.x * 9,
    y1: p.y - downScreen.y * 9,
    x2: p.x + downScreen.x * 9,
    y2: p.y + downScreen.y * 9,
  });

  return {
    viewBox,
    helix: helix.map((seg) => ({ front: seg.front, d: toPath(seg.pts.map((p) => toScreen(p))) })),
    rings: rings.map((seg) => ({ front: seg.front, d: toPath(seg.pts.map((p) => toScreen(p))) })),
    generatrices: generatrices.map((g) => ({ a: toScreen(g.a), b: toScreen(g.b) })),
    axisFrom: toScreen(axisA),
    axisTo: toScreen(axisB),
    O: toScreen(O),
    A: toScreen(A),
    dimStart,
    dimEnd,
    ticks: [tick(dimStart), tick(dimEnd)],
    dimLabel: { x: dimMid.x + downScreen.x * 24, y: dimMid.y + downScreen.y * 24 },
  };
};

const scene = computed(() => buildScene(rMM.value, pitchMM.value, showPitch));
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div class="flex min-h-0 w-full flex-1 items-center justify-center">
      <svg
        :viewBox="scene.viewBox"
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-auto max-w-full"
        aria-label="带电粒子在匀强磁场中的螺旋线"
      >
        <!-- 圆柱（虚线幽灵，半透明不抢视觉）：两端面圆，近半圈实线、远半圈虚线 -->
        <path
          v-for="(ring, i) in scene.rings"
          :key="`ring-${i}`"
          :d="ring.d"
          fill="none"
          :stroke="ring.front ? 'rgba(148,163,184,0.55)' : 'rgba(148,163,184,0.35)'"
          :stroke-width="ring.front ? 1.6 : 1.4"
          :stroke-dasharray="ring.front ? undefined : '6 6'"
        />
        <!-- 圆柱（虚线幽灵）：4 条母线，让「螺旋线绕在圆柱上」一眼可见 -->
        <line
          v-for="(gen, i) in scene.generatrices"
          :key="`gen-${i}`"
          :x1="gen.a.x"
          :y1="gen.a.y"
          :x2="gen.b.x"
          :y2="gen.b.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 35%, transparent)"
          stroke-width="1.3"
          stroke-dasharray="7 7"
        />
        <!-- 磁场 B：在圆柱轴线上，向右偏上 -->
        <CourseArrow
          :from="scene.axisFrom"
          :to="scene.axisTo"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-dasharray="9 7"
        />
        <text
          :x="scene.axisTo.x + 9"
          :y="scene.axisTo.y - 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="var(--c-accent)"
          stroke="var(--c-bg-soft)"
          stroke-width="3.5"
          paint-order="stroke"
        >
          B
        </text>
        <!-- 螺旋线：背面一段虚线 + 低透明度，正面一段实线加粗 -->
        <path
          v-for="(seg, i) in scene.helix"
          :key="`helix-${i}`"
          :d="seg.d"
          fill="none"
          :stroke="seg.front ? '#60a5fa' : 'rgba(96,165,250,0.4)'"
          :stroke-width="seg.front ? 3.6 : 2.4"
          :stroke-dasharray="seg.front ? undefined : '7 7'"
          stroke-linecap="round"
        />
        <!-- 螺距 d：沿投影后的 B 方向量 O→A，整体挪到圆柱下方，标注不压图 -->
        <template v-if="showPitch">
          <line
            :x1="scene.O.x"
            :y1="scene.O.y"
            :x2="scene.dimStart.x"
            :y2="scene.dimStart.y"
            stroke="color-mix(in srgb, var(--c-accent) 45%, transparent)"
            stroke-width="1.4"
            stroke-dasharray="5 5"
          />
          <line
            :x1="scene.A.x"
            :y1="scene.A.y"
            :x2="scene.dimEnd.x"
            :y2="scene.dimEnd.y"
            stroke="color-mix(in srgb, var(--c-accent) 45%, transparent)"
            stroke-width="1.4"
            stroke-dasharray="5 5"
          />
          <line
            :x1="scene.dimStart.x"
            :y1="scene.dimStart.y"
            :x2="scene.dimEnd.x"
            :y2="scene.dimEnd.y"
            stroke="color-mix(in srgb, var(--c-accent) 90%, transparent)"
            stroke-width="1.8"
          />
          <line
            v-for="(t, i) in scene.ticks"
            :key="`tick-${i}`"
            :x1="t.x1"
            :y1="t.y1"
            :x2="t.x2"
            :y2="t.y2"
            stroke="color-mix(in srgb, var(--c-accent) 90%, transparent)"
            stroke-width="1.8"
          />
          <text
            :x="scene.dimLabel.x"
            :y="scene.dimLabel.y"
            text-anchor="middle"
            font-size="20"
            fill="var(--c-accent)"
            stroke="var(--c-bg-soft)"
            stroke-width="3"
            paint-order="stroke"
          >
            <tspan font-family="KaTeX_Math" font-style="italic">d</tspan>
            <!-- 空格只能写成插值：直接写在 <tspan> 开头的空格会被 oxfmt 吃掉（量用斜体、单位用正文体） -->
            <tspan font-family="KaTeX_Main">{{ " " }}= {{ pitchMM.toFixed(1) }} mm</tspan>
          </text>
        </template>
        <!-- O、A 都画在圆柱面上：O 是螺旋线起点，A 是沿 B 走一个螺距后的同相位点 -->
        <circle :cx="scene.O.x" :cy="scene.O.y" r="5" fill="var(--c-neutral-50)" />
        <circle :cx="scene.A.x" :cy="scene.A.y" r="5" fill="var(--c-physics)" />
        <text
          :x="scene.O.x - 10"
          :y="scene.O.y + 16"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-50)"
          stroke="var(--c-bg-soft)"
          stroke-width="3.5"
          paint-order="stroke"
        >
          O
        </text>
        <text
          :x="scene.A.x + 12"
          :y="scene.A.y - 30"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-physics)"
          stroke="var(--c-bg-soft)"
          stroke-width="3.5"
          paint-order="stroke"
        >
          A
        </text>
      </svg>
    </div>

    <div class="mt-1 flex shrink-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
      <span class="flex items-center gap-1.5">
        <Latex tex="\theta" />
        <button
          v-for="opt in THETAS"
          :key="opt"
          type="button"
          class="px-2.5 py-0.5 rounded-full border transition-colors"
          :class="thetaDeg === opt ? 'text-amber-300' : 'text-dim'"
          :style="{ borderColor: thetaDeg === opt ? 'var(--c-accent-light)' : 'var(--c-neutral-600)' }"
          @click="thetaDeg = opt"
        >
          {{ opt }}°
        </button>
      </span>
      <span style="color: var(--c-neutral-300)">
        <Latex tex="v_\parallel" /> =
        <span class="font-semibold text-amber-300">{{ (vPar / 1e6).toFixed(2) }}</span
        >、<Latex tex="v_\perp" /> =
        <span class="font-semibold text-teal-300">{{ (vPerp / 1e6).toFixed(2) }}</span
        >（<Latex tex="\times 10^6\ \text{m/s}" />）
      </span>
      <span class="text-dim">
        <Latex tex="r" /> = {{ rMM.toFixed(2) }} <Latex tex="\text{mm}" />，<Latex tex="T" /> =
        {{ (T * 1e9).toFixed(1) }} <Latex tex="\text{ns}" />，<Latex tex="d" /> =
        {{ pitchMM.toFixed(1) }} <Latex tex="\text{mm}" />
      </span>
    </div>
  </div>
</template>
