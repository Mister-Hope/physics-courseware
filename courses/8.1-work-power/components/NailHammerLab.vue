<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

/**
 * 第二课时「钉钉子」问题页：锤子砸一下、钉子进一截——连砸几次，每次进得越来越少。 页面每点一次（`step` 加 1）砸一锤：锤头摆下再抬起，钉子带着缓冲滑入一截；
 * 右侧同时补上一段"这一次前进的距离"的括号，长度一锤比一锤短。 深度按 √n 的真实比例画（每次做功相同、阻力 F = kx ⇒ x_n = √n·x₁）。
 */
const { step = 0 } = defineProps<{
  /** 当前点击步数（页面传 $clicks），最多 4 次 */
  step?: number;
}>();

const MAX_HITS = 4;
const UNIT = 24; // 一个"单位深度"的像素

/** 每次锤击前进的距离（单位 x₁）：√n − √(n−1) */
const ADV = Array.from({ length: MAX_HITS }, (_, i) => Math.sqrt(i + 1) - Math.sqrt(i));
/** 累计深度（单位 x₁） */
const CUM = Array.from({ length: MAX_HITS }, (_, i) => Math.sqrt(i + 1));

const hits = computed(() => Math.max(0, Math.min(MAX_HITS, step)));
/** 当前钉帽下移的像素 */
const sink = computed(() => (hits.value === 0 ? 0 : CUM[hits.value - 1] * UNIT));

/** 锤头角度：抬起 −32°，砸下 +6°（用 ref + timer 做一次"砸—抬"） */
const angle = ref(-32);
let timer: ReturnType<typeof setTimeout> | undefined;
watch(
  () => step,
  (next, prev) => {
    if (next === 0 || next <= (prev ?? 0)) {
      angle.value = -32;
      return;
    }
    angle.value = 6;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      angle.value = -32;
    }, 190);
  },
);

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

const PIVOT = { x: 372, y: 16 };
/** 锤子的 CSS transform：先平移到转轴，再绕轴旋转 */
const hammerStyle = computed(() => ({
  transform: `translate(${PIVOT.x}px, ${PIVOT.y}px) rotate(${angle.value}deg)`,
}));
const WOOD = { x: 54, y: 148, w: 452, h: 78 };
const NAIL_X = 268;
const HEAD_0 = 44; // 钉帽初始高度
const NAIL_LEN = 104; // 钉身长度：初始钉尖正好抵住板面（木板顶 y = 148）
/** 右侧距离括号的横坐标 */
const GX = 330;
</script>

<template>
  <div class="nail-lab">
    <svg
      viewBox="0 0 700 250"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="锤子逐次敲击钉子，每次钉入的距离越来越短"
    >
      <!-- 钉子：钉帽 + 钉身，随敲击整体下移 -->
      <g :style="{ transform: `translateY(${sink}px)` }" class="nail">
        <line
          :x1="NAIL_X"
          :y1="HEAD_0"
          :x2="NAIL_X"
          :y2="HEAD_0 + NAIL_LEN"
          stroke="var(--c-text-dim)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <line
          :x1="NAIL_X - 23"
          :y1="HEAD_0"
          :x2="NAIL_X + 23"
          :y2="HEAD_0"
          stroke="var(--c-text-dim)"
          stroke-width="8"
          stroke-linecap="round"
        />
      </g>
      <!-- 木板（画在钉子之后：钉进木板的部分被板面挡住） -->
      <rect
        :x="WOOD.x"
        :y="WOOD.y"
        :width="WOOD.w"
        :height="WOOD.h"
        rx="6"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="2.2"
      />
      <!-- 锤子：以 PIVOT 为轴摆动（CSS transform 才能吃到 transition） -->
      <g :style="hammerStyle" class="hammer">
        <line
          x1="0"
          y1="0"
          x2="-96"
          y2="52"
          stroke="var(--c-text-dim)"
          stroke-width="7"
          stroke-linecap="round"
        />
        <rect x="-130" y="38" width="46" height="20" rx="4" fill="var(--c-text-dim)" />
      </g>
      <!-- 每次前进的距离：右侧括号，一锤比一锤短（砸过才出现） -->
      <g v-for="(adv, i) in ADV" :key="`adv${i}`">
        <g v-if="i < hits">
          <line
            :x1="GX"
            :y1="HEAD_0 + (i === 0 ? 0 : CUM[i - 1] * UNIT)"
            :x2="GX"
            :y2="HEAD_0 + CUM[i] * UNIT"
            stroke="var(--c-accent)"
            stroke-width="2.4"
          />
          <line
            :x1="GX - 7"
            :y1="HEAD_0 + (i === 0 ? 0 : CUM[i - 1] * UNIT)"
            :x2="GX + 7"
            :y2="HEAD_0 + (i === 0 ? 0 : CUM[i - 1] * UNIT)"
            stroke="var(--c-accent)"
            stroke-width="2.4"
          />
          <line
            :x1="GX - 7"
            :y1="HEAD_0 + CUM[i] * UNIT"
            :x2="GX + 7"
            :y2="HEAD_0 + CUM[i] * UNIT"
            stroke="var(--c-accent)"
            stroke-width="2.4"
          />
          <text
            :x="GX + 14"
            :y="HEAD_0 + (i === 0 ? 0 : CUM[i - 1] * UNIT) + (adv * UNIT) / 2 + 6"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
            fill="var(--c-accent)"
          >
            x
          </text>
        </g>
      </g>
      <!-- 右侧说明 -->
      <g font-size="17">
        <text x="404" y="86" fill="var(--c-accent)">每次锤击做的功相同</text>
        <text x="404" y="120" fill="var(--c-text-dim)">阻力随钉入深度增大</text>
        <text x="404" y="154" fill="var(--c-velocity)">⇒ 每次前进的距离越来越小</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.nail {
  transition: transform 0.34s cubic-bezier(0.34, 1.3, 0.64, 1);
  transform-box: fill-box;
}

.hammer {
  transition: transform 0.19s ease-out;
  transform-origin: 0 0;
  transform-box: view-box;
}

.nail-lab {
  width: 100%;
}
</style>
