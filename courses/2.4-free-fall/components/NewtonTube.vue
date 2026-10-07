<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * 牛顿管（自由落体运动 §2.4）：管内上方同时放着羽毛和铁片，按钮在「有空气 / 已抽成真空」之间切换。
 *
 * ── 物理 ── 真空：h = ½gt²，管长 L = 1.2 m、g = 10 m/s² ⇒ 落地时刻 t_end = √(2L/g) ≈ 0.49 s。 两个物体**共用同一个
 * t**（同一个 ref、同一段 requestAnimationFrame 时间轴、同一个 h 函数）： 位置逐帧完全相同 ⇒ 必然同时落地。这是本组件的教学核心，绝不允许两个物体各跑各的动画。
 * 有空气：按**定性示意**处理（不追求真实阻力公式）—— 铁片迎风面小、密度大，空气阻力影响可忽略，仍用 h = ½gt²； 羽毛按"速度很快饱和到收尾速度 v_t"的定性模型 h =
 * v_t·[t − τ(1 − e^(−t/τ))] 被明显拖慢。 两种状态的差别只来自空气阻力，不来自质量（同一个管子、同一段高度）。
 *
 * ── 交互 ── 点管子或「松手释放」开始下落（@click 直接触发，不绑 $clicks —— Slidev 里鼠标点击不推进点击步，
 * 交互式演示就该"点它一下它动"，不该占老师翻页的点击）；跑完再点可重跑。 切换状态会把动画复位到起点：两种状态的下落模型不同，不复位就会出现"半路换模型"的错位。 「实时播放 / 慢放
 * ×5」只改变播放速度（真实下落只有 0.49 s，慢放是为了让后排看清）， 物理时间与位置的关系不变，两个物体仍然由同一个 t 决定。
 *
 * ── 版面 ── 左栏＝交互控件 + 结论 + 读数，右栏＝牛顿管；管子按**高度**定尺寸（height: 100%）， 是这一页的高度主导。这一页 .page-grow 可用
 * 435px，扣掉上面那句 .ask（30.6px）与 0.7rem 间距后留给组件 389px， 组件取 384px（留 5px 余量）⇒ 不会溢出、也不会顶到标题上。 结论框的高度由 flex
 * 分配（与文字行数无关），未跑完时只有虚线占位、结论文字 visibility: hidden ⇒ 结论"弹出"时不会顶跑控件与读数。
 *
 * ── SVG ── viewBox 固定、动画只改元素属性与文字，所以切换状态、开始/结束动画都不会推动页面。 SVG 内没有空行（空行会让后面的元素丢掉命名空间，不报错但整图消失），也没有用
 * rem； 图内的量与单位用 KaTeX 字体排（量 KaTeX_Math 斜体、单位 KaTeX_Main 正体），因为 SVG 里嵌不了 <Latex>。
 */

/** ── 物理常量 ── */
const GRAVITY = 10;
/** 管长（真空段的有效下落高度，单位 m） */
const TUBE_LENGTH = 1.2;
/** 真空下落总时长 t_end = √(2L/g) ≈ 0.49 s，用真实计算而不是拍脑袋的动画时长 */
const T_END = Math.sqrt((2 * TUBE_LENGTH) / GRAVITY);
/** 慢放倍数：只改播放速度，不改物理 */
const SLOW_SCALE = 5;

/** ── 有空气时的定性参数（只为体现"羽毛明显慢很多"，不追求真实阻力公式） ── */
const AIR_V_T = 1;
const AIR_TAU = 0.16;

// 有空气时羽毛的定性下落高度：先短暂加速，随后几乎以收尾速度匀速下落
const airFeatherHeight = (time: number): number =>
  AIR_V_T * (time - AIR_TAU * (1 - Math.exp(-time / AIR_TAU)));

/** 羽毛在空气中落到底所需的真实时间：定性模型没有解析解，用二分法数值求解（组件加载时算一次） */
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

/** ── 画布几何（viewBox 用户单位，按 16px 体系；高度铺满右栏，宽度由 264:290 的比例定出来） ── */
const VIEW_BOX = "0 0 264 290";
/** 释放位置（物体底边）与落地位置对应物理高度 0 → 1.2 m */
const START_Y = 66;
const LAND_Y = 256;
const FALL_PX = LAND_Y - START_Y;
/** 羽毛、铁片两列的横坐标（并排下落，肉眼能直接比高低） */
const FEATHER_X = 112;
const IRON_X = 152;

/** 同一条玻璃管的渐变色要唯一，避免同页多个实例互相串色 */
const uid = Math.random().toString(36).slice(2, 8);
const glassId = `nt-glass-${uid}`;

/** ── 状态 ── */
/** 默认"有空气"：先看现实里的直觉（羽毛慢），再抽真空推翻它 */
const vacuum = ref(false);
/** 慢放开关（默认实时：真实下落本来就只有 0.49 s） */
const slow = ref(false);
const running = ref(false);
const started = ref(false);
/** 唯一的物理时间量（单位 s）：真空下有空气下、羽毛和铁片都由它算出下落高度 */
const dropTime = ref(0);

let frame = 0;

/** ── 时间推进 ── */
/** 本次下落要跑到的物理时间：有空气时最慢的羽毛说了算，跑到它也落地为止 */
const runEnd = computed(() => (vacuum.value ? T_END : AIR_FEATHER_T_END));
/** 真实经过时间 ÷ 播放倍数 = 物理时间（慢放只是把同一段物理时间放慢播放） */
const playbackScale = computed(() => (slow.value ? SLOW_SCALE : 1));

const stopFrame = (): void => {
  cancelAnimationFrame(frame);
  frame = 0;
  running.value = false;
};

/** 复位到起点：切换状态、切换播放速度、重新开始前都要先复位 */
const reset = (): void => {
  stopFrame();
  dropTime.value = 0;
};

const release = (): void => {
  if (running.value) return;

  reset();
  started.value = true;
  running.value = true;

  const end = runEnd.value;
  const scale = playbackScale.value;
  const startedAt = performance.now();

  const step = (now: number): void => {
    const physical = (now - startedAt) / 1000 / scale;

    dropTime.value = Math.min(physical, end);

    if (physical < end) {
      frame = requestAnimationFrame(step);
    } else {
      dropTime.value = end;
      stopFrame();
    }
  };

  frame = requestAnimationFrame(step);
};

const toggleVacuum = (): void => {
  reset();
  vacuum.value = !vacuum.value;
};

const toggleSlow = (): void => {
  reset();
  slow.value = !slow.value;
};

onUnmounted(stopFrame);

// ── 位置：两个物体都由同一个时间量算出（只是高度函数不同） ──
// h = ½gt²，封顶到管长（落地后停住，不再往下跑）
const freeFallHeight = (time: number): number => Math.min(0.5 * GRAVITY * time * time, TUBE_LENGTH);

/** 羽毛：真空用 h = ½gt²；有空气用定性模型 */
const featherHeight = computed(() =>
  vacuum.value
    ? freeFallHeight(dropTime.value)
    : Math.min(airFeatherHeight(dropTime.value), TUBE_LENGTH),
);
/** 铁片：两种状态都用 h = ½gt²（有空气时它的空气阻力可忽略） */
const ironHeight = computed(() => freeFallHeight(dropTime.value));

const featherLanded = computed(() => featherHeight.value >= TUBE_LENGTH - 1e-9);
const ironLanded = computed(() => ironHeight.value >= TUBE_LENGTH - 1e-9);

// 物体底边高度 → 屏幕 y
const bottomY = (height: number): number => START_Y + (height / TUBE_LENGTH) * FALL_PX;
const featherY = computed(() => bottomY(featherHeight.value));
const ironY = computed(() => bottomY(ironHeight.value));

/** ── 屏幕文字（都是给学生看的） ── */
/** 这一次下落**跑完了**才给结论：中途不提前亮答案，跑完 / 切换状态又会复位 */
const finished = computed(
  () => started.value && !running.value && dropTime.value >= runEnd.value - 1e-9,
);

/** 操作提示：一行，永远占着同一个位置 */
const hintText = computed(() => {
  if (running.value) return "下落中……";
  if (finished.value) return "换个状态再跑一次，对比看看";

  return "点「松手释放」或管子，看谁先落地";
});

/** 结论：真空 ⇒ 同时落地；有空气 ⇒ 铁片先落地（只有跑完才显示） */
const conclusionText = computed(() =>
  vacuum.value ? "同时落地！真空里两者下落一样快" : "铁片先落地，羽毛慢了一大截",
);

const tText = computed(() => dropTime.value.toFixed(2));
const featherHeightText = computed(() => featherHeight.value.toFixed(2));
const ironHeightText = computed(() => ironHeight.value.toFixed(2));
</script>

<template>
  <div class="nt-wrap">
    <!-- 左栏：交互控件在上，结论在中间（跑完才弹出来），读数在下 -->
    <div class="nt-side">
      <div class="nt-controls">
        <button
          type="button"
          class="nt-btn"
          :class="{ 'nt-btn-on': vacuum }"
          :aria-label="vacuum ? '当前已抽成真空，点击切换为有空气' : '当前管内有空气，点击抽成真空'"
          @click="toggleVacuum"
        >
          {{ vacuum ? "已抽成真空" : "有空气" }}
        </button>
        <button type="button" class="nt-btn nt-btn-run" :disabled="running" @click="release">
          {{ running ? "下落中" : started ? "再跑一次" : "松手释放" }}
        </button>
        <button
          type="button"
          class="nt-btn"
          :class="{ 'nt-btn-on-2': slow }"
          :aria-label="slow ? '当前慢放播放，点击恢复实时播放' : '当前实时播放，点击慢放'"
          @click="toggleSlow"
        >
          {{ slow ? `慢放 ×${SLOW_SCALE}` : "实时播放" }}
        </button>
      </div>
      <p class="nt-conclusion" :class="{ 'nt-conclusion-on': finished }" aria-live="polite">
        <span class="nt-conclusion-hint">{{ hintText }}</span>
        <span class="nt-conclusion-text">{{ conclusionText }}</span>
      </p>
      <div class="nt-read">
        <div class="nt-read-row">
          <span class="nt-read-label">时间</span>
          <Latex :tex="`t = ${tText}\\ \\text{s}`" />
        </div>
        <div class="nt-read-row nt-read-row-feather">
          <span class="nt-read-label">羽毛</span>
          <Latex :tex="`h = ${featherHeightText}\\ \\text{m}`" />
        </div>
        <div class="nt-read-row nt-read-row-iron">
          <span class="nt-read-label">铁片</span>
          <Latex :tex="`h = ${ironHeightText}\\ \\text{m}`" />
        </div>
        <div class="nt-read-row">
          <span class="nt-read-label">重力加速度</span>
          <Latex tex="g = 10\ \text{m/s}^2" />
        </div>
      </div>
    </div>
    <!-- 右栏：牛顿管本体，高度铺满整个组件 -->
    <div class="nt-tube">
      <svg
        class="nt-svg"
        :viewBox="VIEW_BOX"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="牛顿管：羽毛与铁片从管顶同时释放，可对比有空气与抽成真空两种状态"
        @click="release"
      >
        <defs>
          <linearGradient :id="glassId" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="rgba(148, 163, 184, 0.22)" />
            <stop offset="0.3" stop-color="rgba(148, 163, 184, 0.04)" />
            <stop offset="0.72" stop-color="rgba(148, 163, 184, 0.05)" />
            <stop offset="1" stop-color="rgba(148, 163, 184, 0.2)" />
          </linearGradient>
        </defs>
        <!-- 抽气口：画出阀门，学生才知道这根管子能抽气（状态按钮才有着落） -->
        <rect x="116" y="2" width="32" height="7" rx="3.5" class="valve" />
        <rect x="124" y="6" width="16" height="17" rx="5" class="valve" />
        <!-- 玻璃管：外壳 + 内腔，内腔压暗，里面的物体才显眼 -->
        <rect
          x="76"
          y="22"
          width="112"
          height="248"
          rx="18"
          :fill="`url(#${glassId})`"
          class="tube-shell"
        />
        <rect x="83" y="29" width="98" height="234" rx="12" class="tube-cavity" />
        <line x1="91" y1="40" x2="91" y2="250" class="tube-shine" />
        <!-- 空气分子：只在"有空气"时出现（渐隐），看得见空气才讲得清阻力 -->
        <g class="air-group" :style="{ opacity: vacuum ? 0 : 1 }">
          <circle cx="100" cy="60" r="2.3" class="air-molecule" />
          <circle cx="118" cy="78" r="2.3" class="air-molecule" />
          <circle cx="150" cy="55" r="2.3" class="air-molecule" />
          <circle cx="166" cy="90" r="2.3" class="air-molecule" />
          <circle cx="96" cy="120" r="2.3" class="air-molecule" />
          <circle cx="140" cy="112" r="2.3" class="air-molecule" />
          <circle cx="172" cy="140" r="2.3" class="air-molecule" />
          <circle cx="108" cy="170" r="2.3" class="air-molecule" />
          <circle cx="156" cy="178" r="2.3" class="air-molecule" />
          <circle cx="128" cy="210" r="2.3" class="air-molecule" />
          <circle cx="100" cy="238" r="2.3" class="air-molecule" />
          <circle cx="168" cy="230" r="2.3" class="air-molecule" />
          <circle cx="140" cy="250" r="2.3" class="air-molecule" />
        </g>
        <!-- 释放位置线：两者从同一条线出发，落地才有可比性 -->
        <line x1="86" y1="66" x2="178" y2="66" class="start-line" />
        <!-- 真空同步线：横穿两列，y 由羽毛（= 铁片，同一个 t）算出，直观显示"始终等高" -->
        <line
          v-if="vacuum && started"
          x1="86"
          :y1="featherY"
          x2="178"
          :y2="featherY"
          class="sync-line"
        />
        <!-- 管底：一条底线 + 两条各自落地时点亮的短线 -->
        <line x1="86" y1="257" x2="178" y2="257" class="pad-base" />
        <line
          x1="94"
          y1="257"
          x2="130"
          y2="257"
          class="pad-flag"
          :class="{ 'pad-flag-feather-on': featherLanded }"
        />
        <line
          x1="134"
          y1="257"
          x2="170"
          y2="257"
          class="pad-flag"
          :class="{ 'pad-flag-iron-on': ironLanded }"
        />
        <!-- 羽毛：底端为局部原点，向下平移即"落了多少" -->
        <g :transform="`translate(${FEATHER_X} ${featherY})`">
          <path
            d="M 0 0 C -4 -6 -9 -12 -8 -19 C -7 -25 -3 -28 0 -30 C 3 -28 7 -25 8 -19 C 9 -12 4 -6 0 0 Z"
            class="feather-vane"
          />
          <line x1="0" y1="-10" x2="-6" y2="-15" class="feather-barb" />
          <line x1="0" y1="-10" x2="6" y2="-15" class="feather-barb" />
          <line x1="0" y1="-19" x2="-5" y2="-23" class="feather-barb" />
          <line x1="0" y1="-19" x2="5" y2="-23" class="feather-barb" />
          <line x1="0" y1="-2" x2="0" y2="-28" class="feather-shaft" />
        </g>
        <!-- 铁片：底端为局部原点（与羽毛对齐的是底边，"同时落地"才严格可比） -->
        <g :transform="`translate(${IRON_X} ${ironY})`">
          <rect x="-13" y="-10" width="26" height="10" rx="2" class="iron-body" />
          <rect x="-13" y="-10" width="26" height="3.4" rx="1.7" class="iron-top" />
        </g>
        <text x="72" y="76" text-anchor="end" font-size="18" class="nt-label nt-label-feather">
          羽毛
        </text>
        <text x="192" y="76" text-anchor="start" font-size="18" class="nt-label">铁片</text>
        <text x="132" y="283" text-anchor="middle" font-size="13" class="nt-caption">
          管长
          <tspan font-family="KaTeX_Math" font-style="italic">L</tspan>
          <tspan font-family="KaTeX_Main">= 1.2 m</tspan>
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* ── 版面：右栏是管子（高度主导），左栏是控件 + 结论 + 读数 ──
   高度由内容决定：管子 340px 是这一页的高度主导（正文容器约 435px，扣掉提问与间距后约 389px）。
   注意别给容器写死 height：grid 行高与子项的百分比高度会互相打架，实测会把组件撑到 445px、溢出 61px。 */
.nt-wrap {
  display: grid;
  grid-template-columns: minmax(0, 430px) minmax(0, 1fr);
  gap: 1.2rem;
  align-items: stretch;

  width: 100%;
  min-width: 0;

  user-select: none;
}

/* 左栏：控件 / 提示 / 结论 / 读数四块，结论块吃掉剩余高度（高度与文字行数无关） */
.nt-side {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
}

/* ── 按钮：三列等宽（文案在两种状态间切换，列宽不变 ⇒ 不会推挤布局） ── */
.nt-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;

  width: 100%;
  min-width: 0;
}

.nt-btn {
  min-width: 0;
  padding: 0.42rem 0.3rem;
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.72rem;
  font-family: inherit;
  line-height: 1.25;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.nt-btn:hover {
  border-color: rgb(148 163 184 / 30%);
  color: var(--c-text);
}

.nt-btn-on {
  border-color: rgb(226 168 70 / 50%);
  background: rgb(226 168 70 / 12%);
  color: var(--c-accent);
  font-weight: 600;
}

.nt-btn-on-2 {
  border-color: rgb(59 130 246 / 45%);
  background: rgb(59 130 246 / 12%);
  color: #93c5fd;
  font-weight: 600;
}

.nt-btn-run {
  border-color: rgb(59 130 246 / 45%);
  background: rgb(59 130 246 / 12%);
  color: #93c5fd;
  font-weight: 600;
}

.nt-btn:disabled {
  opacity: 0.55;
  cursor: default;
}

/* 操作提示：一行，位置常驻（换文案不改变高度） */
.nt-hint {
  overflow: hidden;

  margin: 0;

  color: rgb(226 168 70 / 85%);

  font-size: 0.74rem;
  line-height: 1.35;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── 结论：跑完才"弹"出来 ──
   高度由 flex 分配（不是由文字行数撑出来的）⇒ 结论出现、文案换行都不会顶跑上下两块；
   没跑完时框子只是虚线占位、里面的结论文字 visibility: hidden（占位照旧，不提前给答案）。
   左竖线（--on）全页只此一处强调。 */
.nt-conclusion {
  display: grid;
  flex: 1 1 auto;
  place-items: center;

  min-height: 4rem;
  max-height: 9rem;
  margin: 0;
  padding: 0.6rem 1rem;
  border: 1px dashed rgb(148 163 184 / 16%);
  border-radius: 0.7rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.16rem;
  line-height: 1.4;
  text-align: center;

  transition:
    background 0.32s ease,
    border-color 0.32s ease;
}

/* 提示与结论叠在同一个网格单元里：换文案不会改变框的高度与位置 */
.nt-conclusion-hint,
.nt-conclusion-text {
  grid-area: 1 / 1;
}

.nt-conclusion-hint {
  color: var(--c-text-dim);
  font-weight: 500;
  font-size: 0.86rem;
  transition: opacity 0.32s ease;
}

.nt-conclusion-on .nt-conclusion-hint {
  opacity: 0;
}

.nt-conclusion-text {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.32s ease,
    transform 0.32s ease;
  transform: translateY(6px);
}

.nt-conclusion-on {
  border-color: transparent;
  border-left: 3px solid var(--c-accent);
  border-radius: 0 0.7rem 0.7rem 0;
  background: rgb(226 168 70 / 10%);
}

.nt-conclusion-on .nt-conclusion-text {
  opacity: 1;
  visibility: visible;
  transform: none;
}

/* ── 读数：谁在哪一行、值是多少，值变长变短都不推挤布局 ── */
.nt-read {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  padding-top: 0.4rem;
  border-top: 1px solid var(--c-border);

  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
}

.nt-read-row {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  justify-content: space-between;

  min-width: 0;
}

.nt-read-label {
  color: var(--c-text-dim);
}

.nt-read-row-feather {
  color: var(--c-accent);
}

.nt-read-row-iron {
  color: #cbd5e1;
}

/* ── 右栏：管子尽量占满页高（340px；这一页正文容器约 435px，还要放提问与结论） ── */
.nt-tube {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  height: auto;
}

/* 高度主导：height: 372px + aspect-ratio ⇒ 宽度 = 372 × 264/290 ≈ 339px */
.nt-svg {
  display: block;

  width: auto;
  max-width: 100%;
  height: 372px;
  aspect-ratio: 264 / 290;

  cursor: pointer;
}

/* ── 玻璃管与管内元素 ── */
.tube-shell {
  stroke: var(--c-text-dim);
  stroke-opacity: 0.45;
  stroke-width: 2;
}

.tube-cavity {
  fill: rgb(9 13 26 / 62%);
}

.tube-shine {
  stroke: rgb(226 232 240 / 18%);
  stroke-linecap: round;
  stroke-width: 4;
}

.valve {
  fill: rgb(148 163 184 / 30%);
  stroke: var(--c-text-dim);
  stroke-opacity: 0.5;
  stroke-width: 1.2;
}

.air-molecule {
  fill: var(--c-text-dim);
}

.air-group {
  transition: opacity 0.35s ease;
}

.start-line {
  stroke: var(--c-text-dim);
  stroke-dasharray: 5 5;
  stroke-opacity: 0.4;
  stroke-width: 1.2;
}

.sync-line {
  stroke: var(--c-accent);
  stroke-dasharray: 4 5;
  stroke-opacity: 0.6;
  stroke-width: 1.4;
}

.pad-base {
  stroke: var(--c-text-dim);
  stroke-linecap: round;
  stroke-opacity: 0.28;
  stroke-width: 3;
}

/* 落地短线：底色常驻，谁落地谁点亮（真空下两条同时亮 = 同时落地） */
.pad-flag {
  transition:
    stroke 0.2s ease,
    stroke-opacity 0.2s ease;

  stroke: var(--c-text-dim);
  stroke-linecap: round;
  stroke-opacity: 0.3;
  stroke-width: 4;
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
  stroke: rgb(255 255 255 / 55%);
  stroke-linecap: round;
  stroke-width: 1.6;
}

.feather-barb {
  stroke: rgb(255 255 255 / 35%);
  stroke-linecap: round;
  stroke-width: 1;
}

.iron-body {
  fill: #cbd5e1;
  stroke: #94a3b8;
  stroke-width: 1.1;
}

.iron-top {
  fill: #e2e8f0;
  stroke: #94a3b8;
  stroke-width: 1.1;
}

/* ── SVG 文字：量用 KaTeX_Math 斜体、单位用 KaTeX_Main 正体（SVG 里嵌不了 <Latex>） ── */
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
</style>
