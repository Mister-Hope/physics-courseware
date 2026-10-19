<script setup lang="ts">
// 第 14 页：静电除尘 —— 点击分步（无电压滑块）：通电 → B 附近电离 → 电子使粉尘带负电 → 粉尘受 F = qE 吸附到正极 A
import { computed } from "vue";

const { step } = defineProps<{ step: number }>();

const powered = computed(() => step >= 1);
const charged = computed(() => step >= 2);
const collected = computed(() => step >= 3);
</script>

<template>
  <div class="stack">
    <svg
      viewBox="0 0 460 260"
      class="w-full"
      xmlns="http://www.w3.org/2000/svg"
      style="height: 235px"
    >
      <!-- 电极 -->
      <rect
        x="374"
        y="40"
        width="18"
        height="176"
        rx="4"
        fill="var(--c-danger)"
        fill-opacity="0.8"
      />
      <line
        x1="66"
        y1="46"
        x2="66"
        y2="210"
        stroke="var(--c-accent-2)"
        stroke-width="4"
        stroke-linecap="round"
      />
      <text
        x="383"
        y="32"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="14"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text x="52" y="38" font-family="KaTeX_Main" font-size="14" fill="var(--c-velocity)">−</text>
      <text
        x="383"
        y="238"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text)"
      >
        A
      </text>
      <text
        x="66"
        y="238"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text)"
      >
        B
      </text>
      <template v-if="powered">
        <CourseArrow
          v-for="y in [64, 96, 128, 160, 192]"
          :key="`e${y}`"
          :from="{ x: 372, y }"
          :to="{ x: 72, y }"
          stroke="var(--c-field)"
          stroke-width="1.4"
          :opacity="0.6"
        />
        <text x="150" y="58" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">
          B 附近电场最强
        </text>
      </template>
      <!-- 灰尘 -->
      <template v-if="!powered">
        <circle
          v-for="i in 12"
          :key="`d${i}`"
          :cx="100 + ((i * 53) % 250)"
          :cy="60 + ((i * 37) % 140)"
          r="4"
          fill="var(--c-text-mute)"
          fill-opacity="0.6"
        />
        <text
          x="220"
          y="24"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="12"
          fill="var(--c-text-mute)"
        >
          断电：烟雾弥漫
        </text>
      </template>
      <template v-else>
        <template v-if="!collected">
          <g v-for="i in 6" :key="`p${i}`">
            <circle :r="4" :fill="charged ? 'var(--c-velocity)' : 'var(--c-text-mute)'">
              <animateMotion
                dur="2.2s"
                :begin="`${(i - 1) * 0.35}s`"
                repeatCount="indefinite"
                path="M 90 70 L 360 70"
              />
            </circle>
          </g>
        </template>
        <template v-else>
          <g v-for="i in 6" :key="`q${i}`">
            <circle r="4" fill="var(--c-velocity)">
              <animateMotion
                dur="1.4s"
                :begin="`${(i - 1) * 0.18}s`"
                repeatCount="1"
                fill="freeze"
                path="M 90 70 L 362 70"
              />
            </circle>
          </g>
          <g v-for="i in 4" :key="`f${i}`">
            <circle r="3.6" fill="var(--c-velocity)" fill-opacity="0.85">
              <animateMotion
                dur="1.6s"
                :begin="`${1.1 + (i - 1) * 0.3}s`"
                repeatCount="indefinite"
                path="M 364 150 L 386 214"
              />
            </circle>
          </g>
          <text
            x="300"
            y="216"
            text-anchor="middle"
            font-family="KaTeX_Main"
            font-size="12"
            fill="var(--c-accent-2)"
          >
            粉尘吸附到正极 A，落入漏斗
          </text>
        </template>
        <text
          v-if="charged && !collected"
          x="150"
          y="96"
          font-family="KaTeX_Main"
          font-size="12"
          fill="var(--c-accent-2)"
        >
          电子使粉尘带负电
        </text>
      </template>
    </svg>
    <div class="text-[0.95rem]"><Latex tex="F=qE" />　<Latex tex="a=\dfrac{F}{m}" /></div>
  </div>
</template>
