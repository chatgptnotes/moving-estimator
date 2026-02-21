import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useEstimates } from '../../store/useStore'

export default function WeightDistribution() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]

  const allItems = latest?.rooms.flatMap(r => r.items.map(i => ({ ...i, roomName: r.name }))) || []
  const sorted = [...allItems].sort((a, b) => b.weight_kg - a.weight_kg)

  const heavy = sorted.filter(i => i.weight_kg >= 30)
  const medium = sorted.filter(i => i.weight_kg >= 10 && i.weight_kg < 30)
  const light = sorted.filter(i => i.weight_kg < 10)

  const zones = [
    { name: 'Floor / Back Wall', desc: 'Heavy items first, against the truck wall', items: heavy, color: '#1E3A5F', bg: 'bg-blue-50', icon: '🔵', position: 'Bottom layer, back of truck' },
    { name: 'Middle Layer', desc: 'Medium weight items stacked on heavy base', items: medium, color: '#FF6B35', bg: 'bg-orange-50', icon: '🟠', position: 'Stack on heavy items' },
    { name: 'Top / Front', desc: 'Light & fragile items on top, load last', items: light, color: '#22C55E', bg: 'bg-green-50', icon: '🟢', position: 'Last in, first out' },
  ]

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#6366F1] to-[#818CF8] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-indigo-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Truck size={22} /> Loading Guide</h1>
        <p className="text-indigo-200 text-sm mt-1">Optimal weight distribution for your truck</p>
      </div>

      <div className="px-5 mt-4 space-y-4">
        {/* Visual truck */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Truck Loading Order</p>
          <div className="relative bg-gray-100 rounded-xl p-3 space-y-1.5">
            {/* Truck shape */}
            <div className="bg-[#1E3A5F]/10 rounded-lg p-3 border-2 border-dashed border-[#1E3A5F]/30">
              <div className="flex items-center gap-2">
                <span>🔵</span>
                <div>
                  <p className="text-xs font-bold text-[#1E3A5F]">HEAVY — Load First (Back)</p>
                  <p className="text-[10px] text-gray-500">{heavy.length} items · {heavy.reduce((s, i) => s + i.weight_kg, 0)}kg</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FF6B35]/10 rounded-lg p-3 border-2 border-dashed border-[#FF6B35]/30">
              <div className="flex items-center gap-2">
                <span>🟠</span>
                <div>
                  <p className="text-xs font-bold text-[#FF6B35]">MEDIUM — Load Second</p>
                  <p className="text-[10px] text-gray-500">{medium.length} items · {medium.reduce((s, i) => s + i.weight_kg, 0)}kg</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3 border-2 border-dashed border-green-500/30">
              <div className="flex items-center gap-2">
                <span>🟢</span>
                <div>
                  <p className="text-xs font-bold text-green-700">LIGHT — Load Last (Front)</p>
                  <p className="text-[10px] text-gray-500">{light.length} items · {light.reduce((s, i) => s + i.weight_kg, 0)}kg</p>
                </div>
              </div>
            </div>
            <div className="text-center text-[10px] text-gray-400 mt-1">⬆️ BACK OF TRUCK — ⬇️ NEAR DOOR</div>
          </div>
        </motion.div>

        {/* Item lists per zone */}
        {zones.map((zone, zi) => (
          <div key={zone.name}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <span>{zone.icon}</span> {zone.name}
              <span className="text-[10px] font-normal text-gray-400">({zone.items.length} items)</span>
            </h2>
            <div className="space-y-1.5">
              {zone.items.slice(0, 10).map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: zi * 0.1 + i * 0.03 }}
                  className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 border border-gray-100">
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">{item.roomName}</p>
                  </div>
                  <span className="text-xs font-bold" style={{ color: zone.color }}>{item.weight_kg}kg</span>
                </motion.div>
              ))}
              {zone.items.length > 10 && (
                <p className="text-[10px] text-gray-400 text-center">+{zone.items.length - 10} more items</p>
              )}
            </div>
          </div>
        ))}

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-700 mb-1">🚛 Loading Tips</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Distribute weight evenly side-to-side</li>
            <li>• Heaviest items on the floor, against walls</li>
            <li>• Mattresses can act as padding against walls</li>
            <li>• Fill gaps with soft items (pillows, blankets)</li>
            <li>• Secure everything with straps before driving</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
