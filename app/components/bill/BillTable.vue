<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="w-[210mm] min-h-[297mm] bg-white mx-auto p-[10mm] text-[10px] leading-tight print:p-[8mm]">
    <!-- Header -->
    <div class="flex justify-between items-start mb-3 pb-2 border-b text-[9px]">
      <div class="space-y-0.5">
        <p><span class="font-semibold">Bill Reference No:</span> {{ bill.billStatementNumber }}</p>
        <p><span class="font-semibold">Local Application No:</span> {{ bill.serviceId }}</p>
      </div>
      <div class="space-y-0.5 text-right">
        <p><span class="font-semibold">Billing Period:</span> {{ bill.billingPeriod }}</p>
        <p><span class="font-semibold">Print Seq.:</span> 12345</p>
        <p class="font-bold">Page {{ bill.pageNumber || 2 }} of {{ bill.totalPages || 2 }}</p>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-[1.3fr,1fr] gap-4 print:gap-3">
      <!-- LEFT COLUMN -->
      <div class="flex flex-col gap-3 print:gap-2">
        <PaymentsHistory :bill="bill" />
        <UnpaidSection :bill="bill" />
        <ComputationSection :bill="bill" />
        <TipsSection :bill="bill" />
      </div>

      <!-- RIGHT COLUMN -->
      <div class="flex flex-col gap-3 print:gap-2">
        <TaxesAndCharges :bill="bill" />
        <AdditionalInfo :bill="bill" />
        <ADABankSection :bill="bill" />
        <BottomSection :bill="bill" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 8mm;
  }
  
  html {
    font-size: 9px;
  }
  
  section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>