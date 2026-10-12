<!--
  引课页：电流微观图景
  —— 金属导线内部：正离子（金色，晶格上固定不动）与自由电子（蓝色，向左定向漂移）；
     下方金色粗箭头表示电流方向 I（向右）——★ 与自由电子漂移方向相反（金属导体里电流方向
     规定为正电荷定向移动方向，电子带负电，所以两者反向，这是本页的关键对照）。
  意图：让学生直观看到"电流 = 电荷的定向移动"，为"磁场对运动电荷有力的作用"的推理链铺垫。
  图幅 900×210（宽横幅）：宽高比 4.3:1，塞进半栏会把离子/电子压得看不清，页面里要给它满宽。
-->
<template>
  <div class="w-full">
    <svg viewBox="0 0 900 210" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <!-- 图例：金色=正离子（固定），蓝色=自由电子（定向移动） -->
      <circle cx="66" cy="30" r="7" fill="rgba(226,168,70,0.9)" />
      <text x="80" y="37" font-size="17" fill="#e2a846">正离子（固定）</text>
      <circle cx="252" cy="30" r="6" fill="#60a5fa" />
      <text x="266" y="37" font-size="17" fill="#60a5fa">自由电子（定向移动）</text>

      <!-- 电子漂移速度 v（向左，画在导线外侧） -->
      <CourseArrow
        :from="{ x: 700, y: 30 }"
        :to="{ x: 540, y: 30 }"
        stroke="#60a5fa"
        stroke-width="3.6"
      />
      <text
        x="524"
        y="38"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#60a5fa"
      >
        v
      </text>

      <!-- 导线主体 -->
      <rect
        x="40"
        y="54"
        width="820"
        height="100"
        rx="22"
        fill="rgba(30,41,59,0.55)"
        stroke="rgba(148,163,184,0.25)"
        stroke-width="1.6"
      />

      <!-- 正离子：固定在晶格上（金色） -->
      <g fill="rgba(226,168,70,0.9)">
        <circle cx="96" cy="88" r="12" />
        <circle cx="231" cy="88" r="12" />
        <circle cx="366" cy="88" r="12" />
        <circle cx="501" cy="88" r="12" />
        <circle cx="636" cy="88" r="12" />
        <circle cx="771" cy="88" r="12" />
      </g>

      <!-- 自由电子：整体向左漂移（蓝色圆点 + 向左的速度小箭头） -->
      <g fill="#60a5fa">
        <circle cx="164" cy="126" r="9" />
        <circle cx="299" cy="126" r="9" />
        <circle cx="434" cy="126" r="9" />
        <circle cx="569" cy="126" r="9" />
        <circle cx="704" cy="126" r="9" />
        <circle cx="839" cy="126" r="9" />
      </g>
      <CourseArrow
        :from="{ x: 190, y: 126 }"
        :to="{ x: 140, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 325, y: 126 }"
        :to="{ x: 275, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 460, y: 126 }"
        :to="{ x: 410, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 595, y: 126 }"
        :to="{ x: 545, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 730, y: 126 }"
        :to="{ x: 680, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />

      <!-- 电流方向（金色粗箭头，向右）= 正电荷定向移动方向 = 与电子漂移相反 -->
      <CourseArrow
        :from="{ x: 66, y: 186 }"
        :to="{ x: 806, y: 186 }"
        stroke="#e2a846"
        stroke-width="5"
      />
      <text
        x="826"
        y="196"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="28"
        fill="#e2a846"
      >
        I
      </text>
    </svg>
  </div>
</template>
