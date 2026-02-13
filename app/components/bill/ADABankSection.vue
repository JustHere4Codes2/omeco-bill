<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()

const adaBanks = [
  'Asian United Bank',
  'Philippine National Bank',
  'Banco de Oro (BDO)',
  'Union Bank of the Philippines',
  'Bank of the Philippine Islands (BPI)',
  'Robinsons Bank',
  'United Coconut Planters Bank',
  'Citibank',
  'Security Bank'
]
</script>

<template>
  <section class="border border-gray-400 rounded p-3">
    <h3 class="font-bold mb-2 text-[10px]">Automatic Debit Arrangement (ADA)</h3>
    <p class="text-[8px] mb-2 leading-tight text-gray-700">
      Authorize your bank to debit the bill amount from your account on the bill's due date and remit the payment to OMECO. Visit your bank to enroll in this option. OMECO bill payments are accepted through these accredited ADA partners.
    </p>
    <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8px]">
      <p v-for="bank in adaBanks" :key="bank" class="text-gray-800">
        {{ bank }}
      </p>
    </div>
  </section>
</template>