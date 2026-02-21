import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, Clock } from 'lucide-react'
import { useEstimates } from '../../store/useStore'

const disassemblyData: Record<string, { needs: boolean; time: string; tools: string; steps: string[] }> = {
  'Queen Bed Frame': { needs: true, time: '20-30 min', tools: 'Allen key, wrench', steps: ['Remove mattress', 'Unscrew headboard', 'Remove side rails', 'Label & bag all hardware'] },
  'King Bed Frame': { needs: true, time: '25-35 min', tools: 'Allen key, wrench', steps: ['Remove mattress', 'Unscrew headboard', 'Remove side rails', 'Label & bag all hardware'] },
  'Single Bed Frame': { needs: true, time: '15-20 min', tools: 'Allen key, wrench', steps: ['Remove mattress', 'Unscrew frame', 'Label hardware'] },
  'Wardrobe (3-door)': { needs: true, time: '30-45 min', tools: 'Screwdriver, wrench', steps: ['Empty contents', 'Remove shelves', 'Unscrew doors', 'Disassemble panels if modular'] },
  'Wardrobe (2-door)': { needs: true, time: '20-30 min', tools: 'Screwdriver, wrench', steps: ['Empty contents', 'Remove shelves', 'Unscrew doors'] },
  'Dining Table (6-seater)': { needs: true, time: '15-20 min', tools: 'Wrench', steps: ['Flip table', 'Unscrew legs', 'Wrap tabletop separately'] },
  'Dining Table (4-seater)': { needs: true, time: '10-15 min', tools: 'Wrench', steps: ['Flip table', 'Unscrew legs', 'Wrap tabletop'] },
  'Computer Desk': { needs: true, time: '15-25 min', tools: 'Screwdriver, Allen key', steps: ['Remove drawers', 'Unscrew top from legs', 'Label all pieces'] },
  'Study Desk': { needs: true, time: '10-20 min', tools: 'Screwdriver', steps: ['Remove drawers', 'Unscrew legs if detachable'] },
  'Bookshelf': { needs: true, time: '15-20 min', tools: 'Screwdriver', steps: ['Remove all books', 'Remove adjustable shelves', 'Disassemble if flat-pack'] },
  'Storage Rack': { needs: true, time: '10-15 min', tools: 'Wrench, pliers', steps: ['Empty rack', 'Remove shelves', 'Disassemble uprights'] },
  'Treadmill': { needs: true, time: '20-30 min', tools: 'Allen key, wrench', steps: ['Unplug', 'Fold if foldable', 'Remove console if needed for doorways'] },
  'AC Unit (Split)': { needs: true, time: '60-90 min', tools: 'Professional needed!', steps: ['⚠️ Hire AC technician', 'Recover refrigerant', 'Disconnect indoor unit', 'Disconnect outdoor unit'] },
}

export default function DisassemblyNotes() {
  const nav = useNavigate()
  const { estimates } = useEstimates()
  const latest = estimates.find(e => e.status === 'ready') || estimates[0]

  const itemsNeedingDisassembly = latest?.rooms.flatMap(r =>
    r.items.filter(i => disassemblyData[i.name]).map(i => ({ ...i, roomName: r.name, disassembly: disassemblyData[i.name] }))
  ) || []

  const totalTime = itemsNeedingDisassembly.reduce((s, i) => {
    const mins = parseInt(i.disassembly.time.split('-')[1] || i.disassembly.time)
    return s + mins
  }, 0)

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#78716C] to-[#A8A29E] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-stone-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Wrench size={22} /> Disassembly Notes</h1>
        <p className="text-stone-200 text-sm mt-1">{itemsNeedingDisassembly.length} items need disassembly</p>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {itemsNeedingDisassembly.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <Clock size={20} className="text-[#FF6B35]" />
            <div>
              <p className="text-sm font-bold text-gray-900">Estimated total: ~{totalTime} minutes</p>
              <p className="text-[10px] text-gray-400">Plan disassembly 1-2 days before moving</p>
            </div>
          </div>
        )}

        {itemsNeedingDisassembly.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-[10px] text-gray-400">📍 {item.roomName}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">⏱ {item.disassembly.time}</span>
                  <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">🔧 {item.disassembly.tools}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {item.disassembly.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                      <span className="text-gray-400 mt-0.5">{j + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {itemsNeedingDisassembly.length === 0 && (
          <div className="text-center py-12">
            <Wrench size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">No items needing disassembly detected</p>
            <p className="text-gray-300 text-xs mt-1">Scan rooms to get disassembly notes</p>
          </div>
        )}

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p className="text-xs font-semibold text-amber-700 mb-1">⚠️ Important</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Bag & label all screws/hardware with item name</li>
            <li>• Take photos before disassembly for reassembly reference</li>
            <li>• Keep instruction manuals or take photos of them</li>
            <li>• AC units MUST be serviced by certified technician</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
