<!--
  方向判定练习精修版 (DirectionPracticeBeautified.vue)
  —— 对应教材"练习与应用"第 2 题：
     4 个场景对应 Slidev 幻灯片的 4 次点击（step: 0 -> 1 -> 2 -> 3 -> 4）：
       step >= 1: 第 1 题揭晓 F_洛 向下（质子水平向右，B 垂直纸面向外 ⊙）
       step >= 2: 第 2 题揭晓 F_洛 向上（电子水平向右，B 垂直纸面向外 ⊙）
       step >= 3: 第 3 题揭晓 F_洛 向左（电子竖直向上，B 垂直纸面向外 ⊙）
       step >= 4: 第 4 题揭晓 F_洛 向右（电子竖直向上，B 垂直纸面向里 ⊗）
     严格遵从 Slidev 纯净课件组件规范：
       - 不内置任何多余工具栏、进度条、切换按钮等控件；
       - 纯由 props.step (0~4) 外部驱动；
       - 4 题网格直观大方，字号适合远屏视认，力矢量与角标清晰规范。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 幻灯片点击步数：0=全部未揭晓，1~~4=依次揭晓第1~~4题答案 */
  step?: number;
}>();

interface Scenario {
  key: number;
  title: string;
  particleName: string;
  particleType: string;
  q: number; // +1 或 -1
  vx: number;
  vy: number;
  Bz: number; // +1(⊙) 或 -1(⊗)
  desc: string;
}

const scenarios: Scenario[] = [
  {
    key: 1,
    title: "质子水平向右",
    particleName: "质子",
    particleType: "正电荷",
    q: 1,
    vx: 1,
    vy: 0,
    Bz: 1,
    desc: "v 水平向右 · B 垂直纸面向外 ⊙",
  },
  {
    key: 2,
    title: "电子水平向右",
    particleName: "电子",
    particleType: "负电荷",
    q: -1,
    vx: 1,
    vy: 0,
    Bz: 1,
    desc: "v 水平向右 · B 垂直纸面向外 ⊙",
  },
  {
    key: 3,
    title: "电子竖直向上",
    particleName: "电子",
    particleType: "负电荷",
    q: -1,
    vx: 0,
    vy: 1,
    Bz: 1,
    desc: "v 竖直向上 · B 垂直纸面向外 ⊙",
  },
  {
    key: 4,
    title: "电子竖直向上",
    particleName: "电子",
    particleType: "负电荷",
    q: -1,
    vx: 0,
    vy: 1,
    Bz: -1,
    desc: "v 竖直向上 · B 垂直纸面向里 ⊗",
  },
];

/** 真实物理计算：F = q·(v × B)；v=(vx,vy,0)、B=(0,0,Bz) → v×B=(vy·Bz, −vx·Bz, 0) */
const answers = scenarios.map((s) => ({
  fx: s.q * s.vy * s.Bz,
  fy: -s.q * s.vx * s.Bz,
}));

const dirWord = (a: { fx: number; fy: number }): string => {
  if (a.fy < 0) return "向下";
  if (a.fy > 0) return "向上";
  if (a.fx < 0) return "向左";
  return "向右";
};

/** 统一的作用点（v 与 F 共同起笔中心） */
const PX = 140;
const PY = 100;
const ARROW_LEN = 68;

/**
 * 答案 F_洛 箭头终点 (与真实物理方向严格一一对应)
 *
 * @param a 洛伦兹力的两个分量
 * @returns 箭头终点坐标
 */
const tipOf = (a: { fx: number; fy: number }): { x: number; y: number } => {
  if (a.fx !== 0) {
    return {
      x: a.fx > 0 ? PX + ARROW_LEN : PX - ARROW_LEN,
      y: PY,
    };
  }
  return {
    x: PX,
    y: a.fy > 0 ? PY - ARROW_LEN : PY + ARROW_LEN,
  };
};

/**
 * 答案方向词与 F_洛 标注的排版落点
 *
 * @param a 洛伦兹力的两个分量
 * @returns 文字坐标与对齐方式
 */
const wordAt = (a: { fx: number; fy: number }): { x: number; y: number; anchor: string } => {
  if (a.fx > 0) return { x: PX + ARROW_LEN - 8, y: PY + 28, anchor: "middle" };

  if (a.fx < 0) return { x: PX - ARROW_LEN + 8, y: PY + 28, anchor: "middle" };

  if (a.fy > 0) return { x: PX - 16, y: PY - ARROW_LEN / 2, anchor: "end" };

  return { x: PX - 16, y: PY + ARROW_LEN / 2 + 6, anchor: "end" };
};
</script>

<template>
  <div class="flex flex-col w-full text-slate-200 select-none">
    <!-- 4 卡片网格（2×2 纯净展示） -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(s, idx) in scenarios"
        :key="s.key"
        class="flex flex-col rounded-xl border border-slate-800 bg-[#0c1020] p-4 overflow-hidden shadow-lg"
      >
        <!-- 卡片标题栏 -->
        <div
          class="flex items-center justify-between text-sm pb-2.5 border-b border-slate-800/80 mb-2.5"
        >
          <div class="flex items-center gap-2">
            <span class="font-bold text-amber-400 text-base">第 {{ idx + 1 }} 题</span>
            <span
              class="px-2 py-0.5 rounded text-xs font-semibold"
              :class="
                s.q > 0
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              "
            >
              {{ s.particleName }} ({{ s.particleType }})
            </span>
          </div>
          <span class="text-slate-400 text-xs font-mono">{{ s.desc }}</span>
        </div>

        <!-- 场景 SVG 画布 -->
        <div
          class="relative w-full rounded-lg overflow-hidden bg-slate-950/70 border border-slate-900"
        >
          <svg viewBox="0 0 280 200" class="w-full h-auto block">
            <defs>
              <filter :id="`glow-p-${idx}`" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- 磁场背景网格符号 (4行×5列，分布均匀) -->
            <g>
              <g v-for="row in [32, 76, 124, 168]" :key="'r-' + row">
                <g v-for="col in [34, 88, 140, 192, 246]" :key="'c-' + col + '-' + row">
                  <template v-if="s.Bz === 1">
                    <!-- ⊙ 穿出纸面 -->
                    <circle
                      :cx="col"
                      :cy="row"
                      r="8"
                      fill="none"
                      stroke="rgba(226,168,70,0.3)"
                      stroke-width="1.2"
                    />
                    <circle :cx="col" :cy="row" r="2.2" fill="rgba(226,168,70,0.65)" />
                  </template>
                  <template v-else>
                    <!-- ⊗ 穿入纸面 -->
                    <circle
                      :cx="col"
                      :cy="row"
                      r="8"
                      fill="none"
                      stroke="rgba(226,168,70,0.3)"
                      stroke-width="1.2"
                    />
                    <line
                      :x1="col - 4.5"
                      :y1="row - 4.5"
                      :x2="col + 4.5"
                      :y2="row + 4.5"
                      stroke="rgba(226,168,70,0.6)"
                      stroke-width="1.2"
                    />
                    <line
                      :x1="col + 4.5"
                      :y1="row - 4.5"
                      :x2="col - 4.5"
                      :y2="row + 4.5"
                      stroke="rgba(226,168,70,0.6)"
                      stroke-width="1.2"
                    />
                  </template>
                </g>
              </g>
            </g>

            <!-- 磁场角标标注 B -->
            <g transform="translate(244, 28)">
              <text
                x="0"
                y="0"
                font-size="16"
                fill="#e2a846"
                font-family="KaTeX_Math, 'Times New Roman', serif"
                font-style="italic"
                font-weight="bold"
              >
                B
              </text>
              <text x="15" y="-1" font-size="12" fill="rgba(226,168,70,0.85)">
                {{ s.Bz === 1 ? "⊙" : "⊗" }}
              </text>
            </g>

            <!-- 速度矢量 v (从中心 PX, PY 起笔，鲜明青蓝色) -->
            <CourseArrow
              :from="{ x: PX, y: PY }"
              :to="{ x: PX + s.vx * ARROW_LEN, y: PY - s.vy * ARROW_LEN }"
              stroke="#38bdf8"
              :stroke-width="3.2"
            />
            <!-- 速度标注 v -->
            <text
              :x="s.vx > 0 ? PX + ARROW_LEN + 14 : PX + 12"
              :y="s.vy > 0 ? PY - ARROW_LEN - 8 : PY - 8"
              text-anchor="middle"
              font-size="18"
              font-style="italic"
              font-family="KaTeX_Math, 'Times New Roman', serif"
              fill="#38bdf8"
              font-weight="bold"
            >
              v
            </text>

            <!-- 洛伦兹力 F_洛 (step >= idx + 1 才绘制，红色粗箭头) -->
            <template v-if="step >= idx + 1">
              <!-- 红色力矢量箭头 -->
              <CourseArrow
                :from="{ x: PX, y: PY }"
                :to="tipOf(answers[idx])"
                stroke="#ef4444"
                :stroke-width="3.6"
              />

              <!-- 力矢量标签：标准排版 F_洛 + 方向文字 -->
              <text
                :x="wordAt(answers[idx]).x"
                :y="wordAt(answers[idx]).y"
                :text-anchor="wordAt(answers[idx]).anchor"
                fill="#ef4444"
                font-weight="bold"
              >
                <tspan
                  font-family="KaTeX_Math, 'Times New Roman', serif"
                  font-style="italic"
                  font-size="18"
                >
                  F
                </tspan>
                <tspan dy="4" font-size="11" font-weight="normal">洛</tspan>
                <tspan dy="-4" font-size="15">{{ dirWord(answers[idx]) }}</tspan>
              </text>
            </template>

            <!-- 未揭晓提示 -->
            <template v-else>
              <text
                :x="PX - (s.vx > 0 ? 32 : -32)"
                :y="PY + (s.vy > 0 ? 32 : -18)"
                text-anchor="middle"
                font-size="14"
                fill="#64748b"
              >
                <tspan
                  font-family="KaTeX_Math, 'Times New Roman', serif"
                  font-style="italic"
                  font-size="16"
                >
                  F
                </tspan>
                <tspan dy="4" font-size="11">洛</tspan>
                <tspan dy="-4">= ?</tspan>
              </text>
            </template>

            <!-- 中心带电粒子 (覆盖在线段起笔处，层次分明) -->
            <g :filter="`url(#glow-p-${idx})`">
              <circle
                :cx="PX"
                :cy="PY"
                r="12"
                :fill="s.q > 0 ? '#ef4444' : '#0284c7'"
                stroke="#ffffff"
                stroke-width="1.8"
              />
              <text
                :x="PX"
                :y="PY + 4.5"
                text-anchor="middle"
                font-size="14"
                font-weight="bold"
                fill="#ffffff"
                font-family="sans-serif"
              >
                {{ s.q > 0 ? "+" : "−" }}
              </text>
            </g>
          </svg>
        </div>

        <!-- 卡片底部答案揭晓条 -->
        <div
          class="mt-2.5 pt-2 border-t border-slate-800/80 text-xs flex items-center justify-between"
        >
          <span class="text-slate-400">
            电荷：<strong :class="s.q > 0 ? 'text-red-400' : 'text-sky-400'">{{
              s.particleName
            }}</strong>
            ({{ s.particleType }})
          </span>
          <span
            class="px-2.5 py-0.5 rounded text-xs font-bold transition-all"
            :class="
              step >= idx + 1
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-800/60 text-slate-500'
            "
          >
            {{ step >= idx + 1 ? "答案：" + dirWord(answers[idx]) : "未揭晓" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
