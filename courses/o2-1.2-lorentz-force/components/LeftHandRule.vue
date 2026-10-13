<!--
  左手定则判定（交互组件，对应板书二 · ★"仅需将等效电流方向找出即可"）
  —— 场景：电子 / 质子沿 v 向右运动，B 垂直纸面向外（⊙）或向里（⊗）。
     分步 step：① 找等效电流方向（负电荷与运动方向相反）② 磁感线穿掌心 ③ 拇指 = F_洛
     按钮切换电荷符号与 B 方向；F_洛 方向 = q·(v × B)，由 computed 真实计算。
  手性说明（关键，别再拍脑袋镜像）：
     屏幕坐标 x 右、y 下；取右手系 (X 右, Y 上, Z 朝观察者)。左手恒满足 拇指 = −(四指 × 掌面法向)。
     于是"掌面朝观察者"时 四指向右 ⇒ 拇指向上；"掌面朝纸面里"时四指向右 ⇒ 拇指向下。
     B ⊗（磁感线射入纸面）时磁感线才可能穿入掌心 ⇒ 掌面朝观察者，我们看到的是掌面；
     B ⊙（射出纸面）时掌心必须背对观察者 ⇒ 看到的是手背。
     因此贴图只用一张"掌面朝观察者、四指右、拇指上"的左手（LeftHandSvg 写实手绘），四种情况分别用
     恒等 / 旋转 180°（仍是掌面）/ 水平镜像、垂直镜像（翻到看手背的一面）得到——
     镜像不是把左手换成右手，而是"同一只左手从另一面看"，与掌面朝向严格对应。
  待细化方向：场景可拖拽旋转。
-->
<script setup>
import { computed, ref } from "vue";

const { step = 0 } = defineProps({
  step: { type: Number, default: 0 },
});

const charge = ref("electron"); // 'electron' | 'proton'
const bDir = ref("out"); // 'out' ⊙ 向外 | 'in' ⊗ 向里

/** 真实学科计算：F = q·(v × B)；v 恒向右 (+x)，B 沿 z 轴（穿纸面） */
const F = computed(() => {
  const q = charge.value === "electron" ? -1 : 1;
  const Bz = bDir.value === "out" ? 1 : -1;
  // v=(1,0,0)、B=(0,0,Bz) → v×B = (0,−Bz,0)，故 F_y = −q·Bz（y>0 向上）
  return { x: 0, y: -q * Bz };
});

/** 等效电流方向：负电荷与运动方向相反 */
const iRight = computed(() => charge.value === "proton");
/** 掌心是否朝向观察者：只有磁感线射入纸面（⊗）时掌心才迎着磁感线 */
const palmToViewer = computed(() => bDir.value === "in");
/** 手掌中心（四种变换都绕它做，保证变换后仍在画面正中） */
const CX = 197;
const CY = 186;

/** 左手贴图的四种刚体变换（见文件头手性说明） */
const handTransform = computed(() => {
  if (palmToViewer.value) return iRight.value ? "" : `rotate(180 ${CX} ${CY})`;

  return iRight.value
    ? `translate(0 ${CY * 2}) scale(1 -1)` // 看手背：四指右、拇指下
    : `translate(${CX * 2} 0) scale(-1 1)`; // 看手背：四指左、拇指上
});

/** 第三步才点亮拇指 */
const showThumb = computed(() => step >= 3);

const palmText = computed(() =>
  palmToViewer.value ? "掌面朝观察者" : "掌面朝纸面里，看到的是手背",
);
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <!-- 按钮组（点击即演示，不占翻页点击） -->
    <div class="mb-2 flex items-center gap-4">
      <div class="flex gap-2">
        <button
          type="button"
          class="px-3 py-1 rounded-full text-sm border transition-colors"
          :class="
            charge === 'electron'
              ? 'border-sky-400 text-sky-300'
              : 'border-slate-600 text-slate-400'
          "
          @click="charge = 'electron'"
        >
          电子 <Latex tex="e^{-}" />
        </button>
        <button
          type="button"
          class="px-3 py-1 rounded-full text-sm border transition-colors"
          :class="
            charge === 'proton' ? 'border-red-400 text-red-300' : 'border-slate-600 text-slate-400'
          "
          @click="charge = 'proton'"
        >
          质子 <Latex tex="p^{+}" />
        </button>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="px-3 py-1 rounded-full text-sm border transition-colors"
          :class="
            bDir === 'out' ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
          "
          @click="bDir = 'out'"
        >
          <Latex tex="B \odot" /> 向外
        </button>
        <button
          type="button"
          class="px-3 py-1 rounded-full text-sm border transition-colors"
          :class="
            bDir === 'in' ? 'border-amber-400 text-amber-300' : 'border-slate-600 text-slate-400'
          "
          @click="bDir = 'in'"
        >
          <Latex tex="B \otimes" /> 向里
        </button>
      </div>
    </div>

    <div class="grid min-h-0 flex-1 grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] items-center gap-4">
      <!-- 左：物理场景（电荷 + v + 等效电流 I + B + F_洛） -->
      <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
        <!-- 磁场区（磁感线垂直纸面，用边框示意"区域"） -->
        <rect
          x="46"
          y="58"
          width="428"
          height="212"
          rx="14"
          fill="rgba(148,163,184,0.04)"
          stroke="rgba(148,163,184,0.18)"
          stroke-width="1.4"
        />

        <!-- B 符号 ⊙ / ⊗ -->
        <g v-if="bDir === 'out'">
          <circle cx="424" cy="118" r="17" fill="none" stroke="#e2a846" stroke-width="2.6" />
          <circle cx="424" cy="118" r="4.2" fill="#e2a846" />
        </g>
        <g v-else>
          <circle cx="424" cy="118" r="17" fill="none" stroke="#e2a846" stroke-width="2.6" />
          <line x1="412" y1="106" x2="436" y2="130" stroke="#e2a846" stroke-width="2.4" />
          <line x1="436" y1="106" x2="412" y2="130" stroke="#e2a846" stroke-width="2.4" />
        </g>
        <text
          x="424"
          y="84"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="25"
          fill="#e2a846"
        >
          B
        </text>

        <!-- 电荷（作用点） -->
        <circle
          cx="190"
          cy="170"
          r="16"
          fill="rgba(15,23,42,0.9)"
          :stroke="charge === 'electron' ? '#60a5fa' : '#f87171'"
          stroke-width="2.6"
        />
        <text
          x="190"
          y="179"
          text-anchor="middle"
          :fill="charge === 'electron' ? '#60a5fa' : '#f87171'"
          font-size="24"
        >
          {{ charge === "electron" ? "−" : "+" }}
        </text>

        <!-- v（速度画在物体旁侧，略小一号） -->
        <CourseArrow
          :from="{ x: 214, y: 136 }"
          :to="{ x: 350, y: 136 }"
          stroke="#60a5fa"
          stroke-width="4"
        />
        <text
          x="362"
          y="144"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="25"
          fill="#60a5fa"
        >
          v
        </text>

        <!-- 等效电流方向（step ≥ 1）：负电荷与运动方向相反 -->
        <template v-if="step >= 1">
          <CourseArrow
            :from="{ x: iRight ? 212 : 168, y: 206 }"
            :to="{ x: iRight ? 330 : 52, y: 206 }"
            stroke="#e2a846"
            stroke-width="3.4"
            stroke-dasharray="9 6"
          />
          <text
            :x="iRight ? 342 : 40"
            :y="214"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="24"
            fill="#e2a846"
          >
            I
          </text>
        </template>

        <!-- F_洛（step ≥ 3）：从电荷几何中心出发，竖直向上 / 向下 -->
        <template v-if="step >= 3">
          <CourseArrow
            :from="{ x: 190, y: 170 }"
            :to="{ x: 190, y: F.y > 0 ? 62 : 278 }"
            stroke="#2dd4bf"
            stroke-width="5"
          />
          <text x="204" :y="F.y > 0 ? 72 : 288" font-size="23" fill="#2dd4bf">
            <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
            <tspan dy="4" font-size="13">洛</tspan>
          </text>
        </template>
      </svg>

      <!-- 右：左手（写实手绘：四指沿 I、拇指沿 F_洛、磁感线穿入掌心） -->
      <div class="flex h-full min-h-0 flex-col items-center justify-center">
        <svg
          viewBox="0 0 380 350"
          xmlns="http://www.w3.org/2000/svg"
          class="min-h-0 w-full flex-1"
          :style="{ opacity: step >= 2 ? 1 : 0.2, transition: 'opacity 0.3s' }"
        >
          <g :transform="handTransform">
            <LeftHandSvg :palm="palmToViewer" :highlight-thumb="showThumb" />
          </g>

          <!-- 掌心的磁场记号（磁感线穿入掌心处；四种变换都把它映回同一点） -->
          <g v-if="step >= 2">
            <circle cx="197" cy="186" r="13" fill="rgba(9,13,26,0.55)" />
            <g v-if="bDir === 'out'">
              <circle cx="197" cy="186" r="11" fill="none" stroke="#e2a846" stroke-width="2" />
              <circle cx="197" cy="186" r="2.8" fill="#e2a846" />
            </g>
            <g v-else>
              <circle cx="197" cy="186" r="11" fill="none" stroke="#e2a846" stroke-width="2" />
              <line x1="189" y1="178" x2="205" y2="194" stroke="#e2a846" stroke-width="2" />
              <line x1="205" y1="178" x2="189" y2="194" stroke="#e2a846" stroke-width="2" />
            </g>
          </g>
        </svg>
        <div
          class="mt-1 shrink-0 text-center text-sm"
          :class="palmToViewer ? 'text-sky-200' : 'text-slate-400'"
        >
          {{ step >= 2 ? palmText : "左手" }}
        </div>
      </div>
    </div>

    <!-- 步骤横条 -->
    <div class="mt-1 flex shrink-0 justify-center gap-3 text-sm">
      <span
        class="px-3 py-1 rounded-full"
        :class="step >= 1 ? 'bg-amber-400/15 text-amber-300' : 'text-slate-500'"
        >① 找等效电流方向</span
      >
      <span
        class="px-3 py-1 rounded-full"
        :class="step >= 2 ? 'bg-amber-400/15 text-amber-300' : 'text-slate-500'"
        >② 磁感线穿掌心</span
      >
      <span
        class="px-3 py-1 rounded-full"
        :class="step >= 3 ? 'bg-teal-400/15 text-teal-300' : 'text-slate-500'"
        >③ 拇指即 <Latex tex="F_{\text{洛}}"
      /></span>
    </div>
  </div>
</template>
