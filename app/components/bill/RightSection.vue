<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import TaxesAndCharges from '~/components/bill/TaxesAndCharges.vue'
import AdditionalInfo from '~/components/bill/AdditionalBillInfo.vue'
import ADABankSection from '~/components/bill/ADABankSection.vue'
import BottomSection from '~/components/bill/BottomSection.vue'

const props = defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <div class="flex flex-col gap-3 print:gap-2">
    <AdditionalInfo :bill="bill" />
    <TaxesAndCharges :bill="bill" />
    <ComputationSection :bill="bill" />
    <ADABankSection :bill="bill" />
    <BottomSection :bill="bill" />
    
  </div>
</template>