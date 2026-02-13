<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import LeftSection from '~/components/bill/LeftSection.vue'
import RightSection from '~/components/bill/RightSection.vue'

const props = defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="w-[210mm] h-[297mm] bg-white mx-auto p-3 text-[8px] leading-tight print:p-2 overflow-hidden">
    <div class="grid grid-cols-2 gap-2 print:gap-1.5 h-full">
      <!-- LEFT COLUMN -->
      <div class="flex flex-col gap-2 print:gap-1 overflow-hidden">
        <LeftSection :bill="bill" />
      </div>

      <!-- RIGHT COLUMN -->
      <div class="flex flex-col gap-2 print:gap-1 overflow-hidden">
        <RightSection :bill="bill" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 3mm;
  }

  html {
    font-size: 7px;
  }
  
  section {
    break-inside: avoid;
    page-break-inside: avoid;
    height: 287mm !important; /* A4 height minus margins */
  }

  .gap-2 {
    gap: 0.15rem !important;
  }

  .gap-1\.5 {
    gap: 0.12rem !important;
  }

  .p-2 {
    padding: 0.15rem !important;
  }
}
</style>