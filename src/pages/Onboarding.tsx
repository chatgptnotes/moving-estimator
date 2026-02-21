import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, BarChart3, Truck, DollarSign, ArrowRight, ChevronRight } from 'lucide-react'

const slides = [
  { icon: Camera, title: 'Scan Your Rooms', desc: 'Simply record a short video of each room. Our AI will identify every item automatically.', color: '#1E3A5F', bg: 'from-[#0F2847] to-[#1E3A5F]' },
  { icon: BarChart3, title: 'AI-Powered Analysis', desc: 'Get instant dimensions, volume, and weight estimates for all your belongings with 95% accuracy.', color: '#FF6B35', bg: 'from-[#FF6B35] to-[#FF8F65]' },
  { icon: Truck, title: 'Perfect Truck Match', desc: 'We recommend the right vehicle size and calculate the number of trips needed for your move.', color: '#059669', bg: 'from-[#059669] to-[#34D399]' },
  { icon: DollarSign, title: 'Save Up to 40%', desc: 'Compare quotes from verified movers and never overpay for your move again.', color: '#7C3AED', bg: 'from-[#7C3AED] to-[#A78BFA]' },
]

export default function Onboarding() {
  const [current, setCurrent] = useState(0)
  const nav = useNavigate()

  const finish = () => {
    localStorage.setItem('me_onboarded', '1')
    nav('/')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slides[current].bg} flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white text-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center">
            <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-[2rem] flex items-center justify-center mb-8 border border-white/20">
              {(() => { const Icon = slides[current].icon; return <Icon size={56} className="text-white" /> })()}
            </div>
            <h2 className="text-2xl font-extrabold mb-3">{slides[current].title}</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-[300px]">{slides[current].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
          ))}
        </div>

        <div className="flex gap-3">
          {current < slides.length - 1 ? (
            <>
              <button onClick={finish} className="flex-1 py-4 text-white/60 text-sm font-medium">Skip</button>
              <button onClick={() => setCurrent(c => c + 1)}
                className="flex-[2] bg-white text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                Next <ChevronRight size={18} />
              </button>
            </>
          ) : (
            <button onClick={finish}
              className="flex-1 bg-white text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
              Get Started <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
