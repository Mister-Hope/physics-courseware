<script setup lang="ts">
// “第几秒内 / 前几秒 / 第几秒初末”辨析用的时间轴（第 5、6 页共用）
// segments 模式：第 1 s 内（0–1）、第 2 s 内（1–2）两段区间标在轴上方，前 2 s（0–2）标在轴下方
// moments 模式：第 1 s 初（t=0）、第 1 s 末 ＝ 第 2 s 初（t=1 s）、第 2 s 末 ＝ 第 3 s 初（t=2 s）三个时刻点
defineProps<{ mode: "segments" | "moments" }>();
</script>

<template>
  <NumberAxis
    :range="[0, 3.4]"
    :axis="{ quantity: 't', unit: 's' }"
    :ticks="{ step: 1 }"
    :view="{ width: 640, height: 140 }"
  >
    <template #overlay="{ x, axisY, px2user }">
      <!-- 区间（segments）：上方两段“第几秒内”，下方一段“前 2 s” -->
      <template v-if="mode === 'segments'">
        <g
          :stroke-width="9 * px2user"
          stroke-linecap="round"
          opacity="0.85"
        >
          <line
            :x1="x(0)"
            :y1="axisY - 26 * px2user"
            :x2="x(1)"
            :y2="axisY - 26 * px2user"
            stroke="var(--c-accent)"
          />
          <line
            :x1="x(1)"
            :y1="axisY - 26 * px2user"
            :x2="x(2)"
            :y2="axisY - 26 * px2user"
            stroke="var(--c-accent-2)"
          />
          <circle
            :cx="x(0)"
            :cy="axisY - 26 * px2user"
            :r="5 * px2user"
            fill="var(--c-accent)"
            stroke="var(--c-text)"
            :stroke-width="1.6 * px2user"
          />
          <circle
            :cx="x(1)"
            :cy="axisY - 26 * px2user"
            :r="5 * px2user"
            fill="var(--c-accent-2)"
            stroke="var(--c-text)"
            :stroke-width="1.6 * px2user"
          />
          <circle
            :cx="x(0)"
            :cy="axisY + 38 * px2user"
            :r="5 * px2user"
            fill="#34d399"
            stroke="var(--c-text)"
            :stroke-width="1.6 * px2user"
          />
          <circle
            :cx="x(2)"
            :cy="axisY + 38 * px2user"
            :r="5 * px2user"
            fill="#34d399"
            stroke="var(--c-text)"
            :stroke-width="1.6 * px2user"
          />
        </g>

        <!-- 轴下方第二层：前 2 s -->
        <line
          :x1="x(0)"
          :y1="axisY + 38 * px2user"
          :x2="x(2)"
          :y2="axisY + 38 * px2user"
          stroke="#34d399"
          :stroke-width="7 * px2user"
          stroke-linecap="round"
          opacity="0.85"
        />
        <text
          :x="x(1)"
          :y="axisY + 58 * px2user"
          text-anchor="middle"
          :font-size="15 * px2user"
          font-weight="700"
          fill="#34d399"
        >
          <tspan>前 </tspan><tspan font-family="KaTeX_Main">2 s</tspan>
        </text>

        <!-- 第一层两段的标注文字 -->
        <text
          :x="x(0.5)"
          :y="axisY - 44 * px2user"
          text-anchor="middle"
          :font-size="15 * px2user"
          font-weight="700"
          fill="var(--c-accent)"
        >
          <tspan>第 </tspan><tspan font-family="KaTeX_Main">1 s</tspan><tspan> 内</tspan>
        </text>
        <text
          :x="x(1.5)"
          :y="axisY - 44 * px2user"
          text-anchor="middle"
          :font-size="15 * px2user"
          font-weight="700"
          fill="var(--c-accent-2)"
        >
          <tspan>第 </tspan><tspan font-family="KaTeX_Main">2 s</tspan><tspan> 内</tspan>
        </text>
      </template>

      <!-- 时刻（moments）：三个整秒时刻点 + 上方标注 -->
      <template v-else>
        <g :stroke-width="1.8 * px2user">
          <line
            :x1="x(0)"
            :y1="axisY"
            :x2="x(0)"
            :y2="axisY - 24 * px2user"
            stroke="var(--c-accent)"
            :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
          />
          <line
            :x1="x(1)"
            :y1="axisY"
            :x2="x(1)"
            :y2="axisY - 24 * px2user"
            stroke="var(--c-accent-2)"
            :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
          />
          <line
            :x1="x(2)"
            :y1="axisY"
            :x2="x(2)"
            :y2="axisY - 24 * px2user"
            stroke="var(--c-accent-2)"
            :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
          />
        </g>

        <circle
          :cx="x(0)"
          :cy="axisY"
          :r="6 * px2user"
          fill="var(--c-accent)"
          stroke="var(--c-accent-glow)"
          :stroke-width="2 * px2user"
        />
        <circle
          :cx="x(1)"
          :cy="axisY"
          :r="6 * px2user"
          fill="var(--c-accent-2)"
          stroke="var(--c-accent-glow)"
          :stroke-width="2 * px2user"
        />
        <circle
          :cx="x(2)"
          :cy="axisY"
          :r="6 * px2user"
          fill="var(--c-accent-2)"
          stroke="var(--c-accent-glow)"
          :stroke-width="2 * px2user"
        />

        <text
          :x="x(0) + 10 * px2user"
          :y="axisY - 30 * px2user"
          text-anchor="start"
          :font-size="15 * px2user"
          font-weight="700"
          fill="var(--c-accent)"
        >
          <tspan>第 </tspan><tspan font-family="KaTeX_Main">1 s</tspan><tspan> 初（开始计时）</tspan>
        </text>
        <text
          :x="x(1)"
          :y="axisY - 30 * px2user"
          text-anchor="middle"
          :font-size="15 * px2user"
          font-weight="700"
          fill="var(--c-accent-2)"
        >
          <tspan>第 </tspan><tspan font-family="KaTeX_Main">1 s</tspan><tspan> 末 ＝ 第 </tspan><tspan font-family="KaTeX_Main">2 s</tspan><tspan> 初</tspan>
        </text>
        <text
          :x="x(2)"
          :y="axisY - 30 * px2user"
          text-anchor="middle"
          :font-size="15 * px2user"
          font-weight="700"
          fill="var(--c-accent-2)"
        >
          <tspan>第 </tspan><tspan font-family="KaTeX_Main">2 s</tspan><tspan> 末 ＝ 第 </tspan><tspan font-family="KaTeX_Main">3 s</tspan><tspan> 初</tspan>
        </text>
      </template>
    </template>
  </NumberAxis>
</template>