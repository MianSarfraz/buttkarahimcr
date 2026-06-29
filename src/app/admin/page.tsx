'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Utensils } from 'lucide-react'
import AdminDashboard from './dashboard/page'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('admin_auth_session') === 'true')
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const pin = formData.get('pin') as string
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '266786'

    if (pin === adminPin) {
      localStorage.setItem('admin_auth_session', 'true')
      setIsLoggedIn(true)
    } else {
      setError('Invalid PIN')
    }
  }

  if (isLoggedIn) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-950 via-orange-900 to-yellow-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full shadow-2xl mb-4">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Butt Karahi</h1>
          <p className="text-orange-200">Admin Panel</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Enter PIN</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-orange-100 ml-1">PIN</label>
              <input
                type="password"
                name="pin"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-orange-200/50 focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-center text-2xl tracking-[0.5em]"
                placeholder="••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-xl flex items-center gap-2">
                <Lock size={16} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Enter Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
