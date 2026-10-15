<script setup lang="ts">
import { computed, ref } from "vue";

/** 第 7 页方案二：细线绕过定滑轮把木块与测力计相连，匀速抽出长木板（测力计用共享组件 <SpringScale>、手部用共享组件 <GripHand> 画） */

/** 细线水平上段末端——测力计挂钩最左端 (hookEnd.x) 落在这里 */
const HOOK_X = 82;
/** 测力计轴线高度（细线水平上段高度） */
const AXIS_Y = 115;
/** 外壳长 110 → 外壳宽 110 / 5.5 = 20，故外壳上沿 y = 115 − 10 = 105 */
const CASE_Y = 105;

const scale = ref<{
  extension: number;
  ringCenter: { x: number; y: number };
  ringEnd: { x: number; y: number };
} | null>(null);

/** Mirror 时图形会沿轴反向多伸出 extension：外壳位置 = 挂钩端 + extension */
const scaleX = computed(() => HOOK_X + (scale.value?.extension ?? 0));
/** 测力计右端吊环最右缘横坐标（供右侧 <GripHand> 精准捏住吊环） */
const ringEndX = computed(() => scale.value?.ringEnd.x ?? 263.6);
</script>

<template>
  <!-- 第 7 页方案二：细线绕过定滑轮、匀速抽出长木板（由动转静） -->
  <svg viewBox="0 70 336 186" class="fig-svg fig-lg" xmlns="http://www.w3.org/2000/svg">
    <!-- ==================== 1. 左侧墙面与水平桌面（均用 <SurfaceHatch> 绘制，在角点 (24, 198) 严密对接） ==================== -->
    <!-- 左侧竖直墙面：从上 (24, 74) 到下 (24, 198)，斜线在左侧 (side="left") -->
    <SurfaceHatch :from="{ x: 24, y: 74 }" :to="{ x: 24, y: 198 }" side="left" :thickness="12" :gap="20" color="#94a3b8" />
    <!-- 水平桌面：从左 (22.8, 198) 到右 (328, 198)，与墙面角点 (24, 198) 严密闭合，斜线在下方 (side="below") -->
    <SurfaceHatch :from="{ x: 22.8, y: 198 }" :to="{ x: 328, y: 198 }" side="below" :thickness="12" :gap="24" color="#94a3b8" />
    <text x="52" y="224" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">桌面</text>

    <!-- ==================== 2. 长木板与物块（严格错开描边边界，绝不重叠） ==================== -->
    <!-- 长木板（y: 179..195，stroke-width=2 → 下外沿 196.0，与桌面上外沿 196.8 留出清晰分界） -->
    <rect x="42" y="179" width="244" height="16" rx="2.5" fill="color-mix(in srgb, var(--c-velocity) 16%, transparent)" stroke="var(--c-velocity)" stroke-width="2" />
    <text x="72" y="191" text-anchor="middle" font-size="11.5" fill="var(--c-velocity-light)">长木板</text>

    <!-- 物块（y: 132..176，stroke-width=2.2 → 下外沿 177.1，与木板上外沿 178.0 严格相切不重叠） -->
    <rect x="136" y="132" width="72" height="44" rx="4" fill="color-mix(in srgb, var(--c-accent) 20%, transparent)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text x="172" y="157" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--c-accent-light)">物块</text>

    <!-- ==================== 3. 墙面定滑轮与支架（cx=54, cy=130, 绳槽半径 r=15） ==================== -->
    <!-- 墙面安装底座与双连杆支架 -->
    <rect x="24" y="123" width="4" height="14" rx="1" fill="var(--c-text-dim)" />
    <line x1="27" y1="127" x2="54" y2="129" stroke="var(--c-text-dim)" stroke-width="2.2" stroke-linecap="round" />
    <line x1="27" y1="133" x2="54" y2="131" stroke="var(--c-text-dim)" stroke-width="2.2" stroke-linecap="round" />

    <!-- 定滑轮轮体（外轮缘 r=16.5，内虚线槽 r=13，细绳沿 r=15 走线） -->
    <circle cx="54" cy="130" r="16.5" fill="var(--c-bg-soft)" stroke="var(--c-text-dim)" stroke-width="2" />
    <circle cx="54" cy="130" r="13" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)" stroke-width="1" stroke-dasharray="3 2" />

    <!-- ==================== 4. 纯白细绳（物块左端 → 绕过定滑轮 → 测力计挂钩） ==================== -->
    <!-- 物块左侧挂绳环 -->
    <circle cx="134" cy="145" r="2.2" fill="none" stroke="var(--c-accent)" stroke-width="1.6" />
    <!-- 连续白色细绳路径：下水平段 (132,145 → 54,145) + 滑轮左半圆弧 (r=15) + 上水平段 (54,115 → 82,115) -->
    <path :d="`M 132 145 L 54 145 A 15 15 0 0 1 54 ${AXIS_Y} L ${HOOK_X} ${AXIS_Y}`" fill="none" stroke="var(--c-neutral-50)" stroke-width="2.2" stroke-linecap="round" />
    <!-- 定滑轮中心转轴铆钉 -->
    <circle cx="54" cy="130" r="3" fill="var(--c-neutral-200)" stroke="var(--c-bg-soft)" stroke-width="1" />
    <text x="54" y="162" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">定滑轮</text>

    <!-- ==================== 5. 水平弹簧测力计与右侧 <GripHand> 捏持手部 ==================== -->
    <SpringScale ref="scale" :x="scaleX" :y="CASE_Y" :length="110" :force="2.4" color="#cbd5e1" accent="#e2a846" orientation="horizontal" mirror label="2.4" />
    <text x="192" y="88" text-anchor="middle" font-size="12" fill="var(--c-velocity)">弹簧测力计</text>

    <!-- 共享手部组件：在右侧捏住测力计吊环外缘 (ringEndX, AXIS_Y) -->
    <GripHand :x="ringEndX" :y="AXIS_Y" side="right" />
    <text :x="ringEndX + 20" y="140" text-anchor="middle" font-size="12" fill="var(--c-accent)">手拉住测力计</text>

    <!-- ==================== 6. 物块所受滑动摩擦力 F_f 与抽出木板运动箭头 ==================== -->
    <CourseArrow :from="{ x: 172, y: 170 }" :to="{ x: 244, y: 170 }" stroke="var(--c-force)" stroke-width="3.2" />
    <circle cx="172" cy="170" r="2.6" fill="var(--c-force)" stroke="var(--c-bg-soft)" stroke-width="1" />
    <text x="253" y="173" font-size="14" fill="var(--c-force)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="10">f</tspan>
    </text>

    <!-- 向右抽出长木板的运动箭头 -->
    <CourseArrow :from="{ x: 214, y: 226 }" :to="{ x: 306, y: 226 }" stroke="var(--c-velocity)" stroke-width="3" />
    <text x="260" y="244" text-anchor="middle" font-size="12" fill="var(--c-velocity)">匀速抽出木板</text>
  </svg>
</template>
