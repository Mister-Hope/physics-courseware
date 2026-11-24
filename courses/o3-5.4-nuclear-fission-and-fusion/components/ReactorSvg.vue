<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const fuelXs: number[] = [200, 242, 284, 326, 368];

const controlXs: number[] = [222, 264, 306, 348];

const reveal = (at: number): { visibility: "visible" | "hidden" } => ({
  visibility: step >= at ? "visible" : "hidden",
});
</script>

<template>
  <!-- 第 8 页：核反应堆结构示意。燃料棒、慢化剂、控制棒、冷却剂与热交换器、防护层按点击分步标注 -->
  <svg viewBox="0 0 820 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="核反应堆结构示意图">
    <rect x="120" y="20" width="340" height="340" rx="14" fill="none" stroke="var(--c-text-dim)" stroke-width="8" opacity="0.35" />
    <rect x="145" y="45" width="290" height="290" rx="10" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
    <rect x="215" y="46" width="150" height="5" rx="2" fill="var(--c-text-dim)" opacity="0.6" />
    <rect v-for="x in fuelXs" :key="`fuel-${x}`" :x="x" y="150" width="12" height="170" rx="4" fill="var(--c-accent)" />
    <rect v-for="x in controlXs" :key="`control-${x}`" :x="x" y="55" width="10" height="140" rx="3" fill="var(--c-physics)" opacity="0.9" />
    <rect x="620" y="110" width="140" height="160" rx="10" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="2" />
    <path
      d="M 640 145 H 740 V 170 H 640 V 195 H 740 V 220 H 640"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <text x="690" y="98" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">热交换器</text>
    <g :style="reveal(1)">
      <line x1="380" y1="210" x2="468" y2="210" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.55" />
      <text x="474" y="214" font-size="13" fill="var(--c-accent)">燃料棒（铀棒）</text>
    </g>
    <g :style="reveal(2)">
      <line x1="435" y1="300" x2="468" y2="300" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.55" />
      <text x="474" y="304" font-size="13" fill="var(--c-accent-2)">慢化剂（堆芯内的水）</text>
    </g>
    <g :style="reveal(3)">
      <line x1="358" y1="80" x2="468" y2="80" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.55" />
      <text x="474" y="84" font-size="13" fill="var(--c-physics)">控制棒（镉）</text>
    </g>
    <g :style="reveal(4)">
      <CourseArrow :from="{ x: 435, y: 130 }" :to="{ x: 612, y: 150 }" stroke="var(--c-danger)" stroke-width="3" />
      <CourseArrow :from="{ x: 612, y: 250 }" :to="{ x: 435, y: 270 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <text x="523" y="112" text-anchor="middle" font-size="13" fill="var(--c-danger)">冷却剂（水）</text>
      <text x="290" y="376" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">防护层（厚水泥）</text>
    </g>
  </svg>
</template>
