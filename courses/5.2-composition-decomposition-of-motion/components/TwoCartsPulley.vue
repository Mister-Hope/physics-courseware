<script setup lang="ts">
/**
 * 练习页示意图：水平面上两辆小车 A、B，用一根细绳跨过天花板上的定滑轮相连。
 *
 * A 车沿水平面向**左**（远离滑轮）以 v₀ 运动，把绳从滑轮这一侧拉走； 绳只能拉、不能推，所以 B 车被绳拉着朝**滑轮方向**（也向左）运动。 绳不可伸长 ⇒ A 端放长的速度与 B
 * 端收短的速度相等，即两端沿绳方向的分量相等： v_A cos θ_A = v_B cos θ_B。
 *
 * 这是课末的一道练习，两段绳取定值画个示意即可，不做交互。 画法沿用本课约定：分量从物体本身出发，垂线由速度箭头尖端画到分量末端。
 */
const { showArrows = false } = defineProps<{
  /** 点击后才出速度与沿绳分量（题干页先给干净图） */
  showArrows?: boolean;
}>();

const VIEW_W = 660;
const VIEW_H = 400;
/** 天花板、滑轮、桌面与绳的挂点 */
const CEIL_Y = 60;
const PULLEY_X = 380;
const PULLEY_Y = 96;
const TABLE_Y = 330;
const ATTACH_Y = 298;

const DEG_A = 45;
const DEG_B = 60;
const rad = (deg: number): number => (deg * Math.PI) / 180;
const COS_A = Math.cos(rad(DEG_A));
const COS_B = Math.cos(rad(DEG_B));
const SIN_A = Math.sin(rad(DEG_A));
const SIN_B = Math.sin(rad(DEG_B));

/** 由夹角定出两车位置：绳始终从车顶连到滑轮 */
const RISE = ATTACH_Y - PULLEY_Y;
const CART_A = { x: PULLEY_X - RISE / Math.tan(rad(DEG_A)), y: TABLE_Y };
const CART_B = { x: PULLEY_X + RISE / Math.tan(rad(DEG_B)), y: TABLE_Y };
const ATTACH_A = { x: CART_A.x, y: ATTACH_Y };
const ATTACH_B = { x: CART_B.x, y: ATTACH_Y };
/** 绳方向：A 端指向滑轮，B 端离开滑轮 */
const UNIT_A = { x: COS_A, y: -SIN_A };
const UNIT_B = { x: COS_B, y: SIN_B };

/** 速度箭头长度（两者之比按 v_B = v₀·cos θ_A / cos θ_B） */
const ARROW_A = 74;
const ARROW_B = (ARROW_A * COS_A) / COS_B;
/** 两端沿绳方向的公共分量长度 */
const SHARE_LEN = ARROW_A * COS_A;

const VEL_A_TIP = { x: ATTACH_A.x - ARROW_A, y: ATTACH_Y };
const VEL_B_TIP = { x: ATTACH_B.x - ARROW_B, y: ATTACH_Y };
/** A 端分量：沿绳的延长线指向远离滑轮的一侧（绳在这一端放长） */
const SHARE_A = { x: ATTACH_A.x - SHARE_LEN * UNIT_A.x, y: ATTACH_A.y - SHARE_LEN * UNIT_A.y };
/** B 端分量：沿绳指向滑轮（绳在这一端收短） */
const SHARE_B = { x: ATTACH_B.x - SHARE_LEN * UNIT_B.x, y: ATTACH_B.y - SHARE_LEN * UNIT_B.y };

const ARC_R = 56;
const ARC_A = `M ${ATTACH_A.x + ARC_R} ${ATTACH_Y} A ${ARC_R} ${ARC_R} 0 0 0 ${ATTACH_A.x + ARC_R * COS_A} ${ATTACH_Y - ARC_R * SIN_A}`;
const ARC_B = `M ${ATTACH_B.x - ARC_R} ${ATTACH_Y} A ${ARC_R} ${ARC_R} 0 0 1 ${ATTACH_B.x - ARC_R * COS_B} ${ATTACH_Y - ARC_R * SIN_B}`;
</script>

<template>
  <div class="sim">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="两辆小车用细绳跨过天花板上的定滑轮相连"
    >
      <!-- 天花板与桌面 -->
      <rect
        x="0"
        :y="CEIL_Y - 24"
        width="660"
        height="24"
        fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)"
      />
      <SurfaceHatch
        :from="{ x: 30, y: CEIL_Y - 24 }"
        :to="{ x: 630, y: CEIL_Y - 24 }"
        side="above"
        :thickness="14"
      />
      <line
        x1="20"
        :y1="TABLE_Y"
        x2="640"
        :y2="TABLE_Y"
        stroke="var(--c-neutral-300)"
        stroke-width="2.4"
      />
      <SurfaceHatch
        :from="{ x: 20, y: TABLE_Y }"
        :to="{ x: 640, y: TABLE_Y }"
        side="below"
        :thickness="14"
      />
      <!-- 天花板上的定滑轮 -->
      <line
        :x1="PULLEY_X"
        :y1="CEIL_Y"
        :x2="PULLEY_X"
        :y2="PULLEY_Y - 16"
        stroke="var(--c-neutral-300)"
        stroke-width="3"
      />
      <!-- 绳：A 端 → 滑轮 → B 端 -->
      <line
        :x1="ATTACH_A.x"
        :y1="ATTACH_A.y"
        :x2="PULLEY_X"
        :y2="PULLEY_Y"
        stroke="var(--c-neutral-300)"
        stroke-width="2.6"
      />
      <line
        :x1="PULLEY_X"
        :y1="PULLEY_Y"
        :x2="ATTACH_B.x"
        :y2="ATTACH_B.y"
        stroke="var(--c-neutral-300)"
        stroke-width="2.6"
      />
      <circle
        :cx="PULLEY_X"
        :cy="PULLEY_Y"
        r="16"
        fill="var(--c-surface-solid)"
        stroke="var(--c-neutral-300)"
        stroke-width="2.6"
      />
      <!-- 两辆小车 -->
      <g v-for="(cart, i) in [CART_A, CART_B]" :key="i">
        <rect
          :x="cart.x - 30"
          :y="cart.y - 34"
          width="60"
          height="20"
          rx="5"
          fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)"
          stroke="var(--c-velocity-light)"
          stroke-width="2.2"
        />
        <circle
          :cx="cart.x - 17"
          :cy="cart.y - 7"
          r="7"
          fill="none"
          stroke="var(--c-neutral-300)"
          stroke-width="2.2"
        />
        <circle
          :cx="cart.x + 17"
          :cy="cart.y - 7"
          r="7"
          fill="none"
          stroke="var(--c-neutral-300)"
          stroke-width="2.2"
        />
      </g>
      <text
        :x="CART_A.x - 46"
        :y="TABLE_Y + 6"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-text)"
      >
        A
      </text>
      <text
        :x="CART_B.x + 38"
        :y="TABLE_Y + 6"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-text)"
      >
        B
      </text>
      <!-- 绳与水平方向的夹角 -->
      <line
        :x1="ATTACH_A.x"
        :y1="ATTACH_Y"
        :x2="ATTACH_A.x + 100"
        :y2="ATTACH_Y"
        stroke="color-mix(in srgb, var(--c-text-dim) 60%, transparent)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <line
        :x1="ATTACH_B.x"
        :y1="ATTACH_Y"
        :x2="ATTACH_B.x - 100"
        :y2="ATTACH_Y"
        stroke="color-mix(in srgb, var(--c-text-dim) 60%, transparent)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path :d="ARC_A" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.8" />
      <path :d="ARC_B" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.8" />
      <text
        :x="ATTACH_A.x + 64"
        :y="ATTACH_Y - 12"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-neutral-300)"
      >
        θ
      </text>
      <text
        :x="ATTACH_A.x + 73"
        :y="ATTACH_Y - 4"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-neutral-300)"
      >
        A
      </text>
      <text
        :x="ATTACH_B.x - 82"
        :y="ATTACH_Y - 12"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-neutral-300)"
      >
        θ
      </text>
      <text
        :x="ATTACH_B.x - 73"
        :y="ATTACH_Y - 4"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-neutral-300)"
      >
        B
      </text>
      <!-- 速度与沿绳分量（点击后出） -->
      <g v-if="showArrows">
        <CourseArrow :from="ATTACH_A" :to="VEL_A_TIP" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="ATTACH_A" :to="SHARE_A" stroke="var(--c-accent)" :stroke-width="3.2" />
        <line
          :x1="SHARE_A.x"
          :y1="SHARE_A.y"
          :x2="VEL_A_TIP.x"
          :y2="VEL_A_TIP.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 80%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <CourseArrow :from="ATTACH_B" :to="VEL_B_TIP" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="ATTACH_B" :to="SHARE_B" stroke="var(--c-accent)" :stroke-width="3.2" />
        <line
          :x1="SHARE_B.x"
          :y1="SHARE_B.y"
          :x2="VEL_B_TIP.x"
          :y2="VEL_B_TIP.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 80%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <text
          :x="VEL_A_TIP.x + 2"
          :y="ATTACH_Y - 10"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="var(--c-force)"
        >
          v
        </text>
        <text
          :x="VEL_A_TIP.x + 12"
          :y="ATTACH_Y - 5"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="12"
          fill="var(--c-force)"
        >
          0
        </text>
        <text
          :x="VEL_B_TIP.x + 2"
          :y="ATTACH_Y - 10"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="var(--c-force)"
        >
          v
        </text>
        <text
          :x="VEL_B_TIP.x + 12"
          :y="ATTACH_Y - 5"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="12"
          fill="var(--c-force)"
        >
          B
        </text>
      </g>
    </svg>
  </div>
</template>
