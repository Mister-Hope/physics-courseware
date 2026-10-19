<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
/**
 * 第 9 页「安培定则（一）：直线电流」——右手握住导线： 拇指指向电流方向，四指弯曲的方向就是磁感线环绕方向。 翻页分步：① 电流 → ② 右手 → ③ 环绕方向；按钮切换电流方向（右手绕导线转
 * 180°，手性不变）。
 */
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 });
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(props.step ?? 0, Number($clicks.value ?? 0)));

const W = 470;
const H = 380;
const wx = 235; // 导线 x
const up = ref(true);

// 右手组：拇指朝上时的原姿态；电流向下时绕 (235,195) 旋转 180°（保手性，仍是右手）
const handTf = computed(() => (up.value ? "" : "rotate(180 235 195)"));
// 顶部电流箭头
const iY1 = computed(() => (up.value ? 146 : 30));
const iY2 = computed(() => (up.value ? 30 : 146));
// 环绕方向：椭圆下（近侧）箭头朝右 / 朝左
const curlD = computed(() =>
  up.value
    ? `M ${wx - 76} 344 A 76 24 0 0 0 ${wx + 76} 344`
    : `M ${wx + 76} 344 A 76 24 0 0 1 ${wx - 76} 344`,
);
</script>

<template>
  <div class="mf-ampere-1">
    <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" class="block">
      <defs>
        <marker
          id="mf-a1-curl"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
        </marker>
        <marker
          id="mf-a1-i"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-force)" />
        </marker>
      </defs>

      <!-- 导线 -->
      <line
        x1="235"
        y1="20"
        x2="235"
        y2="368"
        stroke="#cbd5e1"
        stroke-width="7"
        stroke-linecap="round"
      />

      <!-- ① 电流方向 -->
      <g v-if="step >= 1">
        <line
          x1="235"
          :y1="iY1"
          x2="235"
          :y2="iY2"
          stroke="var(--c-force)"
          stroke-width="3"
          marker-end="url(#mf-a1-i)"
        />
        <text
          x="248"
          y="44"
          font-size="20"
          fill="var(--c-force)"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          I
        </text>
      </g>

      <!-- ② 右手（握住导线，拇指沿电流） -->
      <g v-if="step >= 2" :transform="handTf">
        <!-- 四指（先画，指根被手掌盖住；指身横过导线＝握在前面） -->
        <g stroke="#8c5a40" stroke-width="25" stroke-linecap="round" fill="none">
          <path d="M 258 224 C 230 234, 190 236, 158 226" />
          <path d="M 258 258 C 232 270, 192 272, 156 260" />
          <path d="M 258 292 C 232 304, 194 306, 160 292" />
          <path d="M 256 322 C 232 332, 198 334, 172 322" />
        </g>
        <g stroke="#f2c9a2" stroke-width="20" stroke-linecap="round" fill="none">
          <path d="M 258 224 C 230 234, 190 236, 158 226" />
          <path d="M 258 258 C 232 270, 192 272, 156 260" />
          <path d="M 258 292 C 232 304, 194 306, 160 292" />
          <path d="M 256 322 C 232 332, 198 334, 172 322" />
        </g>
        <!-- 手腕 -->
        <rect
          x="264"
          y="322"
          width="56"
          height="50"
          rx="16"
          fill="#eebd94"
          stroke="#8c5a40"
          stroke-width="3"
        />
        <!-- 手掌 -->
        <rect
          x="240"
          y="156"
          width="96"
          height="130"
          rx="34"
          fill="#f2c9a2"
          stroke="#8c5a40"
          stroke-width="3"
        />
        <!-- 拇指（沿电流方向竖起） -->
        <path
          d="M 264 178 C 258 140, 256 104, 254 66"
          stroke="#8c5a40"
          stroke-width="34"
          stroke-linecap="round"
          fill="none"
        />
        <path
          d="M 264 178 C 258 140, 256 104, 254 66"
          stroke="#f2c9a2"
          stroke-width="28"
          stroke-linecap="round"
          fill="none"
        />
      </g>

      <!-- ③ 四指弯曲方向＝磁感线环绕方向 -->
      <g v-if="step >= 3">
        <ellipse
          :cx="wx"
          cy="344"
          rx="76"
          ry="24"
          fill="none"
          stroke="var(--c-field)"
          stroke-width="2"
          stroke-dasharray="7 6"
          opacity="0.75"
        />
        <path
          :d="curlD"
          fill="none"
          stroke="var(--c-field)"
          stroke-width="2.6"
          marker-end="url(#mf-a1-curl)"
        />
      </g>
    </svg>

    <div class="mf-ampere-ctrl">
      <span class="text-sm" style="color: var(--c-text-dim)">电流方向</span>
      <button class="mf-btn" :class="{ on: up }" @click="up = true">向上</button>
      <button class="mf-btn" :class="{ on: !up }" @click="up = false">向下</button>
    </div>
  </div>
</template>

<style scoped>
.mf-ampere-1 {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
}

.mf-ampere-ctrl {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.mf-btn {
  padding: 0.18rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: rgb(255 255 255 / 5%);
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
