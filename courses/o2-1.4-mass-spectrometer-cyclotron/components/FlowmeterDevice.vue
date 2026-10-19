<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 电磁流量计（P19 原理 + 交互 / P20 例 5 题图）。
 *
 * 画面：一段水平圆形管道（立体画法：近端圆面 + 管身 + 远端圆弧），管身铺满「垂直纸面向里」的磁场阵列（裸 ×， 共享 <FieldDots>）；上、下管壁的电极 M、N
 * 用手画导线接到电压表（导线止于电表圆周，比例照 electronic-symbols 笔记）。 物理：导电液体以 v 沿管轴流动，正、负离子受洛伦兹力分别偏向 M、N 壁，稳定时 qU/D =
 * qvB ⇒ U = BDv； 流量 Q = (πD²/4)v = πDU/(4B)。U、Q 全在 computed 里按滑块实时算，不写死。 取舍：思路.md
 * 写「管壁左右两个电极」；但磁场阵列取「垂直纸面向里」、管轴水平时，洛伦兹力沿竖直方向， 电势差只出在垂直于 v 与 B 的那一对壁上（左、右壁与 v 平行，不会有电势差），故 M、N
 * 取上、下管壁。
 *
 * Mode="lab"（P19，step 由页面 :step="$clicks" 传入）：左图右栏——三个滑块 + U、Q 读数；step≥1 出正、负离子 偏转轨迹与贴壁堆积，step≥2
 * 出电压表读数与两壁电势高/低着色。mode="figure"（P20）只画结构，不画偏转与堆积。
 */
const { mode = "lab", step = 0 } = defineProps<{
  /** `"lab"` ＝ 原理交互页（P19）；`"figure"` ＝ 干净的题图（P20） */
  mode?: "figure" | "lab";
  /** 分步（lab 用）：0 结构 → 1 离子偏转与堆积 → 2 电压表读数 + 两壁电势着色 */
  step?: number;
}>();

/* ── 真实物理量（SIL 单位）：U = BDv、Q = πD²v/4 = πDU/(4B) ── */
const v = ref(0.02); // m/s
const B = ref(0.5); // T
const D = ref(0.2); // m

const U = computed(() => B.value * D.value * v.value);
const Q = computed(() => (Math.PI * D.value * U.value) / (4 * B.value));

/* ── 数字格式化 ── */
/** 去掉小数尾部多余的 0（"0.020" → "0.02"） */
const trim = (s: string): string => {
  if (!s.includes(".")) return s;
  const t = s.replace(/0+$/u, "").replace(/\.$/u, "");
  return t === "" || t === "-" ? "0" : t;
};

/** 科学计数法拆成尾数与指数：SVG 里嵌不了 KaTeX，上标用 tspan 画 */
const sciParts = (value: number, digits = 2): { mantissa: string; exponent: number } => {
  if (!Number.isFinite(value) || value === 0) return { mantissa: "0", exponent: 0 };
  let exponent = Math.floor(Math.log10(Math.abs(value)));
  let mantissa = Number((value / 10 ** exponent).toFixed(digits));
  if (Math.abs(mantissa) >= 10) {
    mantissa /= 10;
    exponent += 1;
  }
  const fixed = trim(mantissa.toFixed(digits));
  return { mantissa: fixed.includes(".") ? fixed : `${fixed}.0`, exponent };
};

const sciTex = (value: number, digits = 2): string => {
  const { mantissa, exponent } = sciParts(value, digits);
  return mantissa === "0" ? "0" : `${mantissa}\\times 10^{${exponent}}`;
};

/** 电压表读数：拆成「尾数＋指数＋单位」三段，空格写进字符串里（免得被格式化工具吃掉） */
const reading = computed(() => {
  const { mantissa, exponent } = sciParts(U.value);
  return { head: ` = ${mantissa}×10`, exponent: String(exponent), unit: " V" };
});

/* ── 读数与滑块 ── */
const uTex = computed(() => `U = BDv = ${sciTex(U.value)}\\ \\text{V}`);
const qTex = computed(
  () => `Q = \\frac{\\pi D U}{4B} = ${sciTex(Q.value)}\\ \\text{m}^3/\\text{s}`,
);

const sliders = computed(() => [
  {
    key: "v",
    labelTex: "v",
    value: v.value,
    display: `${trim(v.value.toFixed(3))}\\ \\text{m/s}`,
    min: 0.005,
    max: 0.1,
    step: 0.005,
    color: "var(--c-velocity)",
  },
  {
    key: "B",
    labelTex: "B",
    value: B.value,
    display: `${trim(B.value.toFixed(2))}\\ \\text{T}`,
    min: 0.2,
    max: 1,
    step: 0.05,
    color: "var(--c-field)",
  },
  {
    key: "D",
    labelTex: "D",
    value: D.value,
    display: `${trim(D.value.toFixed(2))}\\ \\text{m}`,
    min: 0.1,
    max: 0.4,
    step: 0.05,
    color: "var(--c-accent-2)",
  },
]);

const setSlider = (key: string, raw: string): void => {
  const n = Number(raw);
  if (!Number.isFinite(n)) return;
  if (key === "v") v.value = n;
  else if (key === "B") B.value = n;
  else D.value = n;
};

/* ── 画面几何（viewBox 660 × 275，宽扁图，配合页面「图区高度预算」）──
   管轴 y = 125；上、下壁 y = 73 / 177；近端圆面圆心 (110,125)、横半轴 22；远端圆心 x = 380。 */
const TOP_Y = 73;
const BOTTOM_Y = 177;
const X_NEAR = 110;
const X_FAR = 380;
const RX = 22; // 近端圆面横半轴（立体透视）
const RY = 52; // 管半径（竖直）

/** 管身轮廓：近端圆面左半 + 上下壁 + 远端圆弧 */
const pipePath = `M ${X_NEAR} ${TOP_Y} H ${X_FAR} A ${RX} ${RY} 0 0 1 ${X_FAR} ${BOTTOM_Y} H ${X_NEAR} A ${RX} ${RY} 0 0 1 ${X_NEAR} ${TOP_Y} Z`;
/** 近端圆面与管身的分界（右半圆，压在管身上、淡一档） */
const nearFacePath = `M ${X_NEAR} ${TOP_Y} A ${RX} ${RY} 0 0 1 ${X_NEAR} ${BOTTOM_Y}`;

/* ── 带电粒子的偏转轨迹（进入磁场区后 qvB 垂直 v，故轨迹向壁一侧弯） ── */
interface Pt {
  x: number;
  y: number;
}

/** 二次贝塞尔取点：用来在轨迹上摆离子小球 */
const quadPoint = (p0: Pt, c: Pt, p1: Pt, t: number): Pt => {
  const k = 1 - t;
  return {
    x: k * k * p0.x + 2 * k * t * c.x + t * t * p1.x,
    y: k * k * p0.y + 2 * k * t * c.y + t * t * p1.y,
  };
};

interface Trail {
  d: string;
  ions: Pt[];
}

const trail = (p0: Pt, c: Pt, p1: Pt): Trail => ({
  d: `M ${p0.x} ${p0.y} Q ${c.x} ${c.y} ${p1.x} ${p1.y}`,
  ions: [0.2, 0.45, 0.7, 0.9].map((t) => quadPoint(p0, c, p1, t)),
});

/** 正离子偏上壁（M，高电势）；负离子偏下壁（N，低电势），轨迹一直弯到电极处 */
const posTrail = trail({ x: 156, y: 120 }, { x: 200, y: 118 }, { x: 236, y: 84 });
const negTrail = trail({ x: 156, y: 130 }, { x: 200, y: 132 }, { x: 236, y: 166 });
/** 贴壁堆积的电荷记号横坐标 */
const pileX = [250, 264, 278, 292];

const MATH = "KaTeX_Math";
const MAIN = "KaTeX_Main";
</script>

<template>
  <div class="fm-wrap" :class="{ 'fm-wrap-figure': mode !== 'lab' }">
    <div class="fm-fig">
      <svg
        viewBox="0 0 660 275"
        class="fm-svg"
        :class="{ 'fm-svg-figure': mode !== 'lab' }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- 玻璃管：近端圆面 + 管身 + 远端圆弧（半透明液体填充） -->
        <path
          :d="pipePath"
          fill="color-mix(in srgb, var(--c-physics) 8%, transparent)"
          stroke="var(--c-neutral-300)"
          stroke-width="2.4"
          stroke-linejoin="round"
        />
        <path
          :d="nearFacePath"
          fill="none"
          stroke="var(--c-neutral-300)"
          stroke-width="1.6"
          opacity="0.45"
        />
        <!-- 管内的匀强磁场：垂直纸面向里（裸 ×，不套圈），中轴留出流体通道 -->
        <FieldDots :x="156" :y="94" :cols="12" :rows="2" :spacing="18" dir="in" :opacity="0.9" />
        <FieldDots :x="156" :y="138" :cols="12" :rows="2" :spacing="18" dir="in" :opacity="0.9" />
        <text
          x="368"
          y="100"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-field)"
          stroke="var(--c-bg-soft)"
          stroke-width="4"
          paint-order="stroke"
        >
          B
        </text>
        <!-- step≥1：正、负离子分别偏向 M、N 壁的弯曲轨迹（深色垫底，压在磁场记号之上也读得清） -->
        <g v-if="step >= 1" fill="none" stroke-linecap="round">
          <path :d="posTrail.d" stroke="var(--c-bg-soft)" stroke-width="6.5" opacity="0.8" />
          <path :d="negTrail.d" stroke="var(--c-bg-soft)" stroke-width="6.5" opacity="0.8" />
          <path :d="posTrail.d" stroke="var(--c-force)" stroke-width="2.6" stroke-dasharray="8 5" />
          <path
            :d="negTrail.d"
            stroke="var(--c-velocity)"
            stroke-width="2.6"
            stroke-dasharray="8 5"
          />
        </g>
        <g v-if="step >= 1">
          <circle
            v-for="(p, i) in posTrail.ions"
            :key="`fp-${i}`"
            :cx="p.x"
            :cy="p.y"
            r="3.4"
            fill="var(--c-force)"
          />
          <circle
            v-for="(p, i) in negTrail.ions"
            :key="`fn-${i}`"
            :cx="p.x"
            :cy="p.y"
            r="3.4"
            fill="var(--c-velocity)"
          />
        </g>
        <!-- step≥1：贴壁堆积的电荷（压在两壁的线上，深色垫底保证读得清） -->
        <g v-if="step >= 1" :font-family="MAIN" font-size="22" text-anchor="middle">
          <text
            v-for="(x, i) in pileX"
            :key="`pp-${i}`"
            :x="x"
            y="88"
            fill="var(--c-force)"
            stroke="var(--c-bg-soft)"
            stroke-width="4"
            paint-order="stroke"
          >
            +
          </text>
          <text
            v-for="(x, i) in pileX"
            :key="`pn-${i}`"
            :x="x"
            y="172"
            fill="var(--c-velocity)"
            stroke="var(--c-bg-soft)"
            stroke-width="4"
            paint-order="stroke"
          >
            −
          </text>
        </g>
        <!-- step≥2：两壁电势高 / 低着色（上壁 M 高、下壁 N 低） -->
        <g v-if="step >= 2" stroke-width="5" stroke-linecap="round">
          <line :x1="X_NEAR" :y1="TOP_Y" :x2="X_FAR" :y2="TOP_Y" stroke="var(--c-force)" />
          <line :x1="X_NEAR" :y1="BOTTOM_Y" :x2="X_FAR" :y2="BOTTOM_Y" stroke="var(--c-velocity)" />
        </g>
        <!-- 管壁电极 M（上）、N（下） -->
        <g stroke="var(--c-neutral-50)" stroke-width="5" stroke-linecap="round">
          <line x1="222" :y1="TOP_Y" x2="258" :y2="TOP_Y" />
          <line x1="222" :y1="BOTTOM_Y" x2="258" :y2="BOTTOM_Y" />
        </g>
        <text
          x="214"
          y="61"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-text)"
        >
          M
        </text>
        <text
          x="214"
          y="191"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-text)"
        >
          N
        </text>
        <!-- 导线：自两电极引出，止于电压表圆周（圆 r=16，端点 (604,99) / (604,131)） -->
        <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
          <path d="M 240 73 V 30 H 588 V 109" />
          <path d="M 240 177 V 219 H 588 V 141" />
        </g>
        <CircuitMeter :x="588" :y="125" kind="v" />
        <text
          v-if="step < 2"
          x="562"
          y="134"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-accent)"
        >
          U
        </text>
        <text v-else x="588" y="255" text-anchor="middle" font-size="21" fill="var(--c-accent)">
          <tspan :font-family="MATH" font-style="italic">U</tspan>
          <tspan :font-family="MAIN">{{ reading.head }}</tspan>
          <tspan :font-family="MAIN" font-size="16" dy="-7">{{ reading.exponent }}</tspan>
          <tspan :font-family="MAIN" dy="7">{{ reading.unit }}</tspan>
        </text>
        <!-- 直径 D：与上、下管壁等高的双箭头尺寸标注 -->
        <g stroke="var(--c-text-dim)" stroke-width="2" fill="var(--c-text-dim)">
          <line x1="405" y1="80" x2="405" y2="170" stroke-linecap="round" />
          <polygon points="405,73 398,87 412,87" stroke="none" />
          <polygon points="405,177 398,163 412,163" stroke="none" />
        </g>
        <text
          x="417"
          y="140"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-text-dim)"
        >
          D
        </text>
        <!-- 液体流动方向 -->
        <CourseArrow
          :from="{ x: 18, y: 125 }"
          :to="{ x: 86, y: 125 }"
          stroke="var(--c-velocity)"
          :stroke-width="3.4"
        />
        <text
          x="52"
          y="106"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          font-size="26"
          fill="var(--c-velocity)"
          stroke="var(--c-bg-soft)"
          stroke-width="4"
          paint-order="stroke"
        >
          v
        </text>
      </svg>
    </div>

    <!-- 交互栏：只在 lab（P19）出现 -->
    <div v-if="mode === 'lab'" class="fm-panel">
      <div class="fm-sliders">
        <div v-for="s in sliders" :key="s.key" class="fm-slider">
          <div class="fm-slider-head">
            <span class="fm-slider-name" :style="{ color: s.color }">
              <Latex :tex="s.labelTex" />
            </span>
            <span class="fm-slider-val" :style="{ color: s.color }">
              <Latex :tex="s.display" />
            </span>
          </div>
          <input
            type="range"
            class="fm-range"
            :min="s.min"
            :max="s.max"
            :step="s.step"
            :value="s.value"
            :style="{ accentColor: s.color }"
            @input="setSlider(s.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <div class="fm-readouts">
        <div class="fm-readout">
          <Latex :tex="uTex" />
        </div>
        <div class="fm-readout fm-readout-q">
          <Latex :tex="qTex" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fm-wrap {
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.fm-wrap-figure {
  width: max-content;
  max-width: 100%;
}

.fm-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.fm-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 题图（P20）：图栏按图自身宽度收，给出显式宽度才能吃满 42% 的图栏 */
.fm-svg-figure {
  width: 620px;
  max-width: 100%;
}

.fm-panel {
  display: flex;
  flex: 0 0 320px;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.fm-sliders {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.fm-slider {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.fm-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.fm-slider-name {
  font-weight: 700;
}

.fm-slider-val {
  font-weight: 800;
  font-size: 0.85rem;
  white-space: nowrap;
}

.fm-range {
  width: 100%;
  height: 1rem;
  cursor: pointer;
}

.fm-readouts {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.fm-readout {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  font-size: 0.85rem;
  line-height: 1.5;
}

.fm-readout-q {
  border-color: var(--c-accent-2);
}
</style>
