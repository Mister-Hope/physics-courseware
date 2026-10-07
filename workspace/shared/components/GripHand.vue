<script setup lang="ts">
import { computed } from "vue";

/**
 * 捏持/拉拽手部组件（**只能在 `<svg>` 里用**）。
 *
 * 造型采用侧视人体工学“食指勾环 + 拇指对捏 + 其余手指自然收拢 + 手腕袖口”的简明物理插画风格
 *
 * **锚点约定**：传入的 `(x, y)` 即为**拇指与食指捏合/勾住拉环的作用点**，无需在外部手动推算手掌偏移量：
 *
 * ```html
 * <!-- 手在右侧，捏住 (264, 115) 处的测力计吊环向右拉 -->
 * <GripHand :x="264" :y="115" side="right" />
 *
 * <!-- 手在左侧，捏住 (66, 65) 处的弹簧拉环向左拉 -->
 * <GripHand :x="66" :y="65" side="left" />
 * ```
 */
const {
  x = 0,
  y = 0,
  side = "right",
  scale = 1,
  color = "#e2a846",
  fill = "rgba(226,168,70,0.22)",
  cuffColor = "#94a3b8",
  cuffFill = "rgba(148,163,184,0.22)",
  flip = false,
} = defineProps<{
  /** 捏合作用点横坐标（食指与拇指夹住拉环/细绳的位置） */
  x?: number;
  /** 捏合作用点纵坐标 */
  y?: number;
  /** 手部所在的一侧（相对于捏合点 x, y 的屏幕方向） */
  side?: "right" | "left" | "above" | "below";
  /** 整体缩放比例（默认 1，总长约 42px） */
  scale?: number;
  /** 手部轮廓线颜色 */
  color?: string;
  /** 手部填充色（需保持无空格 rgba 以兼容 UnoCSS） */
  fill?: string;
  /** 袖口轮廓线颜色 */
  cuffColor?: string;
  /** 袖口填充色 */
  cuffFill?: string;
  /** 是否镜像翻转拇指与食指的上下朝向 */
  flip?: boolean;
}>();

/** 将局部坐标（以 (0,0) 为捏合点、向 +x 方向延伸的标准右手侧视图） 映射到目标 `(x, y)`、`side`、`scale` 与 `flip` */
const transformAttr = computed(() => {
  const scaleY = flip ? -scale : scale;

  if (side === "left") return `translate(${x}, ${y}) scale(${-scale}, ${scaleY})`;

  if (side === "above") return `translate(${x}, ${y}) rotate(-90) scale(${scale}, ${scaleY})`;

  if (side === "below") return `translate(${x}, ${y}) rotate(90) scale(${scale}, ${scaleY})`;

  return `translate(${x}, ${y}) scale(${scale}, ${scaleY})`;
});
</script>

<template>
  <g class="grip-hand" :transform="transformAttr" stroke-linecap="round" stroke-linejoin="round">
    <!-- 1. 掌下自然半握收拢的中指与无名指（赋予手掌真实剪影，避免机械感） -->
    <path
      d="M 8 3.5 C 7.5 8.2, 12.2 10.2, 16 8 C 16.8 10.6, 21.5 11, 25 7.8 L 25 3 Z"
      fill="#0f1425"
    />
    <path
      d="M 8 3.5 C 7.5 8.2, 12.2 10.2, 16 8 C 16.8 10.6, 21.5 11, 25 7.8"
      :fill="fill"
      :stroke="color"
      stroke-width="1.8"
    />

    <!-- 2. 手背、手掌主体与上方弯曲勾住拉环的食指 -->
    <!-- 先铺一层深色底遮挡内部重叠线条 -->
    <path
      d="M 31 -5.2 L 21 -8.8 C 14 -10.5, 6 -10.2, 0.5 -7.2 C -3.2 -5.2, -3.8 -0.2, -0.5 0.6 C 2 1.2, 3.8 -1, 3.2 -3.2 C 3 -4.2, 5.2 -4.8, 8.5 -4.2 L 12 3.8 L 24.5 7.6 L 31 5.8 Z"
      fill="#0f1425"
    />
    <path
      d="M 31 -5.2 L 21 -8.8 C 14 -10.5, 6 -10.2, 0.5 -7.2 C -3.2 -5.2, -3.8 -0.2, -0.5 0.6 C 2 1.2, 3.8 -1, 3.2 -3.2 C 3 -4.2, 5.2 -4.8, 8.5 -4.2 L 12 3.8 L 24.5 7.6 L 31 5.8 Z"
      :fill="fill"
      :stroke="color"
      stroke-width="2"
    />

    <!-- 3. 前景大拇指（从掌心向前上方伸出，与食指尖在 (0,0) 形成自然对捏） -->
    <path
      d="M 16.5 1.8 C 11.5 6.2, 4.5 6.4, -0.2 3.6 C -2.4 2.2, -2.2 -0.6, 0.4 -0.8 C 2.8 -1, 5.8 0.2, 8.8 0.8 C 11.2 1.2, 13.5 0.2, 15.5 -1"
      fill="#0f1425"
    />
    <path
      d="M 16.5 1.8 C 11.5 6.2, 4.5 6.4, -0.2 3.6 C -2.4 2.2, -2.2 -0.6, 0.4 -0.8 C 2.8 -1, 5.8 0.2, 8.8 0.8 C 11.2 1.2, 13.5 0.2, 15.5 -1"
      :fill="fill"
      :stroke="color"
      stroke-width="2"
    />

    <!-- 4. 手腕与衬衫袖口 -->
    <rect x="30" y="-6.8" width="11" height="13.8" rx="2.5" fill="#0f1425" />
    <rect
      x="30"
      y="-6.8"
      width="11"
      height="13.8"
      rx="2.5"
      :fill="cuffFill"
      :stroke="cuffColor"
      stroke-width="1.9"
    />
    <!-- 袖口纽扣点缀 -->
    <circle cx="34.5" cy="3.2" r="1.1" :fill="cuffColor" />
  </g>
</template>
