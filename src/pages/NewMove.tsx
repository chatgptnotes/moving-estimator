import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Building2, Calendar, ArrowRight } from 'lucide-react'
import { useEstimates } from '../store/useStore'
import { MoveEstimate, Room, RoomType } from '../types'

const roomTypes: { type: RoomType; label: string; icon: string }[] = [
  { type: 'living_room', label: 'Living Room', icon: '🛋️' },
  { type: 'master_bedroom', label: 'Master Bedroom', icon: '🛏️' },
  { type: 'bedroom_2', label: 'Bedroom 2', icon: '🛏️' },
  { type: 'bedroom_3', label: 'Bedroom 3', icon: '🛏️' },
  { type: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { type: 'bathroom', label: 'Bathroom', icon: '🚿' },
  { type: 'dining', label: 'Dining Room', icon: '🍽️' },
  { type: 'office', label: 'Office', icon: '💼' },
  { type: 'garage', label: 'Garage', icon: '🚗' },
  { type: 'storage', label: 'Storage', icon: '📦' },
  { type: 'balcony', label: 'Balcony', icon: '🌿' },
  { type: 'other', label: 'Other', icon: '🏠' },
]

const Input = ({ label, icon: Icon, ...props }: any) => (
  <div>
    <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
      <input {...props} className={`w-full bg-white border border-gray-200 rounded-xl py-3 ${Icon ? 'pl-9' : 'pl-3'} pr-3 text-sm focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] outline-none`} />
    </div>
  </div>
)

export default function NewMove() {
  const nav = useNavigate()
  const { addEstimate } = useEstimates()
  const [selectedRooms, setSelectedRooms] = useState<RoomType[]>(['living_room', 'master_bedroom', 'kitchen'])
  const [form, setForm] = useState({
    from_address: '', from_city: '', from_floor: 0, from_elevator: false,
    to_address: '', to_city: '', to_floor: 0, to_elevator: false,
    move_type: 'local' as 'local' | 'interstate' | 'international',
    move_date: '',
  })

  const toggleRoom = (type: RoomType) => {
    setSelectedRooms(prev => prev.includes(type) ? prev.filter(r => r !== type) : [...prev, type])
  }

  const handleStart = () => {
    const id = Math.random().toString(36).substring(2, 10)
    const rooms: Room[] = selectedRooms.map((type, i) => ({
      id: `r${id}${i}`,
      estimate_id: id,
      name: roomTypes.find(r => r.type === type)!.label,
      type,
      total_volume: 0,
      total_weight: 0,
      item_count: 0,
      items: [],
      scanned: false,
    }))

    const estimate: MoveEstimate = {
      id,
      ...form,
      total_volume: 0,
      total_weight: 0,
      recommended_vehicle: '',
      cost_low: 0, cost_mid: 0, cost_high: 0,
      currency: 'INR',
      status: 'scanning',
      created_at: new Date().toISOString(),
      rooms,
    }
    addEstimate(estimate)
    nav(`/scan/${id}`)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">New Move</h1>
        <p className="text-blue-200 text-sm">Set up your move details</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-5 mt-6 space-y-6 pb-28">
        {/* From */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#1E3A5F] uppercase flex items-center gap-1"><MapPin size={14} /> Moving From</h3>
          <Input label="Address" icon={Building2} placeholder="Street address" value={form.from_address} onChange={(e: any) => setForm(f => ({ ...f, from_address: e.target.value }))} />
          <Input label="City" placeholder="City" value={form.from_city} onChange={(e: any) => setForm(f => ({ ...f, from_city: e.target.value }))} />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Floor</label>
              <select value={form.from_floor} onChange={e => setForm(f => ({ ...f, from_floor: +e.target.value }))} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-3 text-sm">
                {[...Array(21)].map((_, i) => <option key={i} value={i}>{i === 0 ? 'Ground' : `Floor ${i}`}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-end">
              <label className="flex items-center gap-2 py-3 cursor-pointer">
                <input type="checkbox" checked={form.from_elevator} onChange={e => setForm(f => ({ ...f, from_elevator: e.target.checked }))} className="w-5 h-5 rounded accent-[#FF6B35]" />
                <span className="text-sm text-gray-700">Elevator</span>
              </label>
            </div>
          </div>
        </div>

        {/* To */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#FF6B35] uppercase flex items-center gap-1"><MapPin size={14} /> Moving To</h3>
          <Input label="Address" icon={Building2} placeholder="Street address" value={form.to_address} onChange={(e: any) => setForm(f => ({ ...f, to_address: e.target.value }))} />
          <Input label="City" placeholder="City" value={form.to_city} onChange={(e: any) => setForm(f => ({ ...f, to_city: e.target.value }))} />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Floor</label>
              <select value={form.to_floor} onChange={e => setForm(f => ({ ...f, to_floor: +e.target.value }))} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-3 text-sm">
                {[...Array(21)].map((_, i) => <option key={i} value={i}>{i === 0 ? 'Ground' : `Floor ${i}`}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-end">
              <label className="flex items-center gap-2 py-3 cursor-pointer">
                <input type="checkbox" checked={form.to_elevator} onChange={e => setForm(f => ({ ...f, to_elevator: e.target.checked }))} className="w-5 h-5 rounded accent-[#FF6B35]" />
                <span className="text-sm text-gray-700">Elevator</span>
              </label>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Calendar size={14} /> Move Details</h3>
          <Input label="Move Date" type="date" value={form.move_date} onChange={(e: any) => setForm(f => ({ ...f, move_date: e.target.value }))} />
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Move Type</label>
            <div className="flex gap-2">
              {(['local', 'interstate', 'international'] as const).map(t => (
                <button key={t} onClick={() => setForm(f => ({ ...f, move_type: t }))}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${form.move_type === t ? 'bg-[#1E3A5F] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Select Rooms to Scan</h3>
          <div className="grid grid-cols-3 gap-2">
            {roomTypes.map(r => (
              <button key={r.type} onClick={() => toggleRoom(r.type)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all ${selectedRooms.includes(r.type) ? 'bg-[#FF6B35]/10 border-2 border-[#FF6B35]' : 'bg-gray-50 border-2 border-transparent'}`}>
                <span className="text-xl">{r.icon}</span>
                <span className="text-[10px] font-medium text-gray-700 leading-tight">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button onClick={handleStart} disabled={selectedRooms.length === 0}
          className="w-full bg-[#FF6B35] hover:bg-[#e55a28] disabled:opacity-40 text-white font-semibold py-4 rounded-2xl text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
          Start Scanning ({selectedRooms.length} rooms) <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  )
}
