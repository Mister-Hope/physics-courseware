<script setup lang="ts">
/** 第 8 页「直线电流的磁感线」——竖直导线穿过水平面，磁感线是同心圆（透视成椭圆）； 按钮切换电流方向，椭圆上的箭头随右手定则反向。电流方向切换不占翻页点击。 */
import { ref, computed } from "vue";

const W = 560;
const H = 340;
const cx = 280;
const cy = 236; // 平面中心（导线穿过点）
const rx = 210;
const ry = 74; // 透视扁率

const up = ref(true);
const dir = computed(() => (up.value ? -1 : 1)); // 椭圆右端箭头的 y 方向：电流向上→右端指向远侧（屏幕上为 -y）
</script>

<template>
  <div class="mf-wire-field">
    <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" class="block">
      <defs>
        <marker id="mf-wire-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4.6" markerHeight="4.6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
        </marker>
        <marker id="mf-wire-i" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-force)" />
        </marker>
      </defs>

      <!-- 水平面（透视） -->
      <path
        :d="`M ${cx - 250} ${cy + 8} L ${cx - 40} ${cy - 132} L ${cx + 250} ${cy + 8} L ${cx + 40} ${cy + 148} Z`"
        fill="rgba(148,163,184,0.07)"
        stroke="var(--c-border)"
        stroke-width="1.4"
      />

      <!-- 同心磁感线（透视椭圆） -->
      <g fill="none" stroke="var(--c-field)" stroke-width="1.9" opacity="0.9">
        <ellipse v-for="k in [0.34, 0.6, 0.86]" :key="k" :cx="cx" :cy="cy" :rx="rx * k" :ry="ry * k" />
      </g>

      <!-- 椭圆两端的磁场方向箭头：右端 / 左端 -->
      <line
        :x1="cx + rx * 0.6"
        :y1="cy + dir * 6"
        :x2="cx + rx * 0.6 - 6"
        :y2="cy + dir * 6 + dir * 26"
        stroke="var(--c-field)"
        stroke-width="2.6"
        marker-end="url(#mf-wire-arrow)"
      />
      <line
        :x1="cx - rx * 0.6"
        :y1="cy - dir * 6"
        :x2="cx - rx * 0.6 + 6"
        :y2="cy - dir * 6 - dir * 26"
        stroke="var(--c-field)"
        stroke-width="2.6"
        marker-end="url(#mf-wire-arrow)"
      />

      <!-- 竖直导线 -->
      <line :x1="cx" :y1="cy - 176" :x2="cx" :y2="cy + 118" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
      <!-- 电流方向箭头（沿导线） -->
      <line
        :x1="cx"
        :y1="up ? cy + 96 : cy - 154"
        :x2="cx"
        :y2="up ? cy - 154 : cy + 96"
        stroke="var(--c-force)"
        stroke-width="2.8"
        marker-end="url(#mf-wire-i)"
      />
      <text :x="cx + 14" :y="cy - 130" font-size="19" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic">I</text>

      <!-- 观察者一侧标记（近端） -->
      <text :x="cx + rx + 12" :y="cy + 6" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">近侧</text>
    </svg>

    <div class="mf-wire-ctrl">
      <span class="text-sm" style="color: var(--c-text-dim)"> <Latex tex="I" /> 方向 </span>
      <button class="mf-btn" :class="{ on: up }" @click="up = true">向上</button>
      <button class="mf-btn" :class="{ on: !up }" @click="up = false">向下</button>
    </div>
  </div>
</template>

<style scoped>
.mf-wire-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.mf-wire-ctrl {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.mf-btn {
  padding: 0.18rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--c-text-dim);
  font-size: 0.82rem;
  cursor: pointer;
}
.mf-btn.on {
  border-color: var(--c-accent-border);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
</style>
