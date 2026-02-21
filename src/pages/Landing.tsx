import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, BarChart3, Truck, Star, Shield, Zap, ArrowRight, CheckCircle2, Smartphone, Globe, DollarSign, Users, Play, ChevronRight } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function Landing() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center"><Truck size={16} className="text-white" /></div>
            <span className="font-bold text-[#1E3A5F]">Moving Estimator</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => nav('/login')} className="text-sm text-gray-600 hover:text-[#1E3A5F] font-medium">Login</button>
            <button onClick={() => nav('/new-move')} className="bg-[#FF6B35] text-white text-sm font-bold px-4 py-2 rounded-xl">Try Free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-6">
              <Zap size={12} className="text-[#FF6B35]" />
              <span className="text-[11px] font-medium text-blue-100">AI-Powered Moving Estimation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Know Your Moving Cost in <span className="text-[#FF6B35]">Minutes</span>
            </h1>
            <p className="text-blue-200 text-base leading-relaxed mb-8 max-w-md">
              Scan rooms with your phone camera. AI identifies every item, calculates volume & weight, recommends truck size — with instant cost estimates.
            </p>
            <div className="flex gap-3 mb-8">
              <button onClick={() => nav('/new-move')} className="bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-4 px-8 rounded-2xl text-base shadow-lg shadow-orange-500/30 flex items-center gap-2">
                <Camera size={20} /> Start Free Estimate <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {['🏠', '📦', '🚛'].map((e, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-sm border-2 border-[#1E3A5F]">{e}</div>
                  ))}
                </div>
                <span className="text-xs text-blue-200">2,500+ moves</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                <span className="text-xs text-blue-200 ml-1">4.9</span>
              </div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center">
            <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
              <div className="w-full h-full bg-gradient-to-br from-[#F5F7FA] to-white rounded-[2.2rem] overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <Camera size={48} className="text-[#FF6B35] mb-4" />
                <p className="text-lg font-bold text-[#1E3A5F]">Scan Your Room</p>
                <p className="text-xs text-gray-500 mt-2">AI detects furniture, appliances & boxes automatically</p>
                <div className="mt-6 w-full bg-[#FF6B35] text-white font-bold py-3 rounded-2xl text-sm">Start Scanning</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: Camera, title: 'Scan Rooms', desc: 'Record 15-60 second videos of each room', color: '#1E3A5F' },
              { step: '02', icon: BarChart3, title: 'AI Analysis', desc: 'AI identifies items, dimensions, volume & weight', color: '#FF6B35' },
              { step: '03', icon: Truck, title: 'Get Quote', desc: 'Instant truck recommendation & cost breakdown', color: '#059669' },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: s.color + '15' }}>
                  <s.icon size={28} style={{ color: s.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>Step {s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-1">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-2">Features</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Everything You Need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Camera, title: 'AI Room Scan', color: '#1E3A5F' },
              { icon: BarChart3, title: 'Cost Breakdown', color: '#FF6B35' },
              { icon: Truck, title: 'Truck Matching', color: '#059669' },
              { icon: Users, title: 'Get Quotes', color: '#7C3AED' },
              { icon: Globe, title: 'Any Move Type', color: '#EC4899' },
              { icon: Shield, title: '95% Accuracy', color: '#0EA5E9' },
              { icon: DollarSign, title: 'Save 40%', color: '#EAB308' },
              { icon: Smartphone, title: 'Mobile First', color: '#6B7280' },
            ].map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className="bg-gray-50 rounded-2xl p-4 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: f.color + '12' }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <p className="text-sm font-bold text-gray-900">{f.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-2">Pricing</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Free', price: '₹0', desc: '1 estimate/month, 3 rooms', cta: 'Start Free' },
              { name: 'Pro', price: '₹799/mo', desc: 'Unlimited estimates, PDF export', cta: 'Go Pro', popular: true },
              { name: 'Business', price: '₹3,999/mo', desc: 'Multi-client, API, branded reports', cta: 'Contact Sales' },
            ].map((p, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${p.popular ? 'border-[#FF6B35]' : 'border-gray-100'} relative`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[10px] font-bold px-4 py-1 rounded-full">POPULAR</div>}
                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                <p className="text-2xl font-extrabold text-[#1E3A5F] mt-2">{p.price}</p>
                <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
                <button onClick={() => nav('/pricing')}
                  className={`w-full mt-6 py-3 rounded-xl font-bold text-sm ${p.popular ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Loved by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Priya S.', text: 'Scanned 6 rooms in 10 minutes. Got exact truck size. The mover was impressed!', stars: 5 },
              { name: 'Ahmed R.', text: 'Saved me from overpaying! Estimate was within 5% of actual cost.', stars: 5 },
              { name: 'James W.', text: 'Moving overseas was stressful until I used this. Saved ₹40,000!', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 text-left">
                <div className="flex gap-0.5 mb-2">{[...Array(t.stars)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-sm text-gray-600 mb-3">"{t.text}"</p>
                <p className="text-sm font-bold text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Store Badges */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0F2847] to-[#1E3A5F] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Get the App</h2>
        <p className="text-blue-200 mb-8">Available on all platforms</p>
        <div className="flex justify-center gap-4">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition">
            <span className="text-2xl">🍎</span>
            <div className="text-left"><p className="text-[10px] text-blue-200">Download on</p><p className="text-sm font-bold">App Store</p></div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition">
            <span className="text-2xl">▶️</span>
            <div className="text-left"><p className="text-[10px] text-blue-200">Get it on</p><p className="text-sm font-bold">Google Play</p></div>
          </div>
        </div>
        <button onClick={() => nav('/new-move')} className="mt-8 bg-[#FF6B35] text-white font-bold py-4 px-10 rounded-2xl text-base shadow-lg shadow-orange-500/30 inline-flex items-center gap-2">
          Start Free Estimate <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-gray-400 text-center text-xs">
        <p>© 2024 Moving Estimator. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-3">
          <button onClick={() => nav('/help')} className="hover:text-white">Help</button>
          <button onClick={() => nav('/pricing')} className="hover:text-white">Pricing</button>
          <button onClick={() => nav('/login')} className="hover:text-white">Login</button>
        </div>
      </footer>
    </div>
  )
}
