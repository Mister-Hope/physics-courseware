<!--
  第 4 页回放：磁体插入 / 抽出线圈，灵敏电流计指针跟着偏转。

  四种情况各有一个按钮，点一次重放一遍：
  - 指针偏角与磁体速度成正比（∝ |ΔΦ/Δt|），磁体一停，指针立刻回零——这正是要让学生看见的；
  - 线圈用共享 Solenoid（竖放、连续螺旋线，从下端看逆时针），电流方向画在前方导线上：
    甲、丁（俯视逆时针，B_i 向上）→ 前方电流向右；乙、丙（俯视顺时针，B_i 向下）→ 向左。
  - 接线与指针（灵敏电流计约定：电流从哪一侧接线柱流入，指针就向同一侧偏）：
    线圈上端（右侧）的引线接表盘右接线柱、下端（左侧）的引线接左接线柱；
    甲、丁的电流从上端流出 → 从右接线柱流入 → 指针右偏；
    乙、丙的电流从下端流出 → 从左接线柱流入 → 指针左偏（与第 2 页的实验现象一致）。
  磁体位移与速度都由真实运动学给出：位置走 smoothstep、速度取它对时间的导数，
  所以指针只在中间最快、两端为零。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

type CaseKey = "jia" | "yi" | "bing" | "ding";

interface CaseDef {
  /** 朝向线圈的磁极 */
  pole: "N" | "S";
  motion: "in" | "out";
  /** 俯视看电流是否为逆时针（= B_i 向上） */
  ccw: boolean;
}

const CASES: Record<CaseKey, CaseDef> = {
  jia: { pole: "N", motion: "in", ccw: true },
  yi: { pole: "S", motion: "in", ccw: false },
  bing: { pole: "N", motion: "out", ccw: false },
  ding: { pole: "S", motion: "out", ccw: true },
};

const CASE_LIST: { key: CaseKey; label: string }[] = [
  { key: "jia", label: "甲　N 极插入" },
  { key: "yi", label: "乙　S 极插入" },
  { key: "bing", label: "丙　N 极抽出" },
  { key: "ding", label: "丁　S 极抽出" },
];

/** 线圈（竖放，圆心 252,128）：上端接线端偏右、下端偏左 */
const COIL = { x: 252, y: 128, length: 100, radius: 64 };
/** 线圈两端 = Solenoid 的接线端：上端 (316,78)、下端 (188,178) */
const LEAD_TOP = { x: 316, y: 78 };
const LEAD_BOTTOM = { x: 188, y: 178 };
/** 灵敏电流计：导线止于左右接线柱 (222,252) / (282,252) */
const METER = { x: 252, y: 252, r: 30 };
/** 右侧引线的竖直段 x（绕开线圈右缘） */
const RIGHT_LEAD_X = 372;

/** 磁体（竖放，宽 32、长 120）：圆心从上方（-3）到线圈中心（128） */
const MAGNET_WIDTH = 32;
const MAGNET_LENGTH = 120;
const MAGNET_CENTER_HIGH = -3;
const MAGNET_CENTER_LOW = COIL.y;
const DURATION = 1500;

/** 前方导线上的两段电流箭头（俯视逆时针时从左向右） */
const FLOW_ARROWS = [
  { a: { x: 230.1, y: 130.5 }, b: { x: 273.9, y: 128 } },
  { a: { x: 230.1, y: 174.9 }, b: { x: 273.9, y: 172.4 } },
];

const active = ref<CaseKey>("jia");
/** 0 = 起点，1 = 终点 */
const progress = ref(1);
/** 归一化速度：smoothstep 的导数 6t(1-t)，峰值 1.5 */
const speed = ref(0);

let raf = 0;
let startTime = 0;

const tick = (now: number): void => {
  raf = 0;
  const t = (now - startTime) / DURATION;
  if (t >= 1) {
    progress.value = 1;
    speed.value = 0;
    return;
  }
  progress.value = t * t * (3 - 2 * t);
  speed.value = 6 * t * (1 - t);
  raf = requestAnimationFrame(tick);
};

const play = (key: CaseKey): void => {
  active.value = key;
  progress.value = 0;
  speed.value = 0;
  startTime = performance.now();
  if (!raf) raf = requestAnimationFrame(tick);
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const current = computed<CaseDef>(() => CASES[active.value]);
const nSide = computed<"top" | "bottom">(() => (current.value.pole === "N" ? "bottom" : "top"));

const magnetCenter = computed<number>(() => {
  const from = current.value.motion === "in" ? MAGNET_CENTER_HIGH : MAGNET_CENTER_LOW;
  const to = current.value.motion === "in" ? MAGNET_CENTER_LOW : MAGNET_CENTER_HIGH;

  return from + (to - from) * progress.value;
});

/** 俯视逆时针时电流从右接线柱流入 → 指针向右偏（正角） */
const needleAngle = computed<number>(
  () => (current.value.ccw ? 1 : -1) * 26 * Math.min(1, speed.value),
);

/** 电流箭头的透明度：与速度同步淡入淡出 */
const flowOpacity = computed<number>(() => Math.min(1, speed.value * 3));
</script>

<template>
  <div class="rp">
    <svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" class="rp-svg">
      <!-- 条形磁体（先画，线圈的匝盖在上面） -->
      <BarMagnet
        :x="COIL.x"
        :y="magnetCenter"
        :length="MAGNET_LENGTH"
        :width="MAGNET_WIDTH"
        :n-side="nSide"
      />

      <!-- 线圈（共享 Solenoid：竖放、连续螺旋线，从下端看逆时针） -->
      <Solenoid
        :x="COIL.x"
        :y="COIL.y"
        :length="COIL.length"
        :radius="COIL.radius"
        :turns="4.5"
        direction="ccw"
        orientation="vertical"
        color="var(--c-neutral-300)"
        :line-width="2.4"
        :back-opacity="0.3"
      />

      <!-- 引线与灵敏电流计 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path
          :d="`M ${LEAD_TOP.x} ${LEAD_TOP.y} H ${RIGHT_LEAD_X} V ${METER.y} H ${METER.x + METER.r}`"
        />
        <path :d="`M ${LEAD_BOTTOM.x} ${LEAD_BOTTOM.y} V ${METER.y} H ${METER.x - METER.r}`" />
      </g>
      <Galvanometer :x="METER.x" :y="METER.y" :r="METER.r" :angle="needleAngle" />

      <!-- 感应电流：画在前方导线上，只在磁体运动过程中出现 -->
      <g :opacity="flowOpacity">
        <CourseArrow
          v-for="(arrow, index) in FLOW_ARROWS"
          :key="index"
          :from="current.ccw ? arrow.a : arrow.b"
          :to="current.ccw ? arrow.b : arrow.a"
          stroke="var(--c-physics)"
          :stroke-width="2.6"
          :head-size="9"
        />
      </g>
    </svg>

    <div class="rp-bar">
      <button
        v-for="item in CASE_LIST"
        :key="item.key"
        type="button"
        class="rp-btn"
        :class="{ on: item.key === active }"
        @click="play(item.key)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.rp {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.rp-svg {
  width: 100%;
  height: auto;
}

.rp-bar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}

.rp-btn {
  flex: 1 1 auto;

  padding: 0.32rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 0.7rem;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.82rem;
  white-space: nowrap;

  cursor: pointer;

  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.rp-btn:hover,
.rp-btn.on {
  border-color: var(--c-border-glow);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
</style>
