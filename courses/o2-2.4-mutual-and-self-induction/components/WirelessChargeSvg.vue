<!--
  第 5 页应用图之二：无线充电。
  教师整改要求：改成斜俯视的三维画法——充电板与手机都是"薄平行四边形板"（有厚度侧面），
  两块板平行叠放、中心同轴，板里的螺旋线圈在透视中正对着（同一根竖直轴）。
  几何：平面坐标 (u 横向, v 纵深, v > 0 为远端) 经斜投影 project() 变成屏幕坐标，
  板 = 平面矩形的四个角（连成平行四边形）+ 向下挤出 thickness；
  先画一块"下沉了 thickness 的同形底板"（深色，只露出下沿与右侧那圈 = 侧壁），再把顶面盖上去。
  线圈仍是本课 FlatCoil 的一条连续螺旋线，外面套一个剪切矩阵（coilShear）：
  FlatCoil 只做纵向压扁，再补上纵深方向的横向偏移，螺旋才真正落在板面里（否则会"浮"在板面外）。
  手机的辨识靠三样：细边框玻璃屏 + 屏幕远端的刘海缺口 + 近端 home 条；板里的线圈压暗（藏在机身里），
  充电板侧的线圈才是亮的——一眼能分出"手机在上、充电板在下"，也不会把板看成显示器。
  隔空传能不再画虚线（虚线弧容易被读成磁感线）：用柔和光区（课程样式 .coupling-glow 呼吸动画）
  加两个向上的小箭头表示能量从板送到手机。
-->
<script setup lang="ts">
/** 斜投影：纵深方向的横向偏移 / 纵向压缩（0.5 / 0.55 ≈ 从上前方俯视） */
const KX = 0.5;
const KY = 0.55;

interface Pt {
  x: number;
  y: number;
}

/** 平面坐标 (u 横向, v 纵深，v > 0 为远端) → 屏幕坐标 */
const project = (cx: number, cy: number, u: number, v: number): Pt => ({
  x: cx + u + KX * v,
  y: cy - KY * v,
});

/** 一块薄板的平面中心 */
interface Board {
  cx: number;
  cy: number;
}

/** 板面上一块矩形的四个角（屏幕上是顺时针：远左 → 远右 → 近右 → 近左）；可在平面内偏移，再整体下沉 drop */
const plateCorners = (
  board: Board,
  halfW: number,
  halfD: number,
  { u = 0, v = 0, drop = 0 }: { u?: number; v?: number; drop?: number } = {},
): Pt[] =>
  [
    project(board.cx, board.cy, u - halfW, v + halfD),
    project(board.cx, board.cy, u + halfW, v + halfD),
    project(board.cx, board.cy, u + halfW, v - halfD),
    project(board.cx, board.cy, u - halfW, v - halfD),
  ].map((point) => ({ x: point.x, y: point.y + drop }));

const round1 = (value: number): number => Math.round(value * 10) / 10;
const fmt = (point: Pt): string => `${round1(point.x)} ${round1(point.y)}`;

/** 圆角平行四边形：每个角换成"边上两个切点 + 二次贝塞尔"，屏幕上的圆角才是均匀的 */
const roundedPath = (pts: Pt[], radius: number): string => {
  const count = pts.length;
  const unit = (from: Pt, to: Pt): Pt => {
    const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    return { x: (to.x - from.x) / len, y: (to.y - from.y) / len };
  };
  const parts = pts.map((cur, index) => {
    const prev = pts[(index + count - 1) % count];
    const next = pts[(index + 1) % count];
    const inDir = unit(prev, cur);
    const outDir = unit(cur, next);
    const start: Pt = { x: cur.x - inDir.x * radius, y: cur.y - inDir.y * radius };
    const end: Pt = { x: cur.x + outDir.x * radius, y: cur.y + outDir.y * radius };
    return `${index === 0 ? "M" : "L"} ${fmt(start)} Q ${fmt(cur)} ${fmt(end)}`;
  });
  return `${parts.join(" ")} Z`;
};

/** 手机与充电板的几何：两块板的平面中心都是 (u, v) = (0, 0)，投影后落在同一条竖直线上（线圈同轴） */
const phone = { cx: 140, cy: 74, halfW: 54, halfD: 27, thickness: 7 };
const pad = { cx: 140, cy: 146, halfW: 66, halfD: 40, thickness: 9 };

const phonePath = roundedPath(plateCorners(phone, phone.halfW, phone.halfD), 10);
const phoneBasePath = roundedPath(
  plateCorners(phone, phone.halfW, phone.halfD, { drop: phone.thickness }),
  10,
);
const padPath = roundedPath(plateCorners(pad, pad.halfW, pad.halfD), 9);
const padBasePath = roundedPath(
  plateCorners(pad, pad.halfW, pad.halfD, { drop: pad.thickness }),
  9,
);

/** 手机正面：屏幕（细边框，一眼是玻璃屏不是整块面板）、远端刘海缺口、近端 home 条 */
const screenPath = roundedPath(plateCorners(phone, 50, 23), 5);
const notchPath = roundedPath(plateCorners(phone, 14, 1.6, { v: 21.4 }), 1.4);
const speakerPath = roundedPath(plateCorners(phone, 6, 0.45, { v: 20.6 }), 0.45);
const homeBarPath = roundedPath(plateCorners(phone, 8, 0.9, { v: -20.8 }), 0.9);

/** 右侧可见侧壁上的两个按键（电源键 / 音量键）：沿"远右 → 近右"下沉半个板厚画两小段亮线，板才像手机不像卡片 */
const phoneSideButtons = ((): { from: Pt; to: Pt }[] => {
  const farRight = project(phone.cx, phone.cy, phone.halfW, phone.halfD);
  const nearRight = project(phone.cx, phone.cy, phone.halfW, -phone.halfD);
  const dx = nearRight.x - farRight.x;
  const dy = nearRight.y - farRight.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return [0.26, 0.48].map((t) => {
    const cx = farRight.x + dx * t;
    const cy = farRight.y + dy * t + phone.thickness * 0.55;
    return {
      from: { x: cx - ux * 3.6, y: cy - uy * 3.6 },
      to: { x: cx + ux * 3.6, y: cy + uy * 3.6 },
    };
  });
})();

/** FlatCoil 只做纵向压扁（squash = KY），再套剪切矩阵补上 KX 的横向偏移，圆才变成板面上的椭圆 */
const coilShear = (cy: number): string => {
  const k = Math.round((KX / KY) * 1000) / 1000;
  return `matrix(1 0 ${k} -1 ${round1(-k * cy)} ${round1(2 * cy)})`;
};
</script>

<template>
  <svg viewBox="0 0 280 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="wc-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.34" />
        <stop offset="55%" stop-color="var(--c-accent)" stop-opacity="0.13" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="wc-screen" x1="0.15" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="#1d2b47" />
        <stop offset="55%" stop-color="#0d1526" />
        <stop offset="100%" stop-color="#070b16" />
      </linearGradient>
      <linearGradient id="wc-sheen" x1="0.1" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
        <stop offset="40%" stop-color="#ffffff" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- 隔空传能：两板之间的柔和光区（呼吸动画），不用虚线 -->
    <g class="coupling-glow">
      <ellipse :cx="pad.cx" cy="110" rx="54" ry="28" fill="url(#wc-glow)" />
    </g>
    <!-- 充电板：先画下沉一整块厚度（深色，露出的下沿就是侧壁），再盖顶面 -->
    <path :d="padBasePath" fill="var(--c-bg-soft)" stroke="none" />
    <path
      :d="padPath"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-500)"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <!-- 充电板内的线圈（亮金色＝这一侧的线圈，画满整个板面） -->
    <g :transform="coilShear(pad.cy)">
      <FlatCoil
        :x="pad.cx"
        :y="pad.cy"
        :inner-radius="11"
        :outer-radius="34"
        :turns="3"
        :squash="KY"
        :line-width="1.9"
        color="var(--c-accent)"
      />
    </g>
    <!-- 能量从板送到手机（两个向上小箭头，层级在光区之上、手机之下） -->
    <CourseArrow
      :from="{ x: 124, y: 122 }"
      :to="{ x: 124, y: 96 }"
      stroke="var(--c-accent)"
      :stroke-width="1.8"
      :head-size="7"
    />
    <CourseArrow
      :from="{ x: 156, y: 122 }"
      :to="{ x: 156, y: 96 }"
      stroke="var(--c-accent)"
      :stroke-width="1.8"
      :head-size="7"
    />
    <!-- 手机：先画下沉的深色侧面，再盖顶面 -->
    <path :d="phoneBasePath" fill="var(--c-bg-soft)" stroke="none" />
    <path
      :d="phonePath"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-500)"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <path
      :d="screenPath"
      fill="url(#wc-screen)"
      stroke="var(--c-neutral-600)"
      stroke-width="1.1"
      stroke-linejoin="round"
    />
    <!-- 手机内的线圈（蓝色、压暗：藏在机身里，与充电板线圈同一根竖直轴上正对） -->
    <g :transform="coilShear(phone.cy)" opacity="0.78">
      <FlatCoil
        :x="phone.cx"
        :y="phone.cy"
        :inner-radius="6"
        :outer-radius="17"
        :turns="3"
        :squash="KY"
        :line-width="1.5"
        color="var(--c-accent-2)"
      />
    </g>
    <!-- 玻璃反光：盖在线圈之上，线圈才像是"藏在玻璃下面"的机身内部，而不是画在屏上的图形 -->
    <path :d="screenPath" fill="url(#wc-sheen)" stroke="none" />
    <path :d="notchPath" fill="var(--c-bg)" stroke="none" />
    <path :d="speakerPath" fill="var(--c-text-dim)" stroke="none" />
    <g stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-linecap="round">
      <line
        v-for="(button, index) in phoneSideButtons"
        :key="`button-${index}`"
        :x1="button.from.x"
        :y1="button.from.y"
        :x2="button.to.x"
        :y2="button.to.y"
      />
    </g>
    <path :d="homeBarPath" fill="var(--c-neutral-500)" stroke="none" opacity="0.75" />
    <text :x="phone.cx" y="30" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">手机</text>
    <text :x="pad.cx" y="196" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">充电板</text>
  </svg>
</template>
