<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 皮带轮传动：主动轮 M（左、大轮）带动从动轮 N（右、小轮）。
 *
 * 不引入"静摩擦/最大静摩擦"的计算，只沿"运动方向 → 相对运动趋势 → 摩擦力方向"三步推：
 *
 * 1. M 主动顺时针转动，N 从动；皮带被 M 带动（上段向右、下段向左）。
 * 2. 皮带在 M 处相对轮面有向后（滞后）的运动趋势 → M 对皮带的摩擦力向前，是皮带前进的动力。
 * 3. 皮带在 N 处相对轮面向前（超前）→ N 对皮带的摩擦力向后；反过来皮带把 N 带着转。
 */

const { $clicks } = useSlideContext();
/** 页面点击步：1 转向 → 2 皮带方向 → 3 摩擦力方向 */
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));
</script>

<template>
  <div class="bpf-wrap">
    <div class="bpf-figure">
      <svg viewBox="0 0 620 250" width="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 150 74 L 470 92 A 40 40 0 0 1 470 172 L 150 190 A 58 58 0 0 1 150 74 Z"
          fill="rgba(148,163,184,0.07)"
          stroke="var(--c-text-dim)"
          stroke-width="2.2"
        />
        <circle
          cx="150"
          cy="132"
          r="58"
          fill="rgba(96,165,250,0.1)"
          stroke="var(--c-accent-2)"
          stroke-width="2.4"
        />
        <circle
          cx="470"
          cy="132"
          r="40"
          fill="rgba(45,212,191,0.1)"
          stroke="var(--c-physics)"
          stroke-width="2.2"
        />
        <path
          d="M 150 98 A 34 34 0 0 1 184 132"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="3"
        />
        <polygon points="178,122 190,122 184,137" fill="var(--c-accent)" />
        <path
          d="M 470 112 A 20 20 0 0 1 490 132"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.6"
        />
        <polygon points="485,124 495,124 490,137" fill="var(--c-accent)" />
        <text
          x="150"
          y="140"
          text-anchor="middle"
          font-size="24"
          fill="var(--c-accent-2)"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          M
        </text>
        <text
          x="470"
          y="139"
          text-anchor="middle"
          font-size="20"
          fill="var(--c-physics)"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          N
        </text>
        <text x="150" y="218" text-anchor="middle" font-size="15" fill="var(--c-accent-2)">
          主动轮 M
        </text>
        <text x="470" y="218" text-anchor="middle" font-size="15" fill="var(--c-physics)">
          从动轮 N
        </text>
        <g v-if="step >= 2">
          <CourseArrow
            :from="{ x: 248, y: 79.5 }"
            :to="{ x: 356, y: 85.6 }"
            stroke="var(--c-physics)"
            stroke-width="3"
          />
          <CourseArrow
            :from="{ x: 356, y: 178.6 }"
            :to="{ x: 248, y: 184.6 }"
            stroke="var(--c-physics)"
            stroke-width="3"
          />
        </g>
        <g v-if="step >= 3">
          <CourseArrow
            :from="{ x: 138, y: 56 }"
            :to="{ x: 238, y: 60 }"
            stroke="var(--c-accent)"
            stroke-width="3.4"
          />
          <text x="188" y="42" text-anchor="middle" font-size="15" fill="var(--c-accent)">
            M 对皮带
          </text>
          <CourseArrow
            :from="{ x: 474, y: 78 }"
            :to="{ x: 378, y: 73.4 }"
            stroke="var(--c-accent)"
            stroke-width="3.4"
          />
          <text x="428" y="60" text-anchor="middle" font-size="15" fill="var(--c-accent)">
            N 对皮带
          </text>
        </g>
      </svg>
    </div>

    <div class="bpf-side">
      <div class="bpf-line" :class="{ 'bpf-hidden': step < 1 }">
        <span class="bpf-num">1</span>主动轮 <Latex tex="M" /> 转动，通过皮带带动 <Latex tex="N" />
      </div>
      <div class="bpf-line" :class="{ 'bpf-hidden': step < 2 }">
        <span class="bpf-num">2</span>皮带被带动：上段向右、下段向左
      </div>
      <div class="bpf-line" :class="{ 'bpf-hidden': step < 3 }">
        <span class="bpf-num">3</span><Latex tex="M" /> 处：皮带相对轮面<b class="text-accent-2"
          >滞后</b
        >
        → 摩擦力沿<b class="text-accent">顺时针方向</b>
      </div>
      <div class="bpf-line" :class="{ 'bpf-hidden': step < 3 }">
        <span class="bpf-num">4</span><Latex tex="N" /> 处：皮带相对轮面<b class="text-accent-2"
          >超前</b
        >
        → 摩擦力沿<b class="text-accent">逆时针方向</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bpf-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  min-width: 0;
}

.bpf-figure {
  display: flex;
  flex: 1 1 54%;
  align-items: center;

  min-width: 0;
  max-width: 30rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);
}

.bpf-side {
  display: flex;
  flex: 1 1 46%;
  flex-direction: column;
  gap: 0.55rem;

  min-width: 0;

  font-size: 0.9rem;
  line-height: 1.55;
}

.bpf-line {
  display: block;
}

.bpf-hidden {
  visibility: hidden;
}

.bpf-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.4rem;
  border-radius: 50%;

  background: rgb(226 168 70 / 18%);
  color: var(--c-accent);

  font-size: 0.75rem;
}
</style>
