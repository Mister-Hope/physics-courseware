<!--
  P9：v 与 B 不垂直时的切割电动势。
  沿导线方向看（导线垂直于纸面）：B 水平，v 与 B 成 θ 角。
  只有垂直于 B 的分速度 v⊥ = v sinθ 切割磁感线，E = Blv sinθ。
  θ 用滑块连续变化，E 与 v⊥ 实时按公式计算（B = 0.5 T、l = 0.8 m、v = 5 m/s）。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const B = 0.5;
const L = 0.8;
const V = 5;

const theta = ref(30);

const OX = 180;
const OY = 245;
const VLEN = 175;
const ARC_R = 58;

const rad = computed(() => (theta.value * Math.PI) / 180);

const vTip = computed(() => ({
  x: OX + VLEN * Math.cos(rad.value),
  y: OY - VLEN * Math.sin(rad.value),
}));

/** 沿 B 方向的分量终点 */
const paraTip = computed(() => ({
  x: OX + VLEN * Math.cos(rad.value),
  y: OY,
}));

/** 垂直 B 方向的分量终点 */
const perpTip = computed(() => ({
  x: OX,
  y: OY - VLEN * Math.sin(rad.value),
}));

const arcPath = computed(() => {
  const endX = OX + ARC_R * Math.cos(rad.value);
  const endY = OY - ARC_R * Math.sin(rad.value);

  return `M ${OX + ARC_R} ${OY} A ${ARC_R} ${ARC_R} 0 0 0 ${endX} ${endY}`;
});

const thetaLabel = computed(() => {
  const mid = rad.value / 2;

  return {
    x: OX + (ARC_R + 20) * Math.cos(mid),
    y: OY - (ARC_R + 20) * Math.sin(mid) + 5,
  };
});

const vPerp = computed(() => V * Math.sin(rad.value));
const emf = computed(() => B * L * vPerp.value);

const showPara = computed(() => Math.cos(rad.value) > 0.02);
const showPerp = computed(() => Math.sin(rad.value) > 0.02);
</script>

<template>
  <div class="half-grid fl-split-wide items-center">
    <!-- 左：沿导线方向的视图 -->
    <div>
      <svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <!-- 匀强磁场 B：两条水平磁感线 -->
        <CourseArrow
          :from="{ x: 92, y: OY }"
          :to="{ x: 440, y: OY }"
          stroke="var(--c-accent)"
          :stroke-width="1.8"
          opacity="0.75"
        />
        <text
          x="450"
          y="252"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="23"
          fill="var(--c-accent)"
        >
          B
        </text>

        <!-- 平行四边形（v 的分解） -->
        <g stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5" fill="none">
          <line :x1="paraTip.x" :y1="paraTip.y" :x2="vTip.x" :y2="vTip.y" />
          <line :x1="perpTip.x" :y1="perpTip.y" :x2="vTip.x" :y2="vTip.y" />
        </g>

        <!-- 分速度 v∥ 与 v⊥ -->
        <template v-if="showPara">
          <CourseArrow
            :from="{ x: OX, y: OY }"
            :to="paraTip"
            stroke="var(--c-velocity)"
            :stroke-width="2"
            stroke-dasharray="7 5"
          />
          <text
            :x="(OX + paraTip.x) / 2"
            :y="OY + 20"
            text-anchor="middle"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="18"
            fill="var(--c-velocity)"
          >
            v cosθ
          </text>
        </template>
        <template v-if="showPerp">
          <CourseArrow
            :from="{ x: OX, y: OY }"
            :to="perpTip"
            stroke="var(--c-physics)"
            :stroke-width="2"
            stroke-dasharray="7 5"
          />
          <text
            :x="OX - 16"
            :y="(OY + perpTip.y) / 2"
            text-anchor="end"
            font-family="KaTeX_Math, serif"
            font-style="italic"
            font-size="18"
            fill="var(--c-physics)"
          >
            v sinθ
          </text>
        </template>

        <!-- 实际速度 v -->
        <CourseArrow
          :from="{ x: OX, y: OY }"
          :to="vTip"
          stroke="var(--c-velocity)"
          :stroke-width="3.4"
        />
        <text
          :x="vTip.x + 10"
          :y="vTip.y - 8"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="23"
          fill="var(--c-velocity)"
        >
          v
        </text>

        <!-- 夹角 θ -->
        <path
          v-if="theta > 0.5"
          :d="arcPath"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
        />
        <text
          v-if="theta > 0.5"
          :x="thetaLabel.x"
          :y="thetaLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="19"
          fill="var(--c-text-dim)"
        >
          θ
        </text>

        <!-- 导线（沿轴向看，是一个截面） -->
        <circle :cx="OX" :cy="OY" r="9" fill="var(--c-text)" opacity="0.9" />
        <circle :cx="OX" :cy="OY" r="2.6" fill="var(--c-bg-soft)" />
        <text :x="OX + 16" :y="OY + 64" font-size="13" fill="var(--c-text-dim)">
          导线（垂直纸面，长
          <tspan font-family="KaTeX_Math, serif" font-style="italic">l</tspan>
          ）
        </text>
      </svg>
    </div>

    <!-- 右：公式与读数 -->
    <div class="stack">
      <div class="text-center">
        <Latex tex="E = B l v \sin\theta" display />
      </div>

      <CourseSlider v-model="theta" :min="0" :max="90" :step="1" layout="bare" aria-label="夹角" />

      <div class="fl-read">
        <div class="fl-item">
          <span class="fl-k"><Latex tex="\theta" /></span>
          <span class="fl-v">{{ theta }}°</span>
        </div>
        <div class="fl-item">
          <span class="fl-k"><Latex tex="v_\perp" /> / (m/s)</span>
          <span class="fl-v">{{ vPerp.toFixed(2) }}</span>
        </div>
        <div class="fl-item">
          <span class="fl-k"><Latex tex="E" /> / V</span>
          <span class="fl-v">{{ emf.toFixed(2) }}</span>
        </div>
      </div>

      <div class="mini-note">
        <Latex tex="\theta" /> 是 <Latex tex="v" /> 与 <Latex tex="B" /> 的夹角；导线同时垂直于
        <Latex tex="v" /> 与 <Latex tex="B" />。 <Latex tex="\theta = 90^\circ" /> 时回到
        <Latex tex="E = Blv" />。
      </div>
    </div>
  </div>
</template>
