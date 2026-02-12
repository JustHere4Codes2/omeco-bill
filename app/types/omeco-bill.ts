// -----------------------------
// Charge Keys (Strict Union)
// -----------------------------
export type OmecoChargeKey =
  | 'generation'
  | 'transmission'
  | 'systemLoss'
  | 'distribution'
  | 'subsidies'
  | 'governmentTaxes'
  | 'universalCharges'
  | 'fitAll'
  | 'appliedCredits'
  | 'otherCharges'
  | 'installmentDue'

// -----------------------------
// Charge Category
// -----------------------------
export type OmecoChargeCategory =
  | 'energy'
  | 'delivery'
  | 'tax'
  | 'other'

// -----------------------------
// Charge Interface
// -----------------------------
export interface OmecoCharge {
  key: OmecoChargeKey
  label: string

  // For computation table (back page)
  base?: number | string
  price?: number | string

  amount: number
  category?: OmecoChargeCategory
  description?: string
}

// -----------------------------
// Meter Reading
// -----------------------------
export interface OmecoMeterReading {
  previous: number
  current: number
  consumption: number
  readingDate: string
  nextReadingDate?: string
  multiplier?: number
}

// -----------------------------
// Consumption History
// -----------------------------
export interface OmecoConsumptionHistory {
  month: string
  year: number
  consumption: number
  amount?: number
}

// -----------------------------
// Environmental Impact
// -----------------------------
export interface OmecoEnvironmentalImpact {
  electricityUsed: number
  co2Emissions: number
  treesRequired: number
  emissionFactor?: number
}

// -----------------------------
// Payment Channel
// -----------------------------
export interface OmecoPaymentChannel {
  type: 'office' | 'online' | 'partner' | 'bank'
  name: string
  instructions?: string
}

// -----------------------------
// Contact Info
// -----------------------------
export interface OmecoContactInfo {
  office: string
  address: string
  hotline: string
  email: string
  website?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
  }
  tin?: string
}

// -----------------------------
// Main Bill Interface
// -----------------------------
export interface OmecoBill {
  // Identification
  billStatementNumber: string
  serviceId: string
  accountNumber: string
  consumerName: string
  address: string
  customerType: 'residential' | 'commercial' | 'industrial'

  // Billing Period
  billingPeriod: string
  billDate: string
  dueDate: string
  disconnectionDate?: string

  // Meter
  meterNumber: string
  meterType?: 'analog' | 'digital' | 'smart'
  ratePerKwh: number
  meter: OmecoMeterReading

  // Consumption Data
  consumptionHistory?: OmecoConsumptionHistory[]
  averageMonthlyConsumption?: number
  averageDailyConsumption?: number
  averageDailyCost?: number
  comparisonToPreviousPeriod?: {
    percentage: number
    difference: number
    direction: 'higher' | 'lower'
  }
  comparisonToLastYear?: {
    percentage: number
    difference: number
    direction: 'higher' | 'lower'
  }

  // Financial
  previousBalance: number
  unpaidBills?: {
    billDate: string
    amount: number
  }[]
  charges: OmecoCharge[]
  totalChargesThisPeriod: number
  installmentDue?: number
  totalAmountDue: number

  // Payment
  paymentChannels?: OmecoPaymentChannel[]
  qrCode?: string
  barcode?: string
  paymentReferenceNumber?: string

  // Environmental
  environmentalImpact?: OmecoEnvironmentalImpact

  // Additional
  contactInfo?: OmecoContactInfo
  notes?: string[]
  isEstimated?: boolean
  permitNumber?: string
  pageNumber?: number
  totalPages?: number
}

// -----------------------------
// Charge Breakdown (Strict)
// -----------------------------
export type ChargeBreakdown = Record<OmecoChargeKey, number>

// -----------------------------
// Utility Functions
// -----------------------------
export function calculateTotalCharges(
  charges: OmecoCharge[]
): number {
  return charges.reduce((sum, charge) => sum + charge.amount, 0)
}

export function getChargeByKey(
  charges: OmecoCharge[],
  key: OmecoChargeKey
): OmecoCharge | undefined {
  return charges.find(charge => charge.key === key)
}

export function categorizeCharges(
  charges: OmecoCharge[]
): Record<OmecoChargeCategory, OmecoCharge[]> {
  return charges.reduce((acc, charge) => {
    const category = charge.category ?? 'other'
    acc[category].push(charge)
    return acc
  }, {
    energy: [],
    delivery: [],
    tax: [],
    other: []
  } as Record<OmecoChargeCategory, OmecoCharge[]>)
}