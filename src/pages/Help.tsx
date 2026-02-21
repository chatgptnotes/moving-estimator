import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Send, HelpCircle, Mail } from 'lucide-react'

const faqs = [
  { q: 'How does the AI room scanning work?', a: 'Simply record a 15-60 second video of each room, panning slowly from floor to ceiling. Our AI identifies furniture, appliances, and boxes, estimating their dimensions and weight with 95% accuracy.' },
  { q: 'How accurate are the cost estimates?', a: 'Our estimates are typically within 5-10% of actual moving costs. We factor in distance, volume, weight, floor access, and seasonal pricing to give you low/mid/high ranges.' },
  { q: 'Can I use it for international moves?', a: 'Yes! Moving Estimator supports local, interstate, and international moves. For international moves, we recommend container sizes and provide customs-friendly inventory lists.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use bank-level encryption and your videos are processed locally. We never share your personal data with third parties without consent.' },
  { q: 'What\'s included in the free plan?', a: 'Free plan includes 1 estimate per month with up to 3 rooms. Upgrade to Pro for unlimited estimates, PDF exports, and priority AI processing.' },
  { q: 'How do I get quotes from movers?', a: 'After completing your estimate, tap "Get Quotes from Movers" to see verified moving companies in your area. Compare prices, ratings, and availability.' },
]

export default function Help() {
  const nav = useNavigate()
  const [open, setOpen] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">Help & Support</h1>
        </div>
        <p className="text-blue-200 text-sm">Find answers or get in touch</p>
      </div>

      <div className="px-6 mt-4">
        {/* FAQ */}
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><HelpCircle size={16} className="text-[#FF6B35]" /> Frequently Asked Questions</h3>
        <div className="space-y-2 mb-6">
          {faqs.map((f, i) => (
            <motion.div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-4 flex items-center justify-between text-left">
                <span className="text-sm font-medium text-gray-800 pr-4">{f.q}</span>
                {open === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
              </button>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Chat */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F65] rounded-2xl p-5 text-white mb-6">
          <div className="flex items-center gap-3">
            <MessageCircle size={24} />
            <div>
              <h3 className="font-bold">Live Chat</h3>
              <p className="text-xs text-orange-100">Our team is online 9 AM - 9 PM IST</p>
            </div>
          </div>
          <button className="mt-3 w-full bg-white text-[#FF6B35] font-bold py-3 rounded-xl text-sm">Start Chat</button>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Mail size={16} className="text-[#1E3A5F]" /> Send Feedback</h3>
          {sent ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium text-sm">✓ Thanks for your feedback!</p>
            </div>
          ) : (
            <>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
                placeholder="Tell us how we can improve..." rows={4}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm resize-none focus:border-[#FF6B35] outline-none" />
              <button onClick={() => { if (feedback.trim()) setSent(true) }}
                className="w-full mt-3 bg-[#1E3A5F] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                <Send size={14} /> Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
