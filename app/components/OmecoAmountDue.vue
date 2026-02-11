<script setup lang="ts">
import type { OmecoBill } from '~/types/omeco-bill'

defineProps<{
  bill: OmecoBill
}>()
</script>

<template>
  <section class="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-lg p-5">
    <!-- Header Row -->
    <div class="flex justify-between items-start mb-4 pb-3 border-b border-cyan-200">
      <div>
        <p class="text-xs text-gray-600 mb-1">Customer Account Number (CAN)</p>
        <p class="text-2xl font-bold text-gray-900">{{ bill.accountNumber }}</p>
      </div>
      <div class="text-right">
        <p class="text-xs text-gray-600 mb-1">Due Date</p>
        <p class="text-lg font-bold text-gray-900">{{ bill.dueDate }}</p>
      </div>
    </div>

    <!-- Amount Due -->
    <div class="mb-6">
      <p class="text-xs text-gray-600 mb-1">Please Pay</p>
      <p class="text-5xl font-bold text-gray-900">
        ₱ {{ bill.totalAmountDue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
      </p>
      <p class="text-sm text-gray-500 mt-1">
        Amount due after {{ bill.dueDate }} may be subject to penalties.
      </p>
    </div>

    <!-- Bill Computation Summary -->
    <div>
      <h3 class="text-sm font-bold text-gray-900 mb-3">Bill Computation Summary</h3>
      
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between">
          <span class="text-gray-700">Remaining Balance from previous bill</span>
          <span class="font-medium text-gray-900">0.00</span>
        </div>
        
        <p class="text-[10px] text-gray-500 italic leading-tight mb-2">
          (see other bills due for payment under What Remains Unpaid; does not include bills under review and installment)
        </p>

        <div class="flex justify-between font-semibold pt-2 border-t border-cyan-200">
          <span class="text-gray-700">Charges for this billing period</span>
          <span class="text-gray-900">{{ (bill.totalAmountDue).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
        </div>

        <!-- Charge Breakdown -->
        <div class="pl-3 space-y-1 text-[11px] text-gray-600 mt-2">
          <div class="flex justify-between">
            <span class="italic">Generation</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.45).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Transmission</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.15).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">System Loss</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.08).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Distribution (OMECO)</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.20).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Subsidies</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.02).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Government Taxes</span>
            <span>{{ (bill.meter.consumption * bill.ratePerKwh * 0.10).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Universal Charges</span>
            <span>0.00</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">FIT-All (Renewables)</span>
            <span>0.00</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Applied Credits</span>
            <span>0.00</span>
          </div>
          <div class="flex justify-between">
            <span class="italic">Other Charges</span>
            <span>0.00</span>
          </div>
        </div>

        <div class="flex justify-between pt-2 border-t border-cyan-200">
          <span class="font-semibold text-gray-700">Installment Due</span>
          <span class="font-semibold text-gray-900">0.00</span>
        </div>

        <p class="text-[10px] text-gray-500 italic">
          (see details under Additional Bill Information)
        </p>

        <!-- Total -->
        <div class="flex justify-between pt-3 border-t-2 border-gray-400 mt-3">
          <span class="font-bold text-sm text-gray-900">Total Amount Due</span>
          <span class="font-bold text-sm text-gray-900">
            ₱ {{ bill.totalAmountDue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>