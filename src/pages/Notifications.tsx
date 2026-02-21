import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, CheckCircle2, Truck, DollarSign, Calendar, Trash2, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Notification {
  id: string; type: string; title: string; message: string; read: boolean; created_at: string
}

const typeIcons: Record<string, any> = {
  estimate: CheckCircle2,
  quote: DollarSign,
  reminder: Calendar,
  move: Truck,
}
const typeColors: Record<string, string> = {
  estimate: '#059669',
  quote: '#FF6B35',
  reminder: '#1E3A5F',
  move: '#7C3AED',
}

export default function Notifications() {
  const nav = useNavigate()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      setNotifications(data || [])
      setLoading(false)
    })
  }, [user])

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  }

  const markAllRead = async () => {
    if (!user) return
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id)
    setNotifications(n => n.map(x => ({ ...x, read: true })))
  }

  const deleteNotif = async (id: string) => {
    await supabase.from('notifications').delete().eq('id', id)
    setNotifications(n => n.filter(x => x.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Show mock notifications if empty
  const displayNotifs = notifications.length > 0 ? notifications : [
    { id: '1', type: 'estimate', title: 'Estimate Complete', message: 'Your Mumbai → Pune estimate is ready with 45 items detected.', read: false, created_at: new Date().toISOString() },
    { id: '2', type: 'quote', title: 'New Quote Received', message: 'Swift Movers sent you a quote of ₹12,500 for your upcoming move.', read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', type: 'reminder', title: 'Move Reminder', message: 'Your move is scheduled in 3 days. Don\'t forget to confirm with your mover!', read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
            <h1 className="text-lg font-bold">Notifications</h1>
            {unreadCount > 0 && <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <button onClick={markAllRead} className="text-blue-200 text-xs">Mark all read</button>
        </div>
      </div>

      <div className="px-6 mt-4 space-y-2">
        {displayNotifs.map((n, i) => {
          const Icon = typeIcons[n.type] || Bell
          const color = typeColors[n.type] || '#6B7280'
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => markRead(n.id)}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 ${!n.read ? 'border-l-4' : ''}`}
              style={!n.read ? { borderLeftColor: color } : {}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '15' }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm ${!n.read ? 'font-bold' : 'font-medium'} text-gray-900`}>{n.title}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); deleteNotif(n.id) }} className="text-gray-300 hover:text-red-400 self-start">
                <Trash2 size={14} />
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
