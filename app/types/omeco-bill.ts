export interface OmecoCharge {
  key: 'generation' | 'transmission' | 'systemLoss' | 'distribution' | 'subsidies' | 'governmentTaxes' | 'universalCharges' | 'fitAll' | 'appliedCredits' | 'otherCharges' | 'installmentDue' | string
  label: string
  amount: number
  category?: 'energy' | 'delivery' | 'tax' | 'other'
  description?: string
}

export interface OmecoMeterReading {
  previous: number
  current: number
  consumption: number
  readingDate: string
  nextReadingDate?: string
  multiplier?: number
}

export interface OmecoConsumptionHistory {
  month: string
  year: number
  consumption: number
  amount?: number
}

export interface OmecoEnvironmentalImpact {
  electricityUsed: number // kWh
  co2Emissions: number // tCO2e
  treesRequired: number // number of trees to offset
  emissionFactor?: number // tCO2/kWh
}

export interface OmecoPaymentChannel {
  type: 'office' | 'online' | 'partner' | 'bank'
  name: string
  instructions?: string
}

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

export interface OmecoBill {
  // Identification
  billStatementNumber: string
  accountNumber: string
  consumerName: string
  address: string
  customerType: 'residential' | 'commercial' | 'industrial'

  // Billing Period Info
  billingPeriod: string
  billDate: string
  dueDate: string
  disconnectionDate?: string
  
  // Meter Information
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
    difference: number // in kWh
    direction: 'higher' | 'lower'
  }
  comparisonToLastYear?: {
    percentage: number
    difference: number // in kWh
    direction: 'higher' | 'lower'
  }

  // Financial Information
  previousBalance: number
  unpaidBills?: {
    billDate: string
    amount: number
  }[]
  charges: OmecoCharge[]
  totalChargesThisPeriod: number
  installmentDue?: number
  totalAmountDue: number
  
  // Payment Information
  paymentChannels?: OmecoPaymentChannel[]
  qrCode?: string // QR code data
  barcode?: string // Barcode data
  paymentReferenceNumber?: string
  
  // Environmental Impact
  environmentalImpact?: OmecoEnvironmentalImpact
  
  // Additional Information
  contactInfo?: OmecoContactInfo
  notes?: string[]
  isEstimated?: boolean // If meter reading is estimated
  permitNumber?: string
  pageNumber?: number
  totalPages?: number
}

// Helper type for charge calculations
export interface ChargeBreakdown {
  generation: number
  transmission: number
  systemLoss: number
  distribution: number
  subsidies: number
  governmentTaxes: number
  universalCharges: number
  fitAll: number
  appliedCredits: number
  otherCharges: number
}

// Utility functions for type safety
export function calculateTotalCharges(charges: OmecoCharge[]): number {
  return charges.reduce((sum, charge) => sum + charge.amount, 0)
}

export function getChargeByKey(charges: OmecoCharge[], key: string): OmecoCharge | undefined {
  return charges.find(charge => charge.key === key)
}

export function categorizeCharges(charges: OmecoCharge[]): Record<string, OmecoCharge[]> {
  return charges.reduce((acc, charge) => {
    const category = charge.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(charge)
    return acc
  }, {} as Record<string, OmecoCharge[]>)
}