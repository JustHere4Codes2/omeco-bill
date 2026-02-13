<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <div class="w-full border-b border-gray-400 pb-4 mb-4">
    <!-- Top Row -->
    <div class="flex justify-between items-start">
      <!-- Left: Consumer Info -->
      <div>
        <h1 class="text-lg font-bold text-gray-900">
          {{ bill.consumerName }}
        </h1>
        <p class="text-sm text-gray-700">
          Account No: {{ bill.accountNumber }}
        </p>
        <p class="text-sm text-gray-700">
          Statement No: {{ bill.billStatementNumber }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          {{ bill.address }}
        </p>
        <p class="text-xs text-gray-600 capitalize">
          {{ bill.customerType }} customer
        </p>
      </div>

      <!-- Right: Amount Due Highlight -->
      <div class="text-right">
        <p class="text-xs text-gray-600">TOTAL AMOUNT DUE</p>
        <p class="text-2xl font-bold text-red-600">
          ₱{{ bill.totalAmountDue.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
        </p>
        <p class="text-xs text-gray-700 mt-1">
          Due Date: {{ bill.dueDate }}
        </p>
        <p class="text-xs text-gray-500">
          Disconnection: {{ bill.disconnectionDate }}
        </p>
      </div>
    </div>

    <!-- Billing Period Row -->
    <div class="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-800">
      <div>
        <span class="font-medium">Billing Period:</span>
        {{ bill.billingPeriod }}
      </div>

      <div>
        <span class="font-medium">Bill Date:</span>
        {{ bill.billDate }}
      </div>
    </div>
  </div>
</template>