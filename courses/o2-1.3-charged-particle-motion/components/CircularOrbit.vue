<!--
  第二课时核心交互：垂直射入匀强磁场的电子 → 匀速圆周运动
  —— 视图沿磁场方向看（B 用 ⊙/⊗ 记号），电子在纸面内做圆周运动：
       · 蓝色 v 箭头 = 该点的速度方向（轨迹切线）
       · 青色 F 箭头 = 洛伦兹力，恒指向圆心（提供向心力）
       · 虚线半径 + r 读数（readout 为真时才给数值）
  三页复用（第 18 页定性 / 第 20 页半径 / 第 21 页周期）：
       · 磁场方向 = 切换按钮（⊙ 向外 / ⊗ 向里）
       · 速率 v、磁感应强度 B = 连续滑杆（v ∈ [1.0, 2.0]×10⁶ m/s、B ∈ [1.0, 2.0] mT）
       · readout=false（第 18 页）：不给 r、T 的数值、也不给任何关系式，只做定性演示
         （滑杆旁显示的是"老师自己调的档位值"，不是算出来的结果，保留）
  真实计算（不写死）：
       r = mv/(qB)、T = 2πm/(qB)、ω = qB/m，q = e = 1.6×10⁻¹⁹ C、m = 9.11×10⁻³¹ kg；
       F 的方向每帧按 F = q(v × B) 现算，再验证它确实指向圆心；
       转动方向来自 −q·B_z 的符号（电子 + B⊙ → 逆时针），不靠肉眼猜。
  两个教材演示点：
       ① 改 v：圆跟着变大变小、转的快慢不变（ω = qB/m 与 v 无关）；
       ② 改 B：圆变小且转得更快（ω ∝ B）。
       所以画布半径按真实 r 缩放、转动快慢按真实 ω 缩放——画面与公式同源。
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
  /**
   * 是否显示 r / T 的数值读数与关系式（默认显示）。 传 false 的那一页（第 18 页）只做定性演示：既不给 r、T 的数值，也不给 r = mv/(qB)
   * 这类公式（那时还没学）；滑杆旁的 v、B 档位值不在此列——那是老师手里调的量，不是算出来的结果。
   */
  readout: { type: Boolean, default: true },
  /** 读数卡里只保留哪一项：''（默认）两项都给、'r' 只给半径、'T' 只给周期。 半径页 / 周期页各自只讲一条关系式，两项并排会分散注意力。 */
  readoutOnly: { type: String, default: "" },
});

const E = 1.6e-19; // 元电荷 C
const M_E = 9.11e-31; // 电子质量 kg
const Q = -E; // 电子带负电

/** 滑杆用整数档位（10 → 1.0、20 → 2.0）避免浮点误差：v 的档位单位 10⁶ m/s，B 的档位单位 mT */
const NOTCH_MIN = 10;
const NOTCH_MAX = 20;
const V_PER_NOTCH = 1e5; // 每档 0.1×10⁶ m/s
const B_PER_NOTCH = 1e-4; // 每档 0.1 mT

const vNotch = ref(NOTCH_MIN);
const bNotch = ref(NOTCH_MIN);
const bDir = ref("out"); // 'out' ⊙ 向外 | 'in' ⊗ 向里

const v = computed(() => vNotch.value * V_PER_NOTCH); // m/s
const B = computed(() => bNotch.value * B_PER_NOTCH); // T
const Bz = computed(() => (bDir.value === "out" ? 1 : -1));

/** 滑杆两端的参数极值（R 映射用，也顺带说明档位范围） */
const V_MIN = NOTCH_MIN * V_PER_NOTCH;
const V_MAX = NOTCH_MAX * V_PER_NOTCH;
const B_MIN = NOTCH_MIN * B_PER_NOTCH;
const B_MAX = NOTCH_MAX * B_PER_NOTCH;

/** 真实物理量 */
const rReal = computed(() => (M_E * v.value) / (Math.abs(Q) * B.value)); // m
const TReal = computed(() => (2 * Math.PI * M_E) / (Math.abs(Q) * B.value)); // s

/**
 * 画布半径（用户单位）：B 变大→圆变小、v 变大→圆变大（教材演示的定性结论）。
 *
 * ★ 两条坑： ① 旧版用 10 + 3.4·r，把默认的 5.69 mm 只画成 29 用户单位、占画布高 16%，后排看不见； ② 改成严格正比放大（R ∝ r）时，最小档只剩 20
 * 单位（16%），仍然是个点。
 *
 * 现在：把滑杆两端对应的真实半径区间 [m·v_min/(q·B_max), m·v_max/(q·B_min)] 仿射映射到 [76, 110] 用户 单位——
 * 单调、连续拖动时肉眼可辨（最小/最大差 1.45 倍），最小档也有画布高（250）的 30%，最大档直径 220 仍完整落在 viewBox 内（外加 v/F 标签也不出框）。
 * 精确半径由右侧读数给出（readout=false 的页面不给数值， 只要求看得出"变大 / 变小"）。
 */
const R_MIN_REAL = (M_E * V_MIN) / (Math.abs(Q) * B_MAX);
const R_MAX_REAL = (M_E * V_MAX) / (Math.abs(Q) * B_MIN);
const R_MIN = 76;
const R_MAX = 110;

const R = computed(() => {
  const t = (rReal.value - R_MIN_REAL) / (R_MAX_REAL - R_MIN_REAL);
  return R_MIN + (R_MAX - R_MIN) * t;
});

/** 真实角速度 ω = qB/m（rad/s）：只跟 B 有关、与 v 无关 —— "改 v 转得快慢不变"的物理来源 */
const omegaReal = computed(() => (Math.abs(Q) * B.value) / M_E);

/**
 * 屏幕角速度 = 真实 ω × 固定比例（纯演示节奏：B = 1.0 mT 时约 2.6 s 转一圈）。 乘的是同一个常数，所以屏幕上依旧"∝ B、与 v 无关"；方向取自
 * −q·B_z（不靠肉眼猜）。
 */
const OMEGA_SCREEN_SCALE = (2 * Math.PI) / 2.6 / ((Math.abs(Q) * 1e-3) / M_E);
const omega = computed(() => {
  const dir = -Q * Bz.value >= 0 ? 1 : -1;
  return dir * omegaReal.value * OMEGA_SCREEN_SCALE;
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

/** 滑杆旁显示的档位值：v 用 ×10⁶ m/s、B 用 mT，都是一位小数 */
const vDisplay = computed(() => (v.value / 1e6).toFixed(1));
const bDisplay = computed(() => (B.value * 1000).toFixed(1));

/**
 * 滑杆已走过的百分比，交给 CSS 变量 --co-pct 去染轨道左半段（原生 range 在深色底上几乎看不见）
 *
 * @param notch 当前档位
 * @returns 百分比（0 ~ 100）
 */
const pctOf = (notch) => ((notch - NOTCH_MIN) / (NOTCH_MAX - NOTCH_MIN)) * 100;
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
          <circle cx="28" cy="28" r="12" fill="none" stroke="var(--c-accent)" stroke-width="2.2" />
          <circle cx="28" cy="28" r="3" fill="var(--c-accent)" />
        </g>
        <g v-else>
          <circle cx="28" cy="28" r="12" fill="none" stroke="var(--c-accent)" stroke-width="2.2" />
          <line x1="20" y1="20" x2="36" y2="36" stroke="var(--c-accent)" stroke-width="2.2" />
          <line x1="36" y1="20" x2="20" y2="36" stroke="var(--c-accent)" stroke-width="2.2" />
        </g>
        <text
          x="28"
          y="58"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          fill="var(--c-accent)"
        >
          B
        </text>
        <!-- 轨迹圆 -->
        <circle
          :cx="CX"
          :cy="CY"
          :r="R"
          fill="none"
          stroke="color-mix(in srgb, var(--c-velocity) 35%, transparent)"
          stroke-width="2"
          stroke-dasharray="5 7"
        />
        <!-- 圆心 + 半径 -->
        <template v-if="radius">
          <circle :cx="CX" :cy="CY" r="3" fill="var(--c-neutral-300)" />
          <line
            :x1="CX"
            :y1="CY"
            :x2="dot.x"
            :y2="dot.y"
            stroke="color-mix(in srgb, var(--c-neutral-300) 70%, transparent)"
            stroke-width="1.8"
            stroke-dasharray="6 5"
          />
          <text
            :x="(CX + dot.x) / 2 + 7"
            :y="(CY + dot.y) / 2 - 7"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="var(--c-neutral-300)"
          >
            r
          </text>
        </template>
        <!-- v：切线方向 -->
        <CourseArrow
          :from="dot"
          :to="arrowEnd(vDir, 24)"
          stroke="var(--c-velocity)"
          stroke-width="3.4"
        />
        <text
          :x="arrowEnd(vDir, 34).x"
          :y="arrowEnd(vDir, 34).y + 5"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          fill="var(--c-velocity)"
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
            fill="var(--c-physics)"
          >
            <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
            <tspan dy="4" font-size="11">洛</tspan>
          </text>
        </template>
        <!-- 电子 -->
        <circle :cx="dot.x" :cy="dot.y" r="7.5" fill="var(--c-velocity)" />
        <line
          :x1="dot.x - 3.5"
          :y1="dot.y"
          :x2="dot.x + 3.5"
          :y2="dot.y"
          stroke="var(--c-bg-soft)"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="flex min-h-0 w-[17rem] shrink-0 flex-col justify-center gap-2">
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
        <div class="mb-1 flex items-baseline justify-between gap-2">
          <span class="whitespace-nowrap text-sm text-slate-400">速率 <Latex tex="v" /></span>
          <span class="whitespace-nowrap text-sm font-semibold text-sky-300">
            {{ vDisplay }} <Latex tex="\times 10^6\ \text{m/s}" />
          </span>
        </div>
        <input
          v-model.number="vNotch"
          type="range"
          :min="NOTCH_MIN"
          :max="NOTCH_MAX"
          step="1"
          class="co-range"
          :style="{ '--co-accent': '#3b82f6', '--co-pct': `${pctOf(vNotch)}%` }"
          aria-label="速率"
        />
      </div>

      <div>
        <div class="mb-1 flex items-baseline justify-between gap-2">
          <span class="whitespace-nowrap text-sm text-slate-400">
            磁感应强度 <Latex tex="B" />
          </span>
          <span class="whitespace-nowrap text-sm font-semibold text-amber-300">
            {{ bDisplay }} <Latex tex="\text{mT}" />
          </span>
        </div>
        <input
          v-model.number="bNotch"
          type="range"
          :min="NOTCH_MIN"
          :max="NOTCH_MAX"
          step="1"
          class="co-range"
          :style="{ '--co-accent': '#e2a846', '--co-pct': `${pctOf(bNotch)}%` }"
          aria-label="磁感应强度"
        />
      </div>

      <!-- r / T 读数：readout=false 的页面整块不渲染（连数字带公式一起没有）；readoutOnly 决定只留哪一项 -->
      <div v-if="readout" class="rounded-xl border border-slate-700/60 bg-slate-900/40 px-3 py-1.5">
        <div v-if="readoutOnly !== 'T'" class="text-lg">
          <Latex tex="r" /> =
          <span class="font-semibold" :class="emphasis === 'r' ? 'text-accent' : 'text-slate-200'">
            {{ rMM.toFixed(2) }} <Latex tex="\text{mm}" />
          </span>
        </div>
        <div v-if="readoutOnly !== 'r'" class="text-lg" :class="readoutOnly === 'T' ? '' : 'mt-1'">
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

<style scoped>
/* 深色底上的滑杆：原生外观几乎看不见，这里自己画轨道与滑块（颜色 / 进度由 --co-accent、--co-pct 传入） */
.co-range {
  --co-accent: #e2a846;
  --co-pct: 0%;

  width: 100%;
  height: 8px;
  border-radius: 9999px;

  background: linear-gradient(
    to right,
    var(--co-accent) 0%,
    var(--co-accent) var(--co-pct),
    rgb(148 163 184 / 28%) var(--co-pct),
    rgb(148 163 184 / 28%) 100%
  );
  outline: none;

  cursor: pointer;

  appearance: none;
}

/* Firefox：让上面这条渐变成为唯一的轨道，别被原生轨道盖住 */
.co-range::-moz-range-track {
  height: 8px;
  border-radius: 9999px;
  background: transparent;
}

.co-range::-webkit-slider-thumb {
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 3px solid var(--co-accent, #e2a846);
  border-radius: 50%;

  background: #f8fafc;
  box-shadow: 0 0 8px rgb(0 0 0 / 55%);

  appearance: none;
}

.co-range::-moz-range-thumb {
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 3px solid var(--co-accent, #e2a846);
  border-radius: 50%;

  background: #f8fafc;
  box-shadow: 0 0 8px rgb(0 0 0 / 55%);
}
</style>
