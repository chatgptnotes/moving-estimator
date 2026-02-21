import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEstimates } from '../../store/useStore'
import { Package } from 'lucide-react'

interface Supply { name: string; icon: string; quantity: number; unit: string; tip: string }

function calcSupplies(totalVolume: number, totalWeight: number, itemCount: number): Supply[] {
  const largeBoxes = Math.ceil(totalVolume * 0.15)
  const medBoxes = Math.ceil(totalVolume * 0.25)
  const smallBoxes = Math.ceil(totalVolume * 0.2)
  const wardrobeBoxes = Math.ceil(itemCount * 0.05)
  const tapeRolls = Math.ceil((largeBoxes + medBoxes + smallBoxes) / 8)
  const bubbleWrapRolls = Math.ceil(itemCount * 0.15)
  const packingPaper = Math.ceil(itemCount * 0.8)
  const markers = Math.max(2, Math.ceil((largeBoxes + medBoxes + smallBoxes) / 20))
  const stretchWrap = Math.ceil(totalVolume / 200)
  const furniturePads = Math.ceil(totalWeight / 150)

  return [
    { name: 'Large Boxes (4.5 cuft)', icon: '📦', quantity: largeBoxes, unit: 'boxes', tip: 'For pillows, bedding, lampshades' },
    { name: 'Medium Boxes (3 cuft)', icon: '📦', quantity: medBoxes, unit: 'boxes', tip: 'For kitchenware, toys, clothes' },
    { name: 'Small Boxes (1.5 cuft)', icon: '📦', quantity: smallBoxes, unit: 'boxes', tip: 'For books, heavy items, fragile' },
    { name: 'Wardrobe Boxes', icon: '👔', quantity: wardrobeBoxes, unit: 'boxes', tip: 'Hang clothes directly inside' },
    { name: 'Packing Tape', icon: '🔖', quantity: tapeRolls, unit: 'rolls', tip: '2" wide, heavy duty' },
    { name: 'Bubble Wrap', icon: '🫧', quantity: bubbleWrapRolls, unit: 'rolls', tip: 'For fragile items & electronics' },
    { name: 'Packing Paper', icon: '📰', quantity: packingPaper, unit: 'sheets', tip: 'Wrap dishes & glassware' },
    { name: 'Markers', icon: '🖊️', quantity: markers, unit: 'pcs', tip: 'Label every box clearly' },
    { name: 'Stretch Wrap', icon: '🎞️', quantity: stretchWrap, unit: 'rolls', tip: 'Secure drawers & doors shut' },
    { name: 'Furniture Pads', icon: '🛡️', quantity: furniturePads, unit: 'pads', tip: 'Protect wood surfaces & corners' },
  ]
}

export default function PackingCalculator() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]
  const supplies = latest ? calcSupplies(latest.total_volume, latest.total_weight, latest.rooms.reduce((s, r) => s + r.item_count, 0)) : calcSupplies(300, 800, 40)

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-blue-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Package size={22} /> Packing Supplies</h1>
        <p className="text-blue-200 text-sm mt-1">{latest ? `Based on ${latest.total_volume} cuft estimate` : 'Sample calculation'}</p>
      </div>

      <div className="px-5 mt-4 space-y-2">
        {supplies.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{s.name}</p>
              <p className="text-[10px] text-gray-400">{s.tip}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#FF6B35]">{s.quantity}</p>
              <p className="text-[10px] text-gray-400">{s.unit}</p>
            </div>
          </motion.div>
        ))}

        <div className="bg-orange-50 rounded-xl p-4 mt-4 border border-orange-100">
          <p className="text-xs font-semibold text-[#FF6B35] mb-1">💡 Pro Tip</p>
          <p className="text-[11px] text-gray-600">Order 10-15% extra supplies. It's cheaper than making a last-minute run. Most box suppliers accept returns of unused boxes.</p>
        </div>
      </div>
    </div>
  )
}
