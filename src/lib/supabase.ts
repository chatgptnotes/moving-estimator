import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || 'https://ukhrfvthdafkarufgnzk.supabase.co'
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVraHJmdnRoZGFma2FydWZnbnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTEyMzgsImV4cCI6MjA4NzI2NzIzOH0.qeGS_MTyEM23frcqAhWSnEEVvZSTVT1tE79bkHht7EI'

export const supabase = createClient(url, key)
