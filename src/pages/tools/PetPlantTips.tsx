import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const petTips = [
  { icon: '🐕', title: 'Dogs', tips: ['Visit vet for health certificate (required for interstate)', 'Update microchip with new address', 'Keep routine as normal as possible', 'Use familiar blanket in carrier', 'Stop at rest areas every 2-3 hours', 'Never leave in hot car'] },
  { icon: '🐈', title: 'Cats', tips: ['Confine to one room on moving day', 'Use pheromone spray in carrier', 'Keep litter box accessible until last moment', 'Set up safe room first at new home', 'Keep windows closed for 2 weeks at new home'] },
  { icon: '🐠', title: 'Fish', tips: ['Transport in sealed bags with tank water', 'Use battery-powered air pump', 'Keep temperature stable with insulated container', 'Move tank water separately in buckets', 'Set up tank ASAP at new location'] },
  { icon: '🐦', title: 'Birds', tips: ['Cover cage during transport', 'Remove perches for safety', 'Keep car temperature comfortable', 'Avoid drafts during transport', 'Re-establish routine quickly at new home'] },
]

const plantTips = [
  { icon: '🪴', title: 'Indoor Plants', tips: ['Water 2 days before move (not day of)', 'Repot from ceramic to plastic pots', 'Wrap pots in newspaper to contain soil', 'Stand upright in open-top boxes', 'Keep away from direct sun during transit'] },
  { icon: '🌱', title: 'Large Plants', tips: ['Prune 2 weeks before move', 'Wrap in burlap or trash bags loosely', 'Lay tall plants on their side with support', 'Re-pot immediately at new home', 'Note: most movers won\'t insure plants'] },
  { icon: '🌿', title: 'Sensitive Plants', tips: ['Maintain temperature 50-80°F during transit', 'Avoid leaving in moving truck overnight', 'Transport in your personal vehicle if possible', 'Mist leaves if transit exceeds 24 hours', 'Quarantine from new houseplants for pest check'] },
]

export default function PetPlantTips() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#84CC16] to-[#A3E635] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => nav('/tools')} className="text-lime-200 text-sm mb-3">&larr; Tools</button>
        <h1 className="text-xl font-bold">🐾 Pet & Plant Moving Guide</h1>
        <p className="text-lime-100 text-sm mt-1">Keep your living companions safe</p>
      </div>

      <div className="px-5 mt-4 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">🐾 Pets</h2>
          <div className="space-y-3">
            {petTips.map((pet, i) => (
              <motion.div key={pet.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{pet.icon}</span>
                  <p className="text-sm font-bold text-gray-900">{pet.title}</p>
                </div>
                <ul className="space-y-1">
                  {pet.tips.map((tip, j) => (
                    <li key={j} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5">•</span>{tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">🌿 Plants</h2>
          <div className="space-y-3">
            {plantTips.map((plant, i) => (
              <motion.div key={plant.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (petTips.length + i) * 0.08 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{plant.icon}</span>
                  <p className="text-sm font-bold text-gray-900">{plant.title}</p>
                </div>
                <ul className="space-y-1">
                  {plant.tips.map((tip, j) => (
                    <li key={j} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                      <span className="text-lime-500 mt-0.5">•</span>{tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-xs font-semibold text-yellow-700 mb-1">⚠️ Interstate / International Moves</p>
          <ul className="text-[11px] text-gray-600 space-y-1">
            <li>• Check destination state/country plant quarantine laws</li>
            <li>• Some states prohibit certain plant species</li>
            <li>• Pets need health certificates for interstate travel</li>
            <li>• International moves require pet import permits & vaccinations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
