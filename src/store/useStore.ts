import { useState, useEffect, useCallback } from 'react'
import { MoveEstimate, Room, Settings } from '../types'

const ESTIMATES_KEY = 'me_estimates'
const SETTINGS_KEY = 'me_settings'

const defaultSettings: Settings = {
  currency: 'INR',
  distanceUnit: 'km',
  weightUnit: 'kg',
  defaultCity: 'Mumbai',
  apiKey: '',
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

export function useEstimates() {
  const [estimates, setEstimates] = useState<MoveEstimate[]>(() => load(ESTIMATES_KEY, []))

  useEffect(() => { localStorage.setItem(ESTIMATES_KEY, JSON.stringify(estimates)) }, [estimates])

  const addEstimate = useCallback((e: MoveEstimate) => setEstimates(prev => [e, ...prev]), [])
  const updateEstimate = useCallback((e: MoveEstimate) => setEstimates(prev => prev.map(p => p.id === e.id ? e : p)), [])
  const deleteEstimate = useCallback((id: string) => setEstimates(prev => prev.filter(p => p.id !== id)), [])
  const getEstimate = useCallback((id: string) => estimates.find(e => e.id === id), [estimates])

  return { estimates, addEstimate, updateEstimate, deleteEstimate, getEstimate }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => load(SETTINGS_KEY, defaultSettings))
  useEffect(() => { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)) }, [settings])
  return { settings, setSettings }
}
