import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckSquare, CheckCircle2, Circle, Truck } from 'lucide-react'
import { useEstimates } from '../../store/useStore'

const STORAGE_KEY = 'me_progress'

export default function ProgressTracker() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]
  const rooms = latest?.rooms || []

  const [cleared, setCleared] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : {} } catch { return {} }
  })

  const toggleRoom = (id: string) => {
    const updated = { ...cleared, [id]: !cleared[id] }
    setCleared(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const clearedCount = rooms.filter(r => cleared[r.id]).length
  const totalItems = rooms.reduce((s, r) => s + r.item_count, 0)
  const loadedItems = rooms.filter(r => cleared[r.id]).reduce((s, r) => s + r.item_count, 0)
  const progress = rooms.length > 0 ? Math.round((clearedCount / rooms.length) * 100) : 0

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#EC4899] to-[#F472B6] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-pink-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><CheckSquare size={22} /> Moving Day Tracker</h1>
        <p className="text-pink-100 text-sm mt-1">Track your loading progress</p>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-lg text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#EC4899" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${progress * 3.27} 327`} initial={{ strokeDasharray: '0 327' }} animate={{ strokeDasharray: `${progress * 3.27} 327` }}
                transition={{ duration: 1 }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-[#1E3A5F]">{progress}%</p>
              <p className="text-[10px] text-gray-400">Loaded</p>
            </div>
          </div>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-lg font-bold text-[#1E3A5F]">{clearedCount}/{rooms.length}</p>
              <p className="text-[10px] text-gray-400">Rooms</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#EC4899]">{loadedItems}/{totalItems}</p>
              <p className="text-[10px] text-gray-400">Items</p>
            </div>
          </div>
        </motion.div>

        {progress === 100 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <Truck size={32} className="mx-auto text-green-600 mb-2" />
            <p className="text-sm font-bold text-green-700">🎉 All Loaded!</p>
            <p className="text-xs text-green-600">Time to hit the road!</p>
          </motion.div>
        )}

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Rooms</h2>
        {rooms.map((room, i) => (
          <motion.button key={room.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => toggleRoom(room.id)}
            className={`w-full bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 text-left transition-all ${cleared[room.id] ? 'bg-green-50 border-2 border-green-200' : 'border border-gray-100'}`}>
            {cleared[room.id] ? <CheckCircle2 size={22} className="text-green-500" /> : <Circle size={22} className="text-gray-300" />}
            <span className="text-xl">{room.type === 'living_room' ? '🛋️' : room.type.startsWith('bedroom') || room.type === 'master_bedroom' ? '🛏️' : room.type === 'kitchen' ? '🍳' : '📦'}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${cleared[room.id] ? 'text-green-700 line-through' : 'text-gray-900'}`}>{room.name}</p>
              <p className="text-[10px] text-gray-400">{room.item_count} items · {Math.round(room.total_volume)} cuft · {room.total_weight}kg</p>
            </div>
          </motion.button>
        ))}

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Scan rooms first to track progress</p>
          </div>
        )}
      </div>
    </div>
  )
}
