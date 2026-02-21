import { Vehicle } from '../types'

export const vehicles: Vehicle[] = [
  { id: 'v1', name: 'Pickup (Tata Ace)', type: 'pickup', max_volume_cuft: 150, max_weight_kg: 750, icon: '🛻', base_cost_per_km: 18 },
  { id: 'v2', name: 'Mini Truck (Eicher)', type: 'mini', max_volume_cuft: 350, max_weight_kg: 2000, icon: '🚚', base_cost_per_km: 28 },
  { id: 'v3', name: 'Medium Truck (14ft)', type: 'medium', max_volume_cuft: 600, max_weight_kg: 4000, icon: '🚚', base_cost_per_km: 40 },
  { id: 'v4', name: 'Large Truck (20ft)', type: 'large', max_volume_cuft: 1000, max_weight_kg: 7000, icon: '🚛', base_cost_per_km: 55 },
  { id: 'v5', name: '40ft Container', type: 'container', max_volume_cuft: 2300, max_weight_kg: 20000, icon: '📦', base_cost_per_km: 85 },
]

export function recommendVehicle(totalVolume: number, totalWeight: number): { vehicle: Vehicle; percentFull: number; trips: number }[] {
  const bufferedVolume = totalVolume * 1.2
  return vehicles.map(v => {
    const volPct = Math.round((totalVolume / v.max_volume_cuft) * 100)
    const wgtPct = Math.round((totalWeight / v.max_weight_kg) * 100)
    const pct = Math.max(volPct, wgtPct)
    const trips = Math.ceil(bufferedVolume / v.max_volume_cuft)
    return { vehicle: v, percentFull: Math.min(pct, 100), trips }
  })
}
