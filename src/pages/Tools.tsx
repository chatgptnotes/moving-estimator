import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ClipboardList, Shield, BarChart3, QrCode, AlertTriangle, TrendingUp, MapPin, Truck, Users, Mic, CheckSquare, Lightbulb, Wrench, FileText, Calendar } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const tools = [
  { path: '/tools/packing', icon: Package, title: 'Packing Calculator', desc: 'Boxes, tape & supplies needed', color: '#FF6B35', bg: 'bg-orange-50' },
  { path: '/tools/checklist', icon: ClipboardList, title: 'Moving Checklist', desc: '8-week countdown timeline', color: '#1E3A5F', bg: 'bg-blue-50' },
  { path: '/tools/insurance', icon: Shield, title: 'Insurance Estimator', desc: 'Coverage recommendations', color: '#059669', bg: 'bg-green-50' },
  { path: '/tools/quotes', icon: BarChart3, title: 'Compare Quotes', desc: 'Side-by-side mover quotes', color: '#7C3AED', bg: 'bg-purple-50' },
  { path: '/tools/labels', icon: QrCode, title: 'Box Labels & QR', desc: 'Printable labels for each box', color: '#0EA5E9', bg: 'bg-sky-50' },
  { path: '/tools/fragile', icon: AlertTriangle, title: 'Fragile Items', desc: 'Special handling alerts', color: '#EF4444', bg: 'bg-red-50' },
  { path: '/tools/seasonal', icon: TrendingUp, title: 'Seasonal Pricing', desc: 'Best time to move', color: '#F59E0B', bg: 'bg-amber-50' },
  { path: '/tools/weight', icon: Truck, title: 'Weight Distribution', desc: 'Optimal truck loading guide', color: '#6366F1', bg: 'bg-indigo-50' },
  { path: '/tools/utilities', icon: Lightbulb, title: 'Utility Setup', desc: 'Connection reminders', color: '#10B981', bg: 'bg-emerald-50' },
  { path: '/tools/progress', icon: CheckSquare, title: 'Moving Day Tracker', desc: 'Track loading progress', color: '#EC4899', bg: 'bg-pink-50' },
  { path: '/tools/disassembly', icon: Wrench, title: 'Disassembly Notes', desc: 'What needs taken apart', color: '#78716C', bg: 'bg-stone-50' },
  { path: '/tools/pets', icon: '🐾' as any, title: 'Pet & Plant Tips', desc: 'Safe transport guide', color: '#84CC16', bg: 'bg-lime-50' },
  { path: '/tools/export', icon: FileText, title: 'Export to Movers', desc: 'Professional PDF inventory', color: '#1E3A5F', bg: 'bg-blue-50' },
  { path: '/tools/shared', icon: Users, title: 'Shared Estimate', desc: 'Collaborate with family', color: '#8B5CF6', bg: 'bg-violet-50' },
  { path: '/tools/voice', icon: Mic, title: 'Voice Notes', desc: 'Record room reminders', color: '#F97316', bg: 'bg-orange-50' },
]

export default function Tools() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Moving Tools</h1>
        <p className="text-blue-200 text-sm">Everything you need for a perfect move</p>
      </div>

      <div className="px-5 mt-4 space-y-2">
        {tools.map((t, i) => (
          <motion.button key={t.path} initial="hidden" animate="visible" custom={i} variants={fadeUp}
            onClick={() => nav(t.path)}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 active:scale-[0.98] transition-transform text-left">
            <div className={`w-11 h-11 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0`}>
              {typeof t.icon === 'string' ? (
                <span className="text-xl">{t.icon}</span>
              ) : (
                <t.icon size={20} style={{ color: t.color }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{t.title}</p>
              <p className="text-[11px] text-gray-400">{t.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
