<script setup lang="ts">
/**
 * 第 7 页（P7）：实际变压器的能量损耗（2 击） 0 击：变压器回到画面中央，原边输入 P1，副边输出 P2 C1（step >= 1）：铜导线变红发热（铜损 I²R），铁芯接缝漏出磁感线（漏磁） C2（step >= 2）：铁芯内涡流环与硅钢片叠层切小涡流（涡流/铁损），能量流 P1 = P2 + Q热，效率
 * η = P2/P1
 */
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const showCopperAndLeak = computed(() => step >= 1);
const showEddyAndEnergy = computed(() => step >= 2);
</script>

<template>
  <div class="tl-wrap">
    <div class="tl-stage">
      <svg viewBox="0 0 580 340" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="tl-copper-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--c-danger)" stop-opacity="0.45" />
            <stop offset="65%" stop-color="var(--c-danger)" stop-opacity="0.16" />
            <stop offset="100%" stop-color="var(--c-danger)" stop-opacity="0" />
          </radialGradient>
        </defs>
        <!-- 2.5D 铁芯背面厚度层 -->
        <path
          d="M 156 38 H 444 V 258 H 156 Z M 208 86 V 210 H 392 V 86 Z"
          fill="var(--c-surface-solid)"
          fill-rule="evenodd"
          stroke="var(--c-neutral-600)"
          stroke-width="1.4"
          opacity="0.7"
        />
        <!-- 铁芯正面 -->
        <path
          d="M 142 48 H 430 V 268 H 142 Z M 194 96 V 220 H 378 V 96 Z"
          fill="var(--c-bg-soft)"
          fill-rule="evenodd"
          stroke="var(--c-neutral-300)"
          stroke-width="2"
        />
        <!-- C2：硅钢片叠层分界线 + 铁芯内被切小的涡流环 -->
        <g :opacity="showEddyAndEnergy ? 1 : 0" class="tl-fade">
          <!-- 硅钢片绝缘叠层线 -->
          <g stroke="var(--c-neutral-500)" stroke-width="1" stroke-dasharray="3 2">
            <line x1="154" y1="54" x2="418" y2="54" />
            <line x1="154" y1="63" x2="418" y2="63" />
            <line x1="154" y1="72" x2="418" y2="72" />
            <line x1="154" y1="81" x2="418" y2="81" />
            <line x1="154" y1="235" x2="418" y2="235" />
            <line x1="154" y1="244" x2="418" y2="244" />
            <line x1="154" y1="253" x2="418" y2="253" />
          </g>
          <!-- 铁芯内的涡流小环（红色椭圆环） -->
          <g fill="none" stroke="var(--c-danger)" stroke-width="1.8">
            <ellipse cx="240" cy="70" rx="22" ry="7" />
            <ellipse cx="332" cy="70" rx="22" ry="7" />
            <ellipse cx="240" cy="244" rx="22" ry="7" />
            <ellipse cx="332" cy="244" rx="22" ry="7" />
          </g>
          <CourseArrow :from="{ x: 234, y: 63 }" :to="{ x: 248, y: 63 }" stroke="var(--c-danger)" :stroke-width="1.6" :head-size="6" />
          <CourseArrow :from="{ x: 326, y: 63 }" :to="{ x: 340, y: 63 }" stroke="var(--c-danger)" :stroke-width="1.6" :head-size="6" />
          <text x="286" y="30" text-anchor="middle" font-size="14" fill="var(--c-danger)">涡流 / 铁损（硅钢片叠层减小涡流）</text>
        </g>
        <!-- 主磁通回路（金色虚线） -->
        <rect x="166" y="70" width="240" height="174" rx="10" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="8 6" opacity="0.85" />
        <!-- C1：铜损发热红晕 -->
        <g :opacity="showCopperAndLeak ? 1 : 0" class="tl-fade">
          <ellipse cx="168" cy="158" rx="54" ry="74" fill="url(#tl-copper-heat)" />
          <ellipse cx="404" cy="158" rx="54" ry="74" fill="url(#tl-copper-heat)" />
        </g>
        <!-- 原线圈（C1 后变暖红表示铜损发热） -->
        <Solenoid
          :x="168"
          :y="158"
          :length="102"
          :radius="34"
          :turns="6"
          direction="ccw"
          orientation="vertical"
          :phase="180"
          :line-width="3"
          :back-opacity="0.34"
          :color="showCopperAndLeak ? 'var(--c-danger)' : 'var(--c-accent-2)'"
        />
        <!-- 副线圈（C1 后变暖红表示铜损发热） -->
        <Solenoid
          :x="404"
          :y="158"
          :length="92"
          :radius="34"
          :turns="4"
          direction="cw"
          orientation="vertical"
          :phase="0"
          :line-width="3"
          :back-opacity="0.34"
          :color="showCopperAndLeak ? 'var(--c-danger)' : 'var(--c-physics)'"
        />
        <!-- C1：铁芯接缝与绕组散出的漏磁线 -->
        <g :opacity="showCopperAndLeak ? 1 : 0" class="tl-fade">
          <path d="M 162 96 C 228 118, 228 198, 162 220" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="5 4" />
          <path d="M 142 78 C 86 96, 86 220, 142 238" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="5 4" />
          <CourseArrow :from="{ x: 211, y: 150 }" :to="{ x: 211, y: 168 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="7" />
          <CourseArrow :from="{ x: 100, y: 168 }" :to="{ x: 100, y: 150 }" stroke="var(--c-accent)" :stroke-width="1.8" :head-size="7" />
          <text x="64" y="162" text-anchor="middle" font-size="14" fill="var(--c-accent)">漏磁</text>
          <text x="168" y="290" text-anchor="middle" font-size="14" fill="var(--c-danger)">
            <tspan>铜损 </tspan>
            <tspan font-family="KaTeX_Math" font-style="italic">I</tspan>
            <tspan dy="3" font-size="11" font-family="KaTeX_Main">1</tspan>
            <tspan dy="-8" font-size="11" font-family="KaTeX_Main">2</tspan>
            <tspan dy="5" font-family="KaTeX_Math" font-style="italic">r</tspan>
            <tspan dy="3" font-size="11" font-family="KaTeX_Main">1</tspan>
          </text>
          <text x="404" y="290" text-anchor="middle" font-size="14" fill="var(--c-danger)">
            <tspan>铜损 </tspan>
            <tspan font-family="KaTeX_Math" font-style="italic">I</tspan>
            <tspan dy="3" font-size="11" font-family="KaTeX_Main">2</tspan>
            <tspan dy="-8" font-size="11" font-family="KaTeX_Main">2</tspan>
            <tspan dy="5" font-family="KaTeX_Math" font-style="italic">r</tspan>
            <tspan dy="3" font-size="11" font-family="KaTeX_Main">2</tspan>
          </text>
        </g>
        <!-- C2：底部能量流向图 P1 -> P2 + Q热 -->
        <g :opacity="showEddyAndEnergy ? 1 : 0" class="tl-fade">
          <CourseArrow :from="{ x: 76, y: 318 }" :to="{ x: 230, y: 318 }" stroke="var(--c-accent-2)" :stroke-width="3.6" :head-size="11" />
          <CourseArrow :from="{ x: 340, y: 318 }" :to="{ x: 496, y: 318 }" stroke="var(--c-physics)" :stroke-width="3.2" :head-size="10" />
          <CourseArrow :from="{ x: 286, y: 318 }" :to="{ x: 286, y: 282 }" stroke="var(--c-danger)" :stroke-width="2.6" :head-size="9" />
          <text x="52" y="323" text-anchor="middle" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">P</text>
          <text x="62" y="328" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-accent-2)">1</text>
          <text x="518" y="323" text-anchor="middle" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">P</text>
          <text x="528" y="328" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-physics)">2</text>
          <text x="286" y="274" text-anchor="middle" font-size="14" fill="var(--c-danger)">
            <tspan font-family="KaTeX_Math" font-style="italic">Q</tspan>
            <tspan dy="3" font-size="11">热</tspan>
          </text>
        </g>
      </svg>
    </div>

    <div class="tl-panel">
      <div class="tl-card tl-card-c1" :class="{ 'is-hidden': !showCopperAndLeak }">
        <div class="tl-card-head">
          <span class="tl-badge tl-badge-red">铜损 <Latex tex="I^2 R" /></span>
          <span class="tl-badge tl-badge-gold">漏磁</span>
        </div>
        <div class="tl-card-body">
          <div>线圈导线有电阻 <Latex tex="r_1, r_2" />，通电发热并分压</div>
          <div>少量磁感线散出铁芯，未同时穿过两线圈</div>
        </div>
      </div>

      <div class="tl-card tl-card-c2" :class="{ 'is-hidden': !showEddyAndEnergy }">
        <div class="tl-card-head">
          <span class="tl-badge tl-badge-red">涡流 / 铁损</span>
        </div>
        <div class="tl-card-body">
          <div>交变磁场在铁芯内激起涡流发热（用硅钢片叠层减小）</div>
          <div class="tl-formulas">
            <Latex tex="P_1 = P_2 + Q_{\text{热}}" />
            <span class="tl-sep">·</span>
            <Latex tex="\eta = \dfrac{P_2}{P_1} \times 100\%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1.1fr);
  gap: 1.2rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.tl-stage {
  min-width: 0;
}

.tl-stage svg {
  display: block;
  width: 100%;
  height: auto;
}

.tl-fade {
  transition: opacity 0.35s ease;
}

.tl-panel {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.tl-card {
  padding: 0.65rem 0.95rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  transition: opacity 0.3s ease;
}

.tl-card-c1 {
  border-color: var(--c-accent-border);
}

.tl-card-c2 {
  border-color: var(--c-hint-danger-border);
}

.tl-card-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;

  margin-bottom: 0.35rem;
}

.tl-badge {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;

  padding: 0.16rem 0.6rem;
  border-radius: 999px;

  font-weight: 700;
  font-size: 0.88rem;
}

.tl-badge-red {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.tl-badge-gold {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.tl-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;

  color: var(--c-text);

  font-size: 0.9rem;
  line-height: 1.45;
}

.tl-formulas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;

  margin-top: 0.2rem;
  padding-top: 0.35rem;
  border-top: 1px solid var(--c-border);

  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.98rem;
}

.tl-sep {
  color: var(--c-text-dim);
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
