<!-- 第 9 页：教材 2.3「做一做」能量变化表；位置 Q→O→P -->
<template>
  <div class="em-energy-table">
    <table>
      <thead>
        <tr>
          <th>位置</th>
          <th><Latex tex="Q" /></th>
          <th><Latex tex="Q\to O" /></th>
          <th><Latex tex="O" /></th>
          <th><Latex tex="O\to P" /></th>
          <th><Latex tex="P" /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>位移大小</td>
          <td>最大</td>
          <td>减小</td>
          <td>0</td>
          <td>增大</td>
          <td>最大</td>
        </tr>
        <tr>
          <td>速度大小</td>
          <td>0</td>
          <td>增大</td>
          <td>最大</td>
          <td>减小</td>
          <td>0</td>
        </tr>
        <tr>
          <td>动能 <Latex tex="E_k" /></td>
          <td>0</td>
          <td>增大</td>
          <td>最大</td>
          <td>减小</td>
          <td>0</td>
        </tr>
        <tr>
          <td>弹性势能 <Latex tex="E_p" /></td>
          <td>最大</td>
          <td>减小</td>
          <td>0</td>
          <td>增大</td>
          <td>最大</td>
        </tr>
        <tr class="is-conserved">
          <td>机械能</td>
          <td>不变</td>
          <td>不变</td>
          <td>不变</td>
          <td>不变</td>
          <td>不变</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.em-energy-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  table-layout: fixed;
}

th {
  padding: 0.4rem 0.35rem;
  font-weight: 500;
  color: var(--c-text-dim);
  text-align: center;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
}

td {
  padding: 0.36rem 0.35rem;
  color: var(--c-text);
  text-align: center;
  border-bottom: 1px solid var(--c-border);
}

th:first-child,
td:first-child {
  width: 20%;
  color: var(--c-accent);
  text-align: left;
  padding-left: 0.6rem;
}

tbody tr:nth-child(3) td,
tbody tr:nth-child(4) td {
  background: color-mix(in srgb, var(--c-accent-2) 7%, transparent);
}

.is-conserved td {
  color: var(--c-accent);
}
</style>
