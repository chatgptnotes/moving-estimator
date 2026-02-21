import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Building2, Users, DollarSign, TrendingUp, Truck, Star, Clock, CheckCircle2, XCircle, Eye, Phone, MapPin, Settings, BarChart3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const mockLeads = [
  { id: '1', customer: 'Priya Sharma', from: 'Mumbai', to: 'Pune', date: '2024-03-15', volume: 450, status: 'pending', amount: 12500 },
  { id: '2', customer: 'Ahmed Khan', from: 'Mumbai', to: 'Delhi', date: '2024-03-18', volume: 680, status: 'accepted', amount: 28000 },
  { id: '3', customer: 'Sarah Lee', from: 'Thane', to: 'Mumbai', date: '2024-03-20', volume: 200, status: 'declined', amount: 6500 },
  { id: '4', customer: 'Raj Patel', from: 'Pune', to: 'Bangalore', date: '2024-03-22', volume: 520, status: 'pending', amount: 22000 },
]

export default function BusinessDashboard() {
  const nav = useNavigate()
  const { user, profile } = useAuth()
  const [tab, setTab] = useState<'overview' | 'leads' | 'profile'>('overview')
  const [company, setCompany] = useState<any>(null)
  const [companyName, setCompanyName] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [fleetSize, setFleetSize] = useState(0)

  useEffect(() => {
    if (!user) return
    supabase.from('moving_companies').select('*').eq('user_id', user.id).single().then(({ data }) => {
      if (data) {
        setCompany(data)
        setCompanyName(data.name)
        setCompanyPhone(data.phone || '')
        setFleetSize(data.fleet_size || 0)
      }
    })
  }, [user])

  const saveCompany = async () => {
    if (!user) return
    if (company) {
      await supabase.from('moving_companies').update({ name: companyName, phone: companyPhone, fleet_size: fleetSize }).eq('id', company.id)
    } else {
      const { data } = await supabase.from('moving_companies').insert({ user_id: user.id, name: companyName, phone: companyPhone, fleet_size: fleetSize }).select().single()
      if (data) setCompany(data)
    }
  }

  const statusColor = (s: string) => s === 'accepted' ? 'text-green-600 bg-green-50' : s === 'declined' ? 'text-red-600 bg-red-50' : 'text-orange-600 bg-orange-50'
  const statusIcon = (s: string) => s === 'accepted' ? CheckCircle2 : s === 'declined' ? XCircle : Clock

  if (!user) { nav('/login'); return null }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav('/')} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">Business Dashboard</h1>
        </div>
        <p className="text-blue-200 text-sm">{company?.name || 'Set up your company profile'}</p>
        <div className="flex bg-white/10 rounded-xl p-1 mt-4">
          {(['overview', 'leads', 'profile'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold ${tab === t ? 'bg-white text-[#1E3A5F]' : 'text-white/70'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-4">
        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Leads', value: '24', icon: Users, color: '#1E3A5F' },
                { label: 'Revenue', value: '₹1.2L', icon: DollarSign, color: '#059669' },
                { label: 'Acceptance', value: '78%', icon: TrendingUp, color: '#FF6B35' },
                { label: 'Rating', value: '4.8', icon: Star, color: '#EAB308' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <s.icon size={18} style={{ color: s.color }} />
                  <p className="text-2xl font-extrabold text-gray-900 mt-2">{s.value}</p>
                  <p className="text-[10px] text-gray-400">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Leads</h3>
              {mockLeads.slice(0, 3).map(l => {
                const SIcon = statusIcon(l.status)
                return (
                  <div key={l.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{l.customer}</p>
                      <p className="text-[11px] text-gray-400">{l.from} → {l.to} · {l.volume} cuft</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1E3A5F]">₹{l.amount.toLocaleString()}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor(l.status)}`}>{l.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'leads' && (
          <div className="space-y-3">
            {mockLeads.map((l, i) => {
              const SIcon = statusIcon(l.status)
              return (
                <motion.div key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900">{l.customer}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor(l.status)}`}>{l.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={10} />{l.from} → {l.to}</span>
                    <span className="flex items-center gap-1"><Truck size={10} />{l.volume} cuft</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{l.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-extrabold text-[#1E3A5F]">₹{l.amount.toLocaleString()}</p>
                    {l.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold">Accept</button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold">Decline</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {tab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><Building2 size={16} className="text-[#1E3A5F]" /> Company Profile</h3>
            {[
              { label: 'Company Name', value: companyName, set: setCompanyName },
              { label: 'Phone', value: companyPhone, set: setCompanyPhone },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{f.label}</label>
                <input value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] outline-none" />
              </div>
            ))}
            <div>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Fleet Size</label>
              <input type="number" value={fleetSize} onChange={e => setFleetSize(+e.target.value)}
                className="w-full mt-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] outline-none" />
            </div>
            <button onClick={saveCompany} className="w-full bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-3 rounded-xl text-sm">Save Company Profile</button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
