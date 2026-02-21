import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Phone, User, MapPin, Eye, EyeOff, ArrowRight, Truck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Mumbai')
  const [otpCode, setOtpCode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const { signIn, signUp, signInWithGoogle, signInWithOtp, verifyOtp } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password)
        if (err) throw err
        nav('/')
      } else if (mode === 'signup') {
        const { error: err } = await signUp(email, password, { full_name: name, phone, city })
        if (err) throw err
        nav('/')
      } else if (mode === 'otp') {
        if (!otpSent) {
          const { error: err } = await signInWithOtp(phone)
          if (err) throw err
          setOtpSent(true)
        } else {
          const { error: err } = await verifyOtp(phone, otpCode)
          if (err) throw err
          nav('/')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2847] via-[#1E3A5F] to-[#2A5080] flex flex-col items-center justify-center px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
            <Truck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Moving Estimator</h1>
          <p className="text-blue-200 text-sm mt-1">AI-powered moving cost estimation</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {(['login', 'signup', 'otp'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setOtpSent(false) }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${mode === m ? 'bg-[#1E3A5F] text-white shadow-sm' : 'text-gray-500'}`}>
                {m === 'login' ? 'Login' : m === 'signup' ? 'Sign Up' : 'Phone'}
              </button>
            ))}
          </div>

          {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                </div>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={city} onChange={e => setCity(e.target.value)} placeholder="City"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                </div>
              </>
            )}

            {mode === 'otp' ? (
              <>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                </div>
                {otpSent && (
                  <input value={otpCode} onChange={e => setOtpCode(e.target.value)} placeholder="Enter OTP" required
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none text-center tracking-widest" />
                )}
              </>
            ) : (
              <>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder="Password" required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#FF6B35] hover:bg-[#e55a28] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                <>{mode === 'otp' ? (otpSent ? 'Verify OTP' : 'Send OTP') : mode === 'signup' ? 'Create Account' : 'Sign In'} <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
          </div>

          <button onClick={() => signInWithGoogle()}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <button onClick={() => nav('/')} className="w-full text-center text-xs text-gray-400 mt-4 hover:text-[#FF6B35] transition-colors">
            Skip for now → Try 1 free estimate
          </button>
        </div>
      </motion.div>
    </div>
  )
}
