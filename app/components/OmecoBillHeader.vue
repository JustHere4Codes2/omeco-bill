<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'
import omecoLogo from '~/assets/omeco-logo.png'

defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="bg-white p-6 print:p-4">
    <!-- TOP ROW: Consumer Address and Company Info -->
    <div class="flex justify-between items-start gap-8 mb-6">
      <!-- LEFT: Consumer Info -->
      <div class="flex-1 text-xs leading-tight space-y-0.5">
        <p class="font-bold text-gray-900 uppercase">{{ bill.consumerName }}</p>
        <p class="text-gray-700 uppercase">{{ bill.address }}</p>
      </div>

      <!-- RIGHT: OMECO Info -->
      <div class="text-right text-xs leading-tight space-y-0.5 flex flex-col items-end">
        <img
          :src="omecoLogo"
          alt="OMECO Logo"
          class="h-16 w-auto object-contain mb-1"
        />
        <p class="font-bold text-gray-900 uppercase">
          Occidental Mindoro Electric Cooperative
        </p>
        <p class="text-gray-700">San Jose, Occidental Mindoro</p>
        <p class="text-gray-700">TIN 000-000-000-000</p>
      </div>
    </div>
    <div class="mb-4">
      <p class="text-xs text-gray-700 mb-1">
        <span class="font-bold">Meter No.:</span> {{ bill.meterNumber }}
      </p>
      <p class="text-xs text-gray-700">
        <span class="font-bold">Billing Statement No.:</span> {{ bill.accountNumber }}
      </p>
    </div>
  </section>
</template>