import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Video, RotateCcw, ChevronRight, Loader2 } from 'lucide-react'
import { useEstimates } from '../store/useStore'
import { analyzeRooms } from '../services/aiAnalyzer'
import { recommendVehicle } from '../data/vehicles'
import { calculateCost } from '../services/costCalculator'
import { Room } from '../types'

export default function Scanner() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { getEstimate, updateEstimate } = useEstimates()
  const estimate = getEstimate(id!)
  const [rooms, setRooms] = useState<Room[]>(estimate?.rooms || [])
  const [activeRoom, setActiveRoom] = useState<number>(0)
  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      streamRef.current = stream
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play() }
    } catch {
      // Camera not available, will use demo mode
    }
  }, [])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  useEffect(() => { startCamera(); return stopCamera }, [startCamera, stopCamera])

  const startRecording = () => {
    setPreviewUrl(null)
    chunksRef.current = []
    if (streamRef.current) {
      const mr = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' })
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
        const updated = [...rooms]
        updated[activeRoom] = { ...updated[activeRoom], scanned: true, video_blob: blob }
        setRooms(updated)
      }
      mediaRecorderRef.current = mr
      mr.start(500)
    } else {
      // Demo mode: simulate recording
      setTimeout(() => {
        const updated = [...rooms]
        updated[activeRoom] = { ...updated[activeRoom], scanned: true }
        setRooms(updated)
        setPreviewUrl('demo')
      }, 3000)
    }
    setRecording(true)
    setTimer(0)
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    clearInterval(timerRef.current)
    setRecording(false)
    if (!streamRef.current) {
      // demo mode already handled
    }
  }

  const reRecord = () => {
    setPreviewUrl(null)
    const updated = [...rooms]
    updated[activeRoom] = { ...updated[activeRoom], scanned: false }
    setRooms(updated)
  }

  const nextRoom = () => {
    setPreviewUrl(null)
    if (activeRoom < rooms.length - 1) setActiveRoom(activeRoom + 1)
  }

  const handleDone = async () => {
    setAnalyzing(true)
    const scannedRooms = rooms.filter(r => r.scanned)
    if (scannedRooms.length === 0) {
      // Use all rooms in demo mode
      for (let i = 0; i < rooms.length; i++) rooms[i].scanned = true
    }
    const analyzed = await analyzeRooms(rooms.filter(r => r.scanned), id!)
    const totalVol = analyzed.reduce((s, r) => s + r.total_volume, 0)
    const totalWgt = analyzed.reduce((s, r) => s + r.total_weight, 0)
    const recs = recommendVehicle(totalVol, totalWgt)
    const recommended = recs.find(r => r.percentFull <= 85) || recs[recs.length - 1]

    const updated = {
      ...estimate!,
      rooms: analyzed,
      total_volume: Math.round(totalVol),
      total_weight: Math.round(totalWgt),
      recommended_vehicle: recommended.vehicle.name,
      status: 'ready' as const,
    }
    const costs = calculateCost(updated)
    updated.cost_low = costs.low.total
    updated.cost_mid = costs.mid.total
    updated.cost_high = costs.high.total
    updateEstimate(updated)
    nav(`/estimate/${id}`)
  }

  const scannedCount = rooms.filter(r => r.scanned).length
  const currentRoom = rooms[activeRoom]
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!estimate) return <div className="p-6 text-center text-gray-500">Estimate not found</div>

  if (analyzing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E3A5F] text-white p-6">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
        <Loader2 size={48} />
      </motion.div>
      <h2 className="text-xl font-bold mt-6">Analyzing Your Rooms</h2>
      <p className="text-blue-200 text-sm mt-2 text-center">AI is detecting furniture and estimating volumes...</p>
      <div className="mt-8 space-y-2 w-full max-w-xs">
        {rooms.filter(r => r.scanned).map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}
            className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.3 + 0.5 }}>
              <Check size={16} className="text-green-400" />
            </motion.div>
            <span className="text-sm">{r.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Camera viewfinder */}
      <div className="relative flex-1 bg-gray-900">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {/* Top bar */}
          <div className="p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
            <div className="flex items-center justify-between">
              <button onClick={() => nav(-1)} className="text-white text-sm">&larr; Back</button>
              <span className="text-sm font-medium">{currentRoom?.name}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{scannedCount}/{rooms.length}</span>
            </div>
          </div>

          {/* Guide text */}
          {recording && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex items-center justify-center">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
                <p className="text-sm">Slowly pan from floor to ceiling</p>
                <p className="text-xs text-gray-300 mt-1">Capture all furniture and items</p>
                <p className="text-2xl font-mono font-bold mt-2 text-[#FF6B35]">{formatTime(timer)}</p>
              </div>
            </motion.div>
          )}

          {/* Preview overlay */}
          {previewUrl && !recording && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-auto">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Check size={40} className="text-green-400" />
                </div>
                <p className="text-lg font-semibold">{currentRoom?.name} Recorded!</p>
                <p className="text-sm text-gray-400 mt-1">{formatTime(timer)} captured</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={reRecord} className="flex items-center gap-1 bg-white/10 px-5 py-3 rounded-xl text-sm"><RotateCcw size={14} /> Re-record</button>
                  {activeRoom < rooms.length - 1 && (
                    <button onClick={nextRoom} className="flex items-center gap-1 bg-[#FF6B35] px-5 py-3 rounded-xl text-sm font-medium">Next Room <ChevronRight size={14} /></button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-gray-950 p-4 space-y-4">
        {/* Room pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {rooms.map((r, i) => (
            <button key={r.id} onClick={() => { setActiveRoom(i); setPreviewUrl(null) }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${i === activeRoom ? 'bg-[#FF6B35] text-white' : r.scanned ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-white/5 text-gray-400'}`}>
              {r.scanned && <Check size={12} />}
              {r.name}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          {!recording && !previewUrl && (
            <button onClick={startRecording} className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-white" />
              <div className="absolute inset-2 rounded-full bg-red-500 active:bg-red-600 transition" />
            </button>
          )}
          {recording && (
            <button onClick={stopRecording} className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-pulse-ring" />
              <div className="absolute inset-2 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm" />
              </div>
            </button>
          )}
        </div>

        {/* Done button */}
        {scannedCount > 0 && !recording && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={handleDone}
            className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F35] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
            <Video size={18} /> Analyze {scannedCount} Room{scannedCount > 1 ? 's' : ''}
          </motion.button>
        )}
      </div>
    </div>
  )
}
