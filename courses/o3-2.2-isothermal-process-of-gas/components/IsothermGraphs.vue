<!-- 等温线图像：mode="pv" 画 p-V 双曲线；mode="pinv" 画 p-1/V 过原点直线 -->
<script setup lang="ts">
import { computed } from "vue";

const {
  mode = "pv",
  showPoints = true,
  showFit = true,
  showHigher = false,
} = defineProps<{
  mode?: "pv" | "pinv";
  /** 显示实验数据点 */
  showPoints?: boolean;
  /** 显示拟合曲线（等温线 / 直线） */
  showFit?: boolean;
  /** P-V 模式下并排画两条不同温度的等温线 */
  showHigher?: boolean;
}>();

/** 实验数据：V/mL 与对应的 p/kPa，pV ≈ 2.0×10³ kPa·mL */
const data = [
  { v: 20, p: 100 },
  { v: 16, p: 125 },
  { v: 12, p: 167 },
  { v: 10, p: 200 },
  { v: 8, p: 250 },
];

interface IsoCurve {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  dashed?: boolean;
}

const isPv = computed(() => mode === "pv");

/** 等温线 p = C/V 的采样点（只保留画得下的部分） */
const isoPoints = (c: number): { x: number; y: number }[] => {
  const pts: { x: number; y: number }[] = [];
  for (let v = 5; v <= 23.5; v += 0.25) if (c / v <= 292) pts.push({ x: v, y: c / v });
  return pts;
};

const curves = computed<IsoCurve[]>(() => {
  if (!showFit) return [];
  if (!isPv.value) {
    return [
      {
        points: [
          { x: 0, y: 0 },
          { x: 0.13, y: 260 },
        ],
        color: "#e2a846",
        width: 2.8,
      },
    ];
  }
  const list: IsoCurve[] = [
    { points: isoPoints(showHigher ? 1600 : 2000), color: "#e2a846", width: 2.8 },
  ];
  if (showHigher)
    list.push({ points: isoPoints(2600), color: "#60a5fa", width: 2.8, dashed: true });
  return list;
});

interface IsoLabel {
  x: number;
  y: number;
  tex?: string;
  dot?: boolean;
  color?: string;
}

const labels = computed<IsoLabel[]>(() => {
  const list: IsoLabel[] = [];
  if (showPoints)
    for (const d of data) list.push({ x: isPv.value ? d.v : 1 / d.v, y: d.p, dot: true });
  if (showHigher) {
    list.push(
      { x: 12.6, y: 118, tex: "T_1", color: "#e2a846" },
      { x: 18.6, y: 158, tex: "T_2", color: "#60a5fa" },
    );
  }
  return list;
});

const xRange = computed<[number, number]>(() => (isPv.value ? [0, 24] : [0, 0.13]));
const yRange: [number, number] = [0, 292];
const xAxis = computed(() =>
  isPv.value
    ? { quantity: "V", unit: "mL", side: "below" }
    : { quantity: "1/V", unit: "mL", sup: "-1", side: "below" },
);
const ticks = computed(() =>
  isPv.value ? { x: [5, 10, 15, 20], y: [100, 200] } : { x: [0.05, 0.1], y: [100, 200] },
);
</script>

<template>
  <CoordAxes
    :x-range="xRange"
    :y-range="yRange"
    :x-axis="xAxis"
    :y-axis="{ quantity: 'p', unit: 'kPa' }"
    :curves="curves"
    :labels="labels"
    :ticks="ticks"
    :view="{ width: 470, height: 320 }"
  />
</template>
