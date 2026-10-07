<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

/** 卡车局部坐标：中国式平头高顶重卡前保险杠在 x = 388；起始位置在画面外左侧 */
const TRUCK_START = -600;
const TRUCK_FRONT = 388;
const GROUND_Y = 262;
const PERSON_X = 450;

/** 卡车速度 u（viewBox 单位/秒）：碰撞前后都保持这个速度——质量 M ≫ m，速度几乎不变 */
const TRUCK_SPEED = 900;

/** 弹性碰撞、且 M ≫ m：人被撞后以约 2u 沿同方向飞出（动量守恒 + 机械能守恒结果） */
const PERSON_SPEED = TRUCK_SPEED * 2;

/** 撞击时刻：平头重卡车头追上人的时间 */
const IMPACT_TIME = (PERSON_X - (TRUCK_FRONT + TRUCK_START)) / TRUCK_SPEED;

/** 人飞出的时间与上升高度：水平以 2u 匀速、竖直做小抛物运动 */
const FLIGHT_TIME = 0.5;
const APEX_HEIGHT = 60;
const LAUNCH_VY = (4 * APEX_HEIGHT) / FLIGHT_TIME;
const GRAVITY = (2 * LAUNCH_VY) / FLIGHT_TIME;

/** 播放总时长：人被撞飞出去、大运重卡继续匀速驶过画面 */
const TOTAL_TIME = 1.8;

/** 四组重型车轮在卡车局部坐标系中的圆心横坐标 */
const WHEEL_XS: number[] = [86, 152, 246, 344];

/** 货箱侧面加强筋横坐标 */
const RIB_XS: number[] = [66, 98, 130, 162, 194, 226, 258];

// 飞行轨迹：x = 2ut，y = v₀t − ½gt²；速度够大，轨迹直接越过画面右边界
const buildParabola = (): string => {
  const points: string[] = [];

  for (let index = 0; index <= 24; index += 1) {
    const time = (FLIGHT_TIME * index) / 24;
    const x = PERSON_X + PERSON_SPEED * time;
    const y = GROUND_Y - (LAUNCH_VY * time - 0.5 * GRAVITY * time * time);

    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points.join(" ");
};

const parabolaPoints = buildParabola();

const elapsed = ref(0);
let raf = 0;
let startTime = 0;

const tick = (now: number): void => {
  elapsed.value = Math.min(TOTAL_TIME, (now - startTime) / 1000);

  if (elapsed.value < TOTAL_TIME) raf = requestAnimationFrame(tick);
};

/** 点击画面播放一次；再点一次重播 */
const play = (): void => {
  cancelAnimationFrame(raf);
  startTime = performance.now();
  elapsed.value = 0;
  raf = requestAnimationFrame(tick);
};

onUnmounted(() => cancelAnimationFrame(raf));

const truckX = computed(() => TRUCK_START + TRUCK_SPEED * elapsed.value);

/** 人的位置：撞击前站定；撞击后按抛物线飞出画面右侧 */
const person = computed<Point>(() => {
  const time = elapsed.value - IMPACT_TIME;

  if (time <= 0) return { x: PERSON_X, y: GROUND_Y };

  const flight = Math.min(time, FLIGHT_TIME);

  return {
    x: PERSON_X + PERSON_SPEED * flight,
    y: GROUND_Y - (LAUNCH_VY * flight - 0.5 * GRAVITY * flight * flight),
  };
});

const personShift = computed<Point>(() => ({
  x: person.value.x - PERSON_X,
  y: person.value.y - GROUND_Y,
}));

/** 被撞飞后的空中前倾旋转角（度），增加幽默的凌空飞出动感 */
const personTilt = computed<number>(() => {
  const time = elapsed.value - IMPACT_TIME;

  if (time <= 0) return 0;

  return Math.min(1, time / FLIGHT_TIME) * 34;
});

const isHit = computed(() => elapsed.value > IMPACT_TIME);
const showBurst = computed(() => Math.abs(elapsed.value - IMPACT_TIME) < 0.09);
const showTrail = computed(() => elapsed.value > IMPACT_TIME);
</script>

<template>
  <!-- 第 10 页：撞大运——M ≫ m 的弹性碰撞：人约以两倍车速飞出画面，卡车速度几乎不变 -->
  <svg class="fig-truck" viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" @click="play">
    <!-- ==================== 1. 公路路面与车道标线 ==================== -->
    <line x1="20" y1="262" x2="880" y2="262" stroke="rgba(148,163,184,0.55)" stroke-width="3" stroke-linecap="round" />
    <line x1="36" y1="269" x2="864" y2="269" stroke="rgba(148,163,184,0.18)" stroke-width="1.5" stroke-dasharray="24 18" stroke-linecap="round" />

    <!-- ==================== 2. 中国红平头“大运重卡”（平头高顶驾驶室 + 重型挂车厢 + 车底附件） ==================== -->
    <g :transform="`translate(${truckX}, 0)`" stroke-linecap="round" stroke-linejoin="round">
      <!-- ① 重型底盘贯通大梁与车尾防撞梁 -->
      <rect x="34" y="218" width="350" height="12" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1.8" />
      <!-- 驾驶室与后挂箱之间的铝合金油箱与储气筒 -->
      <rect x="278" y="216" width="28" height="18" rx="3" fill="rgba(148,163,184,0.28)" stroke="#94a3b8" stroke-width="1.6" />
      <line x1="286" y1="216" x2="286" y2="234" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="298" y1="216" x2="298" y2="234" stroke="#94a3b8" stroke-width="1.2" />
      <!-- 驾驶室后方竖直金属排气管与防烫网 -->
      <line x1="296" y1="86" x2="296" y2="216" stroke="#94a3b8" stroke-width="3.2" />
      <rect x="293" y="118" width="6" height="68" rx="2" fill="#334155" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- ② 后部重型厢式货柜（x: 36..288, y: 78..220，中国红涂装 + 瓦楞加强筋 + 红白反光条） -->
      <rect x="36" y="78" width="252" height="142" rx="6" fill="rgba(185,28,28,0.28)" stroke="#ef4444" stroke-width="2.5" />
      <!-- 货柜顶部与底部中国红强化横梁 -->
      <rect x="36" y="78" width="252" height="14" rx="4" fill="rgba(220,38,38,0.45)" />
      <rect x="36" y="206" width="252" height="14" rx="3" fill="rgba(220,38,38,0.45)" />
      <!-- 货柜竖向瓦楞加强筋 -->
      <g stroke="rgba(248,113,113,0.25)" stroke-width="1.6">
        <line v-for="rx in RIB_XS" :key="`rib-${rx}`" :x1="rx" y1="94" :x2="rx" y2="204" />
      </g>
      <!-- 货柜中央醒目“大运重卡”铭牌横幅 -->
      <rect x="82" y="124" width="160" height="44" rx="6" fill="rgba(15,20,37,0.78)" stroke="#f87171" stroke-width="1.8" />
      <text x="162" y="153" text-anchor="middle" font-size="22" font-weight="bold" letter-spacing="3" fill="#fef2f2">大运重卡</text>
      <!-- 货柜下沿红白相间安全反光贴 -->
      <line x1="44" y1="213" x2="280" y2="213" stroke="#f8fafc" stroke-width="2.4" stroke-dasharray="12 12" />

      <!-- ③ 中国式平头高顶重卡驾驶室（x: 302..388, y: 80..226，无美式长鼻，前脸平直硬朗） -->
      <!-- 高顶流线型导流罩 + 平头主体轮廓（前脸在 x=386..388 几近竖直） -->
      <path
        d="M 302 222 L 302 98 Q 302 80 324 80 L 366 80 Q 380 80 383 96 L 387 148 L 387 222 Z"
        fill="rgba(220,38,38,0.42)"
        stroke="#f87171"
        stroke-width="2.6"
      />
      <!-- 高顶额头金色“DAYUN”字样与车顶三盏琥珀示廓灯 -->
      <circle cx="354" cy="77" r="2.5" fill="#facc15" />
      <circle cx="364" cy="77" r="2.5" fill="#facc15" />
      <circle cx="374" cy="77" r="2.5" fill="#facc15" />
      <line x1="306" y1="100" x2="383" y2="100" stroke="rgba(254,202,202,0.4)" stroke-width="1.4" />

      <!-- 驾驶室遮阳罩（前风挡上沿外探） -->
      <path d="M 378 96 L 391 102 L 385 106 Z" fill="#ef4444" stroke="#fca5a5" stroke-width="1.4" />

      <!-- 驾驶室侧窗与前风挡玻璃（带下沉式观察口特征） -->
      <path d="M 314 108 L 378 108 L 382 150 L 352 150 L 342 142 L 314 142 Z" fill="rgba(56,189,248,0.22)" stroke="#cbd5e1" stroke-width="1.8" />
      <!-- 玻璃高光斜线 -->
      <line x1="332" y1="112" x2="322" y2="136" stroke="rgba(255,255,255,0.35)" stroke-width="2" />
      <line x1="364" y1="112" x2="352" y2="144" stroke="rgba(255,255,255,0.28)" stroke-width="1.6" />

      <!-- 国产重卡标志性外摆门长臂后视镜 + 前方下视补盲镜 -->
      <path d="M 376 110 L 392 110 L 392 140 L 378 140" fill="none" stroke="#cbd5e1" stroke-width="1.8" />
      <rect x="389" y="114" width="5" height="20" rx="2" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.4" />
      <circle cx="389" cy="104" r="3.2" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.3" />

      <!-- 车门拉手、腰线与两级登车踏板 -->
      <line x1="304" y1="164" x2="386" y2="164" stroke="#fca5a5" stroke-width="1.6" />
      <rect x="316" y="172" width="12" height="3.5" rx="1.5" fill="#f8fafc" />
      <line x1="358" y1="204" x2="374" y2="204" stroke="#cbd5e1" stroke-width="2.2" />
      <line x1="358" y1="214" x2="374" y2="214" stroke="#cbd5e1" stroke-width="2.2" />

      <!-- 平头前脸进气格栅侧沿、厚重钢制前保险杠（x=388）与高亮矩阵大灯 -->
      <line x1="385" y1="154" x2="385" y2="192" stroke="#fca5a5" stroke-width="2.4" stroke-dasharray="4 4" />
      <!-- 矩阵式前大灯与日行灯 -->
      <rect x="378" y="192" width="10" height="12" rx="2" fill="#fef08a" stroke="#facc15" stroke-width="1.5" />
      <!-- 大灯光束 -->
      <polygon points="388,194 422,184 422,212 388,204" fill="rgba(250,204,21,0.16)" />
      <!-- 钢制重型前保险杠（最右端严格在 x = 388，对齐碰撞点计算） -->
      <rect x="374" y="206" width="16" height="22" rx="3" fill="#b91c1c" stroke="#f87171" stroke-width="2" />

      <!-- ④ 四组重型卡车轮胎与钢圈（底部 y = 240 + 21 = 261，严密贴合路面 y=262） -->
      <g v-for="wx in WHEEL_XS" :key="`wheel-${wx}`">
        <!-- 轮拱挡泥板 -->
        <path :d="`M ${wx - 25} 236 A 25 25 0 0 1 ${wx + 25} 236`" fill="none" stroke="#64748b" stroke-width="2.4" />
        <!-- 厚胎壁橡胶外胎 -->
        <circle :cx="wx" cy="240" r="20.5" fill="#0f1425" stroke="#94a3b8" stroke-width="3.2" />
        <!-- 钢圈轮毂与螺栓孔圈 -->
        <circle :cx="wx" cy="240" r="10.5" fill="#1e293b" stroke="#cbd5e1" stroke-width="2" />
        <circle :cx="wx" cy="240" r="4" fill="#ef4444" />
      </g>
    </g>

    <!-- ==================== 3. 2倍车速抛物飞出轨迹虚线 ==================== -->
    <polyline
      class="trail"
      :class="{ 'trail-hidden': !showTrail }"
      :points="parabolaPoints"
      fill="none"
      stroke="rgba(226,168,70,0.55)"
      stroke-width="3"
      stroke-dasharray="9 7"
      stroke-linecap="round"
    />

    <!-- ==================== 4. 撞击瞬间爆裂火花 ==================== -->
    <g v-show="showBurst" stroke-linecap="round" stroke-linejoin="round">
      <polygon
        points="436,192 414,174 432,180 426,156 444,174 460,152 456,178 482,170 462,190 486,204 458,202 466,226 444,206 422,222 432,198"
        fill="rgba(250,204,21,0.3)"
        stroke="#f87171"
        stroke-width="2.4"
      />
    </g>

    <!-- ==================== 5. 被撞的“我”（撞前休闲站立 / 撞后以 2u 手舞足蹈飞出） ==================== -->
    <g :transform="`translate(${personShift.x}, ${personShift.y})`">
      <g :transform="`translate(${PERSON_X}, 204) rotate(${personTilt}) translate(${-PERSON_X}, -204)`" stroke-linecap="round" stroke-linejoin="round">
        <!-- 姿态 A：撞击前安静站在路边 -->
        <g v-if="!isHit">
          <!-- 双腿与球鞋（脚底贴合 GROUND_Y = 262） -->
          <path d="M 445 216 L 441 258 L 435 259" fill="none" stroke="#cbd5e1" stroke-width="4.6" />
          <path d="M 455 216 L 459 258 L 466 259" fill="none" stroke="#cbd5e1" stroke-width="4.6" />
          <!-- 圆润夹克躯干 -->
          <rect x="439" y="174" width="22" height="43" rx="9" fill="rgba(96,165,250,0.28)" stroke="#60a5fa" stroke-width="2.4" />
          <!-- 自然下垂的双臂 -->
          <path d="M 440 182 Q 431 196 434 210" fill="none" stroke="#e2e8f0" stroke-width="4.2" />
          <path d="M 460 182 Q 469 196 466 210" fill="none" stroke="#e2e8f0" stroke-width="4.2" />
          <!-- 头部与表情 -->
          <circle cx="450" cy="154" r="14.5" fill="rgba(226,168,70,0.22)" stroke="#e2a846" stroke-width="2.8" />
          <circle cx="445" cy="152" r="1.8" fill="#f8fafc" />
          <circle cx="454" cy="152" r="1.8" fill="#f8fafc" />
          <path d="M 446 159 Q 450 162 454 159" fill="none" stroke="#f8fafc" stroke-width="1.6" />
        </g>

        <!-- 姿态 B：被撞后凌空手舞足蹈以 2u 飞出 -->
        <g v-else>
          <!-- 凌空乱蹬的双腿 -->
          <path d="M 444 214 Q 430 232 420 244" fill="none" stroke="#cbd5e1" stroke-width="4.6" />
          <path d="M 456 214 Q 470 228 482 222" fill="none" stroke="#cbd5e1" stroke-width="4.6" />
          <!-- 躯干 -->
          <rect x="439" y="174" width="22" height="42" rx="9" fill="rgba(96,165,250,0.32)" stroke="#60a5fa" stroke-width="2.4" />
          <!-- 惊慌高举的双臂 -->
          <path d="M 441 182 Q 422 168 416 154" fill="none" stroke="#e2e8f0" stroke-width="4.2" />
          <path d="M 459 182 Q 478 166 484 152" fill="none" stroke="#e2e8f0" stroke-width="4.2" />
          <!-- 头部与震惊 O 型嘴表情 -->
          <circle cx="450" cy="154" r="14.5" fill="rgba(226,168,70,0.26)" stroke="#e2a846" stroke-width="2.8" />
          <circle cx="446" cy="151" r="2.2" fill="#f8fafc" />
          <circle cx="456" cy="151" r="2.2" fill="#f8fafc" />
          <circle cx="452" cy="159" r="3.2" fill="none" stroke="#f8fafc" stroke-width="1.6" />
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.fig-truck {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

.trail {
  transition: opacity 0.3s ease;
}

.trail-hidden {
  opacity: 0;
}
</style>
