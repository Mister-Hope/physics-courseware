<!--
  CourseSlider —— 全库统一的**滑块控件**（原生 `input[type=range]` + `accent-color`）

  ## 为什么要有它

  滑块是全库最常用的交互件（十几门课、每门 1～7 个），但过去每门课都自己写一套
  `::-webkit-slider-thumb` / `::-moz-range-track`：滑块头 13 / 14 / 18 / 24px、轨道 4～10px、"金/蓝/渐变"各写一遍，
  于是同一套课件里出现"滑块头比轨道高出一大截""深色背景上一条亮轨道"这类比例与配色失调，
  还要同时维护 Chromium 与 Firefox 两份伪元素样式。

  这个组件**不自己画轨道与滑块**：交给浏览器原生渲染，只用 `accent-color` 上主题色 ——
  轨道与滑块的比例由浏览器保证，永远不会失调；键盘、触摸、无障碍行为也是原生的。
  组件负责的是**行版式**（标签 + 滑块 + 读数）与**主题色档位**，让全库的滑块长得一样。

  ## 用法

  纯中文标签 + LaTeX 量符号；`sign` 让非负值显示成 +0.50：

  `<CourseSlider v-model="kx" :min="-1.5" :max="2.5" :step="0.05" label="向右分量" label-tex="v_x" sign />`

  读数要完全自定义（单位 / 区间 / 分式）就用 `#value` 插槽（标签同理有 `#label` 插槽）：

  `<CourseSlider v-model="pull" :min="0" :max="6" :step="0.1" label="拉力">`
  `  <template #value>{{ pull.toFixed(1) }}<Latex tex="\text{ N}" /></template>`
  `</CourseSlider>`

  ⛔ 课件里**不要再写** `::-webkit-slider-thumb` / `::-moz-range-thumb` / `::-*-slider-runnable-track`
  （`pnpm style:audit` 会点名提醒）；要调颜色用 `accent`、标签列宽用 `label-width`、窄面板用 `layout="tight"`。
  **课程保留自己的版式时**（读数在滑块上方一行、说明文字在滑块上方、外面还套了带边框的盒子……）：
  只把 `<input type="range">` 换成它并加 `layout="bare"` —— 轨道与滑块统一了，课程自己的排版一行都不用改；
  也不要用课内 `:deep(.cs-*)` 去改共享组件。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  modelValue,
  min = 0,
  max = 100,
  step = 1,
  label = "",
  labelTex = "",
  labelWidth = "",
  accent = "gold",
  layout = "row",
  sign = false,
  disabled = false,
  ariaLabel = "",
} = defineProps<{
  /** 当前值（配合 `v-model` 使用） */
  modelValue: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 纯文本标签（中文），与 `labelTex` 可同时给：先中文后公式 */
  label?: string;
  /** LaTeX 标签（量符号，如 `v_x`、`\dfrac{r}{R}`） */
  labelTex?: string;
  /** 标签列宽（CSS 长度；不写 = 8.8rem，够放"向右分量 vx"这类四字 + 一个符号） */
  labelWidth?: string;
  /** 主题色档位：金（默认）/ 蓝 / 青 / 红 */
  accent?: "gold" | "blue" | "teal" | "red";
  /** 版式：`row` 标准三格 / `tight` 紧凑（单元格本来就窄）/ `bare` 只画滑块（课程自己把标签与读数摆在滑块上方或旁边） */
  layout?: "row" | "tight" | "bare";
  /** 读数是否给非负值加 `+` 号（速度分量这类有符号量用） */
  sign?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 无障碍名称；不写则取 `label` / `labelTex`（`layout="bare"` 时尤其建议给） */
  ariaLabel?: string;
}>();

const emit = defineEmits<{
  /** V-model 更新 */
  "update:modelValue": [value: number];
}>();

/** 读数小数位：按 step 推断有效小数位（0.05 → 2 位、0.5 → 1 位、1 → 0 位） */
const digits = computed(() => {
  const text = String(step);
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
});

/** 读数文本：`sign` 时非负值补 `+`（⚠️ 响应式解构出来的 props 是「值」不是 ref，别再写 `.value`） */
const display = computed(() => {
  const fixed = modelValue.toFixed(digits.value);
  return sign && modelValue >= 0 ? `+${fixed}` : fixed;
});

/**
 * 原生 input 的 input 事件 → 抛数字给 v-model
 *
 * @param event 原生事件
 */
const onInput = (event: Event): void => {
  emit("update:modelValue", Number((event.target as HTMLInputElement).value));
};
</script>

<template>
  <div class="cs-row" :class="[`cs-accent-${accent}`, layout === 'tight' ? 'cs-row-tight' : '']">
    <!-- `bare` 只画滑块；标准/紧凑档里没给标签（含 #label 插槽）也不占那一列 -->
    <span
      v-if="layout !== 'bare' && (label || labelTex || $slots.label)"
      class="cs-label text-lg"
      :style="labelWidth ? { width: labelWidth } : undefined"
    >
      <slot name="label">
        <span v-if="label">{{ label }}</span>
        <Latex v-if="labelTex" :tex="labelTex" />
      </slot>
    </span>

    <input
      class="cs-input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || label || labelTex || '滑块'"
      @input="onInput"
    />

    <!-- `bare` 不画读数：课程自己把"名字 + 读数"摆在滑块上方那一行 -->
    <span v-if="layout !== 'bare'" class="cs-value text-xl">
      <slot name="value">{{ display }}</slot>
    </span>
  </div>
</template>

<style scoped>
/* 一行三格：标签（固定列宽）＋ 滑块（吃满剩余宽度）＋ 读数（右对齐等宽数字） */
.cs-row {
  display: flex;
  flex: 1 1 auto;
  gap: 1.25rem;
  align-items: center;

  min-width: 0;

  user-select: none;
}

.cs-label {
  display: flex;
  flex: 0 0 auto;
  gap: 0.4rem;
  align-items: baseline;

  width: 8.8rem;

  color: var(--c-text-dim);

  font-weight: 500;
}

/* ⚠️ 这里**刻意不写** ::-webkit-slider-thumb / ::-moz-range-*：轨道与滑块交给浏览器原生画，
   比例天然协调；`accent-color` 把滑块与已填充的一段轨道染成主题色。
   `color-scheme: dark` 让原生控件按深色背景出图（否则浅色轨道会在深色页面上发亮）。 */
.cs-input {
  flex: 1 1 auto;

  min-width: 0;
  height: 2rem;
  margin: 0;

  cursor: pointer;

  accent-color: var(--c-accent);

  color-scheme: dark;
}

.cs-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* 读数列：**最小** 5rem（保证多行读数右对齐、列宽一致），内容更长时随内容变宽 ——
   `F_1 = 4.0\ \text{N}` 这类带算式的读数不该被折行、更不该让课程用 :deep 去改列宽。 */
.cs-value {
  flex: 0 0 auto;

  width: auto;
  min-width: 5rem;

  color: var(--c-text);

  font-weight: 600;
  font-family: "JetBrains Mono", monospace;
  text-align: right;
  white-space: nowrap;
}

/* ── 紧凑档（`layout="tight"`）：面板单元格本来就窄（2×2 网格、半栏小卡片）时用 ──
   三格列宽与行高各收一档，轨道才不会被挤到只剩十几像素。
   字号小于 .text-lg 阶梯（阶梯带 !important），所以这里必须同样 !important 才压得住。 */
.cs-row-tight {
  gap: 0.55rem;
}

.cs-row-tight .cs-label,
.cs-row-tight .cs-value {
  font-size: 1rem !important;
  line-height: 1.2;
}

.cs-row-tight .cs-value {
  min-width: 2.4rem;
}

.cs-row-tight .cs-input {
  height: 1.3rem;
}

/* 主题色档位（其余颜色一律走 token，别再写死） */
.cs-accent-blue {
  --cs-accent: var(--c-accent-2);
}

.cs-accent-teal {
  --cs-accent: var(--c-physics);
}

.cs-accent-red {
  --cs-accent: var(--c-danger);
}
</style>
