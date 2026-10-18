<script setup lang="ts">
import { ref, computed } from "vue";

// State definitions with realistic physical units
const S = ref<number>(300); // Overlapping Area S in cm²: [100, 500], step 50
const d = ref<number>(5); // Plate Separation d in mm: [3.0, 8.0], step 0.5
const U = ref<number>(30); // Voltage U in V: [10.0, 50.0], step 5
const epsilonR = ref<number>(1); // Relative permittivity: 1 (no dielectric), 3 (glass), 6 (ceramic)

// Physical constant: Permittivity of free space epsilon_0 = 8.854 pF/m = 8.854 * 10^-12 F/m
const epsilon0 = 8.854; // in pF/m (since F/m * m = F, we scale S and d to meters and get pF)

// Physical computations (Standard International Units)
// C = epsilonR * epsilon0 * S_m2 / d_m  (result in pF)
const C = computed(() => {
  const S_m2 = S.value / 10000; // Convert cm² to m²
  const d_m = d.value / 1000; // Convert mm to m
  return (epsilonR.value * epsilon0 * S_m2) / d_m;
});

// Q = C * U  (result in pC)
const Q = computed(() => C.value * U.value);

// Grid lines generator helper for premium feel
const verticalGrid = Array.from({ length: 15 }, (_, i) => (i + 1) * 40);
const horizontalGrid = Array.from({ length: 7 }, (_, i) => (i + 1) * 40);

// Geometry configurations
const midY = 150; // Adjusted vertical center for pristine spacing

// Fixed physical plate width representing 500 cm² (width is 280px)
const physicalPlateWidth = 280;

// Shift and overlapping boundaries
const overlapWidth = computed(
  () =>
    // S is in [200, 400] cm²
    physicalPlateWidth * (S.value / 500),
);

// Stagger shift distance
const shift = computed(() => physicalPlateWidth - overlapWidth.value);

// Upper plate shifts left, lower plate shifts right
const upperPlateCenterX = computed(() => 300 - shift.value / 2);
const upperPlateLeft = computed(() => upperPlateCenterX.value - physicalPlateWidth / 2);
const upperPlateRight = computed(() => upperPlateCenterX.value + physicalPlateWidth / 2);

const lowerPlateCenterX = computed(() => 300 + shift.value / 2);
const lowerPlateLeft = computed(() => lowerPlateCenterX.value - physicalPlateWidth / 2);
const lowerPlateRight = computed(() => lowerPlateCenterX.value + physicalPlateWidth / 2);

// Overlapping region boundaries (since upper is moved left and lower is moved right)
const overlapLeft = computed(() => lowerPlateLeft.value);
const overlapRight = computed(() => upperPlateRight.value);

// Wires connect to centers of the respective plates
const upperWireX = computed(() => upperPlateCenterX.value);
const lowerWireX = computed(() => lowerPlateCenterX.value);

// Plate Gap: Maps d from [2.0, 8.0] mm to [45, 115] px
const plateGap = computed(() => {
  const normD = (d.value - 2) / 6; // [0, 1]
  return 45 + normD * 70;
});

const upperPlateY = computed(() => midY - plateGap.value / 2);
const lowerPlateY = computed(() => midY + plateGap.value / 2);

// Dielectric colors and text descriptions
const dielectricStyle = computed(() => {
  if (epsilonR.value === 3) {
    return {
      fill: "#3b82f6",
      opacity: 0.15,
      stroke: "#3b82f6",
      strokeOpacity: 0.3,
      label: "玻璃",
    };
  } else if (epsilonR.value === 6) {
    return {
      fill: "#8b5cf6",
      opacity: 0.22,
      stroke: "#8b5cf6",
      strokeOpacity: 0.4,
      label: "陶瓷",
    };
  }
  return null; // No dielectric
});

// ── 极板颜色：灰→红/蓝渐变 ──
const parseHexPair = (hexStr: string): { r: number; g: number; b: number } => ({
  r: Number.parseInt(hexStr.slice(0, 2), 16),
  g: Number.parseInt(hexStr.slice(2, 4), 16),
  b: Number.parseInt(hexStr.slice(4, 6), 16),
});

const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const a = parseHexPair(color1);
  const b = parseHexPair(color2);
  return `rgb(${Math.round(a.r + factor * (b.r - a.r))},${Math.round(a.g + factor * (b.g - a.g))},${Math.round(a.b + factor * (b.b - a.b))})`;
};
const plateT = computed(() => Math.max(0, Math.min(1, (U.value - 10) / 40)));
const upperColor = computed(() => interpolateColor("475569", "ef4444", plateT.value));
const lowerColor = computed(() => interpolateColor("475569", "3b82f6", plateT.value));

// 电荷符号：随电压递增 1→10 个，直接计算始终居中的位置
const chargeCount = computed(() => {
  const ratio = plateT.value;
  return ratio <= 0.02 ? 0 : Math.min(10, Math.max(1, Math.ceil(ratio * 10)));
});
const centeredPositions = (centerX: number, count: number): number[] => {
  if (count === 0) return [];
  if (count === 1) return [centerX];
  const margin = physicalPlateWidth * 0.06;
  const span = physicalPlateWidth - 2 * margin;
  const step = span / count;
  const start = centerX - span / 2 + step / 2;
  return Array.from({ length: count }, (_, i) => start + i * step);
};
const visibleUpperCharges = computed(() =>
  centeredPositions(upperPlateCenterX.value, chargeCount.value),
);
const visibleLowerCharges = computed(() =>
  centeredPositions(lowerPlateCenterX.value, chargeCount.value),
);
</script>

<template>
  <div class="w-full mx-auto">
    <div
      class="cap-frame bg-slate-950 border p-3 rounded-2xl shadow-2xl flex flex-col gap-6 select-none relative overflow-hidden"
    >
      <!-- Premium Tech Ambient Lights —— 光晕铺满整框：
           原来是两块 -bottom-40 / -top-40 的圆形色块、靠框的 overflow-hidden 裁掉溢出部分，
           被裁掉的部分虽然看不见，元素矩形仍然伸出框外（版面余量按元素矩形算 ⇒ 第 20 页被判溢出）。
           改成 inset-0 的渐变层：视觉同样是左上蓝、右下暖金的柔光，但没有任何元素伸出框外。 -->
      <div class="absolute inset-0 cap-glow pointer-events-none"></div>

      <!-- Upper Visual Interactive Section -->
      <div class="relative z-10">
        <!-- SVG Board Graphic (Full width for enhanced projector readability) -->
        <div
          class="cap-board w-full shadow-2xl rounded-2xl border border-surface p-2 overflow-hidden flex flex-col justify-center relative"
          style="max-height: 220px"
        >
          <!-- HUD 读数面板 -->
          <div
            class="absolute top-3 right-3 bg-slate-950/85 border border-surface rounded-lg px-2.5 py-1.5 flex items-center gap-2.5 shadow-xl backdrop-blur z-20 font-sans"
          >
            <div class="flex items-baseline gap-1">
              <span class="text-sm cap-accent-light font-extrabold">C</span>
              <span class="font-mono text-sm font-black text-amber-300">{{ C.toFixed(2) }}</span>
              <span class="text-sm text-faint font-semibold">pF</span>
            </div>
            <div class="w-px h-4 cap-hud-divider"></div>
            <div class="flex items-baseline gap-1">
              <span class="text-sm text-rose-400 font-extrabold">Q</span>
              <span class="font-mono text-sm font-black text-rose-300">{{ Q.toFixed(1) }}</span>
              <span class="text-sm text-faint font-semibold">pC</span>
            </div>
          </div>

          <!-- Main Physics SVG -->
          <svg viewBox="0 0 600 280" class="block w-full max-h-full">
            <!-- Fine Tech Grid lines (Reticle style) -->
            <g opacity="0.15">
              <line
                v-for="x in verticalGrid"
                :key="'v-' + x"
                :x1="x"
                y1="0"
                :x2="x"
                y2="280"
                stroke="var(--c-neutral-600)"
                stroke-width="1"
                stroke-dasharray="2,4"
              />
              <line
                v-for="y in horizontalGrid"
                :key="'h-' + y"
                x1="0"
                :y1="y"
                x2="600"
                :y2="y"
                stroke="var(--c-neutral-600)"
                stroke-width="1"
                stroke-dasharray="2,4"
              />
            </g>

            <!-- CONNECTOR WIRES (Circuits structure) -->
            <!-- Wire 1: Upper plate wire going straight out to the top screen, connects to center of upper plate -->
            <line
              stroke="var(--c-neutral-600)"
              stroke-width="2.5"
              :x1="upperWireX"
              y1="0"
              :x2="upperWireX"
              :y2="upperPlateY"
              stroke-linecap="round"
              class=""
            />

            <!-- Wire 2: Lower plate wire going straight out to the bottom screen, connects to center of lower plate -->
            <line
              stroke="var(--c-neutral-600)"
              stroke-width="2.5"
              :x1="lowerWireX"
              y1="280"
              :x2="lowerWireX"
              :y2="lowerPlateY"
              stroke-linecap="round"
              class=""
            />

            <!-- DIELECTRIC MEDIUM SHIFT VISUAL -->
            <!-- Stays attached underneath the upper plate and moves with it horizontally -->
            <g v-if="dielectricStyle" class="">
              <rect
                :x="upperPlateLeft"
                :y="upperPlateY + 4"
                :width="physicalPlateWidth"
                :height="plateGap - 8"
                :fill="dielectricStyle.fill"
                :fill-opacity="dielectricStyle.opacity"
                :stroke="dielectricStyle.stroke"
                :stroke-opacity="dielectricStyle.strokeOpacity"
                stroke-width="1.5"
                class=""
              />
              <!-- Center Medium Label text moves together with upper plate -->
              <text
                :x="upperPlateCenterX"
                :y="midY + 4"
                class="plate-text-bold tracking-wider font-extrabold"
                fill="#ffffff"
                font-size="12"
                font-weight="900"
                text-anchor="middle"
                opacity="0.9"
              >
                {{ dielectricStyle.label }}
              </text>
            </g>

            <!-- CAPACITOR PLATES -->
            <!-- UPPER PLATE (Positive - RED) -->
            <rect
              :x="upperPlateLeft"
              :y="upperPlateY - 4"
              :width="physicalPlateWidth"
              height="8"
              rx="4"
              :fill="upperColor"
              class="shadow-lg"
            />

            <!-- LOWER PLATE (Negative - BLUE) -->
            <rect
              :x="lowerPlateLeft"
              :y="lowerPlateY - 4"
              :width="physicalPlateWidth"
              height="8"
              rx="4"
              :fill="lowerColor"
              class="shadow-lg"
            />

            <!-- CHARGE SYMBOLS - +++ at upper plate, --- at lower plate -->
            <!-- Spaced cleanly on each plate respectively, transparency scales dynamically with voltage U -->
            <g>
              <!-- Upper positive charges (inside, just below upper plate) -->
              <text
                v-for="(px, index) in visibleUpperCharges"
                :key="'pos-up-' + index"
                :x="px"
                :y="upperPlateY + 12"
                class="plate-text-sign font-extrabold select-none"
                fill="var(--c-force)"
                style="font-size: 13px"
                text-anchor="middle"
                dominant-baseline="central"
              >
                +
              </text>

              <!-- Lower negative charges (inside, just above lower plate) -->
              <text
                v-for="(px, index) in visibleLowerCharges"
                :key="'pos-low-' + index"
                :x="px"
                :y="lowerPlateY - 12"
                class="plate-text-sign font-extrabold select-none"
                fill="var(--c-velocity)"
                style="font-size: 13px"
                text-anchor="middle"
                dominant-baseline="central"
              >
                −
              </text>
            </g>

            <!-- MEASUREMENTS & ANNOTATIONS ARROWS -->
            <!-- S Annotation: Overlapping region area (between overlapLeft and overlapRight) -->
            <g class="">
              <!-- Horizontal double arrow line above top plate, spanning exactly the overlap region -->
              <line
                :x1="overlapLeft"
                :y1="upperPlateY - 32"
                :x2="overlapRight"
                :y2="upperPlateY - 32"
                stroke="#fda4af"
                stroke-width="1.5"
                stroke-dasharray="2,2"
                class=""
              />
              <!-- Arrow head left -->
              <polygon
                :points="`${overlapLeft},${upperPlateY - 32} ${overlapLeft + 6},${upperPlateY - 35} ${overlapLeft + 6},${upperPlateY - 29}`"
                fill="#fda4af"
                class=""
              />
              <!-- Arrow head right -->
              <polygon
                :points="`${overlapRight},${upperPlateY - 32} ${overlapRight - 6},${upperPlateY - 35} ${overlapRight - 6},${upperPlateY - 29}`"
                fill="#fda4af"
                class=""
              />
              <!-- Annotation label centered over the overlap region (always X=300) -->
              <rect
                :x="300 - 80"
                :y="upperPlateY - 52"
                width="160"
                height="32"
                rx="6"
                fill="var(--c-neutral-900)"
                stroke="#fda4af"
                stroke-width="1.5"
              />
              <text
                x="300"
                :y="upperPlateY - 31"
                fill="#fda4af"
                font-size="22"
                font-weight="900"
                text-anchor="middle"
              >
                S = {{ S }} cm²
              </text>
            </g>

            <!-- d Annotation: Plate Separation (Adaptively calculated offset to the right of lower plate) -->
            <g class="" :transform="`translate(${Math.min(570, lowerPlateRight + 18)}, 0)`">
              <!-- Vertical double-headed arrow -->
              <line
                x1="0"
                :y1="upperPlateY"
                x2="0"
                :y2="lowerPlateY"
                stroke="var(--c-velocity-light)"
                stroke-width="1.5"
                stroke-dasharray="2,2"
                class=""
              />
              <!-- Arrow head top -->
              <polygon
                :points="`0,${upperPlateY} -3,${upperPlateY + 6} 3,${upperPlateY + 6}`"
                fill="var(--c-velocity-light)"
                class=""
              />
              <!-- Arrow head bottom -->
              <polygon
                :points="`0,${lowerPlateY} -3,${lowerPlateY - 6} 3,${lowerPlateY - 6}`"
                fill="var(--c-velocity-light)"
                class=""
              />
              <!-- Annotation label -->
              <text
                x="12"
                :y="midY + 5"
                fill="var(--c-velocity-light)"
                font-size="22"
                font-weight="900"
                text-anchor="start"
              >
                d = {{ d.toFixed(1) }} mm
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 极性图例 -->
      <div class="flex items-center justify-center gap-6 mb-3">
        <span class="inline-flex items-center gap-2 text-sm font-medium opacity-80 text-tone-300"
          ><span
            class="inline-block w-3.5 h-3.5 rounded-sm"
            style="background: var(--c-danger)"
          ></span>
          正电（红）</span
        >
        <span class="inline-flex items-center gap-2 text-sm font-medium opacity-80 text-tone-300"
          ><span
            class="inline-block w-3.5 h-3.5 rounded-sm"
            style="background: var(--c-velocity)"
          ></span>
          负电（蓝）</span
        >
      </div>

      <!-- Controls Slider Panels Frame -->
      <div class="bg-indigo-950/10 border cap-controls rounded-xl p-2 relative">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <!-- Parameter S: Area -->
          <div class="flex flex-col gap-0.5 w-full">
            <div class="flex justify-between items-baseline gap-1">
              <span class="text-xs text-tone-300 font-extrabold">正对面积 S</span>
              <span class="text-rose-400 text-sm font-extrabold shrink-0">{{ S }} cm²</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              v-model.number="S"
              class="w-full cap-range-amber h-1.5 bg-slate-950 rounded-lg cursor-pointer transition-all"
            />
          </div>

          <!-- Parameter d: Distance -->
          <div class="flex flex-col gap-0.5 w-full">
            <div class="flex justify-between items-baseline gap-1">
              <span class="text-xs text-tone-300 font-extrabold">极板间距离 d</span>
              <span class="text-velocity text-sm font-extrabold shrink-0"
                >{{ d.toFixed(1) }} mm</span
              >
            </div>
            <input
              type="range"
              min="2.0"
              max="8.0"
              step="0.5"
              v-model.number="d"
              class="w-full cap-range-blue h-1.5 bg-slate-950 rounded-lg cursor-pointer transition-all"
            />
          </div>

          <!-- Parameter U: Battery Voltage -->
          <div class="flex flex-col gap-0.5 w-full">
            <div class="flex justify-between items-baseline gap-1">
              <span class="text-xs text-tone-300 font-extrabold">外加电压 U</span>
              <span class="cap-accent-light text-sm font-extrabold shrink-0"
                >{{ U.toFixed(1) }} V</span
              >
            </div>
            <input
              type="range"
              min="10.0"
              max="50.0"
              step="5.0"
              v-model.number="U"
              class="w-full cap-range-amber h-1.5 bg-slate-950 rounded-lg cursor-pointer transition-all"
            />
          </div>

          <!-- Media selection Buttons Grid (Compressed, aesthetic single line array) -->
          <div class="flex flex-col w-full">
            <div class="grid grid-cols-3 gap-1 w-full">
              <button
                @click="epsilonR = 1"
                :class="
                  epsilonR === 1
                    ? 'border cap-btn-on-amber text-amber-300 font-black'
                    : 'border cap-btn-off font-semibold'
                "
                class="py-1.5 px-0.5 rounded-lg transition-all duration-200 text-center text-[10px] leading-tight"
              >
                真空
              </button>

              <button
                @click="epsilonR = 3"
                :class="
                  epsilonR === 3
                    ? 'border cap-btn-on-blue font-black'
                    : 'border cap-btn-off font-semibold'
                "
                class="py-1.5 px-0.5 rounded-lg transition-all duration-200 text-center text-[10px] leading-tight"
              >
                玻璃
              </button>

              <button
                @click="epsilonR = 6"
                :class="
                  epsilonR === 6
                    ? 'border border-purple-500 bg-purple-500/15 text-purple-300 font-black'
                    : 'border cap-btn-off font-semibold'
                "
                class="py-1.5 px-0.5 rounded-lg transition-all duration-200 text-center text-[10px] leading-tight"
              >
                陶瓷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Locking system display typography */
svg text {
  font-weight: bold;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    sans-serif !important;
  line-height: normal !important;
  letter-spacing: normal !important;

  pointer-events: none !important;
  user-select: none !important;
}

.plate-text-bold {
  fill: var(--c-text-dim) !important;
}

.plate-text-sign {
  font-weight: 950 !important;
}

/* ── 原 UnoCSS 调色板类的 token 版（取值相同，视觉零变化）──
   外框/底板/控件框的 slate 深档、极板文字浅档、HUD 分隔条与 amber 亮档这几档，
   没有现成工具类或需要保持透明度，故在本组件内提升为语义类，不再写死调色板取值。 */
.cap-frame {
  border-color: var(--c-neutral-900);
  color: var(--c-text);
}

.cap-board {
  background: var(--c-neutral-900);
}

.cap-controls {
  border-color: var(--c-neutral-900);
}

.cap-hud-divider {
  background: var(--c-neutral-700);
}

.cap-accent-light {
  color: var(--c-accent-light);
}

/* 环境光晕：左上蓝、右下暖金两块柔光（原 blue / amber 5% 透明版；不越出框外） */
.cap-glow {
  background:
    radial-gradient(
      300px 300px at 0% 0%,
      color-mix(in srgb, var(--c-accent-2) 7%, transparent),
      transparent 72%
    ),
    radial-gradient(
      300px 300px at 100% 100%,
      color-mix(in srgb, var(--c-accent-glow) 7%, transparent),
      transparent 72%
    );
}

/* 滑杆主色：原 amber / blue 调色板色 */
.cap-range-amber {
  accent-color: var(--c-accent-glow);
}

.cap-range-blue {
  accent-color: var(--c-accent-2);
}

/* 介质按钮：原 amber / blue / slate 调色板色（选中态与未选中态、hover 态） */
.cap-btn-on-amber {
  border-color: var(--c-accent-glow);
  background: color-mix(in srgb, var(--c-accent-glow) 15%, transparent);
}

.cap-btn-on-blue {
  border-color: var(--c-accent-2);
  background: color-mix(in srgb, var(--c-accent-2) 15%, transparent);
  color: var(--c-velocity-light);
}

.cap-btn-off {
  border-color: var(--c-surface-solid);
  color: var(--c-text-dim);
}

.cap-btn-off:hover {
  border-color: var(--c-neutral-700);
  background: color-mix(in srgb, var(--c-surface-solid) 40%, transparent);
}
</style>
