<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * 荡秋千：讲"最高点速度为 0，但加速度不为 0"。
 *
 * 物理：单摆模型，摆长 L = 2.5 m、最大摆角 θ₀ = 30°（对竖直方向）、g = 9.8 m/s²，运动方程 θ'' = −(g/L)·sinθ。 30° 不满足小角度近似，所以用
 * velocity-Verlet 数值积分（固定步长 dt = 1/240 s、按 rAF 的真实时间累积推进）， 能量不漂移、长时间来回摆动不发散。 由 θ 得：角速度 θ'；速率 v =
 * L·|θ'|；切向加速度 a_t = g·sinθ（方向沿切线指向最低点）。 最高点 v = 0 ⇒ 向心分量为 0 ⇒ 加速度恰好沿切线、大小 g·sinθ₀ = 4.9 m/s²。 所以 a
 * 箭头**只在最高点附近（|θ| ≥ 0.9θ₀）显示**：摆动中段 / 最低点画切向 a 是错的 （最低点的真实加速度是竖直向上的向心加速度，本课还没学圆周运动）。
 *
 * 触发方式：点组件本身开始摆动，再点暂停（保持当前角度与读数），再点继续；不占老师翻页的点击。 SVG 的 viewBox 固定，动画只改元素属性，页面布局不会被顶动。
 */

interface Vec {
  x: number;
  y: number;
}

/** ── 物理参数 ───────────────────────────── */
const GRAVITY = 9.8;
const LENGTH = 2.5;
/** 最大摆角 30° */
const THETA0 = Math.PI / 6;
/** 固定积分步长 */
const STEP = 1 / 240;
/** 最低点速率（能量守恒精确值）：√(2gL(1−cosθ₀)) ≈ 2.56 m/s，小角度估算 L·θ₀·√(g/L) ≈ 2.59 m/s */
const V_BOTTOM = Math.sqrt(2 * GRAVITY * LENGTH * (1 - Math.cos(THETA0)));

/**
 * ── 画面尺寸（viewBox 固定：58 10 344 208，坐标系绕悬点 PIVOT 建立） ── 组件最终放在约 420 px 宽的半栏里：viewBox 宽 344 ⇒ 缩放比约
 * 1.2、高约 254 px， 图内 22 单位的 v / a 标注渲染出来约 26 px（后排看得清）。 摆长只在画面上取 150 单位（不是 2.5 m 的等比缩放），物理仍严格用 L =
 * 2.5 m。
 */
const PIVOT: Vec = { x: 230, y: 26 };
/** 摆长对应的用户单位（画面示意，不按比例） */
const L_PX = 150;
/** 双绳在座板两端的半间距 */
const ROPE_HALF = 16;
/** 座板半宽 */
const SEAT_HALF = 22;
/** 支架横梁半长、立柱底端高度、立柱外移量 */
const BEAM_HALF = 118;
const LEG_BOTTOM = 190;
const LEG_OUT = 34;
/** 加速度箭头比例：7 用户单位 / (m/s²)，最高点 4.9 m/s² → 约 34 单位 */
const A_SCALE = 7;
/** 速率箭头最大长度（对应 V_BOTTOM，最低点处最醒目） */
const V_ARROW_MAX = 56;

/** ── 状态 ──────────────────────────────── */
const theta = ref(THETA0);
const omega = ref(0);
const running = ref(false);
const started = ref(false);

let frame = 0;
let lastTime = 0;
let carry = 0;

// 一步 velocity-Verlet：θ'' = −(g/L)·sinθ
const integrate = (dt: number): void => {
  const accel = -(GRAVITY / LENGTH) * Math.sin(theta.value);
  theta.value += omega.value * dt + 0.5 * accel * dt * dt;
  const accelNext = -(GRAVITY / LENGTH) * Math.sin(theta.value);
  omega.value += 0.5 * (accel + accelNext) * dt;
};

// rAF：按真实时间累积，满一个固定步长就积分一步（切换标签回来时最多补 0.1 s）
const tick = (now: number): void => {
  if (!running.value) return;
  const elapsed = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;
  carry += elapsed;
  let steps = 0;
  while (carry >= STEP && steps < 200) {
    integrate(STEP);
    carry -= STEP;
    steps += 1;
  }
  frame = requestAnimationFrame(tick);
};

const toggle = (): void => {
  cancelAnimationFrame(frame);
  if (running.value) {
    running.value = false;
    frame = 0;
    return;
  }
  started.value = true;
  running.value = true;
  lastTime = performance.now();
  carry = 0;
  frame = requestAnimationFrame(tick);
};

onUnmounted(() => {
  cancelAnimationFrame(frame);
});

/** ── 读数 ──────────────────────────────── */
const thetaDeg = computed(() => (theta.value * 180) / Math.PI);
const thetaText = computed(() => thetaDeg.value.toFixed(1));
const speed = computed(() => LENGTH * Math.abs(omega.value));
const speedText = computed(() => speed.value.toFixed(2));
/** 切向加速度大小 a_t = g·|sinθ|（最高点 = g·sinθ₀ = 4.9 m/s²） */
const tangentAccel = computed(() => GRAVITY * Math.abs(Math.sin(theta.value)));
/** |θ| / θ₀ */
const amplitudeRatio = computed(() => Math.abs(theta.value) / THETA0);
/** 是否处于最高点附近（a 箭头与"最高点附近"提示语的出现范围） */
const nearTop = computed(() => amplitudeRatio.value >= 0.9);
/** 真正接近最高点（速率已经小到可以讲"v = 0"）：|v| ≤ 0.2 m/s */
const atTop = computed(() => speed.value <= 0.2);
/** 0.9θ₀ → θ₀ 之间淡入 */
const aOpacity = computed(() => Math.min(1, Math.max(0, (amplitudeRatio.value - 0.9) / 0.05)));
/** 速率很小时不画 v 箭头 */
const vVisible = computed(() => speed.value > 0.3);

// ── 几何 ────────────────────────────────
const polar = (angle: number, radius: number): Vec => ({
  x: PIVOT.x + radius * Math.sin(angle),
  y: PIVOT.y + radius * Math.cos(angle),
});

const shift = (from: Vec, dir: Vec, dist: number): Vec => ({
  x: from.x + dir.x * dist,
  y: from.y + dir.y * dist,
});

/** 摆球（座板中心）位置 */
const bob = computed<Vec>(() => polar(theta.value, L_PX));
/** 切向单位矢量（θ 增大的方向）：d/dθ (sinθ, cosθ) = (cosθ, −sinθ) */
const tangentUnit = computed<Vec>(() => ({ x: Math.cos(theta.value), y: -Math.sin(theta.value) }));
/** 沿绳由悬点指向座板的单位矢量 */
const radialUnit = computed<Vec>(() => ({ x: Math.sin(theta.value), y: Math.cos(theta.value) }));

/** 摆动轨迹：按要求的角度范围采样成折线，保证弧线一定经过最低点 */
const arcPoints = computed<string>(() => {
  const steps = 48;
  const list: string[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const point = polar(-THETA0 + (2 * THETA0 * i) / steps, L_PX);

    list.push(`${point.x.toFixed(2)},${point.y.toFixed(2)}`);
  }

  return list.join(" ");
});

const topLeft = computed<Vec>(() => polar(-THETA0, L_PX));
const topRight = computed<Vec>(() => polar(THETA0, L_PX));

/** 摆绳 / 座板 / 小人都画在随 θ 旋转的坐标系里（局部 x 轴 = 切向，−y 轴 = 沿绳向上） */
const ropeTransform = computed(
  () => `translate(${PIVOT.x} ${PIVOT.y}) rotate(${(-thetaDeg.value).toFixed(2)})`,
);

/** V 箭头：沿切线，长度正比于 |v|，方向随 θ' 变号 */
const vSign = computed(() => (omega.value >= 0 ? 1 : -1));
const vLength = computed(() => Math.min(speed.value / V_BOTTOM, 1) * V_ARROW_MAX);
const vTail = computed<Vec>(() => shift(bob.value, radialUnit.value, 15));
const vTip = computed<Vec>(() =>
  shift(vTail.value, tangentUnit.value, vSign.value * vLength.value),
);
const vLabel = computed<Vec>(() =>
  shift(
    shift(vTail.value, tangentUnit.value, (vSign.value * vLength.value) / 2),
    radialUnit.value,
    14,
  ),
);

/** A 箭头：只在最高点附近出现，沿切线指向最低点，长度正比于 g·sinθ */
const aSign = computed(() => (theta.value >= 0 ? -1 : 1));
const aLength = computed(() => tangentAccel.value * A_SCALE);
const aTail = computed<Vec>(() => shift(bob.value, tangentUnit.value, aSign.value * 9));
const aTip = computed<Vec>(() =>
  shift(aTail.value, tangentUnit.value, aSign.value * aLength.value),
);
const aLabel = computed<Vec>(() =>
  shift(shift(aTip.value, tangentUnit.value, aSign.value * 8), radialUnit.value, 14),
);
</script>

<template>
  <div class="swing-wrap" @click="toggle">
    <svg
      class="swing-svg"
      viewBox="58 18 344 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="荡秋千：最高点速率为 0，加速度不为 0"
    >
      <!-- 支架 -->
      <g stroke="rgba(148, 163, 184, 0.5)" stroke-width="7" stroke-linecap="round">
        <line
          :x1="PIVOT.x - BEAM_HALF + 4"
          :y1="PIVOT.y"
          :x2="PIVOT.x - BEAM_HALF - LEG_OUT"
          :y2="LEG_BOTTOM"
        />
        <line
          :x1="PIVOT.x + BEAM_HALF - 4"
          :y1="PIVOT.y"
          :x2="PIVOT.x + BEAM_HALF + LEG_OUT"
          :y2="LEG_BOTTOM"
        />
      </g>
      <line
        :x1="PIVOT.x - BEAM_HALF"
        :y1="PIVOT.y"
        :x2="PIVOT.x + BEAM_HALF"
        :y2="PIVOT.y"
        stroke="#94a3b8"
        stroke-width="8"
        stroke-linecap="round"
      />
      <circle :cx="PIVOT.x" :cy="PIVOT.y" r="4.5" fill="#cbd5e1" />
      <!-- 摆动轨迹与两侧最高点 -->
      <polyline
        :points="arcPoints"
        fill="none"
        stroke="rgba(148, 163, 184, 0.35)"
        stroke-width="1.6"
      />
      <line
        :x1="PIVOT.x"
        :y1="PIVOT.y"
        :x2="PIVOT.x"
        :y2="PIVOT.y + L_PX"
        stroke="rgba(148, 163, 184, 0.28)"
        stroke-width="1.2"
        stroke-dasharray="4 6"
      />
      <line
        :x1="PIVOT.x"
        :y1="PIVOT.y"
        :x2="topLeft.x"
        :y2="topLeft.y"
        stroke="rgba(226, 168, 70, 0.5)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
      />
      <line
        :x1="PIVOT.x"
        :y1="PIVOT.y"
        :x2="topRight.x"
        :y2="topRight.y"
        stroke="rgba(226, 168, 70, 0.5)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
      />
      <circle
        :cx="topLeft.x"
        :cy="topLeft.y"
        r="3.5"
        fill="none"
        stroke="rgba(226, 168, 70, 0.75)"
        stroke-width="1.4"
      />
      <circle
        :cx="topRight.x"
        :cy="topRight.y"
        r="3.5"
        fill="none"
        stroke="rgba(226, 168, 70, 0.75)"
        stroke-width="1.4"
      />
      <!-- 秋千（整体绕悬点旋转） -->
      <g :transform="ropeTransform">
        <line x1="0" y1="0" :x2="-ROPE_HALF" :y2="L_PX" stroke="#cbd5e1" stroke-width="1.6" />
        <line x1="0" y1="0" :x2="ROPE_HALF" :y2="L_PX" stroke="#cbd5e1" stroke-width="1.6" />
        <rect
          :x="-SEAT_HALF"
          :y="L_PX - 3"
          :width="SEAT_HALF * 2"
          height="6"
          rx="3"
          fill="#94a3b8"
        />
        <line
          x1="0"
          :y1="L_PX - 44"
          x2="0"
          :y2="L_PX - 8"
          stroke="#60a5fa"
          stroke-width="10"
          stroke-linecap="round"
        />
        <path
          :d="`M 0 ${L_PX - 38} L ${-ROPE_HALF} ${L_PX - 33}`"
          fill="none"
          stroke="#60a5fa"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <path
          :d="`M 0 ${L_PX - 38} L ${ROPE_HALF} ${L_PX - 33}`"
          fill="none"
          stroke="#60a5fa"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <circle cx="0" :cy="L_PX - 55" r="9.5" fill="#93c5fd" />
      </g>
      <!-- v 箭头：沿切线，|v| 很小时不画 -->
      <g v-if="vVisible">
        <CourseArrow :from="vTail" :to="vTip" :head-size="12" stroke="#e2a846" stroke-width="3.2" />
        <text
          :x="vLabel.x"
          :y="vLabel.y + 4"
          text-anchor="middle"
          font-size="22"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#e2a846"
          stroke="#0f1425"
          stroke-width="5"
          paint-order="stroke"
        >
          v
        </text>
      </g>
      <!-- a 箭头：只在最高点附近（|θ| ≥ 0.9θ₀）显示，此时沿切线指向最低点是严格正确的 -->
      <g v-if="nearTop" :opacity="aOpacity">
        <CourseArrow :from="aTail" :to="aTip" :head-size="12" stroke="#f87171" stroke-width="3.2" />
        <text
          :x="aLabel.x"
          :y="aLabel.y + 4"
          text-anchor="middle"
          font-size="22"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#f87171"
          stroke="#0f1425"
          stroke-width="5"
          paint-order="stroke"
        >
          a
        </text>
      </g>
    </svg>
    <div class="swing-readout">
      <div class="swing-metrics">
        <div class="swing-metric">
          <span class="swing-metric-label">摆角 θ</span>
          <span class="swing-metric-value">{{ thetaText }}</span>
          <span class="swing-metric-unit">°</span>
        </div>
        <div class="swing-metric">
          <span class="swing-metric-label">速率 v</span>
          <span class="swing-metric-value swing-metric-value-v">{{ speedText }}</span>
          <span class="swing-metric-unit">m/s</span>
        </div>
      </div>
      <div class="swing-status" :class="{ 'swing-status-top': nearTop }">
        <span v-if="atTop">最高点：v = 0，a ≠ 0（沿切线指向最低点）</span>
        <span v-else-if="nearTop">最高点附近：v 越来越小，而 a ≠ 0</span>
        <span v-else-if="running">摆动中：越靠近最低点 v 越大，越靠近最高点 v 越小</span>
        <span v-else>已暂停：v 沿切线方向，指向运动方向</span>
      </div>
      <div class="swing-hint">
        <span v-if="!started">点一下，把秋千放开</span>
        <span v-else-if="running">点一下暂停</span>
        <span v-else>点一下继续</span>
      </div>
      <div class="swing-params">摆长 L = 2.5 m ｜ 最大摆角 30°</div>
    </div>
  </div>
</template>

<style scoped>
/* 宽度写死：容器宽度若跟着读数/状态文字变宽变窄，SVG 的 width:100% 会跟着缩放 —— 秋千会疯狂忽大忽小 */
.swing-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  max-width: 420px;

  cursor: pointer;
  user-select: none;
}

.swing-svg {
  display: block;

  width: 100%;
  min-width: 0;
  max-width: 420px;
  height: auto;
}

/* 读数面板放在图**下面**（半栏只有约 420 px 宽，横向排会把图挤没） */
.swing-readout {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.25rem;

  width: 100%;
  min-width: 0;
  max-width: 420px;
  padding: 0.4rem 0.65rem;
  border: 1px solid rgb(148 163 184 / 16%);
  border-radius: 1rem;

  background: rgb(15 20 37 / 42%);

  font-size: 0.88rem;
}

.swing-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  min-width: 0;
}

/* 列宽固定（不用 auto）：读数位数变化不会改变行宽，也就不会推动整体布局 */
.swing-metric {
  display: grid;
  grid-template-columns: 3.4rem 3.6rem 2.2rem;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: start;

  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.swing-metric-label {
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.78rem;
}

.swing-metric-value {
  color: var(--c-text, #f1f5f9);
  font-weight: 700;
  text-align: right;
}

.swing-metric-value-v {
  color: #e2a846;
}

.swing-metric-unit {
  padding-left: 0.4rem;
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.78rem;
}

/* 高度按"两行文案"预留死：文案从一行变两行时面板高度不变，整页不会抖 */
.swing-status {
  display: flex;
  align-items: center;

  min-height: 2.5rem;
  padding: 0.2rem 0.5rem;
  border-left: 3px solid rgb(148 163 184 / 40%);
  border-radius: 0.45rem;

  background: rgb(148 163 184 / 8%);
  color: var(--c-text-dim, #94a3b8);

  font-size: 0.72rem;
  line-height: 1.3;

  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.swing-status-top {
  border-left-color: #f87171;
  background: rgb(248 113 113 / 12%);
  color: var(--c-text, #f1f5f9);
}

.swing-hint {
  min-height: 1.1rem;
  color: rgb(226 168 70 / 90%);
  font-size: 0.78rem;
  white-space: nowrap;
}

.swing-params {
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.72rem;
  white-space: nowrap;
}
</style>
