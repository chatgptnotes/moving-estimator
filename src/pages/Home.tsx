import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanLine, BarChart3, Truck, ArrowRight } from 'lucide-react'
import { useEstimates } from '../store/useStore'

const steps = [
  { icon: ScanLine, title: 'Scan', desc: 'Record each room with your camera' },
  { icon: BarChart3, title: 'Analyze', desc: 'AI detects all furniture & items' },
  { icon: Truck, title: 'Get Quote', desc: 'Instant truck size & cost estimate' },
]

export default function Home() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const recent = estimates.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-1">Moving Estimator</h1>
          <p className="text-blue-200 text-sm mb-8">Scan your rooms. Get instant moving quotes.</p>
          <button onClick={() => nav('/new-move')} className="w-full bg-[#FF6B35] hover:bg-[#e55a28] text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <ScanLine size={22} /> Start New Estimate
          </button>
        </motion.div>
      </div>

      {/* How it works */}
      <div className="px-6 mt-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">How it works</h2>
        <div className="flex gap-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex-1 bg-white rounded-2xl p-4 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
                <s.icon size={18} className="text-[#1E3A5F]" />
              </div>
              <p className="text-xs font-semibold text-gray-800">{s.title}</p>
              <p className="text-[10px] text-gray-500 mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div className="px-6 mt-8 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Recent Estimates</h2>
            <button onClick={() => nav('/history')} className="text-[#FF6B35] text-xs font-medium flex items-center gap-1">View All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {recent.map(e => (
              <motion.div key={e.id} whileTap={{ scale: 0.98 }} onClick={() => nav(`/estimate/${e.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-800">{e.from_city || 'Draft'} → {e.to_city || '...'}</p>
                  <p className="text-xs text-gray-400">{new Date(e.created_at).toLocaleDateString()} · {e.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#1E3A5F]">{Math.round(e.total_volume)} cuft</p>
                  <p className="text-[10px] text-gray-400">{e.rooms?.length || 0} rooms</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
