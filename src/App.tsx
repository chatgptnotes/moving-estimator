import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import Home from './pages/Home'
import NewMove from './pages/NewMove'
import Scanner from './pages/Scanner'
import Estimate from './pages/Estimate'
import History from './pages/History'
import SettingsPage from './pages/Settings'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Pricing from './pages/Pricing'
import Marketplace from './pages/Marketplace'
import Notifications from './pages/Notifications'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Referral from './pages/Referral'
import Reviews from './pages/Reviews'
import Help from './pages/Help'
import BusinessDashboard from './pages/BusinessDashboard'

const noHeaderPaths = ['/login', '/onboarding', '/landing']
const noNavPaths = ['/login', '/onboarding', '/landing', '/business']

export default function App() {
  const loc = useLocation()
  const hideHeader = noHeaderPaths.some(p => loc.pathname.startsWith(p)) || loc.pathname.startsWith('/scan/')
  const hideNav = noNavPaths.some(p => loc.pathname.startsWith(p)) || loc.pathname.startsWith('/scan/')

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {!hideHeader && <Header />}
      <div className={`flex-1 overflow-y-auto pb-safe ${!hideHeader ? 'pt-14' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-move" element={<NewMove />} />
          <Route path="/scan/:id" element={<Scanner />} />
          <Route path="/estimate/:id" element={<Estimate />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/review/:companyId" element={<Reviews />} />
          <Route path="/help" element={<Help />} />
          <Route path="/business" element={<BusinessDashboard />} />
        </Routes>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  )
}
