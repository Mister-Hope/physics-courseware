<template>
  <!--
    第 13、14 页：磁通量与投影面积 S′。
    三维斜视（x = B 方向、y = 进深、z = 竖直）；斜投影 screen = (x + 0.55y, −(z + 0.30y))。
    面 S：法线 n = (cosθ, sinθ, 0)，面内两方向 u = (−sinθ, cosθ, 0)、v = (0,0,1)，四角 = ±a·u ± b·v。
    投影面 S′：把四角的 x 分量去掉（投到垂直于 B 的平面上），面积 = S·cosθ —— 这里的坐标全是算出来的，不是摆拍的。
    θ = 0 时 S′ 与 S 重合（教材图 13.2-5 就是这种情形）；θ = 90° 时 S′ 退化成一条线。
    interactive=false 时只作静态图（第 13 页），interactive 时给 θ 滑杆（第 14 页）。
  -->
  <div class="sfd">
    <div class="sfd-fig" :class="{ 'sfd-stacked': stacked }">
      <div class="sfd-stage">
        <svg viewBox="0 0 560 360" width="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- 匀强磁场：沿 x 方向的平行磁感线 -->
          <g v-for="(f, i) in FIELD" :key="`f${i}`">
            <CourseArrow :from="p({ x: -2.4, y: f.y, z: f.z })" :to="p({ x: 2.4, y: f.y, z: f.z })" stroke="var(--c-accent)" :stroke-width="2.2" :opacity="0.4" />
          </g>
          <!-- 面 S -->
          <polygon :points="planePts" fill="var(--c-physics)" fill-opacity="0.08" stroke="var(--c-physics)" stroke-width="2.2" />
          <!-- 投影面 S′（第 1 击后出现） -->
          <template v-if="step >= 1">
            <polygon v-if="!degenerate" :points="shadowPts" fill="var(--c-accent)" fill-opacity="0.2" stroke="var(--c-accent)" stroke-width="2.6" stroke-dasharray="9 5" />
            <line v-else :x1="shadowLine.x1" :y1="shadowLine.y1" :x2="shadowLine.x2" :y2="shadowLine.y2" stroke="var(--c-accent)" stroke-width="2.8" stroke-dasharray="9 5" />
            <g stroke="var(--c-accent)" stroke-width="1.1" stroke-dasharray="4 4" opacity="0.55">
              <line v-for="(c, i) in QUAD" :key="`pl${i}`" :x1="p(c).x" :y1="p(c).y" :x2="p(shadow(c)).x" :y2="p(shadow(c)).y" />
            </g>
          </template>
          <!-- 法线 n 与夹角 θ -->
          <CourseArrow :from="p(ORIGIN)" :to="p(nTip)" stroke="var(--c-accent-2)" :stroke-width="2.4" label="n" :label-dx="8" :label-dy="-6" />
          <path :d="arcPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" :opacity="angle > 3 ? 1 : 0" />
          <text :x="arcLabel.x" :y="arcLabel.y" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text)" :opacity="angle > 3 ? 1 : 0">θ</text>
        </svg>
        <ChartLabel :x-percent="pct(p(QUAD[1])).x" :y-percent="pct(p(QUAD[1])).y" :parts="[{ tex: 'S' }]" :size="19" color="var(--c-physics)" :dx="14" :dy="-10" />
        <ChartLabel v-if="step >= 1" :x-percent="pct(p(shadow(QUAD[1]))).x" :y-percent="pct(p(shadow(QUAD[1]))).y" :parts="[{ tex: 'S\'' }]" :size="18" color="var(--c-accent)" :dx="16" :dy="18" />
        <ChartLabel :x-percent="pct(p({ x: 2.5, y: FIELD[FIELD.length - 1].y, z: FIELD[FIELD.length - 1].z })).x" :y-percent="pct(p({ x: 2.5, y: FIELD[FIELD.length - 1].y, z: FIELD[FIELD.length - 1].z })).y" :parts="[{ tex: 'B' }]" :size="18" color="var(--c-accent)" :dx="14" :dy="-10" />
      </div>
      <div class="sfd-panel" :class="{ 'sfd-panel-off': !interactive && step < 2 }">
        <CourseSlider v-if="interactive" v-model="thetaDeg" :min="0" :max="90" :step="1" label="面与磁场法线的夹角" label-width="12rem" label-tex="\theta">
          <template #value><Latex :tex="thetaTex" /></template>
        </CourseSlider>
        <div class="sfd-read" :class="{ 'sfd-hidden': step < 2 }">
          投影面积 <Latex :tex="shadowTex" />
        </div>
        <div class="sfd-read" :class="{ 'sfd-hidden': step < 2 }">
          磁通量 <Latex :tex="fluxTex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const {
  theta: thetaProp = 0,
  interactive = false,
  step = 0,
  stacked = false,
} = defineProps<{
  /** 初始夹角（度）：0 = 面与 B 垂直 */
  theta?: number
  /** 是否给滑杆（第 14 页）；第 13 页传 false */
  interactive?: boolean
  /** 当前点击步 */
  step?: number
  /** true = 滑杆与读数放在图下方（半栏页面用） */
  stacked?: boolean
}>()

const RAD = Math.PI / 180
/** B（T）、面面积 S（m²） */
const B = 0.5
const S_AREA = 0.06
/** 视图参数 */
const CX = 280
const CY = 190
const SCALE = 96
const HK = 0.55
const VK = 0.3
const A = 1.25
const BH = 0.95

interface P3 {
  x: number
  y: number
  z: number
}
const ORIGIN: P3 = { x: 0, y: 0, z: 0 }
/** 三维 → 屏幕（斜投影） */
const p = (q: P3): { x: number; y: number } => ({ x: CX + SCALE * (q.x + HK * q.y), y: CY - SCALE * (q.z + VK * q.y) })

const thetaDeg = ref(thetaProp)
const angle = computed(() => thetaDeg.value)
const rad = computed(() => angle.value * RAD)
const u = computed(() => ({ x: -Math.sin(rad.value), y: Math.cos(rad.value), z: 0 }))
const nDir = computed(() => ({ x: Math.cos(rad.value), y: Math.sin(rad.value), z: 0 }))
const nTip = computed(() => ({ x: nDir.value.x * 0.82, y: nDir.value.y * 0.82, z: 0 }))

/** 四个角：s、t ∈ {−1, 1}，顺序 (−1,−1) (1,−1) (1,1) (−1,1) */
const corner = (s: number, t: number): P3 => ({
  x: s * A * u.value.x,
  y: s * A * u.value.y,
  z: t * BH,
})
const QUAD: P3[] = [
  corner(-1, -1),
  corner(1, -1),
  corner(1, 1),
  corner(-1, 1),
]
const planePts = computed(() => QUAD.map((c) => { const q = p(c); return `${q.x.toFixed(1)},${q.y.toFixed(1)}` }).join(' '))
/** 投影到垂直于 B 的平面：去掉 x 分量 */
const shadow = (c: P3): P3 => ({ x: 0, y: c.y, z: c.z })
const shadowPts = computed(() => QUAD.map((c) => { const q = p(shadow(c)); return `${q.x.toFixed(1)},${q.y.toFixed(1)}` }).join(' '))
const degenerate = computed(() => Math.abs(Math.cos(rad.value)) < 0.04)
const shadowLine = computed(() => {
  const a = p({ x: 0, y: 0, z: -BH })
  const b = p({ x: 0, y: 0, z: BH })
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
})
/** 匀强磁场：沿 x 的 4 条平行磁感线 */
const FIELD = [
  { y: -0.85, z: -0.3 },
  { y: -0.2, z: -0.3 },
  { y: 0.45, z: -0.3 },
  { y: 1.1, z: -0.3 },
]
/** θ 弧（在 xy 平面内，半径 0.62） */
const arcPath = computed(() => {
  const pts: string[] = []
  const steps = 18
  for (let i = 0; i <= steps; i += 1) {
    const t = (angle.value * i) / steps * RAD
    const q = p({ x: 0.62 * Math.cos(t), y: 0.62 * Math.sin(t), z: 0 })
    pts.push(`${i === 0 ? 'M' : 'L'} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`)
  }
  return pts.join(' ')
})
const arcLabel = computed(() => {
  const t = (angle.value / 2) * RAD
  const q = p({ x: Math.cos(t), y: Math.sin(t), z: 0 })
  return { x: q.x, y: q.y }
})
/** 容器百分比（viewBox 560×360） */
const pct = (q: { x: number; y: number }): { x: number; y: number } => ({ x: (q.x / 560) * 100, y: (q.y / 360) * 100 })

const thetaTex = computed(() => `\\theta = ${thetaDeg.value}^\\circ`)
const shadowTex = computed(() => `S' = S\\cos\\theta = ${(S_AREA * Math.cos(rad.value)).toFixed(3)}\\ \\text{m}^2`)
const fluxTex = computed(() => `\\Phi = BS\\cos\\theta = ${(B * S_AREA * Math.cos(rad.value)).toFixed(3)}\\ \\text{Wb}`)

// 第 13 页：静态、与 B 垂直（无滑杆）
thetaDeg.value = interactive ? thetaProp || 40 : thetaProp
</script>

<style scoped>
.sfd {
  width: 100%;
  min-width: 0;
}

.sfd-fig {
  display: flex;
  gap: 1.2rem;
  align-items: center;

  min-width: 0;
}

.sfd-stage {
  position: relative;
  flex: 1 1 100%;
  width: 100%;

  min-width: 0;
}

.sfd-stage svg {
  display: block;
  width: 100%;
  height: auto;
}

.sfd-stacked {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.sfd-panel-off {
  display: none;
}

.sfd-stacked .sfd-panel {
  flex: 1 1 auto;

  width: 100%;
}

.sfd-panel {
  display: flex;
  flex: 0 1 380px;
  flex-direction: column;
  gap: 0.7rem;

  min-width: 0;
}

.sfd-read {
  min-height: 2rem;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-sm);

  background: color-mix(in srgb, var(--c-surface) 60%, transparent);

  font-variant-numeric: tabular-nums;
}

.sfd-hidden {
  visibility: hidden;
}
</style>
