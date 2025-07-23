'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { BarChart3, Package, DollarSign, TrendingUp } from 'lucide-react'
import StatsCard from '@/components/StatsCard'

export default function ReportsPage() {
  const [stats, setStats] = useState({
    totalShipments: 0,
    totalRevenue: 0,
    avgDeliveryTime: 0,
    successRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user?.id)
        .single()

      const { data: dispatches } = await supabase
        .from('courier_dispatches')
        .select('*')
        .eq('tenant_id', userData?.tenant_id)

      if (dispatches) {
        const totalRevenue = dispatches.reduce((sum, d) => sum + (d.cod_amount || 0), 0)
        const delivered = dispatches.filter(d => d.status === 'delivered').length
        const successRate = dispatches.length > 0 ? (delivered / dispatches.length) * 100 : 0

        setStats({
          totalShipments: dispatches.length,
          totalRevenue,
          avgDeliveryTime: 2.5,
          successRate,
        })
      }
    } catch (error) {
      console.error('Reports error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Shipments"
          value={stats.totalShipments}
          icon={Package}
        />
        <StatsCard
          title="Total Revenue"
          value={`PKR ${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Avg Delivery Time"
          value={`${stats.avgDeliveryTime} days`}
          icon={BarChart3}
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate.toFixed(1)}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
        <p className="text-gray-400">Charts and detailed analytics coming soon...</p>
      </div>
    </div>
  )
}