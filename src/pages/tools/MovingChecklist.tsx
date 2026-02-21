import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, CheckCircle2, Circle } from 'lucide-react'

interface Task { id: string; text: string; done: boolean }
interface Week { week: number; title: string; tasks: Task[] }

const initialWeeks: Week[] = [
  { week: 8, title: 'Research & Plan', tasks: [
    { id: 'w8t1', text: 'Set moving budget', done: false },
    { id: 'w8t2', text: 'Research moving companies (get 3+ quotes)', done: false },
    { id: 'w8t3', text: 'Create home inventory with AI scanner', done: false },
    { id: 'w8t4', text: 'Declutter: donate, sell, or toss unused items', done: false },
    { id: 'w8t5', text: 'Start using up pantry food & freezer items', done: false },
  ]},
  { week: 6, title: 'Book & Notify', tasks: [
    { id: 'w6t1', text: 'Book moving company or truck rental', done: false },
    { id: 'w6t2', text: 'Notify landlord / start home sale process', done: false },
    { id: 'w6t3', text: 'Begin collecting packing supplies', done: false },
    { id: 'w6t4', text: 'Notify schools of transfer', done: false },
    { id: 'w6t5', text: 'Research new area (schools, doctors, vets)', done: false },
  ]},
  { week: 4, title: 'Start Packing', tasks: [
    { id: 'w4t1', text: 'Pack rarely used rooms (storage, guest room)', done: false },
    { id: 'w4t2', text: 'Label all boxes with room + contents', done: false },
    { id: 'w4t3', text: 'Photograph valuable items for insurance', done: false },
    { id: 'w4t4', text: 'Forward mail to new address', done: false },
    { id: 'w4t5', text: 'Transfer medical/dental/vet records', done: false },
    { id: 'w4t6', text: 'Arrange pet/plant transport', done: false },
  ]},
  { week: 2, title: 'Utilities & Details', tasks: [
    { id: 'w2t1', text: 'Schedule utility disconnection at old address', done: false },
    { id: 'w2t2', text: 'Schedule utility connection at new address', done: false },
    { id: 'w2t3', text: 'Update address: bank, insurance, subscriptions', done: false },
    { id: 'w2t4', text: 'Confirm moving company booking', done: false },
    { id: 'w2t5', text: 'Pack most rooms, leave essentials', done: false },
    { id: 'w2t6', text: 'Disassemble large furniture', done: false },
  ]},
  { week: 1, title: 'Final Prep', tasks: [
    { id: 'w1t1', text: 'Pack essentials box (toiletries, chargers, snacks)', done: false },
    { id: 'w1t2', text: 'Defrost refrigerator', done: false },
    { id: 'w1t3', text: 'Confirm elevator booking (if apartment)', done: false },
    { id: 'w1t4', text: 'Cash/tip for movers ready', done: false },
    { id: 'w1t5', text: 'Clean old home', done: false },
    { id: 'w1t6', text: 'Final walkthrough of old home', done: false },
  ]},
  { week: 0, title: 'Moving Day!', tasks: [
    { id: 'w0t1', text: 'Be present when movers arrive', done: false },
    { id: 'w0t2', text: 'Do final check of all rooms, closets, drawers', done: false },
    { id: 'w0t3', text: 'Check all items loaded on truck', done: false },
    { id: 'w0t4', text: 'Hand over keys', done: false },
    { id: 'w0t5', text: 'Supervise unloading at new home', done: false },
    { id: 'w0t6', text: 'Check inventory against delivery', done: false },
  ]},
]

const STORAGE_KEY = 'me_checklist'

export default function MovingChecklist() {
  const nav = useNavigate()
  const [weeks, setWeeks] = useState<Week[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : initialWeeks } catch { return initialWeeks }
  })

  const toggle = (weekIdx: number, taskId: string) => {
    const updated = weeks.map((w, i) => i === weekIdx ? { ...w, tasks: w.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) } : w)
    setWeeks(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const totalTasks = weeks.reduce((s, w) => s + w.tasks.length, 0)
  const doneTasks = weeks.reduce((s, w) => s + w.tasks.filter(t => t.done).length, 0)
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-blue-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><ClipboardList size={22} /> Moving Checklist</h1>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{doneTasks}/{totalTasks} tasks</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#FF6B35] rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-4">
        {weeks.map((w, wi) => {
          const weekDone = w.tasks.filter(t => t.done).length
          return (
            <div key={w.week} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#FF6B35]">{w.week > 0 ? `${w.week} Weeks Before` : '🎉 Moving Day'}</p>
                  <p className="text-sm font-semibold text-gray-900">{w.title}</p>
                </div>
                <span className="text-xs text-gray-400">{weekDone}/{w.tasks.length}</span>
              </div>
              <div className="p-2">
                {w.tasks.map(t => (
                  <button key={t.id} onClick={() => toggle(wi, t.id)}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    {t.done ? <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" /> : <Circle size={18} className="text-gray-300 flex-shrink-0" />}
                    <span className={`text-sm ${t.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
