<!--
  第 6 页「能量的耗散」：电灯、电风扇、内燃机三种典型装置都是一边转化、一边把相当一部分能量
  变成废热散进周围环境——散出去的内能再也收集不回来。
  step 0：装置与能量转化；step 1：揭晓伴随损耗；step 2：废热散入周围环境；step 3：各装置的能量去向说明。
  外观遵循本课设计系统：不画背景框、不留虚线边框（直接继承幻灯片底色），
  字号与色板同其它页，落点行沿用 .key 的「左侧一道彩色竖线」语言；
  I²Rt 用 KaTeX 数学字体（量斜体、指数上标），不写 Unicode 上标。
  版面：viewBox 900×266（≈ 260px 高），与本页正文卡片共用时正好落在 .page-grow 可用高度内。
-->
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 步进：0 装置与转化 / 1 伴随损耗 / 2 废热散入环境 / 3 能量去向说明（默认 3，全部展开） */
  step?: number;
  /** 损耗、散失与说明层总开关（默认 true） */
  showDissipation?: boolean;
}

const { step = 3, showDissipation = true } = defineProps<Props>();

/** 页面最后一次点击留给正文卡片，超过 3 的步进按 3 处理 */
const s = computed(() => Math.min(Math.max(step, 0), 3));
const loss = computed(() => showDissipation && s.value >= 1);
const env = computed(() => showDissipation && s.value >= 2);
const why = computed(() => showDissipation && s.value >= 3);
</script>

<template>
  <svg viewBox="0 0 900 266" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ds-motor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#075985" />
      </linearGradient>
      <linearGradient id="ds-flame" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
        <stop offset="60%" stop-color="#f97316" stop-opacity="0.7" />
        <stop offset="100%" stop-color="var(--c-accent-light)" stop-opacity="0.25" />
      </linearGradient>
    </defs>

    <!-- ── 实例①：电池与电灯 ── -->
    <g transform="translate(20, 8)">
      <rect x="0" y="0" width="260" height="228" rx="16" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="var(--c-text)">① 电池与电灯</text>
      <g transform="translate(130, 92) scale(0.9)">
        <path
          d="M -86 28 H -64 M -48 28 H 70 M 70 28 V -40 M 70 -40 H 32 M 8 -40 H -86 M -86 -40 V 28"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <circle cx="20" cy="-40" r="22" fill="rgba(254,240,138,0.1)" />
        <CircuitBattery :x="-56" :y="28" orientation="horizontal" polarity />
        <CircuitBulb :x="20" :y="-40" />
        <CourseArrow :from="{ x: -20, y: 14 }" :to="{ x: 14, y: 14 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
        <text x="-3" y="4" text-anchor="middle" font-size="14" fill="var(--c-accent-light)">电能</text>
        <text x="-56" y="0" text-anchor="middle" font-size="15" fill="var(--c-accent)">化学能</text>
        <text x="44" y="-44" text-anchor="start" font-size="15" fill="#fef08a">光能</text>
      </g>
      <rect x="14" y="140" width="3" height="20" rx="1.5" fill="var(--c-accent)" />
      <text x="26" y="155" font-size="17" fill="var(--c-neutral-200)">化学能 → 电能 → 光能</text>
      <g v-if="loss">
        <rect x="14" y="166" width="3" height="20" rx="1.5" fill="var(--c-force)" />
        <text x="26" y="181" font-size="17" fill="var(--c-force)">内阻发热 ＋ 灯泡发热</text>
      </g>
      <g v-if="why" fill="var(--c-text-dim)" font-size="14">
        <text x="26" y="200">仅小部分化为光，</text>
        <text x="26" y="218">绝大部分变为内能散入周围环境</text>
      </g>
    </g>

    <!-- ── 实例②：电动机与电风扇 ── -->
    <g transform="translate(320, 8)">
      <rect x="0" y="0" width="260" height="228" rx="16" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="var(--c-text)">② 电动机与电风扇</text>
      <g transform="translate(130, 92) scale(0.9)">
        <text x="-88" y="-6" text-anchor="middle" font-size="14" fill="var(--c-velocity)">电能</text>
        <CourseArrow :from="{ x: -72, y: 0 }" :to="{ x: -26, y: 0 }" stroke="var(--c-velocity)" :stroke-width="2" :head-size="8" />
        <circle cx="16" cy="0" r="20" fill="url(#ds-motor)" stroke="var(--c-physics-light)" stroke-width="1.8" />
        <circle cx="16" cy="0" r="6" fill="var(--c-neutral-200)" stroke="#0284c7" stroke-width="1.6" />
        <g transform="translate(16,0)" fill="color-mix(in srgb, var(--c-physics-light) 40%, transparent)" stroke="var(--c-physics-light)" stroke-width="1.2">
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" />
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" transform="rotate(120)" />
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" transform="rotate(240)" />
        </g>
        <path d="M -8 -22 A 26 26 0 0 1 40 -22" fill="none" stroke="var(--c-physics-light)" stroke-width="1.4" stroke-dasharray="4 3" />
        <text x="16" y="-46" text-anchor="middle" font-size="15" fill="var(--c-physics-light)">机械能（扇叶吹风）</text>
      </g>
      <rect x="14" y="140" width="3" height="20" rx="1.5" fill="var(--c-accent)" />
      <text x="26" y="155" font-size="17" fill="var(--c-neutral-200)">电能 → 机械能</text>
      <g v-if="loss">
        <rect x="14" y="166" width="3" height="20" rx="1.5" fill="var(--c-force)" />
        <text x="26" y="181" font-size="17" fill="var(--c-force)">
          线圈发热
          <tspan font-family="KaTeX_Math" font-style="italic">I</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic" font-size="11" dy="-5">2</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic" dy="5">Rt</tspan>
          ＋ 摩擦
        </text>
      </g>
      <g v-if="why" fill="var(--c-text-dim)" font-size="14">
        <text x="26" y="200">吹出的风受阻停下后，</text>
        <text x="26" y="218">动能全部退降为环境内能</text>
      </g>
    </g>

    <!-- ── 实例③：汽车内燃机（热机） ── -->
    <g transform="translate(620, 8)">
      <rect x="0" y="0" width="260" height="228" rx="16" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="var(--c-text)">③ 汽车内燃机</text>
      <g transform="translate(128, 92) scale(0.9)">
        <text x="-88" y="-4" text-anchor="middle" font-size="14" fill="#f97316">燃料</text>
        <text x="-88" y="14" text-anchor="middle" font-size="14" fill="var(--c-accent)">化学能</text>
        <CourseArrow :from="{ x: -70, y: 5 }" :to="{ x: -32, y: 5 }" stroke="#f97316" :stroke-width="2" :head-size="8" />
        <path d="M -26 -32 V 16 H 26 V -32" fill="none" stroke="var(--c-neutral-500)" stroke-width="2.4" stroke-linecap="round" />
        <rect x="-23" y="-29" width="46" height="18" rx="2" fill="url(#ds-flame)" />
        <circle cx="0" cy="-30" r="2.4" fill="var(--c-accent-light)" />
        <rect x="-23" y="-8" width="46" height="13" rx="2" fill="var(--c-text-dim)" stroke="var(--c-neutral-300)" stroke-width="1.2" />
        <line x1="0" y1="5" x2="12" y2="28" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="16" cy="30" r="8" fill="none" stroke="var(--c-physics-light)" stroke-width="1.6" />
        <CourseArrow :from="{ x: 32, y: 30 }" :to="{ x: 72, y: 30 }" stroke="var(--c-physics-light)" :stroke-width="2" :head-size="8" />
        <text x="54" y="22" text-anchor="middle" font-size="14" fill="var(--c-physics-light)">机械做功</text>
        <text x="54" y="46" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">仅 30%~40%</text>
      </g>
      <rect x="14" y="140" width="3" height="20" rx="1.5" fill="var(--c-accent)" />
      <text x="26" y="155" font-size="17" fill="var(--c-neutral-200)">化学能 → 机械能</text>
      <g v-if="loss">
        <rect x="14" y="166" width="3" height="20" rx="1.5" fill="var(--c-force)" />
        <text x="26" y="181" font-size="17" fill="var(--c-force)">排气废热 ＋ 机体散热</text>
      </g>
      <g v-if="why" fill="var(--c-text-dim)" font-size="14">
        <text x="26" y="200">高达 60%~70% 的能量</text>
        <text x="26" y="218">以废热形式直接散进周围环境</text>
      </g>
    </g>

    <!-- ── 周围环境：所有装置都嵌在其中，废热最终散入这里 ── -->
    <text x="450" y="260" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">周围环境：散失的内能不可逆地弥散在这里，不会再自动聚集起来</text>
    <g v-if="env" stroke="var(--c-force)" fill="none" stroke-width="2" stroke-dasharray="5 4" opacity="0.85">
      <path d="M 150 238 Q 150 248 132 252" />
      <path d="M 450 238 L 450 252" />
      <path d="M 750 238 Q 750 248 768 252" />
      <circle cx="132" cy="254" r="2.6" fill="var(--c-force)" stroke="none" />
      <circle cx="450" cy="254" r="2.6" fill="var(--c-force)" stroke="none" />
      <circle cx="768" cy="254" r="2.6" fill="var(--c-force)" stroke="none" />
    </g>
  </svg>
</template>
