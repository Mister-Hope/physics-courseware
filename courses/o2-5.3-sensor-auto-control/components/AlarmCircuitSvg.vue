<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 4–6 页：门窗防盗报警装置电路（干簧管 SA + 继电器 K + LED + 蜂鸣器 H）
 *
 * 供电关系（关键）：电池正极经 S 后分成两路 ——
 *   ① 控制回路：干簧管 SA → 继电器线圈 K → 负极；
 *   ② 工作回路：动触点 c → a 或 b → LED（串 R）或蜂鸣器 → 负极。
 * 所以门一开、SA 断开，只是**控制回路**断电；报警支路本身仍接着电源，蜂鸣器才响得起来。
 *
 * - `state="idle"`   ：S 断开，系统未布防；门关着（SA 闭合），继电器释放（c 停在 b）
 * - `state="closed"` ：S 闭合，门关着 → SA 闭合 → 线圈 K 通电 → c 吸向 a → LED 亮、b 断开 → 蜂鸣器不响
 * - `state="open"`   ：S 闭合，门被打开 → 磁体离开 SA → 线圈断电 → c 弹回 b → 蜂鸣器响、LED 灭
 *
 * `highlight` 只给第 4 页"找传感器 / 执行装置"用：金色虚线框标出 SA 或继电器。
 */
const props = defineProps<{
  state?: "idle" | "closed" | "open";
  highlight?: "" | "sensor" | "actuator" | "both";
}>();

const st = computed(() => props.state ?? "idle");
const armed = computed(() => st.value !== "idle");
const saClosed = computed(() => st.value !== "open");
const coilOn = computed(() => st.value === "closed");
const ledOn = computed(() => st.value === "closed");
const buzzerOn = computed(() => st.value === "open");

/** 吸合时动触点 c 倒向常开 a，断电时弹回常闭 b */
const armTip = computed(() => (coilOn.value ? { x: 620, y: 80 } : { x: 620, y: 132 }));
const armPath = computed(() => `M 560 106 L ${armTip.value.x} ${armTip.value.y}`);

const showSensor = computed(
  () => props.highlight === "sensor" || props.highlight === "both",
);
const showActuator = computed(
  () => props.highlight === "actuator" || props.highlight === "both",
);
</script>

<template>
  <svg
    viewBox="0 0 860 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="门窗防盗报警装置电路图"
  >
    <!-- 通电回路高亮（画在元件下方） -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="st === 'closed'">
        <!-- 控制回路：S → SA → 线圈 K -->
        <path
          d="M 80 200 L 80 40 L 380 40 L 380 285 L 80 285 L 80 200"
          stroke="var(--c-accent)"
          stroke-width="8"
          opacity="0.16"
        />
        <!-- 工作回路：c → a → LED → 负极 -->
        <path
          d="M 130 40 L 130 12 L 560 12 L 560 106 L 620 80 L 790 80 L 790 285 L 380 285"
          stroke="var(--c-accent-2)"
          stroke-width="8"
          opacity="0.18"
        />
      </template>
      <template v-if="st === 'open'">
        <!-- 报警回路：c → b → 蜂鸣器 → 负极（SA 已断开，控制回路无电流） -->
        <path
          d="M 80 200 L 80 40 L 130 40 L 130 12 L 560 12 L 560 106 L 620 132 L 700 132 L 700 285 L 80 285 L 80 200"
          stroke="var(--c-accent)"
          stroke-width="8"
          opacity="0.16"
        />
      </template>
    </g>

    <!-- 导线 -->
    <g
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- 左竖轨：电池 + → 开关 S -->
      <path d="M 80 40 L 80 85 M 80 125 L 80 196" />
      <!-- 上轨：S → 干簧管 SA → 线圈 K -->
      <path d="M 80 40 L 170 40 M 260 40 L 380 40" />
      <!-- 线圈 K 的上下引线 -->
      <path d="M 380 40 L 380 120 M 380 184 L 380 285" />
      <!-- 工作回路从 S 后引出：接动触点 c -->
      <path d="M 130 40 L 130 12 L 560 12 L 560 106" />
      <!-- 触点 a / b 的引出线：a 走 LED，b 走蜂鸣器 -->
      <path d="M 620 80 L 790 80 L 790 152" />
      <path d="M 620 132 L 700 132 L 700 186" />
      <!-- LED 支路（LED 与 R 串联） -->
      <path d="M 790 176 L 790 205 M 790 253 L 790 285" />
      <!-- 蜂鸣器支路 -->
      <path d="M 700 224 L 700 285" />
      <!-- 下轨：回到电池 − -->
      <path d="M 80 285 L 790 285" />
      <path d="M 80 214 L 80 285" />
    </g>

    <!-- 节点（T 形连接处） -->
    <g fill="var(--c-text)">
      <circle cx="130" cy="40" r="3.6" />
      <circle cx="380" cy="285" r="3.6" />
      <circle cx="700" cy="285" r="3.6" />
    </g>

    <!-- 干簧管 SA（常开型，玻璃管内两片簧片） -->
    <rect
      x="170"
      y="18"
      width="90"
      height="44"
      rx="22"
      fill="var(--c-accent-2)"
      fill-opacity="0.05"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.5"
      stroke-width="1.6"
    />
    <polyline
      :points="saClosed ? '178,37 215,40' : '178,37 207,39'"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <polyline
      :points="saClosed ? '252,43 215,40' : '252,43 223,41'"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle v-if="saClosed" cx="215" cy="40" r="3.2" fill="var(--c-accent)" />
    <text
      x="215"
      y="84"
      text-anchor="middle"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      <tspan font-family="KaTeX_Math" font-style="italic">SA</tspan>
      <tspan>（干簧管）</tspan>
    </text>

    <!-- 开关 S -->
    <CircuitSwitch
      :x="80"
      :y="105"
      orientation="vertical"
      :open="!armed"
      label="S"
      :label-dx="8"
    />

    <!-- 电池 -->
    <CircuitBattery :x="80" :y="205" orientation="vertical" polarity emf="6 V" />

    <!-- 继电器：虚线框 + 线圈 K + 双掷触点 -->
    <rect
      x="344"
      y="48"
      width="332"
      height="190"
      rx="12"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.2"
      stroke-dasharray="7 6"
      opacity="0.7"
    />
    <rect
      v-if="coilOn"
      x="354"
      y="108"
      width="52"
      height="88"
      rx="10"
      fill="var(--c-accent)"
      opacity="0.1"
    />
    <rect
      x="364"
      y="120"
      width="32"
      height="64"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text)"
      stroke-width="1.6"
    />
    <text
      x="380"
      y="157"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="var(--c-text)"
    >
      K
    </text>
    <text x="336" y="100" text-anchor="end" font-size="16" fill="var(--c-text-dim)">
      继电器
    </text>

    <!-- 动触点臂 c 与常开 a / 常闭 b -->
    <path
      :d="armPath"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="3.2"
      stroke-linecap="round"
    />
    <circle cx="560" cy="106" r="4" fill="var(--c-text)" />
    <circle cx="620" cy="80" r="4" fill="var(--c-text)" />
    <circle cx="620" cy="132" r="4" fill="var(--c-text)" />
    <text
      x="548"
      y="99"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text-dim)"
    >
      c
    </text>
    <text x="620" y="68" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
      a（常开）
    </text>
    <text x="620" y="156" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
      b（常闭）
    </text>

    <!-- LED 与限流电阻 R（c—a 支路） -->
    <circle v-if="ledOn" cx="790" cy="164" r="27" fill="var(--c-accent)" opacity="0.12" />
    <path
      d="M 776 152 L 804 152 L 790 174 Z"
      fill="var(--c-accent-2)"
      fill-opacity="0.35"
      stroke="var(--c-accent-2)"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <line
      x1="776"
      y1="176"
      x2="804"
      y2="176"
      stroke="var(--c-accent-2)"
      stroke-width="1.8"
    />
    <text
      x="770"
      y="158"
      text-anchor="end"
      font-family="KaTeX_Main"
      font-size="16"
      fill="var(--c-text-dim)"
    >
      LED
    </text>
    <CircuitResistor :x="790" :y="229" orientation="vertical" />
    <text
      x="812"
      y="235"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text-dim)"
    >
      R
    </text>

    <!-- 蜂鸣器 H（c—b 支路） -->
    <circle v-if="buzzerOn" cx="700" cy="205" r="30" fill="var(--c-accent)" opacity="0.14" />
    <circle
      cx="700"
      cy="205"
      r="19"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text)"
      stroke-width="1.6"
    />
    <text
      x="700"
      y="211"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="18"
      fill="var(--c-text)"
    >
      H
    </text>
    <text x="724" y="250" text-anchor="start" font-size="15" fill="var(--c-text-dim)">
      蜂鸣器
    </text>
    <g
      v-if="buzzerOn"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M 724 194 A 15 15 0 0 1 724 216" />
      <path d="M 734 186 A 25 25 0 0 1 734 224" opacity="0.6" />
    </g>

    <!-- 电流方向 -->
    <g v-if="st === 'closed'">
      <CourseArrow
        :from="{ x: 268, y: 40 }"
        :to="{ x: 352, y: 40 }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 380, y: 64 }"
        :to="{ x: 380, y: 112 }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 200, y: 12 }"
        :to="{ x: 420, y: 12 }"
        stroke="var(--c-accent-2)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 790, y: 106 }"
        :to="{ x: 790, y: 144 }"
        stroke="var(--c-accent-2)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 790, y: 258 }"
        :to="{ x: 790, y: 282 }"
        stroke="var(--c-accent-2)"
        :stroke-width="1.8"
        opacity="0.9"
      />
    </g>
    <g v-if="st === 'open'">
      <CourseArrow
        :from="{ x: 200, y: 12 }"
        :to="{ x: 420, y: 12 }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 640, y: 132 }"
        :to="{ x: 690, y: 132 }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 700, y: 240 }"
        :to="{ x: 700, y: 282 }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        opacity="0.9"
      />
    </g>

    <!-- 第 4 页：标出传感器 / 执行装置 -->
    <rect
      v-if="showSensor"
      x="152"
      y="16"
      width="130"
      height="82"
      rx="12"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-dasharray="7 5"
      opacity="0.9"
    />
    <rect
      v-if="showActuator"
      x="336"
      y="42"
      width="348"
      height="216"
      rx="14"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-dasharray="7 5"
      opacity="0.9"
    />
  </svg>
</template>
