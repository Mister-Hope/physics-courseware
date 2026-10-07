<script setup lang="ts">
import { computed } from "vue";

/**
 * 人站在体重计上的受力/运动示意（§4.6 全课通用）
 *
 * - 受力（重力 mg 向下、支持力 F_N 向上）**都从人的几何中心 (160, 248) 出发**，长度随 fnRatio 变化；
 * - 速度 v / 加速度 a 用略小一号的箭头画在人**旁侧**（左侧），避免与力箭头叠在一起；
 * - `enclosure="elevator"` 时加画具象化电梯轿厢、顶部减振索头与三根钢丝曳引缆绳；
 * - `reading` 有值时在秤的显示屏上写出示数（视重），踏板随视重产生微米级真实下压/回弹反馈。
 */
const {
  fnRatio = 1,
  forceLen = 85,
  accelDir = "none",
  speedDir = "none",
  showForces = false,
  showMotion = false,
  enclosure = "none",
  reading = null,
} = defineProps<{
  /** 视重 / 重力：决定支持力箭头长度（1 = 等重，<1 失重，>1 超重） */
  fnRatio?: number;
  /** 重力箭头长度基准（viewBox 用户单位） */
  forceLen?: number;
  /** 加速度方向；none 表示 a = 0 */
  accelDir?: "down" | "up" | "none";
  /** 速度方向；none 表示静止 */
  speedDir?: "down" | "up" | "none";
  /** 是否显示受力箭头 */
  showForces?: boolean;
  /** 是否显示速度 / 加速度箭头 */
  showMotion?: boolean;
  /** 画不画电梯轿厢 */
  enclosure?: "none" | "elevator";
  /** 秤的示数（N）；不传则不显示 */
  reading?: number | null;
}>();

/** 人的几何中心（重心）：重力与支持力都从这里起笔 */
const CO = { x: 160, y: 248 };

const viewBox = computed(() => (enclosure === "elevator" ? "0 0 320 400" : "60 118 200 282"));

const mgEnd = computed(() => ({ x: CO.x, y: CO.y + forceLen }));
const fnEnd = computed(() => ({ x: CO.x, y: CO.y - forceLen * fnRatio }));

/** 秤面随视重比值 fnRatio 产生细微压陷/回弹位移动画 */
const padShift = computed(() => Math.max(-2.2, Math.min(2.2, (fnRatio - 1) * 4.5)));

/** 秤显示屏边框与数值高亮色：超重珊瑚红、失重冰晶蓝、等重琥珀金 */
const screenAccent = computed(() => {
  if (fnRatio > 1.001) return "#f87171";
  if (fnRatio < 0.999) return "#60a5fa";
  return "#e2a846";
});

/**
 * 速度 / 加速度箭头的起止点：长度 62，绕 y = CO.y 对称画在人左侧
 *
 * @param dir 箭头方向；`none` 表示静止、不画
 * @param x 箭头所在竖线的横坐标
 * @returns 箭头的起止点；方向为 `none` 时返回 null
 */
const motion = (dir: "down" | "up" | "none", x: number): { from: { x: number; y: number }; to: { x: number; y: number } } | null => {
  if (dir === "none") return null;

  return dir === "down" ? { from: { x, y: CO.y - 31 }, to: { x, y: CO.y + 31 } } : { from: { x, y: CO.y + 31 }, to: { x, y: CO.y - 31 } };
};

const speedArrow = computed(() => motion(speedDir, 104));
const accelArrow = computed(() => motion(accelDir, 74));
</script>

<template>
  <svg :viewBox="viewBox" width="100%" style="max-width: 240px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 电梯轿厢背景渐变 -->
      <linearGradient id="pwCabinBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(30,41,59,0.52)" />
        <stop offset="100%" stop-color="rgba(15,23,42,0.72)" />
      </linearGradient>
      <!-- 人物夹克与裤装深石板蓝渐变（高对比衬托重心处力箭头） -->
      <linearGradient id="pwCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="pwPantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
      <!-- 体重计金属踏板与机身渐变 -->
      <linearGradient id="pwScalePadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(148,163,184,0.38)" />
        <stop offset="50%" stop-color="rgba(226,232,240,0.52)" />
        <stop offset="100%" stop-color="rgba(148,163,184,0.38)" />
      </linearGradient>
      <linearGradient id="pwScaleBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 电梯轿厢与曳引钢缆（enclosure === 'elevator'） ==================== -->
    <g v-if="enclosure === 'elevator'">
      <!-- 顶部三根钢丝曳引缆绳 -->
      <line x1="148" y1="0" x2="148" y2="30" stroke="#64748b" stroke-width="1.6" />
      <line x1="160" y1="0" x2="160" y2="30" stroke="#cbd5e1" stroke-width="2.2" />
      <line x1="172" y1="0" x2="172" y2="30" stroke="#64748b" stroke-width="1.6" />

      <!-- 轿厢顶部承重吊梁与绳头减振座 -->
      <path d="M 134 38 L 140 28 L 180 28 L 186 38 Z" fill="rgba(71,85,105,0.75)" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />
      <circle cx="148" cy="33" r="1.5" fill="#e2e8f0" />
      <circle cx="160" cy="33" r="1.5" fill="#e2a846" />
      <circle cx="172" cy="33" r="1.5" fill="#e2e8f0" />

      <!-- 轿厢外框与金属内壁 -->
      <rect x="32" y="38" width="256" height="334" rx="6" fill="url(#pwCabinBg)" stroke="rgba(148,163,184,0.68)" stroke-width="2.2" />
      <!-- 轿厢内壁装饰护板立线与后壁扶手 -->
      <line x1="42" y1="46" x2="42" y2="366" stroke="rgba(148,163,184,0.22)" stroke-width="1.2" />
      <line x1="278" y1="46" x2="278" y2="366" stroke="rgba(148,163,184,0.22)" stroke-width="1.2" />
      <line x1="42" y1="262" x2="278" y2="262" stroke="rgba(148,163,184,0.2)" stroke-width="3" stroke-linecap="round" />

      <!-- 轿厢顶部嵌入式 LED 照明灯带 -->
      <rect x="102" y="41" width="116" height="4.5" rx="2" fill="rgba(226,232,240,0.55)" stroke="rgba(147,197,253,0.45)" stroke-width="0.8" />

      <!-- 轿厢左右两侧外导靴 -->
      <rect x="26" y="72" width="6" height="22" rx="1.5" fill="#475569" stroke="#94a3b8" stroke-width="1" />
      <rect x="26" y="318" width="6" height="22" rx="1.5" fill="#475569" stroke="#94a3b8" stroke-width="1" />
      <rect x="288" y="72" width="6" height="22" rx="1.5" fill="#475569" stroke="#94a3b8" stroke-width="1" />
      <rect x="288" y="318" width="6" height="22" rx="1.5" fill="#475569" stroke="#94a3b8" stroke-width="1" />
    </g>

    <!-- ==================== 2. 地板接触面（复用 SurfaceHatch 组件） ==================== -->
    <SurfaceHatch :from="{ x: 32, y: 372 }" :to="{ x: 288, y: 372 }" side="below" color="#64748b" :line-width="2" :thickness="9" :gap="16" />

    <!-- ==================== 3. 精密体重秤（踏板随视重动态微压/回弹） ==================== -->
    <g>
      <!-- 踏板下方两侧传力支柱 -->
      <rect :x="124" :y="334 + padShift" width="8" :height="10 - padShift" fill="#64748b" />
      <rect :x="188" :y="334 + padShift" width="8" :height="10 - padShift" fill="#64748b" />

      <!-- 防滑称重踏板（随视重微幅上下位移） -->
      <rect x="98" :y="327 + padShift" width="124" height="10" rx="3.5" fill="url(#pwScalePadGrad)" stroke="#94a3b8" stroke-width="1.4" />
      <line x1="106" :y1="329.5 + padShift" x2="214" :y2="329.5 + padShift" stroke="rgba(248,250,252,0.55)" stroke-width="1" stroke-linecap="round" />

      <!-- 体重计梯形金属底座与防滑脚垫 -->
      <rect x="114" y="369" width="14" height="3" rx="1" fill="#475569" />
      <rect x="192" y="369" width="14" height="3" rx="1" fill="#475569" />
      <path d="M 108 370 L 114 341 L 206 341 L 212 370 Z" fill="url(#pwScaleBodyGrad)" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />

      <!-- 体重计显示屏窗口 -->
      <rect
        x="124"
        y="345"
        width="72"
        height="22"
        rx="4"
        fill="#090d16"
        :stroke="reading !== null ? screenAccent : 'rgba(148,163,184,0.45)'"
        stroke-width="1.3"
      />
      <!-- 示数文字（有 reading 时显示视重数值，无 reading 时显示刻度表盘示意） -->
      <text v-if="reading !== null" x="160" y="361" text-anchor="middle" font-family="KaTeX_Main" font-size="14.5" font-weight="600" :fill="screenAccent">
        {{ reading }} N
      </text>
      <g v-else stroke="#64748b" stroke-width="1.2" stroke-linecap="round">
        <path d="M 138 362 A 22 22 0 0 1 182 362" fill="none" />
        <line x1="160" y1="362" x2="160" y2="349" stroke="#e2a846" stroke-width="1.5" />
        <circle cx="160" cy="362" r="2" fill="#e2a846" />
      </g>
    </g>

    <!-- ==================== 4. 具象化站立人物（随秤面微动，深色高对比衬底确保受力箭头清晰） ==================== -->
    <g :style="{ transform: `translateY(${padShift}px)` }">
      <!-- 双脚运动鞋（稳踏在秤面 y = 327 上） -->
      <path d="M 132 327 L 135 319 L 152 319 L 154 327 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />
      <path d="M 166 327 L 168 319 L 185 319 L 188 327 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />

      <!-- 双腿长裤 -->
      <path d="M 138 264 L 155 264 L 152 320 L 137 320 Z" fill="url(#pwPantsGrad)" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M 165 264 L 182 264 L 183 320 L 168 320 Z" fill="url(#pwPantsGrad)" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" />

      <!-- 自然下垂的左右手臂与手掌 -->
      <path
        d="M 136 202 C 126 208 124 232 127 256 C 128 261 134 261 135 256 L 138 216 Z"
        fill="url(#pwCoatGrad)"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <path
        d="M 184 202 C 194 208 196 232 193 256 C 192 261 186 261 185 256 L 182 216 Z"
        fill="url(#pwCoatGrad)"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-linejoin="round"
      />

      <!-- 上身躯干外衣（重心 CO=(160,248) 恰好位于躯干中轴心） -->
      <path
        d="M 136 200 C 136 195 145 193 160 193 C 175 193 184 195 184 200 L 183 266 L 137 266 Z"
        fill="url(#pwCoatGrad)"
        stroke="#94a3b8"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- 领口细节 -->
      <path d="M 152 194 L 160 205 L 168 194" fill="none" stroke="rgba(203,213,225,0.45)" stroke-width="1.3" stroke-linejoin="round" />

      <!-- 脖颈与头部 -->
      <rect x="155" y="185" width="10" height="10" rx="3" fill="#475569" stroke="#94a3b8" stroke-width="1.3" />
      <circle cx="160" cy="171" r="15.5" fill="#334155" stroke="#94a3b8" stroke-width="1.6" />
      <!-- 利落短发轮廓 -->
      <path d="M 145 168 C 145 156 153 153 161 153 C 170 153 176 158 175.5 168 C 171 163 164 162 156 163 C 150 163.5 147 166 145 168 Z" fill="#1e293b" />
    </g>

    <!-- ==================== 5. 速度 v / 加速度 a 矢量（画在人左侧，互不遮挡） ==================== -->
    <g v-if="showMotion">
      <CourseArrow v-if="speedArrow" :from="speedArrow.from" :to="speedArrow.to" stroke="#60a5fa" :stroke-width="2.8" label="v" :label-dx="-13" />
      <CourseArrow v-if="accelArrow" :from="accelArrow.from" :to="accelArrow.to" stroke="#2dd4bf" :stroke-width="2.8" label="a" :label-dx="-13" />
      <!-- 当匀速运动 (a = 0) 时在加速度列标出 a = 0，强化“a=0 时视重等于重力” -->
      <text
        v-else
        x="74"
        :y="CO.y + 5"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="#94a3b8"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        a=0
      </text>
    </g>

    <!-- ==================== 6. 受力分析（重力 mg 与支持力 F_N 一律从重心 CO 共点出发） ==================== -->
    <g v-if="showForces">
      <!-- 重力 mg（竖直向下） -->
      <CourseArrow :from="CO" :to="mgEnd" stroke="#f87171" :stroke-width="3.5" />
      <text
        :x="CO.x + 14"
        :y="mgEnd.y - 6"
        text-anchor="start"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="16"
        fill="#f87171"
        stroke="#0f1425"
        stroke-width="3.2"
        paint-order="stroke"
      >
        mg
      </text>

      <!-- 支持力 F_N（竖直向上，长度随视重比 fnRatio 动态伸缩） -->
      <CourseArrow :from="CO" :to="fnEnd" stroke="#e2a846" :stroke-width="3.5" />
      <text
        :x="CO.x + 14"
        :y="fnEnd.y + 10"
        text-anchor="start"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="16"
        fill="#e2a846"
        stroke="#0f1425"
        stroke-width="3.2"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="11" font-family="KaTeX_Main" font-style="normal">N</tspan>
      </text>

      <!-- 重心共点圆心标记（压在两力箭头根部之上） -->
      <circle :cx="CO.x" :cy="CO.y" r="3.8" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6" />
    </g>
  </svg>
</template>
