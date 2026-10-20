<script setup lang="ts">
/**
 * 复杂电路 → 等效电路 的变形动画（两个变体）。
 *
 * 分步（v1 三步、v2 两步）： ① 标色：把接在同一对等电势点上的导线用同一种颜色标出来（v1）； ② 初步变形：元件先被"掰"到终点位置（平移到新位置、绕自身中心转到新方向）； ③ 规范化：导线折点再各自到位，拉成横平竖直的等效电路。 全程导线只变形、不重新连接：每根导线的两端始终咬在同一个节点 /
 * 元件端子上，节点本身也在插值。
 */
import { computed, onBeforeUnmount, ref, watch } from "vue";

type Pt = [number, number];
type Kind = "r" | "bulb" | "meter" | "battery" | "switch";

interface CompDef {
  kind: Kind;
  at: Pt;
  /** 0 = 水平，90 = 竖直，180 = 水平但两头对调 */
  rot: number;
}

interface Scene {
  comps: Record<string, CompDef>;
  nodes: Record<string, Pt>;
}

interface WireDef {
  /** 折点引用：`@名字` 取节点，`元件:l` / `元件:r` 取元件两端 */
  refs: string[];
  /** 接在哪个等电势节点上（同一条导线连起来的点同电势），用于第一步标色 */
  group?: 1 | 2 | 3 | 4;
}

interface Variant {
  viewBox: string;
  w: number;
  h: number;
  from: Scene;
  to: Scene;
  wires: WireDef[];
  labels: Record<string, [string, string]>;
  /** 第一步是否先按等电势节点标色 */
  colorize?: boolean;
  /** 运动分几段（1 = 一次到位；2 = 初步变形 → 规范化） */
  motionStages?: 1 | 2;
}

/** 元件两端到中心点的距离（与共享组件几何一致）；电阻取 21 让导线略咬进去，端点不会看着脱开 */
const HALF: Record<Kind, number> = { r: 21, bulb: 12, meter: 16, battery: 8, switch: 20 };
const GROUP_COLOR: Record<1 | 2 | 3 | 4, string> = {
  1: "#60a5fa",
  2: "#e2a846",
  3: "#a78bfa",
  4: "#34d399",
};

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (t: number): number => Math.min(1, Math.max(0, t));

const lerpScene = (a: Scene, b: Scene, t: number): Scene => {
  const comps: Record<string, CompDef> = {};
  for (const id of Object.keys(a.comps)) {
    const ca = a.comps[id];
    const cb = b.comps[id] ?? ca;
    comps[id] = {
      kind: ca.kind,
      at: [lerp(ca.at[0], cb.at[0], t), lerp(ca.at[1], cb.at[1], t)],
      rot: lerp(ca.rot, cb.rot, t),
    };
  }
  const nodes: Record<string, Pt> = {};
  for (const key of Object.keys(a.nodes)) {
    const pa = a.nodes[key];
    const pb = b.nodes[key] ?? pa;
    nodes[key] = [lerp(pa[0], pb[0], t), lerp(pa[1], pb[1], t)];
  }
  return { comps, nodes };
};

const VARIANTS: Record<"v1" | "v2", Variant> = {
  // ── 变体 1：A≡C（一根导线）、B≡D（理想电流表）⇒ R₁∥R₂ 串电流表，再与 R₃ 并联，最后串 R₄ ──
  // 目标态不新增、不删除任何一段导线：A–C 那根导线弯成左侧竖直轨，电流表留在右侧竖直段上。
  v1: {
    viewBox: "0 0 800 340",
    w: 800,
    h: 340,
    colorize: true,
    motionStages: 2,
    from: {
      nodes: {
        lead: [60, 150],
        A: [130, 150],
        B: [290, 150],
        C: [450, 150],
        D: [600, 150],
        E: [760, 150],
        kt1: [130, 84],
        kt2: [450, 84],
        m1: [290, 244],
        m2: [600, 244],
        p2: [153, 150],
        p3: [257, 150],
        p4: [313, 150],
        p5: [417, 150],
        p6: [473, 150],
        p7: [572, 150],
        p8: [623, 150],
        p9: [722, 150],
      },
      comps: {
        R1: { kind: "r", at: [200, 150], rot: 0 },
        R2: { kind: "r", at: [360, 150], rot: 0 },
        R3: { kind: "r", at: [520, 150], rot: 0 },
        R4: { kind: "r", at: [670, 150], rot: 0 },
        M: { kind: "meter", at: [445, 244], rot: 0 },
      },
    },
    to: {
      nodes: {
        lead: [40, 90],
        A: [140, 90],
        B: [560, 160],
        C: [140, 160],
        D: [560, 300],
        E: [740, 300],
        kt1: [140, 113],
        kt2: [140, 137],
        m1: [560, 182],
        m2: [560, 268],
        p2: [268, 90],
        p3: [560, 90],
        p4: [502, 160],
        p5: [268, 160],
        p6: [140, 300],
        p7: [502, 300],
        p8: [598, 300],
        p9: [712, 300],
      },
      comps: {
        R1: { kind: "r", at: [420, 90], rot: 0 },
        R2: { kind: "r", at: [420, 160], rot: 180 },
        R3: { kind: "r", at: [420, 300], rot: 0 },
        R4: { kind: "r", at: [660, 300], rot: 0 },
        M: { kind: "meter", at: [560, 220], rot: 90 },
      },
    },
    wires: [
      { refs: ["@lead", "@A"] },
      { refs: ["@A", "@p2", "R1:l"], group: 1 },
      { refs: ["R1:r", "@p3", "@B"], group: 2 },
      { refs: ["@B", "@p4", "R2:l"], group: 2 },
      { refs: ["R2:r", "@p5", "@C"], group: 1 },
      { refs: ["@C", "@p6", "R3:l"], group: 1 },
      { refs: ["R3:r", "@p7", "@D"], group: 2 },
      { refs: ["@D", "@p8", "R4:l"], group: 2 },
      { refs: ["R4:r", "@p9", "@E"] },
      { refs: ["@A", "@kt1", "@kt2", "@C"], group: 1 },
      { refs: ["@B", "@m1", "M:l"], group: 2 },
      { refs: ["M:r", "@m2", "@D"], group: 2 },
    ],
    labels: { R1: ["R", "1"], R2: ["R", "2"], R3: ["R", "3"], R4: ["R", "4"] },
  },

  // ── 变体 2：(R₁∥L₁) 用一根导线接到 (R₂∥R₃)，再串 R₄；L₂ 与右半整体并联；电池接两端 ──
  v2: {
    viewBox: "0 0 760 380",
    w: 760,
    h: 380,
    colorize: true,
    motionStages: 1,
    from: {
      nodes: {
        c1: [80, 60],
        t2: [300, 60],
        c2: [350, 60],
        t3: [560, 60],
        t4: [700, 60],
        c4: [80, 160],
        r1: [80, 180],
        c5: [130, 180],
        c6: [250, 180],
        r2: [300, 180],
        r3: [560, 180],
        c8: [700, 180],
        r4: [700, 180],
        b1: [80, 320],
        b2: [700, 320],
        c9: [560, 80],
        n9: [560, 60],
        c10: [560, 160],
        n10: [560, 180],
        n11: [700, 180],
      },
      comps: {
        R1: { kind: "r", at: [80, 120], rot: 90 },
        L1: { kind: "bulb", at: [190, 180], rot: 0 },
        R2: { kind: "r", at: [430, 60], rot: 0 },
        R3: { kind: "r", at: [560, 120], rot: 90 },
        L2: { kind: "bulb", at: [630, 180], rot: 0 },
        R4: { kind: "r", at: [700, 120], rot: 90 },
        BAT: { kind: "battery", at: [220, 320], rot: 0 },
        SW: { kind: "switch", at: [400, 320], rot: 0 },
      },
    },
    to: {
      nodes: {
        c1: [250, 66],
        t2: [250, 86],
        c2: [250, 66],
        t3: [520, 66],
        t4: [560, 66],
        c4: [60, 66],
        r1: [60, 110],
        c5: [60, 170],
        c6: [250, 170],
        r2: [250, 150],
        r3: [250, 270],
        c8: [700, 270],
        r4: [700, 66],
        b1: [60, 330],
        b2: [700, 330],
        c9: [520, 190],
        n9: [520, 66],
        c10: [340, 190],
        n10: [340, 66],
        n11: [700, 66],
      },
      comps: {
        R1: { kind: "r", at: [170, 66], rot: 180 },
        L1: { kind: "bulb", at: [170, 170], rot: 0 },
        R2: { kind: "r", at: [430, 66], rot: 0 },
        R3: { kind: "r", at: [430, 190], rot: 180 },
        L2: { kind: "bulb", at: [450, 270], rot: 0 },
        R4: { kind: "r", at: [620, 66], rot: 0 },
        BAT: { kind: "battery", at: [220, 330], rot: 0 },
        SW: { kind: "switch", at: [400, 330], rot: 0 },
      },
    },
    wires: [
      { refs: ["R1:l", "@c1", "@t2"], group: 2 },
      { refs: ["@t2", "@c2", "R2:l"], group: 2 },
      { refs: ["R2:r", "@t3", "@t4", "R4:l"], group: 3 },
      { refs: ["R1:r", "@c4", "@r1"], group: 1 },
      { refs: ["@r1", "@c5", "L1:l"], group: 1 },
      { refs: ["L1:r", "@c6", "@r2"], group: 2 },
      { refs: ["@r2", "@r3", "L2:l"], group: 2 },
      { refs: ["L2:r", "@c8", "@b2"], group: 4 },
      { refs: ["R3:l", "@c9", "@n9"], group: 3 },
      { refs: ["R3:r", "@c10", "@n10"], group: 2 },
      { refs: ["R4:r", "@n11"], group: 4 },
      { refs: ["@t2", "@r2"], group: 2 },
      { refs: ["@r1", "@b1", "BAT:l"], group: 1 },
      { refs: ["BAT:r", "SW:l"] },
      { refs: ["SW:r", "@b2", "@r4"], group: 4 },
    ],
    labels: { R1: ["R", "1"], R2: ["R", "2"], R3: ["R", "3"], R4: ["R", "4"], L1: ["L", "1"], L2: ["L", "2"] },
  },
};

const { variant, step = 0 } = defineProps<{
  /** V1 = 示例 1，v2 = 例题 2 */
  variant: "v1" | "v2";
  /** 点击步数 */
  step?: number;
}>();

const v = computed(() => VARIANTS[variant]);

/** 运动段数：v1 分两段（初步变形 / 规范化），v2 一段走完 */
const SEGMENTS = computed(() => v.value.motionStages ?? 1);

/** 中间态 = 整帧统一插值到一半（元件与折点一起走，导线才不会拧成锯齿） */
const mid = computed<Scene>(() => lerpScene(v.value.from, v.value.to, 0.5));

const qTarget = computed(() => {
  const s = step;
  return Math.min(SEGMENTS.value, Math.max(0, s - 1));
});

const highlighted = computed(() => Boolean(v.value.colorize) && step >= 1);

const q = ref(qTarget.value);
let raf = 0;

watch(qTarget, (target) => {
  const start = q.value;
  if (start === target) return;
  const t0 = performance.now();
  const duration = 700 * Math.abs(target - start);
  cancelAnimationFrame(raf);
  const tick = (now: number): void => {
    const k = Math.min(1, (now - t0) / duration);
    q.value = lerp(start, target, k);
    if (k < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));

const frame = computed(() => {
  if (SEGMENTS.value === 1) return lerpScene(v.value.from, v.value.to, easeInOut(clamp01(q.value)));
  if (q.value <= 1) return lerpScene(v.value.from, mid.value, easeInOut(clamp01(q.value)));
  return lerpScene(mid.value, v.value.to, easeInOut(clamp01(q.value - 1)));
});

const resolveRef = (refKey: string): Pt => {
  if (refKey.startsWith("@")) return frame.value.nodes[refKey.slice(1)];
  const [id, side] = refKey.split(":");
  const c = frame.value.comps[id];
  const rad = (c.rot * Math.PI) / 180;
  const dx = Math.cos(rad) * HALF[c.kind];
  const dy = Math.sin(rad) * HALF[c.kind];
  return side === "l" ? [c.at[0] - dx, c.at[1] - dy] : [c.at[0] + dx, c.at[1] + dy];
};

const wires = computed(() =>
  v.value.wires.map((wire) => {
    const pts = wire.refs.map(resolveRef);
    const on = highlighted.value && wire.group;
    return {
      d: pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`).join(" "),
      stroke: on ? GROUP_COLOR[wire.group as 1 | 2] : "var(--c-text)",
      width: on ? 2.4 : 1.6,
    };
  }),
);

const comps = computed(() => Object.entries(frame.value.comps));

const labelAt = (at: Pt, rot: number): Pt => {
  const rad = (rot * Math.PI) / 180;
  return [at[0] + Math.sin(rad) * 17, at[1] - Math.cos(rad) * 17 + 6];
};
</script>

<template>
  <div class="figure">
    <svg :viewBox="v.viewBox" :width="v.w" :height="v.h" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-linecap="round">
        <path v-for="(wire, i) in wires" :key="i" :d="wire.d" :stroke="wire.stroke" :stroke-width="wire.width" />
      </g>
      <g v-for="[id, c] in comps" :key="id">
        <g :transform="`translate(${c.at[0]} ${c.at[1]}) rotate(${c.rot})`">
          <CircuitResistor v-if="c.kind === 'r'" :x="0" :y="0" />
          <CircuitBulb v-else-if="c.kind === 'bulb'" :x="0" :y="0" />
          <CircuitMeter v-else-if="c.kind === 'meter'" :x="0" :y="0" kind="a" />
          <CircuitBattery v-else-if="c.kind === 'battery'" :x="0" :y="0" />
          <CircuitSwitch v-else-if="c.kind === 'switch'" :x="0" :y="0" />
        </g>
        <text v-if="v.labels[id]" :x="labelAt(c.at, c.rot)[0]" :y="labelAt(c.at, c.rot)[1]" text-anchor="middle" font-size="19" fill="var(--c-text)">
          <tspan font-family="KaTeX_Math" font-style="italic">{{ v.labels[id][0] }}</tspan>
          <tspan font-family="KaTeX_Main" font-size="14" dy="5">{{ v.labels[id][1] }}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
