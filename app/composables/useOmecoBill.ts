import { ref } from 'vue'
import type { OmecoBill } from '~/types/omeco-bill'
import { calculateTotalCharges, getDaysOverdue } from '~/types/omeco-bill'

export const useOmecoBill = () => {
  const charges: OmecoBill['charges'] = [
    { key: 'generation', label: 'Generation', amount: 909.48, category: 'energy' },
    { key: 'transmission', label: 'Transmission', amount: 149.72, category: 'delivery' },
    { key: 'systemLoss', label: 'System Loss', amount: 81.34, category: 'delivery' },
    { key: 'distribution', label: 'Distribution (OMECO)', amount: 335.99, category: 'delivery' },
    { key: 'subsidies', label: 'Subsidies', amount: 13.36, category: 'tax' },
    { key: 'governmentTaxes', label: 'Government Taxes', amount: 169.05, category: 'tax' },
    { key: 'universalCharges', label: 'Universal Charges', amount: 39.78, category: 'other' },
    { key: 'fitAll', label: 'FIT-All (Renewables)', amount: 19.66, category: 'other' },
    { key: 'appliedCredits', label: 'Applied Credits', amount: 0, category: 'other' },
    { key: 'otherCharges', label: 'Other Charges', amount: 0, category: 'other' }
  ]

  const totalChargesThisPeriod = calculateTotalCharges(charges)
  const previousBalance = 1646.48
  const previousDueDate = '17 Sep 2021'

  const bill = ref<OmecoBill>({
    // Identification
    billStatementNumber: '123456789123',
    serviceId: 'SVC-1234567890',
    accountNumber: '1234567890',
    consumerName: 'JUAN DELA CRUZ',
    address: 'Abeleda St., Barangay 6, San Jose, Occidental Mindoro',
    customerType: 'residential',

    // Billing Period
    billingPeriod: '07 Sep 2021 to 06 Oct 2021',
    billDate: '06 Oct 2021',
    dueDate: '17 Oct 2021',
    disconnectionDate: '27 Oct 2021',

    // Meter
    meterNumber: '123AB456789',
    meterType: 'digital',
    ratePerKwh: 8.59,
    meter: {
      previous: 2855,
      current: 3055,
      consumption: 200,
      readingDate: '06 Oct 2021',
      nextReadingDate: '06 Nov 2021',
      multiplier: 1
    },

    // Consumption Data
    consumptionHistory: [
      { month: 'Jan', year: 2024, consumption: 155 },
      { month: 'Feb', year: 2024, consumption: 140 },
      { month: 'Mar', year: 2024, consumption: 215 },
      { month: 'Apr', year: 2024, consumption: 282 },
      { month: 'May', year: 2024, consumption: 287 },
      { month: 'Jun', year: 2024, consumption: 264 },
      { month: 'Jul', year: 2024, consumption: 240 },
      { month: 'Aug', year: 2024, consumption: 223 },
      { month: 'Sep', year: 2024, consumption: 210 },
      { month: 'Oct', year: 2024, consumption: 200 },
      { month: 'Nov', year: 2025, consumption: 166 },
      { month: 'Dec', year: 2025, consumption: 193 }
    ],
    averageMonthlyConsumption: 214,
    averageDailyConsumption: 200 / 30,
    averageDailyCost: (200 / 30) * 8.59,
    comparisonToPreviousPeriod: {
      percentage: 4.8,
      difference: 10,
      direction: 'lower'
    },
    comparisonToLastYear: {
      percentage: 4.2,
      difference: 8,
      direction: 'higher'
    },

    // Financial
    previousBalance,
    unpaidBills: [
      {
        billDate: '06 Sep 2021',
        dueDate: previousDueDate,
        amount: previousBalance,
        status:
          getDaysOverdue(previousDueDate) > 0 ? 'overdue' : 'pending'
      }
    ],
    charges,
    totalChargesThisPeriod,
    installmentDue: 0,
    totalAmountDue: previousBalance + totalChargesThisPeriod,

    // Payment
    paymentChannels: [
      { type: 'office', name: 'OMECO Office / Cashier' },
      { type: 'partner', name: 'Authorized Payment Centers' },
      { type: 'online', name: 'Online Banking / E-Wallets' }
    ],
    qrCode: 'OMECO1234567890',
    barcode: '1234567890123',
    paymentReferenceNumber: 'OMECO-2021-10-1234567890',

    // Environmental
    environmentalImpact: {
      electricityUsed: 200,
      co2Emissions: 200 * 0.0009129,
      treesRequired: Math.ceil((200 * 0.0009129) / 0.02178),
      emissionFactor: 0.0009129
    },

    // Contact
    contactInfo: {
      office: 'Occidental Mindoro Electric Cooperative (OMECO)',
      address: 'San Jose, Occidental Mindoro',
      hotline: '16211',
      email: 'customercare@omeco.com.ph',
      website: 'www.omeco.com.ph',
      socialMedia: {
        facebook: 'fb.com/omeco',
        twitter: '@omeco'
      },
      tin: '000-101-528-000'
    },

    notes: [
      'This billing statement is for reference only. Keep your official receipt after payment.',
      'OMECO may conduct routine maintenance inspection within your area this quarter.'
    ],

    isEstimated: false,
    permitNumber: 'Permit No.: 0305-00036-BAJAR dtd: March 21, 2005',
    pageNumber: 1,
    totalPages: 2
  })

  return { bill }
}