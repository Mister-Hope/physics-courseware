<template>
  <!-- 第 1 页封面装饰：地球与绕它的轨道、以及远处沿轨道运行的行星——本课"称量天体、预言未知行星" -->
  <svg viewBox="0 0 360 180" width="340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="地球、绕地球运行的轨道与远处带环的行星">
    <ellipse cx="78" cy="98" rx="66" ry="46" fill="none" stroke="rgba(148,163,184,0.42)" stroke-width="1.4" stroke-dasharray="5 6" />
    <path d="M 150 118 C 198 100 236 78 272 76" fill="none" stroke="rgba(226,168,70,0.5)" stroke-width="1.6" stroke-dasharray="7 6" />
    <CelestialEarth :x="78" :y="98" :r="34" />
    <CelestialMoon :x="20.8" :y="75" :r="10" />
    <CelestialPlanet :x="296" :y="74" :r="24" variant="amber" :bands="true" :ring="true" />
  </svg>
</template>
