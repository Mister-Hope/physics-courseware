<!--
  第 5 页：无线电波波段划分表。
  照录教材表 1（我国无线电波的部分波段划分），只做紧凑排版，不改数值与用途。
-->
<template>
  <div class="em-radio-table">
    <table>
      <thead>
        <tr>
          <th>波段</th>
          <th>波长 / <Latex tex="\text{m}" /></th>
          <th>频率 / <Latex tex="\text{MHz}" /></th>
          <th>传播方式</th>
          <th>主要用途</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>长波</td>
          <td><Latex tex="10\,000 \sim 1\,000" /></td>
          <td><Latex tex="0.03 \sim 0.3" /></td>
          <td>地波</td>
          <td>广播、导航</td>
        </tr>
        <tr>
          <td>中波</td>
          <td><Latex tex="1\,000 \sim 100" /></td>
          <td><Latex tex="0.3 \sim 3" /></td>
          <td>地波和天波</td>
          <td>广播、导航</td>
        </tr>
        <tr>
          <td>短波</td>
          <td><Latex tex="100 \sim 10" /></td>
          <td><Latex tex="3 \sim 30" /></td>
          <td>天波</td>
          <td>调幅（AM）广播、导航</td>
        </tr>
        <tr>
          <td>米波</td>
          <td><Latex tex="10 \sim 1" /></td>
          <td><Latex tex="30 \sim 300" /></td>
          <td>近似直线传播</td>
          <td>调频（FM）广播、电视、导航</td>
        </tr>
        <tr>
          <td>微波（分米波）</td>
          <td><Latex tex="1 \sim 0.1" /></td>
          <td><Latex tex="300 \sim 3\,000" /></td>
          <td>直线传播</td>
          <td>电视、雷达、移动通信、导航、射电天文</td>
        </tr>
        <tr>
          <td>微波（厘米波）</td>
          <td><Latex tex="0.1 \sim 0.01" /></td>
          <td><Latex tex="3\,000 \sim 30\,000" /></td>
          <td>直线传播</td>
          <td>电视、雷达、移动通信、导航、射电天文</td>
        </tr>
        <tr>
          <td>微波（毫米波）</td>
          <td><Latex tex="0.01 \sim 0.001" /></td>
          <td><Latex tex="30\,000 \sim 300\,000" /></td>
          <td>直线传播</td>
          <td>电视、雷达、移动通信、导航、射电天文</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.em-radio-table {
  width: 100%;
  min-width: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.66rem;
}

th,
td {
  padding: 0.24rem 0.3rem;
  text-align: center;
  white-space: nowrap;
}

th {
  border-bottom: 1px solid var(--c-border);
  background: color-mix(in srgb, var(--c-surface) 68%, transparent);
  color: var(--c-text-dim);
  font-weight: 600;
}

td {
  border-bottom: 1px solid color-mix(in srgb, var(--c-border) 55%, transparent);
}

:where(tbody tr:last-child) td {
  border-bottom: 0;
}

td:first-child {
  color: var(--c-text);
  font-weight: 600;
}

td:last-child {
  color: var(--c-text-dim);
}

:deep(.katex) {
  font-size: 1em;
}
</style>
