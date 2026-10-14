<!--
  选必2 1.x《复合场中的配速法与摆线运动》第 5 页「逐点拆解：速度三角形与力三角形」的核心配图。
  取任意一个时刻：小球真实速度 v_实 斜向右下，把它拆成恒定向右的 v_平 与剩下的 v_圆（矢量三角形）。
  洛伦兹力 F = qv×B 对 v 是线性的 —— 于是「速度三角形整体旋转 90°」就自动给出力的三角形：
    · v_平（恒定）  →  f_平（永远竖直向上，大小恒为 qB·v_平）
    · v_圆（转动）  →  f_圆（永远垂直于 v_圆，大小恒为 qB·v_圆）
  再令 qB·v_平 = mg，第 4 步把 f_平 与重力 mg 一对冲、两个箭头一起变灰，只剩 f_圆。
  右图与左图按同一比例画：所以右图就是左图绕 O 逆时针转 90°（B 向里、正电荷）。
  step：0 = 只有 v_实；1 = 拆出 v_平 + v_圆；2 = 对应的力三角形；3 = 重力被抵消。
-->
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** 当前点击步 0…3 */
  step?: number;
}>();

const step = computed(() => props.step ?? 0);

const W = 880;
const H = 340;
/** 矢量箭头长度：后排可见优先（原 100 → 130）；起点整体上移 35 单位，向下的箭头才不出下边 */
const L = 130;
/** 左：速度三角形（v_圆 取 120°，配出好看的三角形） */
const OV = { x: 215, y: 200 };
const UV = (Math.PI * 2) / 3;
/** 右：力的三角形（同一个比例、绕 O 逆时针转 90°） */
const OF = { x: 665, y: 200 };

const vec = (o: { x: number; y: number }, len: number, deg: number): { x: number; y: number } => ({
  x: o.x + len * Math.cos(deg),
  y: o.y - len * Math.sin(deg),
});

const vPar = computed(() => vec(OV, L, 0));
const vCir = computed(() => vec(OV, L, (UV * 180) / Math.PI));
/** 真实速度＝两个分速度的矢量和 */
const vReal = computed(() => ({
  x: vPar.value.x + vCir.value.x - OV.x,
  y: vPar.value.y + vCir.value.y - OV.y,
}));

const fPar = computed(() => vec(OF, L, 90));
const fCir = computed(() => vec(OF, L, (UV * 180) / Math.PI - 90));
const fReal = computed(() => vec(OF, L, 120 - 90));
/** 重力：与 f_平 共线反向 */
const mg = computed(() => vec(OF, L, -90));

const faded = computed(() => step.value >= 3);
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.5,
  "paint-order": "stroke",
} as const;
/** 分速度标签的字体与物理量口径一致：量走 KaTeX_Math 斜体，数字 / 运算走 KaTeX_Main */
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="sb">
    <svg :viewBox="`0 0 ${W} ${H}`" class="sb-svg">
      <!-- 平行四边形补齐用虚线：两个分速度各自平移到对面 */
      <g v-if="step >= 1" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" fill="none" opacity="0.5">
        <path :d="`M ${vCir.x} ${vCir.y} L ${vReal.x} ${vReal.y}`" />
        <path :d="`M ${vPar.x} ${vPar.y} L ${vReal.x} ${vReal.y}`" />
      </g>

      <!-- ── 左：速度 ── -->
      <circle :cx="OV.x" :cy="OV.y" r="3.4" fill="var(--c-text-dim)" />
      <CourseArrow
        :from="OV"
        :to="vReal"
        stroke="var(--c-text)"
        :stroke-width="5.4"
        :head-size="17"
      />
      <text
        :x="vReal.x + 14"
        :y="vReal.y + 6"
        font-size="17"
        font-family="KaTeX_Math"
        font-style="italic"
        :style="HALO"
      >
        v
        <tspan font-family="KaTeX_Main" font-size="12" dy="4">实</tspan>
      </text>
      <g v-if="step >= 1">
        <CourseArrow
          :from="OV"
          :to="vPar"
          stroke="var(--c-velocity)"
          :stroke-width="4.6"
          :head-size="15"
        />
        <CourseArrow :from="OV" :to="vCir" stroke="var(--c-velocity)" :stroke-width="4.6" :head-size="15" />
        <text
          :x="(OV.x + vPar.x) / 2"
          :y="OV.y + 22"
          font-size="17"
          text-anchor="middle"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">平</tspan>
        </text>
        <text
          :x="vCir.x - 12"
          :y="(OV.y + vCir.y) / 2 + 6"
          font-size="17"
          text-anchor="end"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">圆</tspan>
        </text>
      </g>

      <!-- ── 中：旋转 90° ── -->
      <g v-if="step >= 2">
        <path
          d="M 358 96 Q 447 46 536 96"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <path d="M 524 84 L 538 97 L 519 100 Z" fill="var(--c-text-dim)" />
        <text
          x="447"
          y="34"
          text-anchor="middle"
          font-size="16"
          fill="var(--c-text-dim)"
          font-family="KaTeX_Main"
        >
          旋转 90°
        </text>
      </g>

      <!-- ── 右：力 ── -->
      <circle :cx="OF.x" :cy="OF.y" r="3.4" fill="var(--c-text-dim)" />
      <g v-if="step >= 3">
        <CourseArrow
          :from="OF"
          :to="mg"
          stroke="var(--c-text-dim)"
          :stroke-width="4.2"
          :head-size="14"
        />
        <text
          :x="OF.x + 12"
          :y="OF.y + 78"
          font-size="17"
          fill="var(--c-text-dim)"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          m
          <tspan font-family="KaTeX_Math" font-style="italic">g</tspan>
        </text>
      </g>
      <g v-if="step >= 2">
        <CourseArrow
          :from="OF"
          :to="fReal"
          stroke="var(--c-text)"
          :stroke-width="5.4"
          :head-size="17"
        />
        <CourseArrow :from="OF" :to="fCir" stroke="var(--c-velocity)" :stroke-width="4.6" :head-size="15" />
        <text
          :x="fReal.x - 12"
          :y="fReal.y - 12"
          font-size="17"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          F
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">洛</tspan>
        </text>
        <text
          :x="fCir.x + 9"
          :y="fCir.y - 6"
          font-size="17"
          text-anchor="start"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          f
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">圆</tspan>
        </text>
        <CourseArrow
          :from="OF"
          :to="fPar"
          :stroke="faded ? 'var(--c-text-dim)' : 'var(--c-force)'"
          :stroke-width="4.6"
          :head-size="15"
        />
        <text
          :x="OF.x + 12"
          :y="OF.y - 72"
          font-size="17"
          :fill="faded ? 'var(--c-text-dim)' : 'var(--c-force)'"
          font-family="KaTeX_Math"
          font-style="italic"
          :style="HALO"
        >
          f
          <tspan font-family="KaTeX_Main" font-size="12" dy="4">平</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.sb {
  width: 100%;
}

.sb-svg {
  display: block;
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: 0 auto;
}
</style>
