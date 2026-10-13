<script setup lang="ts">
/**
 * 充电宝：铭牌毫安时是电荷量（容量），能量 = 电动势 × 电荷量 = E·Q
 *
 * 遵循 PPT 极简原则：
 *
 * - 纯粹聚焦题干核心数据：10,000 mAh、3.7 V
 * - 左侧保留高颜值精修充电宝、手机与数据线，彻底解决 10,000 mAh 溢出超框缺陷
 * - 右侧直接展示固定核心公式计算结果与民航 160 Wh 判定胶囊
 * - 无滑块、无杂乱提示小字，大字号、高清晰度，适合远屏投影
 */
</script>

<template>
  <div class="pb-wrap select-none">
    <!-- 左侧：精修版充电宝 + 手机示意图卡片 -->
    <div class="pb-fig">
      <svg
        viewBox="0 0 520 280"
        class="pb-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="充电宝为手机充电示意"
      >
        <defs>
          <!-- 充电宝质感外壳渐变 -->
          <linearGradient id="pb-body-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(30, 41, 59, 0.95)" />
            <stop offset="50%" stop-color="rgba(15, 23, 42, 0.98)" />
            <stop offset="100%" stop-color="rgba(30, 41, 59, 0.9)" />
          </linearGradient>

          <!-- 手机前面板黑晶渐变 -->
          <linearGradient id="phone-body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <!-- 动感充电脉冲光效 -->
          <linearGradient id="cable-energy-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#e2a846" />
            <stop offset="50%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#4ade80" />
          </linearGradient>
        </defs>

        <!-- ==================== 1. 充电宝 (Power Bank) ==================== -->
        <!-- 标签 -->
        <text x="126" y="38" text-anchor="middle" font-size="14" font-weight="600" fill="#94a3b8">
          充电宝
        </text>

        <!-- 充电宝机身 -->
        <rect
          x="44"
          y="48"
          width="164"
          height="198"
          rx="22"
          fill="url(#pb-body-grad)"
          stroke="#e2a846"
          stroke-width="2.6"
        />

        <!-- 侧边实体按键 -->
        <rect
          x="39"
          y="88"
          width="5"
          height="24"
          rx="2"
          fill="#475569"
          stroke="#334155"
          stroke-width="1"
        />

        <!-- 智能 OLED 数显屏（宽 140px，两侧留白充裕，彻底解决文字超框溢出） -->
        <rect
          x="56"
          y="64"
          width="140"
          height="76"
          rx="12"
          fill="#050811"
          stroke="#3b82f6"
          stroke-opacity="0.65"
          stroke-width="1.8"
        />

        <!-- 屏幕内部主读数：10,000 mAh -->
        <text x="126" y="96" text-anchor="middle">
          <tspan
            font-family="KaTeX_Main, 'Times New Roman', serif"
            font-size="22"
            font-weight="800"
            fill="#e2a846"
          >
            10,000
          </tspan>
          <tspan font-size="13" font-weight="700" fill="#fbbf24" dx="3">mAh</tspan>
        </text>

        <!-- 屏幕分界线 -->
        <line x1="68" y1="106" x2="184" y2="106" stroke="rgba(148,163,184,0.2)" stroke-width="1" />

        <!-- 屏幕电压读数：3.7 V -->
        <text
          x="126"
          y="126"
          text-anchor="middle"
          font-family="KaTeX_Main, 'Times New Roman', serif"
          font-size="17"
          font-weight="700"
          fill="#60a5fa"
        >
          3.7 V
        </text>

        <!-- 充电宝机身经典金色闪电标识 -->
        <polygon
          points="128,156 118,176 124,176 117,196 137,174 130,174 132,156"
          fill="#e2a846"
          opacity="0.95"
        />

        <!-- 充电宝底部 USB-C 接口 -->
        <rect
          x="114"
          y="242"
          width="24"
          height="8"
          rx="2.5"
          fill="#090d16"
          stroke="#475569"
          stroke-width="1.4"
        />
        <rect x="118" y="245" width="16" height="3" rx="1" fill="#e2a846" opacity="0.85" />

        <!-- ==================== 2. 动感数据线 ==================== -->
        <path
          d="M 126 250 C 126 286 240 292 334 280 C 352 278 364 266 364 248"
          fill="none"
          stroke="#1e293b"
          stroke-width="5.5"
          stroke-linecap="round"
        />
        <path
          d="M 126 250 C 126 286 240 292 334 280 C 352 278 364 266 364 248"
          fill="none"
          stroke="#475569"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d="M 126 250 C 126 286 240 292 334 280 C 352 278 364 266 364 248"
          fill="none"
          stroke="url(#cable-energy-grad)"
          stroke-width="1.8"
          stroke-dasharray="8 12"
          class="animate-[dash_2s_linear_infinite]"
        />

        <!-- 充电宝端插头 -->
        <rect
          x="118"
          y="248"
          width="16"
          height="10"
          rx="2.5"
          fill="#334155"
          stroke="#64748b"
          stroke-width="1.2"
        />

        <!-- 手机端插头 -->
        <rect
          x="356"
          y="246"
          width="16"
          height="10"
          rx="2.5"
          fill="#334155"
          stroke="#64748b"
          stroke-width="1.2"
        />

        <!-- ==================== 3. 手机 (Smartphone) ==================== -->
        <!-- 标签 -->
        <text x="364" y="38" text-anchor="middle" font-size="14" font-weight="600" fill="#94a3b8">
          手机
        </text>

        <!-- 手机外框 -->
        <rect
          x="304"
          y="46"
          width="120"
          height="200"
          rx="18"
          fill="url(#phone-body-grad)"
          stroke="#475569"
          stroke-width="2.2"
        />

        <!-- 手机前置微摄/听筒 -->
        <rect x="348" y="52" width="32" height="5" rx="2.5" fill="#1e293b" />

        <!-- 手机显示屏 -->
        <rect
          x="312"
          y="62"
          width="104"
          height="174"
          rx="12"
          fill="#050811"
          stroke="rgba(100,116,139,0.35)"
          stroke-width="1.2"
        />

        <!-- 手机屏幕内部优雅充电指示 (真实生动，无任何乱文字) -->
        <g transform="translate(364, 136)">
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="none"
            stroke="rgba(74,222,128,0.15)"
            stroke-width="4.5"
          />
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="none"
            stroke="#4ade80"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="115 50"
            transform="rotate(-40)"
          />
          <polygon points="2,-12 -6,-1 -1,-1 -4,12 7,-2 1,-2 2,-12" fill="#4ade80" />
          <text x="0" y="42" text-anchor="middle" font-size="13" font-weight="800" fill="#4ade80">
            78%
          </text>
        </g>

        <!-- 手机底部接口卡槽 -->
        <rect x="354" y="242" width="20" height="6" rx="2" fill="#090d16" />
      </svg>
    </div>

    <!-- 右侧：固定公式结果面板 + 民航 160 Wh 限额（严格遵照原版 PPT 结构） -->
    <div class="pb-panel">
      <!-- 公式换算结果区 -->
      <div class="pb-reads">
        <!-- Q = C/1000 A × 3600 s = 36, 000 C -->
        <div class="pb-line">
          <span class="font-serif italic font-bold">Q</span> =
          <span
            class="inline-flex flex-col items-center align-middle mx-1.5 leading-tight text-center font-serif"
          >
            <span class="border-b border-slate-300 px-1 pb-0.5 italic">C</span>
            <span class="pt-0.5 text-xs">1000</span>
          </span>
          A × 3600 s =
          <span class="font-bold text-slate-100 ml-1.5">36, 000 C</span>
        </div>

        <!-- W = E · Q = 133, 200 J -->
        <div class="pb-line">
          <span class="font-serif italic font-bold">W</span> =
          <span class="font-serif italic">E</span> · <span class="font-serif italic">Q</span> =
          <span class="font-bold text-slate-100 ml-1.5">133, 200 J</span>
        </div>

        <!-- W = E · C/1000 A·h = 37.0 Wh (醒目金色) -->
        <div class="pb-line pb-line-wh">
          <span class="font-serif italic font-bold">W</span> =
          <span class="font-serif italic">E</span> ·
          <span
            class="inline-flex flex-col items-center align-middle mx-1.5 leading-tight text-center font-serif text-amber-400"
          >
            <span class="border-b border-amber-400 px-1 pb-0.5 italic">C</span>
            <span class="pt-0.5 text-xs">1000</span>
          </span>
          A·h =
          <span class="font-black text-amber-400 ml-1.5 text-2xl">37.0 Wh</span>
        </div>
      </div>

      <!-- 民航限额判定胶囊徽标 -->
      <div class="pb-verdict pb-ok">
        <svg
          class="pb-v-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"
          />
        </svg>
        <span>不超过民航 160 Wh 限额 —— 可以携带上机</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pb-wrap {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
}

.pb-fig {
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0.6rem;
  border: 1px solid rgb(100 116 139 / 25%);
  border-radius: 1.1rem;
  background: rgb(15 23 42 / 55%);
}

.pb-svg {
  width: 100%;
  height: auto;
  max-height: 250px;
}

.pb-panel {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  min-width: 0;
}

.pb-reads {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.1rem 1.4rem;
  border: 1px solid rgb(100 116 139 / 22%);
  border-radius: 1.1rem;
  background: rgb(15 23 42 / 65%);
}

.pb-line {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #cbd5e1;
}

.pb-line-wh {
  color: #e2a846;
  font-weight: 700;
  border-top: 1px solid rgba(100, 116, 139, 0.2);
  padding-top: 0.65rem;
}

.pb-verdict {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem 1.1rem;
  border-radius: 0.95rem;
  font-weight: 700;
  font-size: 1.18rem;
}

.pb-ok {
  border: 1px solid rgb(74 222 128 / 35%);
  background: rgb(74 222 128 / 10%);
  color: #86efac;
}

.pb-v-svg {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  color: #4ade80;
}

@keyframes dash {
  to {
    stroke-dashoffset: -40;
  }
}
</style>
