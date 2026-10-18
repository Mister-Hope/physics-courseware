<script setup lang="ts">
/**
 * 电流表外接法（相对电源外接）电路图： 开关接在电源负极一侧（断开开关时电压表示数归零）；电压表并联在外电路两端（测路端电压）； 电流表只串在外电路（变阻器）这一支路上。 滑动变阻器用共享
 * `<CircuitRheostat>`（长方形线圈 + 滑片箭头）：滑片接线端在长边正外侧 `sliderLength`=16 处，竖直放置时 `x = 线圈中心 400 + 短边/2 8 +
 * 16 = 424`、`y = 116 + slider×48`（`:slider="0.25"` ⇒ 128）， 页面把那根滑片导线画到这个点为止（端点对齐）。 元件符号一律用共享
 * <CircuitBattery> / <CircuitMeter> / <CircuitRheostat> / <CircuitSwitch>，导线手画（1.6）。 step ≥ 1
 * 用虚线框圈出"外电路"。
 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
      <!-- 导线：止于元件两端（电源极板 / 开关触点 / 电表圆周 / 电阻矩形边） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 80 60 H 294" />
        <path d="M 326 60 H 400" />
        <path d="M 400 60 V 116" />
        <path d="M 400 164 V 220" />
        <path d="M 400 220 H 140" />
        <path d="M 100 220 H 80" />
        <path d="M 80 60 V 132" />
        <path d="M 80 148 V 220" />
        <path d="M 200 60 V 124" />
        <path d="M 200 156 V 220" />
        <!-- 滑片的引出支路：从滑片接线端向上接到线圈上端 -->
        <path d="M 424 128 V 108 H 400" />
      </g>
      <!-- T 形接线点 -->
      <circle cx="200" cy="60" r="3" fill="var(--c-text)" />
      <circle cx="200" cy="220" r="3" fill="var(--c-text)" />
      <circle cx="400" cy="108" r="3" fill="var(--c-text)" />
      <!-- 元件 -->
      <CircuitBattery :x="80" :y="140" orientation="vertical" polarity emf="E, r" />
      <CircuitSwitch :x="120" :y="220" :open="false" label="S" />
      <CircuitMeter :x="200" :y="140" kind="v" />
      <CircuitMeter :x="310" :y="60" kind="a" />
      <CircuitRheostat :x="400" :y="140" orientation="vertical" label="R" :slider="0.25" />
      <!-- 标注：电压 U、电流方向 -->
      <text
        x="176"
        y="146"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-accent-2)"
      >
        U
      </text>
      <CourseArrow
        :from="{ x: 344, y: 60 }"
        :to="{ x: 392, y: 60 }"
        stroke="var(--c-accent)"
        :stroke-width="2.4"
        label="I"
      />
      <!-- 分步标注：电压表并联在外电路两端 -->
      <g v-if="step >= 1">
        <rect
          x="180"
          y="38"
          width="288"
          height="212"
          rx="10"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="324" y="272" text-anchor="middle" font-size="18" fill="var(--c-accent)">
          电压表并联在外电路两端
        </text>
      </g>
    </svg>
  </div>
</template>
