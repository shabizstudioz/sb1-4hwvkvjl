'use client'

import { useState } from 'react'
import { Search, Package } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/tracking?tracking_number=${trackingNumber}`)
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      
      setTrackingResult(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to track shipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Your Shipment</h1>
      
      <form onSubmit={handleTrack} className="card mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g., PX123456)"
            className="input pl-12 pr-32"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 button-primary"
          >
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </div>
      </form>

      {trackingResult && (
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <Package className="w-12 h-12 text-accent" />
            <div>
              <h2 className="text-xl font-semibold">{trackingResult.tracking_number}</h2>
              <p className="text-gray-400">{trackingResult.courier}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Customer</p>
              <p className="font-medium">{trackingResult.customer_name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Destination</p>
              <p className="font-medium">{trackingResult.destination_city}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm">
                {trackingResult.status}
              </span>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Created</p>
              <p className="font-medium">
                {new Date(trackingResult.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}