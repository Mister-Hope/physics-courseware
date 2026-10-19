<!--
  功的概念辨析图（精修美化版）
  甲 加速跑（火柴人疾跑姿态 · 接触点无位移 ⇒ 不做功）
  乙 蹲起（火柴人蹲起姿态 · 支持力作用点无位移 ⇒ 不做功）
  丙 绕椭圆形操场拉行李箱（3D 立体透视跑道 · 火柴人手拉行李箱 · 每一小段位移做正功）
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /**
   * 讲台/课件播放步进 (配合 Slidev 的 v-click，共 4 档): 0: 什么都不显示 (纯题干情境：跑者、蹲起者、操场拉箱) 1: 出现第 1 个答案 (甲 加速跑：摩擦力 F_f、接触点与“不做功”结论) 2: 出现第 2 个答案 (乙 蹲起：地面支持力 F_N、接触点与“不做功”结论) 3:
   * 出现第 3 个答案 (丙 操场拉箱：斜向拉力 F、微位移 Δs、夹角 α 与“做正功”结论) 默认 0
   */
  step?: number;
}>();

const showCase1 = computed(() => step >= 1);
const showCase2 = computed(() => step >= 2);
const showCase3 = computed(() => step >= 3);

// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <svg
    viewBox="0 0 740 250"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="加速跑、蹲起与拉动行李箱绕操场一圈三种情形的功辨析"
    class="select-none overflow-visible"
    style="display: block; margin: 0 auto"
  >
    <defs>
      <!-- 行李箱渐变 -->
      <linearGradient id="suitcase-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--c-surface-solid)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95" />
      </linearGradient>

      <!-- 3D 跑道渐变 -->
      <linearGradient id="track-surface-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ef4444" stop-opacity="0.08" />
        <stop offset="50%" stop-color="#ef4444" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#ef4444" stop-opacity="0.08" />
      </linearGradient>
    </defs>

    <!-- 列间分隔虚线 -->
    <line x1="248" y1="20" x2="248" y2="230" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" opacity="0.3" />
    <line x1="494" y1="20" x2="494" y2="230" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" opacity="0.3" />

    <!-- ════════════════════════════════════════════════
         甲：加速跑（火柴人加速起跑）
         物理实质：地面对后脚静摩擦力 F_f 前向，但接触点相对地面瞬间无位移 ⇒ W = 0
    ════════════════════════════════════════════════ -->
    <g class="section-case-1">
      <!-- 类别徽标（小字号） -->
      <rect x="20" y="16" width="22" height="18" rx="4" fill="rgba(226, 168, 70, 0.12)" stroke="var(--c-accent)" stroke-width="1" />
      <text x="31" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--c-accent)">甲</text>
      <text x="48" y="30" font-size="13" fill="var(--c-text-dim)">加速跑</text>

      <!-- 地面剖面线 -->
      <SurfaceHatch :from="{ x: 24, y: 205 }" :to="{ x: 236, y: 205 }" side="below" :thickness="10" :gap="18" />

      <!-- 加速跑火柴人（前倾爆发冲刺身姿） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <!-- 头部 -->
        <circle cx="166" cy="94" r="10.5" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />

        <!-- 躯干（前倾约 35°） -->
        <line x1="160" y1="104" x2="136" y2="152" />

        <!-- 摆臂：前臂冲拳驱动 -->
        <polyline points="156,114 178,124 192,112" />
        <!-- 摆臂：后臂后振 -->
        <polyline points="156,114 138,126 128,140" />

        <!-- 前腿（空中前抬腾空，屈膝高抬） -->
        <polyline points="136,152 162,160 154,188 168,191" />

        <!-- 后腿（蹬地发力腿，脚底稳稳蹬地接触地面接触点） -->
        <polyline points="136,152 124,180 120,205" />
        <!-- 后脚掌（接触地面） -->
        <line x1="112" y1="205" x2="132" y2="205" stroke-width="3.2" stroke="var(--c-text)" />
      </g>

      <!-- 接触点与受力分析层（Step 1 出现第 1 个答案） -->
      <g v-if="showCase1">
        <!-- 脚底接触点（力的作用点） -->
        <circle cx="126" cy="205" r="4.5" fill="var(--c-accent)" />
        <circle cx="126" cy="205" r="8" fill="var(--c-accent)" opacity="0.25" />

        <!-- 地面静摩擦力 F_f（作用在接触点，水平向前推动人体） -->
        <CourseArrow :from="{ x: 126, y: 205 }" :to="{ x: 198, y: 205 }" stroke="var(--c-force)" :stroke-width="3.2" :head-size="10" />
        <!-- F_f 独立文字标注（箭头尖端右上方开阔处，绝不与箭杆或肢体重叠） -->
        <text x="208" y="196" text-anchor="start" font-size="17" fill="var(--c-force)" :style="HALO">
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">f</tspan>
        </text>

        <!-- 人体整体速度矢量 v（身体质心向前运动） -->
        <CourseArrow
          :from="{ x: 172, y: 70 }"
          :to="{ x: 220, y: 70 }"
          stroke="var(--c-velocity)"
          :stroke-width="2.4"
          stroke-dasharray="6 4"
          label="v"
          :label-dy="-9"
          :head-size="8"
        />

        <!-- 辨析结论徽标 -->
        <rect x="52" y="222" width="144" height="20" rx="4" fill="rgba(248, 113, 113, 0.12)" stroke="var(--c-force)" stroke-width="1" />
        <text x="124" y="236" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--c-force)">接触点无位移 ⇒ 不做功</text>
      </g>
    </g>

    <!-- ════════════════════════════════════════════════
         乙：蹲起（火柴人下蹲/起立姿态）
         物理实质：地面对脚底支持力 F_N 向上，脚底接触点无位移 ⇒ W = 0
    ════════════════════════════════════════════════ -->
    <g class="section-case-2">
      <!-- 类别徽标（小字号） -->
      <rect x="264" y="16" width="22" height="18" rx="4" fill="rgba(226, 168, 70, 0.12)" stroke="var(--c-accent)" stroke-width="1" />
      <text x="275" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--c-accent)">乙</text>
      <text x="292" y="30" font-size="13" fill="var(--c-text-dim)">蹲起</text>

      <!-- 地面剖面线 -->
      <SurfaceHatch :from="{ x: 268, y: 205 }" :to="{ x: 480, y: 205 }" side="below" :thickness="10" :gap="18" />

      <!-- 蹲起火柴人（生动真实的深蹲平衡姿态） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <!-- 头部 -->
        <circle cx="374" cy="98" r="10.5" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />

        <!-- 躯干（下蹲微前倾，重心稳定） -->
        <line x1="374" y1="109" x2="362" y2="154" />

        <!-- 双臂前伸保持平衡 -->
        <polyline points="372,118 392,134 410,130" />

        <!-- 左腿（下蹲弯曲折叠） -->
        <polyline points="362,154 338,172 344,205" />
        <!-- 左脚掌（平踩地面） -->
        <line x1="334" y1="205" x2="354" y2="205" stroke-width="3.2" stroke="var(--c-text)" />

        <!-- 右腿（后侧腿弯曲折叠） -->
        <polyline points="362,154 386,172 380,205" />
        <!-- 右脚掌（平踩地面） -->
        <line x1="372" y1="205" x2="390" y2="205" stroke-width="3.2" stroke="var(--c-text)" />
      </g>

      <!-- 接触点与受力分析层（Step 2 出现第 2 个答案） -->
      <g v-if="showCase2">
        <!-- 脚底接触点（力的作用点） -->
        <circle cx="344" cy="205" r="4.5" fill="var(--c-accent)" />
        <circle cx="344" cy="205" r="8" fill="var(--c-accent)" opacity="0.25" />

        <!-- 地面支持力 F_N（作用在脚底接触点，竖直向上） -->
        <CourseArrow :from="{ x: 344, y: 205 }" :to="{ x: 344, y: 136 }" stroke="var(--c-physics)" :stroke-width="3.2" :head-size="10" />
        <!-- F_N 独立文字标注（箭头左侧偏上，绝不与箭杆或下肢重合） -->
        <text x="330" y="144" text-anchor="end" font-size="17" fill="var(--c-physics)" :style="HALO">
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">N</tspan>
        </text>

        <!-- 重心上升速度矢量 v（起立过程质心向上） -->
        <CourseArrow
          :from="{ x: 416, y: 165 }"
          :to="{ x: 416, y: 118 }"
          stroke="var(--c-velocity)"
          :stroke-width="2.2"
          stroke-dasharray="6 4"
          label="v"
          :label-dx="14"
          :label-dy="0"
          :head-size="8"
        />

        <!-- 辨析结论徽标 -->
        <rect x="296" y="222" width="144" height="20" rx="4" fill="rgba(45, 212, 191, 0.12)" stroke="var(--c-physics)" stroke-width="1" />
        <text x="368" y="236" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--c-physics)">接触点无位移 ⇒ 不做功</text>
      </g>
    </g>

    <!-- ════════════════════════════════════════════════
         丙：绕椭圆形操场拉行李箱（3D 立体透视跑道）
         物理实质：作用点（行李箱）上，每一小段位移拉力均与瞬时切向位移成锐角 ⇒ 全程做正功
    ════════════════════════════════════════════════ -->
    <g class="section-case-3">
      <!-- 类别徽标（小字号） -->
      <rect x="508" y="16" width="22" height="18" rx="4" fill="rgba(226, 168, 70, 0.12)" stroke="var(--c-accent)" stroke-width="1" />
      <text x="519" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--c-accent)">丙</text>
      <text x="536" y="30" font-size="13" fill="var(--c-text-dim)">拉行李箱绕操场</text>

      <!-- 3D 透视操场跑道（中心在 (616, 168)，倾斜椭圆环形跑道） -->
      <g opacity="0.95">
        <!-- 外圈塑胶跑道底色（3D 环状） -->
        <path
          d="
            M 518 168
            A 98 44 0 1 1 714 168
            A 98 44 0 1 1 518 168
            M 546 168
            A 70 30 0 1 0 686 168
            A 70 30 0 1 0 546 168
            Z
          "
          fill="url(#track-surface-grad)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
        />

        <!-- 操场中央草坪 -->
        <ellipse
          cx="616"
          cy="168"
          rx="70"
          ry="30"
          fill="rgba(16, 185, 129, 0.08)"
          stroke="rgba(148, 163, 184, 0.35)"
          stroke-width="1.2"
          stroke-dasharray="4 3"
        />

        <!-- 跑道中心分道虚线 -->
        <ellipse cx="616" cy="168" rx="84" ry="37" fill="none" stroke="rgba(255, 255, 255, 0.28)" stroke-width="1.2" stroke-dasharray="5 4" />
      </g>

      <!-- 立体行李箱 (3D Wheeled Suitcase) 位于跑道右前方弧线上 -->
      <g>
        <!-- 行李箱滚轮 (小轮接触跑道) -->
        <circle cx="688" cy="180" r="3" fill="#0f172a" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <circle cx="702" cy="180" r="3" fill="#0f172a" stroke="var(--c-text-dim)" stroke-width="1.2" />

        <!-- 箱体正侧 3D 透视 -->
        <!-- 侧面厚度阴影 -->
        <polygon points="706,148 710,146 710,174 706,176" fill="#0f172a" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <!-- 顶面厚度 -->
        <polygon points="686,148 690,146 710,146 706,148" fill="#1e293b" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <!-- 箱体正面 (带精致包角与肋条) -->
        <rect x="686" y="148" width="20" height="28" rx="3.5" fill="url(#suitcase-grad)" stroke="var(--c-text-dim)" stroke-width="1.8" />
        <line x1="689" y1="156" x2="703" y2="156" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        <line x1="689" y1="162" x2="703" y2="162" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        <line x1="689" y1="168" x2="703" y2="168" stroke="rgba(255,255,255,0.2)" stroke-width="1" />

        <!-- 伸缩拉杆（拉杆斜向前引向火柴人的手） -->
        <line x1="691" y1="148" x2="674" y2="132" stroke="var(--c-text-dim)" stroke-width="1.6" />
        <line x1="697" y1="148" x2="680" y2="132" stroke="var(--c-text-dim)" stroke-width="1.6" />
        <!-- 拉杆握把 -->
        <line x1="672" y1="133" x2="682" y2="131" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
      </g>

      <!-- 前方拉箱火柴人（手持握把向前迈步行走） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <!-- 头部 -->
        <circle cx="646" cy="104" r="9.5" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.2" />

        <!-- 躯干（前行微倾） -->
        <line x1="648" y1="113" x2="652" y2="150" />

        <!-- 右臂（后伸拉住行李箱握把） -->
        <polyline points="648,122 662,130 676,132" />

        <!-- 左臂（前摆自然步态） -->
        <polyline points="648,122 638,132 632,142" />

        <!-- 双腿（沿跑道弧线迈步） -->
        <polyline points="652,150 642,166 638,184" />
        <polyline points="652,150 660,166 664,182" />
      </g>

      <!-- 受力与微元位移分析层（Step 3 出现第 3 个答案） -->
      <g v-if="showCase3">
        <!-- 力的作用点（行李箱拉杆基座 (692, 148)） -->
        <circle cx="692" cy="148" r="3.5" fill="var(--c-accent)" />

        <!-- 斜向拉力 F（沿拉杆方向斜向前上方） -->
        <CourseArrow :from="{ x: 692, y: 148 }" :to="{ x: 658, y: 116 }" stroke="var(--c-accent)" :stroke-width="3.2" :head-size="10" />
        <!-- 拉力 F 独立标注（箭头外侧上方，绝不与箭杆重合） -->
        <text x="646" y="98" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)" :style="HALO">F</text>

        <!-- 瞬时切向微位移 Δs（沿跑道圆弧瞬时切线向上） -->
        <CourseArrow
          :from="{ x: 692, y: 148 }"
          :to="{ x: 692, y: 104 }"
          stroke="var(--c-velocity)"
          :stroke-width="2.6"
          stroke-dasharray="6 4"
          :head-size="8.5"
        />
        <!-- Δs 独立标注（箭头顶端右侧） -->
        <text x="704" y="102" text-anchor="start" font-size="17" fill="var(--c-velocity)" :style="HALO">
          <tspan font-family="KaTeX_Math" font-style="italic">Δs</tspan>
        </text>

        <!-- 夹角 α 弧线（表明为锐角 α < 90°） -->
        <path d="M 692 128 A 20 20 0 0 0 678 135" fill="none" stroke="var(--c-accent)" stroke-width="1.6" />
        <text x="686" y="126" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-accent)" :style="HALO">α</text>

        <!-- 辨析结论徽标 -->
        <rect x="532" y="222" width="168" height="20" rx="4" fill="rgba(56, 189, 248, 0.12)" stroke="var(--c-velocity)" stroke-width="1" />
        <text x="616" y="236" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--c-velocity)">每一小段成锐角 ⇒ 做正功</text>
      </g>
    </g>
  </svg>
</template>
