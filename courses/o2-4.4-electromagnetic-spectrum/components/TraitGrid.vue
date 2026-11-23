<!--
  第 13 页：电磁波的特性与对应的波段。
  四张卡片横向排列，卡片的特性与描述常显，波段名点击后逐个出现。
-->
<template>
  <div class="em-trait-grid">
    <div class="em-trait-card">
      <mdi-fire class="icon-md em-trait-icon" />
      <div class="em-trait-body">
        <div class="em-trait-name">热效应</div>
        <div class="em-trait-desc">物体吸收红外线后温度升高</div>
        <div class="em-trait-band" v-click="1">红外线</div>
      </div>
    </div>
    <div class="em-trait-card">
      <mdi-weather-sunny class="icon-md em-trait-icon" />
      <div class="em-trait-body">
        <div class="em-trait-name">荧光效应</div>
        <div class="em-trait-desc">许多物质受照射后会发出荧光</div>
        <div class="em-trait-band" v-click="2">紫外线</div>
      </div>
    </div>
    <div class="em-trait-card">
      <mdi-radiology class="icon-md em-trait-icon" />
      <div class="em-trait-body">
        <div class="em-trait-name">穿透本领</div>
        <div class="em-trait-desc">能穿透较厚的物质</div>
        <div class="em-trait-band" v-click="3">X 射线、<Latex tex="\gamma" />&nbsp;射线</div>
      </div>
    </div>
    <div class="em-trait-card">
      <mdi-radioactive class="icon-md em-trait-icon" />
      <div class="em-trait-body">
        <div class="em-trait-name">破坏作用</div>
        <div class="em-trait-desc">能量较高，能破坏细胞核中的物质</div>
        <div class="em-trait-band" v-click="4">紫外线、X 射线、<Latex tex="\gamma" />&nbsp;射线</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.em-trait-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;

  width: 100%;
  min-width: 0;
}

.em-trait-card {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;

  min-width: 0;
  padding: 0.65rem 0.9rem;

  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: color-mix(in srgb, var(--c-surface) 68%, transparent);
}

.em-trait-icon {
  flex: 0 0 auto;

  margin-top: 0.1rem;

  color: var(--c-accent);
}

.em-trait-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  min-width: 0;
}

.em-trait-name {
  color: var(--c-text);
  font-size: 1.08rem;
  font-weight: 600;
}

.em-trait-desc {
  color: var(--c-text-dim);
  font-size: 0.86rem;
  line-height: 1.45;
}

.em-trait-band {
  display: flex;
  align-items: center;

  min-height: 1.45rem;

  color: var(--c-physics-light);
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
