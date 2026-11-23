<!--
  第 10 页：各波段电磁波的产生机理。
  从左到右按“电路 → 原子外层 → 原子内层 → 原子核”的尺度排列，
  点击逐个显示对应波段，最后给出“尺度越小、波长越短”的结论。
-->
<template>
  <div class="em-mech">
    <div class="em-mech-grid">
      <div class="em-mech-col">
        <div class="em-mech-scale">电路</div>
        <mdi-sine-wave class="icon-2xl em-mech-icon" />
        <div class="em-mech-name">LC 振荡电路</div>
        <div class="em-mech-line"></div>
        <div class="em-mech-band" v-click="1">无线电波</div>
      </div>
      <div class="em-mech-col">
        <div class="em-mech-scale">原子外层</div>
        <mdi-atom class="icon-2xl em-mech-icon" />
        <div class="em-mech-name">外层电子激发</div>
        <div class="em-mech-line"></div>
        <div class="em-mech-band" v-click="2">红外线、可见光、紫外线</div>
      </div>
      <div class="em-mech-col">
        <div class="em-mech-scale">原子内层</div>
        <mdi-atom-variant class="icon-2xl em-mech-icon" />
        <div class="em-mech-name">内层电子激发</div>
        <div class="em-mech-line"></div>
        <div class="em-mech-band" v-click="3">X 射线</div>
      </div>
      <div class="em-mech-col">
        <div class="em-mech-scale">原子核</div>
        <mdi-radioactive class="icon-2xl em-mech-icon" />
        <div class="em-mech-name">原子核衰变</div>
        <div class="em-mech-line"></div>
        <div class="em-mech-band" v-click="4"><Latex tex="\gamma" />&nbsp;射线</div>
      </div>
    </div>
    <div class="em-mech-hint">
      <div class="tip-hint" v-click="5">产生机理的尺度越小，波长越短。</div>
    </div>
  </div>
</template>

<style scoped>
.em-mech {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  width: 100%;
  min-width: 0;
}

.em-mech-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.em-mech-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;

  min-width: 0;

  text-align: center;
}

.em-mech-scale {
  color: var(--c-text-mute);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
}

.em-mech-icon {
  color: var(--c-accent);
}

.em-mech-name {
  color: var(--c-text);
  font-weight: 600;
  font-size: 1.2rem;
}

.em-mech-line {
  width: 1px;
  height: 1.8rem;
  background: var(--c-border-glow);
}

.em-mech-band {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 2.8rem;

  color: var(--c-physics-light);

  font-weight: 600;
  font-size: 0.86rem;
  line-height: 1.4;
  white-space: nowrap;
}

.em-mech-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.2rem;
}
</style>
