import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanLine, BarChart3, Truck, ArrowRight, Shield, Zap, Clock, Camera, Box, DollarSign, Star, ChevronRight, CheckCircle2, Smartphone, Globe, Award, TrendingDown, Users, Play } from 'lucide-react'
import { useEstimates } from '../store/useStore'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function Home() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const recent = estimates.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* ===== HERO SECTION ===== */}
      <div className="relative bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-16 rounded-b-[2.5rem] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-orange-400/5 rounded-full blur-xl" />
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4">
            <Zap size={12} className="text-[#FF6B35]" />
            <span className="text-[11px] font-medium text-blue-100">AI-Powered Moving Estimation</span>
          </motion.div>

          <h1 className="text-3xl font-extrabold leading-tight mb-3">
            Know Your Moving<br />
            Cost in <span className="text-[#FF6B35]">Minutes</span>,<br />
            Not Days.
          </h1>
          <p className="text-blue-200/80 text-sm leading-relaxed mb-6 max-w-[300px]">
            Just scan your rooms with your phone camera. Our AI identifies every item, 
            calculates volume & weight, and recommends the perfect truck size — with instant cost estimates.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => nav('/new-move')} 
              className="flex-1 bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Camera size={20} /> Start Scanning
            </button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors">
              <Play size={18} />
            </button>
          </div>

          {/* Trust stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {['🏠','📦','🚛'].map((e, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-sm border-2 border-[#1E3A5F]">{e}</div>
                ))}
              </div>
              <span className="text-[11px] text-blue-200">2,500+ moves estimated</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
              <span className="text-[11px] text-blue-200 ml-1">4.9</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div id="how-it-works" className="px-6 mt-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} custom={0} className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-1">Simple Process</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-xl font-bold text-gray-900 mb-6">How It Works</motion.h2>
        </motion.div>

        <div className="space-y-4">
          {[
            { step: '01', icon: Camera, title: 'Scan Each Room', desc: 'Walk through your home recording 15-60 second videos of each room. Pan slowly from floor to ceiling to capture everything.', color: '#1E3A5F', bg: 'bg-blue-50' },
            { step: '02', icon: BarChart3, title: 'AI Analyzes Everything', desc: 'Our AI identifies every furniture item, appliance, and box — estimating dimensions, volume, and weight with 95% accuracy.', color: '#FF6B35', bg: 'bg-orange-50' },
            { step: '03', icon: Truck, title: 'Get Your Quote', desc: 'Instantly see recommended truck sizes, number of trips needed, and detailed cost breakdowns. Share with movers in one tap.', color: '#059669', bg: 'bg-green-50' },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className={`${s.bg} rounded-2xl p-5 flex gap-4 items-start border border-gray-100`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + '15' }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>Step {s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-0.5">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== KEY FEATURES ===== */}
      <div className="px-6 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} custom={0} className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-1">Features</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-xl font-bold text-gray-900 mb-2">Why Moving Estimator?</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-sm text-gray-500 mb-6">Everything you need for stress-free moving planning</motion.p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Camera, title: 'Room Scanning', desc: 'Video-based AI detection of all household items', color: '#1E3A5F' },
            { icon: Box, title: 'Volume Calculator', desc: 'Precise cubic feet & weight estimation', color: '#7C3AED' },
            { icon: Truck, title: 'Truck Matching', desc: 'Pickup to 40ft container recommendations', color: '#059669' },
            { icon: DollarSign, title: 'Cost Estimates', desc: 'Low/Mid/High price range with breakdown', color: '#FF6B35' },
            { icon: Zap, title: 'Instant Results', desc: 'Get estimates in minutes, not days', color: '#EAB308' },
            { icon: Shield, title: 'Accurate AI', desc: '95%+ accuracy on item detection', color: '#0EA5E9' },
            { icon: Globe, title: 'Any Move Type', desc: 'Local, interstate & international', color: '#EC4899' },
            { icon: Smartphone, title: 'Mobile First', desc: 'Designed for your phone camera', color: '#6B7280' },
          ].map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: f.color + '12' }}>
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== WHAT AI DETECTS ===== */}
      <div className="px-6 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} custom={0} className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-1">AI Detection</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-xl font-bold text-gray-900 mb-2">What Our AI Identifies</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-sm text-gray-500 mb-5">100+ item types across every room in your home</motion.p>
        </motion.div>

        <div className="bg-gradient-to-br from-[#0F2847] to-[#1E3A5F] rounded-2xl p-5 text-white">
          <div className="grid grid-cols-2 gap-3">
            {[
              { room: 'Living Room', items: 'Sofas, TV units, tables, bookshelves, carpets, curtains, art' },
              { room: 'Bedroom', items: 'Beds, wardrobes, dressers, nightstands, mattresses, lamps' },
              { room: 'Kitchen', items: 'Fridge, washing machine, microwave, dining table, utensils' },
              { room: 'Office', items: 'Desks, chairs, monitors, printers, filing cabinets, shelves' },
            ].map((r, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-xs font-bold text-[#FF6B35] mb-1">{r.room}</p>
                <p className="text-[10px] text-blue-200 leading-relaxed">{r.items}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-blue-300">
            <CheckCircle2 size={14} className="text-green-400" />
            Also detects: Garage items, outdoor furniture, boxes, fragile items, heavy equipment
          </div>
        </div>
      </div>

      {/* ===== VEHICLE OPTIONS ===== */}
      <div className="px-6 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} custom={0} className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-1">Vehicle Options</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-xl font-bold text-gray-900 mb-2">Right-Sized for Your Move</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-sm text-gray-500 mb-5">From studio apartments to entire villas</motion.p>
        </motion.div>

        <div className="space-y-3">
          {[
            { emoji: '🛻', name: 'Pickup Truck', capacity: 'Up to 150 cuft', ideal: 'Studio / 1 Room', price: 'From ₹2,000' },
            { emoji: '🚚', name: 'Mini Truck', capacity: 'Up to 350 cuft', ideal: '1-2 BHK', price: 'From ₹5,000' },
            { emoji: '🚛', name: 'Medium Truck', capacity: 'Up to 600 cuft', ideal: '2-3 BHK', price: 'From ₹10,000' },
            { emoji: '📦', name: '20ft Container', capacity: 'Up to 1,000 cuft', ideal: '3-4 BHK / Villa', price: 'From ₹18,000' },
            { emoji: '🚢', name: '40ft Container', capacity: 'Up to 2,300 cuft', ideal: 'Large Villa / International', price: 'From ₹35,000' },
          ].map((v, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="text-3xl">{v.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900">{v.name}</h3>
                <p className="text-[11px] text-gray-500">{v.capacity} · Ideal for {v.ideal}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#1E3A5F]">{v.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== TESTIMONIALS ===== */}
      <div className="px-6 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} custom={0} className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-1">Testimonials</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-xl font-bold text-gray-900 mb-5">What People Say</motion.h2>
        </motion.div>

        <div className="space-y-3">
          {[
            { name: 'Ahmed Al-Rashid', role: 'Dubai → Abu Dhabi', text: 'Saved me from overpaying! The estimate was within 5% of the actual cost. No more guessing games with movers.', stars: 5 },
            { name: 'Priya Sharma', role: 'Mumbai → Pune', text: 'Scanned 6 rooms in 10 minutes. Got exact truck size recommendation. The mover was impressed with my detailed inventory list!', stars: 5 },
            { name: 'James Wilson', role: 'International Move', text: 'Moving overseas was stressful until I used this app. Knew exactly that I needed a 20ft container. Saved ₹40,000 by not over-ordering.', stars: 5 },
          ].map((t, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(t.stars)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#FF6B35] flex items-center justify-center text-white text-xs font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div className="px-6 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F65] rounded-2xl p-6 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <motion.div variants={fadeUp} custom={0}>
              <p className="text-2xl font-extrabold">95%</p>
              <p className="text-[10px] text-orange-100 mt-1">AI Accuracy</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <p className="text-2xl font-extrabold">2min</p>
              <p className="text-[10px] text-orange-100 mt-1">Avg Scan Time</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={2}>
              <p className="text-2xl font-extrabold">40%</p>
              <p className="text-[10px] text-orange-100 mt-1">Cost Savings</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== RECENT ESTIMATES ===== */}
      {recent.length > 0 && (
        <div className="px-6 mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Recent Estimates</h2>
            <button onClick={() => nav('/history')} className="text-[#FF6B35] text-xs font-medium flex items-center gap-1">View All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {recent.map(e => (
              <motion.div key={e.id} whileTap={{ scale: 0.98 }} onClick={() => nav(`/estimate/${e.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Truck size={18} className="text-[#1E3A5F]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{e.from_city || 'Draft'} → {e.to_city || '...'}</p>
                    <p className="text-[11px] text-gray-400">{new Date(e.created_at).toLocaleDateString()} · {e.rooms?.length || 0} rooms</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#1E3A5F]">{Math.round(e.total_volume)} cuft</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{e.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <div className="px-6 mt-12 mb-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-gradient-to-br from-[#0F2847] to-[#1E3A5F] rounded-2xl p-6 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6B35]/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Ready to Estimate Your Move?</h3>
            <p className="text-blue-200 text-xs mb-5">It takes less than 5 minutes to scan your entire home</p>
            <button onClick={() => nav('/new-move')}
              className="w-full bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Camera size={20} /> Start Free Estimate
              <ArrowRight size={18} />
            </button>
            <p className="text-[10px] text-blue-300 mt-3">No registration required · 100% free · Instant results</p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
