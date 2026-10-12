<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * 牛顿管（自由落体运动 §2.4）：细长透明玻璃管内上方同时放着羽毛和铁片， 管底侧面带有带活栓阀门的细抽气嘴，通过真空胶管连接到右侧抽气机（气泵）， 管侧竖直尺寸线标注有效下落管长 L =
 * 1.2 m。
 *
 * ── 物理 ── 真空：h = ½gt²，管长 L = 1.2 m、g = 10 m/s² ⇒ 落地时刻 t_end = √(2L/g) ≈ 0.49 s。 两个物体共用同一个 t（同一个
 * ref、同一段 rAF 时间轴、同一个 h 函数），位置逐帧完全相同 ⇒ 必然同时落地。 有空气：铁片迎风面小、密度大，空气阻力可忽略，仍用 h = ½gt²； 羽毛按速度饱和到收尾速度 v_t
 * 的定性模型 h = v_t·[t − τ(1 − e^(−t/τ))] 被明显拖慢。
 */

/** ── 物理常量 ── */
const GRAVITY = 10;
/** 管长（有效下落高度，单位 m） */
const TUBE_LENGTH = 1.2;
/** 真空下落总时长 t_end = √(2L/g) ≈ 0.49 s */
const T_END = Math.sqrt((2 * TUBE_LENGTH) / GRAVITY);

/** ── 有空气时的定性参数 ── */
const AIR_V_T = 1;
const AIR_TAU = 0.16;

const airFeatherHeight = (time: number): number =>
  AIR_V_T * (time - AIR_TAU * (1 - Math.exp(-time / AIR_TAU)));

const AIR_FEATHER_T_END = ((): number => {
  let low = 0;
  let high = 4;

  for (let index = 0; index < 50; index += 1) {
    const mid = (low + high) / 2;

    if (airFeatherHeight(mid) < TUBE_LENGTH) low = mid;
    else high = mid;
  }

  return high;
})();

/** ── 画布几何（细长牛顿管 + 竖直管长 L = 1.2 m 尺寸标注 + 侧抽气细嘴与气泵） ── */
const VIEW_BOX = "0 0 264 290";
/** 释放位置（物体底边 y = 38）与管底缓冲垫落地位置（y = 262）对应物理高度 0 → 1.2 m */
const START_Y = 38;
const LAND_Y = 262;
const FALL_PX = LAND_Y - START_Y;
/** 细长牛顿管（外宽 46 px，长径比约 5.6 : 1）内羽毛、铁片并排下落的横坐标 */
const FEATHER_X = 95;
const IRON_X = 115;

/** 同一条玻璃管的渐变色要唯一，避免同页多个实例互相串色 */
const uid = Math.random().toString(36).slice(2, 8);
const glassId = `nt-glass-${uid}`;
const capId = `nt-cap-${uid}`;
const pumpId = `nt-pump-${uid}`;

type RunState = "idle" | "running" | "paused" | "finished";
type SpeedScale = 1 | 2 | 4;

/** ── 状态 ── */
const vacuum = ref(false);
/** 播放慢放倍率：1 = 原速，2 = 1/2 速，4 = 1/4 速 */
const speedScale = ref<SpeedScale>(1);
const runState = ref<RunState>("idle");
const dropTime = ref(0);

let frame = 0;
let lastFrameAt = 0;

/** ── 时间推进 ── */
const runEnd = computed(() => (vacuum.value ? T_END : AIR_FEATHER_T_END));

const cancelLoop = (): void => {
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
};

const step = (now: number): void => {
  const dt = (now - lastFrameAt) / 1000 / speedScale.value;
  lastFrameAt = now;

  const end = runEnd.value;
  const next = dropTime.value + dt;

  if (next < end) {
    dropTime.value = next;
    frame = requestAnimationFrame(step);
  } else {
    dropTime.value = end;
    cancelLoop();
    runState.value = "finished";
  }
};

const reset = (): void => {
  cancelLoop();
  dropTime.value = 0;
  runState.value = "idle";
};

const startOrResume = (): void => {
  cancelLoop();
  runState.value = "running";
  lastFrameAt = performance.now();
  frame = requestAnimationFrame(step);
};

/** 松手释放 / 暂停 / 继续 / 重置 共享同一个按钮 */
const toggleAction = (): void => {
  if (runState.value === "idle") {
    dropTime.value = 0;
    startOrResume();
  } else if (runState.value === "running") {
    cancelLoop();
    runState.value = "paused";
  } else if (runState.value === "paused") {
    startOrResume();
  } else {
    reset();
  }
};

const setVacuum = (nextVacuum: boolean): void => {
  if (vacuum.value === nextVacuum) return;
  reset();
  vacuum.value = nextVacuum;
};

const setSpeed = (nextScale: SpeedScale): void => {
  speedScale.value = nextScale;
};

const actionLabel = computed(() => {
  if (runState.value === "running") return "暂停";
  if (runState.value === "paused") return "继续";
  if (runState.value === "finished") return "重置";
  return "松手释放";
});

onUnmounted(cancelLoop);

// ── 位置计算 ──
const freeFallHeight = (time: number): number => Math.min(0.5 * GRAVITY * time * time, TUBE_LENGTH);

const featherHeight = computed(() =>
  vacuum.value
    ? freeFallHeight(dropTime.value)
    : Math.min(airFeatherHeight(dropTime.value), TUBE_LENGTH),
);
const ironHeight = computed(() => freeFallHeight(dropTime.value));

const featherLanded = computed(() => featherHeight.value >= TUBE_LENGTH - 1e-9);
const ironLanded = computed(() => ironHeight.value >= TUBE_LENGTH - 1e-9);

const bottomY = (height: number): number => START_Y + (height / TUBE_LENGTH) * FALL_PX;
const featherY = computed(() => bottomY(featherHeight.value));
const ironY = computed(() => bottomY(ironHeight.value));
</script>

<template>
  <div class="nt-wrap">
    <!-- 左栏：清晰分区的三组控制开关（有空气/抽真空切换 + 原速/1/2/1/4 切换 + 松手释放/暂停/继续/重置合一开关） -->
    <div class="nt-side">
      <!-- 1. 有空气 / 抽真空 双按钮切换状态 -->
      <div class="nt-group" role="group" aria-label="管内气压状态切换">
        <div class="nt-seg nt-seg-2">
          <button
            type="button"
            class="nt-seg-btn"
            :class="{ 'nt-seg-btn-air': !vacuum }"
            :aria-pressed="!vacuum"
            @click="setVacuum(false)"
          >
            有空气
          </button>
          <button
            type="button"
            class="nt-seg-btn"
            :class="{ 'nt-seg-btn-vac': vacuum }"
            :aria-pressed="vacuum"
            @click="setVacuum(true)"
          >
            抽真空
          </button>
        </div>
      </div>

      <!-- 2. 播放速度切换：原速 / 1/2 / 1/4 -->
      <div class="nt-group" role="group" aria-label="播放速度切换">
        <div class="nt-seg nt-seg-3">
          <button
            type="button"
            class="nt-seg-btn"
            :class="{ 'nt-seg-btn-speed': speedScale === 1 }"
            :aria-pressed="speedScale === 1"
            @click="setSpeed(1)"
          >
            原速
          </button>
          <button
            type="button"
            class="nt-seg-btn"
            :class="{ 'nt-seg-btn-speed': speedScale === 2 }"
            :aria-pressed="speedScale === 2"
            @click="setSpeed(2)"
          >
            1/2
          </button>
          <button
            type="button"
            class="nt-seg-btn"
            :class="{ 'nt-seg-btn-speed': speedScale === 4 }"
            :aria-pressed="speedScale === 4"
            @click="setSpeed(4)"
          >
            1/4
          </button>
        </div>
      </div>

      <!-- 3. 松手释放 / 暂停 / 继续 / 重置 共享同一开关 -->
      <button
        type="button"
        class="nt-action-btn"
        :class="{
          'nt-action-release': runState === 'idle' || runState === 'paused',
          'nt-action-pause': runState === 'running',
          'nt-action-reset': runState === 'finished',
        }"
        @click="toggleAction"
      >
        {{ actionLabel }}
      </button>
    </div>

    <!-- 右栏：细长牛顿管 + 竖直管长 L = 1.2 m 标注 + 细抽气口与真空泵 -->
    <div class="nt-tube">
      <svg
        class="nt-svg"
        :viewBox="VIEW_BOX"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="牛顿管：细长玻璃管内羽毛与铁片从管顶同时释放，管侧细抽气口连接真空泵，对比有空气与抽真空两种状态"
        @click="toggleAction"
      >
        <defs>
          <linearGradient :id="glassId" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="rgba(186, 230, 253, 0.26)" />
            <stop offset="0.22" stop-color="rgba(148, 163, 184, 0.05)" />
            <stop offset="0.78" stop-color="rgba(148, 163, 184, 0.05)" />
            <stop offset="1" stop-color="rgba(186, 230, 253, 0.22)" />
          </linearGradient>
          <linearGradient :id="capId" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#334155" />
            <stop offset="0.45" stop-color="#64748b" />
            <stop offset="1" stop-color="#1e293b" />
          </linearGradient>
          <linearGradient :id="pumpId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#334155" />
            <stop offset="1" stop-color="#0f172a" />
          </linearGradient>
        </defs>
        <!-- ================= 1. 左侧竖直尺寸标注：管长 L = 1.2 m（不再画在管底像直径） ================= -->
        <g class="dim-group">
          <!-- 上下引出界线（对齐释放线 y = 38 与落地底面 y = 262） -->
          <line x1="50" y1="38" x2="78" y2="38" class="dim-ext" />
          <line x1="50" y1="262" x2="78" y2="262" class="dim-ext" />
          <!-- 竖直双向尺寸线（中间断开留给文字） -->
          <line x1="56" y1="43" x2="56" y2="126" class="dim-line" />
          <line x1="56" y1="174" x2="56" y2="257" class="dim-line" />
          <path d="M 56 38.5 L 53 45.5 L 59 45.5 Z" class="dim-arrow" />
          <path d="M 56 261.5 L 53 254.5 L 59 254.5 Z" class="dim-arrow" />
          <!-- 管长 L = 1.2 m 标注 -->
          <text x="56" y="145" text-anchor="middle" font-size="11.5" class="nt-caption">管长</text>
          <text x="56" y="162" text-anchor="middle" font-size="12" class="nt-caption-val">
            <tspan font-family="KaTeX_Math" font-style="italic">L</tspan>
            <tspan font-family="KaTeX_Main">= 1.2 m</tspan>
          </text>
        </g>
        <!-- ================= 2. 顶部物品名称与引线 ================= -->
        <text x="48" y="25" text-anchor="end" font-size="12.5" class="nt-label nt-label-feather">
          羽毛
        </text>
        <polyline
          points="52,21 72,21 91,31"
          fill="none"
          stroke="#e2a846"
          stroke-width="1"
          stroke-opacity="0.7"
        />
        <text x="162" y="25" text-anchor="start" font-size="12.5" class="nt-label">铁片</text>
        <polyline
          points="158,21 138,21 119,33"
          fill="none"
          stroke="#cbd5e1"
          stroke-width="1"
          stroke-opacity="0.7"
        />
        <!-- ================= 3. 细长牛顿管本体（x = 82 ~ 128，外宽仅 46 px，长径比约 5.6:1） ================= -->
        <!-- 顶部密封金属法兰盖与挂环 -->
        <circle cx="105" cy="7.5" r="3.5" fill="none" stroke="#94a3b8" stroke-width="1.6" />
        <rect
          x="80"
          y="11"
          width="50"
          height="7"
          rx="2.5"
          :fill="`url(#${capId})`"
          stroke="#94a3b8"
          stroke-width="1.1"
        />
        <!-- 玻璃管外壳与深色内腔 -->
        <rect
          x="82"
          y="16"
          width="46"
          height="254"
          rx="6"
          :fill="`url(#${glassId})`"
          class="tube-shell"
        />
        <rect x="85.5" y="19" width="39" height="248" rx="4" class="tube-cavity" />
        <!-- 细长玻璃管左右双侧高光反射线 -->
        <line x1="89" y1="24" x2="89" y2="260" class="tube-shine" />
        <line x1="121" y1="24" x2="121" y2="236" class="tube-shine-sub" />
        <!-- 底部金属密封基座与台面底座 -->
        <rect
          x="79"
          y="266"
          width="52"
          height="10"
          rx="2.5"
          :fill="`url(#${capId})`"
          stroke="#94a3b8"
          stroke-width="1.1"
        />
        <rect
          x="70"
          y="276"
          width="70"
          height="5"
          rx="2.5"
          fill="#334155"
          stroke="#64748b"
          stroke-width="1"
        />
        <!-- ================= 4. 管侧细抽气嘴 + 旋塞活栓 + 抽气软管 + 真空泵（气泵） ================= -->
        <!-- 与玻璃管内腔连通的细长抽气支管（位于 y = 248） -->
        <path
          d="M 124.5 245.5 L 154 245.5 L 154 250.5 L 124.5 250.5"
          fill="rgb(15, 23, 42, 0.85)"
          stroke="#94a3b8"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
        <!-- 细口宝塔接头纹理 -->
        <line x1="150" y1="244.5" x2="150" y2="251.5" stroke="#cbd5e1" stroke-width="1.2" />
        <line x1="153" y1="244.5" x2="153" y2="251.5" stroke="#cbd5e1" stroke-width="1.2" />
        <!-- 抽气嘴上的玻璃/黄铜活栓阀门（T 型旋塞随真空状态旋转） -->
        <rect
          x="136"
          y="243.5"
          width="7"
          height="9"
          rx="1.5"
          fill="#475569"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <g :transform="`translate(139.5 241) rotate(${vacuum ? 0 : 90})`">
          <rect
            x="-6.5"
            y="-1.8"
            width="13"
            height="3.6"
            rx="1.5"
            :fill="vacuum ? '#e2a846' : '#94a3b8'"
          />
        </g>
        <!-- 连接细抽气口与气泵的弯曲真空橡胶管 -->
        <path
          d="M 154 248 C 172 248, 174 218, 192 218"
          fill="none"
          stroke="#334155"
          stroke-width="4.6"
          stroke-linecap="round"
        />
        <path
          d="M 154 248 C 172 248, 174 218, 192 218"
          fill="none"
          :stroke="vacuum ? '#e2a846' : '#64748b'"
          stroke-width="1.6"
          stroke-dasharray="3.5 3.5"
          stroke-linecap="round"
        />
        <!-- 抽气方向小箭头（抽成真空时高亮显示气流从管内抽向气泵） -->
        <g v-if="vacuum" fill="#e2a846" opacity="0.9">
          <path d="M 169 243 L 162 241 L 165 246 Z" />
          <text x="166" y="262" text-anchor="middle" font-size="9.5" fill="#e2a846">已抽气</text>
        </g>
        <!-- 右下角真空泵（气泵）本体 -->
        <g transform="translate(188, 196)">
          <!-- 气泵提手 -->
          <path
            d="M 20 8 L 20 2 L 42 2 L 42 8"
            fill="none"
            stroke="#94a3b8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- 气泵进气嘴法兰 -->
          <rect
            x="0"
            y="18"
            width="6"
            height="8"
            rx="1"
            fill="#64748b"
            stroke="#94a3b8"
            stroke-width="1"
          />
          <!-- 气泵主机外壳 -->
          <rect
            x="5"
            y="8"
            width="54"
            height="44"
            rx="5"
            :fill="`url(#${pumpId})`"
            stroke="#94a3b8"
            stroke-width="1.3"
          />
          <!-- 电机散热格栅 -->
          <line
            x1="12"
            y1="18"
            x2="28"
            y2="18"
            stroke="#64748b"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="12"
            y1="23"
            x2="28"
            y2="23"
            stroke="#64748b"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="12"
            y1="28"
            x2="28"
            y2="28"
            stroke="#64748b"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="12"
            y1="33"
            x2="28"
            y2="33"
            stroke="#64748b"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <!-- 真空负压表盘 -->
          <circle cx="43" cy="24" r="9.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2" />
          <!-- 表盘刻度弧 -->
          <path d="M 36.5 27 A 7 7 0 1 1 49.5 27" fill="none" stroke="#64748b" stroke-width="1.1" />
          <!-- 真空表指针（有空气指右，抽真空指左负压端） -->
          <line
            x1="43"
            y1="24"
            :x2="vacuum ? 37.5 : 48.5"
            :y2="vacuum ? 20 : 20"
            :stroke="vacuum ? '#e2a846' : '#94a3b8'"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle cx="43" cy="24" r="1.5" fill="#cbd5e1" />
          <!-- 气泵状态指示灯与文字 -->
          <circle cx="15" cy="43" r="2.2" :fill="vacuum ? '#e2a846' : '#475569'" />
          <text
            x="36"
            y="45.5"
            text-anchor="middle"
            font-size="9.5"
            font-weight="600"
            :fill="vacuum ? '#e2a846' : '#94a3b8'"
          >
            气泵
          </text>
          <!-- 气泵减震底座脚垫 -->
          <rect x="10" y="52" width="10" height="3.5" rx="1" fill="#475569" />
          <rect x="44" y="52" width="10" height="3.5" rx="1" fill="#475569" />
        </g>
        <!-- ================= 5. 管内空气分子（只在"有空气"时显示） ================= -->
        <g class="air-group" :style="{ opacity: vacuum ? 0 : 1 }">
          <circle cx="92" cy="52" r="1.6" class="air-molecule" />
          <circle cx="116" cy="64" r="1.6" class="air-molecule" />
          <circle cx="102" cy="82" r="1.6" class="air-molecule" />
          <circle cx="118" cy="102" r="1.6" class="air-molecule" />
          <circle cx="91" cy="118" r="1.6" class="air-molecule" />
          <circle cx="108" cy="136" r="1.6" class="air-molecule" />
          <circle cx="94" cy="156" r="1.6" class="air-molecule" />
          <circle cx="117" cy="174" r="1.6" class="air-molecule" />
          <circle cx="103" cy="194" r="1.6" class="air-molecule" />
          <circle cx="91" cy="214" r="1.6" class="air-molecule" />
          <circle cx="115" cy="228" r="1.6" class="air-molecule" />
          <circle cx="101" cy="246" r="1.6" class="air-molecule" />
        </g>
        <!-- ================= 6. 释放基准线、真空等高同步线与管底落地指示垫 ================= -->
        <!-- 释放位置线（y = 38） -->
        <line x1="86" y1="38" x2="124" y2="38" class="start-line" />
        <!-- 真空同步线：横穿细管两列，直观显示"始终等高" -->
        <line
          v-if="vacuum && dropTime > 0"
          x1="86"
          :y1="featherY"
          x2="124"
          :y2="featherY"
          class="sync-line"
        />
        <!-- 管底缓冲垫与左右落地高亮指示条（y = 262） -->
        <line x1="86" y1="262.5" x2="124" y2="262.5" class="pad-base" />
        <line
          x1="87.5"
          y1="262.5"
          x2="103"
          y2="262.5"
          class="pad-flag"
          :class="{ 'pad-flag-feather-on': featherLanded }"
        />
        <line
          x1="107"
          y1="262.5"
          x2="122.5"
          y2="262.5"
          class="pad-flag"
          :class="{ 'pad-flag-iron-on': ironLanded }"
        />
        <!-- ================= 7. 羽毛与铁片（适配细长管腔） ================= -->
        <!-- 羽毛：底端为局部原点 (0, 0) -->
        <g :transform="`translate(${FEATHER_X} ${featherY})`">
          <path
            d="M 0 0 C -2.8 -4.2 -6 -8.5 -5.4 -13.5 C -4.6 -18 -2.2 -20.2 0 -21.5 C 2.2 -20.2 4.6 -18 5.4 -13.5 C 6 -8.5 2.8 -4.2 0 0 Z"
            class="feather-vane"
          />
          <line x1="0" y1="-7" x2="-4.2" y2="-10.5" class="feather-barb" />
          <line x1="0" y1="-7" x2="4.2" y2="-10.5" class="feather-barb" />
          <line x1="0" y1="-13.5" x2="-3.5" y2="-16.5" class="feather-barb" />
          <line x1="0" y1="-13.5" x2="3.5" y2="-16.5" class="feather-barb" />
          <line x1="0" y1="-1.2" x2="0" y2="-20" class="feather-shaft" />
        </g>
        <!-- 铁片：底端为局部原点 (0, 0)，与羽毛底边严格平齐 -->
        <g :transform="`translate(${IRON_X} ${ironY})`">
          <rect x="-7.5" y="-7" width="15" height="7" rx="1.5" class="iron-body" />
          <rect x="-7.5" y="-7" width="15" height="2.4" rx="1.2" class="iron-top" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.nt-wrap {
  --c-border: rgb(148 163 184 / 22%);
  --c-surface: rgb(15 23 42 / 72%);
  --c-text: #f1f5f9;
  --c-text-dim: #94a3b8;
  --c-accent: #e2a846;

  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;

  user-select: none;
}

.nt-side {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  width: 12.5rem;
  min-width: 0;
}

.nt-group {
  display: flex;
  flex-direction: column;
}

.nt-seg {
  display: grid;
  gap: 0.25rem;
  padding: 0.24rem;
  border: 1px solid var(--c-border);
  border-radius: 0.65rem;
  background: var(--c-surface);
}

.nt-seg-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.nt-seg-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.nt-seg-btn {
  min-width: 0;
  padding: 0.45rem 0.4rem;
  border: 1px solid transparent;
  border-radius: 0.46rem;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.82rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.25;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.nt-seg-btn:hover {
  color: var(--c-text);
}

.nt-seg-btn-air {
  border-color: rgb(148 163 184 / 38%);
  background: rgb(51 65 85 / 65%);
  color: var(--c-text);
  font-weight: 600;
}

.nt-seg-btn-vac {
  border-color: rgb(226 168 70 / 55%);
  background: rgb(226 168 70 / 16%);
  color: var(--c-accent);
  font-weight: 600;
}

.nt-seg-btn-speed {
  border-color: rgb(96 165 250 / 45%);
  background: rgb(59 130 246 / 16%);
  color: #93c5fd;
  font-weight: 600;
}

.nt-action-btn {
  width: 100%;
  padding: 0.62rem 0.75rem;
  border: 1px solid var(--c-border);
  border-radius: 0.65rem;

  background: var(--c-surface);
  color: var(--c-text);

  font-size: 0.88rem;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.nt-action-release {
  border-color: rgb(96 165 250 / 50%);
  background: rgb(59 130 246 / 16%);
  color: #93c5fd;
}

.nt-action-release:hover {
  background: rgb(59 130 246 / 24%);
}

.nt-action-pause {
  border-color: rgb(226 168 70 / 55%);
  background: rgb(226 168 70 / 16%);
  color: var(--c-accent);
}

.nt-action-pause:hover {
  background: rgb(226 168 70 / 24%);
}

.nt-action-reset {
  border-color: rgb(148 163 184 / 45%);
  background: rgb(51 65 85 / 60%);
  color: #e2e8f0;
}

.nt-action-reset:hover {
  background: rgb(71 85 105 / 70%);
}

.nt-tube {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  height: auto;
}

.nt-svg {
  display: block;

  width: auto;
  max-width: 100%;
  height: 372px;
  aspect-ratio: 264 / 290;

  cursor: pointer;
}

.tube-shell {
  stroke: #94a3b8;
  stroke-opacity: 0.6;
  stroke-width: 1.6;
}

.tube-cavity {
  fill: rgb(9 13 26 / 68%);
}

.tube-shine {
  stroke: rgb(226 232 240 / 24%);
  stroke-linecap: round;
  stroke-width: 2.2;
}

.tube-shine-sub {
  stroke: rgb(148 163 184 / 14%);
  stroke-linecap: round;
  stroke-width: 1.2;
}

.dim-ext {
  stroke: #64748b;
  stroke-dasharray: 2.5 2.5;
  stroke-width: 1;
}

.dim-line {
  stroke: #94a3b8;
  stroke-width: 1.2;
}

.dim-arrow {
  fill: #94a3b8;
}

.air-molecule {
  fill: var(--c-text-dim);
  opacity: 0.75;
}

.air-group {
  transition: opacity 0.35s ease;
}

.start-line {
  stroke: var(--c-text-dim);
  stroke-dasharray: 4 3.5;
  stroke-opacity: 0.45;
  stroke-width: 1.1;
}

.sync-line {
  stroke: var(--c-accent);
  stroke-dasharray: 3.5 3.5;
  stroke-opacity: 0.75;
  stroke-width: 1.3;
}

.pad-base {
  stroke: var(--c-text-dim);
  stroke-linecap: round;
  stroke-opacity: 0.32;
  stroke-width: 2.6;
}

.pad-flag {
  transition:
    stroke 0.2s ease,
    stroke-opacity 0.2s ease;

  stroke: var(--c-text-dim);
  stroke-linecap: round;
  stroke-opacity: 0.3;
  stroke-width: 3.5;
}

.pad-flag-feather-on {
  stroke: var(--c-accent);
  stroke-opacity: 1;
}

.pad-flag-iron-on {
  stroke: #cbd5e1;
  stroke-opacity: 1;
}

.feather-vane {
  fill: var(--c-accent);
}

.feather-shaft {
  stroke: rgb(255 255 255 / 60%);
  stroke-linecap: round;
  stroke-width: 1.3;
}

.feather-barb {
  stroke: rgb(255 255 255 / 40%);
  stroke-linecap: round;
  stroke-width: 0.9;
}

.iron-body {
  fill: #cbd5e1;
  stroke: #94a3b8;
  stroke-width: 1;
}

.iron-top {
  fill: #f8fafc;
  stroke: #94a3b8;
  stroke-width: 0.9;
}

.nt-label {
  font-weight: 600;
  fill: var(--c-text);
}

.nt-label-feather {
  fill: var(--c-accent);
}

.nt-caption {
  fill: var(--c-text-dim);
}

.nt-caption-val {
  fill: #cbd5e1;
  font-weight: 600;
}
</style>
