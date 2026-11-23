<!-- 第 7 页：弹簧振子各位置的 x、v、a、F 变化表；取向右为正方向 -->
<template>
  <div class="em-state-table">
    <div class="em-state-note">取向右为正方向</div>
    <table>
      <thead>
        <tr>
          <th>位置</th>
          <th>位移 <Latex tex="x" /></th>
          <th>速度 <Latex tex="v" /></th>
          <th>加速度 <Latex tex="a" /></th>
          <th>回复力 <Latex tex="F" /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Latex tex="Q" /></td>
          <td><Latex tex="-A" /></td>
          <td>0</td>
          <td><Latex tex="+a_{\max}" /></td>
          <td><Latex tex="+F_{\max}" /></td>
        </tr>
        <tr>
          <td><Latex tex="Q\to O" /></td>
          <td>
            <span class="sign"><Latex tex="-" /></span> <span class="trend"
              ><Latex tex="|x|" /> 减小</span
            >
          </td>
          <td>
            <span class="sign"><Latex tex="+" /></span> <span class="trend">增大</span>
          </td>
          <td>
            <span class="sign"><Latex tex="+" /></span> <span class="trend">减小</span>
          </td>
          <td>
            <span class="sign"><Latex tex="+" /></span> <span class="trend">减小</span>
          </td>
        </tr>
        <tr class="is-equilibrium">
          <td><Latex tex="O" /></td>
          <td>0</td>
          <td><Latex tex="+v_{\max}" /></td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td><Latex tex="O\to P" /></td>
          <td>
            <span class="sign"><Latex tex="+" /></span> <span class="trend">增大</span>
          </td>
          <td>
            <span class="sign"><Latex tex="+" /></span> <span class="trend">减小</span>
          </td>
          <td>
            <span class="sign"><Latex tex="-" /></span> <span class="trend">增大</span>
          </td>
          <td>
            <span class="sign"><Latex tex="-" /></span> <span class="trend">增大</span>
          </td>
        </tr>
        <tr>
          <td><Latex tex="P" /></td>
          <td><Latex tex="+A" /></td>
          <td>0</td>
          <td><Latex tex="-a_{\max}" /></td>
          <td><Latex tex="-F_{\max}" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.em-state-table {
  width: 100%;
}

.em-state-note {
  margin-bottom: 0.35rem;
  color: var(--c-text-mute);
  font-size: 0.74rem;
  text-align: right;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.82rem;
}

th {
  padding: 0.38rem 0.4rem;
  border-bottom: 1px solid var(--c-border);

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-weight: 500;
  text-align: center;
}

td {
  padding: 0.36rem 0.4rem;
  border-bottom: 1px solid var(--c-border);
  color: var(--c-text);
  text-align: center;
}

th:first-child,
td:first-child {
  width: 13%;
  color: var(--c-accent);
}

.is-equilibrium td {
  background: color-mix(in srgb, var(--c-accent) 8%, transparent);
}

.sign {
  color: var(--c-accent-2);
}

.trend {
  color: var(--c-text-dim);
  font-size: 0.75rem;
}
</style>
