<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 9 页「接触带电与平分电荷」——**两道题各演一遍**，不用滑块：
 *  题一：A 带 +Q、B 不带电 → 点击接触（B 靠拢、电子由 B 转到 A）→ 点击分开，各带 +Q/2；
 *  题二：A 带 +Q、B 带 −3Q → 点击接触 → 点击分开，各带 −Q。
 * 页面 clicks: 4（接触/分开 各两次）。两球靠拢—分开用 translate 过渡演出来。
 */
const { $clicks } = useSlideContext();
const c = computed(() => Math.max(0, Math.min($clicks.value, 4)));

const r1Contact = computed(() => c.value === 1);
const r1Split = computed(() => c.value >= 2);
const r2Contact = computed(() => c.value === 3);
const r2Split = computed(() => c.value >= 4);

/** 接触时 B 向左平移恰好贴上 A（A、B 半径 34，圆心距 140 → 贴住需平移 106） */
const CONTACT_DX = -106;
const b1Shift = computed(() => (r1Contact.value ? CONTACT_DX : 0));
const b2Shift = computed(() => (r2Contact.value ? CONTACT_DX : 0));

const a1Tex = computed(() => (r1Split.value ? "Q/2" : "+Q"));
const b1Tex = computed(() => (r1Split.value ? "Q/2" : "0"));
const a2Tex = computed(() => (r2Split.value ? "-Q" : "+Q"));
const b2Tex = computed(() => (r2Split.value ? "-Q" : "-3Q"));
const colorOf = (t: string) => (t.startsWith("+") || t === "Q/2" ? "var(--c-danger)" : t === "0" ? "var(--c-text-dim)" : "var(--c-velocity)");
</script>

<template>
  <svg viewBox="0 0 560 360" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- ══ 题一 ══ -->
    <text x="26" y="98" font-size="20" fill="var(--c-text-dim)">题一</text>
    <g>
      <circle cx="186" cy="92" r="34" fill="var(--c-danger)" fill-opacity="0.22" stroke="var(--c-danger)" stroke-width="2.4" />
      <text x="186" y="92" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="24" :fill="colorOf(a1Tex)">{{ a1Tex }}</text>
      <text x="186" y="36" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">A</text>
    </g>
    <g style="transition: transform 0.45s ease" :transform="`translate(${b1Shift} 0)`">
      <circle cx="326" cy="92" r="34" :fill="colorOf(b1Tex)" fill-opacity="0.22" :stroke="colorOf(b1Tex)" stroke-width="2.4" />
      <text x="326" y="92" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="24" :fill="colorOf(b1Tex)">{{ b1Tex }}</text>
      <text x="326" y="36" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">B</text>
    </g>
    <!-- 接触时：电子由 B 转移到 A -->
    <g v-if="r1Contact">
      <CourseArrow :from="{ x: 300, y: 20 }" :to="{ x: 240, y: 20 }" stroke="var(--c-velocity)" stroke-width="2.6" />
      <text x="270" y="8" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">e</text>
    </g>

    <!-- ══ 题二 ══ -->
    <text x="26" y="256" font-size="20" fill="var(--c-text-dim)">题二</text>
    <g>
      <circle cx="186" cy="250" r="34" fill="var(--c-danger)" fill-opacity="0.22" stroke="var(--c-danger)" stroke-width="2.4" />
      <text x="186" y="250" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="24" :fill="colorOf(a2Tex)">{{ a2Tex }}</text>
      <text x="186" y="194" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">A</text>
    </g>
    <g style="transition: transform 0.45s ease" :transform="`translate(${b2Shift} 0)`">
      <circle cx="326" cy="250" r="34" :fill="colorOf(b2Tex)" fill-opacity="0.22" :stroke="colorOf(b2Tex)" stroke-width="2.4" />
      <text x="326" y="250" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="24" :fill="colorOf(b2Tex)">{{ b2Tex }}</text>
      <text x="326" y="194" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">B</text>
    </g>
    <g v-if="r2Contact">
      <CourseArrow :from="{ x: 300, y: 178 }" :to="{ x: 240, y: 178 }" stroke="var(--c-velocity)" stroke-width="2.6" />
      <text x="270" y="166" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">e</text>
    </g>

    <text x="280" y="330" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">两个完全相同的金属球</text>
  </svg>
</template>
