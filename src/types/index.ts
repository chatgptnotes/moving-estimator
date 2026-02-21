export interface MoveEstimate {
  id: string
  from_address: string
  from_city: string
  from_floor: number
  from_elevator: boolean
  to_address: string
  to_city: string
  to_floor: number
  to_elevator: boolean
  move_type: 'local' | 'interstate' | 'international'
  move_date: string
  total_volume: number
  total_weight: number
  recommended_vehicle: string
  cost_low: number
  cost_mid: number
  cost_high: number
  currency: string
  status: 'draft' | 'scanning' | 'analyzing' | 'ready' | 'shared'
  created_at: string
  rooms: Room[]
}

export interface Room {
  id: string
  estimate_id: string
  name: string
  type: RoomType
  video_url?: string
  video_blob?: Blob
  total_volume: number
  total_weight: number
  item_count: number
  items: DetectedItem[]
  scanned: boolean
}

export type RoomType = 'living_room' | 'master_bedroom' | 'bedroom_2' | 'bedroom_3' | 'kitchen' | 'bathroom' | 'dining' | 'office' | 'garage' | 'storage' | 'balcony' | 'other'

export interface DetectedItem {
  id: string
  room_id: string
  estimate_id: string
  name: string
  category: ItemCategory
  length_cm: number
  width_cm: number
  height_cm: number
  volume_cuft: number
  weight_kg: number
  source: 'ai' | 'manual'
  confidence: number
  icon: string
}

export type ItemCategory = 'Furniture' | 'Appliances' | 'Boxes' | 'Fragile' | 'Heavy' | 'Electronics' | 'Outdoor'

export interface Vehicle {
  id: string
  name: string
  type: string
  max_volume_cuft: number
  max_weight_kg: number
  icon: string
  base_cost_per_km: number
}

export interface Settings {
  currency: 'INR' | 'AED' | 'USD' | 'GBP'
  distanceUnit: 'km' | 'miles'
  weightUnit: 'kg' | 'lbs'
  defaultCity: string
  apiKey: string
}
