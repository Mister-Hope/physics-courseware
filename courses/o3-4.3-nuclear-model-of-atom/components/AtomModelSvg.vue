<!-- 4.3 第 3 页汤姆孙“枣糕模型”（type="thomson"）+ 第 8 页卢瑟福核式结构模型（type="rutherford"） -->
<template>
  <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
    <g v-if="type === 'thomson'">
      <circle cx="210" cy="150" r="132" fill="var(--c-accent)" fill-opacity="0.1" stroke="var(--c-accent)" stroke-width="1.8" stroke-opacity="0.55" />
      <g class="nu-hide" :class="{ 'nu-show': step >= 1 }">
        <text x="210" y="48" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="210" y="266" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="110" y="104" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="310" y="104" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="92" y="174" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="328" y="174" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="140" y="230" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <text x="280" y="230" text-anchor="middle" font-size="24" font-family="KaTeX_Main" fill="var(--c-accent)" fill-opacity="0.55">+</text>
        <circle cx="172" cy="118" r="10" fill="var(--c-velocity)" fill-opacity="0.2" />
        <circle cx="172" cy="118" r="5.2" fill="var(--c-velocity)" />
        <circle cx="252" cy="104" r="10" fill="var(--c-velocity)" fill-opacity="0.2" />
        <circle cx="252" cy="104" r="5.2" fill="var(--c-velocity)" />
        <circle cx="236" cy="182" r="10" fill="var(--c-velocity)" fill-opacity="0.2" />
        <circle cx="236" cy="182" r="5.2" fill="var(--c-velocity)" />
        <circle cx="166" cy="176" r="10" fill="var(--c-velocity)" fill-opacity="0.2" />
        <circle cx="166" cy="176" r="5.2" fill="var(--c-velocity)" />
        <circle cx="262" cy="158" r="10" fill="var(--c-velocity)" fill-opacity="0.2" />
        <circle cx="262" cy="158" r="5.2" fill="var(--c-velocity)" />
      </g>
    </g>
    <g v-if="type === 'rutherford'">
      <circle
        cx="210"
        cy="150"
        r="132"
        fill="var(--c-accent-2)"
        fill-opacity="0.05"
        stroke="var(--c-accent-2)"
        stroke-width="1.2"
        stroke-dasharray="5 7"
        stroke-opacity="0.45"
      />
      <g transform="rotate(-18 210 150)">
        <ellipse cx="210" cy="150" rx="118" ry="62" fill="none" stroke="var(--c-line)" stroke-width="1.2" stroke-dasharray="4 6" />
        <circle cx="328" cy="150" r="5.4" fill="var(--c-velocity)" />
        <circle cx="92" cy="150" r="5.4" fill="var(--c-velocity)" />
        <circle cx="210" cy="212" r="5.4" fill="var(--c-velocity)" />
      </g>
      <g transform="rotate(62 210 150)">
        <ellipse cx="210" cy="150" rx="100" ry="54" fill="none" stroke="var(--c-line)" stroke-width="1.2" stroke-dasharray="4 6" />
        <circle cx="310" cy="150" r="5.4" fill="var(--c-velocity)" />
        <circle cx="110" cy="150" r="5.4" fill="var(--c-velocity)" />
      </g>
      <circle cx="210" cy="150" r="27" fill="var(--c-danger)" fill-opacity="0.13" />
      <circle cx="210" cy="150" r="9" fill="var(--c-danger)" />
      <line x1="219" y1="141" x2="258" y2="102" stroke="var(--c-line)" stroke-width="1.1" />
      <text x="262" y="98" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text)">原子核</text>
      <text x="210" y="198" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">+Ze</text>
      <line x1="298" y1="118" x2="342" y2="74" stroke="var(--c-line)" stroke-width="1.1" />
      <text x="346" y="70" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">电子</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { type = "thomson", step = 0 } = defineProps<{ type?: "thomson" | "rutherford"; step?: number }>();
</script>

<style scoped>
.nu-hide {
  visibility: hidden;
}

.nu-show {
  visibility: visible;
}
</style>
