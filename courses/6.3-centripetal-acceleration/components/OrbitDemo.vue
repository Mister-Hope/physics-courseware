<!--
  第 2 页引课 / 小结前回扣：天宫二号绕地球做匀速圆周运动。
  点一下图形，卫星沿轨道平滑转过一小段（42°），速度箭头始终沿切线、长度不变 ——
  用"箭头方向变、长度不变"直观说明线速度大小不变、方向时刻改变。
  show-acc：再画一支沿半径指向地心的加速度箭头（小结前回扣页用）。
  地球用共享的 CelestialEarth 图元（禁手画天体），自带大气辉光。
-->
<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

const { showAcc = false } = defineProps<{ showAcc?: boolean }>();

const CX = 280;
const CY = 200;
const R = 150; // 轨道半径
const EARTH_R = 96; // 地球半径
const V = 66; // 速度箭头长度（线速度大小不变 → 长度恒定）
const ACC = 48; // 加速度箭头长度（showAcc 时）
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

/** 加速度沿半径指向圆心：由卫星位置向内收 ACC */
const accTip = computed(() => {
  const a = angle.value * D2R;

  return {
    x: pos.value.x - ACC * Math.cos(a),
    y: pos.value.y - ACC * Math.sin(a),
  };
});

/** A 画在箭头中点、沿切线背离 v 的一侧：让开速度箭头与卫星太阳翼 */
const aLabel = computed(() => {
  const a = angle.value * D2R;

  return {
    x: pos.value.x - (ACC / 2) * Math.cos(a) + Math.sin(a) * 17,
    y: pos.value.y - (ACC / 2) * Math.sin(a) - Math.cos(a) * 17,
  };
});

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
    <CelestialEarth :x="CX" :y="CY" :r="EARTH_R" />
    <text
      :x="CX"
      :y="CY + 46"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="21"
      fill="var(--c-velocity-light)"
    >
      地球
    </text>
    <CourseArrow :from="pos" :to="tip" stroke="var(--c-accent)" :stroke-width="3.6" />
    <CourseArrow
      v-if="showAcc"
      :from="pos"
      :to="accTip"
      stroke="var(--c-accent-2)"
      :stroke-width="3.6"
    />
    <g :transform="satelliteTransform">
      <polygon
        points="-8,-5.4 -24,-6.4 -24,6.4 -8,5.4"
        fill="var(--c-accent-2-glow)"
        stroke="var(--c-velocity-light)"
        stroke-width="1.2"
      />
      <polygon
        points="8,-5.4 24,-6.4 24,6.4 8,5.4"
        fill="var(--c-accent-2-glow)"
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
    <text
      v-if="showAcc"
      :x="aLabel.x"
      :y="aLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="var(--c-accent-2)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      a
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
