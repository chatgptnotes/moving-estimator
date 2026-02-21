import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Gift, Copy, Share2, Users, CheckCircle2, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function Referral() {
  const nav = useNavigate()
  const { user, profile } = useAuth()
  const [referrals, setReferrals] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  const code = profile?.referral_code || 'LOADING...'
  const link = `${window.location.origin}?ref=${code}`

  useEffect(() => {
    if (!user) return
    supabase.from('referrals').select('*').eq('referrer_id', user.id).then(({ data }) => { if (data) setReferrals(data) })
  }, [user])

  const copyCode = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: 'Moving Estimator', text: `Get a free moving estimate! Use my referral code: ${code}`, url: link })
    } else copyCode()
  }

  const completedCount = referrals.filter(r => r.status === 'completed').length

  if (!user) { nav('/login'); return null }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-16 rounded-b-[2.5rem] text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <button onClick={() => nav(-1)} className="absolute left-6 top-14 w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
        <div className="w-20 h-20 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#FF6B35]/30">
          <Gift size={36} className="text-[#FF6B35]" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">Invite Friends, Earn Rewards</h1>
        <p className="text-blue-200 text-sm">Get 1 free estimate for each friend who signs up!</p>
      </div>

      <div className="px-6 -mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <code className="flex-1 text-lg font-mono font-bold text-[#1E3A5F] tracking-widest">{code}</code>
            <button onClick={copyCode} className="p-2 bg-[#1E3A5F] rounded-lg text-white">
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={share} className="flex-1 bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
              <Share2 size={16} /> Share Link
            </button>
            <button onClick={copyCode} className="px-4 bg-gray-100 rounded-xl text-gray-600 font-medium text-sm">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Invited', value: referrals.length, icon: Users, color: '#1E3A5F' },
            { label: 'Joined', value: completedCount, icon: CheckCircle2, color: '#059669' },
            { label: 'Rewards', value: completedCount, icon: Star, color: '#FF6B35' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <s.icon size={18} style={{ color: s.color }} className="mx-auto mb-1" />
              <p className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-3">How It Works</h3>
          {[
            { step: '1', text: 'Share your referral code or link with friends' },
            { step: '2', text: 'Friend signs up using your code' },
            { step: '3', text: 'You both get 1 free estimate!' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-7 h-7 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center">{s.step}</div>
              <p className="text-sm text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
