import { MoveEstimate } from '../types'
import { vehicles } from '../data/vehicles'

interface CostBreakdown {
  loading: number
  transport: number
  unloading: number
  insurance: number
  total: number
}

export function calculateCost(estimate: MoveEstimate, distanceKm: number = 25): { low: CostBreakdown; mid: CostBreakdown; high: CostBreakdown } {
  const vol = estimate.total_volume
  const wgt = estimate.total_weight
  const fromFloor = estimate.from_floor || 0
  const toFloor = estimate.to_floor || 0
  const hasElevatorFrom = estimate.from_elevator
  const hasElevatorTo = estimate.to_elevator

  // Find suitable vehicle
  const buffered = vol * 1.2
  const v = vehicles.find(veh => veh.max_volume_cuft >= buffered) || vehicles[vehicles.length - 1]

  // Base transport
  const transport = v.base_cost_per_km * distanceKm

  // Loading/unloading based on floors
  const floorMultiplierFrom = hasElevatorFrom ? 1.0 : (1 + fromFloor * 0.15)
  const floorMultiplierTo = hasElevatorTo ? 1.0 : (1 + toFloor * 0.15)
  const loadBase = wgt * 2.5
  const loading = Math.round(loadBase * floorMultiplierFrom)
  const unloading = Math.round(loadBase * floorMultiplierTo * 0.9)

  // Insurance (1-2% of estimated value, rough)
  const estValue = wgt * 150
  const insurance = Math.round(estValue * 0.015)

  // Move type multiplier
  const typeMultiplier = estimate.move_type === 'international' ? 3.5 : estimate.move_type === 'interstate' ? 1.8 : 1.0

  const midTotal = Math.round((loading + transport + unloading + insurance) * typeMultiplier)

  return {
    low: { loading: Math.round(loading * 0.8), transport: Math.round(transport * 0.85), unloading: Math.round(unloading * 0.8), insurance: Math.round(insurance * 0.8), total: Math.round(midTotal * 0.75) },
    mid: { loading, transport: Math.round(transport), unloading, insurance, total: midTotal },
    high: { loading: Math.round(loading * 1.3), transport: Math.round(transport * 1.2), unloading: Math.round(unloading * 1.3), insurance: Math.round(insurance * 1.5), total: Math.round(midTotal * 1.35) },
  }
}

export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = { INR: '₹', AED: 'AED ', USD: '$', GBP: '£' }
  const sym = symbols[currency] || '₹'
  return `${sym}${amount.toLocaleString()}`
}
