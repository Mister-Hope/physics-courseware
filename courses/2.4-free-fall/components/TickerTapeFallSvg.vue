<template>
  <!-- 第 8 页：用打点计时器测自由落体加速度——铁架台铁夹固定打点计时器，纸带竖直穿过限位孔下端系重锤，
       上方左手拉直纸带、下方右手托住砝码靠近计时器，接通电源后松手让砝码下落至地面海绵垫 -->
  <svg viewBox="0 0 360 246" width="100%" style="display: block; max-width: 23rem; margin: 0 auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 铁架台立杆金属光泽渐变 -->
      <linearGradient id="fft-rod-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-neutral-500)" />
        <stop offset="45%" stop-color="var(--c-neutral-300)" />
        <stop offset="100%" stop-color="var(--c-neutral-700)" />
      </linearGradient>
      <!-- 墨粉纸盘（墨盘）渐变 -->
      <radialGradient id="fft-disc-grad" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stop-color="var(--c-neutral-600)" />
        <stop offset="60%" stop-color="var(--c-surface-solid)" />
        <stop offset="100%" stop-color="var(--c-neutral-900)" />
      </radialGradient>
      <!-- 重锤（小砝码）黄铜/钢质渐变 -->
      <linearGradient id="fft-weight-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#b45309" />
        <stop offset="38%" stop-color="var(--c-accent-light)" />
        <stop offset="72%" stop-color="#d97706" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>
      <!-- 海绵缓冲垫渐变 -->
      <linearGradient id="fft-sponge-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent-light) 36%, transparent)" />
        <stop offset="100%" stop-color="rgba(217,119,6,0.22)" />
      </linearGradient>
    </defs>
    <!-- ================= 1. 实验台桌面与底部地面 + 海绵缓冲垫 ================= -->
    <!-- 实验台桌面（铁架台底座放于桌面上，重锤在桌沿外侧竖直下落至地面海绵垫） -->
    <rect x="18" y="182" width="114" height="8" rx="2" fill="var(--c-neutral-700)" stroke="var(--c-neutral-500)" stroke-width="1.2" />
    <line x1="28" y1="190" x2="28" y2="234" stroke="var(--c-neutral-600)" stroke-width="4" />
    <line x1="120" y1="190" x2="120" y2="234" stroke="var(--c-neutral-600)" stroke-width="4" />
    <!-- 地面基准线 -->
    <line x1="12" y1="234" x2="348" y2="234" stroke="var(--c-neutral-600)" stroke-width="2" />
    <!-- 地面上的海绵缓冲垫（位于重锤正下方 x = 168） -->
    <g transform="translate(136, 217)">
      <rect x="0" y="0" width="64" height="17" rx="4" fill="url(#fft-sponge-grad)" stroke="var(--c-accent)" stroke-width="1.4" />
      <!-- 海绵多孔蜂窝纹理点与凹陷压痕线 -->
      <path d="M 8 5 Q 32 7.5 56 5" fill="none" stroke="rgba(254,240,138,0.45)" stroke-width="1" stroke-dasharray="3 3" />
      <g fill="var(--c-accent-light)" opacity="0.45">
        <circle cx="14" cy="11" r="1.2" />
        <circle cx="24" cy="9" r="1" />
        <circle cx="32" cy="12" r="1.3" />
        <circle cx="41" cy="9.5" r="1.1" />
        <circle cx="50" cy="11.5" r="1.2" />
      </g>
    </g>
    <text x="210" y="229" font-size="11.5" fill="var(--c-text-dim)">海绵垫</text>
    <!-- ================= 2. 铁架台与十字铁夹 (Retort Stand & Clamp) ================= -->
    <!-- 铸铁底座 -->
    <path d="M 34 182 L 116 182 L 111 173 L 39 173 Z" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-linejoin="round" />
    <!-- 竖直铁杆（x = 68 ~ 74） -->
    <rect x="68" y="20" width="6" height="153" rx="3" fill="url(#fft-rod-grad)" stroke="var(--c-neutral-600)" stroke-width="0.8" />
    <!-- 铁架台上的十字夹与固定夹爪（位于 y = 76 ~ 94，向右横伸夹紧打点计时器） -->
    <g>
      <!-- 十字夹锁紧套筒与旋钮 -->
      <rect x="63" y="76" width="16" height="18" rx="2.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <!-- 左侧拧紧蝶形螺母 -->
      <line x1="55" y1="85" x2="63" y2="85" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round" />
      <ellipse cx="54" cy="85" rx="2.5" ry="5" fill="var(--c-neutral-500)" stroke="var(--c-neutral-300)" stroke-width="1" />
      <!-- 横向连接夹杆与夹持爪 -->
      <rect x="79" y="82" width="32" height="6" rx="2" fill="var(--c-neutral-500)" stroke="var(--c-text-dim)" stroke-width="1.1" />
      <path d="M 108 75 L 115 75 L 115 95 L 108 95" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-linejoin="round" />
    </g>
    <text x="48" y="135" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">铁架台</text>
    <!-- ================= 3. 横向打点计时器底板 + 左侧电源主机 + 大墨盘 + 前侧开孔限位孔 ================= -->
    <!-- 计时器金属底板（左端固定在铁夹上，右端伸出托住墨盘与纸带通道） -->
    <rect x="112" y="72" width="64" height="26" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <!-- 靠近铁架台一端的打点计时器电火花/电源盒主体（蓝色矩形部分 x = 115 ~ 143） -->
    <g>
      <rect
        x="115"
        y="75"
        width="28"
        height="20"
        rx="2.5"
        fill="color-mix(in srgb, var(--c-velocity) 20%, transparent)"
        stroke="var(--c-velocity)"
        stroke-width="1.3"
      />
      <!-- 电源接线柱设在靠近铁架台的左侧端（x = 121），导线向左上方引出接电源 -->
      <circle cx="121" cy="79.5" r="2" fill="var(--c-force)" stroke="#fecaca" stroke-width="0.7" />
      <circle cx="121" cy="90.5" r="2" fill="var(--c-velocity)" stroke="#bfdbfe" stroke-width="0.7" />
      <path d="M 121 77.5 C 118 62, 104 56, 92 56" fill="none" stroke="var(--c-force)" stroke-width="1.3" stroke-linecap="round" />
      <path d="M 119 90.5 C 110 88, 104 64, 92 64" fill="none" stroke="var(--c-velocity)" stroke-width="1.3" stroke-linecap="round" />
      <!-- 靠近铁架台一侧的“接电源”标识框 -->
      <rect
        x="20"
        y="50"
        width="42"
        height="19"
        rx="3.5"
        fill="color-mix(in srgb, var(--c-surface-solid) 90%, transparent)"
        stroke="var(--c-neutral-500)"
        stroke-width="1"
      />
      <path d="M 80 56 L 92 56 M 80 64 L 92 64" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="62" y1="59.5" x2="80" y2="59.5" stroke="var(--c-velocity-light)" stroke-width="1.2" stroke-dasharray="2.5 2" />
      <text x="41" y="63" text-anchor="middle" font-size="9.5" fill="var(--c-velocity-light)">接电源</text>
    </g>
    <!-- ================= 4. 竖直穿行的纸带 (Vertical Paper Tape, x = 168) ================= -->
    <!-- 纸带主体（从上方左手 cx=168, y=24 竖直穿过打点计时器前侧限位孔与墨盘右侧，下端 y=126 系住砝码） -->
    <rect
      x="162"
      y="24"
      width="12"
      height="102"
      rx="1"
      fill="color-mix(in srgb, var(--c-text) 16%, transparent)"
      stroke="color-mix(in srgb, var(--c-neutral-300) 65%, transparent)"
      stroke-width="1.2"
    />
    <!-- 纸带上已打出的点迹 -->
    <g fill="var(--c-accent)">
      <circle cx="168" cy="34" r="1.6" />
      <circle cx="168" cy="49" r="1.6" />
      <circle cx="168" cy="61" r="1.5" />
      <circle cx="168" cy="70" r="1.4" />
      <circle cx="168" cy="103" r="1.3" opacity="0.85" />
      <circle cx="168" cy="108" r="1.2" opacity="0.75" />
    </g>
    <!-- ================= 5. 另一端：较大的墨盘（一侧压住纸带）+ 前侧开孔的限位孔 ================= -->
    <g>
      <!-- 较大的墨粉纸盘（墨盘：圆心 156, 85，半径 r = 11.5，右侧直接压在竖直纸带 x = 162 ~ 167.5 上） -->
      <circle cx="156" cy="85" r="11.5" fill="url(#fft-disc-grad)" stroke="var(--c-accent)" stroke-width="1.4" />
      <!-- 墨盘内圈纹理与中心转轴压片 -->
      <circle cx="156" cy="85" r="7.5" fill="none" stroke="color-mix(in srgb, var(--c-accent) 38%, transparent)" stroke-width="0.9" stroke-dasharray="2.5 2" />
      <circle cx="156" cy="85" r="2.6" fill="var(--c-accent)" stroke="var(--c-neutral-900)" stroke-width="0.8" />
      <!-- 打点放电针/振针尖端（从左侧蓝盒伸向墨盘压住纸带处 x = 165, y = 85） -->
      <line x1="143" y1="85" x2="164" y2="85" stroke="var(--c-velocity-light)" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="165.5" cy="85" r="1.8" fill="var(--c-force)" />
      <!-- 前侧开孔的限位孔（位于底板前侧/纸带通道处，呈前侧带豁口槽的导轨桥架，而非计时器上下外侧凸耳） -->
      <!-- 上导引槽孔（前侧开孔环抱纸带） -->
      <path d="M 160 74.5 L 175 74.5 M 160 77.5 L 164.5 77.5 M 171.5 77.5 L 175 77.5" stroke="var(--c-neutral-300)" stroke-width="1.5" stroke-linecap="round" />
      <!-- 下导引槽孔（前侧开孔环抱纸带） -->
      <path d="M 160 92.5 L 164.5 92.5 M 171.5 92.5 L 175 92.5 M 160 95.5 L 175 95.5" stroke="var(--c-neutral-300)" stroke-width="1.5" stroke-linecap="round" />
      <!-- 墨盘与限位孔引线标注 -->
      <line x1="153" y1="73.5" x2="144" y2="62" stroke="color-mix(in srgb, var(--c-accent) 65%, transparent)" stroke-width="1" />
      <text x="142" y="59" text-anchor="end" font-size="10.5" fill="var(--c-accent)">墨盘</text>
      <line x1="175" y1="76" x2="190" y2="68" stroke="color-mix(in srgb, var(--c-neutral-300) 65%, transparent)" stroke-width="1" />
      <text x="193" y="71" font-size="10.5" fill="var(--c-neutral-300)">限位孔</text>
    </g>
    <!-- ================= 6. 左手：在上方捏住纸带上端拉直（无误导性的向上箭头） ================= -->
    <g>
      <!-- 左手手腕与手指捏住纸带顶端 (168, 24) -->
      <path
        d="M 200 14 L 182 17 C 177 17 173 19 170 21 L 163 21 C 160 21 160 25 163 25.5 L 171 26 C 174 28 178 28 183 27 L 200 24 Z"
        fill="var(--c-neutral-700)"
        stroke="var(--c-velocity-light)"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
      <!-- 拇指捏合点 -->
      <ellipse cx="167" cy="23.5" rx="4.5" ry="2.6" fill="var(--c-neutral-600)" stroke="#bfdbfe" stroke-width="1.1" />
      <text x="208" y="23" font-size="11.5" fill="var(--c-velocity-light)">左手拉直纸带</text>
    </g>
    <!-- ================= 7. 小砝码（重锤）+ 右手：托住砝码靠近计时器准备释放 ================= -->
    <!-- 纸带夹与挂钩（连接纸带下端 y = 126 与小砝码） -->
    <rect x="163" y="123" width="10" height="5" rx="1" fill="var(--c-text-dim)" stroke="var(--c-neutral-200)" stroke-width="0.9" />
    <circle cx="168" cy="131" r="2.6" fill="none" stroke="var(--c-accent)" stroke-width="1.5" />
    <!-- 小砝码（带束腰槽的实验室金属重锤，位于 y = 133 ~ 161，紧靠打点计时器下方） -->
    <g>
      <path
        d="M 159 133 L 177 133 L 179 139 L 176 142 L 180 146 L 180 159 C 180 160.5 178.5 161.5 177 161.5 L 159 161.5 C 157.5 161.5 156 160.5 156 159 L 156 146 L 160 142 L 157 139 Z"
        fill="url(#fft-weight-grad)"
        stroke="#fef08a"
        stroke-width="1.1"
        stroke-linejoin="round"
      />
      <!-- 砝码表面金属高光竖条 -->
      <line x1="162" y1="135" x2="162" y2="159" stroke="rgba(255,255,255,0.45)" stroke-width="1.4" stroke-linecap="round" />
      <text x="148" y="152" text-anchor="end" font-size="11.5" font-weight="600" fill="var(--c-accent)">重物(砝码)</text>
    </g>
    <!-- 右手：手掌从右侧向上托住小砝码底部（先接通电源，再松开右手释放） -->
    <g>
      <path
        d="M 220 160 L 196 162 C 188 163 180 163.5 172 163.5 L 161 163.5 C 158 163.5 158 167.5 162 168 L 182 169 C 190 169.5 198 168.5 220 167 Z"
        fill="var(--c-neutral-700)"
        stroke="var(--c-accent)"
        stroke-width="1.3"
        stroke-linejoin="round"
      />
      <text x="226" y="156" font-size="11.5" fill="var(--c-accent)">右手托住砝码</text>
      <text x="226" y="171" font-size="10.5" fill="var(--c-text-dim)">（先通电，再松手）</text>
    </g>
    <!-- ================= 8. 下落方向虚线箭头与底部撞击虚影（已去掉“自由下落”四字） ================= -->
    <line x1="168" y1="170" x2="168" y2="205" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="4 3" />
    <path d="M 168 213 L 163.5 204 L 172.5 204 Z" fill="var(--c-accent)" />
    <!-- 落在海绵垫上的砝码虚影 -->
    <rect
      x="157"
      y="192"
      width="22"
      height="24"
      rx="2.5"
      fill="color-mix(in srgb, var(--c-accent) 10%, transparent)"
      stroke="color-mix(in srgb, var(--c-accent) 45%, transparent)"
      stroke-width="1.1"
      stroke-dasharray="3 2.5"
    />
  </svg>
</template>
