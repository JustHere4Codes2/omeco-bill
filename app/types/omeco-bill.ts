// =====================================================
// CHARGE KEYS (STRICT)
// =====================================================
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

// =====================================================
// CHARGE CATEGORY
// =====================================================
export type OmecoChargeCategory =
  | 'energy'
  | 'delivery'
  | 'tax'
  | 'other'

// =====================================================
// CHARGE
// =====================================================
export interface OmecoCharge {
  key: OmecoChargeKey
  label: string

  /**
   * Optional fields used for back-page computation display.
   * Always store numeric values internally.
   */
  base?: number
  price?: number

  amount: number
  category: OmecoChargeCategory
  description?: string
}

// =====================================================
// METER READING
// =====================================================
export interface OmecoMeterReading {
  previous: number
  current: number
  consumption: number
  readingDate: string // ISO format recommended
  nextReadingDate?: string
  multiplier?: number
}

// =====================================================
// CONSUMPTION HISTORY
// =====================================================
export interface OmecoConsumptionHistory {
  month: string
  year: number
  consumption: number
  amount?: number
  paymentStatus?: 'paid' | 'unpaid' | 'overdue'
}

// =====================================================
// ENVIRONMENTAL IMPACT
// =====================================================
export interface OmecoEnvironmentalImpact {
  electricityUsed: number
  co2Emissions: number
  treesRequired: number
  emissionFactor: number
}

// =====================================================
// PAYMENT CHANNEL
// =====================================================
export interface OmecoPaymentChannel {
  type: 'office' | 'online' | 'partner' | 'bank'
  name: string
  instructions?: string
}

// =====================================================
// CONTACT INFO
// =====================================================
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

// =====================================================
// UNPAID BILL
// =====================================================
export interface OmecoUnpaidBill {
  billDate: string
  dueDate: string
  amount: number
  status: 'overdue' | 'pending'
}

// =====================================================
// PAYMENT HISTORY
// =====================================================
export interface OmecoPaymentHistory {
  date: string
  amount: number
  referenceNumber: string
  method?: string
}

// =====================================================
// MAIN BILL
// =====================================================
export interface OmecoBill {
  // Identification
  billStatementNumber: string
  serviceId: string
  accountNumber: string
  consumerName: string
  address: string
  customerType: 'residential' | 'commercial' | 'industrial'

  // Billing
  billingPeriod: string
  billDate: string
  dueDate: string
  disconnectionDate?: string

  // Meter
  meterNumber: string
  meterType?: 'analog' | 'digital' | 'smart'
  ratePerKwh: number
  meter: OmecoMeterReading

  // Consumption
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
  unpaidBills?: OmecoUnpaidBill[]
  paymentHistory?: OmecoPaymentHistory[]
  charges: OmecoCharge[]
  totalChargesThisPeriod: number
  installmentDue?: number
  totalAmountDue: number

  // Payment Data
  paymentChannels?: OmecoPaymentChannel[]
  qrCode?: string
  barcode?: string
  paymentReferenceNumber?: string

  // Environmental
  environmentalImpact?: OmecoEnvironmentalImpact

  // Other
  contactInfo?: OmecoContactInfo
  notes?: string[]
  isEstimated?: boolean
  permitNumber?: string
  pageNumber?: number
  totalPages?: number
}

// =====================================================
// BREAKDOWN TYPE
// =====================================================
export type ChargeBreakdown = Partial<Record<OmecoChargeKey, number>>

// =====================================================
// UTILITIES
// =====================================================

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

  const initial: Record<OmecoChargeCategory, OmecoCharge[]> = {
    energy: [],
    delivery: [],
    tax: [],
    other: []
  }

  return charges.reduce((acc, charge) => {
    acc[charge.category].push(charge)
    return acc
  }, initial)
}

export function calculateTotalUnpaid(
  unpaidBills?: OmecoUnpaidBill[]
): number {
  if (!unpaidBills?.length) return 0
  return unpaidBills.reduce((sum, bill) => sum + bill.amount, 0)
}

export function calculateTotalPaid(
  paymentHistory?: OmecoPaymentHistory[]
): number {
  if (!paymentHistory?.length) return 0
  return paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
}


/**
 * Calculates number of days overdue.
 * Expects ISO date format (YYYY-MM-DD).
 */
export function getDaysOverdue(dueDate: string): number {
  const due = new Date(dueDate)
  if (isNaN(due.getTime())) return 0

  const today = new Date()
  const diffMs = today.getTime() - due.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}
export interface CustomerInfo {
  accountNumber: string
  accountName: string
  serviceAddress: string
  meterNumber: string
  rateClass: string
  billMonth: string
}
