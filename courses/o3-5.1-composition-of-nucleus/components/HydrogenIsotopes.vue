<!-- 5.1 氢的同位素：点击原子核增加一个中子（氕 → 氘 → 氚 → 氕），Z 恒为 1，A 随中子数变化 -->
<template>
  <div class="iso">
    <svg
      viewBox="138 42 142 142"
      width="100%"
      role="button"
      tabindex="0"
      aria-label="点击增加一个中子"
      @click="addNeutron"
      @keydown.enter.prevent="addNeutron"
      @keydown.space.prevent="addNeutron"
    >
      <circle
        cx="188"
        cy="112"
        r="30"
        fill="var(--c-danger)"
        stroke="var(--c-bg)"
        stroke-width="2.5"
      />
      <text
        x="188"
        y="120"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="23"
        fill="var(--c-bg)"
      >
        p
      </text>
      <g v-if="neutrons >= 1">
        <circle
          cx="236"
          cy="86"
          r="24"
          fill="var(--c-physics)"
          stroke="var(--c-bg)"
          stroke-width="2.5"
        />
        <text
          x="236"
          y="93"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="var(--c-bg)"
        >
          n
        </text>
      </g>
      <g v-if="neutrons >= 2">
        <circle
          cx="236"
          cy="140"
          r="24"
          fill="var(--c-physics)"
          stroke="var(--c-bg)"
          stroke-width="2.5"
        />
        <text
          x="236"
          y="147"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="var(--c-bg)"
        >
          n
        </text>
      </g>
      <g v-if="neutrons < 2" opacity="0.6">
        <circle
          :cx="nextSlot.x"
          :cy="nextSlot.y"
          r="24"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="4 4"
        />
        <line
          :x1="nextSlot.x - 7"
          :y1="nextSlot.y"
          :x2="nextSlot.x + 7"
          :y2="nextSlot.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
        <line
          :x1="nextSlot.x"
          :y1="nextSlot.y - 7"
          :x2="nextSlot.x"
          :y2="nextSlot.y + 7"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </g>
    </svg>
    <div class="iso-readout">
      <div class="iso-counts">
        <span class="mini-note">质子数</span>
        <span><Latex tex="Z = 1" /></span>
        <span class="mini-note">中子数</span>
        <span>{{ neutrons }}</span>
        <span class="mini-note">质量数</span>
        <span><Latex :tex="'A = ' + massNumber" /></span>
      </div>
      <div class="iso-id">
        <span class="text-xl">{{ names[neutrons] }}</span>
        <span class="text-2xl leading-normal"><Latex :tex="symbol" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const names = ["氕", "氘", "氚"] as const;
const neutrons = ref(0);

const massNumber = computed((): number => neutrons.value + 1);
const symbol = computed((): string => String.raw`{}^{${massNumber.value}}_{1}\mathrm{H}`);

/** 下一个待添加中子的位置：空位用虚线圆 + 十字提示 */
const nextSlot = computed((): { x: number; y: number } =>
  neutrons.value === 0 ? { x: 236, y: 86 } : { x: 236, y: 140 },
);

const addNeutron = (): void => {
  neutrons.value = (neutrons.value + 1) % 3;
};
</script>

<style scoped>
.iso {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.iso svg {
  display: block;

  width: 58%;
  height: auto;
  margin: 0 auto;

  cursor: pointer;
  user-select: none;
}

.iso-readout {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  padding-top: 0.45rem;
  border-top: 1px solid var(--c-border);
}

.iso-counts {
  display: grid;
  grid-template-columns: 4.6em 1fr;
  row-gap: 0.1rem;
  align-items: baseline;
}

.iso-id {
  display: flex;
  gap: 0.55rem;
  align-items: baseline;
}
</style>
