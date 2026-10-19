<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 6 页：长度收缩实验——同一根杆，与杆相对静止的人测得 l₀（上图始终满格）， 以 v 沿杆方向运动的人测得 l = l₀√(1−(v/c)²)（下图按同一比例缩短）。
 *
 * 两条长条共用同一个长度比例：l₀ 满格 = 100%，测得长度 l 的宽度就是 √(1−(v/c)²)×100%， 即 1/γ —— 数值随滑块真实变化，没有拍脑袋的系数。
 */

/** 当前 v/c */
const beta = ref(0.8);
/** γ = 1/√(1−(v/c)²) */
const gamma = computed(() => 1 / Math.sqrt(1 - beta.value ** 2));
/** 测得长度与固有长度之比 l/l₀ = √(1−(v/c)²) = 1/γ */
const ratio = computed(() => 1 / gamma.value);
</script>

<template>
  <div class="lc">
    <div class="lc-bar-row">
      <div class="lc-tag"><Latex tex="l_0" />｜与杆相对静止时测得</div>
      <div class="lc-track">
        <div class="lc-bar lc-bar-fixed" style="width: 100%">
          <span class="lc-end lc-end-l" />
          <span class="lc-end lc-end-r" />
        </div>
      </div>
    </div>

    <div class="lc-bar-row">
      <div class="lc-tag">
        <Latex tex="l" />｜以 <Latex :tex="`v = ${beta.toFixed(2)}c`" /> 沿杆方向运动时测得
      </div>
      <div class="lc-track">
        <div class="lc-bar lc-bar-moving" :style="{ width: `${(ratio * 100).toFixed(2)}%` }">
          <span class="lc-end lc-end-l" />
          <span class="lc-end lc-end-r" />
        </div>
      </div>
    </div>

    <div class="lc-ctrl">
      <CourseSlider
        v-model="beta"
        class="lc-slider"
        layout="bare"
        :min="0.1"
        :max="0.999"
        :step="0.001"
        aria-label="速度与光速的比值"
      />
      <div class="lc-read">
        <Latex :tex="`\\gamma = ${gamma.toFixed(3)}`" />
        <span class="lc-sep">·</span>
        <Latex :tex="`l = \\dfrac{l_0}{\\gamma} = ${(ratio * 100).toFixed(1)}\\%\\ l_0`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lc {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  width: 100%;
  min-width: 0;
}

.lc-bar-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.lc-tag {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.lc-track {
  position: relative;

  display: flex;
  align-items: center;

  min-width: 0;
  height: 1.5rem;
}

.lc-bar {
  position: relative;
  box-sizing: border-box;
  height: 0.85rem;
  border-radius: 999px;
}

.lc-bar-fixed {
  border: 1px solid rgb(148 163 184 / 70%);
  background: linear-gradient(90deg, rgb(148 163 184 / 35%), rgb(148 163 184 / 60%));
}

.lc-bar-moving {
  border: 1px solid var(--c-accent);
  background: linear-gradient(90deg, rgb(226 168 70 / 35%), rgb(226 168 70 / 75%));
  transition: width 0.12s linear;
}

.lc-end {
  position: absolute;
  top: -0.22rem;

  width: 2px;
  height: 1.28rem;

  background: currentcolor;

  opacity: 0.55;
}

.lc-end-l {
  left: 0;
}

.lc-end-r {
  right: 0;
}

.lc-ctrl {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  min-width: 0;
}

.lc-slider {
  flex: 1;
  min-width: 0;
}

.lc-read {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;

  color: var(--c-accent);

  white-space: nowrap;
}

.lc-sep {
  color: var(--c-text-dim);
}
</style>
