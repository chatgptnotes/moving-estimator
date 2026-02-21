import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield } from 'lucide-react'
import { useEstimates } from '../../store/useStore'

const handlingTips: Record<string, string> = {
  'LED TV': 'Transport upright in original box or TV box with foam corners. Never lay flat.',
  'Monitor': 'Wrap in bubble wrap, transport upright. Use monitor-specific box if available.',
  'Wall Art': 'Use picture boxes or cardboard corners. Wrap in bubble wrap & packing paper.',
  'Painting': 'Use picture boxes or cardboard corners. Wrap in bubble wrap & packing paper.',
  'Floor Lamp': 'Disassemble shade. Wrap base in blanket. Transport upright.',
  'Mirror': 'Use mirror box with cardboard corners. Mark "FRAGILE" and "THIS SIDE UP".',
  'Crockery': 'Wrap each piece individually in paper. Stand plates vertically. Fill gaps with paper.',
  'Aquarium': 'Drain completely. Remove accessories. Transport tank empty in original box.',
  'Guitar': 'Store in hard case. Loosen strings slightly. Pad inside case with soft material.',
  'Plant': 'Water 2 days before. Place in open box. Avoid direct sun during transit.',
  'Glass': 'Double-wrap in bubble wrap. Use cell dividers in box. Fill all gaps.',
  'Desktop Computer': 'Remove GPU if large. Use anti-static bags. Transport in original box if possible.',
  'Printer': 'Remove ink cartridges. Secure moving parts with tape. Wrap in bubble wrap.',
  'Sound Bar': 'Wrap in bubble wrap. Transport in original box if available.',
}

function getHandlingTip(itemName: string): string {
  for (const [key, tip] of Object.entries(handlingTips)) {
    if (itemName.toLowerCase().includes(key.toLowerCase())) return tip
  }
  return 'Wrap in bubble wrap. Use packing paper for extra protection. Mark box as FRAGILE.'
}

export default function FragileItems() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]

  const fragileItems = latest?.rooms.flatMap(r =>
    r.items.filter(i => i.category === 'Fragile' || i.category === 'Electronics')
      .map(i => ({ ...i, roomName: r.name }))
  ) || []

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#EF4444] to-[#F87171] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-red-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><AlertTriangle size={22} /> Fragile Items</h1>
        <p className="text-red-100 text-sm mt-1">{fragileItems.length} items need special handling</p>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {fragileItems.length === 0 ? (
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">No fragile items detected yet</p>
            <p className="text-gray-300 text-xs mt-1">Scan your rooms to identify fragile items</p>
          </div>
        ) : fragileItems.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-400">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">{item.category}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">📍 {item.roomName} · {item.weight_kg}kg</p>
                <div className="mt-2 bg-red-50 rounded-lg p-2.5">
                  <p className="text-[10px] font-semibold text-red-700 mb-0.5">📋 Handling Instructions</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{getHandlingTip(item.name)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="bg-red-50 rounded-xl p-4 border border-red-100 mt-4">
          <p className="text-xs font-semibold text-red-700 mb-2">🛡️ General Fragile Packing Rules</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Always use "FRAGILE" and "THIS SIDE UP" labels</li>
            <li>• Double-box high-value items</li>
            <li>• Fill ALL empty space in boxes to prevent shifting</li>
            <li>• Load fragile boxes last, unload first</li>
            <li>• Never stack heavy items on fragile boxes</li>
            <li>• Take photos before packing for insurance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
