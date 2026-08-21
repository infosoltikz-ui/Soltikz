export interface PricingPlan {
  id: 'PRO_MONTHLY' | 'PRO_YEARLY'
  label: string
  amountInr: number
  period: 'month' | 'year'
}

export const PRO_MONTHLY: PricingPlan = {
  id: 'PRO_MONTHLY',
  label: 'Pro Monthly',
  amountInr: 499,
  period: 'month',
}

export const PRO_YEARLY: PricingPlan = {
  id: 'PRO_YEARLY',
  label: 'Pro Yearly',
  amountInr: 4790, // ~20% off 499 * 12
  period: 'year',
}

export function getPlan(isYearly: boolean): PricingPlan {
  return isYearly ? PRO_YEARLY : PRO_MONTHLY
}

// Any plan_id starting with PRO_ is a paid tier (monthly or yearly).
export function isPremiumPlan(planId: string | null | undefined): boolean {
  return !!planId?.startsWith('PRO_')
}
