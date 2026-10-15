<!--
  例2「两车与小鸟」教学示意图（精修美化版）
  Slidev 嵌入规范：<TwoCarsBirdSvg :step="$clicks" />
  
  物理逻辑与视觉规约：
    1. 车头基准与相遇对齐（彻底修复穿模与车尾相撞问题）：
       - A 车（向右，10 m/s）以【车头前保险杠】为基准点，车身向左延展；
       - B 车（向左，30 m/s）以【车头前保险杠】为基准点，车身向右延展；
       - 初态两车车头相距恰好 1000 m；
       - 相遇时刻 t = 25 s 时，两车在 x = 250 m 处车头对车头精准贴合相遇，绝无重叠、绝不背向穿模。
    2. 小鸟高频往复折返轨迹真实物理收敛：
       - 往复碰撞时间序列：12.5s -> 20.83s -> 22.92s -> 24.31s -> 24.65s -> 24.88s -> 25s；
       - 折返点位置：0 -> 625m -> 208.3m -> 312.5m -> 243.1m -> 260.4m -> 248.8m -> 250m；
       - 折返频率越来越高、振幅迅速收缩，真实直观呈现无限往复收敛于 250 m 相遇点。
    3. 单次动画播放，播放完成后【严格停在末态，绝不循环】：
       - step = 0 时为题干初态；
       - step >= 1 时平滑播放运动过程至 t = 25 s，随后长久驻留在相遇末态；
       - 末态标出垂直相遇参考线及小鸟位移 Δx = 250 m；
       - step >= 2 时标出路程 s = 1250 m。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

const { step = 0 } = defineProps<{
  /** Slidev 步进计数：0: 初态; 1: 运行至相遇并停在末态+位移; >=2: 标出路程 */
  step?: number;
}>();

/* ═══════════ 坐标系与几何尺度映射 (580 × 230) ═══════════ */
const W = 580;
const H = 230;
const Y_GROUND = 172; // 地面接触线

// 物理尺度：1000 m 对应 420 px (0.42 px/m)
const SCALE = 0.42;
const X_A_START = 70; // A车车头初态 (0 m)
const X_B_START = X_A_START + 1000 * SCALE; // B车车头初态 (1000 m = 490 px)
const X_MEET = X_A_START + 250 * SCALE; // 车头相遇点 (250 m = 175 px)

/* ═══════════ 动画状态机：播放一次后【严格停在末态，绝不自动循环】 ═══════════ */
const DURATION = 4200; // 动画时长 4.2s
const animProgress = ref(0); // 0 (初态) -> 1 (相遇末态)
let animFrame = 0;
let t0 = 0;

const tick = (now: number): void => {
  if (t0 === 0) t0 = now;
  const elapsed = now - t0;
  if (elapsed >= DURATION) {
    animProgress.value = 1;
    if (animFrame !== 0) cancelAnimationFrame(animFrame);
    animFrame = 0;
    return;
  }
  animProgress.value = elapsed / DURATION;
  animFrame = requestAnimationFrame(tick);
};

// 手动重新播放一次
const replay = (): void => {
  if (animFrame !== 0) cancelAnimationFrame(animFrame);
  t0 = 0;
  animProgress.value = 0;
  animFrame = requestAnimationFrame(tick);
};

// 监听 step 步进
watch(
  () => step ?? 0,
  (newStep, oldStep) => {
    if (newStep >= 1 && (oldStep === undefined || oldStep === 0)) {
      // 从初态切到解题步：触发一次动画，播放完毕后停在末态
      replay();
    } else if (newStep >= 1) {
      // 已经在 step >= 1：保持停在末态
      if (animFrame !== 0) cancelAnimationFrame(animFrame);
      animFrame = 0;
      animProgress.value = 1;
    } else {
      // step 回到 0：立即复位到初态
      if (animFrame !== 0) cancelAnimationFrame(animFrame);
      animFrame = 0;
      animProgress.value = 0;
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (animFrame !== 0) cancelAnimationFrame(animFrame);
});

// 即时物理时间 t: 0 -> 25 s
const simT = computed(() => animProgress.value * 25);
const isAtEnd = computed(() => animProgress.value >= 1);

// A 车车头即时坐标（0 -> 250 m）
const currentCarA_Head = computed(() => {
  if (animProgress.value === 0) return X_A_START;
  const xM = Math.min(250, 10 * simT.value);
  return X_A_START + xM * SCALE;
});

// B 车车头即时坐标（1000 -> 250 m）
const currentCarB_Head = computed(() => {
  if (animProgress.value === 0) return X_B_START;
  const xM = Math.max(250, 1000 - 30 * simT.value);
  return X_A_START + xM * SCALE;
});

/* ═══════════ 小鸟真实高频折返物理递推 ═══════════ */
// 折返关键帧（时间点与位置）
const BOUNCES = [
  { t: 0, xM: 0, dir: 1, y: 38 },
  { t: 12.5, xM: 625, dir: -1, y: 52 },
  { t: 20.8333, xM: 208.333, dir: 1, y: 66 },
  { t: 22.9167, xM: 312.5, dir: -1, y: 78 },
  { t: 24.3056, xM: 243.056, dir: 1, y: 88 },
  { t: 24.6528, xM: 260.417, dir: -1, y: 96 },
  { t: 24.8843, xM: 248.843, dir: 1, y: 104 },
  { t: 24.9613, xM: 251.736, dir: -1, y: 110 },
  { t: 25, xM: 250, dir: 1, y: 116 },
];

/** 即时小鸟姿态计算 */
const currentBird = computed(() => {
  if (animProgress.value === 0) return { x: X_A_START, y: 38, facing: 1, wingAngle: 0, flying: false };

  if (isAtEnd.value) return { x: X_MEET, y: 116, facing: 1, wingAngle: 0, flying: false };

  const t = simT.value;
  // 查找当前所处的折返区间
  for (let i = 0; i < BOUNCES.length - 1; i++) {
    const b1 = BOUNCES[i];
    const b2 = BOUNCES[i + 1];
    if (t >= b1.t && t <= b2.t) {
      const frac = (t - b1.t) / (b2.t - b1.t);
      const xM = b1.xM + (b2.xM - b1.xM) * frac;
      const y = b1.y + (b2.y - b1.y) * frac;
      return {
        x: X_A_START + xM * SCALE,
        y,
        facing: b1.dir,
        wingAngle: Math.sin(t * 28) * 16,
        flying: true,
      };
    }
  }

  return { x: X_MEET, y: 116, facing: 1, wingAngle: 0, flying: false };
});

// 文字轮廓光圈样式
const HALO = {
  stroke: "var(--c-bg, #0f1425)",
  "stroke-width": 3.6,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <div class="two-cars-wrap">
    <svg :viewBox="`0 0 ${W} ${H}`" class="two-cars-svg select-none overflow-visible" role="img" aria-label="两车相向而行车头相遇与小鸟高频往复折返示意图">
      <defs>
        <!-- 相遇指示微光 -->
        <radialGradient id="meet-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- ════════ 1. 地面 ════════ -->
      <SurfaceHatch
        :from="{ x: 18, y: Y_GROUND }"
        :to="{ x: 562, y: Y_GROUND }"
        side="below"
        :thickness="14"
        :gap="24"
        color="rgba(148, 163, 184, 0.45)"
        :line-width="2.2"
        :hatch-width="1.2"
      />

      <!-- ════════ 2. 初始车头间距 1000 m 标注 (以两车前端为严格基准) ════════ -->
      <g>
        <!-- 初始车头基准对齐线 -->
        <line :x1="X_A_START" :y1="Y_GROUND - 2" :x2="X_A_START" :y2="Y_GROUND + 14" stroke="rgba(96, 165, 250, 0.6)" stroke-width="1.2" />
        <line :x1="X_B_START" :y1="Y_GROUND - 2" :x2="X_B_START" :y2="Y_GROUND + 14" stroke="rgba(226, 168, 70, 0.6)" stroke-width="1.2" />

        <!-- 初态间距线（step=0 居中显著，运动中保留轻柔参考） -->
        <g :opacity="(step ?? 0) === 0 ? 1 : 0.4">
          <CourseArrow
            :from="{ x: X_A_START + 2, y: 142 }"
            :to="{ x: X_B_START - 2, y: 142 }"
            stroke="rgba(148, 163, 184, 0.85)"
            :stroke-width="1.6"
            stroke-dasharray="6 4"
            :head-size="8"
          />
          <CourseArrow
            :from="{ x: X_B_START - 2, y: 142 }"
            :to="{ x: X_A_START + 2, y: 142 }"
            stroke="rgba(148, 163, 184, 0.85)"
            :stroke-width="1.6"
            stroke-dasharray="6 4"
            :head-size="8"
          />
          <text :x="(X_A_START + X_B_START) / 2" :y="136" text-anchor="middle" font-size="13" font-weight="bold" fill="#cbd5e1" :style="HALO">
            车头相距 1000 m
          </text>
        </g>
      </g>

      <!-- ════════ 3. 车头相遇基准与小鸟位移（step >= 1 且运动完成时停在末态） ════════ -->
      <g v-if="(step ?? 0) >= 1 || isAtEnd">
        <!-- 车头相遇垂直参考虚线 -->
        <line :x1="X_MEET" :y1="24" :x2="X_MEET" :y2="Y_GROUND" stroke="#38bdf8" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.8" />
        <circle :cx="X_MEET" :cy="24" r="8" fill="url(#meet-glow)" />
        <circle :cx="X_MEET" :cy="24" r="3" fill="#38bdf8" />
        <text :x="X_MEET" :y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#38bdf8" :style="HALO">车头相遇点 (250 m)</text>

        <!-- 小鸟位移矢量：从 A 车起点 0m 直指相遇点 250m -->
        <g>
          <CourseArrow :from="{ x: X_A_START, y: Y_GROUND + 26 }" :to="{ x: X_MEET, y: Y_GROUND + 26 }" stroke="#38bdf8" :stroke-width="2.6" :head-size="10" />
          <text :x="(X_A_START + X_MEET) / 2" :y="Y_GROUND + 40" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#38bdf8" :style="HALO">
            小鸟位移 Δx = 250 m (向右)
          </text>
        </g>
      </g>

      <!-- ════════ 4. 小鸟高频真实往复折返轨迹（越来越频繁、无限收敛至250m） ════════ -->
      <g opacity="0.92">
        <!-- 航线 1: 0 -> 625 m (70 -> 332.5) -->
        <line :x1="X_A_START" :y1="38" :x2="X_A_START + 625 * SCALE" :y2="38" stroke="#2dd4bf" stroke-width="2.2" stroke-linecap="round" />
        <polygon :points="`${X_A_START + 312.5 * SCALE + 5},38 ${X_A_START + 312.5 * SCALE - 5},34 ${X_A_START + 312.5 * SCALE - 5},42`" fill="#2dd4bf" />

        <!-- 掉头 1: 右端半圆弧 -->
        <path :d="`M ${X_A_START + 625 * SCALE} 38 A 7 7 0 0 1 ${X_A_START + 625 * SCALE} 52`" fill="none" stroke="#2dd4bf" stroke-width="1.8" />

        <!-- 航线 2: 625 -> 208.3 m (332.5 -> 157.5) -->
        <line :x1="X_A_START + 625 * SCALE" :y1="52" :x2="X_A_START + 208.33 * SCALE" :y2="52" stroke="#2dd4bf" stroke-width="2.0" stroke-linecap="round" />
        <polygon :points="`${X_A_START + 416.7 * SCALE - 5},52 ${X_A_START + 416.7 * SCALE + 5},48 ${X_A_START + 416.7 * SCALE + 5},56`" fill="#2dd4bf" />

        <!-- 掉头 2: 左端半圆弧 -->
        <path :d="`M ${X_A_START + 208.33 * SCALE} 52 A 7 7 0 0 0 ${X_A_START + 208.33 * SCALE} 66`" fill="none" stroke="#2dd4bf" stroke-width="1.8" />

        <!-- 航线 3: 208.3 -> 312.5 m (157.5 -> 201.25) -->
        <line :x1="X_A_START + 208.33 * SCALE" :y1="66" :x2="X_A_START + 312.5 * SCALE" :y2="66" stroke="#2dd4bf" stroke-width="1.9" stroke-linecap="round" />
        <polygon :points="`${X_A_START + 260.4 * SCALE + 4},66 ${X_A_START + 260.4 * SCALE - 4},62.5 ${X_A_START + 260.4 * SCALE - 4},69.5`" fill="#2dd4bf" />

        <!-- 掉头 3: 右端半圆弧 -->
        <path :d="`M ${X_A_START + 312.5 * SCALE} 66 A 6 6 0 0 1 ${X_A_START + 312.5 * SCALE} 78`" fill="none" stroke="#2dd4bf" stroke-width="1.6" />

        <!-- 航线 4: 312.5 -> 243.1 m (201.25 -> 172.1) -->
        <line :x1="X_A_START + 312.5 * SCALE" :y1="78" :x2="X_A_START + 243.06 * SCALE" :y2="78" stroke="#2dd4bf" stroke-width="1.8" stroke-linecap="round" />
        <polygon :points="`${X_A_START + 277.8 * SCALE - 4},78 ${X_A_START + 277.8 * SCALE + 4},74.5 ${X_A_START + 277.8 * SCALE + 4},81.5`" fill="#2dd4bf" />

        <!-- 掉头 4: 左端弧 -->
        <path :d="`M ${X_A_START + 243.06 * SCALE} 78 A 5 5 0 0 0 ${X_A_START + 243.06 * SCALE} 88`" fill="none" stroke="#2dd4bf" stroke-width="1.5" />

        <!-- 航线 5: 243.1 -> 260.4 m (172.1 -> 179.4) -->
        <line :x1="X_A_START + 243.06 * SCALE" :y1="88" :x2="X_A_START + 260.42 * SCALE" :y2="88" stroke="#2dd4bf" stroke-width="1.6" stroke-linecap="round" />

        <!-- 掉头 5: 右端弧 -->
        <path :d="`M ${X_A_START + 260.42 * SCALE} 88 A 4 4 0 0 1 ${X_A_START + 260.42 * SCALE} 96`" fill="none" stroke="#2dd4bf" stroke-width="1.4" />

        <!-- 航线 6: 260.4 -> 248.8 m (179.4 -> 174.5) -->
        <line :x1="X_A_START + 260.42 * SCALE" :y1="96" :x2="X_A_START + 248.84 * SCALE" :y2="96" stroke="#2dd4bf" stroke-width="1.5" stroke-linecap="round" />

        <!-- 掉头 6: 左端弧 -->
        <path :d="`M ${X_A_START + 248.84 * SCALE} 96 A 4 4 0 0 0 ${X_A_START + 248.84 * SCALE} 104`" fill="none" stroke="#2dd4bf" stroke-width="1.3" />

        <!-- 航线 7 & 8: 密集高频快速振荡收敛段 (248.8 -> 251.7 -> 250 m) -->
        <path
          :d="`M ${X_A_START + 248.84 * SCALE} 104 L ${X_A_START + 251.74 * SCALE} 110 L ${X_MEET} 116`"
          fill="none"
          stroke="#2dd4bf"
          stroke-width="1.4"
          stroke-linecap="round"
        />
        <circle :cx="X_MEET" :cy="116" r="3" fill="#2dd4bf" />

        <!-- 路程与飞行特征纯净标注 (仅当 step >= 2 显示路程) -->
        <g v-if="(step ?? 0) >= 2">
          <text :x="X_A_START + 312.5 * SCALE + 28" :y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#2dd4bf" :style="HALO">
            小鸟路程 s = v·t = 50 m/s × 25 s = 1250 m
          </text>
        </g>
        <g v-else>
          <text :x="X_A_START + 60" :y="28" font-size="12" font-weight="bold" fill="#2dd4bf" :style="HALO">v_鸟 = 50 m/s (往复折返收敛)</text>
        </g>
      </g>

      <!-- ════════ 5. A 车 (向右行驶，车头前保险杠在 x = 0，车身朝左延展) ════════ -->
      <g :transform="`translate(${currentCarA_Head}, ${Y_GROUND})`">
        <!-- 速度矢量箭头 -->
        <CourseArrow :from="{ x: -46, y: -38 }" :to="{ x: 4, y: -38 }" stroke="#60a5fa" :stroke-width="2.4" :head-size="9" />
        <text x="-20" y="-45" text-anchor="middle" font-size="12" font-weight="bold" fill="#60a5fa" :style="HALO">v_A = 10 m/s</text>

        <!-- 车体 (长 50, 高 20, 车头最前端在 x = 0, 车尾在 x = -50) -->
        <path
          d="M -50 -5 L -50 -18 Q -48 -24 -38 -24 L -24 -24 Q -16 -24 -12 -16 L -2 -13 L 0 -10 L 0 -5 Z"
          fill="rgba(56, 189, 248, 0.25)"
          stroke="#38bdf8"
          stroke-width="2.2"
          stroke-linejoin="round"
        />
        <!-- 车窗 -->
        <path d="M -36 -22 L -25 -22 L -15 -15 L -25 -15 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#7dd3fc" stroke-width="1.2" />
        <path d="M -23 -22 L -13 -15 L -4 -14 L -12 -22 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#7dd3fc" stroke-width="1.2" />

        <!-- 车辆 A 标识牌 -->
        <rect x="-32" y="-13" width="13" height="6.5" rx="1.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
        <text x="-25.5" y="-8" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#38bdf8">A</text>

        <!-- 车头灯（朝右）与尾灯（朝左） -->
        <path d="M -1 -10 L 0 -10 L 0 -6 L -2 -6 Z" fill="#fde047" stroke="#eab308" stroke-width="0.8" />
        <rect x="-50" y="-14" width="2" height="4" fill="#f87171" />

        <!-- 两个车轮 (后轮 x = -38, 前轮 x = -12) -->
        <g transform="translate(-38, -6)">
          <circle cx="0" cy="0" r="6.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.8" />
          <circle cx="0" cy="0" r="2.2" fill="#38bdf8" />
        </g>
        <g transform="translate(-12, -6)">
          <circle cx="0" cy="0" r="6.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.8" />
          <circle cx="0" cy="0" r="2.2" fill="#38bdf8" />
        </g>
      </g>

      <!-- ════════ 6. B 车 (向左行驶，车头前保险杠在 x = 0，车身朝右延展) ════════ -->
      <g :transform="`translate(${currentCarB_Head}, ${Y_GROUND})`">
        <!-- 速度矢量箭头 -->
        <CourseArrow :from="{ x: 46, y: -38 }" :to="{ x: -4, y: -38 }" stroke="#e2a846" :stroke-width="2.6" :head-size="9" />
        <text x="20" y="-45" text-anchor="middle" font-size="12" font-weight="bold" fill="#e2a846" :style="HALO">v_B = 30 m/s</text>

        <!-- 车体 (长 50, 高 20, 车头最前端在 x = 0, 车尾在 x = +50) -->
        <path
          d="M 50 -5 L 50 -18 Q 48 -24 38 -24 L 24 -24 Q 16 -24 12 -16 L 2 -13 L 0 -10 L 0 -5 Z"
          fill="rgba(226, 168, 70, 0.25)"
          stroke="#e2a846"
          stroke-width="2.2"
          stroke-linejoin="round"
        />
        <!-- 车窗 -->
        <path d="M 36 -22 L 25 -22 L 15 -15 L 25 -15 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#fde047" stroke-width="1.2" />
        <path d="M 23 -22 L 13 -15 L 4 -14 L 12 -22 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#fde047" stroke-width="1.2" />

        <!-- 车辆 B 标识牌 -->
        <rect x="19" y="-13" width="13" height="6.5" rx="1.5" fill="#0f172a" stroke="#e2a846" stroke-width="1" />
        <text x="25.5" y="-8" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#e2a846">B</text>

        <!-- 车头灯（朝左）与尾灯（朝右） -->
        <path d="M 1 -10 L 0 -10 L 0 -6 L 2 -6 Z" fill="#fde047" stroke="#eab308" stroke-width="0.8" />
        <rect x="48" y="-14" width="2" height="4" fill="#f87171" />

        <!-- 两个车轮 (前轮 x = +12, 后轮 x = +38) -->
        <g transform="translate(12, -6)">
          <circle cx="0" cy="0" r="6.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.8" />
          <circle cx="0" cy="0" r="2.2" fill="#e2a846" />
        </g>
        <g transform="translate(38, -6)">
          <circle cx="0" cy="0" r="6.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.8" />
          <circle cx="0" cy="0" r="2.2" fill="#e2a846" />
        </g>
      </g>

      <!-- ════════ 7. 可爱简笔画线框小鸟 (按航向水平翻转，振翅飞翔) ════════ -->
      <g :transform="`translate(${currentBird.x}, ${currentBird.y}) scale(${currentBird.facing}, 1)`">
        <!-- 飞行气流尾迹 -->
        <g v-if="currentBird.flying">
          <line x1="-14" y1="-2" x2="-22" y2="-2" stroke="#2dd4bf" stroke-width="1.2" stroke-linecap="round" opacity="0.6" />
          <line x1="-12" y1="3" x2="-18" y2="3" stroke="#2dd4bf" stroke-width="1.0" stroke-linecap="round" opacity="0.4" />
        </g>

        <!-- 鸟身 -->
        <path
          d="M -10 2 Q -12 -5 -5 -8 Q 3 -10 8 -3 Q 12 2 10 7 Q 6 12 -3 10 Q -8 8 -10 2 Z"
          fill="rgba(45, 212, 191, 0.32)"
          stroke="#2dd4bf"
          stroke-width="1.8"
        />

        <!-- 鸟喙与眼睛 -->
        <polygon points="10,-2 15,0.5 9,3" fill="#fbbf24" stroke="#f59e0b" stroke-width="1" />
        <circle cx="5" cy="-2" r="2.6" fill="#0f172a" stroke="#ffffff" stroke-width="1.2" />
        <circle cx="6" cy="-2.8" r="0.9" fill="#ffffff" />

        <!-- 翅膀 (飞行时动态扑动，静止时收起) -->
        <path
          :d="`M -3 1 Q -1 ${-11 + currentBird.wingAngle} 5 ${-9 + currentBird.wingAngle} Q 2 -3 -1 3 Z`"
          fill="rgba(45, 212, 191, 0.55)"
          stroke="#2dd4bf"
          stroke-width="1.6"
          stroke-linejoin="round"
        />

        <!-- 尾羽 -->
        <path d="M -10 2 L -15 -2 M -10 4 L -16 3 M -9 6 L -14 7" stroke="#2dd4bf" stroke-width="1.5" stroke-linecap="round" />
      </g>

      <!-- ════════ 8. 轻量复位/重播按钮 (仅在末态悬停显示，方便单页演示) ════════ -->
      <g v-if="isAtEnd" @click="replay" class="cursor-pointer group" transform="translate(548, 20)">
        <circle cx="0" cy="0" r="11" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.2" />
        <path
          d="M -4 -2 A 5 5 0 1 1 -2 4 M -5 -2 L -2 -2 L -2 1"
          fill="none"
          stroke="#38bdf8"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.two-cars-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.two-cars-svg {
  display: block;
  width: 100%;
  max-width: 580px;
  height: auto;
  margin: 0 auto;
}
</style>
