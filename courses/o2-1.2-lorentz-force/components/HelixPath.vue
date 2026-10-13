<!--
  第二课时 · v 与 B 成 θ 时的合运动：螺旋线（第 24 / 25 页共用）
  —— 沿 B 方向：v∥ = v cosθ 不受力 → 匀速直线，每过一个周期沿轴前进一个螺距；
     垂直 B 的平面内：v⊥ = v sinθ 受 F = qBv⊥ → 匀速圆周运动；两者合成 = 螺旋线。
     螺距 d = v∥T = v cosθ · 2πm/(qB)。
  画法：斜投影（x 沿 B 向右、y 竖直、z 朝观察者）——
       sx = ox + x + 0.5z，sy = oy − 0.88y + 0.3z；z ≥ 0 的半个线圈画实线、z < 0 画虚线，
       一圈一圈"绕在圆柱上"的立体感就出来了（纯 SVG，不依赖 three.js，翻页不卡）。
  真实计算：θ 只改分解比例；T = 2πm/(qB) 与 θ、v 都无关，所以螺距只随 θ 变。
  待细化方向：把 O→A 的一整圈单独高亮成"一个周期"。
-->
<script setup>
import { computed, ref } from "vue";

defineProps({
  /** 是否标出 O、A 与螺距尺寸线（第 25 页讲螺距时间时打开） */
  showPitch: { type: Boolean, default: true },
});

const THETAS = [30, 45, 60];
const thetaDeg = ref(45);
const th = computed(() => (thetaDeg.value * Math.PI) / 180);

/** 与 CircularOrbit 同一套常量：电子，v = 1.0×10⁶ m/s，B = 1.0 mT */
const E = 1.6e-19;
const M_E = 9.11e-31;
const V = 1e6;
const B = 1e-3;
/** 周期：只跟 m、q、B 有关 */
const T = (2 * Math.PI * M_E) / (E * B);

const vPar = computed(() => V * Math.cos(th.value)); // m/s
const vPerp = computed(() => V * Math.sin(th.value)); // m/s
const rMM = computed(() => ((M_E * vPerp.value) / (E * B)) * 1000); // mm
const pitchMM = computed(() => vPar.value * T * 1000); // mm

/** 画布比例：让两圈线圈正好铺满 viewBox（否则图只占中间一小块，投到屏上就变得很小） */
const RPX = computed(() => 10 + rMM.value * 9);
const PITCHPX = computed(() => pitchMM.value * 10.2);

const W = 620;
const H = 300;
const OY = 150;
/** 两圈线圈整体水平居中 */
const OX = computed(() => (W - 2 * PITCHPX.value) / 2);

const project = (x, y, z) => ({
  x: OX.value + x + 0.5 * z,
  y: OY - 0.88 * y + 0.3 * z,
});

const toPath = (pts) => `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`;

/** 螺旋线：z ≥ 0（朝观察者的半圈）实线，z < 0 虚线 */
const segments = computed(() => {
  const segs = [];
  let cur = null;
  const steps = 260;
  for (let i = 0; i <= steps; i += 1) {
    const phi = (i / steps) * 4 * Math.PI;
    const x = PITCHPX.value * (phi / (2 * Math.PI));
    const y = RPX.value * Math.cos(phi);
    const z = RPX.value * Math.sin(phi);
    const front = z >= 0;
    if (!cur || cur.front !== front) {
      cur = { front, pts: [] };
      segs.push(cur);
    }
    cur.pts.push(project(x, y, z));
  }
  return segs.map((seg) => ({ front: seg.front, d: toPath(seg.pts) }));
});

/** 入口处的圆柱截面（帮助看出"绕在圆柱上"） */
const ringPath = computed(() => {
  const pts = [];
  for (let i = 0; i <= 64; i += 1) {
    const phi = (i / 64) * 2 * Math.PI;
    pts.push(project(0, RPX.value * Math.cos(phi), RPX.value * Math.sin(phi)));
  }
  return toPath(pts);
});

const axisStart = computed(() => ({ x: OX.value - 34, y: OY }));
const axisEnd = computed(() => ({ x: OX.value + 2 * PITCHPX.value + 16, y: OY }));
const pointO = computed(() => ({ x: OX.value, y: OY }));
const pointA = computed(() => ({ x: OX.value + PITCHPX.value, y: OY }));
const dimY = OY + 86;
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div class="flex min-h-0 w-full flex-1 items-center justify-center">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-auto max-w-full"
      >
        <!-- 磁场轴线（B 的方向） -->
        <CourseArrow
          :from="axisStart"
          :to="axisEnd"
          stroke="#e2a846"
          stroke-width="3"
          stroke-dasharray="10 7"
          style="opacity: 0.85"
        />
        <text
          :x="axisEnd.x + 6"
          :y="OY + 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="#e2a846"
        >
          B
        </text>

        <!-- 入口截面 -->
        <path
          :d="ringPath"
          fill="none"
          stroke="rgba(148,163,184,0.35)"
          stroke-width="1.4"
          stroke-dasharray="5 5"
        />

        <!-- 螺旋线：远侧虚线、近侧实线 -->
        <path
          v-for="(seg, i) in segments"
          :key="i"
          :d="seg.d"
          fill="none"
          :stroke="seg.front ? '#60a5fa' : 'rgba(96,165,250,0.42)'"
          :stroke-width="seg.front ? 3.4 : 2.4"
          :stroke-dasharray="seg.front ? undefined : '6 6'"
          stroke-linecap="round"
        />

        <!-- O 与 A 相隔一个螺距（正好一个周期） -->
        <template v-if="showPitch">
          <circle :cx="pointO.x" :cy="pointO.y" r="4.5" fill="#f8fafc" />
          <circle :cx="pointA.x" :cy="pointA.y" r="4.5" fill="#2dd4bf" />
          <text
            :x="pointO.x - 8"
            :y="pointO.y - 12"
            text-anchor="end"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="22"
            fill="#f8fafc"
          >
            O
          </text>
          <text
            :x="pointA.x + 8"
            :y="pointA.y - 12"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="22"
            fill="#2dd4bf"
          >
            A
          </text>
          <line
            :x1="pointO.x"
            :y1="dimY"
            :x2="pointA.x"
            :y2="dimY"
            stroke="rgba(226,168,70,0.85)"
            stroke-width="1.8"
          />
          <line
            :x1="pointO.x"
            :y1="dimY - 8"
            :x2="pointO.x"
            :y2="dimY + 8"
            stroke="rgba(226,168,70,0.85)"
            stroke-width="1.8"
          />
          <line
            :x1="pointA.x"
            :y1="dimY - 8"
            :x2="pointA.x"
            :y2="dimY + 8"
            stroke="rgba(226,168,70,0.85)"
            stroke-width="1.8"
          />
          <text
            :x="pointO.x - 14"
            :y="dimY + 6"
            text-anchor="end"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="21"
            fill="#e2a846"
          >
            d
          </text>
          <text
            :x="(pointO.x + pointA.x) / 2"
            :y="dimY + 26"
            text-anchor="middle"
            font-size="19"
            fill="#e2a846"
          >
            {{ pitchMM.toFixed(1) }} mm
          </text>
        </template>
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
          :class="
            thetaDeg === opt ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
          "
          @click="thetaDeg = opt"
        >
          {{ opt }}°
        </button>
      </span>
      <span class="text-slate-300">
        <Latex tex="v_\parallel" /> =
        <span class="font-semibold text-amber-300">{{ (vPar / 1e6).toFixed(2) }}</span
        >、<Latex tex="v_\perp" /> =
        <span class="font-semibold text-teal-300">{{ (vPerp / 1e6).toFixed(2) }}</span
        >（<Latex tex="\times 10^6\ \text{m/s}" />）
      </span>
      <span class="text-slate-400">
        <Latex tex="r" /> = {{ rMM.toFixed(2) }} <Latex tex="\text{mm}" />，<Latex tex="T" /> =
        {{ (T * 1e9).toFixed(1) }} <Latex tex="\text{ns}" />，<Latex tex="d" /> =
        {{ pitchMM.toFixed(1) }} <Latex tex="\text{mm}" />
      </span>
    </div>
  </div>
</template>
