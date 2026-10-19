<!--
  P14 洛伦兹力的应用装置（总览点击交互；@click 不占翻页）
  —— 四张卡片：速度选择器 / 磁流体发电机 / 电磁流量计 / 霍尔元件。
     每张卡片的缩略图都在本组件内部自绘（不复用其它组件）；
     点卡片 → 该卡片高亮并显示一句话原理（公式用 <Latex>），再点收起。
     未激活时原理区用 visibility 占位，点击不会顶跑任何已可见元素。
-->
<script setup lang="ts">
import { ref } from "vue";

interface Device {
  key: "speed" | "mhd" | "flow" | "hall";
  name: string;
  /** 一句话原理的前半句（公式紧随其后） */
  lead: string;
  /** 原理里的公式（KaTeX 源码，编译期预渲染） */
  tex: string;
}

const devices: Device[] = [
  { key: "speed", name: "速度选择器", lead: "电场力与洛伦兹力平衡，", tex: "v = \\frac{E}{B}" },
  { key: "mhd", name: "磁流体发电机", lead: "正、负离子被推向两板，", tex: "\\varepsilon = Bvd" },
  { key: "flow", name: "电磁流量计", lead: "两电极电压反映流速，", tex: "Q = \\frac{\\pi DU}{4B}" },
  {
    key: "hall",
    name: "霍尔元件",
    lead: "由电压可测载流子浓度，",
    tex: "U = aBv = \\frac{IB}{nqd}",
  },
];

const active = ref<Device["key"] | null>(null);

const toggle = (key: Device["key"]): void => {
  active.value = active.value === key ? null : key;
};
</script>

<template>
  <div class="dg-grid">
    <button
      v-for="device in devices"
      :key="device.key"
      class="dg-card"
      :class="{ 'dg-on': active === device.key }"
      type="button"
      @click="toggle(device.key)"
    >
      <span class="dg-name">{{ device.name }}</span>
      <span class="dg-thumb">
        <!-- 速度选择器：两平行板 + 竖直向下的电场箭头 + 向里的磁场阵列 + 直线穿过的粒子 -->
        <svg
          v-if="device.key === 'speed'"
          viewBox="0 0 120 90"
          xmlns="http://www.w3.org/2000/svg"
          class="dg-svg"
          aria-hidden="true"
        >
          <rect x="14" y="16" width="92" height="5" rx="2" fill="var(--c-text-dim)" />
          <rect x="14" y="69" width="92" height="5" rx="2" fill="var(--c-text-dim)" />
          <FieldDots
            :x="60"
            :y="34"
            :cols="1"
            :rows="2"
            :spacing="22"
            :size="4"
            :line-width="1.4"
            :opacity="0.9"
          />
          <CourseArrow
            :from="{ x: 34, y: 27 }"
            :to="{ x: 34, y: 63 }"
            stroke="var(--c-accent-2)"
            :stroke-width="1.8"
            :head-size="7"
          />
          <CourseArrow
            :from="{ x: 86, y: 27 }"
            :to="{ x: 86, y: 63 }"
            stroke="var(--c-accent-2)"
            :stroke-width="1.8"
            :head-size="7"
          />
          <line
            x1="20"
            y1="45"
            x2="100"
            y2="45"
            stroke="var(--c-velocity)"
            stroke-width="1.6"
            stroke-dasharray="5 4"
          />
          <circle cx="60" cy="45" r="3.6" fill="var(--c-velocity)" />
        </svg>
        <!-- 磁流体发电机：两平行板（板上 +/−）+ 向里磁场阵列 + 水平束流与正负离子 -->
        <svg
          v-else-if="device.key === 'mhd'"
          viewBox="0 0 120 90"
          xmlns="http://www.w3.org/2000/svg"
          class="dg-svg"
          aria-hidden="true"
        >
          <rect x="12" y="20" width="96" height="5" rx="2" fill="var(--c-text-dim)" />
          <rect x="12" y="65" width="96" height="5" rx="2" fill="var(--c-text-dim)" />
          <text x="16" y="15" font-family="KaTeX_Main" font-size="13" fill="var(--c-danger)">
            +
          </text>
          <text x="16" y="85" font-family="KaTeX_Main" font-size="13" fill="var(--c-velocity)">
            −
          </text>
          <FieldDots
            :x="34"
            :y="32"
            :cols="3"
            :rows="2"
            :spacing="26"
            :size="3.6"
            :line-width="1.3"
            :opacity="0.85"
          />
          <circle cx="44" cy="46" r="3.6" fill="var(--c-danger)" />
          <circle cx="76" cy="46" r="3.6" fill="var(--c-velocity)" />
          <CourseArrow
            :from="{ x: 16, y: 46 }"
            :to="{ x: 104, y: 46 }"
            stroke="var(--c-velocity)"
            :stroke-width="2"
            label="v"
            :label-dy="-8"
            :head-size="7"
          />
        </svg>
        <!-- 电磁流量计：一段圆管（立体画法：近端圆面 + 管身，圆是液体截面）+ 向里磁场阵列
             + 上、下管壁电极 M、N 与管内流向 -->
        <svg
          v-else-if="device.key === 'flow'"
          viewBox="0 0 120 90"
          xmlns="http://www.w3.org/2000/svg"
          class="dg-svg"
          aria-hidden="true"
        >
          <path
            d="M 38 25 H 100 A 9 22 0 0 1 100 69 H 38 A 9 22 0 0 1 38 25 Z"
            fill="color-mix(in srgb, var(--c-physics) 8%, transparent)"
            stroke="var(--c-text-dim)"
            stroke-width="2.2"
            stroke-linejoin="round"
          />
          <path
            d="M 38 25 A 9 22 0 0 1 38 69"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="1.4"
            opacity="0.45"
          />
          <FieldDots
            :x="56"
            :y="36"
            :cols="4"
            :rows="2"
            :spacing="13"
            :size="3.2"
            :line-width="1.3"
            :opacity="0.85"
          />
          <line
            x1="62"
            y1="25"
            x2="82"
            y2="25"
            stroke="var(--c-accent)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <line
            x1="62"
            y1="69"
            x2="82"
            y2="69"
            stroke="var(--c-accent)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <text
            x="72"
            y="17"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="12"
            fill="var(--c-accent)"
          >
            M
          </text>
          <text
            x="72"
            y="84"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="12"
            fill="var(--c-accent)"
          >
            N
          </text>
          <CourseArrow
            :from="{ x: 2, y: 47 }"
            :to="{ x: 26, y: 47 }"
            stroke="var(--c-velocity)"
            :stroke-width="1.8"
            :head-size="6"
          />
          <text
            x="12"
            y="37"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="12"
            fill="var(--c-velocity)"
          >
            v
          </text>
        </svg>
        <!-- 霍尔元件：长方体薄片（透视）+ 沿长度方向的电流箭头 + 单个 ⊗ 记号 -->
        <svg
          v-else
          viewBox="0 0 120 90"
          xmlns="http://www.w3.org/2000/svg"
          class="dg-svg"
          aria-hidden="true"
        >
          <rect
            x="24"
            y="38"
            width="68"
            height="32"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="2"
          />
          <path
            d="M 24 38 L 40 22 L 108 22 L 92 38 Z"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M 92 38 L 108 22 L 108 54 L 92 70 Z"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <FieldMark
            :x="66"
            :y="22"
            dir="in"
            :r="8"
            :line-width="1.8"
            label="B"
            :label-size="13"
            :label-dy="-35"
          />
          <CourseArrow
            :from="{ x: 30, y: 60 }"
            :to="{ x: 86, y: 60 }"
            stroke="var(--c-accent)"
            :stroke-width="2"
            label="I"
            :label-dy="-9"
            :head-size="7"
          />
        </svg>
      </span>
      <span class="dg-tip" :class="{ 'dg-tip-on': active === device.key }">
        <span class="dg-say">
          <span class="dg-lead">{{ device.lead }}</span>
          <Latex :tex="device.tex" />
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.dg-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  width: 100%;
  min-width: 0;
  /* 卡片按内容取高（不撑满页面）：页面用 .spread 的 space-around 分布，
     让上下文字与卡片组均匀散开，而不是被卡片吃掉全部空白（教师反馈） */
  height: auto;
  min-height: 0;
}

.dg-card {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  min-width: 0;
  padding: 0.7rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
  color: var(--c-text);
  font: inherit;

  cursor: pointer;

  transition: all 0.25s ease;
}

.dg-card:hover {
  border-color: var(--c-border-glow);
}

.dg-on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
  box-shadow: 0 0 22px var(--c-accent-soft);
}

.dg-name {
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.3;
}

.dg-thumb {
  display: flex;
  flex: 1;
  align-items: center;

  width: 100%;
  min-height: 0;
}

.dg-svg {
  display: block;

  width: 100%;
  max-height: 150px;
  height: auto;
}

/* 原理区：盖在缩略图上的浮层，未激活时只隐藏、不占位——点击绝不改变卡片高度 */
.dg-tip {
  position: absolute;
  inset: 2.3rem 0.4rem 0.35rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.3rem 0.4rem;
  border: 1px solid var(--c-border-glow);
  border-radius: var(--radius-md);

  background: var(--c-surface-solid);

  visibility: hidden;
  overflow: hidden;
  opacity: 0;

  transition: opacity 0.2s ease;
}

.dg-tip-on {
  visibility: visible;
  opacity: 1;
}

.dg-say {
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: center;
}

.dg-lead {
  color: var(--c-text-dim);
}

.dg-on .dg-lead {
  color: var(--c-text);
}
</style>
