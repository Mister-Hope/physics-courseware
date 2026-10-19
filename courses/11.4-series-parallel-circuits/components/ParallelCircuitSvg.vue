<script setup lang="ts">
/**
 * 第 3 页（串、并联电路中的电流）/ 第 4 页（串、并联电路中的电压）：并联电路图（教材图 11.4-2 的结构）。
 * 三条支路 R₁、R₂、R₃ 并列接在上下两根导轨之间；0 标在干路上，1、2、3 标在进入各支路的点上（教材原话：
 * "流过干路 0 点的电荷量等于进入各支路 1、2、3 各点的电荷量之和"）。
 * mode = "current"：step ≥ 1 时画干路与各支路的电流方向箭头；
 * mode = "voltage"：step ≥ 1 时把"同一个节点"的两段导体高亮出来（0、1、2、3 之间没有电势差；各电阻右侧电势也相同），并标出各点电势。
 */
const { mode = "current", step = 0 } = defineProps<{
  /** "current" 画电流箭头；"voltage" 高亮同一节点的导体并标各点电势 */
  mode?: "current" | "voltage";
  /** 分步：0 = 只有干净电路图，≥1 才出标注 */
  step?: number;
}>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 620 270" width="620" height="270" xmlns="http://www.w3.org/2000/svg">
      <g v-if="mode === 'voltage' && step >= 1" fill="none" stroke-linecap="round" stroke-width="9" opacity="0.2">
        <path d="M 70 90 H 550" stroke="var(--c-accent)" />
        <path d="M 220 90 V 131" stroke="var(--c-accent)" />
        <path d="M 350 90 V 131" stroke="var(--c-accent)" />
        <path d="M 480 90 V 131" stroke="var(--c-accent)" />
        <path d="M 70 220 H 550" stroke="var(--c-accent-2)" />
        <path d="M 220 179 V 220" stroke="var(--c-accent-2)" />
        <path d="M 350 179 V 220" stroke="var(--c-accent-2)" />
        <path d="M 480 179 V 220" stroke="var(--c-accent-2)" />
      </g>
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 90 V 147" />
        <path d="M 70 163 V 220" />
        <path d="M 70 90 H 550" />
        <path d="M 550 90 V 220" />
        <path d="M 550 220 H 70" />
        <path d="M 220 90 V 131" />
        <path d="M 220 179 V 220" />
        <path d="M 350 90 V 131" />
        <path d="M 350 179 V 220" />
        <path d="M 480 90 V 131" />
        <path d="M 480 179 V 220" />
      </g>
      <circle cx="220" cy="90" r="3" fill="var(--c-text)" />
      <circle cx="350" cy="90" r="3" fill="var(--c-text)" />
      <circle cx="480" cy="90" r="3" fill="var(--c-text)" />
      <circle cx="220" cy="220" r="3" fill="var(--c-text)" />
      <circle cx="350" cy="220" r="3" fill="var(--c-text)" />
      <circle cx="480" cy="220" r="3" fill="var(--c-text)" />
      <CircuitBattery :x="70" :y="155" orientation="vertical" polarity />
      <CircuitResistor :x="220" :y="155" orientation="vertical" />
      <CircuitResistor :x="350" :y="155" orientation="vertical" />
      <CircuitResistor :x="480" :y="155" orientation="vertical" />
      <text x="244" y="162" font-size="20" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="15" dy="5">1</tspan>
      </text>
      <text x="374" y="162" font-size="20" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="15" dy="5">2</tspan>
      </text>
      <text x="504" y="162" font-size="20" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="15" dy="5">3</tspan>
      </text>
      <g font-family="KaTeX_Main" font-size="18" fill="var(--c-text-dim)">
        <circle cx="140" cy="90" r="3.5" fill="var(--c-text-dim)" />
        <text x="140" y="116" text-anchor="middle">0</text>
        <circle cx="220" cy="112" r="3.5" fill="var(--c-text-dim)" />
        <text x="206" y="118" text-anchor="end">1</text>
        <circle cx="350" cy="112" r="3.5" fill="var(--c-text-dim)" />
        <text x="336" y="118" text-anchor="end">2</text>
        <circle cx="480" cy="112" r="3.5" fill="var(--c-text-dim)" />
        <text x="466" y="118" text-anchor="end">3</text>
      </g>
      <g v-if="mode === 'voltage' && step >= 1" font-size="20" fill="var(--c-accent)">
        <text x="140" y="74" text-anchor="middle">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">0</tspan>
        </text>
        <text x="234" y="118">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">1</tspan>
        </text>
        <text x="364" y="118">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">2</tspan>
        </text>
        <text x="494" y="118">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">3</tspan>
        </text>
      </g>
      <g v-if="mode === 'current' && step >= 1">
        <CourseArrow :from="{ x: 160, y: 90 }" :to="{ x: 200, y: 90 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <text x="180" y="76" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">I</text>
        <CourseArrow :from="{ x: 320, y: 220 }" :to="{ x: 258, y: 220 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <text x="289" y="246" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">I</text>
        <CourseArrow :from="{ x: 220, y: 190 }" :to="{ x: 220, y: 214 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
        <CourseArrow :from="{ x: 350, y: 190 }" :to="{ x: 350, y: 214 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
        <CourseArrow :from="{ x: 480, y: 190 }" :to="{ x: 480, y: 214 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
        <g font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent-2)" text-anchor="end">
          <text x="206" y="208">
            <tspan>I</tspan>
            <tspan font-family="KaTeX_Main" font-size="15" dy="5">1</tspan>
          </text>
          <text x="336" y="208">
            <tspan>I</tspan>
            <tspan font-family="KaTeX_Main" font-size="15" dy="5">2</tspan>
          </text>
          <text x="466" y="208">
            <tspan>I</tspan>
            <tspan font-family="KaTeX_Main" font-size="15" dy="5">3</tspan>
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>
