import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, X, Crown, Zap, Building2, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const plans = [
  {
    id: 'free' as const, name: 'Free', price: '₹0', period: 'forever', icon: Zap, color: '#6B7280',
    features: ['1 estimate per month', 'Up to 3 rooms', 'Basic AI detection', 'Standard vehicle matching'],
    disabled: ['PDF export', 'Priority AI processing', 'Saved addresses', 'Move history sync']
  },
  {
    id: 'pro' as const, name: 'Pro', price: '₹799', period: '/month', icon: Crown, color: '#FF6B35', popular: true,
    features: ['Unlimited estimates', 'All room types', 'Priority AI processing', 'PDF export & sharing', 'Saved addresses', 'Full move history', 'Email support'],
    disabled: ['Multi-client management', 'Branded reports', 'API access']
  },
  {
    id: 'business' as const, name: 'Business', price: '₹3,999', period: '/month', icon: Building2, color: '#1E3A5F',
    features: ['Everything in Pro', 'Multi-client management', 'Branded reports', 'API access', 'Lead management', 'Company dashboard', 'Priority support', 'Custom integrations'],
    disabled: []
  },
]

export default function Pricing() {
  const nav = useNavigate()
  const { profile } = useAuth()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-12 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">Choose Your Plan</h1>
        </div>
        <p className="text-blue-200 text-sm">Unlock powerful features for smarter moving</p>
        <div className="flex bg-white/10 rounded-xl p-1 mt-4 max-w-[200px]">
          <button onClick={() => setBilling('monthly')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${billing === 'monthly' ? 'bg-white text-[#1E3A5F]' : 'text-white/70'}`}>Monthly</button>
          <button onClick={() => setBilling('yearly')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${billing === 'yearly' ? 'bg-white text-[#1E3A5F]' : 'text-white/70'}`}>Yearly (-20%)</button>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {plans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${plan.popular ? 'border-[#FF6B35]' : 'border-gray-100'} relative`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[10px] font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Star size={10} fill="white" /> MOST POPULAR
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: plan.color + '15' }}>
                <plan.icon size={20} style={{ color: plan.color }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{plan.name}</h3>
                <p className="text-lg font-extrabold" style={{ color: plan.color }}>
                  {billing === 'yearly' && plan.price !== '₹0' ? (
                    <>{plan.id === 'pro' ? '₹639' : '₹3,199'}<span className="text-xs font-normal text-gray-400">/month</span></>
                  ) : (
                    <>{plan.price}<span className="text-xs font-normal text-gray-400">{plan.period}</span></>
                  )}
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-700">{f}</span>
                </div>
              ))}
              {plan.disabled.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <X size={14} className="text-gray-300 flex-shrink-0" />
                  <span className="text-xs text-gray-400">{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => nav(profile ? '/' : '/login')}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                profile?.plan === plan.id
                  ? 'bg-gray-100 text-gray-500 cursor-default'
                  : plan.popular
                    ? 'bg-[#FF6B35] hover:bg-[#e55a28] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}>
              {profile?.plan === plan.id ? 'Current Plan' : plan.price === '₹0' ? 'Get Started Free' : 'Upgrade Now'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
