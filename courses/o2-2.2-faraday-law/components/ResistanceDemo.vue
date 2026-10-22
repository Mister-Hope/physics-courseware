<!--
  P5：感应电动势与回路电阻无关。
  棒以恒定速度切割磁感线：E = Blv 固定；改变外电阻 R，电流 I = E/(R+r) 随之改变。
  读数按真实公式计算（B = 0.5 T、l = 1.0 m、v = 4.0 m/s、r = 0.5 Ω）。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const B = 0.5;
const L = 1;
const V = 4;
const R_INNER = 0.5;

/** 外电阻（Ω） */
const R = ref(1.5);

const emf = computed(() => B * L * V);
const current = computed(() => emf.value / (R.value + R_INNER));
</script>

<template>
  <div class="fl-panel">
    <div class="half-grid fl-fill fl-split-wide items-center">
      <!-- 左：电路 -->
      <div>
        <svg viewBox="0 0 540 300" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <FieldDots :x="162" :y="118" :cols="7" :rows="3" :spacing="40" dir="in" />

          <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
            <path d="M 150 90 H 500" />
            <path d="M 150 230 H 384" />
            <path d="M 416 230 H 500" />
            <path d="M 500 90 V 131" />
            <path d="M 500 179 V 230" />
          </g>

          <CircuitResistor :x="500" :y="155" orientation="vertical" label="R" />
          <CircuitMeter :x="400" :y="230" kind="a" />

          <!-- 导体棒（相当于电源） -->
          <line
            x1="150"
            y1="80"
            x2="150"
            y2="240"
            stroke="var(--c-accent)"
            stroke-width="5"
            stroke-linecap="round"
          />

          <CourseArrow
            :from="{ x: 162, y: 62 }"
            :to="{ x: 246, y: 62 }"
            stroke="var(--c-velocity)"
            :stroke-width="2.6"
          />
          <text
            x="256"
            y="68"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="18"
            fill="var(--c-velocity)"
          >
            v
          </text>

          <CourseArrow
            :from="{ x: 150, y: 218 }"
            :to="{ x: 150, y: 102 }"
            stroke="var(--c-accent-2)"
            :stroke-width="3.2"
          />
          <CourseArrow
            :from="{ x: 196, y: 90 }"
            :to="{ x: 330, y: 90 }"
            stroke="var(--c-accent-2)"
            :stroke-width="2.6"
          />
          <CourseArrow
            :from="{ x: 334, y: 230 }"
            :to="{ x: 196, y: 230 }"
            stroke="var(--c-accent-2)"
            :stroke-width="2.6"
          />

          <text
            x="120"
            y="160"
            text-anchor="end"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="19"
            fill="var(--c-accent)"
          >
            E
          </text>
          <text x="122" y="180" text-anchor="end" font-size="13" fill="var(--c-text-dim)">
            电源
          </text>
        </svg>
      </div>

      <!-- 右：调外电阻，看读数 -->
      <div class="stack">
        <div class="fl-read">
          <div class="fl-item">
            <span class="fl-k">电动势 <Latex tex="E" /> / V</span>
            <span class="fl-v">{{ emf.toFixed(1) }}</span>
          </div>
          <div class="fl-item">
            <span class="fl-k">电流 <Latex tex="I" /> / A</span>
            <span class="fl-v">{{ current.toFixed(2) }}</span>
          </div>
          <div class="fl-item">
            <span class="fl-k">外电阻 <Latex tex="R" /> / <Latex tex="\Omega" /></span>
            <span class="fl-v">{{ R.toFixed(1) }}</span>
          </div>
        </div>

        <CourseSlider
          v-model="R"
          :min="0.5"
          :max="3.5"
          :step="0.1"
          layout="bare"
          aria-label="外电阻"
        />

        <div class="mini-note">棒的内阻 <Latex tex="r = 0.5\ \Omega" />。</div>
      </div>
    </div>
  </div>
</template>
