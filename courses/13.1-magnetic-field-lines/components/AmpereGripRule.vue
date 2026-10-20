<script setup lang="ts">
/**
 * 安培定则（一）直线电流（13.1 P14）
 * 右手握住导线：拇指沿电流方向，四指弯曲方向 = 磁感线环绕方向。
 * step 1 电流、step 2 右手、step 3 环绕磁感线（与四指同向）；按钮切换电流方向（@click）。
 * 反向时整幅手与箭头绕手性中心旋 180°（旋转保手性，绝不镜像）；场箭头方向按磁针处的磁场反推：
 * 电流向上时近侧（下方）箭头向右，所以四指在导线前方也指向右。
 */
import { computed, ref } from "vue";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 480;
const H = 340;
const WX = 240;
const up = ref(true);
const handTf = computed(() => (up.value ? "" : `rotate(180 ${WX} 180)`));
const dir = computed(() => (up.value ? 1 : -1));

const rings = [124, 186, 248];
</script>

<template>
  <div class="mf-grip">
    <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
      <!-- 磁感线（环绕导线；近侧向下、远侧向上各一枚箭头） -->
      <g v-if="step >= 3">
        <ellipse
          v-for="cy in rings"
          :key="cy"
          :cx="WX"
          :cy="cy"
          rx="106"
          ry="24"
          fill="none"
          stroke="var(--c-field)"
          stroke-width="1.8"
          opacity="0.85"
        />
        <template v-for="cy in rings" :key="`a${cy}`">
          <CourseArrow
            :from="{ x: WX - 26, y: cy + 24 }"
            :to="{ x: WX + 26 + 28 * dir, y: cy + 24 }"
            stroke="var(--c-field)"
            :stroke-width="2.3"
          />
          <CourseArrow
            :from="{ x: WX + 26, y: cy - 24 }"
            :to="{ x: WX - 26 - 28 * dir, y: cy - 24 }"
            stroke="var(--c-field)"
            :stroke-width="2.3"
          />
        </template>
      </g>

      <!-- 导线 -->
      <line :x1="WX" y1="22" :x2="WX" y2="318" stroke="var(--c-text)" stroke-width="5.5" stroke-linecap="round" />

      <!-- 电流方向 -->
      <g v-if="step >= 1">
        <line
          :x1="WX"
          :y1="up ? 252 : 96"
          :x2="WX"
          :y2="up ? 96 : 252"
          stroke="var(--c-force)"
          stroke-width="2.8"
          stroke-linecap="round"
        />
        <path
          :d="up ? `M ${WX - 7} ${108} L ${WX} ${92} L ${WX + 7} ${108} Z` : `M ${WX - 7} ${240} L ${WX} ${256} L ${WX + 7} ${240} Z`"
          fill="var(--c-force)"
        />
        <text :x="WX + 13" :y="up ? 124 : 246" font-size="15" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic">I</text>
      </g>

      <!-- 右手（线稿）：手掌在导线左侧，四指跨过导线前方指向右，拇指沿导线向上 -->
      <g v-if="step >= 2" :transform="handTf">
        <path
          d="M 212 162 C 186 156 164 174 160 204 C 156 236 172 264 194 270 C 206 274 212 266 214 252 L 214 172 Z"
          fill="var(--c-surface)"
          stroke="var(--c-text)"
          stroke-width="2"
          opacity="0.95"
        />
        <g stroke="var(--c-text)" stroke-width="13" stroke-linecap="round" fill="none" opacity="0.95">
          <path d="M 212 172 C 244 166 280 168 308 180" />
          <path d="M 212 197 C 244 193 280 195 310 207" />
          <path d="M 210 222 C 242 220 276 222 306 234" />
          <path d="M 208 247 C 238 246 272 250 298 262" />
        </g>
        <g stroke="var(--c-text)" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.95">
          <path d="M 204 178 C 198 150 196 118 202 88" />
        </g>
        <text x="150" y="106" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Main">拇指</text>
        <text x="316" y="178" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Main">四指</text>
      </g>
    </svg>

    <div class="mf-ctrl">
      <button type="button" class="mf-btn" :class="{ on: up }" @click="up = true">电流向上</button>
      <button type="button" class="mf-btn" :class="{ on: !up }" @click="up = false">电流向下</button>
    </div>
  </div>
</template>

<style scoped>
.mf-grip {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}

.mf-fig {
  display: block;
  width: 100%;
}

.mf-ctrl {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
