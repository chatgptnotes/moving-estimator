import { useSettings } from '../store/useStore'
import { Settings } from '../types'

export default function SettingsPage() {
  const { settings, setSettings } = useSettings()
  const update = (partial: Partial<Settings>) => setSettings(s => ({ ...s, ...partial }))

  const Select = ({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-sm text-gray-700">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-right border-none outline-none">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2A5080] text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-blue-200 text-sm">Customize your preferences</p>
      </div>

      <div className="px-5 mt-6 space-y-4 pb-28">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Preferences</h3>
          <Select label="Currency" value={settings.currency} onChange={v => update({ currency: v as Settings['currency'] })}
            options={[{ value: 'INR', label: '₹ INR' }, { value: 'AED', label: 'AED' }, { value: 'USD', label: '$ USD' }, { value: 'GBP', label: '£ GBP' }]} />
          <Select label="Distance" value={settings.distanceUnit} onChange={v => update({ distanceUnit: v as 'km' | 'miles' })}
            options={[{ value: 'km', label: 'Kilometers' }, { value: 'miles', label: 'Miles' }]} />
          <Select label="Weight" value={settings.weightUnit} onChange={v => update({ weightUnit: v as 'kg' | 'lbs' })}
            options={[{ value: 'kg', label: 'Kilograms' }, { value: 'lbs', label: 'Pounds' }]} />
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-700">Default City</span>
            <input value={settings.defaultCity} onChange={e => update({ defaultCity: e.target.value })}
              className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-right w-32 border-none outline-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">AI Configuration</h3>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">API Key (Claude)</label>
            <input type="password" value={settings.apiKey} onChange={e => update({ apiKey: e.target.value })}
              placeholder="sk-ant-... (optional, demo mode works without)"
              className="w-full bg-gray-100 rounded-lg px-3 py-2.5 text-sm border-none outline-none" />
            <p className="text-[10px] text-gray-400 mt-1">Leave empty to use demo mode with realistic mock data</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-xs text-gray-400">Moving Estimator v1.0.0</p>
          <p className="text-[10px] text-gray-300 mt-1">Built with ❤️ using React + AI</p>
        </div>
      </div>
    </div>
  )
}
