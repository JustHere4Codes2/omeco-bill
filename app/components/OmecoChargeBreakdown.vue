<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section
    class="
      border border-gray-300
      rounded-lg
      p-4
      bg-white
      text-sm
      leading-tight
      print:break-inside-avoid
    "
  >
    <!-- TITLE -->
    <h2 class="text-base font-bold uppercase tracking-wide mb-3">
      Charge Breakdown
    </h2>

    <!-- PREVIOUS BALANCE -->
    <div
      class="
        flex justify-between items-center
        pb-2 mb-2
        border-b border-dashed
      "
    >
      <span class="text-gray-600">
        Previous Balance
      </span>
      <span class="font-medium">
        ₱{{ bill.previousBalance.toLocaleString('en-PH', {
          minimumFractionDigits: 2
        }) }}
      </span>
    </div>

    <!-- CHARGES -->
    <ul class="space-y-1">
      <li
        v-for="charge in bill.charges"
        :key="charge.key"
        class="flex justify-between items-center"
      >
        <span class="text-gray-700">
          {{ charge.label }}
        </span>
        <span class="tabular-nums">
          ₱{{ charge.amount.toLocaleString('en-PH', {
            minimumFractionDigits: 2
          }) }}
        </span>
      </li>
    </ul>

    <!-- TOTAL -->
    <div
      class="
        flex justify-between items-center
        mt-3 pt-2
        border-t
        font-bold
        text-base
      "
    >
      <span>Total Amount Due</span>
      <span class="text-black">
        ₱{{ bill.totalAmountDue.toLocaleString('en-PH', {
          minimumFractionDigits: 2
        }) }}
      </span>
    </div>
  </section>
</template>