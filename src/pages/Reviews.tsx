import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Send } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function Reviews() {
  const nav = useNavigate()
  const { companyId } = useParams()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async () => {
    if (!user || !companyId || rating === 0) return
    await supabase.from('reviews').insert({ user_id: user.id, company_id: companyId, rating, text })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav(-1)} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-bold">Rate Your Mover</h1>
        </div>
        <p className="text-blue-200 text-sm">Help others by sharing your experience</p>
      </div>

      <div className="px-6 mt-6">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-green-500 fill-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Thank You!</h3>
            <p className="text-sm text-gray-500 mt-2">Your review helps others make better decisions.</p>
            <button onClick={() => nav(-1)} className="mt-6 bg-[#1E3A5F] text-white font-bold py-3 px-8 rounded-xl">Go Back</button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-600 mb-3">How was your experience?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110">
                    <Star size={36} className={`${(hover || rating) >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} transition-colors`} />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : rating === 5 ? 'Excellent!' : 'Tap to rate'}
              </p>
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Tell us about your experience..."
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm resize-none h-32 focus:border-[#FF6B35] outline-none" />
            <button onClick={submit} disabled={rating === 0}
              className="w-full mt-4 bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
              <Send size={16} /> Submit Review
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
