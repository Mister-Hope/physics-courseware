<script setup lang="ts">
/**
 * 第 30 页「例题：三个小孩拔河」。
 *
 * 甲、乙在左、丙在右，三人拉同一根轻绳：绳中间两段绷紧，两侧两段松垂到地面。 `step = 1`（默认）只画装置和三个小孩的拉力；`step ≥ 2` 再在绳上标出各处的拉力， 并在下方空白处给出 F₁ + F₂ = F₃。
 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg class="fig" viewBox="0 108 700 202" style="max-width: 34rem" xmlns="http://www.w3.org/2000/svg">
    <!-- 水平地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 30, y: 240 }" :to="{ x: 670, y: 240 }" side="below" :thickness="11" :gap="34" color="#cbd5e1" :line-width="4" />
    <line x1="30" y1="240" x2="670" y2="240" stroke="#cbd5e1" stroke-width="2.4" />

    <!-- ==================== 三个小孩的发力箭头（左队甲、乙朝左，右队丙朝右） ==================== -->
    <CourseArrow :from="{ x: 175, y: 142 }" :to="{ x: 113, y: 142 }" stroke="#60a5fa" stroke-width="3.4" />
    <CourseArrow :from="{ x: 295, y: 142 }" :to="{ x: 233, y: 142 }" stroke="#60a5fa" stroke-width="3.4" />
    <CourseArrow :from="{ x: 525, y: 142 }" :to="{ x: 587, y: 142 }" stroke="#f87171" stroke-width="3.4" />

    <text x="144" y="128" text-anchor="middle" font-size="18" fill="#60a5fa">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">1</tspan>
    </text>
    <text x="264" y="128" text-anchor="middle" font-size="18" fill="#60a5fa">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">2</tspan>
    </text>
    <text x="556" y="128" text-anchor="middle" font-size="18" fill="#f87171">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">3</tspan>
    </text>

    <!-- ==================== 奥运图标风动感拔河小人（后层远端肢体） ==================== -->
    <!-- 甲（左一，重心后倾，双手握绳于 x=178..188, y=198） -->
    <g stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 甲：后侧手臂与后侧支撑腿（略暗以体现前后层次） -->
      <path d="M 150 184 L 166 193 L 186 198" stroke="#94a3b8" stroke-width="3.2" />
      <path d="M 160 213 L 146 226 L 136 239" stroke="#94a3b8" stroke-width="3.6" />
      <!-- 乙（左二，紧靠甲右侧协同发力，双手握绳于 x=298..308, y=198） -->
      <path d="M 270 184 L 286 193 L 306 198" stroke="#94a3b8" stroke-width="3.2" />
      <path d="M 280 213 L 266 226 L 256 239" stroke="#94a3b8" stroke-width="3.6" />
      <!-- 丙（右侧单人对抗甲乙，重心向右后倾，双手握绳于 x=512..522, y=198） -->
      <path d="M 550 184 L 534 193 L 514 198" stroke="#94a3b8" stroke-width="3.2" />
      <path d="M 540 213 L 554 226 L 564 239" stroke="#94a3b8" stroke-width="3.6" />
    </g>

    <!-- ==================== 整根拔河轻绳（统一金麻绳色 + 两端自然垂落贴地） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 左侧自由垂落段（从甲手部 x=176 自然下垂并平铺在地面 y=238.5 上，同色系） -->
      <path d="M 176 198 C 154 199, 144 238.5, 114 238.5 C 98 238.5, 86 236, 74 238.5" stroke="#e2a846" stroke-width="2.8" opacity="0.82" />
      <!-- 甲与乙之间的绷紧绳段（张力 F₁） -->
      <line x1="176" y1="198" x2="302" y2="198" stroke="#e2a846" stroke-width="3.5" />
      <!-- 乙与丙之间的主绷紧绳段（张力 F₁ + F₂，线径略粗并带麻绳高光纹理） -->
      <line x1="302" y1="198" x2="524" y2="198" stroke="#e2a846" stroke-width="4.8" />
      <line x1="304" y1="198" x2="522" y2="198" stroke="#fef3c7" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.55" />
      <!-- 右侧自由垂落段（从丙手部 x=524 自然下垂并平铺在地面 y=238.5 上，同色系） -->
      <path d="M 524 198 C 546 199, 556 238.5, 586 238.5 C 602 238.5, 614 236, 626 238.5" stroke="#e2a846" stroke-width="2.8" opacity="0.82" />
    </g>

    <!-- ==================== 奥运图标风动感拔河小人（前层躯干、头部与前蹬腿） ==================== -->
    <!-- 甲（左一：后仰约 30°，前腿斜向右下死死蹬地 x=188,y=239） -->
    <g stroke="#e2e8f0" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 头部（带蓝色左队微光填充） -->
      <circle cx="143" cy="168" r="10.5" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="2.6" />
      <!-- 后仰发力躯干 -->
      <line x1="149" y1="181" x2="161" y2="213" stroke-width="5.2" />
      <!-- 前蹬直腿（脚掌死死抵住地面） -->
      <path d="M 161 213 L 177 226 L 188 239" stroke-width="4" />
      <!-- 前侧拉绳手臂与握拳节点 -->
      <path d="M 150 184 L 164 198 L 178 198" stroke-width="3.6" />
      <circle cx="178" cy="198" r="2.8" fill="#60a5fa" stroke="#0f1425" stroke-width="1" />
      <circle cx="186" cy="198" r="2.6" fill="#93c5fd" stroke="#0f1425" stroke-width="1" />
    </g>

    <!-- 乙（左二：与甲相距 120px 紧挨成左队，同样后仰蹬地发力） -->
    <g stroke="#e2e8f0" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="263" cy="168" r="10.5" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="2.6" />
      <line x1="269" y1="181" x2="281" y2="213" stroke-width="5.2" />
      <path d="M 281 213 L 297 226 L 308 239" stroke-width="4" />
      <path d="M 270 184 L 284 198 L 298 198" stroke-width="3.6" />
      <circle cx="298" cy="198" r="2.8" fill="#60a5fa" stroke="#0f1425" stroke-width="1" />
      <circle cx="306" cy="198" r="2.6" fill="#93c5fd" stroke="#0f1425" stroke-width="1" />
    </g>

    <!-- 丙（右侧：向右后仰约 32°，前腿向左下死死蹬地 x=512,y=239） -->
    <g stroke="#e2e8f0" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="557" cy="168" r="10.5" fill="rgba(248,113,113,0.22)" stroke="#f87171" stroke-width="2.6" />
      <line x1="551" y1="181" x2="539" y2="213" stroke-width="5.2" />
      <path d="M 539 213 L 523 226 L 512 239" stroke-width="4" />
      <path d="M 550 184 L 536 198 L 522 198" stroke-width="3.6" />
      <circle cx="522" cy="198" r="2.8" fill="#f87171" stroke="#0f1425" stroke-width="1" />
      <circle cx="514" cy="198" r="2.6" fill="#fca5a5" stroke="#0f1425" stroke-width="1" />
    </g>

    <!-- 人物标签 -->
    <text x="162" y="263" text-anchor="middle" font-size="16" font-weight="600" fill="#93c5fd">甲</text>
    <text x="282" y="263" text-anchor="middle" font-size="16" font-weight="600" fill="#93c5fd">乙</text>
    <text x="538" y="263" text-anchor="middle" font-size="16" font-weight="600" fill="#fca5a5">丙</text>

    <!-- ==================== 绳上各处的张力与平衡方程（step >= 2 显示） ==================== -->
    <g v-if="step >= 2">
      <!-- 左端松垂段张力 0 -->
      <text x="116" y="222" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="#94a3b8">0</text>

      <!-- 甲、乙之间绳段张力 F₁ -->
      <text x="242" y="186" text-anchor="middle" font-size="17" fill="#e2a846">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="4">1</tspan>
      </text>

      <!-- 乙、丙之间主绳段张力 F₁ + F₂（修正 dy 累积偏移） -->
      <text x="413" y="186" text-anchor="middle" font-size="17" fill="#e2a846">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="4">1</tspan>
        <tspan font-family="KaTeX_Main" dy="-4">+</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="11" dy="4">2</tspan>
      </text>

      <!-- 右端松垂段张力 0 -->
      <text x="584" y="222" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="#94a3b8">0</text>

      <!-- 底部结论公式框 F₁ + F₂ = F₃ -->
      <rect x="268" y="272" width="164" height="32" rx="10" fill="rgba(226,168,70,0.14)" stroke="#e2a846" stroke-width="1.6" />
      <text x="350" y="293" text-anchor="middle" font-size="18" fill="#e2a846">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="12" dy="4">1</tspan>
        <tspan font-family="KaTeX_Main" dy="-4">+</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="12" dy="4">2</tspan>
        <tspan font-family="KaTeX_Main" dy="-4">=</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="12" dy="4">3</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
