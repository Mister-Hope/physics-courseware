<script setup lang="ts">
import { computed } from "vue";

/**
 * 第一课时（地面参考系辨析）演示：车厢里的**火柴人**（线框画风）斜杵在栏杆上，用手向前推栏杆。
 *
 * - Mode="uniform"：车以 v₀ = 4 m/s 匀速前进
 * - Mode="accelerate"：车从静止起以 a = 4 m/s² 匀加速 全部按真实公式计算（不拍脑袋）： 位移 x —— 匀速 x = v₀t；匀加速 x = ½at²（t = 2 s
 *   ⇒ 两页都是 8 m） 手对车做功 W_手 = Fx（F = 100 N） 人受地板的摩擦力 F_f = F + ma（匀速 a = 0 ⇒ 100 N；匀加速 ⇒ 300
 *   N）；脚对地板的力与它等大反向 脚对车做功 W_脚 = −F_f·x；人对车做功 W_人 = W_手 + W_脚（人的两个作用力做功的代数和） 分步：step ≥ 1
 *   出位移与手做功；step ≥ 2 出脚的作用力与人对车的总功。 版面：整车画成一个正常侧视公交车——两扇大车窗、一道前门、前轮 1 个 + 后轮 2 个；
 *   车窗描边调淡（不跟人和栏杆抢视线）；车轮上半部用裙板挡住；整图缩 0.88 倍、viewBox 780×316。
 */
const { mode = "uniform", step = 0 } = defineProps<{
  mode?: "uniform" | "accelerate";
  /** 当前点击步数（页面传 $clicks） */
  step?: number;
}>();

const M = 50; // 人的质量（kg）
const F_PUSH = 100; // 手推栏杆的力（N）
const V0 = 4; // 匀速时的车速（m/s）
const A = 4; // 匀加速时的加速度（m/s²）
const T = 2; // 时间（s）
const PX_PER_N = 0.7; // 力的箭头长度比例：100 N ↔ 70 用户单位

const accel = computed(() => (mode === "accelerate" ? A : 0));
/** 车的位移：匀速 x = v₀t；匀加速（从静止）x = ½at² */
const x = computed(() => (mode === "accelerate" ? 0.5 * A * T * T : V0 * T));
/** 人受地板的摩擦力 F_f = F + ma */
const footForce = computed(() => F_PUSH + M * accel.value);
const wHand = computed(() => F_PUSH * x.value);
const wFoot = computed(() => -footForce.value * x.value);
const wPerson = computed(() => wHand.value + wFoot.value);

/** 手与栏杆的接触点（推力 F 的作用点） */
const HAND = { x: 600, y: 168 };
const handTip = computed(() => ({ x: HAND.x + F_PUSH * PX_PER_N, y: HAND.y }));
/** 脚与地板的接触点：脚对地板的力向后画在车厢底线下 4 单位处 */
const FOOT = { x: 514, y: 302 };
const FOOT_Y = 306;
const footTip = computed(() => ({ x: FOOT.x - footForce.value * PX_PER_N, y: FOOT_Y }));
const footLabel = computed(() => ({ x: footTip.value.x - 10, y: FOOT_Y + 12 }));

/** 车轮：前轮 1 个（右）＋后轮 2 个（左），半径 26；圆心在 y = 308、地面在 336 */
const WHEELS = [
  { x: 612, y: 308 },
  { x: 238, y: 308 },
  { x: 176, y: 308 },
];
const WHEEL_R = 26;

/** 火柴人关节：手臂 35+35（≈ 身高 0.44），手仍落在栏杆接触点 HAND 上 */
const JOINTS = {
  head: { x: 554, y: 170, r: 14 },
  neck: { x: 542, y: 190 },
  shoulder: { x: 540, y: 196 },
  hip: { x: 492, y: 240 },
  elbowPush: { x: 575, y: 192 },
  elbowFree: { x: 514, y: 218 },
  handFree: { x: 522, y: 242 },
  kneeFront: { x: 518, y: 272 },
  kneeBack: { x: 462, y: 270 },
  footFront: { x: 514, y: 302 },
  footBack: { x: 436, y: 302 },
};
</script>

<template>
  <div class="bwl">
    <svg
      class="bwl-fig"
      viewBox="0 0 780 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="公交车车厢里斜杵在栏杆上的火柴人用手向前推栏杆"
    >
      <g transform="translate(46.8 15.7) scale(0.88)">
        <SurfaceHatch
          :from="{ x: 10, y: 334 }"
          :to="{ x: 770, y: 334 }"
          side="below"
          :thickness="10"
          :gap="22"
        />
        <!-- 车轮：前轮 1 个 + 后轮 2 个（画在车厢之前，上半部随后被裙板挡住） -->
        <g v-for="(w, i) in WHEELS" :key="i">
          <circle
            :cx="w.x"
            :cy="w.y"
            :r="WHEEL_R"
            fill="var(--c-surface-solid)"
            stroke="var(--c-text-dim)"
            stroke-width="2.4"
          />
          <circle :cx="w.x" :cy="w.y" r="10" fill="var(--c-text-dim)" opacity="0.65" />
        </g>
        <!-- 车厢下裙板：盖住车轮上沿 -->
        <rect x="74" y="276" width="612" height="26" fill="var(--c-surface-solid)" />
        <!-- 车厢 -->
        <rect
          x="70"
          y="74"
          width="620"
          height="228"
          rx="16"
          fill="var(--c-surface)"
          stroke="var(--c-text-dim)"
          stroke-width="2.2"
        />
        <!-- 两扇车窗（大一点、描边淡一点） -->
        <rect
          x="104"
          y="96"
          width="150"
          height="54"
          rx="8"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          opacity="0.3"
        />
        <rect
          x="274"
          y="96"
          width="150"
          height="54"
          rx="8"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          opacity="0.3"
        />
        <!-- 前门（在车头一侧，栏杆右边） -->
        <rect
          x="614"
          y="96"
          width="66"
          height="206"
          rx="5"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2.2"
          opacity="0.7"
        />
        <line
          x1="647"
          y1="96"
          x2="647"
          y2="302"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          opacity="0.6"
        />
        <line
          x1="636"
          y1="196"
          x2="658"
          y2="196"
          stroke="var(--c-text-dim)"
          stroke-width="2.4"
          opacity="0.7"
        />
        <!-- 栏杆（立柱 + 横杆）：手推的位置 -->
        <line x1="600" y1="120" x2="600" y2="302" stroke="var(--c-text-dim)" stroke-width="5" />
        <line x1="556" y1="168" x2="644" y2="168" stroke="var(--c-text-dim)" stroke-width="4" />
        <!-- 火柴人（线框）：斜杵在栏杆上 -->
        <g
          fill="none"
          stroke="var(--c-text)"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle :cx="JOINTS.head.x" :cy="JOINTS.head.y" :r="JOINTS.head.r" />
          <line :x1="JOINTS.neck.x" :y1="JOINTS.neck.y" :x2="JOINTS.hip.x" :y2="JOINTS.hip.y" />
          <polyline
            :points="`${JOINTS.shoulder.x} ${JOINTS.shoulder.y} ${JOINTS.elbowPush.x} ${JOINTS.elbowPush.y} ${HAND.x} ${HAND.y}`"
          />
          <polyline
            :points="`${JOINTS.shoulder.x} ${JOINTS.shoulder.y} ${JOINTS.elbowFree.x} ${JOINTS.elbowFree.y} ${JOINTS.handFree.x} ${JOINTS.handFree.y}`"
          />
          <polyline
            :points="`${JOINTS.hip.x} ${JOINTS.hip.y} ${JOINTS.kneeFront.x} ${JOINTS.kneeFront.y} ${JOINTS.footFront.x} ${JOINTS.footFront.y}`"
          />
          <polyline
            :points="`${JOINTS.hip.x} ${JOINTS.hip.y} ${JOINTS.kneeBack.x} ${JOINTS.kneeBack.y} ${JOINTS.footBack.x} ${JOINTS.footBack.y}`"
          />
        </g>
        <g fill="var(--c-text)" opacity="0.5">
          <circle :cx="JOINTS.shoulder.x" :cy="JOINTS.shoulder.y" r="2.4" />
          <circle :cx="JOINTS.hip.x" :cy="JOINTS.hip.y" r="2.4" />
          <circle :cx="JOINTS.kneeFront.x" :cy="JOINTS.kneeFront.y" r="2.4" />
          <circle :cx="JOINTS.kneeBack.x" :cy="JOINTS.kneeBack.y" r="2.4" />
        </g>
        <!-- step 1：车的位移 + 手对车做功 -->
        <g v-if="step >= 1">
          <CourseArrow
            :from="{ x: 110, y: 56 }"
            :to="{ x: 610, y: 56 }"
            stroke="var(--c-velocity)"
            :stroke-width="2.6"
            stroke-dasharray="9 6"
            label="x"
            :label-dy="-12"
          />
          <line
            x1="110"
            y1="56"
            x2="110"
            y2="72"
            stroke="var(--c-velocity)"
            stroke-width="1.6"
            stroke-dasharray="5 5"
            opacity="0.7"
          />
          <line
            x1="610"
            y1="56"
            x2="610"
            y2="72"
            stroke="var(--c-velocity)"
            stroke-width="1.6"
            stroke-dasharray="5 5"
            opacity="0.7"
          />
          <CourseArrow
            :from="HAND"
            :to="handTip"
            stroke="var(--c-accent)"
            :stroke-width="3.4"
            label="F"
            :label-dy="-12"
          />
          <circle :cx="HAND.x" :cy="HAND.y" r="4.2" fill="var(--c-accent)" />
        </g>
        <!-- step 2：脚对地板的力（与手推的力不相等） -->
        <g v-if="step >= 2">
          <line
            :x1="FOOT.x"
            :y1="FOOT.y"
            :x2="FOOT.x"
            :y2="FOOT_Y"
            stroke="var(--c-force)"
            stroke-width="1.4"
            stroke-dasharray="4 4"
          />
          <CourseArrow
            :from="{ x: FOOT.x, y: FOOT_Y }"
            :to="footTip"
            stroke="var(--c-force)"
            :stroke-width="3.2"
          />
          <text
            :x="footLabel.x"
            :y="footLabel.y"
            text-anchor="end"
            font-size="18"
            fill="var(--c-force)"
            class="bwl-lbl"
          >
            <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
            <tspan font-family="KaTeX_Main" font-size="13" dy="5">f</tspan>
          </text>
        </g>
      </g>
    </svg>
    <div class="bwl-panel">
      <div class="bwl-mode">{{ mode === "accelerate" ? "匀加速" : "匀速" }}</div>
      <div class="bwl-row" :class="{ 'bwl-hidden': step < 1 }">
        <Latex tex="x" /> = <b>8</b> <Latex tex="\text{m}" />
      </div>
      <div class="bwl-row" :class="{ 'bwl-hidden': step < 1 }">
        <Latex tex="W_{\text{手}} = Fx" /> = <b>800</b> <Latex tex="\text{J}" />
      </div>
      <div class="bwl-row" :class="{ 'bwl-hidden': step < 2 }">
        <Latex tex="F_f = F + ma" /> = <b>{{ footForce.toFixed(0) }}</b> <Latex tex="\text{N}" />
      </div>
      <div class="bwl-row" :class="{ 'bwl-hidden': step < 2 }">
        <Latex tex="W_{\text{脚}} = -F_f x" /> = <b>{{ wFoot.toFixed(0) }}</b>
        <Latex tex="\text{J}" />
      </div>
      <div class="bwl-row" :class="{ 'bwl-hidden': step < 2 }">
        <Latex tex="W_{\text{人}}" /> = <b>{{ wPerson.toFixed(0) }}</b> <Latex tex="\text{J}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bwl {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  width: 100%;
}

.bwl-fig {
  flex: 0 0 58%;
  min-width: 0;
}

.bwl-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;

  min-width: 0;

  font-size: 1rem;
}

.bwl-mode {
  align-self: flex-start;

  padding: 0.1rem 0.7rem;
  border-radius: 999px;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-size: 0.9rem;
}

.bwl-row {
  padding-top: 0.25rem;
  border-top: 1px solid var(--c-border);
  font-variant-numeric: tabular-nums;
}

.bwl-row b {
  color: var(--c-accent);
  font-size: 1.1rem;
}

.bwl-hidden {
  visibility: hidden;
}

.bwl-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
