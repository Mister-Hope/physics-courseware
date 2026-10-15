<!--
  阴极射线管结构图 (CathodeRayTubeSvg.vue - 精修修正版)
  —— 彻底修正原版阳极与阴极不平行的透视硬伤：
     阴极与阳极均沿管截面垂直放置（严格同轴平行），阳极中心开有小圆孔加速通孔；
     挡板中心开狭缝；荧光板右端倾斜掠射。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 3 } = defineProps<{ step?: number }>();

const s = computed(() => step);
const dim = "rgba(148,163,184,0.4)";
const dimFill = "rgba(148,163,184,0.1)";

const strokeOf = (active: boolean, color: string): { stroke: string; transition: string } => ({
  stroke: active ? color : dim,
  transition: "stroke .3s",
});
const fillOf = (active: boolean, color: string): { fill: string; transition: string } => ({
  fill: active ? color : dimFill,
  transition: "fill .3s",
});
const textOf = (active: boolean, color: string): { fill: string; transition: string } => ({
  fill: active ? color : "#94a3b8",
  transition: "fill .3s",
});
</script>

<template>
  <svg
    viewBox="0 0 720 420"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full select-none"
    role="img"
    aria-label="阴极射线管结构示意图"
  >
    <defs>
      <!-- 玻璃管高光与微透渐变 -->
      <linearGradient id="crt-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
        <stop
          offset="25%"
          stop-color="color-mix(in srgb, var(--c-surface-solid) 25%, transparent)"
        />
        <stop offset="75%" stop-color="color-mix(in srgb, var(--c-neutral-900) 40%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-text-dim) 15%, transparent)" />
      </linearGradient>

      <!-- 电子束发光滤镜 -->
      <filter id="crt-glow" x="-20%" y="-100%" width="140%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- ── 部件名（统一在管上方一行）+ 引线 ── -->
    <text
      x="94"
      y="86"
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      :style="textOf(s >= 1, '#e2a846')"
    >
      阴极
    </text>
    <text
      x="204"
      y="86"
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      :style="textOf(s >= 1, '#e2a846')"
    >
      阳极
    </text>
    <text
      x="432"
      y="86"
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      :style="textOf(s >= 2, '#60a5fa')"
    >
      挡板·狭缝
    </text>
    <text
      x="600"
      y="86"
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      :style="textOf(s >= 3, '#2dd4bf')"
    >
      荧光板
    </text>

    <!-- 竖直对齐引线 -->
    <g stroke-width="1.3" stroke-dasharray="4 4">
      <line x1="94" y1="94" x2="94" y2="166" :style="strokeOf(s >= 1, 'rgba(226,168,70,0.7)')" />
      <line x1="204" y1="94" x2="204" y2="166" :style="strokeOf(s >= 1, 'rgba(226,168,70,0.7)')" />
      <line x1="432" y1="94" x2="432" y2="118" :style="strokeOf(s >= 2, 'rgba(96,165,250,0.7)')" />
      <line x1="600" y1="94" x2="600" y2="190" :style="strokeOf(s >= 3, 'rgba(45,212,191,0.7)')" />
    </g>

    <!-- ── 玻璃管主体（带两端封头圆弧） ── -->
    <rect
      x="50"
      y="120"
      width="610"
      height="170"
      rx="85"
      fill="url(#crt-glass)"
      stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
      stroke-width="2"
    />
    <!-- 玻璃管壁上下反光细线 -->
    <line x1="135" y1="123" x2="575" y2="123" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" />
    <line x1="135" y1="287" x2="575" y2="287" stroke="rgba(255,255,255,0.12)" stroke-width="1" />

    <!-- ── 电子束（step ≥ 3 时点亮；平时暗淡但可见） ── -->
    <g :style="{ opacity: s >= 3 ? 1 : 0.22, transition: 'opacity .35s' }">
      <!-- 阴极发射向阳极的锥形聚焦束 -->
      <polygon
        points="98,185 200,198 200,212 98,225"
        fill="color-mix(in srgb, var(--c-velocity) 25%, transparent)"
      />
      <!-- 穿过阳极孔射向挡板的准直束 -->
      <polygon
        points="208,198 424,196 424,214 208,212"
        fill="color-mix(in srgb, var(--c-velocity) 30%, transparent)"
      />
      <!-- 穿过狭缝照射在倾斜荧光板上的明亮光带 -->
      <polygon
        points="440,200 605,202 605,208 440,210"
        fill="color-mix(in srgb, var(--c-velocity) 45%, transparent)"
      />

      <!-- 中心高亮度蓝色主束线 -->
      <line
        x1="98"
        y1="205"
        x2="605"
        y2="205"
        stroke="var(--c-velocity-light)"
        stroke-width="2.6"
        filter="url(#crt-glow)"
      />
      <!-- 荧光板激发亮斑 -->
      <circle cx="605" cy="205" r="5" fill="var(--c-physics)" filter="url(#crt-glow)" />
    </g>

    <!-- ── 阴极 (Cathode)：发射电子的负极圆盘 (x = 88~98) ── -->
    <rect
      x="88"
      y="170"
      width="12"
      height="70"
      rx="3"
      :style="fillOf(s >= 1, 'rgba(226,168,70,0.95)')"
      :stroke="s >= 1 ? '#f59e0b' : dim"
      stroke-width="2"
    />

    <!-- ── 阳极 (Anode)：与阴极完全平行！剖面展示中心加速通孔 (上下两段，x = 198~208) ── -->
    <!-- 上段电极板 (y: 168 ~ 197) -->
    <rect
      x="198"
      y="168"
      width="12"
      height="29"
      rx="3"
      :style="fillOf(s >= 1, 'rgba(226,168,70,0.95)')"
      :stroke="s >= 1 ? '#f59e0b' : dim"
      stroke-width="2"
    />
    <!-- 下段电极板 (y: 213 ~ 242) -->
    <rect
      x="198"
      y="213"
      width="12"
      height="29"
      rx="3"
      :style="fillOf(s >= 1, 'rgba(226,168,70,0.95)')"
      :stroke="s >= 1 ? '#f59e0b' : dim"
      stroke-width="2"
    />
    <!-- 阳极中心圆孔提示线 (虚线示意中空通孔通道，y: 197 ~ 213) -->
    <line
      x1="198"
      y1="197"
      x2="210"
      y2="197"
      stroke="color-mix(in srgb, var(--c-accent-glow) 50%, transparent)"
      stroke-width="1.2"
      stroke-dasharray="2 2"
    />
    <line
      x1="198"
      y1="213"
      x2="210"
      y2="213"
      stroke="color-mix(in srgb, var(--c-accent-glow) 50%, transparent)"
      stroke-width="1.2"
      stroke-dasharray="2 2"
    />

    <!-- ── 挡板 + 狭缝 (只让扁平电子束通过，x = 424~440) ── -->
    <rect
      x="424"
      y="120"
      width="16"
      height="76"
      rx="3"
      :style="fillOf(s >= 2, 'rgba(59,130,246,0.6)')"
      :stroke="s >= 2 ? '#3b82f6' : dim"
      stroke-width="1.8"
    />
    <rect
      x="424"
      y="214"
      width="16"
      height="76"
      rx="3"
      :style="fillOf(s >= 2, 'rgba(59,130,246,0.6)')"
      :stroke="s >= 2 ? '#3b82f6' : dim"
      stroke-width="1.8"
    />

    <!-- ── 荧光板（右端斜置，电子束掠射其上显示径迹） ── -->
    <polygon
      points="556,278 642,148 652,154 566,284"
      :style="fillOf(s >= 3, 'rgba(45,212,191,0.55)')"
      :stroke="s >= 3 ? '#2dd4bf' : dim"
      stroke-width="2.2"
    />
    <!-- 荧光板微刻度线 -->
    <line
      x1="580"
      y1="230"
      x2="628"
      y2="174"
      stroke="rgba(204,251,241,0.4)"
      stroke-width="1"
      stroke-dasharray="3 3"
    />

    <!-- ── 高压电源（管下方，引线垂直穿出管壁） ── -->
    <g>
      <!-- 阴极负高压连接线 (从 x = 94, y = 240 穿出到底部) -->
      <path
        d="M 94 240 L 94 360 L 140 360"
        fill="none"
        :style="strokeOf(s >= 1, 'rgba(226,168,70,0.85)')"
        stroke-width="2.2"
      />
      <!-- 阳极正高压连接线 (从 x = 204, y = 242 穿出到底部) -->
      <path
        d="M 204 242 L 204 360 L 166 360"
        fill="none"
        :style="strokeOf(s >= 1, 'rgba(226,168,70,0.85)')"
        stroke-width="2.2"
      />

      <!-- 电源电池符号：短厚负极 + 长薄正极 -->
      <line
        x1="146"
        y1="350"
        x2="146"
        y2="370"
        :style="strokeOf(s >= 1, '#e2a846')"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="158"
        y1="340"
        x2="158"
        y2="380"
        :style="strokeOf(s >= 1, '#e2a846')"
        stroke-width="2.4"
        stroke-linecap="round"
      />

      <!-- 极性标号 -->
      <text
        x="126"
        y="340"
        text-anchor="end"
        font-size="20"
        font-weight="bold"
        :style="textOf(s >= 1, '#60a5fa')"
      >
        －
      </text>
      <text x="180" y="340" font-size="20" font-weight="bold" :style="textOf(s >= 1, '#f87171')">
        ＋
      </text>
      <text
        x="152"
        y="404"
        text-anchor="middle"
        font-size="17"
        font-weight="600"
        :style="textOf(s >= 1, '#e2a846')"
      >
        高压直流电源
      </text>
    </g>
  </svg>
</template>
