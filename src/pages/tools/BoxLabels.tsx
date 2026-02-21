import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QrCode, Printer, Plus, Trash2 } from 'lucide-react'
import { useEstimates } from '../../store/useStore'

interface BoxLabel {
  id: string; room: string; contents: string; fragile: boolean; heavy: boolean; boxNumber: number
}

export default function BoxLabels() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]

  const generateLabels = (): BoxLabel[] => {
    if (!latest) return []
    let boxNum = 1
    const labels: BoxLabel[] = []
    latest.rooms.forEach(room => {
      const fragileItems = room.items.filter(i => i.category === 'Fragile' || i.category === 'Electronics')
      const heavyItems = room.items.filter(i => i.category === 'Heavy' || i.weight_kg > 30)
      const regularItems = room.items.filter(i => !fragileItems.includes(i) && !heavyItems.includes(i))

      if (fragileItems.length > 0) {
        labels.push({ id: `b${boxNum}`, room: room.name, contents: fragileItems.map(i => i.name).join(', '), fragile: true, heavy: false, boxNumber: boxNum++ })
      }
      if (heavyItems.length > 0) {
        labels.push({ id: `b${boxNum}`, room: room.name, contents: heavyItems.map(i => i.name).join(', '), fragile: false, heavy: true, boxNumber: boxNum++ })
      }
      const chunkSize = 5
      for (let i = 0; i < regularItems.length; i += chunkSize) {
        const chunk = regularItems.slice(i, i + chunkSize)
        labels.push({ id: `b${boxNum}`, room: room.name, contents: chunk.map(it => it.name).join(', '), fragile: false, heavy: false, boxNumber: boxNum++ })
      }
    })
    return labels
  }

  const [labels, setLabels] = useState<BoxLabel[]>(generateLabels)
  const [newRoom, setNewRoom] = useState('')
  const [newContents, setNewContents] = useState('')

  const addLabel = () => {
    if (!newRoom || !newContents) return
    const maxNum = labels.reduce((m, l) => Math.max(m, l.boxNumber), 0)
    setLabels([...labels, { id: `b${maxNum + 1}`, room: newRoom, contents: newContents, fragile: false, heavy: false, boxNumber: maxNum + 1 }])
    setNewRoom(''); setNewContents('')
  }

  const removeLabel = (id: string) => setLabels(labels.filter(l => l.id !== id))

  const printLabels = () => {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>Box Labels</title><style>
      body{font-family:sans-serif;margin:0;padding:20px}
      .label{border:3px solid #333;border-radius:12px;padding:20px;margin:10px;width:280px;display:inline-block;page-break-inside:avoid}
      .label.fragile{border-color:#EF4444;background:#FEF2F2}
      .label.heavy{border-color:#F59E0B;background:#FFFBEB}
      .room{font-size:24px;font-weight:bold;color:#1E3A5F}
      .box-num{font-size:48px;font-weight:900;color:#FF6B35;float:right}
      .contents{font-size:12px;color:#666;margin-top:8px}
      .tag{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:bold;margin-top:8px}
      .tag.fragile{background:#FEE2E2;color:#DC2626}
      .tag.heavy{background:#FEF3C7;color:#D97706}
      @media print{.no-print{display:none}}
    </style></head><body>
    <h2 class="no-print" style="color:#1E3A5F">📦 Moving Box Labels — Print & Cut</h2>
    ${labels.map(l => `<div class="label ${l.fragile ? 'fragile' : ''} ${l.heavy ? 'heavy' : ''}">
      <div class="box-num">#${l.boxNumber}</div>
      <div class="room">${l.room}</div>
      <div class="contents">${l.contents}</div>
      ${l.fragile ? '<span class="tag fragile">⚠️ FRAGILE</span>' : ''}
      ${l.heavy ? '<span class="tag heavy">💪 HEAVY</span>' : ''}
      <div style="margin-top:12px;text-align:center">
        <svg viewBox="0 0 100 100" width="60" height="60"><rect x="5" y="5" width="20" height="20" fill="#333"/><rect x="30" y="5" width="10" height="10" fill="#333"/><rect x="45" y="5" width="20" height="20" fill="#333"/><rect x="75" y="5" width="20" height="20" fill="#333"/><rect x="5" y="30" width="10" height="10" fill="#333"/><rect x="25" y="25" width="10" height="10" fill="#333"/><rect x="5" y="45" width="20" height="20" fill="#333"/><rect x="35" y="35" width="10" height="10" fill="#333"/></svg>
        <div style="font-size:8px;color:#999">Box #${l.boxNumber} — ${l.room}</div>
      </div>
    </div>`).join('')}
    <script>window.print()</script></body></html>`)
    w.document.close()
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-sky-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><QrCode size={22} /> Box Labels</h1>
        <p className="text-sky-100 text-sm mt-1">{labels.length} labels ready to print</p>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <button onClick={printLabels} className="w-full bg-[#0EA5E9] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
          <Printer size={16} /> Print All Labels
        </button>

        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-2">
          <input value={newRoom} onChange={e => setNewRoom(e.target.value)} placeholder="Room" className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm" />
          <input value={newContents} onChange={e => setNewContents(e.target.value)} placeholder="Contents" className="flex-[2] bg-gray-50 rounded-lg px-3 py-2 text-sm" />
          <button onClick={addLabel} className="bg-[#FF6B35] text-white rounded-lg px-3"><Plus size={16} /></button>
        </div>

        {labels.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 ${l.fragile ? 'border-2 border-red-200' : l.heavy ? 'border-2 border-amber-200' : 'border border-gray-100'}`}>
            <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] font-bold text-sm">#{l.boxNumber}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-gray-900">{l.room}</p>
                {l.fragile && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">FRAGILE</span>}
                {l.heavy && <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">HEAVY</span>}
              </div>
              <p className="text-[10px] text-gray-400 truncate">{l.contents}</p>
            </div>
            <button onClick={() => removeLabel(l.id)} className="p-1 text-gray-300 hover:text-red-400"><Trash2 size={14} /></button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
