'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import CourierUploader from '@/components/CourierUploader'

export default function CouriersPage() {
  const [dispatches, setDispatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploader, setShowUploader] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchDispatches()
  }, [])

  const fetchDispatches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user?.id)
        .single()

      const { data, error } = await supabase
        .from('courier_dispatches')
        .select('*')
        .eq('tenant_id', userData?.tenant_id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDispatches(data || [])
    } catch (error) {
      toast.error('Failed to load dispatches')
    } finally {
      setLoading(false)
    }
  }

  const filteredDispatches = dispatches.filter(dispatch =>
    dispatch.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dispatch.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courier Management</h1>
        <button
          onClick={() => setShowUploader(true)}
          className="button-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Shipment
        </button>
      </div>

      <div className="card mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tracking number or customer name..."
              className="input pl-10"
            />
          </div>
          <button className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : filteredDispatches.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">No shipments found</p>
          <button
            onClick={() => setShowUploader(true)}
            className="button-primary mx-auto"
          >
            Create First Shipment
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Tracking #</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">City</th>
                  <th className="text-left py-3 px-4">COD</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDispatches.map((dispatch) => (
                  <tr key={dispatch.id} className="border-b border-white/5">
                    <td className="py-3 px-4 font-mono">{dispatch.tracking_number}</td>
                    <td className="py-3 px-4">{dispatch.customer_name}</td>
                    <td className="py-3 px-4">{dispatch.destination_city}</td>
                    <td className="py-3 px-4">PKR {dispatch.cod_amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs">
                        {dispatch.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(dispatch.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showUploader && (
        <CourierUploader
          onClose={() => {
            setShowUploader(false)
            fetchDispatches()
          }}
        />
      )}
    </div>
  )
}