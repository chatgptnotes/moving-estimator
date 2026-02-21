import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Truck, MapPin, Calendar, Phone, CheckCircle2, Clock, Shield } from 'lucide-react'

const mockCompanies = [
  { id: '1', name: 'Swift Movers', logo: '🚛', rating: 4.8, reviews: 234, price: 12500, available: '2 days', areas: 'Mumbai, Pune, Nashik', fleet: 25, verified: true },
  { id: '2', name: 'SafeShift Logistics', logo: '📦', rating: 4.6, reviews: 156, price: 14200, available: '3 days', areas: 'All India', fleet: 50, verified: true },
  { id: '3', name: 'QuickPack Movers', logo: '⚡', rating: 4.5, reviews: 89, price: 10800, available: 'Tomorrow', areas: 'Mumbai, Thane', fleet: 12, verified: false },
  { id: '4', name: 'Royal Relocations', logo: '👑', rating: 4.9, reviews: 312, price: 18500, available: '4 days', areas: 'Pan India + International', fleet: 100, verified: true },
  { id: '5', name: 'Budget Movers', logo: '💰', rating: 4.2, reviews: 67, price: 8900, available: 'Tomorrow', areas: 'Mumbai Local', fleet: 8, verified: false },
]

export default function Marketplace() {
  const nav = useNavigate()
  const [sort, setSort] = useState<'price' | 'rating' | 'speed'>('rating')
  const [selected, setSelected] = useState<string[]>([])

  const sorted = [...mockCompanies].sort((a, b) => {
    if (sort === 'price') return a.price - b.price
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">Get Quotes from Movers</h1>
        </div>
        <p className="text-blue-200 text-sm">Compare prices from verified moving companies</p>
      </div>

      <div className="px-6 mt-4">
        <div className="flex gap-2 mb-4">
          {(['rating', 'price', 'speed'] as const).map(s => (
            <button key={s} onClick={() => setSort(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${sort === s ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {s === 'rating' ? '⭐ Top Rated' : s === 'price' ? '💰 Lowest Price' : '⚡ Fastest'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {sorted.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${selected.includes(c.id) ? 'border-[#FF6B35]' : 'border-gray-100'}`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl">{c.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{c.name}</h3>
                    {c.verified && <Shield size={12} className="text-blue-500" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] font-semibold text-gray-700">{c.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">({c.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={10} />{c.areas}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><Truck size={10} />{c.fleet} vehicles</span>
                    <span className="flex items-center gap-1"><Clock size={10} />Available: {c.available}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-[#1E3A5F]">₹{c.price.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400">estimated</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setSelected(s => s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id])}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selected.includes(c.id) ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {selected.includes(c.id) ? <span className="flex items-center justify-center gap-1"><CheckCircle2 size={14} /> Selected</span> : 'Select'}
                </button>
                <button className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1E3A5F]/10 text-[#1E3A5F]">
                  <Phone size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-4 right-4 bg-[#FF6B35] text-white p-4 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-between z-50">
            <div>
              <p className="text-sm font-bold">{selected.length} mover{selected.length > 1 ? 's' : ''} selected</p>
              <p className="text-[11px] text-orange-100">Request quotes from selected movers</p>
            </div>
            <button className="bg-white text-[#FF6B35] font-bold px-5 py-2.5 rounded-xl text-sm">Get Quotes</button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
