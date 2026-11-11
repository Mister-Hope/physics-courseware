<!--
  第 12 页练习二题目图（教材选择性必修第二册 图 2.4-9）。
  拓扑：电池与开关 S 串在主回路；左节点分两支——上支路是自感线圈 L（自感系数很大、直流电阻≈0），
  下支路是灯泡 B；两支路在右节点汇合后经灯泡 A 回到电池，即 A 与 (L∥B) 串联。
  只画题目图本来就有的元件与字母：不画电流方向、亮度等分析类标注（那些点击后才由解析给出）。
  线圈用共享 Solenoid（横放 4 匝；phase=180 ⇒ 两个接线端都落在下沿 (106,73) / (186,73)），
  上方一条短横线是教材画法的铁芯符号。L 用 KaTeX_Math 斜体手写，A / B 由 CircuitBulb 的 label 给出（同为 KaTeX_Math 斜体），
  S 由 CircuitSwitch 的 label 给出（组件内约定开关字母为正体 KaTeX_Main）。
  exercise-split 的 #fig 必须带固有 width/height，否则图栏塌成 0 宽、整张图消失。
-->
<template>
  <svg
    viewBox="28 0 284 258"
    width="340"
    height="309"
    role="img"
    aria-label="自感电路：电池、开关 S；自感线圈 L 与灯泡 B 并联后，再与灯泡 A 串联"
  >
    <!-- 导线：横平竖直，止于每个元件两端 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <!-- L 支路（上）：左节点 → 上 → 线圈左接线端；线圈右接线端 → 右 → 右节点 -->
      <path d="M 66 112 V 73 H 106" />
      <path d="M 186 73 H 226 V 112" />
      <!-- B 支路（下）：左节点 → 下 → 灯泡 B 左圆周；灯泡 B 右圆周 → 右节点 -->
      <path d="M 66 112 V 168 H 134" />
      <path d="M 158 168 H 226 V 112" />
      <!-- 右节点 → 灯泡 A → 右侧竖直导线 -->
      <path d="M 226 112 H 252" />
      <path d="M 276 112 H 302 V 232" />
      <!-- 底边：右侧 → 开关 S → 电池 → 左侧竖直导线 → 左节点 -->
      <path d="M 302 232 H 250" />
      <path d="M 210 232 H 128" />
      <path d="M 112 232 H 38 V 112 H 66" />
    </g>
    <!-- 节点圆点：左右两个三支路汇合点 -->
    <circle cx="66" cy="112" r="3.2" fill="var(--c-text)" />
    <circle cx="226" cy="112" r="3.2" fill="var(--c-text)" />
    <!-- 自感线圈 L：横放连续螺旋线 4 匝，接线端在下沿；上方短横线为铁芯符号 -->
    <Solenoid
      :x="146"
      :y="56"
      :length="80"
      :radius="17"
      :turns="4"
      direction="cw"
      :phase="180"
      :line-width="2.8"
      :back-opacity="0.32"
    />
    <line
      x1="120"
      y1="34"
      x2="172"
      y2="34"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <text
      x="146"
      y="22"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      fill="var(--c-text)"
    >
      L
    </text>
    <!-- 灯泡 B（与 L 并联）与灯泡 A（与并联部分串联） -->
    <CircuitBulb :x="146" :y="168" label="B" />
    <CircuitBulb :x="264" :y="112" label="A" />
    <!-- 电池（长细板＝正极在左，与教材图一致）与开关 S（默认断开） -->
    <CircuitBattery :x="120" :y="232" />
    <CircuitSwitch :x="230" :y="232" label="S" :label-dy="40" />
  </svg>
</template>
