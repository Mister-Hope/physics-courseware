<!--
  第 13 页：微波炉加热食物（真实比例剖视结构 + 行波辐射 + 水分子热运动精修版）
  物理逻辑与视觉规约：
    1. 真实桌面微波炉比例（外框 580×304，高宽比约 1.9:1）：
       - 左侧大视野剖视炉腔（392×262），含透视内壁纵深线、底部玻璃转盘、陶瓷餐盘与立体含水食物；
       - 右侧电器仓包含带散热翅片的磁控管（2.45 GHz）、穿透腔壁的喇叭波导口及底部极简旋钮面板，结构真实协调；
    2. 微波行波辐射动画（60FPS 连续向左传入食物）：
       - 3 束微波自波导口扇形射向食物，全段保持饱满正弦波动并在末端平滑收敛入箭头底座，箭头紧贴能量吸收面；
    3. 点击后水分子热运动加剧（step >= 2）：
       - 食物区域暖色热晕升腾并飘出热气波纹；
       - 炉腔左上角显出微观放大镜，内部呈现化学空间交叠比例构型（104.5° 折角、H 与 O 球体自然交叠）的水分子，
         在交变微波场下高频扭转摆动与剧烈热振动，上方清晰标注“水分子热运动加剧”。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

const { step = 0, paused = false } = defineProps<{
  /** Slidev 点击步数（<2 展示微波从磁控管射入；>=2 展示水分子热运动加剧） */
  step?: number;
  /** 是否暂停动画 */
  paused?: boolean;
}>();

const uid = useId();
const cavityHeatGradId = `mw-heat-${uid}`;
const foodGradId = `mw-food-${uid}`;
const loupeClipId = `mw-loupe-clip-${uid}`;
const magGradId = `mw-mag-${uid}`;

// ══════════════ 60FPS 连续动画状态 ══════════════
const timeSec = ref(0);
let raf = 0;
let lastNow = 0;
let prefersReducedMotion = false;

const tick = (now: number): void => {
  if (lastNow === 0) lastNow = now;
  const dt = Math.min(now - lastNow, 64) / 1000;
  lastNow = now;

  if (!paused && !prefersReducedMotion) timeSec.value = (timeSec.value + dt) % 1000;

  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  prefersReducedMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
});

const isHeating = computed(() => step >= 2);

// ══════════════ 微波行波射线（从波导口 x=562 扇形传播至食物右侧 x=420） ══════════════
interface WaveRay {
  d: string;
  headPoints: string;
}

const waveRays = computed<WaveRay[]>(() => {
  const phase = timeSec.value * 7.2;
  const configs = [
    { xEnd: 396, y0: 127, y1: 208, amp: 6.2 },
    { xEnd: 410, y0: 136, y1: 226, amp: 6.5 },
    { xEnd: 418, y0: 145, y1: 246, amp: 6.2 },
  ];
  const xStart = 560;
  const steps = 72;
  const waveLen = 32;

  return configs.map((cfg) => {
    const dx = cfg.xEnd - xStart;
    const dy = cfg.y1 - cfg.y0;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;

    const tipX = cfg.xEnd;
    const tipY = cfg.y1;
    const hL = 10;
    const hW = 4.6;
    const headPoints = `${tipX.toFixed(1)},${tipY.toFixed(1)} ${(tipX - ux * hL + nx * hW).toFixed(1)},${(tipY - uy * hL + ny * hW).toFixed(1)} ${(tipX - ux * hL - nx * hW).toFixed(1)},${(tipY - uy * hL - ny * hW).toFixed(1)}`;

    // 线端精确停在箭头三角形底部内部，杜绝任何线头伸出箭头前方
    const shaftEndX = tipX - ux * (hL * 0.65);
    const shaftEndY = tipY - uy * (hL * 0.65);

    const pts: string[] = [];
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const x = xStart + (shaftEndX - xStart) * u;
      const baseY = cfg.y0 + (shaftEndY - cfg.y0) * u;
      // 波导口前 10% 起振至满幅，中段全程保持完整正弦振幅，仅末 10% 平滑收束进箭头底座
      const rise = Math.sin((Math.PI / 2) * Math.min(1, u / 0.1));
      const fall = Math.sin((Math.PI / 2) * Math.min(1, (1 - u) / 0.1));
      const env = rise * fall;
      const osc = cfg.amp * env * Math.sin((2 * Math.PI * (xStart - x)) / waveLen - phase);
      // 垂直于射线方向叠加正弦横向偏移，使斜向射线波形同样匀称饱满
      const px = x + nx * osc;
      const py = baseY + ny * osc;
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }

    return {
      d: `M ${pts.join(" L ")}`,
      headPoints,
    };
  });
});

// ══════════════ 放大镜内极性水分子 H₂O（104.5° 折角 + 氢氧交叠比例模型） ══════════════
const LOUPE_CX = 238;
const LOUPE_CY = 114;
const LOUPE_R = 45;
const SAMPLE_CX = 312;
const SAMPLE_CY = 232;
const SAMPLE_R = 12;

const zoomTangents = computed(() => ({
  topFrom: { x: LOUPE_CX + 34, y: LOUPE_CY - 29 },
  topTo: { x: SAMPLE_CX + 8, y: SAMPLE_CY - 8 },
  botFrom: { x: LOUPE_CX + 6, y: LOUPE_CY + LOUPE_R - 1 },
  botTo: { x: SAMPLE_CX - 10, y: SAMPLE_CY + 6 },
}));

interface MoleculePose {
  cx: number;
  cy: number;
  h1x: number;
  h1y: number;
  h2x: number;
  h2y: number;
}

const zoomMolecules = computed<MoleculePose[]>(() => {
  const t = timeSec.value;
  const specs = [
    { bx: LOUPE_CX - 16, by: LOUPE_CY - 12, baseAng: -0.32, freq: 13.5, phase: 0 },
    { bx: LOUPE_CX + 18, by: LOUPE_CY - 7, baseAng: 0.45, freq: 14.8, phase: 2.1 },
    { bx: LOUPE_CX - 1, by: LOUPE_CY + 18, baseAng: -0.08, freq: 15.6, phase: 4.2 },
  ];
  // 真实水分子空间交叠比例构型：rO = 7.4, rH = 4.6, 键距 8.4 < 7.4 + 4.6
  const bondLen = 8.4;
  const halfBond = (104.5 * Math.PI) / 360;

  return specs.map((m) => {
    const twist = 0.48 * Math.sin(t * m.freq + m.phase);
    const jx = 3.1 * Math.sin(t * (m.freq * 1.43) + m.phase * 1.7) + 1.2 * Math.cos(t * 23 + m.phase);
    const jy = 2.7 * Math.cos(t * (m.freq * 1.21) + m.phase * 0.9) + 1.1 * Math.sin(t * 21.3 + m.phase);
    const cx = m.bx + jx;
    const cy = m.by + jy;
    const ang = m.baseAng + twist;

    const axis = ang - Math.PI / 2;
    const a1 = axis - halfBond;
    const a2 = axis + halfBond;

    return {
      cx,
      cy,
      h1x: cx + bondLen * Math.cos(a1),
      h1y: cy + bondLen * Math.sin(a1),
      h2x: cx + bondLen * Math.cos(a2),
      h2y: cy + bondLen * Math.sin(a2),
    };
  });
});

// 食物上升热气波纹（step >= 2）
const steamWisps = computed(() => {
  const t = timeSec.value;
  const bases = [
    { x: 320, ph: 0 },
    { x: 348, ph: 2.1 },
    { x: 376, ph: 4.2 },
  ];
  return bases.map((b) => {
    const cycle = (((t * 0.55 + b.ph / (2 * Math.PI)) % 1) + 1) % 1;
    const yBot = 204 - cycle * 14;
    const yTop = yBot - 24;
    const sway = 4 * Math.sin(t * 3.5 + b.ph);
    const opacity = Math.sin(Math.PI * cycle) * 0.65;
    const d = `M ${b.x},${yBot.toFixed(1)} Q ${(b.x - 5 + sway).toFixed(1)},${((yBot + yTop) / 2 + 4).toFixed(1)} ${(b.x + 2).toFixed(1)},${((yBot + yTop) / 2).toFixed(1)} T ${(b.x + sway * 0.6).toFixed(1)},${yTop.toFixed(1)}`;
    return { d, opacity };
  });
});
</script>

<template>
  <svg
    viewBox="0 0 880 344"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="微波炉加热食物原理示意图：右侧磁控管发射微波经波导进入炉腔，食物中极性水分子在微波作用下剧烈热运动"
    class="select-none overflow-visible"
    style="display: block; margin: 0 auto"
  >
    <defs>
      <!-- 食物局部加热径向暖光 -->
      <radialGradient :id="cavityHeatGradId" cx="48%" cy="68%" r="55%">
        <stop offset="0%" :stop-color="isHeating ? 'rgba(248, 113, 113, 0.25)' : 'rgba(226, 168, 70, 0.08)'" />
        <stop offset="65%" :stop-color="isHeating ? 'rgba(245, 158, 11, 0.09)' : 'rgba(59, 130, 246, 0.03)'" />
        <stop offset="100%" stop-color="rgba(15, 23, 42, 0)" />
      </radialGradient>

      <!-- 食物受热渐变 -->
      <linearGradient :id="foodGradId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="isHeating ? '#f59e0b' : '#d97706'" stop-opacity="0.74" />
        <stop offset="55%" :stop-color="isHeating ? '#d97706' : '#92400e'" stop-opacity="0.60" />
        <stop offset="100%" stop-color="#78350f" stop-opacity="0.80" />
      </linearGradient>

      <!-- 磁控管主体渐变 -->
      <linearGradient :id="magGradId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(226, 168, 70, 0.36)" />
        <stop offset="50%" stop-color="rgba(226, 168, 70, 0.16)" />
        <stop offset="100%" stop-color="rgba(226, 168, 70, 0.30)" />
      </linearGradient>

      <!-- 放大镜圆窗裁剪 -->
      <clipPath :id="loupeClipId">
        <circle :cx="LOUPE_CX" :cy="LOUPE_CY" :r="LOUPE_R - 1.5" />
      </clipPath>
    </defs>

    <!-- ════════════════════════════════════════════════
         1. 桌面阴影、底脚与真实比例微波炉外机壳 (580 × 304)
    ════════════════════════════════════════════════ -->
    <ellipse cx="440" cy="331" rx="285" ry="6.5" fill="rgba(2, 6, 23, 0.5)" />
    <rect x="182" y="320" width="32" height="8" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1" />
    <rect x="666" y="320" width="32" height="8" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1" />

    <rect x="150" y="16" width="580" height="304" rx="16" fill="rgba(15, 23, 42, 0.88)" stroke="var(--c-text-dim)" stroke-width="2" />

    <!-- ════════════════════════════════════════════════
         2. 左侧加热炉腔（3D 纵深剖视腔体 392 × 262）
    ════════════════════════════════════════════════ -->
    <rect x="172" y="36" width="392" height="262" rx="10" fill="#0d1426" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.5" />
    <rect x="172" y="36" width="392" height="262" rx="10" :fill="`url(#${cavityHeatGradId})`" />
    <!-- 3D 纵深后壁轮廓与透视棱线 -->
    <g stroke="rgba(148, 163, 184, 0.20)" stroke-width="1">
      <rect x="200" y="60" width="336" height="208" rx="5" fill="none" stroke-dasharray="5 4" />
      <line x1="175" y1="39" x2="200" y2="60" />
      <line x1="561" y1="39" x2="536" y2="60" />
      <line x1="175" y1="295" x2="200" y2="268" />
      <line x1="561" y1="295" x2="536" y2="268" />
    </g>
    <!-- 观察窗玻璃微弱斜光 -->
    <g stroke="rgba(248, 250, 252, 0.055)" stroke-width="7" stroke-linecap="round">
      <line x1="190" y1="92" x2="238" y2="50" />
      <line x1="212" y1="98" x2="260" y2="56" />
    </g>

    <!-- ════════════════════════════════════════════════
         3. 右侧电器仓：磁控管（散热翅片）· 穿透波导 · 控制旋钮面板
    ════════════════════════════════════════════════ -->
    <rect x="578" y="36" width="132" height="262" rx="10" fill="rgba(30, 41, 59, 0.42)" stroke="rgba(148, 163, 184, 0.48)" stroke-width="1.5" />

    <!-- 波导通道（连接磁控管天线到炉腔壁开口） -->
    <path
      d="M 562,120 L 580,123 L 610,123 L 610,149 L 580,149 L 562,152 Z"
      fill="rgba(15, 23, 42, 0.94)"
      stroke="var(--c-accent)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <line x1="564" y1="136" x2="608" y2="136" stroke="rgba(248, 113, 113, 0.48)" stroke-width="1.4" stroke-dasharray="4 3" />
    <rect x="600" y="131" width="11" height="10" rx="2" fill="var(--c-accent)" />

    <!-- 磁控管主体 -->
    <g>
      <text x="644" y="61" text-anchor="middle" font-size="14" font-weight="600" fill="var(--c-accent)">磁控管</text>
      <!-- 顶部高频接线柱 -->
      <rect x="634" y="72" width="20" height="8" rx="2" fill="rgba(148, 163, 184, 0.35)" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <!-- 主阳极散热框 -->
      <rect x="610" y="80" width="68" height="76" rx="7" :fill="`url(#${magGradId})`" stroke="var(--c-accent)" stroke-width="1.8" />
      <!-- 四片横向散热翅片 -->
      <g stroke="var(--c-accent)" stroke-width="1.5" opacity="0.85">
        <line x1="617" y1="95" x2="671" y2="95" />
        <line x1="617" y1="110" x2="671" y2="110" />
        <line x1="617" y1="125" x2="671" y2="125" />
        <line x1="617" y1="140" x2="671" y2="140" />
      </g>
      <!-- 中心磁钢圆柱轮廓 -->
      <rect x="632" y="86" width="24" height="64" rx="4" fill="rgba(15, 23, 42, 0.74)" stroke="var(--c-accent)" stroke-width="1.3" />
      <text x="644" y="176" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)" font-family="ui-monospace, monospace">2.45 GHz</text>
    </g>

    <!-- 电器仓隔断线与极简控制旋钮面板 -->
    <line x1="592" y1="194" x2="696" y2="194" stroke="rgba(148, 163, 184, 0.24)" stroke-width="1" />
    <g>
      <!-- 定时/功率旋钮 -->
      <circle cx="644" cy="232" r="21" fill="rgba(15, 23, 42, 0.75)" stroke="var(--c-text-dim)" stroke-width="1.5" />
      <circle cx="644" cy="232" r="15" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(148, 163, 184, 0.35)" stroke-width="1" />
      <line x1="644" y1="232" x2="653" y2="221" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
      <!-- 外圈刻度点 -->
      <g fill="var(--c-text-dim)" opacity="0.7">
        <circle cx="644" cy="206" r="1.2" />
        <circle cx="662" cy="213" r="1.2" />
        <circle cx="670" cy="232" r="1.2" />
        <circle cx="626" cy="213" r="1.2" />
        <circle cx="618" cy="232" r="1.2" />
      </g>
      <!-- 底部极简按键条 -->
      <rect x="614" y="268" width="60" height="14" rx="4" fill="rgba(15, 23, 42, 0.7)" stroke="rgba(148, 163, 184, 0.45)" stroke-width="1.1" />
    </g>

    <!-- ════════════════════════════════════════════════
         4. 玻璃转盘、餐盘与含水食物
    ════════════════════════════════════════════════ -->
    <g>
      <!-- 底部转轴支撑轮 -->
      <rect x="334" y="280" width="24" height="8" rx="2" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1" />
      <!-- 玻璃大转盘 -->
      <ellipse cx="346" cy="274" rx="102" ry="10" fill="rgba(148, 163, 184, 0.12)" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.5" />
      <!-- 陶瓷餐盘 -->
      <ellipse cx="346" cy="265" rx="84" ry="10" fill="rgba(226, 232, 240, 0.16)" stroke="rgba(226, 232, 240, 0.68)" stroke-width="1.4" />
      <!-- 盘中立体食物弧形穹顶 -->
      <path
        d="M 274,262 C 276,220 306,208 346,208 C 386,208 416,220 418,262 C 396,270 296,270 274,262 Z"
        :fill="`url(#${foodGradId})`"
        stroke="var(--c-accent)"
        stroke-width="1.7"
      />
      <path d="M 296,232 Q 322,222 346,230 T 396,234" fill="none" stroke="rgba(254, 243, 199, 0.35)" stroke-width="1.3" stroke-linecap="round" />

      <!-- 热气升腾纹路（step >= 2） -->
      <g v-if="isHeating">
        <path
          v-for="(w, idx) in steamWisps"
          :key="`steam-${idx}`"
          :d="w.d"
          fill="none"
          stroke="rgba(253, 186, 116, 0.85)"
          stroke-width="1.6"
          stroke-linecap="round"
          :opacity="w.opacity"
        />
      </g>
    </g>

    <!-- ════════════════════════════════════════════════
         5. 从波导口射向食物的连续动态微波束（全段波动，箭头齐平末端）
    ════════════════════════════════════════════════ -->
    <g>
      <text
        x="496"
        y="108"
        text-anchor="middle"
        font-size="15"
        font-weight="600"
        fill="var(--c-danger)"
        stroke="#0d1426"
        stroke-width="3.5"
        paint-order="stroke"
      >
        微波
      </text>
      <g v-for="(ray, idx) in waveRays" :key="`ray-${idx}`">
        <path :d="ray.d" fill="none" stroke="var(--c-danger)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        <polygon :points="ray.headPoints" fill="var(--c-danger)" />
      </g>
    </g>

    <!-- ════════════════════════════════════════════════
         6. 点击后（step >= 2）：食物局部微观放大镜 + 交叠构型水分子热运动
    ════════════════════════════════════════════════ -->
    <g v-if="isHeating">
      <!-- 食物上的微观取样圈 -->
      <circle
        :cx="SAMPLE_CX"
        :cy="SAMPLE_CY"
        :r="SAMPLE_R"
        fill="rgba(226, 168, 70, 0.14)"
        stroke="var(--c-accent)"
        stroke-width="1.4"
        stroke-dasharray="3 2.5"
      />
      <!-- 放大镜上下透视导引线 -->
      <line
        :x1="zoomTangents.topFrom.x"
        :y1="zoomTangents.topFrom.y"
        :x2="zoomTangents.topTo.x"
        :y2="zoomTangents.topTo.y"
        stroke="var(--c-accent)"
        stroke-width="1.2"
        stroke-dasharray="4 3"
        opacity="0.72"
      />
      <line
        :x1="zoomTangents.botFrom.x"
        :y1="zoomTangents.botFrom.y"
        :x2="zoomTangents.botTo.x"
        :y2="zoomTangents.botTo.y"
        stroke="var(--c-accent)"
        stroke-width="1.2"
        stroke-dasharray="4 3"
        opacity="0.72"
      />

      <!-- 放大镜正上方清晰标注（与透视导引线完全无交叠） -->
      <text
        :x="LOUPE_CX"
        y="56"
        text-anchor="middle"
        font-size="13.5"
        font-weight="600"
        fill="var(--c-accent)"
        stroke="#0d1426"
        stroke-width="3.5"
        paint-order="stroke"
      >
        水分子热运动加剧
      </text>

      <!-- 放大镜底圆 -->
      <circle :cx="LOUPE_CX" :cy="LOUPE_CY" :r="LOUPE_R" fill="#090d1a" />

      <!-- 放大镜内极性水分子 H₂O 振动动画 -->
      <g :clip-path="`url(#${loupeClipId})`">
        <circle :cx="LOUPE_CX" :cy="LOUPE_CY" :r="LOUPE_R - 4" fill="rgba(248, 113, 113, 0.08)" />

        <g v-for="(mol, idx) in zoomMolecules" :key="`mol-${idx}`">
          <!-- 两个氢原子 H（与中心氧原子自然交叠，呈现化学真实分子构型） -->
          <circle :cx="mol.h1x" :cy="mol.h1y" r="4.6" fill="#e2e8f0" stroke="#475569" stroke-width="0.7" />
          <circle :cx="mol.h1x - 1.1" :cy="mol.h1y - 1.2" r="1.2" fill="#ffffff" opacity="0.85" />
          <circle :cx="mol.h2x" :cy="mol.h2y" r="4.6" fill="#e2e8f0" stroke="#475569" stroke-width="0.7" />
          <circle :cx="mol.h2x - 1.1" :cy="mol.h2y - 1.2" r="1.2" fill="#ffffff" opacity="0.85" />

          <!-- 中心氧原子 O -->
          <circle :cx="mol.cx" :cy="mol.cy" r="7.4" fill="var(--c-danger)" stroke="rgba(15, 23, 42, 0.48)" stroke-width="0.9" />
          <circle :cx="mol.cx - 2.1" :cy="mol.cy - 2.1" r="2.0" fill="#fecaca" opacity="0.85" />
        </g>
      </g>

      <!-- 放大镜高光外框 -->
      <circle :cx="LOUPE_CX" :cy="LOUPE_CY" :r="LOUPE_R" fill="none" stroke="var(--c-accent)" stroke-width="2" />
      <circle :cx="LOUPE_CX" :cy="LOUPE_CY" :r="LOUPE_R + 3.2" fill="none" stroke="rgba(226, 168, 70, 0.25)" stroke-width="1.2" />
    </g>
  </svg>
</template>
