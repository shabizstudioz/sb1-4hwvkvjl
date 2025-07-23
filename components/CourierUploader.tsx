'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

interface CourierUploaderProps {
  onClose: () => void
}

export default function CourierUploader({ onClose }: CourierUploaderProps) {
  const [formData, setFormData] = useState({
    courier: 'postex',
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    destination_city: '',
    cod_amount: 0,
  })
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)

      toast.success(`Shipment created: ${data.tracking_number}`)
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-white/10 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Shipment</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Courier</label>
            <select
              value={formData.courier}
              onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
              className="input"
            >
              <option value="postex">PostEx</option>
              <option value="blueex">BlueEx</option>
              <option value="tcs">TCS</option>
              <option value="leopards">Leopards</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Customer Name</label>
            <input
              type="text"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Phone</label>
            <input
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
              className="input"
              placeholder="03001234567"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Address</label>
            <textarea
              value={formData.customer_address}
              onChange={(e) => setFormData({ ...formData, customer_address: e.target.value })}
              className="input"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">City</label>
            <input
              type="text"
              value={formData.destination_city}
              onChange={(e) => setFormData({ ...formData, destination_city: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">COD Amount</label>
            <input
              type="number"
              value={formData.cod_amount}
              onChange={(e) => setFormData({ ...formData, cod_amount: Number(e.target.value) })}
              className="input"
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 button-primary"
            >
              {loading ? 'Creating...' : 'Create Shipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}