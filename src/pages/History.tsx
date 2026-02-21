import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Box, ChevronRight } from 'lucide-react'
import { useEstimates } from '../store/useStore'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-500',
  scanning: 'bg-blue-100 text-blue-600',
  analyzing: 'bg-yellow-100 text-yellow-600',
  ready: 'bg-green-100 text-green-600',
  shared: 'bg-purple-100 text-purple-600',
}

export default function History() {
  const nav = useNavigate()
  const { estimates, deleteEstimate } = useEstimates()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Estimate History</h1>
        <p className="text-blue-200 text-sm">{estimates.length} estimate{estimates.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="px-5 mt-4 space-y-2 pb-28">
        {estimates.length === 0 && (
          <div className="text-center py-16">
            <Box size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">No estimates yet</p>
            <button onClick={() => nav('/new-move')} className="mt-4 text-[#FF6B35] font-medium text-sm">Create your first estimate →</button>
          </div>
        )}
        {estimates.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center">
              <Box size={18} className="text-[#1E3A5F]" />
            </div>
            <button onClick={() => nav(`/estimate/${e.id}`)} className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium truncate">{e.from_city || 'Draft'} → {e.to_city || '...'}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[e.status] || statusColors.draft}`}>{e.status}</span>
                <span className="text-[10px] text-gray-400">{new Date(e.created_at).toLocaleDateString()}</span>
              </div>
            </button>
            <div className="text-right mr-2">
              <p className="text-sm font-bold text-[#1E3A5F]">{Math.round(e.total_volume)} cuft</p>
              <p className="text-[10px] text-gray-400">{e.rooms?.length || 0} rooms</p>
            </div>
            <button onClick={() => deleteEstimate(e.id)} className="p-2 text-gray-300 hover:text-red-400"><Trash2 size={16} /></button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
