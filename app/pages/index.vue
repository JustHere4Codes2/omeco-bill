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
  <main
    v-if="bill"
    class="mx-auto max-w-[190mm] bg-white print:max-w-full"
  >
    <!-- HEADER -->
    <div class="px-4 py-3 border-b border-gray-800">
      <OmecoBillHeader :bill="bill" />
    </div>

    <!-- BODY -->
    <div class="px-4 py-3">
      <div class="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-4">
        
        <!-- LEFT COLUMN -->
        <div class="space-y-4">

          <!-- BILL INFO -->
          <section class="border border-gray-300 rounded p-2">
              <h1 class="text-sm font-bold text-gray-800 mb-1">
                Your Electric Bill
              </h1>

              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs leading-tight">
                <div>
                  <p class="text-gray-500 text-[10px]">Billing Period</p>
                  <p class="font-semibold">{{ bill.billingPeriod }}</p>
                </div>

                <div>
                  <p class="text-gray-500 text-[10px]">Bill Date</p>
                  <p class="font-semibold">{{ bill.billDate }}</p>
                </div>

                <div>
                  <p class="text-gray-500 text-[10px]">Meter Reading</p>
                  <p class="font-semibold">{{ bill.meter.readingDate }}</p>
                </div>

                <div>
                  <p class="text-gray-500 text-[10px]">Meter No.</p>
                  <p class="font-semibold">{{ bill.meterNumber }}</p>
                </div>

                <div>
                  <p class="text-gray-500 text-[10px]">Customer Type</p>
                  <p class="font-semibold">{{ bill.customerType }}</p>
                </div>

                <div>
                  <p class="text-gray-500 text-[10px]">Rate/kWh</p>
                  <p class="font-semibold">₱{{ bill.ratePerKwh.toFixed(2) }}</p>
                </div>
              </div>
            </section>


          <section>
            <OmecoConsumptionSection :bill="bill" />
          </section>

          <section>
            <OmecoEnvironmentalImpact :bill="bill" />
          </section>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="space-y-4">

          <section class="border-2 border-gray-800 rounded-lg p-4 bg-gray-50">
            <OmecoAmountDue :bill="bill" />
            <div class="mt-4">
              <OmecoBillConcerns :bill="bill" />
            </div>
          </section>

        </div>

      </div>
    </div>

    <!-- FOOTER -->
    <footer class="border-t border-gray-800 px-4 py-3">
      <OmecoPaymentAndSupport :bill="bill" />
    </footer>

    <!-- PRINT BUTTON -->
    <div class="flex justify-center print:hidden p-4 border-t">
      <button
        class="
          flex items-center gap-2
          rounded-xl border-2 border-amber-500
          bg-gradient-to-b from-amber-400 to-amber-500
          px-6 py-2.5 text-sm font-bold
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
    margin: 1mm;
  }

  html {
    font-size: 12px;
  }

  section,
  footer {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>