import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ScanLine, Clock, Wrench, HelpCircle } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/new-move', icon: ScanLine, label: 'Scan' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/settings', icon: Wrench, label: 'Tools' },
  { path: '/help', icon: HelpCircle, label: 'Help' },
]

export default function BottomNav() {
  const loc = useLocation()
  const nav = useNavigate()
  if (loc.pathname.startsWith('/scan/')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(t => {
          const active = loc.pathname === t.path
          return (
            <button key={t.path} onClick={() => nav(t.path)} className="flex flex-col items-center gap-0.5 min-w-[50px]">
              <t.icon size={20} className={active ? 'text-[#FF6B35]' : 'text-gray-400'} />
              <span className={`text-[10px] font-medium ${active ? 'text-[#FF6B35]' : 'text-gray-400'}`}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
