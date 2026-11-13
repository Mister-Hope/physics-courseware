<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from "vue";

/** SVG 里 id/url(#id) 必须按实例唯一：Slidev 会同时挂载相邻页，重名 id 会让填充整体失效 */
const uid = useId();

/**
 * 例题 3：木球上浮过程中的秤（第 17 页）
 *
 * 点一下图播放一次动画（再点重播）：
 *
 * - 细绳断开，木球先加速上浮、随后匀速上浮，最后停在水面下；
 * - 球正上方的黄色箭头表示球向上运动；
 * - 球两侧的蓝色弯箭头表示水从上往下流——反复出现、自上而下依次闪现；
 * - 秤面读数从 250 先掉到 232，球匀速上浮后回到 250（系统重心先向下加速、后匀速）。
 *
 * 画法：烧杯和电子秤都按「正视 + 略俯视」的一点透视画——只看得见正面和顶面， 顶面是从前边缘向后退缩的梯形（近大远小），底面用椭圆表示，左右侧面一律不画。
 */
const DURATION = 3.4;
const READING_START = 250;
const READING_MIN = 232;
const BALL_X = 150;
const BALL_R = 17;
const BALL_START_Y = 214;
const BALL_END_Y = 156;
const WATER_TOP = 110;
const BEAKER_BOTTOM = 265;
/** 加速段占整个过程的比例（之后匀速） */
const ACCEL_PART = 0.34;
const ARROW_PERIOD = 0.9;
const ARROW_ON = 0.58;
/** 蓝箭头所在的固定高度（不随球移动：水是从上往下流的） */
const ARROW_ROWS = [152, 214];

/** 拼出 `url(#id)`：id 按实例唯一，避免相邻页重名导致填充失效 */
const svgRef = (name: string): string => `url(#${uid}-${name})`;

const elapsed = ref(0);
const started = ref(false);
let raf = 0;
let last = 0;

const progress = computed(() => Math.max(0, Math.min(1, elapsed.value / DURATION)));

/** 先匀加速、后匀速：位移关于时间的归一化曲线 */
const eased = (u: number): number => {
  const dist = u <= ACCEL_PART ? (u * u) / (2 * ACCEL_PART) : ACCEL_PART / 2 + (u - ACCEL_PART);
  return Math.min(1, dist / (1 - ACCEL_PART / 2));
};

const ballY = computed(() => BALL_START_Y + (BALL_END_Y - BALL_START_Y) * eased(progress.value));

/** 读数跌落强度：0（静止时）→ 1（跌到最小时）→ 0 */
const dropStrength = computed(() => {
  const u = progress.value;
  if (u <= 0) return 0;
  const rise = Math.min(1, u / 0.3);
  const fall = Math.min(1, Math.max(0, (u - 0.32) / 0.34));
  return Math.max(0, rise - fall);
});

const reading = computed(() =>
  Math.round(READING_START - (READING_START - READING_MIN) * dropStrength.value),
);

/** 蓝色水流箭头的出现强度：自上而下依次闪现，到动画末尾整体淡出 */
const arrowOpacity = (rowIndex: number): number => {
  if (!started.value || elapsed.value <= 0) return 0;
  const tailFade =
    elapsed.value > DURATION - 0.3 ? Math.max(0, (DURATION - elapsed.value) / 0.3) : 1;
  const local = (((elapsed.value / ARROW_PERIOD - rowIndex * 0.18) % 1) + 1) % 1;
  if (local > ARROW_ON) return 0;
  const fade = Math.min(1, local / 0.1, (ARROW_ON - local) / 0.1);
  return Math.max(0, fade) * tailFade;
};

/** 蓝箭头的竖直位置（固定行，压在水面与杯底之间） */
const arrowRowY = (rowIndex: number): number =>
  Math.min(BEAKER_BOTTOM - 34, Math.max(WATER_TOP + 26, ARROW_ROWS[rowIndex]));

/** 水流箭头：曲线柄 + 沿「末端切线方向」的细长箭头，箭底贴着柄端（不留缝） */
const flowArrow = (side: -1 | 1, y: number): { shaft: string; head: string } => {
  const x0 = BALL_X + side * 30;
  const y0 = y - 26;
  const c1x = BALL_X + side * 40;
  const c1y = y - 16;
  const c2x = BALL_X + side * 40;
  const c2y = y - 6;
  const x1 = BALL_X + side * 36;
  const y1 = y + 4;

  // 三次贝塞尔在终点的切线方向 = P3 - P2
  const dx = x1 - c2x;
  const dy = y1 - c2y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;

  const L = 18; // 箭头长
  const W = 4.6; // 箭头半底宽（等腰三角形底 = 2W）

  return {
    shaft: `M ${x0} ${y0} C ${c1x} ${c1y} ${c2x} ${c2y} ${x1} ${y1}`,
    head: `${(x1 + ux * L).toFixed(1)},${(y1 + uy * L).toFixed(1)} ${(x1 + nx * W).toFixed(1)},${(y1 + ny * W).toFixed(1)} ${(x1 - nx * W).toFixed(1)},${(y1 - ny * W).toFixed(1)}`,
  };
};

const stop = (): void => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  last = 0;
};

const tick = (now: number): void => {
  raf = requestAnimationFrame(tick);
  const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
  last = now;
  elapsed.value += dt;

  if (elapsed.value >= DURATION) {
    elapsed.value = DURATION;
    stop();
  }
};

const play = (): void => {
  stop();
  elapsed.value = 0;
  started.value = true;
  raf = requestAnimationFrame(tick);
};

onBeforeUnmount(stop);
</script>

<template>
  <svg
    viewBox="0 0 300 360"
    width="100%"
    style="max-width: 320px"
    class="bbr-svg"
    role="img"
    aria-label="烧杯放在电子秤上，木球上浮过程中秤的示数变化"
    @click.stop="play"
  >
    <defs>
      <linearGradient :id="uid + '-bbrBody'" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a3444" />
        <stop offset="55%" stop-color="#1a2230" />
        <stop offset="100%" stop-color="#0f1520" />
      </linearGradient>
      <linearGradient :id="uid + '-bbrPlate'" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#54617a" />
        <stop offset="100%" stop-color="#39445a" />
      </linearGradient>
      <linearGradient :id="uid + '-bbrWater'" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgb(96 165 250 / 26%)" />
        <stop offset="100%" stop-color="rgb(59 130 246 / 44%)" />
      </linearGradient>
      <linearGradient :id="uid + '-bbrGlass'" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgb(203 213 225 / 24%)" />
        <stop offset="35%" stop-color="rgb(203 213 225 / 7%)" />
        <stop offset="100%" stop-color="rgb(203 213 225 / 20%)" />
      </linearGradient>
      <linearGradient :id="uid + '-bbrWood'" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dfb269" />
        <stop offset="100%" stop-color="#a87232" />
      </linearGradient>
      <filter :id="uid + '-bbrGlow'" x="-20%" y="-60%" width="140%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <clipPath :id="uid + '-bbrInner'">
        <path d="M 96 96 V 265 A 54 8 0 0 1 204 265 V 96 A 54 8 0 0 1 96 96 Z" />
      </clipPath>
    </defs>

    <!-- ===== 电子秤（正视 + 略俯视：只画正面与顶面，盘面与表身顶面是平行面） ===== -->
    <!-- 表身顶面（同倾角、同进深，比盘面略窄） -->
    <polygon
      points="82,283 218,283 210,271 90,271"
      fill="#4a515e"
      stroke="#8a929f"
      stroke-width="0.8"
    />
    <!-- 表身：顶边直角，下两角磨圆 -->
    <path
      d="M 82 283 H 218 V 311 A 14 14 0 0 1 204 325 H 96 A 14 14 0 0 1 82 311 Z"
      :fill="'url(#' + uid + '-bbrBody)'"
      stroke="var(--c-line)"
      stroke-width="1.3"
    />
    <!-- 藏在盘面前沿后面的两小截弹簧 -->
    <path
      d="M 116 271 l 10 2.2 l -10 2.2 l 10 2.2 l -10 2.2"
      fill="none"
      stroke="#9aa3b2"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M 178 271 l 10 2.2 l -10 2.2 l 10 2.2 l -10 2.2"
      fill="none"
      stroke="#9aa3b2"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- 盘面：前沿厚度 + 顶面（与表身顶面平行） -->
    <rect
      x="78"
      y="273"
      width="144"
      height="5"
      fill="#343a45"
      stroke="#8a929f"
      stroke-width="0.8"
    />
    <polygon
      points="78,273 222,273 214,261 86,261"
      :fill="'url(#' + uid + '-bbrPlate)'"
      stroke="rgb(148 163 184 / 45%)"
      stroke-width="1.1"
    />
    <!-- 读数窗 -->
    <rect
      x="108"
      y="288"
      width="84"
      height="23"
      rx="4"
      fill="#04070c"
      stroke="#22304a"
      stroke-width="1.4"
    />
    <!-- 七段数码管读数（火柴棍数字） -->
    <ScaleReadout
      :value="String(reading)"
      :center-x="146"
      :y="290.5"
      :height="19"
      color="#ff3b30"
      :glow="uid + '-bbrGlow'"
      unit="g"
    />
    <!-- 两只脚 -->
    <rect
      x="104"
      y="325"
      width="20"
      height="8"
      rx="4"
      fill="#080d16"
      stroke="rgb(148 163 184 / 16%)"
    />
    <rect
      x="172"
      y="325"
      width="20"
      height="8"
      rx="4"
      fill="#080d16"
      stroke="rgb(148 163 184 / 16%)"
    />

    <!-- ===== 烧杯：水体 + 杯底椭圆 ===== -->
    <g :clip-path="'url(#' + uid + '-bbrInner)'">
      <path
        d="M 96 110 V 265 A 54 8 0 0 1 204 265 V 110 A 54 7.5 0 0 1 96 110 Z"
        :fill="svgRef('bbrWater')"
      />
      <ellipse cx="150" cy="110" rx="54" ry="7.5" fill="rgb(147 197 253 / 38%)" />
      <ellipse
        cx="150"
        cy="110"
        rx="54"
        ry="7.5"
        fill="none"
        stroke="rgb(191 219 254 / 55%)"
        stroke-width="1.4"
      />
    </g>

    <!-- 木球 -->
    <circle
      :cx="BALL_X"
      :cy="ballY"
      :r="BALL_R"
      :fill="'url(#' + uid + '-bbrWood)'"
      stroke="rgb(120 78 32 / 70%)"
      stroke-width="1.4"
    />
    <path
      :d="`M ${BALL_X - 10} ${ballY - 5} Q ${BALL_X - 2} ${ballY - 11} ${BALL_X + 7} ${ballY - 6}`"
      fill="none"
      stroke="rgb(120 78 32 / 45%)"
      stroke-width="1.4"
    />
    <path
      :d="`M ${BALL_X - 11} ${ballY + 4} Q ${BALL_X - 1} ${ballY - 1} ${BALL_X + 10} ${ballY + 3}`"
      fill="none"
      stroke="rgb(120 78 32 / 32%)"
      stroke-width="1.3"
    />

    <!-- 细绳：未剪断时连着杯底 -->
    <line
      v-if="!started"
      :x1="BALL_X"
      :y1="ballY + BALL_R"
      :x2="BALL_X"
      :y2="BEAKER_BOTTOM - 2"
      stroke="var(--c-neutral-300)"
      stroke-width="1.8"
      stroke-dasharray="5 4"
      opacity="0.8"
    />

    <circle
      v-if="!started"
      cx="150"
      :cy="BEAKER_BOTTOM - 2"
      r="2.6"
      fill="var(--c-neutral-300)"
      opacity="0.9"
    />

    <!-- 木球向上运动（黄色箭头） -->
    <g v-if="started">
      <line
        :x1="BALL_X"
        :y1="ballY - BALL_R - 8"
        :x2="BALL_X"
        :y2="ballY - BALL_R - 34"
        stroke="var(--c-accent)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <polygon
        :points="`${BALL_X},${ballY - BALL_R - 46} ${BALL_X - 6.5},${ballY - BALL_R - 33} ${BALL_X + 6.5},${ballY - BALL_R - 33}`"
        fill="var(--c-accent)"
      />
    </g>

    <!-- 水从上往下流：两侧各一支弯箭头，反复闪现、自上而下 -->
    <g v-for="(row, i) in ARROW_ROWS" :key="`flow-${row}`" :opacity="arrowOpacity(i)">
      <path
        :d="flowArrow(-1, arrowRowY(i)).shaft"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <polygon :points="flowArrow(-1, arrowRowY(i)).head" fill="var(--c-accent-2)" />
      <path
        :d="flowArrow(1, arrowRowY(i)).shaft"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <polygon :points="flowArrow(1, arrowRowY(i)).head" fill="var(--c-accent-2)" />
    </g>

    <!-- ===== 烧杯：杯壁 + 杯口 + 杯底（3D） ===== -->
    <!-- 杯底和秤台顶面之间的接触阴影：不然烧杯看着像浮在半空 -->
    <ellipse cx="150" cy="267" rx="56" ry="8.5" fill="rgb(2 6 12 / 55%)" />
    <!-- 玻璃填色：杯身 + 右侧壁外弧一直填到嘴尖（只填色、不描边，避免和杯口那笔重线） -->
    <path
      d="M 96 96 V 265 A 54 8 0 0 1 204 265 V 116 C 208 108 213 101 220 94 L 177 102.9 A 54 8 0 0 1 96 96 Z"
      :fill="'url(#' + uid + '-bbrGlass)'"
    />
    <!-- 杯壁描边：只画到嘴尖为止，不闭合（不重复画嘴内侧那条线） -->
    <path
      d="M 96 96 V 265 A 54 8 0 0 1 204 265 V 116 C 208 108 213 101 220 94"
      fill="none"
      stroke="rgb(203 213 225 / 50%)"
      stroke-width="2.6"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <!-- 杯底椭圆：外缘就是杯体的底弧，同一圆心、同一 ry，不会多出一条悬空的环 -->
    <ellipse
      cx="150"
      cy="265"
      rx="54"
      ry="8"
      fill="rgb(203 213 225 / 7%)"
      stroke="rgb(203 213 225 / 40%)"
      stroke-width="2"
    />
    <!-- 杯口椭圆 + 右侧倾倒嘴（烧杯嘴） -->
    <!-- 杯口 + 烧杯嘴：一笔画成（从嘴尖绕过整个杯口再回来），接缝必然严丝合缝 -->
    <path
      d="M 220 94 Q 199 87.6 177 89.1 A 54 8 0 0 0 96 96 A 54 8 0 0 0 177 102.9 Q 199 100.4 220 94 Z"
      fill="rgb(148 178 208 / 10%)"
      stroke="rgb(226 232 240 / 68%)"
      stroke-width="3"
      stroke-linejoin="round"
    />
    <!-- 杯壁刻度（暗示这是烧杯） -->
    <line
      x1="99"
      y1="150"
      x2="112"
      y2="150"
      stroke="rgb(226 232 240 / 40%)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <line
      x1="99"
      y1="182"
      x2="112"
      y2="182"
      stroke="rgb(226 232 240 / 40%)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <line
      x1="99"
      y1="214"
      x2="112"
      y2="214"
      stroke="rgb(226 232 240 / 40%)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <line
      x1="104"
      y1="104"
      x2="104"
      y2="256"
      stroke="rgb(255 255 255 / 22%)"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.bbr-svg {
  overflow: visible;
  cursor: pointer;
}
</style>
