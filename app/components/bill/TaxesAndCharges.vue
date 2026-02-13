<script setup lang="ts">
import { useOmecoBill } from '~/composables/useOmecoBill'
import SectionTitle from './SectionTitle.vue'
import type { OmecoChargeKey } from '~/types/omeco-bill'

const { bill } = useOmecoBill()

const peso = (n: number) =>
  `₱ ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// SAFE charge getter (prevents undefined + index errors)
const charge = (key: OmecoChargeKey): number =>
  bill.value.charges.find(c => c.key === key)?.amount ?? 0
</script>

<template>
  <div>
    <SectionTitle title="Continued" subtitle="Rate Components" thin />

    <!-- TABLE HEADER -->
    <div class="grid grid-cols-4 text-[11px] font-semibold border-b border-gray-400 pb-1">
      <div>Rate Components</div>
      <div class="text-right">Base</div>
      <div class="text-right">Price</div>
      <div class="text-right">Amount</div>
    </div>

    <!-- GOVERNMENT TAXES -->
    <div class="mt-2">
      <div class="font-semibold text-[12px]">Government Taxes 9.84%</div>

      <div class="grid grid-cols-4 text-[11px] mt-1">
        <div>Value Added Tax</div>
        <div class="text-right">{{ charge('generation').toFixed(2) }}</div>
        <div class="text-right">11.2900%</div>
        <div class="text-right">{{ peso(102.68) }}</div>
      </div>

      <div class="grid grid-cols-4 text-[11px]">
        <div>Transmission Charge</div>
        <div class="text-right">{{ charge('transmission').toFixed(2) }}</div>
        <div class="text-right">10.2800%</div>
        <div class="text-right">{{ peso(15.39) }}</div>
      </div>

      <div class="grid grid-cols-4 text-[11px]">
        <div>System Loss Charge</div>
        <div class="text-right">{{ charge('systemLoss').toFixed(2) }}</div>
        <div class="text-right">11.1400%</div>
        <div class="text-right">{{ peso(9.06) }}</div>
      </div>

      <div class="grid grid-cols-4 text-[11px]">
        <div>Distribution Charge</div>
        <div class="text-right">{{ charge('distribution').toFixed(2) }}</div>
        <div class="text-right">12.0000%</div>
        <div class="text-right">{{ peso(40.32) }}</div>
      </div>

      <div class="grid grid-cols-4 text-[11px] font-semibold mt-1">
        <div>Subsidies on Other Charges</div>
        <div></div>
        <div></div>
        <div class="text-right">{{ peso(1.60) }}</div>
      </div>

      <div class="text-right font-semibold mt-1">
        {{ peso(charge('governmentTaxes')) }}
      </div>
    </div>

    <!-- UNIVERSAL CHARGES -->
    <div class="mt-3">
      <div class="font-semibold text-[12px]">Universal Charges 2.31%</div>

      <div class="grid grid-cols-4 text-[11px] mt-1">
        <div>Missionary</div>
        <div class="text-right">200 kWh</div>
        <div class="text-right">0.1562</div>
        <div class="text-right">{{ peso(31.22) }}</div>
      </div>

      <div class="grid grid-cols-4 text-[11px]">
        <div>NPC Stranded Debts</div>
        <div class="text-right">200 kWh</div>
        <div class="text-right">0.0428</div>
        <div class="text-right">{{ peso(8.56) }}</div>
      </div>

      <div class="text-right font-semibold mt-1">
        {{ peso(charge('universalCharges')) }}
      </div>
    </div>

    <!-- FIT ALL -->
    <div class="mt-3">
      <div class="font-semibold text-[12px]">FIT-ALL (Renewable) 1.14%</div>

      <div class="grid grid-cols-4 text-[11px] mt-1">
        <div>FIT-All (Renewable)</div>
        <div class="text-right">200 kWh</div>
        <div class="text-right">0.0983</div>
        <div class="text-right">{{ peso(19.66) }}</div>
      </div>

      <div class="text-right font-semibold mt-1">
        {{ peso(charge('fitAll')) }}
      </div>
    </div>

    <!-- TOTAL ENERGY -->
    <div class="border-t border-gray-400 mt-3 pt-2 text-[12px]">
      <div class="flex justify-between">
        <span class="font-semibold">Energy Bill Amount</span>
        <span class="font-semibold">{{ peso(bill.totalChargesThisPeriod) }}</span>
      </div>

      <div class="flex justify-between mt-1">
        <span>Applied Credits</span>
        <span>{{ peso(0) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-[13px] mt-2">
        <span>Charges for this billing period</span>
        <span>{{ peso(bill.totalChargesThisPeriod) }}</span>
      </div>
    </div>

  </div>
</template>