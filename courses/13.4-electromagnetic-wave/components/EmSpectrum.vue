<!--
  第 11、12 页：电磁波谱带（连续色谱 + 动态框选精修版）
  物理逻辑与视觉规约：
    1. 完整连续色谱带（彻底取代 6 个拼接圆角矩形）：
       - 整条宽 840 的连续光谱带从左至右无缝过渡：无线电波（深海靛蓝）→ 红外线（深赤红）
         → 可见光（红-橙-黄-绿-青-蓝-紫完整光谱）→ 紫外线（深紫靛）→ X 射线（高能青蓝）→ γ 射线（极高频紫青）；
       - 色带内部叠加极淡连续变频正弦波（由左疏向右密连续加密），直观呈现“频率 f 增大、波长 λ 减小”的物理连续性；
       - 仅用克制的极细刻度分界线标示六大波段区间，无任何拼块感。
    2. 兼容 Slidev 第 11 页静态总览与第 12 页逐段激活框选：
       - step <= 0（第 11 页默认）：整条连续色谱均匀通透呈现，六波段标签均衡清晰；
       - step >= 1（第 12 页 1~6 步）：非当前波段以柔和半透明暗幕柔化，金色高精度卡尺框选器平滑滑动至对应波段位置并指向下方波段名称。
-->
<script setup lang="ts">
import { computed, useId } from "vue";

const { step = -1 } = defineProps<{ step?: number }>();

interface Band {
  key: string;
  label: string;
  isGamma?: boolean;
}

const bands: Band[] = [
  { key: "radio", label: "无线电波" },
  { key: "ir", label: "红外线" },
  { key: "vis", label: "可见光" },
  { key: "uv", label: "紫外线" },
  { key: "xray", label: "X 射线" },
  { key: "gamma", label: "射线", isGamma: true },
];

const BAR_X = 20;
const BAR_Y = 32;
const BAR_W = 840;
const BAR_H = 46;
const BAR_R = 9;
const SEG_W = BAR_W / bands.length; // 140

const uid = useId();
const specGradId = `emw-cont-${uid}`;
const sheenGradId = `emw-sheen-${uid}`;
const clipId = `emw-clip-${uid}`;
const glowId = `emw-glow-${uid}`;

const active = computed(() => (step >= 1 ? Math.min(step, bands.length) - 1 : -1));

const segX = (i: number): number => BAR_X + i * SEG_W;

// 连续变频正弦波（由左端长波平滑加密至右端 γ 短波，强化物理连续性）
const wavePath = computed(() => {
  const samples = 420;
  const k = 15;
  const base = 3.2;
  const lnK = Math.log(k);
  const midY = BAR_Y + BAR_H / 2;
  const amp = 13.5;

  let d = "";
  for (let s = 0; s <= samples; s += 1) {
    const u = s / samples;
    const x = BAR_X + u * BAR_W;
    const cycles = (base * (k ** u - 1)) / lnK;
    const y = midY - amp * Math.sin(2 * Math.PI * cycles);
    d += `${s === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
});

// 激活波段左右两侧柔暗遮罩宽度，实现聚光灯式局部高亮而保持整条色带不断裂
const leftDimWidth = computed(() => (active.value > 0 ? active.value * SEG_W : 0));
const rightDimX = computed(() =>
  active.value >= 0 ? BAR_X + (active.value + 1) * SEG_W : BAR_X + BAR_W,
);
const rightDimWidth = computed(() =>
  active.value >= 0 && active.value < bands.length - 1
    ? (bands.length - 1 - active.value) * SEG_W
    : 0,
);
</script>

<template>
  <div class="spec">
    <svg
      viewBox="0 0 880 140"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="电磁波谱连续色带：从无线电波、红外线、可见光、紫外线、X射线到γ射线，频率增大，波长减小"
      class="overflow-visible select-none"
    >
      <defs>
        <!-- 1. 完整连续物理电磁波谱渐变（六大波段自然过渡，可见光为红橙黄绿青蓝紫连续光谱） -->
        <linearGradient :id="specGradId" x1="0%" y1="0%" x2="100%" y2="0%">
          <!-- 无线电波 (0% - 16.67%) -->
          <stop offset="0%" stop-color="#1e3a5f" />
          <stop offset="10%" stop-color="#28507e" />
          <stop offset="16.67%" stop-color="#58354d" />
          <!-- 红外线 (16.67% - 33.33%，平滑衔接到可见光红端) -->
          <stop offset="24%" stop-color="#991b1b" />
          <stop offset="33.33%" stop-color="#ef4444" />
          <!-- 可见光连续七色光谱 (33.33% - 50.00%) -->
          <stop offset="36.2%" stop-color="#f97316" />
          <stop offset="39.1%" stop-color="#eab308" />
          <stop offset="42.1%" stop-color="#22c55e" />
          <stop offset="45.2%" stop-color="#06b6d4" />
          <stop offset="47.8%" stop-color="#3b82f6" />
          <stop offset="50%" stop-color="#7c3aed" />
          <!-- 紫外线 (50.00% - 66.67%) -->
          <stop offset="58.5%" stop-color="#5b21b6" />
          <stop offset="66.67%" stop-color="#3730a3" />
          <!-- X 射线 (66.67% - 83.33%) -->
          <stop offset="75.5%" stop-color="#0284c7" />
          <stop offset="83.33%" stop-color="#2563eb" />
          <!-- γ 射线 (83.33% - 100%) -->
          <stop offset="92%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>

        <!-- 2. 微妙顶部玻璃光学高光 -->
        <linearGradient :id="sheenGradId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.20)" />
          <stop offset="42%" stop-color="rgba(255, 255, 255, 0.03)" />
          <stop offset="100%" stop-color="rgba(9, 13, 26, 0.22)" />
        </linearGradient>

        <!-- 3. 整条色带统一圆角裁剪路径 -->
        <clipPath :id="clipId">
          <rect :x="BAR_X" :y="BAR_Y" :width="BAR_W" :height="BAR_H" :rx="BAR_R" />
        </clipPath>

        <!-- 4. 框选高光柔光滤镜 -->
        <filter :id="glowId" x="-8%" y="-25%" width="116%" height="155%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3.5"
            flood-color="#e2a846"
            flood-opacity="0.55"
          />
        </filter>
      </defs>

      <!-- 顶部：频率增大方向 -->
      <text x="440" y="13" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
        频率
        <tspan font-family="KaTeX_Math, serif" font-style="italic">f</tspan>
        增大
      </text>
      <CourseArrow
        :from="{ x: 20, y: 20 }"
        :to="{ x: 860, y: 20 }"
        stroke="var(--c-accent)"
        :stroke-width="1.5"
      />

      <!-- 核心连续电磁波谱带（统一裁剪容器，杜绝拼接缝） -->
      <g :clip-path="`url(#${clipId})`">
        <!-- 整条连续色带底色 -->
        <rect :x="BAR_X" :y="BAR_Y" :width="BAR_W" :height="BAR_H" :fill="`url(#${specGradId})`" />

        <!-- 光学质感高光层 -->
        <rect :x="BAR_X" :y="BAR_Y" :width="BAR_W" :height="BAR_H" :fill="`url(#${sheenGradId})`" />

        <!-- 连续变频正弦波纹（左疏右密） -->
        <path
          :d="wavePath"
          fill="none"
          stroke="rgba(248, 250, 252, 0.26)"
          stroke-width="1.35"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- 波段区间的极细标尺刻度（仅在内部上下边缘轻刻度 + 极淡竖线，不分割色带） -->
        <g v-for="i in bands.length - 1" :key="`tick-${i}`">
          <line
            :x1="segX(i)"
            :y1="BAR_Y"
            :x2="segX(i)"
            :y2="BAR_Y + BAR_H"
            stroke="rgba(9, 13, 26, 0.26)"
            stroke-width="1"
          />
          <line
            :x1="segX(i)"
            :y1="BAR_Y"
            :x2="segX(i)"
            :y2="BAR_Y + 6"
            stroke="rgba(248, 250, 252, 0.45)"
            stroke-width="1.2"
          />
          <line
            :x1="segX(i)"
            :y1="BAR_Y + BAR_H - 6"
            :x2="segX(i)"
            :y2="BAR_Y + BAR_H"
            stroke="rgba(248, 250, 252, 0.45)"
            stroke-width="1.2"
          />
        </g>

        <!-- 非激活区域柔暗遮罩（第 12 页逐段框选时生效） -->
        <rect
          class="dim-mask"
          :x="BAR_X"
          :y="BAR_Y"
          :width="leftDimWidth"
          :height="BAR_H"
          :opacity="active >= 0 ? 1 : 0"
        />
        <rect
          class="dim-mask"
          :x="rightDimX"
          :y="BAR_Y"
          :width="rightDimWidth"
          :height="BAR_H"
          :opacity="active >= 0 ? 1 : 0"
        />
      </g>

      <!-- 整条色带统一细边框 -->
      <rect
        :x="BAR_X"
        :y="BAR_Y"
        :width="BAR_W"
        :height="BAR_H"
        :rx="BAR_R"
        fill="none"
        stroke="rgba(248, 250, 252, 0.20)"
        stroke-width="1.1"
      />

      <!-- 滑动框选器（激活某波段时精准框选该区域并平滑平移动画） -->
      <g
        v-if="active >= 0"
        class="selector-frame"
        :style="{ transform: `translateX(${active * SEG_W}px)` }"
        :filter="`url(#${glowId})`"
      >
        <!-- 选中窗口微亮内衬 + 金色主框 -->
        <rect
          :x="BAR_X - 1"
          :y="BAR_Y - 2.5"
          :width="SEG_W + 2"
          :height="BAR_H + 5"
          rx="7"
          fill="rgba(255, 255, 255, 0.04)"
          stroke="var(--c-accent)"
          stroke-width="2.4"
        />
        <!-- 顶部标尺定位卡扣 -->
        <line
          :x1="BAR_X + SEG_W / 2 - 10"
          :y1="BAR_Y - 2.5"
          :x2="BAR_X + SEG_W / 2 + 10"
          :y2="BAR_Y - 2.5"
          stroke="#fef3c7"
          stroke-width="3"
          stroke-linecap="round"
        />
        <!-- 底部指向当前波段名称的小三角指针 -->
        <polygon
          :points="`${BAR_X + SEG_W / 2 - 5.5},${BAR_Y + BAR_H + 2} ${BAR_X + SEG_W / 2 + 5.5},${BAR_Y + BAR_H + 2} ${BAR_X + SEG_W / 2},${BAR_Y + BAR_H + 8}`"
          fill="var(--c-accent)"
        />
      </g>

      <!-- 六个波段名称标注 -->
      <g
        v-for="(b, i) in bands"
        :key="`label-${b.key}`"
        class="band-label"
        :class="{
          'is-active': active === i,
          'is-dim': active >= 0 && active !== i,
        }"
      >
        <text
          :x="segX(i) + SEG_W / 2"
          y="101"
          text-anchor="middle"
          font-size="15"
          :font-weight="active === i ? 700 : 500"
          :fill="active === i ? 'var(--c-accent)' : 'var(--c-text)'"
        >
          <tspan v-if="b.isGamma" font-family="KaTeX_Math, serif" font-style="italic">γ</tspan>
          <tspan v-if="b.isGamma"> 射线</tspan>
          <tspan v-if="!b.isGamma">{{ b.label }}</tspan>
        </text>
      </g>

      <!-- 底部：波长减小方向 -->
      <text x="440" y="122" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
        波长
        <tspan font-family="KaTeX_Math, serif" font-style="italic">λ</tspan>
        减小
      </text>
      <CourseArrow
        :from="{ x: 20, y: 129 }"
        :to="{ x: 860, y: 129 }"
        stroke="var(--c-physics)"
        :stroke-width="1.5"
      />
    </svg>
  </div>
</template>

<style scoped>
.spec {
  width: 100%;
}

.dim-mask {
  transition:
    x 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
  fill: rgb(9 13 26 / 58%);
}

.selector-frame {
  transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.band-label {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.band-label.is-dim {
  opacity: 0.45;
}

@media (prefers-reduced-motion: reduce) {
  .dim-mask,
  .selector-frame,
  .band-label {
    transition: none;
  }
}
</style>
