import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Star, Phone, Globe, Check } from 'lucide-react'
import { useEstimates, useSettings } from '../../store/useStore'
import { formatCurrency } from '../../services/costCalculator'

interface MoverQuote {
  name: string; rating: number; reviews: number; price: number; insurance: boolean
  packing: boolean; storage: boolean; eta: string; badge?: string
}

export default function QuoteComparison() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const { settings } = useSettings()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]
  const baseCost = latest?.cost_mid || 15000

  const quotes: MoverQuote[] = [
    { name: 'SafeMove Express', rating: 4.8, reviews: 342, price: Math.round(baseCost * 0.9), insurance: true, packing: true, storage: true, eta: '1 day', badge: 'Best Value' },
    { name: 'SwiftShift Movers', rating: 4.6, reviews: 218, price: Math.round(baseCost * 0.85), insurance: true, packing: false, storage: false, eta: '1-2 days' },
    { name: 'HomeGuard Relocations', rating: 4.9, reviews: 567, price: Math.round(baseCost * 1.1), insurance: true, packing: true, storage: true, eta: '1 day', badge: 'Top Rated' },
    { name: 'Budget Movers Co', rating: 4.2, reviews: 89, price: Math.round(baseCost * 0.7), insurance: false, packing: false, storage: false, eta: '2-3 days' },
    { name: 'Premium Relocations', rating: 4.7, reviews: 445, price: Math.round(baseCost * 1.3), insurance: true, packing: true, storage: true, eta: 'Same day', badge: 'Premium' },
  ]

  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-purple-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><BarChart3 size={22} /> Compare Quotes</h1>
        <p className="text-purple-200 text-sm mt-1">Side-by-side mover comparison</p>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {quotes.map((q, i) => (
          <motion.button key={q.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`w-full bg-white rounded-xl p-4 shadow-sm text-left transition-all ${selected === i ? 'ring-2 ring-purple-500 shadow-md' : 'border border-gray-100'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{q.name}</p>
                  {q.badge && <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">{q.badge}</span>}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, j) => <Star key={j} size={10} className={j < Math.floor(q.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                  <span className="text-[10px] text-gray-400 ml-1">{q.rating} ({q.reviews})</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#7C3AED]">{formatCurrency(q.price, settings.currency)}</p>
                <p className="text-[10px] text-gray-400">ETA: {q.eta}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
              {[
                { label: 'Insurance', ok: q.insurance },
                { label: 'Packing', ok: q.packing },
                { label: 'Storage', ok: q.storage },
              ].map(f => (
                <span key={f.label} className={`text-[10px] flex items-center gap-0.5 ${f.ok ? 'text-green-600' : 'text-gray-300'}`}>
                  <Check size={10} /> {f.label}
                </span>
              ))}
            </div>
            {selected === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                <button className="flex-1 bg-[#7C3AED] text-white py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                  <Phone size={12} /> Call
                </button>
                <button className="flex-1 bg-green-500 text-white py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                  <Globe size={12} /> Website
                </button>
              </motion.div>
            )}
          </motion.button>
        ))}

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <p className="text-xs font-semibold text-purple-700 mb-1">💡 Tip</p>
          <p className="text-[11px] text-gray-600">Always get at least 3 quotes. Share your detailed AI inventory with movers for the most accurate pricing.</p>
        </div>
      </div>
    </div>
  )
}
