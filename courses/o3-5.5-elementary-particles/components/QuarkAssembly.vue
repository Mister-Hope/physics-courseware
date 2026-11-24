<!-- 5.5 P11：强子由夸克组成——质子 = uud、中子 = udd；右侧的电荷代数和由 QUARKS 里的分数电荷真实算出，不是写死的 -->
<template>
  <svg viewBox="0 0 900 244" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g
      v-for="(row, index) in rows"
      :key="row.name"
      :visibility="step >= index + 1 ? 'visible' : 'hidden'"
    >
      <rect
        x="6"
        :y="row.top"
        width="868"
        height="104"
        rx="16"
        fill="var(--c-surface)"
        stroke="var(--c-border)"
        stroke-width="1"
      />
      <text x="34" :y="row.center + 8" font-size="22" font-weight="700" fill="var(--c-text)">
        {{ row.name }}
      </text>
      <g v-for="quark in row.quarks" :key="quark.cx">
        <circle
          :cx="quark.cx"
          :cy="row.center"
          r="27"
          :fill="quark.color"
          fill-opacity="0.16"
          :stroke="quark.color"
          stroke-width="1.6"
        />
        <text
          :x="quark.cx"
          :y="row.center + 8"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          :fill="quark.color"
        >
          {{ quark.sym }}
        </text>
        <text
          :x="quark.cx"
          :y="row.center + 47"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="14"
          fill="var(--c-text-dim)"
        >
          {{ quark.charge }}
        </text>
      </g>
      <text
        x="512"
        :y="row.center + 7"
        text-anchor="middle"
        font-size="20"
        fill="var(--c-text-dim)"
      >
        =
      </text>
      <g font-size="13" fill="var(--c-text-dim)">
        <text x="548" :y="row.center - 14">电荷相加（以元电荷计）</text>
      </g>
      <text
        x="548"
        :y="row.center + 16"
        font-family="KaTeX_Main"
        font-size="20"
        fill="var(--c-text)"
      >
        {{ row.expr }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
type QuarkKey = "u" | "d";

interface QuarkInfo {
  color: string;
  charge: number;
}

interface HadronSeed {
  name: string;
  keys: QuarkKey[];
  top: number;
}

interface QuarkCell {
  cx: number;
  sym: string;
  charge: string;
  color: string;
}

interface HadronRow extends HadronSeed {
  center: number;
  quarks: QuarkCell[];
  expr: string;
}

const { step = 0 } = defineProps<{ step?: number }>();

/** 6 种夸克里与质子、中子有关的两种：上夸克 u 带 +2/3，下夸克 d 带 −1/3（元电荷） */
const QUARKS: Record<QuarkKey, QuarkInfo> = {
  u: { color: "var(--c-accent)", charge: 2 / 3 },
  d: { color: "var(--c-accent-2)", charge: -1 / 3 },
};

/** 分数电荷写成 "2/3" / "1/3"（不带正负号） */
const chargeDigit = (charge: number): string =>
  Math.abs(Math.abs(charge) - 2 / 3) < 1e-9 ? "2/3" : "1/3";

/** 单个夸克的电荷，带正负号 */
const signedCharge = (charge: number): string => `${charge > 0 ? "+" : "−"}${chargeDigit(charge)}`;

/** 三个夸克的电荷代数和 = 强子的电荷（元电荷倍数） */
const totalCharge = (keys: QuarkKey[]): number =>
  keys.reduce((sum, key) => sum + QUARKS[key].charge, 0);

/** 电荷相加的算式：2/3 + 2/3 − 1/3 = +1 */
const chargeExpression = (keys: QuarkKey[]): string => {
  const terms = keys.map((key, index) => {
    const { charge } = QUARKS[key];

    if (index === 0) return chargeDigit(charge);

    return `${charge > 0 ? " + " : " − "}${chargeDigit(charge)}`;
  });
  const total = totalCharge(keys);

  return `${terms.join("")} = ${total > 0 ? "+" : total < 0 ? "−" : ""}${Math.abs(total)}`;
};

const seeds: HadronSeed[] = [
  { name: "质子", keys: ["u", "u", "d"], top: 6 },
  { name: "中子", keys: ["u", "d", "d"], top: 134 },
];

const rows: HadronRow[] = seeds.map((seed) => ({
  name: seed.name,
  keys: seed.keys,
  top: seed.top,
  center: seed.top + 52,
  quarks: seed.keys.map((key, index) => ({
    cx: 246 + index * 96,
    sym: key,
    charge: signedCharge(QUARKS[key].charge),
    color: QUARKS[key].color,
  })),
  expr: chargeExpression(seed.keys),
}));
</script>
