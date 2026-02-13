<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

const props = defineProps<{
  bill: OmecoBill
}>()

// Calculate unpaid bills - you can replace this with actual data from bill.unpaidBills
const unpaidBills = computed(() => {
  if (props.bill.unpaidBills && props.bill.unpaidBills.length > 0) {
    return props.bill.unpaidBills
  }
  
  // Sample unpaid bills if none exist
  return props.bill.previousBalance > 0 ? [
    {
      billDate: 'Sep 06, 2021',
      amount: props.bill.previousBalance,
      dueDate: 'Sep 17, 2021',
      status: 'overdue' as const,
    },
  ] : []
})

const totalUnpaid = computed(() => 
  unpaidBills.value.reduce((sum, bill) => sum + bill.amount, 0)
)

const getDaysOverdue = (dueDate: string) => {
  const due = new Date(dueDate)
  const today = new Date()
  const diffTime = today.getTime() - due.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}
</script>

<template>
  <div class="w-full p-2 text-[8px] leading-tight">
    <div class="space-y-1.5">
      <!-- Header -->
      <div class="border-b pb-1">
        <h1 class="text-[10px] font-bold text-gray-900 mb-0.5">
          Unpaid Bills
        </h1>
        <p class="text-[8px] text-gray-600 italic">
          Outstanding balances that require immediate attention to avoid service interruption.
        </p>
      </div>

      <!-- Warning Alert (if unpaid bills exist) -->
      <div 
        v-if="unpaidBills.length > 0"
        class="bg-red-50 border border-red-300 rounded p-1.5 flex items-start gap-1.5"
      >
        <svg class="w-3 h-3 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-bold text-red-900 text-[8px] mb-0.5">Payment Required</p>
          <p class="text-red-800 text-[7px] leading-tight">
            You have {{ unpaidBills.length }} unpaid bill{{ unpaidBills.length > 1 ? 's' : '' }} 
            totaling <span class="font-bold">₱{{ totalUnpaid.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>. 
            Please pay immediately to avoid disconnection.
          </p>
        </div>
      </div>

      <!-- Unpaid Bills Table -->
      <div class="bg-gray-50 border border-gray-300 rounded p-1.5">
        <table class="w-full text-left text-[8px]">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="pb-0.5 font-bold text-gray-900">Bill Date</th>
              <th class="pb-0.5 font-bold text-gray-900">Due Date</th>
              <th class="pb-0.5 font-bold text-gray-900">Amount</th>
              <th class="pb-0.5 font-bold text-gray-900">Status</th>
              <th class="pb-0.5 font-bold text-gray-900">Days Overdue</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(bill, index) in unpaidBills" 
              :key="index"
              class="border-b border-gray-200 last:border-0"
            >
              <td class="py-0.5">{{ bill.billDate }}</td>
              <td class="py-0.5">{{ bill.dueDate }}</td>
              <td class="py-0.5 font-bold text-red-600">
                ₱{{ bill.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
              </td>
              <td class="py-0.5">
                <span 
                  class="inline-block px-1 py-0.5 rounded text-[7px] font-semibold"
                  :class="bill.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ bill.status === 'overdue' ? 'Overdue' : 'Pending' }}
                </span>
              </td>
              <td class="py-0.5 text-red-600 font-semibold">
                {{ getDaysOverdue(bill.dueDate) }} days
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State (if no unpaid bills) -->
        <div v-if="unpaidBills.length === 0" class="text-center py-3">
          <svg class="w-8 h-8 mx-auto text-green-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-green-700 font-semibold text-[8px] mb-0.5">All Caught Up!</p>
          <p class="text-gray-600 text-[7px]">You have no outstanding unpaid bills.</p>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="unpaidBills.length > 0" class="flex justify-between items-center pt-1 border-t border-gray-400">
        <div>
          <p class="text-[7px] text-gray-600 mb-0.5">Total Outstanding Balance</p>
          <p class="text-sm font-bold text-red-600">
            ₱{{ totalUnpaid.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
        <button 
          class="
            px-2 py-1
            bg-red-600 hover:bg-red-700 
            text-white font-bold rounded
            transition-colors
            text-[8px]
          "
        >
          Pay Now
        </button>
      </div>

      <!-- Important Notice -->
      <div class="bg-yellow-50 border border-yellow-300 rounded p-1.5">
        <p class="text-[7px] text-gray-700 leading-tight">
          <span class="font-bold">⚠️ Important:</span> 
          Failure to pay outstanding bills may result in service disconnection. 
          Please settle your account as soon as possible to maintain uninterrupted service. 
          For payment assistance, contact our customer service at {{ bill.contactInfo?.hotline }}.
        </p>
      </div>
    </div>
  </div>
</template>