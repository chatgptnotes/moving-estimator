import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useEstimates, useSettings } from '../../store/useStore'
import { formatCurrency } from '../../services/costCalculator'

const months = [
  { name: 'Jan', multiplier: 0.80, demand: 'Low', color: '#22C55E' },
  { name: 'Feb', multiplier: 0.82, demand: 'Low', color: '#22C55E' },
  { name: 'Mar', multiplier: 0.90, demand: 'Medium', color: '#F59E0B' },
  { name: 'Apr', multiplier: 0.95, demand: 'Medium', color: '#F59E0B' },
  { name: 'May', multiplier: 1.10, demand: 'High', color: '#EF4444' },
  { name: 'Jun', multiplier: 1.25, demand: 'Peak', color: '#DC2626' },
  { name: 'Jul', multiplier: 1.30, demand: 'Peak', color: '#DC2626' },
  { name: 'Aug', multiplier: 1.20, demand: 'High', color: '#EF4444' },
  { name: 'Sep', multiplier: 1.00, demand: 'Medium', color: '#F59E0B' },
  { name: 'Oct', multiplier: 0.88, demand: 'Low', color: '#22C55E' },
  { name: 'Nov', multiplier: 0.82, demand: 'Low', color: '#22C55E' },
  { name: 'Dec', multiplier: 0.78, demand: 'Lowest', color: '#16A34A' },
]

export default function SeasonalPricing() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const { settings } = useSettings()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]
  const baseCost = latest?.cost_mid || 15000
  const currentMonth = new Date().getMonth()

  const maxMultiplier = Math.max(...months.map(m => m.multiplier))

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-amber-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><TrendingUp size={22} /> Seasonal Pricing</h1>
        <p className="text-amber-100 text-sm mt-1">Best months to save on your move</p>
      </div>

      <div className="px-5 mt-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Price by Month</p>
          <div className="flex items-end gap-1.5 h-40">
            {months.map((m, i) => {
              const height = (m.multiplier / maxMultiplier) * 100
              const isCurrent = i === currentMonth
              return (
                <div key={m.name} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] text-gray-400 font-medium">{Math.round(m.multiplier * 100)}%</span>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`w-full rounded-t-md ${isCurrent ? 'ring-2 ring-[#1E3A5F]' : ''}`}
                    style={{ backgroundColor: m.color + '40', borderBottom: `3px solid ${m.color}` }} />
                  <span className={`text-[9px] font-medium ${isCurrent ? 'text-[#1E3A5F] font-bold' : 'text-gray-400'}`}>{m.name}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Your Estimated Cost by Month</p>
          <div className="space-y-2">
            {months.map((m, i) => {
              const cost = Math.round(baseCost * m.multiplier)
              const savings = baseCost - cost
              const isCurrent = i === currentMonth
              return (
                <div key={m.name} className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isCurrent ? 'bg-blue-50 border border-blue-200' : ''}`}>
                  <span className="text-xs font-medium text-gray-500 w-8">{m.name}</span>
                  <div className="flex-1">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(m.multiplier / maxMultiplier) * 100}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-20 text-right">{formatCurrency(cost, settings.currency)}</span>
                  <span className={`text-[10px] w-16 text-right font-medium ${savings > 0 ? 'text-green-600' : savings < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {savings > 0 ? `Save ${formatCurrency(savings, settings.currency)}` : savings < 0 ? `+${formatCurrency(-savings, settings.currency)}` : '—'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-xs font-semibold text-green-700 mb-1">💰 Money-Saving Tips</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Move mid-month and mid-week for lowest rates</li>
            <li>• Avoid first/last days of the month (lease cycles)</li>
            <li>• Winter moves (Oct-Feb) save 15-25%</li>
            <li>• Book 4-6 weeks ahead for best availability</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
