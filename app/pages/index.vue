<script setup lang="ts">
const { bill } = useOmecoBill()

const printBill = () => {
  if (!process.client) return

  const originalTitle = document.title
  document.title = 'OMECO_Electric_Bill'
  window.print()
  document.title = originalTitle
}
</script>

<template>
  <main class="mx-auto max-w-[210mm] bg-white print:max-w-full">

    <!-- HEADER -->
    <div class="p-6 print:p-4 border-b-2 border-gray-800">
      <OmecoBillHeader :bill="bill" />
    </div>

    <!-- BODY -->
    <div class="p-6 print:p-4">

      <!-- TWO-COLUMN FLOW (NOT GRID) -->
      <div
        class="
          columns-1
          lg:columns-2
          print:columns-2
          gap-x-8
          print:gap-x-6
          mt-6
        "
      >

        <!-- BILLING INFO -->
        <section class="border border-gray-300 rounded-md p-3 mb-4 break-inside-avoid">
          <h1 class="text-xl font-bold text-gray-800 mb-3">
            Your Electric Bill
          </h1>

          <div class="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <div>
              <p class="text-gray-600 text-xs">Billing Period</p>
              <p class="font-bold">{{ bill.billingPeriod }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-xs">Bill Date</p>
              <p class="font-bold">{{ bill.billDate }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-xs">Meter Reading Date</p>
              <p class="font-bold">{{ bill.meter.readingDate }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-xs">Meter No.</p>
              <p class="font-bold">{{ bill.meterNumber }}</p>
            </div>
          </div>
        </section>

        <!-- AMOUNT DUE (WILL AUTO-FLOW TO RIGHT COLUMN) -->
        <section class="border-2 border-gray-800 rounded-lg p-4 bg-gray-50 mb-6 break-inside-avoid">
          <OmecoAmountDue :bill="bill" />
        </section>

        <!-- CONSUMPTION -->
        <section class="mb-6 break-inside-avoid">
          <OmecoConsumptionSection :bill="bill" />
        </section>

        <!-- ENVIRONMENT -->
        <section class="mb-6 break-inside-avoid">
          <OmecoEnvironmentalImpact :bill="bill" />
        </section>

        <!-- PAYMENT -->
        <section class="mb-6 break-inside-avoid">
          <OmecoPaymentAndSupport :bill="bill" />
        </section>

      </div>
    </div>

    <!-- PRINT BUTTON -->
    <div class="flex justify-center print:hidden p-8 border-t-2 border-gray-300">
      <button
        class="flex items-center gap-3 rounded-xl border-2 border-amber-500
               bg-gradient-to-b from-amber-400 to-amber-500
               px-10 py-3.5 font-bold shadow-lg
               hover:from-amber-500 hover:to-amber-600 active:scale-95"
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
    margin: 6mm; /* was 8mm */
  }

  html {
    font-size: 10.5px; /* was 11.5px */
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