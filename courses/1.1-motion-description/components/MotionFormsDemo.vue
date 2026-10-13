<!-- 1.1 运动的常见形态：平动 / 转动 / 振动 三连动画（精修版 · 严格遵循初学概念） -->
<template>
  <div class="mf-panels">
    <!-- 1. 平动：木箱/滑块整体平移，各点运动情况完全相同 -->
    <div class="mf-panel">
      <svg
        viewBox="0 0 220 140"
        class="mf-svg"
        role="img"
        aria-label="平动：木箱整体平移，各点运动情况完全相同"
      >
        <defs>
          <linearGradient id="mf-block-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>

        <!-- 导轨基准水平线 -->
        <line x1="16" y1="116" x2="204" y2="116" stroke="#475569" stroke-width="2" />
        <!-- 导轨下方固定接触面阴影斜线 -->
        <g stroke="rgba(148,163,184,0.25)" stroke-width="1.2">
          <line
            v-for="x in [28, 48, 68, 88, 108, 128, 148, 168, 188]"
            :key="x"
            :x1="x"
            y1="116"
            :x2="x - 6"
            y2="124"
          />
        </g>

        <!-- 运动水平参考辅助虚线 -->
        <line
          x1="20"
          y1="74"
          x2="200"
          y2="74"
          stroke="rgba(245,158,11,0.2)"
          stroke-width="1"
          stroke-dasharray="4 4"
        />
        <line
          x1="20"
          y1="94"
          x2="200"
          y2="94"
          stroke="rgba(56,189,248,0.2)"
          stroke-width="1"
          stroke-dasharray="4 4"
        />

        <!-- 滑块平动动画组 -->
        <g class="mf-slide">
          <!-- 质感木箱/滑块主体 -->
          <rect
            x="-24"
            y="62"
            width="48"
            height="52"
            rx="6"
            fill="url(#mf-block-grad)"
            stroke="#475569"
            stroke-width="1.8"
          />
          <rect
            x="-20"
            y="66"
            width="40"
            height="44"
            rx="4"
            fill="none"
            stroke="rgba(148,163,184,0.22)"
            stroke-width="1"
          />

          <!-- 滑块内两质点连接线（平动时保持方向不变） -->
          <line
            x1="-12"
            y1="74"
            x2="12"
            y2="94"
            stroke="rgba(226,232,240,0.35)"
            stroke-width="1.4"
            stroke-dasharray="2 2"
          />

          <!-- 标记点 1（黄色） -->
          <circle cx="-12" cy="74" r="4.8" fill="#f59e0b" stroke="#0f172a" stroke-width="1.4" />
          <!-- 标记点 2（天青色） -->
          <circle cx="12" cy="94" r="4.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1.4" />

          <!-- 底座接触滑块垫片 -->
          <rect x="-18" y="114" width="10" height="2" rx="1" fill="#94a3b8" />
          <rect x="8" y="114" width="10" height="2" rx="1" fill="#94a3b8" />
        </g>
      </svg>
      <div class="mf-name">平动</div>
      <div class="mf-note">各点的运动情况完全相同</div>
    </div>

    <!-- 2. 转动：轮盘绕轴旋转，各点做半径不同的圆周运动 -->
    <div class="mf-panel">
      <svg
        viewBox="0 0 220 140"
        class="mf-svg"
        role="img"
        aria-label="转动：轮盘绕轴旋转，各点做半径不同的圆周运动"
      >
        <defs>
          <linearGradient id="mf-wheel-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(30,41,59,0.92)" />
            <stop offset="100%" stop-color="rgba(15,23,42,0.95)" />
          </linearGradient>
        </defs>

        <!-- 两个标记点运动的同心圆轨迹虚线 (中心 110, 80) -->
        <!-- 内圈轨迹 (r = 22) -->
        <circle
          cx="110"
          cy="80"
          r="22"
          fill="none"
          stroke="rgba(245,158,11,0.32)"
          stroke-width="1.4"
          stroke-dasharray="4 4"
        />
        <!-- 外圈轨迹 (r = 42) -->
        <circle
          cx="110"
          cy="80"
          r="42"
          fill="none"
          stroke="rgba(56,189,248,0.32)"
          stroke-width="1.4"
          stroke-dasharray="5 4"
        />

        <!-- 旋转轮盘主体组（顺时针匀速旋转） -->
        <g class="mf-spin">
          <!-- 轮盘圆盘与边框 -->
          <circle
            cx="110"
            cy="80"
            r="48"
            fill="url(#mf-wheel-grad)"
            stroke="#475569"
            stroke-width="1.6"
          />
          <circle
            cx="110"
            cy="80"
            r="46"
            fill="none"
            stroke="rgba(148,163,184,0.18)"
            stroke-width="1"
          />

          <!-- 轮盘4条对称加强辐条 -->
          <g stroke="#334155" stroke-width="4" stroke-linecap="round">
            <line x1="110" y1="38" x2="110" y2="122" />
            <line x1="68" y1="80" x2="152" y2="80" />
          </g>

          <!-- 标记点所在的高亮主辐条 -->
          <line
            x1="110"
            y1="80"
            x2="154"
            y2="80"
            stroke="rgba(226,232,240,0.8)"
            stroke-width="1.8"
            stroke-linecap="round"
          />

          <!-- 内圈标记点（r = 22，黄色） -->
          <circle cx="132" cy="80" r="4.8" fill="#f59e0b" stroke="#0f172a" stroke-width="1.4" />
          <!-- 外圈标记点（r = 42，天青色） -->
          <circle cx="152" cy="80" r="4.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1.4" />
        </g>

        <!-- 中心固定转轴（不随盘旋转） -->
        <circle cx="110" cy="80" r="7.5" fill="#1e293b" stroke="#94a3b8" stroke-width="1.8" />
        <circle cx="110" cy="80" r="2.8" fill="#e2e8f0" />
      </svg>
      <div class="mf-name">转动</div>
      <div class="mf-note">各点做半径不同的圆周运动</div>
    </div>

    <!-- 3. 振动：单摆在平衡位置附近往复运动 -->
    <div class="mf-panel">
      <svg
        viewBox="0 0 220 140"
        class="mf-svg"
        role="img"
        aria-label="振动：摆锤在平衡位置附近往复运动"
      >
        <defs>
          <radialGradient id="mf-bob-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="60%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#b45309" />
          </radialGradient>
        </defs>

        <!-- 顶部天花板固定基座 -->
        <line
          x1="82"
          y1="18"
          x2="138"
          y2="18"
          stroke="#64748b"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <g stroke="rgba(148,163,184,0.3)" stroke-width="1.2">
          <line v-for="x in [88, 98, 108, 118, 128]" :key="x" :x1="x" y1="18" :x2="x + 5" y2="11" />
        </g>

        <!-- 竖直平衡位置基准虚线 -->
        <line
          x1="110"
          y1="20"
          x2="110"
          y2="124"
          stroke="rgba(148,163,184,0.3)"
          stroke-width="1.3"
          stroke-dasharray="4 4"
        />

        <!-- 底部往复摆动圆弧虚线轨迹 -->
        <path
          d="M 76 96 Q 110 105 144 96"
          fill="none"
          stroke="rgba(245,158,11,0.22)"
          stroke-width="1.4"
          stroke-dasharray="3 3"
        />

        <!-- 单摆往复摆动实体组 (悬挂中心 110, 20) -->
        <g class="mf-swing">
          <!-- 悬线 -->
          <line x1="110" y1="20" x2="110" y2="92" stroke="#e2e8f0" stroke-width="1.8" />
          <!-- 质感金属摆锤小球 -->
          <circle
            cx="110"
            cy="98"
            r="10.5"
            fill="url(#mf-bob-grad)"
            stroke="#0f172a"
            stroke-width="1.4"
          />
          <circle cx="106.8" cy="94.8" r="3" fill="rgba(255,255,255,0.6)" />
        </g>

        <!-- 顶部悬挂销钉 -->
        <circle cx="110" cy="20" r="3.8" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4" />
      </svg>
      <div class="mf-name">振动</div>
      <div class="mf-note">在平衡位置附近往复运动</div>
    </div>
  </div>
</template>

<style scoped>
.mf-panels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  width: 100%;
}

.mf-panel {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.75rem 0.85rem 0.9rem;
  border: 1px solid rgb(148 163 184 / 16%);
  border-radius: 1.15rem;

  background: rgb(15 20 37 / 55%);
  box-shadow: 0 4px 20px -4px rgb(0 0 0 / 25%);

  backdrop-filter: blur(16px);

  transition: border-color 0.2s ease;
}

.mf-panel:hover {
  border-color: rgb(148 163 184 / 35%);
}

.mf-svg {
  display: block;
  width: 100%;
  height: auto;
}

.mf-name {
  margin-top: 0.45rem;

  color: var(--c-text, #e2e8f0);

  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: -0.01em;
}

.mf-note {
  margin-top: 0.15rem;

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.78rem;
  line-height: 1.4;
  text-align: center;
}

/* 1. 平动：往复平移 */
.mf-slide {
  animation: mf-translate 3.4s ease-in-out infinite;
}

/* 2. 转动：顺时针旋转 */
.mf-spin {
  transform-origin: 110px 80px;
  transform-box: view-box;
  animation: mf-rotate 3s linear infinite;
}

/* 3. 振动：单摆自然谐振往复摆动 */
.mf-swing {
  transform-origin: 110px 20px;
  transform-box: view-box;
  animation: mf-swing 2.4s ease-in-out infinite;
}

@keyframes mf-translate {
  0%,
  100% {
    transform: translateX(56px);
  }

  50% {
    transform: translateX(164px);
  }
}

@keyframes mf-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes mf-swing {
  0%,
  100% {
    transform: rotate(-25deg);
  }

  50% {
    transform: rotate(25deg);
  }
}

@media (width <= 768px) {
  .mf-panels {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mf-slide,
  .mf-spin,
  .mf-swing {
    animation: none;
  }
}
</style>
