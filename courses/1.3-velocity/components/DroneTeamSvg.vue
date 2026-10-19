<!--
  例1「无人机与队伍」题目图（viewBox 600 × 240，按真实比例投射：1000 m → 450 px）
    无人机严格沿队伍上方的水平线飞行：去程向右 1000 m（450 px），回程向左 800 m（360 px）；
    队伍前进 200 m（90 px）、队伍长 150 m（67.5 px），二者与 1000 m 严格同比例。
    出发点（初态队长）与归队处（末态队长）各画一条竖直投影线：
    回程 = 1000 m − 200 m = 800 m；无人机位移 = 队伍位移 = 200 m。
  step（= 页面 $clicks）：0 干净题目图 → 1 无人机位移 200 m（= 队长位移）→ 2 回程 800 m。
  SVG 内部增删不影响页面布局，所以这里用 v-if 分步。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** Slidev 点击步数：0 干净题目图 / 1 出位移（200 m，与队长位移相同）/ 2 出回程 800 m */
  step?: number;
}>();

/* ═══════════ 几何与物理比例映射 ═══════════ */
const W = 600;
const H = 240;

/** 比例尺：1000 m 对应 450 px（0.45 px/m） */
const SCALE = 0.45;
const X_START = 65; // 初态队长所在队尾横坐标 (0 m)
const X_RECON = X_START + 1000 * SCALE; // 侦察点 (1000 m) = 515 px
const X_TEAM_END = X_START + 200 * SCALE; // 末态队长所在横坐标 (200 m) = 155 px
const TEAM_LEN_PX = 150 * SCALE; // 队伍长度 (150 m) = 67.5 px

// 纵向基准标高
const Y_GROUND = 196; // 地面接触线
const Y_TEAM_TOP = 120; // 队伍矩形顶部
const Y_TEAM_HEIGHT = 26; // 队伍高度
const Y_TEAM_MID = Y_TEAM_TOP + Y_TEAM_HEIGHT / 2; // 队伍中心线 133
const Y_FLIGHT_OUT = 78; // 去程航线高度（贴近队伍上方）
const Y_FLIGHT_RET = 48; // 回程航线高度（折返平行上层）
const Y_DISP = 68; // 位移标注高度（夹在两条航线之间）

const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.6,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <div class="drone-team-wrap">
    <svg :viewBox="`0 0 ${W} ${H}`" class="drone-team-svg select-none overflow-visible" role="img" aria-label="例1：无人机与队伍运动示意图">
      <defs>
        <!-- 侦察点闪光 / 光晕 -->
        <radialGradient id="recon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#e2a846" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#e2a846" stop-opacity="0" />
        </radialGradient>
        <!-- 无人机发光滤镜 -->
        <filter id="drone-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- ════════ 1. 地面 ════════ -->
      <SurfaceHatch
        :from="{ x: 24, y: Y_GROUND }"
        :to="{ x: 576, y: Y_GROUND }"
        side="below"
        :thickness="14"
        :gap="24"
        color="rgba(148, 163, 184, 0.45)"
        :line-width="2"
        :hatch-width="1.2"
      />

      <!-- ════════ 2. 垂向投影对齐线（彰显严密几何关系，题干已知，常显） ════════ -->
      <!-- 出发点 / 初态队长垂线 -->
      <line :x1="X_START" :y1="Y_FLIGHT_RET" :x2="X_START" :y2="Y_GROUND" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.2" stroke-dasharray="4 4" />
      <!-- 末态队长垂线 -->
      <line :x1="X_TEAM_END" :y1="Y_FLIGHT_RET" :x2="X_TEAM_END" :y2="Y_GROUND" stroke="rgba(96, 165, 250, 0.5)" stroke-width="1.4" stroke-dasharray="4 4" />
      <!-- 侦察点 (1000 m) 垂线 -->
      <line :x1="X_RECON" :y1="Y_FLIGHT_RET" :x2="X_RECON" :y2="Y_GROUND" stroke="rgba(226, 168, 70, 0.45)" stroke-width="1.4" stroke-dasharray="4 4" />

      <!-- ════════ 3. 初态队伍 (t = 0) ════════ -->
      <g opacity="0.45">
        <rect
          :x="X_START"
          :y="Y_TEAM_TOP"
          :width="TEAM_LEN_PX"
          :height="Y_TEAM_HEIGHT"
          rx="4"
          fill="rgba(148, 163, 184, 0.18)"
          stroke="rgba(148, 163, 184, 0.8)"
          stroke-width="1.4"
          stroke-dasharray="4 2"
        />
        <!-- 队伍内士兵示意点阵 -->
        <circle :cx="X_START + 22" :cy="Y_TEAM_MID" r="2.5" fill="rgba(148, 163, 184, 0.7)" />
        <circle :cx="X_START + 45" :cy="Y_TEAM_MID" r="2.5" fill="rgba(148, 163, 184, 0.7)" />
        <text :x="X_START + TEAM_LEN_PX" :y="Y_TEAM_MID - 14" text-anchor="middle" font-size="12" fill="#94a3b8" :style="HALO">队首</text>
      </g>

      <!-- 初态队长标徽 (金色实心徽标) -->
      <circle :cx="X_START" :cy="Y_TEAM_MID" r="6" fill="#e2a846" stroke="#0f1425" stroke-width="1.8" />
      <text :x="X_START" :y="Y_TEAM_MID - 15" text-anchor="middle" font-size="14" font-weight="600" fill="#e2a846" :style="HALO">队尾(队长)</text>

      <!-- 队伍长度标注 150 m (队伍下方尺寸标注线) -->
      <g>
        <line
          :x1="X_START"
          :y1="Y_TEAM_TOP + Y_TEAM_HEIGHT + 14"
          :x2="X_START + TEAM_LEN_PX"
          :y2="Y_TEAM_TOP + Y_TEAM_HEIGHT + 14"
          stroke="rgba(148, 163, 184, 0.7)"
          stroke-width="1.2"
        />
        <!-- 尺寸界线脚标 -->
        <line
          :x1="X_START"
          :y1="Y_TEAM_TOP + Y_TEAM_HEIGHT + 9"
          :x2="X_START"
          :y2="Y_TEAM_TOP + Y_TEAM_HEIGHT + 19"
          stroke="rgba(148, 163, 184, 0.7)"
          stroke-width="1.2"
        />
        <line
          :x1="X_START + TEAM_LEN_PX"
          :y1="Y_TEAM_TOP + Y_TEAM_HEIGHT + 9"
          :x2="X_START + TEAM_LEN_PX"
          :y2="Y_TEAM_TOP + Y_TEAM_HEIGHT + 19"
          stroke="rgba(148, 163, 184, 0.7)"
          stroke-width="1.2"
        />
        <text
          :x="X_START + TEAM_LEN_PX / 2"
          :y="Y_TEAM_TOP + Y_TEAM_HEIGHT + 28"
          text-anchor="middle"
          font-size="13"
          font-family="KaTeX_Main, sans-serif"
          fill="#94a3b8"
          :style="HALO"
        >
          队伍长 150 m
        </text>
      </g>

      <!-- ════════ 4. 末态队伍 (前进 200 m 后) ════════ -->
      <g>
        <rect
          :x="X_TEAM_END"
          :y="Y_TEAM_TOP"
          :width="TEAM_LEN_PX"
          :height="Y_TEAM_HEIGHT"
          rx="4"
          fill="rgba(56, 189, 248, 0.22)"
          stroke="#38bdf8"
          stroke-width="1.8"
        />
        <!-- 队伍内士兵点 -->
        <circle :cx="X_TEAM_END + 22" :cy="Y_TEAM_MID" r="2.5" fill="#38bdf8" />
        <circle :cx="X_TEAM_END + 45" :cy="Y_TEAM_MID" r="2.5" fill="#38bdf8" />
        <text :x="X_TEAM_END + TEAM_LEN_PX" :y="Y_TEAM_MID - 14" text-anchor="middle" font-size="12" fill="#7dd3fc" :style="HALO">队首</text>

        <!-- 末态队长 -->
        <circle :cx="X_TEAM_END" :cy="Y_TEAM_MID" r="6" fill="#38bdf8" stroke="#0f1425" stroke-width="1.8" />
        <text :x="X_TEAM_END" :y="Y_TEAM_MID - 15" text-anchor="middle" font-size="14" font-weight="600" fill="#38bdf8" :style="HALO">队长(末态)</text>
      </g>

      <!-- ════════ 5. 队伍位移 200 m（题干已知，常显；标注放在箭头右侧，避让队伍长标注） ════════ -->
      <g>
        <CourseArrow :from="{ x: X_START, y: Y_GROUND - 16 }" :to="{ x: X_TEAM_END, y: Y_GROUND - 16 }" stroke="#e2a846" :stroke-width="3" :head-size="11" />
        <text :x="X_TEAM_END + 10" :y="Y_GROUND - 11" font-size="13" font-weight="600" fill="#e2a846" :style="HALO">队伍前进 200 m</text>
      </g>

      <!-- ════════ 6. 位移分析（第 1 步）：无人机出发与归队都在队长处 ⇒ 位移 = 队长位移 200 m ════════ -->
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: X_START, y: Y_DISP }" :to="{ x: X_TEAM_END, y: Y_DISP }" stroke="var(--c-physics)" :stroke-width="2.8" :head-size="11" />
        <rect
          :x="(X_START + X_TEAM_END) / 2 - 58"
          :y="20"
          width="116"
          height="22"
          rx="4"
          fill="rgba(15, 23, 42, 0.9)"
          stroke="rgba(45, 212, 191, 0.5)"
          stroke-width="1"
        />
        <text :x="(X_START + X_TEAM_END) / 2" :y="36" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--c-physics)">无人机位移 200 m</text>
      </g>

      <!-- ════════ 7. 无人机水平直线航线 ════════ -->
      <!-- (1) 去程航线：紧贴队伍上方，严格水平向右飞 1000 m -->
      <g>
        <CourseArrow :from="{ x: X_START, y: Y_FLIGHT_OUT }" :to="{ x: X_RECON, y: Y_FLIGHT_OUT }" stroke="#e2a846" :stroke-width="3.2" :head-size="13" />
        <!-- 标签居中带底衬 -->
        <rect :x="(X_START + X_RECON) / 2 - 46" :y="Y_FLIGHT_OUT - 12" width="92" height="22" rx="4" fill="rgba(15, 23, 42, 0.85)" />
        <text :x="(X_START + X_RECON) / 2" :y="Y_FLIGHT_OUT + 4" text-anchor="middle" font-size="14" font-weight="bold" fill="#e2a846">去程 1000 m</text>
      </g>

      <!-- (2) 侦察点掉头 180° 折返平滑圆弧连接 -->
      <path
        :d="`M ${X_RECON} ${Y_FLIGHT_OUT} A 15 15 0 0 0 ${X_RECON} ${Y_FLIGHT_RET}`"
        fill="none"
        stroke="#60a5fa"
        stroke-width="2.5"
        stroke-dasharray="4 3"
        opacity="0.8"
      />

      <!-- (3) 回程航线：严格水平向左折返，精确落回末态队长横坐标处 -->
      <g>
        <CourseArrow
          :from="{ x: X_RECON, y: Y_FLIGHT_RET }"
          :to="{ x: X_TEAM_END, y: Y_FLIGHT_RET }"
          stroke="#60a5fa"
          :stroke-width="3.2"
          stroke-dasharray="7 4"
          :head-size="13"
          opacity="0.9"
        />
        <!-- 回程推导距离（800 m）：第 2 步才出，之前只给方向不剧透 -->
        <template v-if="step >= 2">
          <rect
            :x="(X_RECON + X_TEAM_END) / 2 - 46"
            :y="Y_FLIGHT_RET - 23"
            width="92"
            height="22"
            rx="4"
            fill="rgba(15, 23, 42, 0.85)"
            stroke="rgba(96, 165, 250, 0.4)"
            stroke-width="1"
          />
          <text :x="(X_RECON + X_TEAM_END) / 2" :y="Y_FLIGHT_RET - 7" text-anchor="middle" font-size="14" font-weight="bold" fill="#60a5fa">回程 800 m</text>
        </template>
        <text v-else :x="(X_RECON + X_TEAM_END) / 2" :y="Y_FLIGHT_RET - 8" text-anchor="middle" font-size="12" fill="#94a3b8" :style="HALO">
          返回队长处 (方向←)
        </text>
      </g>

      <!-- ════════ 8. 侦察点靶标 (1000 m 处) ════════ -->
      <g :transform="`translate(${X_RECON}, 32)`">
        <!-- 靶标光晕背景 -->
        <circle cx="0" cy="0" r="14" fill="url(#recon-glow)" />
        <!-- 相机/旗帜立柱 -->
        <line x1="0" y1="0" x2="0" y2="46" stroke="#e2a846" stroke-width="2" />
        <!-- 侦察三角旗 -->
        <path d="M 0 0 L 18 6 L 0 12 Z" fill="#e2a846" />
        <circle cx="0" cy="0" r="3.5" fill="#f8fafc" stroke="#e2a846" stroke-width="1.5" />
        <!-- 标签 -->
        <text x="0" y="-12" text-anchor="middle" font-size="13" font-weight="bold" fill="#e2a846" :style="HALO">侦察点 (1000 m)</text>
      </g>

      <!-- ════════ 9. 四轴无人机图标（停在折返点待命） ════════ -->
      <g :transform="`translate(${X_RECON}, ${(Y_FLIGHT_OUT + Y_FLIGHT_RET) / 2})`" filter="url(#drone-glow)">
        <!-- 4支机臂 (X形) -->
        <line x1="-12" y1="-7" x2="12" y2="7" stroke="#cbd5e1" stroke-width="2" />
        <line x1="-12" y1="7" x2="12" y2="-7" stroke="#cbd5e1" stroke-width="2" />
        <!-- 4个旋翼圆盘 (微透半透明) -->
        <ellipse cx="-12" cy="-7" rx="5" ry="2.2" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.8" />
        <ellipse cx="12" cy="7" rx="5" ry="2.2" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.8" />
        <ellipse cx="-12" cy="7" rx="5" ry="2.2" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.8" />
        <ellipse cx="12" cy="-7" rx="5" ry="2.2" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.8" />
        <!-- 机身核心仓 -->
        <rect x="-6" y="-4" width="12" height="8" rx="2.5" fill="#1e293b" stroke="#e2a846" stroke-width="1.5" />
        <!-- 前视航拍镜头 / 状态信号灯 -->
        <circle cx="0" cy="0" r="2" fill="#38bdf8" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.drone-team-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drone-team-svg {
  display: block;
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 0 auto;
}
</style>
