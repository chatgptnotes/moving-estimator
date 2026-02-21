import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import NewMove from './pages/NewMove'
import Scanner from './pages/Scanner'
import Estimate from './pages/Estimate'
import History from './pages/History'
import SettingsPage from './pages/Settings'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <div className="flex-1 overflow-y-auto pb-safe">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-move" element={<NewMove />} />
          <Route path="/scan/:id" element={<Scanner />} />
          <Route path="/estimate/:id" element={<Estimate />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}
