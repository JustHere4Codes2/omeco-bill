<script setup lang="ts">
import { useOmecoBill } from '~/composables/useOmecoBill'


const { bill } = useOmecoBill()

const printBill = () => {
  if (!import.meta.client) return

  const originalTitle = document.title
  document.title = 'OMECO_Electric_Bill'
  window.print()
  document.title = originalTitle
}
</script>

<template>
  <!-- GUARD: never render until bill exists -->
  <main
    v-if="bill"
    class="mx-auto max-w-[210mm] bg-white print:max-w-full"
  >

    <!-- HEADER -->
    <div class="p-5 print:p-3 border-b-2 border-gray-800">
      <OmecoBillHeader :bill="bill" />
    </div>

    <!-- BODY -->
    <div class="p-5 print:p-3">

      <!-- TWO-COLUMN FLOW -->
      <div
        class="
          columns-1
          lg:columns-2
          print:columns-2
          gap-x-5
          mt-4
        "
      >

        <!-- BILL INFO -->
        <section class="border border-gray-300 rounded-md p-3 mb-4 break-inside-avoid">
          <h1 class="text-base font-bold text-gray-800 mb-2">
            Your Electric Bill
          </h1>

          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px]">
            <div>
              <p class="text-gray-500">Billing Period</p>
              <p class="font-semibold">{{ bill.billingPeriod }}</p>
            </div>
            <div>
              <p class="text-gray-500">Bill Date</p>
              <p class="font-semibold">{{ bill.billDate }}</p>
            </div>
            <div>
              <p class="text-gray-500">Meter Reading Date</p>
              <p class="font-semibold">{{ bill.meter.readingDate }}</p>
            </div>
            <div>
              <p class="text-gray-500">Meter No.</p>
              <p class="font-semibold">{{ bill.meterNumber }}</p>
            </div>
          </div>
        </section>

        <!-- AMOUNT DUE -->
        <section class="border-2 border-gray-800 rounded-lg p-3 bg-gray-50 mb-4 break-inside-avoid">
          <OmecoAmountDue :bill="bill" />
        </section>

        <!-- CONSUMPTION -->
        <section class="mb-4 break-inside-avoid">
          <OmecoConsumptionSection :bill="bill" />
        </section>

        <!-- ENVIRONMENT -->
        <section class="mb-4 break-inside-avoid">
          <OmecoEnvironmentalImpact :bill="bill" />
        </section>

        <!-- PAYMENT -->
        <section class="mb-4 break-inside-avoid">
          <OmecoPaymentAndSupport :bill="bill" />
        </section>

      </div>
    </div>

    <!-- PRINT BUTTON -->
    <div class="flex justify-center print:hidden p-6 border-t">
      <button
        class="
          flex items-center gap-3
          rounded-xl border-2 border-amber-500
          bg-gradient-to-b from-amber-400 to-amber-500
          px-8 py-3 text-sm font-bold
          shadow-lg
          hover:from-amber-500 hover:to-amber-600
          active:scale-95
        "
        @click="printBill"
      >
        Print Bill
      </button>
    </div>

  </main>
</template>

<style>
@media print {
  @page {
    size: A4;
    margin: 6mm;
  }

  html {
    font-size: 10px;
  }

  section {
    break-inside: avoid;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>