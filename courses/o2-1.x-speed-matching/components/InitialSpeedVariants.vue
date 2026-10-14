<!--
  选必2 1.x《复合场中的配速法与摆线运动》「任意初速度」页的交互图（初速度方向可以是任意的）。

  任何方向的初速度都拆成两笔账：v_平 = mg/(qB)（永远水平向右）＋ v_圆0 = v_初 − v_平。
  轨迹 = 匀速直线漂移 + 匀速圆周（圆心以 v_平 匀速右移）：
    x(θ) = kx·θ + ky·[1 − cos θ]
    y(θ) = ky·θ + kx·(1 − cos θ) − kx²·θ   （向下为正；kx、ky 以 v_平 为单位）
  其中 |v_圆0| = √((kx−1)² + ky²)，R ∝ |v_圆0|/v_平；θ = ωt 取 2 个周期。

  两个滑杆分别给初速度的向右分量（vx）与向上分量（vy）：
    vy = 0、vx 变化 ⟹ 原来的水平初速度一族（匀速直线 / 波浪线 / 尖点摆线 / 结环摆线）；
    vy ≠ 0 ⟹ 斜向初速度，轨迹整体倾斜，同样由"漂移 + 圆周"合成。
  画布 1 个单位 = 1R；窗口 x∈[−4, 12]、y∈[−5.5, 1]，两向都有余量，箭头与轨迹不出画布。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const W = 1000;
const H = 340;
/** 1 个单位（= R）画多少像素 */
const K = 35;
/** 出发点在画布上的位置（四周都留出轨迹向左 / 向上 / 向下的余量） */
const SX = 100;
const CY = 100;

const px = (x: number): number => SX + x * K;
/** 世界 y 向上为正 ⟹ 屏幕 y 向下，故取负号 */
const py = (y: number): number => CY - y * K;

/** 初速度的两个分量（单位是 v_平）：x 向右为正、y 向上为正 */
const kx = ref(0);
const ky = ref(0);
/** 圆周分速度 v_圆0 = v_初 − v_平（世界坐标，y 向上为正） */
const wx = computed(() => kx.value - 1);
const wy = computed(() => ky.value);
/** R = |v_圆0| / v_平（1 个单位 = 1R） */
const R = computed(() => Math.hypot(wx.value, wy.value));

/** 数值积分：固定时间步长（小步长保证精度与稳定）；**画 3 个周期**，轨迹自然甩出画布被裁掉 */
const DT = 0.01;
const PERIOD = 2 * Math.PI;
const T_TOTAL = 3 * PERIOD;
const STEPS = Math.round(T_TOTAL / DT);

/**
 * 直接按定义数值积分（不再手推解析解，避免符号搞反）。 世界坐标：x 向右为正、y 向上为正、z 指向纸外；B 垂直纸面向里 ⟹ B = −B ẑ；小球带正电； 取 qB/m = 1、g =
 * 1（1 个单位 = v_平 = mg/(qB)）。 F = qv×B = q( v_x x̂ + v_y ŷ )×(−B ẑ)；而 ŷ×ẑ = x̂、x̂×ẑ = −ŷ， 故 F = qB(
 * −v_y x̂ + v_x ŷ ) ⟹ a = ( −v_y , v_x )，再加重力 (0, −1)： a = ( −v_y , v_x − 1 ) ⚠️ 这里的负号最容易写反：静止释放时 a
 * = (0, −1) 先向下，随后 v_y < 0 ⟹ a_x = −v_y > 0， 小球立刻**向右偏**（与标准结论"正电荷在向里的磁场中下落向右偏"一致）。
 * 返回整条轨迹的采样点（世界坐标，y 向上为正）。
 */
const trace = computed<{ x: number; y: number }[]>(() => {
  let x = 0;
  let y = 0;
  let vx = kx.value;
  let vy = ky.value;
  const out: { x: number; y: number }[] = [{ x: 0, y: 0 }];

  for (let i = 0; i < STEPS; i++) {
    // a = ( −v_y , v_x ) + (0, −1)
    const ax = -vy;
    const ay = vx - 1;

    vx += ax * DT;
    vy += ay * DT;
    x += vx * DT;
    y += vy * DT;
    out.push({ x, y });
  }

  return out;
});

const pathD = computed(() =>
  trace.value
    .map((p, i) => `${i === 0 ? "M" : "L"} ${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`)
    .join(" "),
);

const START = { x: px(0), y: py(0) };

/* ── 小球沿轨迹循环运动：让"两笔账的合成"动起来看 ── */
const CYCLE_MS = 9000;
const head = ref(0);
let frame = 0;
let t0 = 0;
const tick = (now: number): void => {
  if (t0 === 0) t0 = now;
  head.value = ((now - t0) / CYCLE_MS) % 1;
  frame = requestAnimationFrame(tick);
};
onMounted(() => {
  frame = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  if (frame !== 0) cancelAnimationFrame(frame);
});

const ball = computed(() => {
  const list = trace.value;
  const p = list[Math.min(list.length - 1, Math.floor(head.value * list.length))] ?? { x: 0, y: 0 };

  return { x: px(p.x), y: py(p.y) };
});

/** 漂移（轮心）线：圆周运动圆心所在的水平线（世界 y = −wx/R） */
const driftY = computed(() => -wx.value / Math.max(R.value, 1e-9));

/** 初速度箭头：显示比例 1.2，长度严格正比于 v_初 */
const V_SCALE = 1.2;
const vInit = computed(() => ({
  x: START.x + kx.value * K * V_SCALE,
  y: START.y - ky.value * K * V_SCALE,
}));

/** 轨迹形态：只由 |v_圆0| / v_平 决定 */
const regime = computed(() => {
  if (R.value < 1e-6) return { name: "匀速直线", note: "洛伦兹力恰好抵消重力" };
  if (Math.abs(R.value - 1) < 1e-6)
    return { name: "尖点摆线", note: "最低点速度为零，尖点落在出发水平线上" };
  if (R.value < 1) return { name: "波浪线", note: "漂移压过转动，全程向前、没有尖点" };
  return { name: "结环摆线", note: "转动压过漂移，最高处向左折返打圈" };
});

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.5, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="isv">
    <div class="isv-stage">
      <svg :viewBox="`0 0 ${W} ${H}`" class="isv-svg">
        <!-- 匀强磁场：裸 × 铺满（黄） -->
        <FieldDots
          :x="20"
          :y="16"
          :cols="17"
          :rows="6"
          :spacing="56"
          :size="6"
          :line-width="2"
          :opacity="0.3"
          dir="in"
        />
        <!-- 出发水平线（v_平 的那条基准线） -->
        <path
          :d="`M 12 ${py(0)} H ${W - 12}`"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="8 7"
          opacity="0.5"
        />
        <!-- 漂移线（圆周运动的圆心所在水平线） -->
        <path
          v-if="R > 0.02"
          :d="`M 12 ${py(driftY)} H ${W - 12}`"
          stroke="var(--c-velocity)"
          stroke-width="1.4"
          stroke-dasharray="3 6"
          opacity="0.5"
        />
        <!-- 轨迹 -->
        <path
          :d="pathD"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          stroke-linecap="round"
        />
        <!-- 出发点 -->
        <circle
          :cx="START.x"
          :cy="START.y"
          r="4.5"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2"
        />
        <!-- 初速度（方向任意） -->
        <g v-if="Math.hypot(kx, ky) > 0.03">
          <CourseArrow
            :from="START"
            :to="vInit"
            stroke="var(--c-velocity)"
            :stroke-width="4.6"
            :head-size="15"
          />
          <text
            :x="vInit.x + (vInit.x >= START.x ? 10 : -10)"
            :y="vInit.y - 10"
            font-size="17"
            :text-anchor="vInit.x >= START.x ? 'start' : 'end'"
            fill="var(--c-velocity)"
            font-family="KaTeX_Math"
            font-style="italic"
            :style="HALO"
          >
            v
            <tspan font-family="KaTeX_Main" font-size="11.5" dy="4">初</tspan>
          </text>
        </g>
        <!-- 小球 -->
        <circle
          :cx="ball.x"
          :cy="ball.y"
          r="8"
          fill="var(--c-surface-solid)"
          stroke="var(--c-force)"
          stroke-width="2.4"
        />
      </svg>
    </div>

    <div class="isv-bar">
      <label class="isv-row">
        <span class="isv-name">向右分量</span>
        <input
          v-model.number="kx"
          class="isv-slider"
          type="range"
          min="-1.5"
          max="1.5"
          step="0.05"
        />
        <span class="isv-val">{{ kx.toFixed(2) }}</span>
      </label>
      <label class="isv-row">
        <span class="isv-name">向上分量</span>
        <input
          v-model.number="ky"
          class="isv-slider"
          type="range"
          min="-1.5"
          max="1.5"
          step="0.05"
        />
        <span class="isv-val">{{ ky.toFixed(2) }}</span>
      </label>
      <div class="isv-read">
        <span class="isv-item">
          <Latex tex="|v_{\text{圆0}}| / v_{\text{平}} = " />
          <strong>{{ R.toFixed(2) }}</strong>
        </span>
        <span class="isv-tag">{{ regime.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.isv {
  width: 100%;
}

/* 舞台：给图一个固定的高度预算，宽度按 viewBox 比例走
   ⟹ 图再也不会横着撑满整屏、滑动条一定留在画布内 */
.isv-stage {
  display: flex;
  align-items: center;
  justify-content: center;

  height: min(300px, 34vh);
}

.isv-svg {
  display: block;

  width: 100%;
  max-width: 100%;
  height: 100%;
}

.isv-bar {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  max-width: 100%;
  margin: 0.35rem auto 0;
}

.isv-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.isv-name {
  flex: 0 0 auto;

  width: 5.5rem;

  color: var(--c-text-dim);

  font-size: 0.95rem;
}

.isv-val {
  flex: 0 0 auto;

  width: 3rem;

  color: var(--c-text);
  font-size: 0.95rem;
  text-align: right;
}

.isv-slider {
  flex: 1 1 auto;
  min-width: 0;
  accent-color: var(--c-accent);
  cursor: pointer;
}

.isv-read {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;

  color: var(--c-text-dim);

  font-size: 0.95rem;
}

.isv-item strong {
  color: var(--c-text);
}

.isv-tag {
  margin-left: auto;
  padding: 0.1rem 0.7rem;
  border: 1px solid var(--c-accent);
  border-radius: 999px;

  color: var(--c-accent);
  font-size: 0.95rem;
}
</style>
