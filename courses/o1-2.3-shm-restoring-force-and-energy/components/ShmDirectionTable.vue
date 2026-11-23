<template>
  <div class="em-dir-table">
    <div class="em-dir-head">
      <span>情景</span>
      <span>位移 <Latex tex="x" /></span>
      <span>速度 <Latex tex="v" /></span>
      <span>加速度、回复力</span>
      <span>大小变化</span>
    </div>
    <div class="em-dir-row">
      <span class="em-dir-situation">在 <Latex tex="O" /> 与 <Latex tex="P" /> 之间，远离 <Latex tex="O" /></span>
      <span class="em-dir-cell" v-click="1">向右</span>
      <span class="em-dir-cell" v-click="1">向右</span>
      <span class="em-dir-cell" v-click="1">向左</span>
      <span class="em-dir-cell em-dir-up" v-click="1">增大</span>
    </div>
    <div class="em-dir-row">
      <span class="em-dir-situation">在 <Latex tex="O" /> 与 <Latex tex="P" /> 之间，靠近 <Latex tex="O" /></span>
      <span class="em-dir-cell" v-click="2">向右</span>
      <span class="em-dir-cell" v-click="2">向左</span>
      <span class="em-dir-cell" v-click="2">向左</span>
      <span class="em-dir-cell em-dir-down" v-click="2">减小</span>
    </div>
    <div class="em-dir-row">
      <span class="em-dir-situation">在 <Latex tex="O" /> 与 <Latex tex="Q" /> 之间，远离 <Latex tex="O" /></span>
      <span class="em-dir-cell" v-click="3">向左</span>
      <span class="em-dir-cell" v-click="3">向左</span>
      <span class="em-dir-cell" v-click="3">向右</span>
      <span class="em-dir-cell em-dir-up" v-click="3">增大</span>
    </div>
    <div class="em-dir-row">
      <span class="em-dir-situation">在 <Latex tex="O" /> 与 <Latex tex="Q" /> 之间，靠近 <Latex tex="O" /></span>
      <span class="em-dir-cell" v-click="4">向左</span>
      <span class="em-dir-cell" v-click="4">向右</span>
      <span class="em-dir-cell" v-click="4">向右</span>
      <span class="em-dir-cell em-dir-down" v-click="4">减小</span>
    </div>
  </div>
</template>

<style scoped>
.em-dir-table {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.em-dir-head,
.em-dir-row {
  display: grid;
  grid-template-columns: 2.6fr 0.8fr 0.8fr 1.1fr 1fr;
  gap: 0.4rem;
  align-items: center;
}

.em-dir-head {
  padding: 0 0.5rem;
  font-size: 0.8rem;
  color: var(--c-text-dim);
}

.em-dir-head span:nth-child(n + 2) {
  text-align: center;
}

.em-dir-row {
  padding: 0.42rem 0.55rem;
  font-size: 0.9rem;
  background: color-mix(in srgb, var(--c-surface) 62%, transparent);
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;
}

.em-dir-situation {
  color: var(--c-text);
}

.em-dir-cell {
  text-align: center;
  color: var(--c-text-dim);
}

.em-dir-up {
  color: var(--c-accent);
}

.em-dir-down {
  color: var(--c-sky);
}
</style>
