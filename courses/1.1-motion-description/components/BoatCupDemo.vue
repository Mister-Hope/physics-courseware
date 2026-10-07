<!-- 1.1 例题：顺流而下的船与水杯——可切换「地面 / 水」参考系的动画场景 -->
<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

type Frame = "ground" | "water";

const { interactive = true } = defineProps<{
  /** False = 只当静态题目图用：不显示参考系状态、按钮与时间轴，也不播放 */
  interactive?: boolean;
}>();

// 场景几何（viewBox 1000 × 300，画面顶部裁掉 24 单位空天）
const BRIDGE_X = 430; // 石拱桥中心（地面坐标）
const U_PX = 150; // 水在一个 T₀ 内相对地面的位移
const V_PX = 260; // 船在一个 T₀ 内相对水的位移
const TAU_MAX = 2; // 落水 → 捡起，共 2T₀
const T0_SEC = 3.4; // 屏幕上一个 T₀ 对应的秒数
const TILE = 1040; // 景物循环周期（芦苇间距 80、波纹间距 40 的公倍数，接缝不跳变）

// 同页/相邻页可能同时存在多个实例：渐变 id 必须唯一，否则第二个实例取不到 paint server
const uid = Math.random().toString(36).slice(2, 8);

const frame = ref<Frame>("ground");
// 静态题目图（interactive=false）默认定格在刚过桥洞落水后的瞬间（tau=0.36），使拱桥、漂流的水杯与顺流小船三者层次分明互不重叠
const tau = ref(interactive ? 0 : 0.36);
const running = ref(false);

let timer: ReturnType<typeof setInterval> | null = null;

const stop = (): void => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  running.value = false;
};

const start = (): void => {
  if (timer) return;
  running.value = true;
  timer = setInterval(() => {
    tau.value += 0.033 / T0_SEC;
    if (tau.value >= TAU_MAX) {
      tau.value = TAU_MAX;
      stop();
    }
  }, 33);
};

const togglePlay = (): void => {
  if (tau.value >= TAU_MAX) {
    tau.value = 0;
    start();
    return;
  }
  if (running.value) stop();
  else start();
};

const seekTo = (targetTau: number): void => {
  stop();
  tau.value = Math.max(0, Math.min(TAU_MAX, targetTau));
};

// 切换参考系时保留同一时刻：同一瞬间，换个"不动的东西"再看一遍
const switchFrame = (): void => {
  frame.value = frame.value === "ground" ? "water" : "ground";
};

if (interactive) start();
onUnmounted(stop);

const atEnd = computed(() => tau.value >= TAU_MAX - 1e-6);
const showTurn = computed(() => interactive && Math.abs(tau.value - 1) < 0.14);

// 水系的画面 = 地面系的画面整体左移（地面相对水向上游退）
const groundShift = computed(() => (frame.value === "water" ? -U_PX * tau.value : 0));
const waterShift = computed(() => (frame.value === "ground" ? U_PX * tau.value : 0));

const bridgeX = computed(() => BRIDGE_X + groundShift.value);
// 水杯随水漂：地面坐标 BRIDGE_X + u·t
const cupGroundX = computed(() => BRIDGE_X + U_PX * tau.value);
const cupX = computed(() => cupGroundX.value + groundShift.value);
// 船：顺流段 (v+u)·t；掉头后逆流段 (v+u)T₀ − (v−u)(t−T₀)
const boatX = computed(() => {
  const t = tau.value;
  const rel = t <= 1 ? (V_PX + U_PX) * t : V_PX + U_PX - (V_PX - U_PX) * (t - 1);
  return BRIDGE_X + rel + groundShift.value;
});
const boatFacing = computed(() => (tau.value <= 1 ? 1 : -1));
// 船夫划桨摆角（随时间轻柔摇橹）
const oarSwing = computed(() => (running.value ? Math.sin(tau.value * Math.PI * 7) * 8 : 0));

const wrap = (x: number, period: number): number => ((x % period) + period) % period;

// 水面波纹：地面系下向右漂，水系下静止
const RIPPLE_ROWS = [
  { y: 190, len: 24, phase: 0 },
  { y: 214, len: 34, phase: 18 },
  { y: 240, len: 20, phase: 6 },
  { y: 268, len: 38, phase: 26 },
];
const RIPPLES = RIPPLE_ROWS.flatMap((row) =>
  Array.from({ length: 26 }, (_, i) => ({ y: row.y, len: row.len, x: i * 40 + row.phase })),
);
const ripples = computed(() =>
  RIPPLES.map((r) => ({ y: r.y, len: r.len, sx: wrap(r.x + waterShift.value, TILE) })),
);

// 对岸芦苇：地面系下静止，水系下向左退
const REED_BASES = Array.from({ length: 15 }, (_, i) => -80 + i * 80);
const reeds = computed(() => REED_BASES.map((x) => wrap(x + groundShift.value + 80, TILE) - 80));
</script>

<template>
  <div class="bcd-wrap">
    <div v-if="interactive" class="bcd-header">
      <div class="bcd-state">
        <span class="bcd-dot" :class="frame" />
        <span>参考系：{{ frame === "ground" ? "地面（石拱桥静止）" : "水（水杯静止）" }}</span>
        <span class="bcd-hint">
          ·
          {{
            frame === "ground"
              ? "水杯随水流漂走，船顺流快、逆流慢"
              : "水杯停在原处，船以等速 v 去而复返"
          }}
        </span>
      </div>
      <div class="bcd-right">
        <span class="bcd-time"> <Latex tex="t" /> = {{ tau.toFixed(2) }}<Latex tex="T_0" /> </span>
        <button class="bcd-btn" type="button" @click="switchFrame">切换参考系</button>
        <button class="bcd-btn ghost" type="button" @click="togglePlay">
          {{ atEnd ? "重播" : running ? "暂停" : "继续" }}
        </button>
      </div>
    </div>

    <svg
      viewBox="0 24 1000 276"
      class="bcd-svg"
      role="img"
      :aria-label="`小船与水杯：以${frame === 'ground' ? '地面' : '水'}为参考系`"
    >
      <defs>
        <linearGradient :id="`bcd-${uid}-sky`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#070b16" />
          <stop offset="65%" stop-color="#131f36" />
          <stop offset="100%" stop-color="#1e2f4d" />
        </linearGradient>
        <linearGradient :id="`bcd-${uid}-water`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a385e" />
          <stop offset="55%" stop-color="#102542" />
          <stop offset="100%" stop-color="#091324" />
        </linearGradient>
        <linearGradient :id="`bcd-${uid}-bank`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2b3b54" />
          <stop offset="100%" stop-color="#151f30" />
        </linearGradient>
        <linearGradient :id="`bcd-${uid}-stone`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8b97a8" />
          <stop offset="55%" stop-color="#5d697a" />
          <stop offset="100%" stop-color="#3c4554" />
        </linearGradient>
        <linearGradient :id="`bcd-${uid}-hull`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c68a4b" />
          <stop offset="55%" stop-color="#96602c" />
          <stop offset="100%" stop-color="#5c3614" />
        </linearGradient>
      </defs>

      <!-- ==================== 1. 夜空与远山层峦 ==================== -->
      <rect x="0" y="0" width="1000" height="150" :fill="`url(#bcd-${uid}-sky)`" />
      <!-- 远山剪影（随地面缓慢移动，增强空间纵深） -->
      <path
        :transform="`translate(${groundShift * 0.35}, 0)`"
        d="M -200 142 Q -60 92 90 126 Q 240 84 410 128 Q 560 88 730 124 Q 890 86 1060 128 Q 1180 98 1320 142 Z"
        fill="rgba(30, 41, 59, 0.55)"
      />

      <!-- ==================== 2. 远岸青石驳岸与芦苇丛（随地面一起动） ==================== -->
      <rect x="0" y="140" width="1000" height="28" :fill="`url(#bcd-${uid}-bank)`" />
      <line x1="0" y1="140" x2="1000" y2="140" stroke="rgba(148,163,184,0.35)" stroke-width="1.4" />
      <line
        x1="0"
        y1="154"
        x2="1000"
        y2="154"
        stroke="rgba(15,23,42,0.4)"
        stroke-width="1.2"
        stroke-dasharray="18 8"
      />
      <g
        v-for="(rx, i) in reeds"
        :key="i"
        :transform="`translate(${rx}, 0)`"
        fill="none"
        stroke="#5c8d61"
        stroke-width="1.7"
        stroke-linecap="round"
      >
        <path d="M -3 140 Q -6 131 -8 124" />
        <path d="M 0 140 Q 1 129 2 121" />
        <path d="M 3 140 Q 7 132 10 126" />
        <!-- 芦苇蒲棒穗头 -->
        <ellipse cx="1.8" cy="123" rx="1.3" ry="3.2" fill="#a3b18a" stroke="none" />
      </g>

      <!-- ==================== 3. 河水与流向/后退方向指示 ==================== -->
      <rect x="0" y="168" width="1000" height="132" :fill="`url(#bcd-${uid}-water)`" />
      <line x1="0" y1="168" x2="1000" y2="168" stroke="rgba(147,197,253,0.55)" stroke-width="1.6" />
      <g stroke="rgba(147,197,253,0.28)" stroke-width="1.6" stroke-linecap="round">
        <line
          v-for="(r, i) in ripples"
          :key="i"
          :x1="r.sx"
          :y1="r.y"
          :x2="r.sx + r.len"
          :y2="r.y"
        />
      </g>

      <!-- 左上角流向/桥岸运动方向提示胶囊 -->
      <g>
        <rect
          x="22"
          y="36"
          width="136"
          height="36"
          rx="8"
          fill="rgba(15,23,42,0.62)"
          stroke="rgba(147,197,253,0.28)"
          stroke-width="1"
        />
        <text x="90" y="50" text-anchor="middle" style="font-size: 10.5px" fill="#93c5fd">
          {{ frame === "ground" ? "水流方向 (u)" : "桥与河岸后退方向 (−u)" }}
        </text>
        <g
          fill="none"
          stroke="#93c5fd"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            :d="
              frame === 'ground'
                ? 'M 52 62 H 126 M 118 57 L 127 62 L 118 67'
                : 'M 128 62 H 54 M 62 57 L 53 62 L 62 67'
            "
          />
        </g>
      </g>

      <!-- ==================== 4. 水下参考系位移标尺（帮助一眼看懂水参考系下为什么去返时间相等！） ==================== -->
      <g v-if="interactive && tau > 0.02">
        <!-- 水参考系下：以落水处 (BRIDGE_X=430) 为不动原点，去程与返程对称等于 v·T₀ -->
        <template v-if="frame === 'water'">
          <line
            :x1="BRIDGE_X"
            y1="264"
            :x2="BRIDGE_X + V_PX"
            y2="264"
            stroke="rgba(96,165,250,0.45)"
            stroke-width="1.6"
            stroke-dasharray="5 4"
          />
          <circle :cx="BRIDGE_X" cy="264" r="3" fill="#60a5fa" />
          <circle :cx="BRIDGE_X + V_PX" cy="264" r="3" fill="#e2a846" />
          <text
            :x="BRIDGE_X + V_PX / 2"
            y="280"
            text-anchor="middle"
            style="font-size: 11px"
            fill="#93c5fd"
          >
            相对水：水杯不动，去程与返程距离均为
            <tspan font-family="KaTeX_Math" font-style="italic">vT</tspan>
            <tspan font-family="KaTeX_Main" font-size="8.5" dy="2.5">0</tspan>
            <tspan dy="-2.5">，速率均为</tspan>
            <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          </text>
        </template>
        <!-- 地面参考系下：标出桥基准线、水杯漂移与小船折返轨迹 -->
        <template v-else>
          <line
            :x1="BRIDGE_X"
            y1="264"
            :x2="cupX"
            y2="264"
            stroke="rgba(56,189,248,0.55)"
            stroke-width="2"
          />
          <circle :cx="BRIDGE_X" cy="264" r="2.8" fill="#94a3b8" />
          <circle :cx="cupX" cy="264" r="3" fill="#38bdf8" />
        </template>
      </g>

      <!-- ==================== 5. 轻舟与戴斗笠船夫（先画船，过桥洞时从拱洞中透出） ==================== -->
      <g :transform="`translate(${boatX}, 0) scale(${boatFacing}, 1)`">
        <!-- 船底吃水线波浪与船尾水花 -->
        <ellipse cx="0" cy="166" rx="50" ry="4.5" fill="rgba(147,197,253,0.18)" />
        <path
          d="M -52 165 Q -32 169 -12 166 M 24 166 Q 42 169 54 164"
          fill="none"
          stroke="rgba(186,230,253,0.55)"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <!-- 船夫身体与衣衫（位于船舱内） -->
        <path
          d="M -22 149 C -22 128 -2 128 -2 149 Z"
          fill="#e2a846"
          stroke="#fef08a"
          stroke-width="1"
        />
        <!-- 船夫头部 -->
        <circle cx="-12" cy="121" r="6.8" fill="#f1f5f9" />
        <!-- 江南船夫竹编斗笠 -->
        <path
          d="M -25 119 Q -12 108 1 119 Z"
          fill="#d4a373"
          stroke="#fef08a"
          stroke-width="1.1"
          stroke-linejoin="round"
        />

        <!-- 传统翘首木船船体 -->
        <path
          d="M -50 144 Q -42 147 -32 148 H 30 Q 42 147 52 141 L 41 163 Q 0 173 -40 163 Z"
          :fill="`url(#bcd-${uid}-hull)`"
          stroke="#eab308"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
        <!-- 船舷木质护条与船篷横档 -->
        <line
          x1="-38"
          y1="152"
          x2="36"
          y2="152"
          stroke="rgba(254,240,138,0.5)"
          stroke-width="1.3"
          stroke-linecap="round"
        />
        <line
          x1="-28"
          y1="158"
          x2="28"
          y2="158"
          stroke="rgba(15,23,42,0.35)"
          stroke-width="1.2"
          stroke-linecap="round"
        />

        <!-- 船夫手臂与动态摇动的木桨 -->
        <g :transform="`rotate(${oarSwing}, 4, 138)`">
          <line
            x1="-6"
            y1="136"
            x2="10"
            y2="142"
            stroke="#f8fafc"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <line
            x1="4"
            y1="138"
            x2="42"
            y2="167"
            stroke="#cbd5e1"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <ellipse
            cx="45"
            cy="169.5"
            rx="4.5"
            ry="9"
            transform="rotate(-36 45 169.5)"
            fill="#e2e8f0"
            stroke="#94a3b8"
            stroke-width="1"
          />
        </g>
      </g>

      <!-- ==================== 6. 漂流的水杯（位于近景水面 y=178，与船身错开绝不互相遮挡） ==================== -->
      <g :transform="`translate(${cupX}, 0)`">
        <!-- 水杯周围的同心水波涟漪 -->
        <ellipse
          cx="0"
          cy="181"
          rx="18"
          ry="5"
          fill="none"
          stroke="rgba(125,211,252,0.35)"
          stroke-width="1.2"
        />
        <ellipse cx="0" cy="181" rx="11" ry="3.2" fill="rgba(56,189,248,0.22)" />
        <!-- 水杯杯身（微倾漂浮感） -->
        <g transform="rotate(8 0 174)">
          <path
            d="M -6.5 165 H 6.5 L 5 180 Q 0 182.5 -5 180 Z"
            fill="#f8fafc"
            stroke="#38bdf8"
            stroke-width="1.3"
            stroke-linejoin="round"
          />
          <!-- 杯身亮色装饰腰线 -->
          <line x1="-5.8" y1="171" x2="5.8" y2="171" stroke="#38bdf8" stroke-width="2.2" />
          <!-- 水杯把手 -->
          <path
            d="M 6.2 168 Q 11.5 172 5.6 177"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
      </g>

      <!-- ==================== 7. 关键时刻浮动提示气泡 ==================== -->
      <!-- 掉头提示 (t = T₀) -->
      <g v-if="showTurn" :transform="`translate(${boatX}, 0)`">
        <rect
          x="-98"
          y="198"
          width="196"
          height="28"
          rx="14"
          fill="rgba(15,23,42,0.88)"
          stroke="rgba(226,168,70,0.75)"
          stroke-width="1.3"
        />
        <text
          x="0"
          y="216.5"
          text-anchor="middle"
          style="font-weight: 600; font-size: 12px"
          fill="#fbbf24"
        >
          发现水杯丢了，立即掉头
        </text>
      </g>

      <!-- 结果提示 (t = 2T₀)：又经过一个 T₀ 追上水杯 -->
      <g v-if="atEnd" :transform="`translate(${boatX}, 0)`">
        <rect
          x="-106"
          y="198"
          width="212"
          height="28"
          rx="14"
          fill="rgba(15,23,42,0.88)"
          stroke="rgba(96,165,250,0.75)"
          stroke-width="1.3"
        />
        <text
          x="0"
          y="216.5"
          text-anchor="middle"
          style="font-weight: 600; font-size: 12px"
          fill="#93c5fd"
        >
          又经过
          <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
          <tspan font-family="KaTeX_Main" font-size="9" dy="3">0</tspan>
          <tspan dy="-3">，追上水杯</tspan>
        </text>
      </g>

      <!-- ==================== 8. 江南青石拱桥（随地面移动；高拱洞让船与水杯从洞中清晰穿过） ==================== -->
      <g :transform="`translate(${bridgeX}, 0)`">
        <!-- 桥墩水中倒影 -->
        <rect x="-80" y="236" width="30" height="20" fill="rgba(15,23,42,0.32)" />
        <rect x="50" y="236" width="30" height="20" fill="rgba(15,23,42,0.32)" />

        <!-- 石拱桥主体（微拱桥面 + 半圆高拱洞 -52..52） -->
        <path
          d="M -82 60 Q 0 48 82 60 V 236 H 52 V 166 A 52 70 0 0 0 -52 166 V 236 H -82 Z"
          :fill="`url(#bcd-${uid}-stone)`"
          stroke="#334155"
          stroke-width="1.6"
          stroke-linejoin="round"
        />

        <!-- 拱券石圈（拱洞边缘厚石块包边） -->
        <path
          d="M -52 236 V 166 A 52 70 0 0 1 52 166 V 236"
          fill="none"
          stroke="#1e293b"
          stroke-width="5.5"
          stroke-linecap="round"
        />
        <path
          d="M -55 166 A 55 73 0 0 1 55 166"
          fill="none"
          stroke="rgba(226,232,240,0.35)"
          stroke-width="1.4"
          stroke-dasharray="8 4"
        />

        <!-- 桥身青石砖缝纹理 -->
        <g stroke="rgba(15,23,42,0.32)" stroke-width="1.1">
          <line
            v-for="py in [82, 108, 134, 162, 192, 218]"
            :key="`l${py}`"
            x1="-81"
            :y1="py"
            x2="-53"
            :y2="py"
          />
          <line
            v-for="py in [82, 108, 134, 162, 192, 218]"
            :key="`r${py}`"
            x1="53"
            :y1="py"
            x2="81"
            :y2="py"
          />
          <line x1="-67" y1="82" x2="-67" y2="108" />
          <line x1="-67" y1="134" x2="-67" y2="162" />
          <line x1="67" y1="82" x2="67" y2="108" />
          <line x1="67" y1="134" x2="67" y2="162" />
        </g>

        <!-- 桥墩底部防冲石座 -->
        <rect
          x="-85"
          y="228"
          width="36"
          height="9"
          rx="2"
          fill="#475569"
          stroke="#1e293b"
          stroke-width="1.2"
        />
        <rect
          x="49"
          y="228"
          width="36"
          height="9"
          rx="2"
          fill="#475569"
          stroke="#1e293b"
          stroke-width="1.2"
        />

        <!-- 弧形桥面压顶石与中式石栏杆、望柱 -->
        <path
          d="M -88 50 Q 0 38 88 50 L 86 61 Q 0 49 -86 61 Z"
          fill="#64748b"
          stroke="#94a3b8"
          stroke-width="1.2"
        />
        <!-- 栏杆扶手横梁 -->
        <path
          d="M -86 37 Q 0 26 86 37"
          fill="none"
          stroke="#cbd5e1"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <!-- 栏杆望柱与柱头 -->
        <g v-for="px in [-78, -52, -26, 0, 26, 52, 78]" :key="px">
          <line
            :x1="px"
            :y1="32 + (px * px) / 1200"
            :x2="px"
            :y2="49 + (px * px) / 1200"
            stroke="#cbd5e1"
            stroke-width="2.2"
          />
          <circle :cx="px" :cy="31 + (px * px) / 1200" r="2.2" fill="#e2e8f0" />
        </g>
      </g>
    </svg>

    <div v-if="interactive" class="bcd-timeline" aria-hidden="true">
      <div class="bcd-track">
        <span class="bcd-track-fill" :style="{ width: `${(tau / TAU_MAX) * 100}%` }" />
        <span class="bcd-track-tick" />
      </div>
      <div class="bcd-labels">
        <span class="bcd-step-link" @click="seekTo(0)">0 · 水杯落水</span>
        <span class="bcd-step-link" @click="seekTo(1)">T₀ · 发现并掉头</span>
        <span class="bcd-step-link" @click="seekTo(2)">2T₀ · 捡起水杯</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bcd-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.bcd-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
  align-items: center;
  justify-content: space-between;
}

.bcd-state {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;

  color: #cbd5e1;

  font-weight: 600;
  font-size: 0.78rem;
}

.bcd-dot {
  flex-shrink: 0;

  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;

  background: #e2a846;
  box-shadow: 0 0 8px rgb(226 168 70 / 60%);
}

.bcd-dot.water {
  background: #60a5fa;
  box-shadow: 0 0 8px rgb(96 165 250 / 60%);
}

.bcd-hint {
  color: #94a3b8;
  font-weight: 500;
}

.bcd-right {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.55rem;
  align-items: center;
}

.bcd-time {
  color: #94a3b8;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.bcd-math {
  font-style: italic;
  font-family: "KaTeX_Math", "Times New Roman", serif;
}

.bcd-math sub {
  font-style: normal;
  font-size: 0.75em;
  font-family: "KaTeX_Main", sans-serif;
}

.bcd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.22rem 0.75rem;
  border: 1px solid rgb(226 168 70 / 50%);
  border-radius: 1.5rem;

  background: linear-gradient(135deg, rgb(226 168 70 / 24%), rgb(226 168 70 / 8%));
  color: #e2a846;
  box-shadow: 0 2px 8px rgb(226 168 70 / 12%);

  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.02em;

  cursor: pointer;

  transition: all 0.25s ease;
}

.bcd-btn.ghost {
  border-color: rgb(148 163 184 / 40%);
  background: linear-gradient(135deg, rgb(148 163 184 / 18%), rgb(148 163 184 / 6%));
  color: #cbd5e1;
  box-shadow: 0 2px 8px rgb(15 23 42 / 20%);
}

.bcd-btn:hover {
  box-shadow: 0 4px 12px rgb(226 168 70 / 22%);
  filter: brightness(1.15);
}

.bcd-btn:active {
  filter: brightness(0.98);
}

.bcd-svg {
  display: block;

  width: 100%;
  height: auto;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.1rem;

  background: rgb(15 20 37 / 40%);
}

.bcd-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
}

.bcd-track {
  position: relative;
  height: 4px;
  border-radius: 2px;
  background: rgb(148 163 184 / 18%);
}

.bcd-track-fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 2px;
  background: linear-gradient(90deg, #e2a846, #60a5fa);
}

.bcd-track-tick {
  position: absolute;
  top: -3px;
  left: 50%;

  width: 2px;
  height: 10px;
  border-radius: 1px;

  background: rgb(226 232 240 / 55%);
}

.bcd-labels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: #7b8798;
  font-size: 0.66rem;
}

.bcd-step-link {
  cursor: pointer;
  transition: color 0.15s ease;
}

.bcd-step-link:hover {
  color: #e2e8f0;
}

.bcd-labels > span:nth-child(2) {
  text-align: center;
}

.bcd-labels > span:last-child {
  text-align: right;
}
</style>
