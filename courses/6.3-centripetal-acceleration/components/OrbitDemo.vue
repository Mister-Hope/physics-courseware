<!--
  第 2 页引课：天宫二号绕地球做匀速圆周运动。
  点一下图形，卫星沿轨道平滑转过一小段（42°），速度箭头始终沿切线、长度不变 ——
  用"箭头方向变、长度不变"直观说明线速度大小不变、方向时刻改变。
  几何自检（node 逐 0.5° 扫描一整圈）：箭头尖端与所有标签、卫星、地球、轨道线互不重叠，
  且全部在 viewBox 内（最小留白 11.6）。
-->
<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

const CX = 280;
const CY = 200;
const R = 150; // 轨道半径
const EARTH_R = 96; // 地球半径
const GLOW_R = 106; // 大气辉光半径
const V = 66; // 速度箭头长度（线速度大小不变 → 长度恒定）
const STEP = 42; // 每点一次转过的角度
const SPIN_MS = 420; // 一次旋转的时长
const D2R = Math.PI / 180;

/** 卫星所在方位角（-90°＝正上方） */
const angle = ref(-90);
let raf = 0;

const pos = computed(() => ({
  x: CX + R * Math.cos(angle.value * D2R),
  y: CY + R * Math.sin(angle.value * D2R),
}));

/** 速度沿切线（半径方向再转 90°），长度恒为 V */
const tip = computed(() => {
  const a = angle.value * D2R;

  return {
    x: pos.value.x - V * Math.sin(a),
    y: pos.value.y + V * Math.cos(a),
  };
});

/** 卫星名画在径向外侧：越接近水平方向向外推得越多，免得压住太阳翼 */
const nameLabel = computed(() => {
  const a = angle.value * D2R;
  const nx = Math.cos(a);
  const ny = Math.sin(a);
  const off = 15 + 38 * Math.abs(nx) + 10 * Math.abs(ny);

  return { x: pos.value.x + nx * off, y: pos.value.y + ny * off + 7 };
});

/** V 画在箭头中点、沿半径向内的环形空当里：不压箭头，也让开卫星名与地球 */
const vLabel = computed(() => {
  const a = angle.value * D2R;
  const nx = Math.cos(a);
  const ny = Math.sin(a);

  return {
    x: (pos.value.x + tip.value.x) / 2 - nx * 26,
    y: (pos.value.y + tip.value.y) / 2 - ny * 26 + 6,
  };
});

/** 卫星整体随轨道转向：机体短边朝地球、太阳翼始终沿切线 */
const satelliteTransform = computed(
  () => `translate(${pos.value.x} ${pos.value.y}) rotate(${angle.value + 90})`,
);

/** 点一下：从当前角度平滑转过 42°，缓出收尾（转到位轻轻停住） */
const spin = (): void => {
  const from = angle.value;
  const to = from + STEP;
  const start = performance.now();

  cancelAnimationFrame(raf);

  const tick = (now: number): void => {
    const t = Math.min(1, (now - start) / SPIN_MS);
    const eased = 1 - (1 - t) ** 3;

    angle.value = from + (to - from) * eased;
    if (t < 1) raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
};

onUnmounted(() => cancelAnimationFrame(raf));
</script>

<template>
  <svg
    viewBox="0 0 560 400"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    class="orbit-demo"
    aria-label="天宫二号绕地球做匀速圆周运动：速度方向始终沿切线、大小不变"
    @click="spin"
  >
    <defs>
      <radialGradient id="orbit-earth-body" cx="36%" cy="32%" r="80%">
        <stop offset="0%" stop-color="var(--c-velocity-light)" />
        <stop offset="45%" stop-color="var(--c-accent-2)" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </radialGradient>
      <radialGradient id="orbit-earth-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-velocity)" stop-opacity="0.34" />
        <stop offset="72%" stop-color="var(--c-velocity)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--c-velocity)" stop-opacity="0" />
      </radialGradient>
      <clipPath id="orbit-earth-clip">
        <circle :cx="CX" :cy="CY" :r="EARTH_R" />
      </clipPath>
    </defs>
    <circle
      :cx="CX"
      :cy="CY"
      :r="R"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="2.6"
      stroke-dasharray="10 9"
      opacity="0.6"
    />
    <circle :cx="CX" :cy="CY" :r="GLOW_R" fill="url(#orbit-earth-glow)" />
    <circle
      :cx="CX"
      :cy="CY"
      :r="EARTH_R"
      fill="url(#orbit-earth-body)"
      stroke="var(--c-velocity-light)"
      stroke-width="1.4"
      opacity="0.96"
    />
    <g
      clip-path="url(#orbit-earth-clip)"
      fill="color-mix(in srgb, var(--c-velocity-light) 30%, transparent)"
    >
      <path
        d="M 214 148 C 224 130 250 124 262 138 C 272 150 258 162 266 176 C 274 190 260 206 244 200 C 228 194 206 168 214 148 z"
      />
      <path
        d="M 318 190 C 332 178 350 184 352 200 C 354 216 338 230 322 226 C 308 222 306 200 318 190 z"
      />
      <path
        d="M 214 246 C 224 238 242 242 246 254 C 250 266 236 278 222 274 C 210 270 206 254 214 246 z"
      />
    </g>
    <text
      :x="CX"
      :y="CY + 46"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="21"
      fill="#dbeafe"
    >
      地球
    </text>
    <CourseArrow :from="pos" :to="tip" stroke="var(--c-accent)" :stroke-width="3.6" />
    <g :transform="satelliteTransform">
      <polygon
        points="-8,-5.4 -24,-6.4 -24,6.4 -8,5.4"
        fill="#1d4ed8"
        stroke="var(--c-velocity-light)"
        stroke-width="1.2"
      />
      <polygon
        points="8,-5.4 24,-6.4 24,6.4 8,5.4"
        fill="#1d4ed8"
        stroke="var(--c-velocity-light)"
        stroke-width="1.2"
      />
      <rect x="-9" y="-7" width="18" height="14" rx="3" fill="var(--c-accent)" />
    </g>
    <text
      :x="nameLabel.x"
      :y="nameLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="19"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      天宫二号
    </text>
    <text
      :x="vLabel.x"
      :y="vLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      v
    </text>
  </svg>
</template>

<style scoped>
.orbit-demo {
  cursor: pointer;
  user-select: none;
  transition: filter 0.25s ease;
}

.orbit-demo:hover {
  filter: brightness(1.07);
}
</style>
