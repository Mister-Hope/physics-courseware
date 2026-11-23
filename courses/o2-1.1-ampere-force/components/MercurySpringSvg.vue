<!-- 第 17 页：通电弹簧下端接触水银（电流通过弹簧，同向电流相互吸引） -->
<script setup>
defineProps({ step: { type: Number, default: 0 } });
</script>

<template>
  <svg viewBox="0 0 480 340" width="480" height="340" class="course-fig" role="img" aria-label="通电弹簧接触水银示意">
    <!-- 支架 -->
    <line x1="240" y1="18" x2="240" y2="52" stroke="var(--c-text-dim)" stroke-width="5" stroke-linecap="round" />
    <line x1="140" y1="18" x2="340" y2="18" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <!-- 弹簧：下端刚好接触水银面（y=274） -->
    <path
      d="M240 52 L226 60 L254 68 L226 76 L254 84 L226 92 L254 100 L226 108 L254 116 L226 124 L254 132 L226 140 L254 148 L226 156 L254 164 L226 172 L254 180 L226 188 L254 196 L226 204 L254 212 L226 220 L254 228 L226 236 L254 244 L226 252 L254 260 L240 274"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- 水银槽 -->
    <path d="M170 262 H310 L298 306 H182 Z" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <path d="M174 274 H306 L298 302 H182 Z" fill="var(--c-accent-2)" opacity="0.3" />
    <text x="240" y="326" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">水银</text>
    <!-- 电路：弹簧上端 → 开关 → 电源 → 水银槽 → 水银 → 弹簧下端 -->
    <path d="M240 52 H100 V178" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-linecap="round" />
    <CircuitSwitch :x="100" :y="200" :open="false" />
    <path d="M100 222 V282" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-linecap="round" />
    <CircuitBattery :x="100" :y="290" orientation="vertical" />
    <path d="M100 298 V320 H180 V306" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M310 290 H330" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="338" y="294" fill="var(--c-text-dim)" font-size="12">接水银</text>
    <!-- 电流方向（点击后） -->
    <g v-show="step >= 1">
      <CourseArrow :from="{ x: 262, y: 70 }" :to="{ x: 262, y: 150 }" stroke="var(--c-accent-2)" :stroke-width="2" label="I" />
    </g>
  </svg>
</template>
