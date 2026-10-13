<!--
  第二课时核心交互：垂直射入匀强磁场的电子 → 匀速圆周运动
  —— 视图沿磁场方向看（B 用 ⊙/⊗ 记号），电子在纸面内做圆周运动：
       · 蓝色 v 箭头 = 该点的速度方向（轨迹切线）
       · 青色 F 箭头 = 洛伦兹力，恒指向圆心（提供向心力）
       · 虚线半径 + r 读数
  真实计算（不写死）：
       r = mv/(qB)、T = 2πm/(qB)，q = e = 1.6×10⁻¹⁹ C、m = 9.11×10⁻³¹ kg；
       F 的方向每帧按 F = q(v × B) 现算，再验证它确实指向圆心；
       转动方向来自 −q·B_z 的符号（电子 + B⊙ → 逆时针），不靠肉眼猜。
  两个教材演示点：
       ① 改 v：r 跟着变、T 不变；
       ② 改 B：r 变、T 也变（ω = qB/m，B 越大转得越快）。
      所以画布半径按真实 r 缩放、转动快慢按 B 缩放——画面与公式同源。
  待细化方向：加"洛伦兹力演示仪"实物外形（励磁线圈 + 玻璃泡）。
-->
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

defineProps({
  /** 是否显示洛伦兹力箭头（先问后答：默认显示） */
  force: { type: Boolean, default: true },
  /** 是否显示半径与圆心（半径推导页分步用） */
  radius: { type: Boolean, default: true },
  /** 高亮哪一条关系式 */
  emphasis: { type: String, default: "r" },
  /** 读数卡里是否再写一遍关系式（正文已给公式的页面关掉，省高度） */
  hint: { type: Boolean, default: true },
});

const E = 1.6e-19; // 元电荷 C
const M_E = 9.11e-31; // 电子质量 kg
const Q = -E; // 电子带负电

const V_OPTIONS = [1e6, 1.5e6, 2e6];
const B_OPTIONS = [1e-3, 1.5e-3, 2e-3];

const v = ref(1e6);
const B = ref(1e-3);
const bDir = ref("out"); // 'out' ⊙ 向外 | 'in' ⊗ 向里

const Bz = computed(() => (bDir.value === "out" ? 1 : -1));

/** 真实物理量 */
const rReal = computed(() => (M_E * v.value) / (Math.abs(Q) * B.value)); // m
const TReal = computed(() => (2 * Math.PI * M_E) / (Math.abs(Q) * B.value)); // s

/** 两档参数的极值对应的真实半径（m） */
const R_MIN_REAL = (M_E * Math.min(...V_OPTIONS)) / (Math.abs(Q) * Math.max(...B_OPTIONS));
const R_MAX_REAL = (M_E * Math.max(...V_OPTIONS)) / (Math.abs(Q) * Math.min(...B_OPTIONS));

/**
 * 画布半径（用户单位）：B 变大→圆变小、v 变大→圆变大（教材演示的定性结论）。 ★ 两条坑： ① 旧版用 10 + 3.4·r，把默认的 5.69 mm 只画成 29 用户单位、占画布高
 * 16%，后排看不见； ② 改成严格正比放大（R ∝ r）时，最小档只剩 20 单位（16%），仍然是个点。 折中：把真实半径区间 [2.85, 11.39] mm 仿射映射到 [44, 80]
 * 用户单位—— 单调、各档互不相同（比值 1.8 倍，肉眼可辨），最小档也有画布高的 35%； 精确半径由右侧读数给出（定性演示只需要看得出来"变大 / 变小"）。
 */
const R = computed(() => {
  const t = (rReal.value - R_MIN_REAL) / (R_MAX_REAL - R_MIN_REAL);
  return 44 + 36 * t;
});

/** 屏幕角速度：方向 = −q·B_z（真实符号），快慢 ∝ B（因为 ω = qB/m 与 v 无关） */
const omega = computed(() => {
  const dir = -Q * Bz.value >= 0 ? 1 : -1;
  return dir * ((2 * Math.PI) / (2.6 * (1e-3 / B.value)));
});

/** 动画相位（用真实时间步进，帧率无关） */
const phase = ref(0);
let rafId = 0;
let last = 0;
const tick = (now) => {
  rafId = requestAnimationFrame(tick);
  const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
  last = now;
  phase.value += omega.value * dt;
};
onMounted(() => {
  rafId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => rafId && cancelAnimationFrame(rafId));

const CX = 130;
const CY = 125;

/** 电子位置（屏幕坐标） */
const dot = computed(() => ({
  x: CX + R.value * Math.cos(phase.value),
  y: CY - R.value * Math.sin(phase.value),
}));

/** 速度方向（屏幕坐标）：轨迹切线、与运动方向一致 */
const vDir = computed(() => {
  const s = Math.sign(omega.value) || 1;
  return { x: -Math.sin(phase.value) * s, y: -Math.cos(phase.value) * s };
});

/** 洛伦兹力方向（屏幕坐标）：F = q(v × B)，逐帧现算 */
const fDir = computed(() => {
  const vx = vDir.value.x;
  const vy = -vDir.value.y; // 转成 y 向上的数学坐标
  const fx = Q * vy * Bz.value;
  const fy = -Q * vx * Bz.value;
  const len = Math.hypot(fx, fy) || 1;
  return { x: fx / len, y: -fy / len };
});

/**
 * 箭头端点
 *
 * @param dir 单位方向向量
 * @param len 箭头长度
 * @returns 箭头终点（在 dot 当前位置上偏移）
 */
const arrowEnd = (dir, len) => ({ x: dot.value.x + dir.x * len, y: dot.value.y + dir.y * len });

/** 力确实指向圆心（自检：万一方向算错，箭头会变红，而不是悄悄教错） */
const forcePointsToCenter = computed(() => {
  const cx = CX - dot.value.x;
  const cy = CY - dot.value.y;
  const len = Math.hypot(cx, cy) || 1;
  return fDir.value.x * (cx / len) + fDir.value.y * (cy / len) > 0.98;
});

const rMM = computed(() => rReal.value * 1000);
const tNS = computed(() => TReal.value * 1e9);
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 gap-4">
    <div class="flex min-h-0 min-w-0 flex-1 items-center justify-center">
      <svg
        viewBox="0 0 260 250"
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-auto max-w-full"
      >
        <!-- B 记号（视图沿磁场方向看） -->
        <g v-if="bDir === 'out'">
          <circle cx="28" cy="28" r="12" fill="none" stroke="#e2a846" stroke-width="2.2" />
          <circle cx="28" cy="28" r="3" fill="#e2a846" />
        </g>
        <g v-else>
          <circle cx="28" cy="28" r="12" fill="none" stroke="#e2a846" stroke-width="2.2" />
          <line x1="20" y1="20" x2="36" y2="36" stroke="#e2a846" stroke-width="2.2" />
          <line x1="36" y1="20" x2="20" y2="36" stroke="#e2a846" stroke-width="2.2" />
        </g>
        <text
          x="28"
          y="58"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          fill="#e2a846"
        >
          B
        </text>

        <!-- 轨迹圆 -->
        <circle
          :cx="CX"
          :cy="CY"
          :r="R"
          fill="none"
          stroke="rgba(96,165,250,0.35)"
          stroke-width="2"
          stroke-dasharray="5 7"
        />

        <!-- 圆心 + 半径 -->
        <template v-if="radius">
          <circle :cx="CX" :cy="CY" r="3" fill="#cbd5e1" />
          <line
            :x1="CX"
            :y1="CY"
            :x2="dot.x"
            :y2="dot.y"
            stroke="rgba(203,213,225,0.7)"
            stroke-width="1.8"
            stroke-dasharray="6 5"
          />
          <text
            :x="(CX + dot.x) / 2 + 7"
            :y="(CY + dot.y) / 2 - 7"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#cbd5e1"
          >
            r
          </text>
        </template>

        <!-- v：切线方向 -->
        <CourseArrow :from="dot" :to="arrowEnd(vDir, 24)" stroke="#60a5fa" stroke-width="3.4" />
        <text
          :x="arrowEnd(vDir, 34).x"
          :y="arrowEnd(vDir, 34).y + 5"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          fill="#60a5fa"
        >
          v
        </text>

        <!-- F_洛：恒指向圆心，提供向心力 -->
        <template v-if="force">
          <CourseArrow
            :from="dot"
            :to="arrowEnd(fDir, 24)"
            :stroke="forcePointsToCenter ? '#2dd4bf' : '#f87171'"
            stroke-width="4"
          />
          <text
            :x="arrowEnd(fDir, 34).x"
            :y="arrowEnd(fDir, 34).y + 4"
            text-anchor="middle"
            font-size="16"
            fill="#2dd4bf"
          >
            <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
            <tspan dy="4" font-size="11">洛</tspan>
          </text>
        </template>

        <!-- 电子 -->
        <circle :cx="dot.x" :cy="dot.y" r="7.5" fill="#60a5fa" />
        <line
          :x1="dot.x - 3.5"
          :y1="dot.y"
          :x2="dot.x + 3.5"
          :y2="dot.y"
          stroke="#0f1425"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="flex w-[15rem] shrink-0 flex-col justify-center gap-1.5">
      <div>
        <div class="mb-1 text-sm text-slate-400">磁场方向</div>
        <div class="flex gap-2">
          <button
            type="button"
            class="px-2.5 py-0.5 rounded-full text-sm border transition-colors"
            :class="
              bDir === 'out' ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
            "
            @click="bDir = 'out'"
          >
            <Latex tex="\odot" /> 向外
          </button>
          <button
            type="button"
            class="px-2.5 py-0.5 rounded-full text-sm border transition-colors"
            :class="
              bDir === 'in' ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
            "
            @click="bDir = 'in'"
          >
            <Latex tex="\otimes" /> 向里
          </button>
        </div>
      </div>

      <div>
        <div class="mb-1 text-sm text-slate-400">
          速率 <Latex tex="v" />（<Latex tex="\times 10^6\ \text{m/s}" />）
        </div>
        <div class="flex gap-2">
          <button
            v-for="opt in V_OPTIONS"
            :key="opt"
            type="button"
            class="px-2.5 py-0.5 rounded-full text-sm border transition-colors"
            :class="v === opt ? 'border-sky-400 text-sky-300' : 'border-slate-600 text-slate-400'"
            @click="v = opt"
          >
            {{ (opt / 1e6).toFixed(1) }}
          </button>
        </div>
      </div>

      <div>
        <div class="mb-1 text-sm text-slate-400">
          磁感应强度 <Latex tex="B" />（<Latex tex="\text{mT}" />）
        </div>
        <div class="flex gap-2">
          <button
            v-for="opt in B_OPTIONS"
            :key="opt"
            type="button"
            class="px-2.5 py-0.5 rounded-full text-sm border transition-colors"
            :class="
              B === opt ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
            "
            @click="B = opt"
          >
            {{ (opt * 1000).toFixed(1) }}
          </button>
        </div>
      </div>

      <div class="rounded-xl border border-slate-700/60 bg-slate-900/40 px-3 py-1.5">
        <div class="text-lg">
          <Latex tex="r" /> =
          <span class="font-semibold" :class="emphasis === 'r' ? 'text-accent' : 'text-slate-200'">
            {{ rMM.toFixed(2) }} <Latex tex="\text{mm}" />
          </span>
        </div>
        <div class="mt-1 text-lg">
          <Latex tex="T" /> =
          <span class="font-semibold" :class="emphasis === 'T' ? 'text-accent' : 'text-slate-200'">
            {{ tNS.toFixed(1) }} <Latex tex="\text{ns}" />
          </span>
        </div>
        <div v-if="hint" class="mt-0.5 text-xs leading-relaxed text-slate-400">
          <template v-if="emphasis === 'T'">
            <Latex tex="T = \dfrac{2\pi m}{qB}" />：只跟 <Latex tex="m" />、<Latex
              tex="q"
            />、<Latex tex="B" /> 有关
          </template>
          <template v-else>
            <Latex tex="r = \dfrac{mv}{qB}" />：<Latex tex="B" /> 变大圆变小、<Latex tex="v" />
            变大圆变大
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
