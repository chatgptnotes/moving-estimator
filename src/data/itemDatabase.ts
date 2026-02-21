export interface ItemTemplate {
  name: string
  category: string
  length_cm: number
  width_cm: number
  height_cm: number
  weight_kg: number
  icon: string
  room_types: string[]
}

export const itemDatabase: ItemTemplate[] = [
  // Living Room
  { name: '3-Seater Sofa', category: 'Furniture', length_cm: 220, width_cm: 90, height_cm: 85, weight_kg: 45, icon: '🛋️', room_types: ['living_room'] },
  { name: '2-Seater Sofa', category: 'Furniture', length_cm: 160, width_cm: 85, height_cm: 85, weight_kg: 35, icon: '🛋️', room_types: ['living_room'] },
  { name: 'Armchair', category: 'Furniture', length_cm: 90, width_cm: 85, height_cm: 90, weight_kg: 25, icon: '💺', room_types: ['living_room'] },
  { name: 'Coffee Table', category: 'Furniture', length_cm: 120, width_cm: 60, height_cm: 45, weight_kg: 15, icon: '🪑', room_types: ['living_room'] },
  { name: 'TV Unit', category: 'Furniture', length_cm: 180, width_cm: 45, height_cm: 55, weight_kg: 30, icon: '📺', room_types: ['living_room'] },
  { name: 'LED TV 55"', category: 'Electronics', length_cm: 124, width_cm: 10, height_cm: 72, weight_kg: 18, icon: '📺', room_types: ['living_room'] },
  { name: 'Bookshelf', category: 'Furniture', length_cm: 80, width_cm: 30, height_cm: 200, weight_kg: 35, icon: '📚', room_types: ['living_room', 'office'] },
  { name: 'Side Table', category: 'Furniture', length_cm: 50, width_cm: 50, height_cm: 55, weight_kg: 8, icon: '🪑', room_types: ['living_room'] },
  { name: 'Floor Lamp', category: 'Fragile', length_cm: 40, width_cm: 40, height_cm: 170, weight_kg: 5, icon: '💡', room_types: ['living_room'] },
  { name: 'Rug (Large)', category: 'Boxes', length_cm: 300, width_cm: 200, height_cm: 3, weight_kg: 12, icon: '🟫', room_types: ['living_room'] },
  { name: 'Wall Art / Painting', category: 'Fragile', length_cm: 100, width_cm: 5, height_cm: 70, weight_kg: 5, icon: '🖼️', room_types: ['living_room'] },
  { name: 'Curtains Set', category: 'Boxes', length_cm: 50, width_cm: 30, height_cm: 20, weight_kg: 3, icon: '🪟', room_types: ['living_room'] },
  { name: 'Sound Bar', category: 'Electronics', length_cm: 90, width_cm: 10, height_cm: 8, weight_kg: 4, icon: '🔊', room_types: ['living_room'] },
  { name: 'Console Table', category: 'Furniture', length_cm: 120, width_cm: 35, height_cm: 80, weight_kg: 18, icon: '🪑', room_types: ['living_room'] },
  { name: 'Indoor Plant (Large)', category: 'Fragile', length_cm: 50, width_cm: 50, height_cm: 120, weight_kg: 15, icon: '🪴', room_types: ['living_room', 'balcony'] },
  // Bedroom
  { name: 'Queen Bed Frame', category: 'Furniture', length_cm: 210, width_cm: 160, height_cm: 45, weight_kg: 50, icon: '🛏️', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'King Bed Frame', category: 'Furniture', length_cm: 210, width_cm: 190, height_cm: 45, weight_kg: 60, icon: '🛏️', room_types: ['master_bedroom'] },
  { name: 'Single Bed Frame', category: 'Furniture', length_cm: 200, width_cm: 100, height_cm: 45, weight_kg: 30, icon: '🛏️', room_types: ['bedroom_2', 'bedroom_3'] },
  { name: 'Queen Mattress', category: 'Furniture', length_cm: 200, width_cm: 150, height_cm: 25, weight_kg: 30, icon: '🛏️', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'Wardrobe (3-door)', category: 'Furniture', length_cm: 180, width_cm: 60, height_cm: 210, weight_kg: 80, icon: '🚪', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'Wardrobe (2-door)', category: 'Furniture', length_cm: 120, width_cm: 60, height_cm: 210, weight_kg: 60, icon: '🚪', room_types: ['bedroom_2', 'bedroom_3'] },
  { name: 'Dresser / Vanity', category: 'Furniture', length_cm: 120, width_cm: 45, height_cm: 80, weight_kg: 25, icon: '🪞', room_types: ['master_bedroom'] },
  { name: 'Bedside Table', category: 'Furniture', length_cm: 50, width_cm: 40, height_cm: 55, weight_kg: 8, icon: '🪑', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'Study Desk', category: 'Furniture', length_cm: 120, width_cm: 60, height_cm: 75, weight_kg: 20, icon: '📋', room_types: ['bedroom_2', 'bedroom_3', 'office'] },
  { name: 'Office Chair', category: 'Furniture', length_cm: 65, width_cm: 65, height_cm: 110, weight_kg: 12, icon: '🪑', room_types: ['office', 'bedroom_2'] },
  { name: 'Chest of Drawers', category: 'Furniture', length_cm: 80, width_cm: 45, height_cm: 100, weight_kg: 30, icon: '🗄️', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'Mirror (Full Length)', category: 'Fragile', length_cm: 50, width_cm: 5, height_cm: 150, weight_kg: 10, icon: '🪞', room_types: ['master_bedroom'] },
  // Kitchen
  { name: 'Refrigerator (Double Door)', category: 'Appliances', length_cm: 70, width_cm: 70, height_cm: 175, weight_kg: 65, icon: '🧊', room_types: ['kitchen'] },
  { name: 'Refrigerator (Single Door)', category: 'Appliances', length_cm: 55, width_cm: 55, height_cm: 140, weight_kg: 40, icon: '🧊', room_types: ['kitchen'] },
  { name: 'Washing Machine', category: 'Appliances', length_cm: 60, width_cm: 60, height_cm: 85, weight_kg: 55, icon: '🫧', room_types: ['kitchen', 'bathroom'] },
  { name: 'Microwave Oven', category: 'Appliances', length_cm: 50, width_cm: 40, height_cm: 30, weight_kg: 15, icon: '♨️', room_types: ['kitchen'] },
  { name: 'Dining Table (4-seater)', category: 'Furniture', length_cm: 120, width_cm: 80, height_cm: 75, weight_kg: 25, icon: '🪑', room_types: ['kitchen', 'dining'] },
  { name: 'Dining Table (6-seater)', category: 'Furniture', length_cm: 180, width_cm: 90, height_cm: 75, weight_kg: 40, icon: '🪑', room_types: ['dining'] },
  { name: 'Dining Chair', category: 'Furniture', length_cm: 45, width_cm: 45, height_cm: 90, weight_kg: 5, icon: '🪑', room_types: ['kitchen', 'dining'] },
  { name: 'Kitchen Cabinet', category: 'Furniture', length_cm: 60, width_cm: 35, height_cm: 70, weight_kg: 15, icon: '🗄️', room_types: ['kitchen'] },
  { name: 'Gas Stove', category: 'Appliances', length_cm: 70, width_cm: 50, height_cm: 15, weight_kg: 12, icon: '🔥', room_types: ['kitchen'] },
  { name: 'Dishwasher', category: 'Appliances', length_cm: 60, width_cm: 60, height_cm: 85, weight_kg: 45, icon: '🍽️', room_types: ['kitchen'] },
  { name: 'Water Purifier', category: 'Appliances', length_cm: 35, width_cm: 25, height_cm: 50, weight_kg: 8, icon: '💧', room_types: ['kitchen'] },
  { name: 'Kitchen Utensils Box', category: 'Boxes', length_cm: 60, width_cm: 40, height_cm: 30, weight_kg: 10, icon: '📦', room_types: ['kitchen'] },
  { name: 'Crockery Set', category: 'Fragile', length_cm: 50, width_cm: 40, height_cm: 30, weight_kg: 8, icon: '🍽️', room_types: ['kitchen'] },
  { name: 'Mixer / Grinder', category: 'Appliances', length_cm: 30, width_cm: 20, height_cm: 35, weight_kg: 5, icon: '🥣', room_types: ['kitchen'] },
  // Bathroom
  { name: 'Bathroom Cabinet', category: 'Furniture', length_cm: 60, width_cm: 30, height_cm: 70, weight_kg: 12, icon: '🗄️', room_types: ['bathroom'] },
  { name: 'Bathroom Accessories Box', category: 'Boxes', length_cm: 40, width_cm: 30, height_cm: 25, weight_kg: 5, icon: '📦', room_types: ['bathroom'] },
  { name: 'Geyser / Water Heater', category: 'Appliances', length_cm: 40, width_cm: 40, height_cm: 50, weight_kg: 15, icon: '🚿', room_types: ['bathroom'] },
  // Office
  { name: 'Computer Desk', category: 'Furniture', length_cm: 150, width_cm: 75, height_cm: 75, weight_kg: 25, icon: '🖥️', room_types: ['office'] },
  { name: 'Desktop Computer', category: 'Electronics', length_cm: 45, width_cm: 20, height_cm: 45, weight_kg: 10, icon: '🖥️', room_types: ['office'] },
  { name: 'Monitor', category: 'Electronics', length_cm: 60, width_cm: 20, height_cm: 45, weight_kg: 6, icon: '🖥️', room_types: ['office'] },
  { name: 'Printer', category: 'Electronics', length_cm: 45, width_cm: 35, height_cm: 20, weight_kg: 8, icon: '🖨️', room_types: ['office'] },
  { name: 'Filing Cabinet', category: 'Furniture', length_cm: 45, width_cm: 60, height_cm: 100, weight_kg: 25, icon: '🗄️', room_types: ['office'] },
  { name: 'Bookshelf (Small)', category: 'Furniture', length_cm: 60, width_cm: 25, height_cm: 120, weight_kg: 15, icon: '📚', room_types: ['office'] },
  // Garage / Storage / Outdoor
  { name: 'Bicycle', category: 'Outdoor', length_cm: 170, width_cm: 60, height_cm: 100, weight_kg: 12, icon: '🚲', room_types: ['garage', 'balcony'] },
  { name: 'Treadmill', category: 'Heavy', length_cm: 180, width_cm: 80, height_cm: 140, weight_kg: 80, icon: '🏃', room_types: ['garage', 'other'] },
  { name: 'Tool Box', category: 'Heavy', length_cm: 50, width_cm: 25, height_cm: 25, weight_kg: 15, icon: '🧰', room_types: ['garage'] },
  { name: 'Garden Furniture Set', category: 'Outdoor', length_cm: 150, width_cm: 90, height_cm: 75, weight_kg: 30, icon: '🪑', room_types: ['balcony', 'garage'] },
  { name: 'Storage Rack', category: 'Furniture', length_cm: 90, width_cm: 45, height_cm: 180, weight_kg: 20, icon: '🗄️', room_types: ['garage', 'storage'] },
  { name: 'Suitcase (Large)', category: 'Boxes', length_cm: 75, width_cm: 50, height_cm: 30, weight_kg: 5, icon: '🧳', room_types: ['storage', 'master_bedroom'] },
  { name: 'Carton Box (Standard)', category: 'Boxes', length_cm: 60, width_cm: 45, height_cm: 45, weight_kg: 15, icon: '📦', room_types: ['storage', 'other'] },
  { name: 'Carton Box (Small)', category: 'Boxes', length_cm: 40, width_cm: 30, height_cm: 30, weight_kg: 8, icon: '📦', room_types: ['storage', 'other'] },
  { name: 'AC Unit (Split)', category: 'Appliances', length_cm: 90, width_cm: 30, height_cm: 30, weight_kg: 35, icon: '❄️', room_types: ['living_room', 'master_bedroom'] },
  { name: 'AC Unit (Window)', category: 'Appliances', length_cm: 65, width_cm: 55, height_cm: 45, weight_kg: 40, icon: '❄️', room_types: ['bedroom_2'] },
  { name: 'Ceiling Fan', category: 'Appliances', length_cm: 120, width_cm: 120, height_cm: 30, weight_kg: 8, icon: '🌀', room_types: ['living_room', 'master_bedroom', 'bedroom_2'] },
  { name: 'Iron / Ironing Board', category: 'Appliances', length_cm: 130, width_cm: 35, height_cm: 90, weight_kg: 6, icon: '👔', room_types: ['other', 'storage'] },
  { name: 'Vacuum Cleaner', category: 'Appliances', length_cm: 35, width_cm: 30, height_cm: 110, weight_kg: 7, icon: '🧹', room_types: ['storage', 'other'] },
  { name: 'Shoe Rack', category: 'Furniture', length_cm: 80, width_cm: 30, height_cm: 90, weight_kg: 10, icon: '👟', room_types: ['other', 'storage'] },
  { name: 'Bean Bag', category: 'Furniture', length_cm: 80, width_cm: 80, height_cm: 90, weight_kg: 8, icon: '🫘', room_types: ['living_room', 'bedroom_3'] },
  { name: 'Piano / Keyboard', category: 'Heavy', length_cm: 140, width_cm: 40, height_cm: 15, weight_kg: 12, icon: '🎹', room_types: ['living_room', 'other'] },
  { name: 'Guitar', category: 'Fragile', length_cm: 105, width_cm: 40, height_cm: 15, weight_kg: 3, icon: '🎸', room_types: ['other', 'bedroom_2'] },
  { name: 'Clothes Box', category: 'Boxes', length_cm: 60, width_cm: 45, height_cm: 45, weight_kg: 12, icon: '👗', room_types: ['master_bedroom', 'bedroom_2'] },
  { name: 'Books Box', category: 'Heavy', length_cm: 45, width_cm: 35, height_cm: 30, weight_kg: 20, icon: '📚', room_types: ['office', 'storage'] },
  { name: 'Aquarium', category: 'Fragile', length_cm: 90, width_cm: 40, height_cm: 50, weight_kg: 25, icon: '🐠', room_types: ['living_room'] },
  { name: 'Drying Rack', category: 'Outdoor', length_cm: 180, width_cm: 60, height_cm: 120, weight_kg: 5, icon: '🧺', room_types: ['balcony'] },
  { name: 'Washing Machine (Top Load)', category: 'Appliances', length_cm: 55, width_cm: 55, height_cm: 95, weight_kg: 50, icon: '🫧', room_types: ['bathroom'] },
]

export function getItemsForRoom(roomType: string): ItemTemplate[] {
  return itemDatabase.filter(item => item.room_types.includes(roomType))
}

export function cmToCuft(l: number, w: number, h: number): number {
  return Math.round((l * w * h) / 28316.85 * 10) / 10
}
