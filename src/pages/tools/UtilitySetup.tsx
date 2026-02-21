import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lightbulb, CheckCircle2, Circle } from 'lucide-react'

interface Utility { id: string; name: string; icon: string; desc: string; when: string; done: boolean }

const initialUtilities: Utility[] = [
  { id: 'u1', name: 'Electricity', icon: '⚡', desc: 'Schedule disconnection at old address & connection at new', when: '2 weeks before', done: false },
  { id: 'u2', name: 'Gas / LPG', icon: '🔥', desc: 'Transfer gas connection or arrange new cylinder', when: '2 weeks before', done: false },
  { id: 'u3', name: 'Water', icon: '💧', desc: 'Notify water authority of move date', when: '2 weeks before', done: false },
  { id: 'u4', name: 'Internet / WiFi', icon: '📡', desc: 'Schedule new connection (may need 3-7 days)', when: '3 weeks before', done: false },
  { id: 'u5', name: 'Cable / DTH TV', icon: '📺', desc: 'Transfer or cancel TV subscription', when: '1 week before', done: false },
  { id: 'u6', name: 'Mobile / Phone', icon: '📱', desc: 'Update address with carrier', when: '1 week before', done: false },
  { id: 'u7', name: 'Home Insurance', icon: '🏠', desc: 'Update policy with new address', when: '1 week before', done: false },
  { id: 'u8', name: 'Vehicle Registration', icon: '🚗', desc: 'Update address on RC if moving states', when: 'After move', done: false },
  { id: 'u9', name: 'Bank / Financial', icon: '🏦', desc: 'Update address for all bank accounts & cards', when: 'After move', done: false },
  { id: 'u10', name: 'Voter ID / Aadhaar', icon: '🪪', desc: 'Update government ID address', when: 'After move', done: false },
  { id: 'u11', name: 'Mail Forwarding', icon: '📮', desc: 'Set up mail redirect from old address', when: '1 week before', done: false },
  { id: 'u12', name: 'Gym / Subscriptions', icon: '💪', desc: 'Cancel or transfer memberships', when: '2 weeks before', done: false },
]

const STORAGE_KEY = 'me_utilities'

export default function UtilitySetup() {
  const nav = useNavigate()
  const [utilities, setUtilities] = useState<Utility[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : initialUtilities } catch { return initialUtilities }
  })

  const toggle = (id: string) => {
    const updated = utilities.map(u => u.id === id ? { ...u, done: !u.done } : u)
    setUtilities(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const done = utilities.filter(u => u.done).length

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#10B981] to-[#34D399] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-emerald-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Lightbulb size={22} /> Utility Setup</h1>
        <p className="text-emerald-100 text-sm mt-1">{done}/{utilities.length} connections handled</p>
      </div>

      <div className="px-5 mt-4 space-y-2">
        {utilities.map((u, i) => (
          <motion.button key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => toggle(u.id)}
            className={`w-full bg-white rounded-xl p-4 shadow-sm flex items-start gap-3 text-left transition-all ${u.done ? 'opacity-60' : ''}`}>
            {u.done ? <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" /> : <Circle size={20} className="text-gray-300 mt-0.5 flex-shrink-0" />}
            <span className="text-xl">{u.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${u.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>{u.name}</p>
              <p className="text-[11px] text-gray-400">{u.desc}</p>
              <span className="inline-block mt-1 text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{u.when}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
