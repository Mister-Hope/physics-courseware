<!--
  第 6 页「能量的耗散」：电灯、电风扇、内燃机三种典型装置都是一边转化、一边把相当一部分能量
  变成废热散进周围环境——散出去的内能再也收集不回来。
  step 0：装置与能量转化；step 1：揭晓伴随损耗；step 2：废热散入周围环境（大热库）。
  外观遵循本课设计系统：不画背景框、不留虚线边框（直接继承幻灯片底色），
  字号与色板同其它页，落点行沿用 .key 的「左侧一道彩色竖线」语言；
  I²Rt 用 KaTeX 数学字体（量斜体、指数上标），不写 Unicode 上标。
-->
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 步进：0 装置与转化 / 1 伴随损耗 / 2 废热散入环境（默认 2，全部展开） */
  step?: number;
  /** 损耗与散失层总开关（默认 true） */
  showDissipation?: boolean;
}

const { step = 2, showDissipation = true } = defineProps<Props>();

/** 页面最后一次点击留给正文卡片，超过 2 的步进按 2 处理 */
const s = computed(() => Math.min(Math.max(step, 0), 2));
const loss = computed(() => showDissipation && s.value >= 1);
const env = computed(() => showDissipation && s.value >= 2);
</script>

<template>
  <svg viewBox="0 0 900 306" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ds-batt" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2563eb" />
        <stop offset="60%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </linearGradient>
      <linearGradient id="ds-motor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#075985" />
      </linearGradient>
      <linearGradient id="ds-flame" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
        <stop offset="60%" stop-color="#f97316" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.25" />
      </linearGradient>
    </defs>

    <!-- ── 实例①：电池与电灯 ── -->
    <g transform="translate(20, 14)">
      <rect x="0" y="0" width="260" height="238" rx="16" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#f1f5f9">① 电池与电灯</text>
      <g transform="translate(130, 100)">
        <rect x="-92" y="-20" width="28" height="40" rx="5" fill="url(#ds-batt)" stroke="#60a5fa" stroke-width="1.4" />
        <rect x="-83" y="-25" width="10" height="5" rx="2" fill="#fbbf24" />
        <text x="-78" y="-1" text-anchor="middle" font-size="13" font-weight="bold" fill="#fef08a">+</text>
        <text x="-78" y="15" text-anchor="middle" font-size="14" font-weight="bold" fill="#93c5fd">−</text>
        <text x="-78" y="42" text-anchor="middle" font-size="15" fill="#e2a846">化学能</text>
        <path d="M -64 -12 H -22" fill="none" stroke="#94a3b8" stroke-width="1.6" />
        <path d="M -64 12 H -22" fill="none" stroke="#94a3b8" stroke-width="1.6" />
        <CourseArrow :from="{ x: -52, y: 0 }" :to="{ x: -18, y: 0 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
        <text x="-35" y="-8" text-anchor="middle" font-size="14" fill="#fbbf24">电能</text>
        <circle cx="22" cy="-2" r="26" fill="rgba(254,240,138,0.1)" />
        <circle cx="22" cy="-2" r="17" fill="rgba(254,240,138,0.16)" stroke="#fbbf24" stroke-width="1.8" />
        <path d="M 14 12 L 14 22 H 30 V 12" fill="none" stroke="#cbd5e1" stroke-width="1.6" />
        <path d="M 15 6 Q 22 -4 29 6" fill="none" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
        <g stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round" opacity="0.85">
          <line x1="22" y1="-30" x2="22" y2="-38" />
          <line x1="-2" y1="-22" x2="-9" y2="-29" />
          <line x1="46" y1="-22" x2="53" y2="-29" />
        </g>
        <text x="22" y="-46" text-anchor="middle" font-size="15" fill="#fef08a">光能</text>
      </g>
      <rect x="14" y="160" width="3" height="22" rx="1.5" fill="#e2a846" />
      <text x="26" y="177" font-size="17" fill="#e2e8f0">化学能 → 电能 → 光能</text>
      <g v-if="loss">
        <rect x="14" y="196" width="3" height="22" rx="1.5" fill="#f87171" />
        <text x="26" y="213" font-size="17" fill="#f87171">内阻发热 ＋ 灯泡发热</text>
      </g>
    </g>

    <!-- ── 实例②：电动机与电风扇 ── -->
    <g transform="translate(320, 14)">
      <rect x="0" y="0" width="260" height="238" rx="16" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#f1f5f9">② 电动机与电风扇</text>
      <g transform="translate(130, 100)">
        <text x="-88" y="-6" text-anchor="middle" font-size="14" fill="#60a5fa">电能</text>
        <CourseArrow :from="{ x: -72, y: 0 }" :to="{ x: -26, y: 0 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
        <circle cx="16" cy="0" r="20" fill="url(#ds-motor)" stroke="#38bdf8" stroke-width="1.8" />
        <circle cx="16" cy="0" r="6" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.6" />
        <g transform="translate(16,0)" fill="rgba(56,189,248,0.4)" stroke="#38bdf8" stroke-width="1.2">
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" />
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" transform="rotate(120)" />
          <path d="M 3 -7 C 9 -22 15 -34 7 -36 C -1 -33 -3 -20 -2 -7 Z" transform="rotate(240)" />
        </g>
        <path d="M -8 -22 A 26 26 0 0 1 40 -22" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="4 3" />
        <text x="16" y="-46" text-anchor="middle" font-size="15" fill="#38bdf8">机械能（扇叶吹风）</text>
      </g>
      <rect x="14" y="160" width="3" height="22" rx="1.5" fill="#e2a846" />
      <text x="26" y="177" font-size="17" fill="#e2e8f0">电能 → 机械能</text>
      <g v-if="loss">
        <rect x="14" y="196" width="3" height="22" rx="1.5" fill="#f87171" />
        <text x="26" y="213" font-size="17" fill="#f87171">
          线圈发热
          <tspan font-family="KaTeX_Math" font-style="italic">I</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic" font-size="11" dy="-5">2</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic" dy="5">Rt</tspan>
          ＋ 摩擦
        </text>
      </g>
    </g>

    <!-- ── 实例③：汽车内燃机（热机） ── -->
    <g transform="translate(620, 14)">
      <rect x="0" y="0" width="260" height="238" rx="16" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="1.4" />
      <text x="130" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#f1f5f9">③ 汽车内燃机</text>
      <g transform="translate(125, 98)">
        <text x="-88" y="-4" text-anchor="middle" font-size="14" fill="#f97316">燃料</text>
        <text x="-88" y="14" text-anchor="middle" font-size="14" fill="#e2a846">化学能</text>
        <CourseArrow :from="{ x: -70, y: 5 }" :to="{ x: -32, y: 5 }" stroke="#f97316" :stroke-width="2" :head-size="8" />
        <path d="M -26 -32 V 16 H 26 V -32" fill="none" stroke="#64748b" stroke-width="2.4" stroke-linecap="round" />
        <rect x="-23" y="-29" width="46" height="18" rx="2" fill="url(#ds-flame)" />
        <circle cx="0" cy="-30" r="2.4" fill="#fbbf24" />
        <rect x="-23" y="-8" width="46" height="13" rx="2" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1.2" />
        <line x1="0" y1="5" x2="12" y2="28" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="16" cy="30" r="8" fill="none" stroke="#38bdf8" stroke-width="1.6" />
        <CourseArrow :from="{ x: 32, y: 30 }" :to="{ x: 72, y: 30 }" stroke="#38bdf8" :stroke-width="2" :head-size="8" />
        <text x="54" y="22" text-anchor="middle" font-size="14" fill="#38bdf8">机械做功</text>
        <text x="54" y="48" text-anchor="middle" font-size="12" fill="#94a3b8">仅 30%~40%</text>
      </g>
      <rect x="14" y="160" width="3" height="22" rx="1.5" fill="#e2a846" />
      <text x="26" y="177" font-size="17" fill="#e2e8f0">化学能 → 机械能</text>
      <g v-if="loss">
        <rect x="14" y="196" width="3" height="22" rx="1.5" fill="#f87171" />
        <text x="26" y="213" font-size="17" fill="#f87171">排气废热 ＋ 机体散热</text>
      </g>
    </g>

    <!-- ── 周围环境：所有装置都嵌在其中，废热最终散入这里 ── -->
    <line x1="20" y1="282" x2="880" y2="282" stroke="rgba(148,163,184,0.22)" stroke-width="1.4" />
    <text x="450" y="300" text-anchor="middle" font-size="16" fill="#94a3b8">周围环境：散失的内能不可逆地弥散在这里，不会再自动聚集起来</text>
    <g v-if="env" stroke="#f87171" fill="none" stroke-width="2" stroke-dasharray="5 4" opacity="0.85">
      <path d="M 150 254 Q 150 268 132 274" />
      <path d="M 450 254 L 450 274" />
      <path d="M 750 254 Q 750 268 768 274" />
      <circle cx="132" cy="276" r="2.6" fill="#f87171" stroke="none" />
      <circle cx="450" cy="276" r="2.6" fill="#f87171" stroke="none" />
      <circle cx="768" cy="276" r="2.6" fill="#f87171" stroke="none" />
    </g>
  </svg>
</template>
