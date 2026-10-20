<script setup lang="ts">
/**
 * 练习页（课堂小结之前）：两根材料相同的均匀导体柱 m（长 l）、n（长 2l）串联的示意图（甲）， 以及沿 x 轴方向的电势变化图（乙）。 题目数据：φ(0) = 10 V、φ(l) = 4
 * V、φ(3l) = 0 V ⇒ 两段电压 6 V : 4 V ⇒ R_m : R_n = 3 : 2 ⇒ S_m : S_n = (l/R_m) : (2l/R_n) = 1 : 3（答案
 * A）。
 */
const phiCurve = {
  points: [
    { x: 0, y: 10 },
    { x: 1, y: 4 },
    { x: 3, y: 0 },
  ],
  color: "var(--c-accent-2)",
  width: 3,
};

const labels = [
  { x: 0, y: 10, tex: "10", anchor: "left" },
  { x: 0, y: 4, tex: "4", anchor: "left" },
  { x: 0.45, y: 8.2, tex: "m", anchor: "left" },
  { x: 2.15, y: 1.5, tex: "n", anchor: "left" },
  { x: 1, y: 0, tex: "l", anchor: "center", dy: 16 },
  { x: 3, y: 0, tex: "3l", anchor: "center", dy: 16 },
];
</script>

<template>
  <div class="scp">
    <figure class="scp-item">
      <!-- 甲：两段导体柱串联（n 更粗），下方标 x 轴位置 -->
      <svg viewBox="0 0 340 52" role="img" aria-label="甲：导体柱 m、n 串联">
        <line x1="30" y1="40" x2="322" y2="40" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <path d="M 322 40 L 314 36 L 314 44 Z" fill="var(--c-text-dim)" />
        <line x1="30" y1="33" x2="30" y2="47" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="118" y1="35" x2="118" y2="45" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <line x1="206" y1="35" x2="206" y2="45" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <line x1="294" y1="35" x2="294" y2="45" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <rect
          x="30"
          y="10"
          width="88"
          height="10"
          rx="2"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          fill="rgba(96,165,250,0.10)"
        />
        <rect
          x="118"
          y="6"
          width="176"
          height="18"
          rx="2"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          fill="rgba(96,165,250,0.10)"
        />
        <text
          x="74"
          y="6"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text)"
        >
          m
        </text>
        <text
          x="206"
          y="20"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text)"
        >
          n
        </text>
        <text
          x="24"
          y="50"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text-dim)"
        >
          O
        </text>
        <text
          x="118"
          y="50"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text-dim)"
        >
          l
        </text>
        <text
          x="206"
          y="50"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text-dim)"
        >
          2l
        </text>
        <text
          x="294"
          y="50"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
          fill="var(--c-text-dim)"
        >
          3l
        </text>
      </svg>
      <figcaption>甲</figcaption>
    </figure>

    <figure class="scp-item">
      <!-- 乙：φ–x 图像（横轴 x、纵轴 φ），两段直线分别对应 m、n -->
      <CoordAxes
        :x-range="[0, 3.25]"
        :y-range="[0, 11]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'φ', unit: 'V' }"
        :curves="[phiCurve]"
        :labels="labels"
        :ticks="{ labels: false }"
        :font-scale="0.9"
        :view="{ width: 330, height: 172 }"
      />
      <figcaption>乙</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.scp {
  display: grid;
  gap: 0.15rem;

  width: 360px;
  min-width: 0;
}

.scp-item {
  margin: 0;
}

.scp-item figcaption {
  margin-top: 0.1rem;

  color: var(--c-text-dim);

  font-size: 0.85rem;
  text-align: center;
}
</style>
