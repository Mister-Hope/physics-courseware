<script setup lang="ts">
/**
 * 选必2 1.x《复合场中的配速法与摆线运动》Slidev 课件封面右下角装饰图（纯图形无字精修版） 视觉构图：
 *
 * 1. 顶轨水平切线与圆心水平平移导轨（水平平动分运动）；
 * 2. 滚动圆环与轮缘质点（圆周转动分运动，切线速度恒垂直于半径）；
 * 3. 复合合成的优美金色/青蓝光辉摆线轨迹（Cycloid），从顶点尖点顺滑下沉并回升；
 * 4. 背景均匀微光磁场点阵与微光滤镜，呈现高端科技感与学术沉淀感。
 */
const { width = 360 } = defineProps<{ width?: number }>();

// 几何比例与参数
const R = 44;
const X0 = 38;
const LINE_Y = 28;
const CENTER_Y = LINE_Y + R; // 72
const TROUGH_Y = LINE_Y + 2 * R; // 116

// 摆线路径生成（从 θ = 0 到 2π，共 60 个点）
const SAMPLES = 64;
const points: string[] = [];
for (let i = 0; i <= SAMPLES; i++) {
  const th = (i / SAMPLES) * 2 * Math.PI;
  const x = X0 + R * (th - Math.sin(th));
  const y = CENTER_Y - R * Math.cos(th);
  points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
}
const cycloidPath = points.join(" ");

// 当前滚动轮位置：取 θ = 1.35π (约 243°，位于上升段，极具动感与张力)
const activeTheta = 1.35 * Math.PI;
const activeCenterX = X0 + R * activeTheta; // ~224.5
const activeCenterY = CENTER_Y; // 72

// 轮缘小球位置 (屏幕坐标: x = cx - R·sinθ, y = cy - R·cosθ)
const ballX = activeCenterX - R * Math.sin(activeTheta); // ~263.6
const ballY = activeCenterY - R * Math.cos(activeTheta); // ~91.3

// 绕圆心转动的切线速度向量（屏幕坐标：v_circ = (-V·cosθ, +V·sinθ)，与半径严格垂直）
const V_LEN = 36;
const vCircX = -V_LEN * Math.cos(activeTheta);
const vCircY = V_LEN * Math.sin(activeTheta);
const vCircTipX = ballX + vCircX;
const vCircTipY = ballY + vCircY;

// 圆心平动速度向量（水平向右）
const vFlatTipX = activeCenterX + V_LEN;

// 直角符号（90° 几何角标记）
const s = 7;
const inRadX = Math.sin(activeTheta);
const inRadY = Math.cos(activeTheta);
const tanVX = -Math.cos(activeTheta);
const tanVY = Math.sin(activeTheta);
const ra1 = { x: ballX + s * tanVX, y: ballY + s * tanVY };
const ra2 = { x: ballX + s * tanVX + s * inRadX, y: ballY + s * tanVY + s * inRadY };
const ra3 = { x: ballX + s * inRadX, y: ballY + s * inRadY };
const rightAngleD = `M ${ra1.x.toFixed(1)} ${ra1.y.toFixed(1)} L ${ra2.x.toFixed(1)} ${ra2.y.toFixed(1)} L ${ra3.x.toFixed(1)} ${ra3.y.toFixed(1)}`;
</script>

<template>
  <svg
    viewBox="0 0 360 156"
    :width="width"
    :height="Math.round((width * 156) / 360)"
    xmlns="http://www.w3.org/2000/svg"
    class="select-none overflow-visible"
    aria-hidden="true"
  >
    <defs>
      <!-- 摆线金色柔光滤镜 -->
      <filter id="cycloid-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 粒子发光滤镜 -->
      <filter id="particle-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 摆线光辉渐变 -->
      <linearGradient id="cycloid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--c-physics-light)" stop-opacity="0.5" />
        <stop offset="35%" stop-color="var(--c-velocity)" stop-opacity="0.8" />
        <stop offset="55%" stop-color="var(--c-accent)" stop-opacity="1" />
        <stop offset="100%" stop-color="var(--c-accent-glow)" stop-opacity="0.9" />
      </linearGradient>

      <!-- 轮体科技渐变 -->
      <radialGradient id="wheel-radial" cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          stop-color="color-mix(in srgb, var(--c-physics-light) 14%, transparent)"
        />
        <stop offset="70%" stop-color="rgba(30,58,138,0.08)" />
        <stop
          offset="100%"
          stop-color="color-mix(in srgb, var(--c-neutral-900) 30%, transparent)"
        />
      </radialGradient>
    </defs>

    <!-- ==================== 0. 背景层：微弱匀强磁场点阵 ====================
         磁场记号一律用共享 <FieldDots>（裸 ×，不带圈），不手画叉点阵；
         原手绘版列距 44、行距 40，组件只有一个 spacing，这里统一取 44。 -->
    <FieldDots
      :x="22"
      :y="18"
      :cols="8"
      :rows="4"
      :spacing="44"
      :size="3.5"
      :line-width="1.3"
      :opacity="0.14"
      dir="in"
    />
    <!-- ==================== 1. 导轨参考线 ==================== -->
    <!-- 顶部接触线（摆线尖点相切线） -->
    <line
      x1="18"
      :y1="LINE_Y"
      x2="342"
      :y2="LINE_Y"
      stroke="var(--c-neutral-500)"
      stroke-width="1.4"
      opacity="0.6"
    />
    <!-- 圆心匀速平移水平虚线 -->
    <line
      x1="18"
      :y1="CENTER_Y"
      x2="342"
      :y2="CENTER_Y"
      stroke="var(--c-neutral-500)"
      stroke-width="1.2"
      stroke-dasharray="5 5"
      opacity="0.35"
    />
    <!-- 摆线最低深度基准线 -->
    <line
      x1="18"
      :y1="TROUGH_Y"
      x2="342"
      :y2="TROUGH_Y"
      stroke="var(--c-neutral-500)"
      stroke-width="1"
      stroke-dasharray="3 4"
      opacity="0.22"
    />

    <!-- ==================== 2. 起始时刻虚影轮 (θ = 0) ==================== -->
    <g opacity="0.32">
      <!-- 起始圆轮虚线 -->
      <circle
        :cx="X0"
        :cy="CENTER_Y"
        :r="R"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="1.4"
        stroke-dasharray="4 4"
      />
      <!-- 起始尖点微粒 -->
      <circle :cx="X0" :cy="LINE_Y" r="4.5" fill="var(--c-accent)" />
    </g>

    <!-- ==================== 3. 摆线轨迹（光辉曲线） ==================== -->
    <!-- 曲线暗色衬底 -->
    <path
      :d="cycloidPath"
      fill="none"
      stroke="var(--c-neutral-900)"
      stroke-width="6"
      stroke-linecap="round"
      opacity="0.75"
    />
    <!-- 曲线发光底层 -->
    <path
      :d="cycloidPath"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="3.6"
      stroke-linecap="round"
      filter="url(#cycloid-glow)"
      opacity="0.45"
    />
    <!-- 曲线高精主线 -->
    <path
      :d="cycloidPath"
      fill="none"
      stroke="url(#cycloid-gradient)"
      stroke-width="2.6"
      stroke-linecap="round"
    />

    <!-- ==================== 4. 动态滚动圆轮主体 (θ = 1.35π) ==================== -->
    <!-- 圆体填充与外圈 -->
    <circle
      :cx="activeCenterX"
      :cy="activeCenterY"
      :r="R"
      fill="url(#wheel-radial)"
      stroke="var(--c-velocity)"
      stroke-width="2"
      opacity="0.85"
    />
    <!-- 内圈同心装饰细环 -->
    <circle
      :cx="activeCenterX"
      :cy="activeCenterY"
      :r="R * 0.58"
      fill="none"
      stroke="var(--c-velocity)"
      stroke-width="1"
      stroke-dasharray="3 4"
      opacity="0.4"
    />

    <!-- 圆心微粒点 -->
    <circle :cx="activeCenterX" :cy="activeCenterY" r="3.2" fill="var(--c-velocity)" />

    <!-- 圆心到小球的半径线 -->
    <line
      :x1="activeCenterX"
      :y1="activeCenterY"
      :x2="ballX"
      :y2="ballY"
      stroke="var(--c-velocity)"
      stroke-width="1.8"
    />

    <!-- 圆心平动速度箭头 v_平 -->
    <g stroke="var(--c-physics-light)" stroke-width="2" stroke-linecap="round">
      <line :x1="activeCenterX" :y1="activeCenterY" :x2="vFlatTipX" :y2="activeCenterY" />
      <polygon
        :points="`${vFlatTipX + 2},${activeCenterY} ${vFlatTipX - 6},${activeCenterY - 3.5} ${vFlatTipX - 6},${activeCenterY + 3.5}`"
        fill="var(--c-physics-light)"
        stroke="none"
      />
    </g>

    <!-- 直角符号：印证 v_圆 恒垂直于半径 -->
    <path :d="rightAngleD" fill="none" stroke="rgba(255, 255, 255, 0.7)" stroke-width="1.4" />

    <!-- 切线速度箭头 v_圆（严格沿切线方向，垂直于半径） -->
    <g stroke="var(--c-velocity)" stroke-width="2.2" stroke-linecap="round">
      <line :x1="ballX" :y1="ballY" :x2="vCircTipX" :y2="vCircTipY" />
      <!-- 箭头尖端 -->
      <polygon
        :points="`
          ${vCircTipX + 2 * tanVX},${vCircTipY + 2 * tanVY}
          ${vCircTipX - 6 * tanVX + 3.5 * inRadX},${vCircTipY - 6 * tanVY + 3.5 * inRadY}
          ${vCircTipX - 6 * tanVX - 3.5 * inRadX},${vCircTipY - 6 * tanVY - 3.5 * inRadY}
        `"
        fill="var(--c-velocity)"
        stroke="none"
      />
    </g>

    <!-- 轮内旋转角速度弧指示 -->
    <path
      :d="`M ${activeCenterX - 14} ${activeCenterY + 14} A 18 18 0 0 1 ${activeCenterX + 12} ${activeCenterY + 12}`"
      fill="none"
      stroke="var(--c-physics-light)"
      stroke-width="1.4"
      stroke-dasharray="3 3"
      opacity="0.65"
    />

    <!-- ==================== 5. 轮缘质点（红色正电荷，带光晕） ==================== -->
    <circle
      :cx="ballX"
      :cy="ballY"
      r="8"
      fill="#ef4444"
      stroke="var(--c-neutral-900)"
      stroke-width="2"
      filter="url(#particle-glow)"
    />
    <!-- 加粗正电荷符号十字 -->
    <line
      :x1="ballX - 3.8"
      :y1="ballY"
      :x2="ballX + 3.8"
      :y2="ballY"
      stroke="#ffffff"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <line
      :x1="ballX"
      :y1="ballY - 3.8"
      :x2="ballX"
      :y2="ballY + 3.8"
      stroke="#ffffff"
      stroke-width="1.8"
      stroke-linecap="round"
    />
  </svg>
</template>
