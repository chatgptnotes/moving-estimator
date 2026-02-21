import { useNavigate } from 'react-router-dom'
import { Bell, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const nav = useNavigate()
  const { user, profile } = useAuth()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-2 max-w-lg mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav('/')}>
          <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">ME</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => nav('/notifications')} className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
            <Bell size={16} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] rounded-full text-[8px] text-white font-bold flex items-center justify-center">3</span>
          </button>
          <button onClick={() => nav(user ? '/profile' : '/login')} className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" />
            ) : user ? (
              <div className="w-full h-full bg-[#1E3A5F] flex items-center justify-center text-white text-xs font-bold">
                {(profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
              </div>
            ) : (
              <User size={16} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
