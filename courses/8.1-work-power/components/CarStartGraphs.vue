<script setup lang="ts">
import { computed } from "vue";

/**
 * 第二课时「恒定功率启动」的六幅图像（`kind` 选一种）。 模型假设：**阻力严格恒定**（题给条件 F_阻 = f₀），这是机车启动题的标准设定；
 * 真实车辆的风阻另有一页定性辨析，两套模型不混用。
 *
 * 归一化取值（只决定形状，刻度数字一律不标）：P = 1、f₀ = 0.25、m = 0.1（⇒ 初加速度 a₀ = 7.5）， v_max = P/f₀ = 4。 P–t ：一启动就保持额定功率
 * ⇒ 水平线 F–v ：F = P/v ⇒ 双曲线，v → v_max 时 F → f₀ F–(1/v)：F = P·(1/v) ⇒ 过原点的直线（与阻力大小无关，任何模型都成立） a–t ：a
 * = (P/v − f₀)/m，v 增大 ⇒ a 减小；t → ∞ 时 a → 0 v–t ：斜率渐小、渐近于 v_max a–(1/v)：a = (P/m)·(1/v) − f₀/m ⇒
 * 直线，横截距 1/v = f₀/P
 */
const { kind = "v-t" } = defineProps<{
  /** 要画哪一种图像 */
  kind?: "P-t" | "F-v" | "F-inv-v" | "a-t" | "v-t" | "a-inv-v";
}>();

const P = 1;
const F0 = 0.25;
const M = 0.1;
const V_MAX = P / F0; // 4

/** V(t)：dv/dt = (P/v − f₀)/m，从 v₀ = 0.05 起逐小步积分 */
const vCurve = ((): { x: number; y: number }[] => {
  const DT = 0.004;
  const out: { x: number; y: number }[] = [];
  let v = 0.05;
  let t = 0;
  for (let i = 0; i < 2600; i += 1) {
    if (i % 8 === 0) out.push({ x: Number(t.toFixed(3)), y: Number(v.toFixed(3)) });
    v += ((P / v - F0) / M) * DT;
    t += DT;
  }
  return out;
})();

const config = computed(() => {
  switch (kind) {
    case "P-t": {
      return {
        xRange: [0, 10] as [number, number],
        yRange: [0, 1.6] as [number, number],
        xAxis: { quantity: "t" },
        yAxis: { quantity: "P" },
        curves: [
          {
            points: [
              { x: 0, y: P },
              { x: 10, y: P },
            ],
            color: "var(--c-accent)",
            width: 3.2,
          },
        ],
        labels: [
          {
            x: 6.4,
            y: P + 0.22,
            tex: String.raw`P = P_{\text{额}}`,
            anchor: "bottom-left" as const,
            size: 18,
            color: "var(--c-accent)",
            halo: true,
          },
        ],
      };
    }
    case "F-v": {
      const pts = Array.from({ length: 100 }, (_, i) => {
        const v = 0.34 + (4.6 - 0.34) * (i / 99);
        return { x: Number(v.toFixed(4)), y: Number((P / v).toFixed(4)) };
      });
      return {
        xRange: [0, 4.8] as [number, number],
        yRange: [0, 3.2] as [number, number],
        xAxis: { quantity: "v" },
        yAxis: { quantity: "F" },
        curves: [
          { points: pts, color: "var(--c-accent)", width: 3.2 },
          {
            points: [
              { x: 0, y: F0 },
              { x: 4.8, y: F0 },
            ],
            color: "var(--c-danger)",
            width: 2,
            dashed: "7 5",
          },
        ],
        labels: [
          {
            x: 0.5,
            y: P / 0.5 + 0.3,
            tex: String.raw`F = \frac{P}{v}`,
            anchor: "left" as const,
            size: 18,
            color: "var(--c-accent)",
            halo: true,
          },
          {
            x: 3.3,
            y: F0 - 0.26,
            tex: "f_0",
            anchor: "bottom-left" as const,
            size: 18,
            color: "var(--c-danger)",
            halo: true,
          },
          { x: V_MAX, y: F0, dot: 5, color: "var(--c-ok)" },
          {
            x: V_MAX,
            y: F0 + 0.36,
            tex: String.raw`v_{\max}`,
            anchor: "bottom-right" as const,
            size: 17,
            color: "var(--c-ok)",
            halo: true,
          },
        ],
      };
    }
    case "F-inv-v": {
      const pts = Array.from({ length: 60 }, (_, i) => {
        const iv = 0.21 + (1 / 0.34 - 0.21) * (i / 59);
        return { x: Number(iv.toFixed(4)), y: Number((P * iv).toFixed(4)) };
      });
      return {
        xRange: [0, 3.2] as [number, number],
        yRange: [0, 3.4] as [number, number],
        xAxis: { quantity: "1/v" },
        yAxis: { quantity: "F" },
        curves: [
          { points: pts, color: "var(--c-accent)", width: 3.2 },
          {
            points: [
              { x: 0, y: F0 },
              { x: 3.2, y: F0 },
            ],
            color: "var(--c-danger)",
            width: 2,
            dashed: "7 5",
          },
        ],
        labels: [
          {
            x: 1.7,
            y: P * 1.7 + 0.34,
            tex: String.raw`F = P\cdot\frac{1}{v}`,
            anchor: "left" as const,
            size: 18,
            color: "var(--c-accent)",
            halo: true,
          },
          {
            x: 2.2,
            y: F0 - 0.26,
            tex: "f_0",
            anchor: "bottom-left" as const,
            size: 18,
            color: "var(--c-danger)",
            halo: true,
          },
        ],
      };
    }
    case "a-t": {
      const pts = vCurve
        .filter((_, i) => i % 3 === 0)
        .map((p) => ({ x: p.x, y: Number(((P / p.y - F0) / M).toFixed(3)) }))
        .filter((p) => p.y <= 8.6);
      return {
        xRange: [0, 10.4] as [number, number],
        yRange: [0, 8.6] as [number, number],
        xAxis: { quantity: "t" },
        yAxis: { quantity: "a" },
        curves: [{ points: pts, color: "var(--c-accent)", width: 3.2 }],
        labels: [
          {
            x: 6.2,
            y: 1.5,
            tex: String.raw`a \to 0`,
            anchor: "bottom-left" as const,
            size: 18,
            color: "var(--c-accent)",
            halo: true,
          },
        ],
      };
    }
    case "v-t": {
      return {
        xRange: [0, 10.4] as [number, number],
        yRange: [0, 4.6] as [number, number],
        xAxis: { quantity: "t" },
        yAxis: { quantity: "v" },
        curves: [
          { points: vCurve, color: "var(--c-accent)", width: 3.2 },
          {
            points: [
              { x: 0, y: V_MAX },
              { x: 10.4, y: V_MAX },
            ],
            color: "var(--c-ok)",
            width: 2,
            dashed: "7 5",
          },
        ],
        labels: [
          {
            x: 7.2,
            y: V_MAX - 0.34,
            tex: String.raw`v_{\max} = \frac{P}{f_0}`,
            anchor: "bottom-right" as const,
            size: 17,
            color: "var(--c-ok)",
            halo: true,
          },
        ],
      };
    }
    default: {
      const pts = vCurve
        .filter((_, i) => i % 3 === 0)
        .map((p) => ({
          x: Number((1 / p.y).toFixed(3)),
          y: Number(((P / p.y - F0) / M).toFixed(3)),
        }))
        .filter((p) => p.y <= 8 && p.x <= 1.04)
        .sort((a, b) => a.x - b.x);
      const negIntercept = -F0 / M; // 负截距 −f₀/m
      return {
        xRange: [0, 1.06] as [number, number],
        yRange: [negIntercept * 1.18, 8.2] as [number, number],
        xAxis: { quantity: "1/v" },
        yAxis: { quantity: "a" },
        curves: [
          { points: pts, color: "var(--c-accent)", width: 3.2 },
          {
            points: [
              { x: 0, y: Number(negIntercept.toFixed(3)) },
              { x: F0 / P, y: 0 },
            ],
            color: "var(--c-accent)",
            width: 2.2,
            dashed: "7 5",
            opacity: 0.8,
          },
        ],
        labels: [
          {
            x: 0.42,
            y: 7.6,
            tex: String.raw`a = \frac{P}{m}\cdot\frac{1}{v} - \frac{f_0}{m}`,
            anchor: "left" as const,
            size: 17,
            color: "var(--c-accent)",
            halo: true,
          },
          {
            x: F0 / P,
            y: 0,
            tex: String.raw`\frac{f_0}{P}`,
            anchor: "top-right" as const,
            size: 16,
            color: "var(--c-ok)",
            halo: true,
            dot: 4.5,
          },
          {
            x: 0,
            y: Number(negIntercept.toFixed(3)),
            tex: String.raw`-\frac{f_0}{m}`,
            anchor: "right" as const,
            size: 16,
            color: "var(--c-danger)",
            halo: true,
            dot: 4.5,
          },
        ],
      };
    }
  }
});
</script>

<template>
  <CoordAxes
    :x-range="config.xRange"
    :y-range="config.yRange"
    :x-axis="config.xAxis"
    :y-axis="config.yAxis"
    :ticks="{ labels: false }"
    :curves="config.curves"
    :labels="config.labels"
    :view="{ width: 500, height: 420 }"
  />
</template>
