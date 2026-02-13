<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()

// Sample payment data - replace with actual data from bill if available
const payments = [
  {
    date: '01/15/2025',
    amount: '₱3,500.00',
    referenceNumber: 'REF-2025-001234',
  },
  {
    date: '12/20/2024',
    amount: '₱3,200.00',
    referenceNumber: 'REF-2024-009876',
  },
  {
    date: '11/18/2024',
    amount: '₱2,950.00',
    referenceNumber: 'REF-2024-008765',
  },
]
</script>

<template>
  <div class="w-full p-2 text-[9px] leading-tight">
    <div class="space-y-1.5">
      <!-- Header -->
      <div class="border-b pb-1">
        <h1 class="text-[10px] font-bold text-gray-900 mb-0.5">
          What You've Paid
        </h1>
        <p class="text-[8px] text-gray-600 italic">
          Shows recent payments already applied to this service excluding any overpayments.
        </p>
      </div>

      <!-- Payment Table -->
      <div class="bg-gray-50 border border-gray-300 rounded p-1.5">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="pb-0.5 font-bold text-gray-900 text-[8px]">Billing Period</th>
              <th class="pb-0.5 font-bold text-gray-900 text-[8px]">Date</th>
              <th class="pb-0.5 font-bold text-gray-900 text-[8px]">Amount</th>
              <th class="pb-0.5 font-bold text-gray-900 text-[8px]">Reference Number</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="payment in payments" 
              :key="payment.referenceNumber"
              class="border-b border-gray-200 last:border-0"
            >
              <td class="py-0.5">{{ payment.date }}</td>
              <td class="py-0.5 font-semibold">{{ payment.amount }}</td>
              <td class="py-0.5 font-mono text-[8px]">{{ payment.referenceNumber }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State (if no payments) -->
        <div v-if="payments.length === 0" class="text-center py-3 text-gray-500">
          <p>No recent payments found.</p>
        </div>
      </div>

      <!-- Summary (optional) -->
      <div class="flex justify-end pt-1">
        <div class="text-right">
          <p class="text-[8px] text-gray-600">Total Paid (Last 3 Months)</p>
          <p class="text-sm font-bold text-gray-900">
            ₱{{ payments.reduce((sum, p) => sum + parseFloat(p.amount.replace(/[₱,]/g, '')), 0).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>