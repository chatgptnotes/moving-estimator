import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Save, MapPin, Phone, Mail, User, Star, Package, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface SavedAddress {
  id: string; label: string; address: string; city: string; floor: number; elevator: boolean
}

export default function Profile() {
  const { user, profile, signOut, refreshProfile } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [city, setCity] = useState(profile?.default_city || 'Mumbai')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [newAddr, setNewAddr] = useState({ label: '', address: '', city: '', floor: 0, elevator: false })
  const [showAddrForm, setShowAddrForm] = useState(false)

  useEffect(() => {
    if (profile) { setName(profile.full_name || ''); setPhone(profile.phone || ''); setCity(profile.default_city || 'Mumbai') }
  }, [profile])

  useEffect(() => {
    if (user) supabase.from('saved_addresses').select('*').eq('user_id', user.id).then(({ data }) => { if (data) setAddresses(data) })
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    await supabase.from('profiles').upsert({ user_id: user.id, full_name: name, phone, default_city: city })
    await refreshProfile()
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addAddress = async () => {
    if (!user || !newAddr.label) return
    const { data } = await supabase.from('saved_addresses').insert({ ...newAddr, user_id: user.id }).select().single()
    if (data) setAddresses([...addresses, data])
    setNewAddr({ label: '', address: '', city: '', floor: 0, elevator: false })
    setShowAddrForm(false)
  }

  const delAddress = async (id: string) => {
    await supabase.from('saved_addresses').delete().eq('id', id)
    setAddresses(addresses.filter(a => a.id !== id))
  }

  if (!user) { nav('/login'); return null }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-20 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">My Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {profile?.avatar_url ? <img src={profile.avatar_url} className="w-20 h-20 rounded-full object-cover" /> : (name?.[0] || '?')}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF6B35] rounded-full flex items-center justify-center border-2 border-[#1E3A5F]">
              <Camera size={12} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{name || 'Your Name'}</h2>
            <p className="text-blue-200 text-sm">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#FF6B35]/20 text-[#FF6B35] text-[10px] font-bold rounded-full uppercase">{profile?.plan || 'free'} plan</span>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><User size={16} className="text-[#1E3A5F]" /> Personal Info</h3>
          {[
            { icon: User, label: 'Full Name', value: name, set: setName },
            { icon: Phone, label: 'Phone', value: phone, set: setPhone },
            { icon: MapPin, label: 'Default City', value: city, set: setCity },
          ].map((f, i) => (
            <div key={i}>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{f.label}</label>
              <div className="relative mt-1">
                <f.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] outline-none" />
              </div>
            </div>
          ))}
          <div>
            <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Email</label>
            <div className="relative mt-1">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={user.email || ''} disabled className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm border border-gray-200 text-gray-500" />
            </div>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
            {saved ? '✓ Saved!' : <><Save size={16} /> Save Changes</>}
          </button>
        </motion.div>

        {/* Saved Addresses */}
        <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><MapPin size={16} className="text-[#1E3A5F]" /> Saved Addresses</h3>
            <button onClick={() => setShowAddrForm(!showAddrForm)} className="text-[#FF6B35] text-xs font-medium">+ Add</button>
          </div>
          {showAddrForm && (
            <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-xl">
              <input value={newAddr.label} onChange={e => setNewAddr({ ...newAddr, label: e.target.value })} placeholder="Label (Home, Office...)" className="w-full px-3 py-2 bg-white rounded-lg text-sm border border-gray-200 outline-none" />
              <input value={newAddr.address} onChange={e => setNewAddr({ ...newAddr, address: e.target.value })} placeholder="Address" className="w-full px-3 py-2 bg-white rounded-lg text-sm border border-gray-200 outline-none" />
              <div className="flex gap-2">
                <input value={newAddr.city} onChange={e => setNewAddr({ ...newAddr, city: e.target.value })} placeholder="City" className="flex-1 px-3 py-2 bg-white rounded-lg text-sm border border-gray-200 outline-none" />
                <input type="number" value={newAddr.floor} onChange={e => setNewAddr({ ...newAddr, floor: +e.target.value })} placeholder="Floor" className="w-20 px-3 py-2 bg-white rounded-lg text-sm border border-gray-200 outline-none" />
              </div>
              <button onClick={addAddress} className="w-full bg-[#1E3A5F] text-white font-medium py-2 rounded-lg text-sm">Save Address</button>
            </div>
          )}
          {addresses.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No saved addresses yet</p>
          ) : (
            <div className="space-y-2">
              {addresses.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.label}</p>
                    <p className="text-[11px] text-gray-500">{a.address}, {a.city} · Floor {a.floor}</p>
                  </div>
                  <button onClick={() => delAddress(a.id)} className="text-red-400 text-xs">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-2">
          <button onClick={() => nav('/pricing')} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <Star size={18} className="text-[#FF6B35]" />
            <span className="text-sm font-medium text-gray-800 flex-1 text-left">Upgrade Plan</span>
            <span className="text-xs text-gray-400">{profile?.plan || 'free'}</span>
          </button>
          <button onClick={() => nav('/referral')} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <Package size={18} className="text-[#1E3A5F]" />
            <span className="text-sm font-medium text-gray-800 flex-1 text-left">Referral Program</span>
          </button>
          <button onClick={async () => { await signOut(); nav('/') }}
            className="w-full bg-red-50 rounded-2xl p-4 border border-red-100 flex items-center gap-3">
            <LogOut size={18} className="text-red-500" />
            <span className="text-sm font-medium text-red-600">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
