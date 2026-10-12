<!--
  第 16 页 · 思考题（第一课时收尾 → 引出第二课时）
  —— 问题：洛伦兹力只改变速度的方向、不改变速度的大小，垂直磁场射入的电子束会走出什么轨迹？
     三个候选（直线 / 抛物线 / 圆）先并排摆出常显，点一下才判对错并给依据。
  物理：电子束在磁场中只受洛伦兹力，而 F_洛 恒垂直于 v ⇒ 速率不变、方向均匀改变 ⇒ 匀速圆周运动。
        "抛物线"是学生最常有的错误直觉（拿重力场的平抛套过来），所以特意摆出来对比。
  待细化方向：可让学生先举手投票再点开。
-->
<script setup>
const props = defineProps({
  step: { type: Number, default: 0 },
});

const revealed = () => props.step >= 1;

/** 三个候选；只有第 3 个（圆）正确 */
const options = [
  { key: "line", label: "直线", wrong: "如果不受力才会走直线——可它一直在受力" },
  { key: "parabola", label: "抛物线", wrong: "重力场的平抛才是抛物线；这里 F_洛 会跟着 v 转" },
  { key: "circle", label: "圆周", wrong: "" },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-5">
    <div
      v-for="(opt, i) in options"
      :key="opt.key"
      class="overflow-hidden rounded-2xl border bg-slate-900/30"
      :class="
        !revealed()
          ? 'border-slate-700/60'
          : i === 2
            ? 'border-teal-400/80 bg-teal-400/5'
            : 'border-slate-700/40'
      "
    >
      <svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <!-- 磁场区（垂直纸面向外）：⊙ 记号 -->
        <g stroke="#e2a846" fill="none" stroke-width="1.8" style="opacity: 0.55">
          <circle cx="70" cy="34" r="8" />
          <circle cx="170" cy="34" r="8" />
          <circle cx="256" cy="34" r="8" />
          <circle cx="70" cy="140" r="8" />
          <circle cx="170" cy="140" r="8" />
          <circle cx="256" cy="140" r="8" />
        </g>
        <g fill="#e2a846" style="opacity: 0.55">
          <circle cx="70" cy="34" r="2.4" />
          <circle cx="170" cy="34" r="2.4" />
          <circle cx="256" cy="34" r="2.4" />
          <circle cx="70" cy="140" r="2.4" />
          <circle cx="170" cy="140" r="2.4" />
          <circle cx="256" cy="140" r="2.4" />
        </g>

        <!-- 候选一：直线 -->
        <template v-if="opt.key === 'line'">
          <line x1="14" y1="87" x2="286" y2="87" stroke="#60a5fa" stroke-width="3.4" />
          <circle cx="52" cy="87" r="6" fill="#60a5fa" />
        </template>

        <!-- 候选二：抛物线 -->
        <template v-else-if="opt.key === 'parabola'">
          <path
            d="M 14 60 Q 150 60 286 148"
            fill="none"
            stroke="#60a5fa"
            stroke-width="3.4"
            stroke-linecap="round"
          />
          <circle cx="52" cy="62" r="6" fill="#60a5fa" />
        </template>

        <!-- 候选三：圆周 -->
        <template v-else>
          <circle cx="150" cy="87" r="46" fill="none" stroke="#60a5fa" stroke-width="3.4" />
          <circle cx="104" cy="87" r="6" fill="#60a5fa" />
        </template>
      </svg>

      <div class="flex items-center justify-between px-4 py-2">
        <span class="text-lg font-semibold" :class="i === 2 && revealed() ? 'text-teal-300' : ''">
          {{ "ABC"[i] }} · {{ opt.label }}
        </span>
        <span
          class="text-lg font-bold"
          :class="[
            revealed() && i === 2 ? 'text-teal-300' : 'text-slate-500',
            revealed() ? '' : 'invisible',
          ]"
        >
          {{ i === 2 ? "✓ 对" : "✗ 错" }}
        </span>
      </div>

      <div
        class="min-h-[3.2rem] px-4 pb-3 text-sm leading-relaxed text-slate-400"
        :class="revealed() ? '' : 'invisible'"
      >
        {{ i === 2 ? "F_洛 恒垂直于 v：只改方向、不改大小 → 匀速圆周运动" : opt.wrong }}
      </div>
    </div>
  </div>
</template>
