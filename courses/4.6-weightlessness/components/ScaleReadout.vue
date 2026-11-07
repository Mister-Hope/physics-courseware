<script setup lang="ts">
import { computed } from "vue";

/**
 * 七段数码管读数（火柴棍数字）
 *
 * 用在电子秤的读数窗里：两门秤（电梯里的平台秤、木球实验里的秤）共用。
 * 只画「7 根火柴棍」：上、右上、右下、下、左下、左上、中。
 * 没点亮的段用极低透明度画出来，像真实的 LED 屏那样隐约可见。
 *
 * 注意：这是 SVG 片段的组件，必须写在 `<svg>` 里面。
 */
const props = withDefaults(
  defineProps<{
    /** 要显示的读数，如 "11.36"；小数点用 "." */
    value: string;
    /** 以 `centerX` 居中时用；不传则从 x 开始排 */
    centerX?: number;
    x?: number;
    /** 数字顶部（局部坐标，单位与父 svg 的用户单位一致） */
    y?: number;
    /** 数字高度 */
    height?: number;
    color?: string;
    /** 已点亮的段用的 filter id（不带 url()） */
    glow?: string;
    /** 右侧单位小字，如 "g" */
    unit?: string;
  }>(),
  { centerX: 30, x: 0, y: 0, height: 24, color: "#ff3b30", glow: "", unit: "" },
);

/** 段序号：0 上、1 右上、2 右下、3 下、4 左下、5 左上、6 中 */
const MAP: Record<string, number[]> = {
  "0": [0, 1, 2, 3, 4, 5],
  "1": [1, 2],
  "2": [0, 1, 6, 4, 3],
  "3": [0, 1, 6, 2, 3],
  "4": [5, 6, 1, 2],
  "5": [0, 5, 6, 2, 3],
  "6": [0, 5, 6, 4, 2, 3],
  "7": [0, 1, 2],
  "8": [0, 1, 2, 3, 4, 5, 6],
  "9": [0, 1, 2, 3, 5, 6],
  "-": [6],
};

const H = computed(() => props.height);
const T = computed(() => H.value * 0.13);
const W = computed(() => H.value * 0.58);
const GAP = computed(() => H.value * 0.2);
const DOT = computed(() => H.value * 0.26);

/** 字符布局：每个字符的左上角 x（局部坐标） */
const glyphs = computed(() => {
  let cursor = 0;
  return [...props.value].map((ch) => {
    const isDot = ch === ".";
    const item = { ch, x: cursor, isDot };
    cursor += isDot ? DOT.value : W.value + GAP.value;
    return item;
  });
});

const totalWidth = computed(() => {
  if (glyphs.value.length === 0) return 0;
  return glyphs.value[glyphs.value.length - 1]!.x + (glyphs.value[glyphs.value.length - 1]!.isDot ? DOT.value : W.value);
});

const originX = computed(() => props.centerX - totalWidth.value / 2);

/**
 * 7 根火柴棍（局部坐标：以数字左上角为原点）。
 * 中间那根（g）两端都收成尖角；其余 6 根「外侧」保留完整直角、两端各切一个向内 45° 三角，
 * 相邻两根的切角彼此平行，所以 7 根拼起来严丝合缝、就是经典 LED 数码管的样子。
 */
function bars(gx: number) {
  const h = H.value;
  const t = T.value;
  const w = W.value;
  const c = t / 2; // 45° 切角的大小
  const half = h / 2;
  const gy = half - t / 2; // 中间那根的顶边

  const poly = (points: number[][]): string =>
    `M ${points.map(([px, py]) => `${gx + px} ${py}`).join(" L ")} Z`;

  return [
    // 0 上：外沿（上）完整，两端向内斜切
    { i: 0, d: poly([[0, 0], [w, 0], [w - c, t], [c, t]]) },
    // 1 右上：外沿（右）完整
    { i: 1, d: poly([[w, 0], [w, half], [w - t, half - c], [w - t, c]]) },
    // 2 右下：外沿（右）完整
    { i: 2, d: poly([[w, h], [w - t, h - c], [w - t, half + c], [w, half]]) },
    // 3 下：外沿（下）完整
    { i: 3, d: poly([[0, h], [c, h - t], [w - c, h - t], [w, h]]) },
    // 4 左下：外沿（左）完整
    { i: 4, d: poly([[0, h], [0, half], [t, half + c], [t, h - c]]) },
    // 5 左上：外沿（左）完整
    { i: 5, d: poly([[0, 0], [t, c], [t, half - c], [0, half]]) },
    // 6 中：两端都是尖角（四个角都切掉）
    { i: 6, d: poly([[c, gy], [w - c, gy], [w, gy + c], [w - c, gy + t], [c, gy + t], [0, gy + c]]) },
  ];
}
</script>

<template>
  <g :transform="`translate(${originX}, ${props.y})`">
    <g v-for="(glyph, gi) in glyphs" :key="`g-${gi}`">
      <circle
        v-if="glyph.isDot"
        :cx="glyph.x + DOT / 2"
        :cy="H - T * 0.9"
        :r="T * 0.72"
        :fill="props.color"
        :filter="props.glow ? `url(#${props.glow})` : undefined"
      />
      <template v-else>
        <!-- 未点亮的段：淡到几乎看不见，像真实 LED 屏 -->
        <path
          v-for="bar in bars(glyph.x)"
          :key="`dim-${gi}-${bar.i}`"
          :d="bar.d"
          :fill="props.color"
          :opacity="0.045"
        />
        <!-- 点亮的段 -->
        <g :filter="props.glow ? `url(#${props.glow})` : undefined">
          <path
            v-for="bar in bars(glyph.x).filter((item) => (MAP[glyph.ch] ?? []).includes(item.i))"
            :key="`lit-${gi}-${bar.i}`"
            :d="bar.d"
            :fill="props.color"
          />
        </g>
      </template>
    </g>

    <text
      v-if="props.unit"
      :x="totalWidth + H * 0.3"
      :y="H * 0.92"
      :font-size="H * 0.5"
      font-family="KaTeX_Main, ui-serif, serif"
      :fill="props.color"
      opacity="0.75"
    >{{ props.unit }}</text>
  </g>
</template>
