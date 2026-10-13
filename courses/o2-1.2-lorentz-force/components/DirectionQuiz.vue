<!--
  方向判定练习（对应教材"练习与应用"第 2 题风格）
  —— 4 个场景：质子 / 电子、v 向右 / 向上、B ⊙ / ⊗，求 F_洛 方向。
     题干（电荷、v、B、问号）常显；点击逐步出答案（step >= i+1 才画 F 箭头与方向词）。
     F_洛 方向 = q·(v × B)，由组件 computed 真实计算（v 在纸面内、B 沿 z 轴）。
  版面：四个场景都从同一个"作用点"出发画 v，力也从这个点起笔，避免旧版
        "电荷符号飘在一角、F 箭头不知道从哪儿长出来"；√ 号占位不顶跑已有元素。
  意图：覆盖四种答案方向（下 / 上 / 左 / 右），其中第 2 题即板书演示的"电子 v 右 B⊙ → F 向上"。
  待细化方向：答案箭头加出现动画、错误点选判分。
-->
<script setup>
const { step = 0 } = defineProps({
  step: { type: Number, default: 0 },
});

/** 场景配置：q=±1，v 方向（纸面内），Bz=±1（穿纸面） */
const scenarios = [
  { key: 1, q: 1, vx: 1, vy: 0, Bz: 1 }, // 质子 v 向右 B⊙ → F 向下
  { key: 2, q: -1, vx: 1, vy: 0, Bz: 1 }, // 电子 v 向右 B⊙ → F 向上（板书情景）
  { key: 3, q: -1, vx: 0, vy: 1, Bz: 1 }, // 电子 v 向上 B⊙ → F 向左
  { key: 4, q: -1, vx: 0, vy: 1, Bz: -1 }, // 电子 v 向上 B⊗ → F 向右
];

/** 真实计算：F = q·(v × B)；v=(vx,vy,0)、B=(0,0,Bz) → v×B=(vy·Bz, −vx·Bz, 0) */
const answers = scenarios.map((s) => ({
  fx: s.q * s.vy * s.Bz,
  fy: -s.q * s.vx * s.Bz,
}));

const dirWord = (a) => {
  if (a.fy < 0) return "向下";
  if (a.fy > 0) return "向上";
  if (a.fx < 0) return "向左";
  return "向右";
};

/** 作用点（v 与 F 共同起笔处） */
const PX = 120;
const PY = 82;

/**
 * 答案箭头终点
 *
 * @param a 答案对象（fx / fy 分量）
 * @returns 箭头终点坐标（viewBox 用户单位）
 */
const tipOf = (a) =>
  a.fx === 0 ? { x: PX, y: a.fy > 0 ? 26 : 138 } : { x: a.fx > 0 ? 252 : 24, y: PY };

/**
 * 答案方向词的落点（不同朝向给不同的空位，避开 v 箭头与"F_洛 = ?"）
 *
 * @param a 答案对象（fx / fy 分量）
 * @returns 落点坐标与文字锚点
 */
const wordAt = (a) => {
  if (a.fx > 0) return { x: 222, y: 112, anchor: "middle" };
  if (a.fx < 0) return { x: 54, y: 112, anchor: "middle" };
  return { x: 104, y: a.fy > 0 ? 32 : 134, anchor: "end" };
};
</script>

<template>
  <div class="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-4">
    <svg
      v-for="(s, i) in scenarios"
      :key="s.key"
      viewBox="0 0 300 150"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full rounded-xl border border-slate-700/60 bg-slate-900/30"
    >
      <!-- 题干常显：B 符号（⊙ / ⊗）+ 标签 -->
      <g v-if="s.Bz > 0">
        <circle cx="252" cy="34" r="13" fill="none" stroke="#e2a846" stroke-width="2.4" />
        <circle cx="252" cy="34" r="3.2" fill="#e2a846" />
      </g>
      <g v-else>
        <circle cx="252" cy="34" r="13" fill="none" stroke="#e2a846" stroke-width="2.4" />
        <line x1="242" y1="24" x2="262" y2="44" stroke="#e2a846" stroke-width="2.2" />
        <line x1="262" y1="24" x2="242" y2="44" stroke="#e2a846" stroke-width="2.2" />
      </g>
      <text
        x="252"
        y="64"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#e2a846"
      >
        B
      </text>

      <!-- 题干常显：电荷（作用点上的圆盘 + 符号） -->
      <circle
        :cx="PX"
        :cy="PY"
        r="13"
        fill="rgba(15,23,42,0.9)"
        :stroke="s.q > 0 ? '#f87171' : '#60a5fa'"
        stroke-width="2.4"
      />
      <text
        :x="PX"
        :y="PY + 8"
        text-anchor="middle"
        :fill="s.q > 0 ? '#f87171' : '#60a5fa'"
        font-size="20"
      >
        {{ s.q > 0 ? "+" : "−" }}
      </text>
      <text
        x="100"
        y="64"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        :fill="s.q > 0 ? '#f87171' : '#60a5fa'"
      >
        {{ s.q > 0 ? "p" : "e" }}
        <tspan dy="3" font-size="12">{{ s.q > 0 ? "+" : "−" }}</tspan>
      </text>

      <!-- 题干常显：v 箭头（向右 / 向上） -->
      <CourseArrow
        v-if="s.vx > 0"
        :from="{ x: PX + 14, y: PY }"
        :to="{ x: 246, y: PY }"
        stroke="#60a5fa"
        stroke-width="4"
      />
      <CourseArrow
        v-else
        :from="{ x: PX, y: PY - 14 }"
        :to="{ x: PX, y: 20 }"
        stroke="#60a5fa"
        stroke-width="4"
      />
      <text
        v-if="s.vx > 0"
        x="258"
        y="88"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#60a5fa"
      >
        v
      </text>
      <text
        v-else
        x="136"
        y="26"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="#60a5fa"
      >
        v
      </text>

      <!-- 题干常显：F_洛 = ? -->
      <text x="240" y="140" text-anchor="middle" font-size="15" fill="#94a3b8">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-size="10">洛</tspan>
        <tspan>= ?</tspan>
      </text>

      <!-- 答案（step >= i+1 才出）：F 箭头 + 方向词 -->
      <g v-if="step >= i + 1">
        <CourseArrow
          :from="{ x: PX, y: PY }"
          :to="tipOf(answers[i])"
          stroke="#2dd4bf"
          stroke-width="4.4"
        />
        <text
          :x="wordAt(answers[i]).x"
          :y="wordAt(answers[i]).y"
          :text-anchor="wordAt(answers[i]).anchor"
          font-size="17"
          fill="#2dd4bf"
          font-weight="700"
        >
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan font-size="10">洛</tspan>
          <tspan>{{ dirWord(answers[i]) }}</tspan>
        </text>
      </g>

      <!-- 角标：题号 -->
      <text x="16" y="26" font-size="15" fill="#64748b">{{ "①②③④"[i] }}</text>
    </svg>
  </div>
</template>
