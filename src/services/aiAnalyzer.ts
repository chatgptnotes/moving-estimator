import { DetectedItem, Room, RoomType } from '../types'
import { getItemsForRoom, cmToCuft } from '../data/itemDatabase'

function randomId(): string {
  return Math.random().toString(36).substring(2, 10)
}

function randomConfidence(): number {
  return Math.round((0.7 + Math.random() * 0.25) * 100) / 100
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function generateMockItems(roomType: RoomType, roomId: string, estimateId: string): DetectedItem[] {
  const templates = getItemsForRoom(roomType)
  const count = Math.min(templates.length, 8 + Math.floor(Math.random() * 8))
  const picked = pickRandom(templates, count)

  // Add some carton boxes
  const extras = Math.floor(Math.random() * 5) + 1
  for (let i = 0; i < extras; i++) {
    picked.push({
      name: `Carton Box #${i + 1}`,
      category: 'Boxes',
      length_cm: 50 + Math.floor(Math.random() * 20),
      width_cm: 35 + Math.floor(Math.random() * 15),
      height_cm: 30 + Math.floor(Math.random() * 20),
      weight_kg: 8 + Math.floor(Math.random() * 12),
      icon: '📦',
      room_types: [roomType],
    })
  }

  return picked.map(t => ({
    id: randomId(),
    room_id: roomId,
    estimate_id: estimateId,
    name: t.name,
    category: t.category as DetectedItem['category'],
    length_cm: t.length_cm + Math.floor(Math.random() * 10 - 5),
    width_cm: t.width_cm + Math.floor(Math.random() * 10 - 5),
    height_cm: t.height_cm + Math.floor(Math.random() * 10 - 5),
    volume_cuft: cmToCuft(t.length_cm, t.width_cm, t.height_cm),
    weight_kg: t.weight_kg + Math.floor(Math.random() * 6 - 3),
    source: 'ai' as const,
    confidence: randomConfidence(),
    icon: t.icon,
  }))
}

export async function analyzeRooms(rooms: Room[], estimateId: string): Promise<Room[]> {
  // Simulate analysis delay
  await new Promise(r => setTimeout(r, 2000))

  return rooms.map(room => {
    const items = generateMockItems(room.type, room.id, estimateId)
    const totalVol = items.reduce((s, i) => s + i.volume_cuft, 0)
    const totalWgt = items.reduce((s, i) => s + i.weight_kg, 0)
    return {
      ...room,
      items,
      total_volume: Math.round(totalVol * 10) / 10,
      total_weight: Math.round(totalWgt),
      item_count: items.length,
      scanned: true,
    }
  })
}
