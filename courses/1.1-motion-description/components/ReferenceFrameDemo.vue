<script setup lang="ts">
import { onUnmounted, ref } from "vue";

const frame = ref<"ground" | "train">("ground");
const offset = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

// 三节车厢（含车钩）总宽，列车局部坐标 x ∈ [0, 296]
const TRAIN_WIDTH = 296;
// 地面系行程：从完全在左侧画面外，到完全驶出右侧画面外
const TRAVEL = 640 + TRAIN_WIDTH;
// 景物周期：同时是地面砖间距 40 与枕木间距 60 的整数倍，保证循环接缝无缝
const PERIOD = 360;
// Offset 的上限，取 TRAVEL、PERIOD 与远景周期（PERIOD / 0.4）的公倍数
const CYCLE = 23_400;
// 车厢系下列车固定的居中位置
const TRAIN_FIXED_X = (640 - TRAIN_WIDTH) / 2;
// 每帧位移（33ms），景物的后退速度和它一致
const STEP = 2.4;

const toggle = (): void => {
  frame.value = frame.value === "ground" ? "train" : "ground";
  offset.value = 0;
};

const start = (): void => {
  if (timer) return;
  timer = setInterval(() => {
    offset.value = (offset.value + STEP) % CYCLE;
  }, 33);
};

const stop = (): void => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// 地面系：列车向右匀速开过整幅画面；车厢系：列车固定在画面中央
const trainX = (): number =>
  frame.value === "ground" ? -TRAIN_WIDTH + (offset.value % TRAVEL) : TRAIN_FIXED_X;

// 窗外景物：地面系静止，车厢系向左后退（对周期取模，接缝处不跳变）
const sceneryShift = (): number => (frame.value === "ground" ? 0 : -(offset.value % PERIOD));

// 远处城市：视差更慢，用来表现景深；同样按周期取模
const farShift = (): number => (frame.value === "ground" ? 0 : -((offset.value * 0.4) % PERIOD));

// 景物在周期内排布一次，再整周期复制若干份，滚动到边界时刚好首尾接续
const TILES = [-360, 0, 360, 720, 1080];

const trees = TILES.flatMap((tile) => [52, 236].map((base) => base + tile));
const poles = TILES.map((tile) => 176 + tile);
const observers = TILES.map((tile) => ({ x: 300 + tile, labeled: tile === 0 }));
// 车厢系下的速度线（拖在景物右侧，因为景物整体向左退）
const streaks = TILES.flatMap((tile) => [
  { x: 26 + tile, y: 192, len: 26 },
  { x: 130 + tile, y: 178, len: 18 },
  { x: 232 + tile, y: 200, len: 30 },
  { x: 318 + tile, y: 186, len: 22 },
]);

// 远景楼房（周期内一组，整体按 farShift 缓慢平移）
const buildings = TILES.flatMap((tile) => [
  { x: 12 + tile, y: 112, width: 34, height: 56, opacity: 1 },
  { x: 54 + tile, y: 128, width: 22, height: 40, opacity: 0.8 },
  { x: 86 + tile, y: 118, width: 30, height: 50, opacity: 0.9 },
  { x: 176 + tile, y: 104, width: 40, height: 64, opacity: 1 },
  { x: 226 + tile, y: 126, width: 24, height: 42, opacity: 0.85 },
  { x: 282 + tile, y: 116, width: 30, height: 52, opacity: 0.95 },
]);

// 地面砖（间距 40）与枕木（间距 60），都覆盖到 -400…1080 保证滚动时铺满画面
const bricks = Array.from({ length: 38 }, (_, i) => i * 40 - 400);
const ties = Array.from({ length: 26 }, (_, i) => i * 60 - 420);

// 道砟碎石的点缀（确定性伪随机，避免每帧重算）
const speckles = Array.from({ length: 26 }, (_, i) => ({
  x: -400 + i * 58 + ((i * 37) % 23),
  y: 184 + ((i * 53) % 42),
  r: 1 + ((i * 17) % 3) * 0.4,
}));

// 星空（避开顶部居中文字）
const stars = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 97) % 620,
  y: 10 + ((i * 61) % 96),
  r: 0.7 + ((i * 13) % 3) * 0.35,
  opacity: 0.2 + ((i * 29) % 40) / 100,
})).filter((star) => star.x < 130 || star.x > 510 || star.y < 24);

// 三节车厢：最后一节是带风挡的车头
const CARS = [
  { x: 0, cab: false },
  { x: 100, cab: false },
  { x: 200, cab: true },
];

start();

onUnmounted(stop);
</script>

<template>
  <div class="demo-wrap">
    <div class="demo-header">
      <div class="frame-state">
        <span class="frame-dot" :class="frame" />
        <span>参考系：{{ frame === "ground" ? "地面" : "车厢" }}</span>
        <span class="passenger-state" :class="frame">
          · 乘客{{ frame === "ground" ? "随车运动" : "静止" }}
        </span>
      </div>
      <button class="switch-btn" type="button" @click="toggle">切换参考系</button>
    </div>

    <svg
      viewBox="0 0 640 300"
      class="demo-svg"
      role="img"
      aria-label="参考系演示：同一辆列车，两种看法"
    >
      <defs>
        <linearGradient id="rfd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#070b16" />
          <stop offset="55%" stop-color="#101a33" />
          <stop offset="100%" stop-color="#22304f" />
        </linearGradient>
        <linearGradient id="rfd-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1d2a44" />
          <stop offset="45%" stop-color="#151d31" />
          <stop offset="100%" stop-color="#0c1120" />
        </linearGradient>
        <linearGradient id="rfd-ballast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2b3a58" />
          <stop offset="100%" stop-color="#1a2336" />
        </linearGradient>
        <linearGradient id="rfd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#33538f" />
          <stop offset="45%" stop-color="#243a6b" />
          <stop offset="100%" stop-color="#16244a" />
        </linearGradient>
        <linearGradient id="rfd-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#070c18" />
          <stop offset="100%" stop-color="#1a2740" />
        </linearGradient>
        <linearGradient id="rfd-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#64748b" />
        </linearGradient>
        <radialGradient id="rfd-lamp">
          <stop offset="0%" stop-color="rgba(253,230,138,0.55)" />
          <stop offset="100%" stop-color="rgba(253,230,138,0)" />
        </radialGradient>
        <radialGradient id="rfd-sun">
          <stop offset="0%" stop-color="rgba(226,168,70,0.34)" />
          <stop offset="100%" stop-color="rgba(226,168,70,0)" />
        </radialGradient>
      </defs>

      <!-- 天空 -->
      <rect x="0" y="0" width="640" height="176" fill="url(#rfd-sky)" />
      <g fill="#e2e8f0">
        <circle
          v-for="(star, i) in stars"
          :key="i"
          :cx="star.x"
          :cy="star.y"
          :r="star.r"
          :opacity="star.opacity"
        />
      </g>
      <!-- 月亮（在无穷远处，两个参考系里都不动） -->
      <circle cx="523" cy="52" r="34" fill="url(#rfd-sun)" />
      <circle cx="523" cy="52" r="9" fill="#f8fafc" opacity="0.82" />
      <!-- 地平线暖光 -->
      <rect x="0" y="150" width="640" height="26" fill="rgba(226,168,70,0.07)" />

      <!-- 远景：城市轮廓（视差更慢） -->
      <g :transform="`translate(${farShift()}, 0)`">
        <rect
          v-for="(house, i) in buildings"
          :key="i"
          :x="house.x"
          :y="house.y"
          :width="house.width"
          :height="house.height"
          :opacity="house.opacity"
          fill="#1b2745"
        />
        <g fill="#e2a846" opacity="0.35">
          <rect
            v-for="(house, i) in buildings"
            :key="`w${i}`"
            :x="house.x + 5"
            :y="house.y + 12"
            width="3"
            height="3"
            rx="0.8"
          />
        </g>
        <rect x="-400" y="166" width="1440" height="6" fill="#0f1729" />
      </g>

      <!-- 地面 -->
      <rect x="0" y="166" width="640" height="134" fill="url(#rfd-ground)" />

      <!-- ── 窗外景物（地面系静止 / 车厢系整体向左后退） ── -->
      <g :transform="`translate(${sceneryShift()}, 0)`">
        <!-- 道砟 -->
        <rect x="-400" y="176" width="1440" height="66" fill="url(#rfd-ballast)" />
        <g fill="rgba(148,163,184,0.25)">
          <circle
            v-for="(speck, i) in speckles"
            :key="i"
            :cx="speck.x"
            :cy="speck.y"
            :r="speck.r"
          />
        </g>

        <!-- 电线杆（含接触网） -->
        <g v-for="poleX in poles" :key="poleX">
          <rect :x="poleX - 3.5" y="100" width="7" height="92" rx="2" fill="#3f4c63" />
          <rect :x="poleX - 26" y="110" width="52" height="4.5" rx="2" fill="#4b5a73" />
          <line
            :x1="poleX"
            y1="112"
            :x2="poleX + 22"
            y2="122"
            stroke="#4b5a73"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <line
            :x1="poleX"
            y1="112"
            :x2="poleX - 22"
            y2="122"
            stroke="#4b5a73"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </g>
        <line x1="-400" y1="110" x2="1100" y2="110" stroke="#4b5a73" stroke-width="1.6" />

        <!-- 树 -->
        <g v-for="treeX in trees" :key="treeX">
          <rect :x="treeX - 4" y="162" width="8" height="34" rx="3" fill="#6b4423" />
          <ellipse :cx="treeX" cy="152" rx="26" ry="22" fill="#14532d" opacity="0.9" />
          <ellipse :cx="treeX - 15" cy="160" rx="16" ry="13" fill="#166534" opacity="0.75" />
          <ellipse :cx="treeX + 14" cy="158" rx="15" ry="12" fill="#15803d" opacity="0.7" />
          <ellipse :cx="treeX - 4" cy="142" rx="15" ry="12" fill="#22c55e" opacity="0.35" />
        </g>

        <!-- 枕木 + 铁轨 -->
        <g>
          <rect
            v-for="tieX in ties"
            :key="tieX"
            :x="tieX"
            y="204"
            width="14"
            height="30"
            rx="2.5"
            fill="#3b4761"
          />
          <rect
            v-for="tieX in ties"
            :key="`h${tieX}`"
            :x="tieX"
            y="204"
            width="14"
            height="4"
            rx="1.5"
            fill="#556580"
          />
        </g>
        <line x1="-400" y1="208" x2="1100" y2="208" stroke="#5b6b86" stroke-width="3" />
        <line x1="-400" y1="228" x2="1100" y2="228" stroke="url(#rfd-rail)" stroke-width="3.5" />

        <!-- 地面砖 -->
        <line x1="-400" y1="262" x2="1100" y2="262" stroke="#22304a" stroke-width="1.6" />
        <line x1="-400" y1="286" x2="1100" y2="286" stroke="#22304a" stroke-width="1.6" />
        <g stroke="#22304a" stroke-width="1.6">
          <line
            v-for="brickX in bricks"
            :key="brickX"
            :x1="brickX"
            y1="234"
            :x2="brickX"
            y2="300"
          />
        </g>

        <!-- 地面观察者（随窗外景物一起后退） -->
        <g v-for="obs in observers" :key="obs.x" :transform="`translate(${obs.x}, 0)`">
          <circle cx="0" cy="250" r="7.5" fill="#e2e8f0" />
          <rect x="-7.5" y="259" width="15" height="20" rx="5.5" fill="#3b82f6" />
          <rect x="-7.5" y="279" width="6" height="14" rx="3" fill="#1e293b" />
          <rect x="1.5" y="279" width="6" height="14" rx="3" fill="#1e293b" />
          <text
            v-if="obs.labeled"
            x="-14"
            y="272"
            text-anchor="end"
            style="font-size: 11px"
            fill="#94a3b8"
          >
            地面观察者
          </text>
        </g>

        <!-- 车厢系：景物左退的速度线 -->
        <g v-if="frame === 'train'" stroke="#7dd3fc" stroke-linecap="round">
          <line
            v-for="(streak, i) in streaks"
            :key="i"
            :x1="streak.x"
            :y1="streak.y"
            :x2="streak.x + streak.len"
            :y2="streak.y"
            stroke-width="2"
            opacity="0.3"
          />
        </g>
      </g>

      <!-- ── 列车（地面系向右行驶 / 车厢系固定在画面中央） ── -->
      <g :transform="`translate(${trainX()}, 0)`">
        <!-- 车底投影 -->
        <rect x="6" y="229" width="284" height="5" rx="2.5" fill="rgba(2,6,23,0.5)" />

        <!-- 车厢系：车厢即参考系，加一圈强调描边 -->
        <rect
          v-if="frame === 'train'"
          x="-8"
          y="124"
          width="312"
          height="108"
          rx="16"
          fill="none"
          stroke="rgba(96,165,250,0.5)"
          stroke-width="1.5"
          stroke-dasharray="8 6"
        />

        <!-- 地面系：车尾速度线 -->
        <g v-if="frame === 'ground'" stroke="#e2a846" stroke-linecap="round">
          <line x1="-14" y1="150" x2="-62" y2="150" stroke-width="2" opacity="0.5" />
          <line x1="-16" y1="168" x2="-80" y2="168" stroke-width="2.4" opacity="0.36" />
          <line x1="-12" y1="186" x2="-54" y2="186" stroke-width="2" opacity="0.28" />
          <line x1="-18" y1="204" x2="-70" y2="204" stroke-width="1.6" opacity="0.2" />
        </g>

        <!-- 三节车厢 -->
        <g v-for="car in CARS" :key="car.x">
          <path
            v-if="car.cab"
            d="M200 134 H284 Q296 137 296 154 V210 H200 Z"
            fill="url(#rfd-body)"
            stroke="#60a5fa"
            stroke-width="1.6"
          />
          <rect
            v-else
            :x="car.x"
            y="134"
            width="96"
            height="76"
            rx="9"
            fill="url(#rfd-body)"
            stroke="#60a5fa"
            stroke-width="1.6"
          />

          <!-- 车顶高光 + 裙板 -->
          <rect
            :x="car.x + 5"
            y="136"
            width="86"
            height="5"
            rx="2.5"
            fill="rgba(226,232,240,0.18)"
          />
          <rect :x="car.x + 2" y="200" width="92" height="9" rx="4" fill="rgba(8,13,26,0.62)" />

          <!-- 车窗 -->
          <rect
            :x="car.x + 11"
            y="150"
            width="30"
            height="27"
            rx="4"
            fill="url(#rfd-window)"
            stroke="rgba(148,163,184,0.45)"
          />
          <rect
            v-if="!car.cab"
            :x="car.x + 55"
            y="150"
            width="30"
            height="27"
            rx="4"
            fill="url(#rfd-window)"
            stroke="rgba(148,163,184,0.45)"
          />
          <line
            :x1="car.x + 14"
            y1="152.5"
            :x2="car.x + 38"
            y2="152.5"
            stroke="rgba(226,232,240,0.3)"
            stroke-width="1.6"
            stroke-linecap="round"
          />
          <line
            v-if="!car.cab"
            :x1="car.x + 58"
            y1="152.5"
            :x2="car.x + 82"
            y2="152.5"
            stroke="rgba(226,232,240,0.3)"
            stroke-width="1.6"
            stroke-linecap="round"
          />

          <!-- 暖金腰线（窗下装饰） -->
          <rect
            :x="car.x + 8"
            y="180.5"
            width="80"
            height="4"
            rx="2"
            fill="#e2a846"
            opacity="0.45"
          />

          <!-- 车门 -->
          <rect
            :x="car.x + 45"
            y="146"
            width="8"
            height="58"
            rx="3"
            fill="rgba(8,13,26,0.55)"
            stroke="rgba(148,163,184,0.3)"
            stroke-width="0.8"
          />

          <!-- 转向架 + 车轮 -->
          <rect :x="car.x + 12" y="205" width="72" height="9" rx="3" fill="#111827" />
          <g v-for="wheelOffset in [22, 74]" :key="wheelOffset">
            <circle
              :cx="car.x + wheelOffset"
              cy="218"
              r="8.5"
              fill="#0f172a"
              stroke="#94a3b8"
              stroke-width="1.6"
            />
            <circle :cx="car.x + wheelOffset" cy="218" r="3" fill="#475569" />
          </g>
        </g>

        <!-- 车头防风玻璃 -->
        <path
          d="M262 148 H286 Q293 150 293 162 V182 H262 Z"
          fill="url(#rfd-window)"
          stroke="rgba(148,163,184,0.5)"
          stroke-width="1.2"
        />

        <!-- 车厢 2 里的乘客 -->
        <g transform="translate(126, 0)">
          <circle cx="0" cy="160" r="6" fill="#f1f5f9" />
          <path d="M-9 177 Q-9 167 0 167 Q9 167 9 177 Z" fill="#e2a846" />
        </g>
        <text x="126" y="195" text-anchor="middle" style="font-size: 11.5px" fill="#e2a846">
          乘客
        </text>

        <!-- 受电弓 -->
        <rect x="134" y="129" width="26" height="5" rx="2" fill="#93c5fd" opacity="0.8" />
        <line x1="140" y1="129" x2="156" y2="116" stroke="#cbd5e1" stroke-width="2.2" />
        <line x1="156" y1="116" x2="146" y2="112" stroke="#cbd5e1" stroke-width="2.2" />
        <line
          x1="134"
          y1="112"
          x2="166"
          y2="112"
          stroke="#e2e8f0"
          stroke-width="2.6"
          stroke-linecap="round"
        />

        <!-- 车头灯 / 车尾灯 -->
        <circle cx="290" cy="196" r="22" fill="url(#rfd-lamp)" />
        <circle
          cx="288"
          cy="196"
          r="5"
          fill="#fde68a"
          stroke="rgba(226,168,70,0.9)"
          stroke-width="1"
        />
        <circle cx="7" cy="196" r="3.2" fill="#f87171" />
      </g>

      <!-- ── 标注 ── -->
      <g v-if="frame === 'ground'" stroke="#e2a846" stroke-linecap="round">
        <line x1="266" y1="78" x2="358" y2="78" stroke-width="2.2" opacity="0.85" />
        <path
          d="M352 73 L364 78 L352 83"
          fill="none"
          stroke-width="2.2"
          opacity="0.85"
          stroke-linejoin="round"
        />
      </g>
      <g v-else stroke="#60a5fa" stroke-linecap="round">
        <line x1="374" y1="78" x2="282" y2="78" stroke-width="2.2" opacity="0.85" />
        <path
          d="M288 73 L276 78 L288 83"
          fill="none"
          stroke-width="2.2"
          opacity="0.85"
          stroke-linejoin="round"
        />
      </g>

      <text
        x="320"
        y="24"
        text-anchor="middle"
        style="font-weight: 700; font-size: 15px"
        :fill="frame === 'ground' ? '#e2a846' : '#60a5fa'"
      >
        {{ frame === "ground" ? "以地面为参考系" : "以车厢为参考系" }}
      </text>
      <text x="320" y="46" text-anchor="middle" style="font-size: 12.5px" fill="#94a3b8">
        {{
          frame === "ground"
            ? "列车向右行驶，窗外景物（树、电线杆、枕木）静止"
            : "列车静止，窗外景物（树、电线杆、枕木、地面）向左后退"
        }}
      </text>
      <text
        x="320"
        y="66"
        text-anchor="middle"
        style="font-size: 11.5px"
        :fill="frame === 'ground' ? '#e2a846' : '#60a5fa'"
      >
        {{ frame === "ground" ? "列车运动方向" : "窗外景物后退方向" }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.demo-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.demo-header {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
}

.frame-state {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;

  color: #cbd5e1;

  font-weight: 600;
  font-size: 0.82rem;
}

.frame-dot {
  flex-shrink: 0;

  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;

  background: #e2a846;
  box-shadow: 0 0 8px rgb(226 168 70 / 60%);
}

.frame-dot.train {
  background: #60a5fa;
  box-shadow: 0 0 8px rgb(96 165 250 / 60%);
}

.passenger-state {
  color: #94a3b8;
}

.passenger-state.ground {
  color: #e2a846;
}

.passenger-state.train {
  color: #60a5fa;
}

.switch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.42rem 1.35rem;
  border: 1px solid rgb(226 168 70 / 50%);
  border-radius: 2rem;

  background: linear-gradient(135deg, rgb(226 168 70 / 24%), rgb(226 168 70 / 8%));
  color: #e2a846;
  box-shadow: 0 2px 10px rgb(226 168 70 / 12%);

  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.02em;

  cursor: pointer;

  transition: all 0.25s ease;
}

.switch-btn:hover {
  box-shadow: 0 4px 14px rgb(226 168 70 / 22%);
  filter: brightness(1.15);
  transform: translateY(-1px);
}

.switch-btn:active {
  filter: brightness(0.98);
  transform: translateY(0);
}

.demo-svg {
  width: auto;
  max-width: 100%;

  /* 限制高度：本页「标签 + 演示」整体要完整落在 16:9 画面内，别让场景底部被裁掉 */
  height: 16rem;
  margin: 0 auto;
  border: 1px solid rgb(148 163 184 / 10%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 40%);
}
</style>
