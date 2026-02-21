import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useEstimates, useSettings } from '../../store/useStore'
import { formatCurrency } from '../../services/costCalculator'

const coverageTiers = [
  { name: 'Basic', desc: 'Released Value (₹0.60/lb)', multiplier: 0.005, color: '#6B7280' },
  { name: 'Standard', desc: 'Full Value Protection', multiplier: 0.015, color: '#1E3A5F' },
  { name: 'Premium', desc: 'Full Replacement + Fragile', multiplier: 0.03, color: '#FF6B35' },
]

export default function InsuranceEstimator() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const { settings } = useSettings()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]
  const [selected, setSelected] = useState(1)

  const totalWeight = latest?.total_weight || 500
  const estimatedValue = totalWeight * 150
  const fragileCount = latest?.rooms.reduce((s, r) => s + r.items.filter(i => i.category === 'Fragile').length, 0) || 5
  const electronicsCount = latest?.rooms.reduce((s, r) => s + r.items.filter(i => i.category === 'Electronics').length, 0) || 3

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#059669] to-[#10B981] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-green-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Shield size={22} /> Insurance Estimator</h1>
        <p className="text-green-100 text-sm mt-1">Protect your belongings during transit</p>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-lg">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Estimated Household Value</p>
          <p className="text-3xl font-bold text-[#1E3A5F]">{formatCurrency(estimatedValue, settings.currency)}</p>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span>⚠️ {fragileCount} fragile items</span>
            <span>💻 {electronicsCount} electronics</span>
          </div>
        </motion.div>

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Coverage Options</h2>
        {coverageTiers.map((tier, i) => {
          const premium = Math.round(estimatedValue * tier.multiplier)
          const coverage = tier.multiplier >= 0.015 ? estimatedValue : Math.round(totalWeight * 0.6 * 2.2)
          return (
            <motion.button key={tier.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className={`w-full bg-white rounded-xl p-4 shadow-sm text-left transition-all ${selected === i ? 'ring-2 shadow-md' : 'border border-gray-100'}`}
              style={{ borderColor: selected === i ? tier.color : undefined, ringColor: tier.color }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold" style={{ color: tier.color }}>{tier.name}</p>
                    {i === 1 && <span className="text-[9px] bg-[#1E3A5F] text-white px-1.5 py-0.5 rounded-full">RECOMMENDED</span>}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{tier.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: tier.color }}>{formatCurrency(premium, settings.currency)}</p>
                  <p className="text-[10px] text-gray-400">premium</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                <span className="text-gray-500">Coverage up to</span>
                <span className="font-semibold text-gray-700">{formatCurrency(coverage, settings.currency)}</span>
              </div>
            </motion.button>
          )
        })}

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs font-semibold text-[#1E3A5F] mb-1">📋 What's Covered</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Damage during loading/unloading</li>
            <li>• Transit damage from accidents</li>
            <li>• Loss or theft during move</li>
            {selected >= 1 && <li>• Full replacement value (not depreciated)</li>}
            {selected >= 2 && <li>• Special handling for fragile & high-value items</li>}
            {selected >= 2 && <li>• Electronics coverage with no deductible</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
