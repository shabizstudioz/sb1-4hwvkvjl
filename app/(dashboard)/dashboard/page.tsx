import { createClient } from '@/utils/supabase/server'
import { Package, Truck, CheckCircle, DollarSign } from 'lucide-react'
import StatsCard from '@/components/StatsCard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('tenant_id')
    .eq('id', user?.id)
    .single()

  const { count: totalShipments } = await supabase
    .from('courier_dispatches')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', userData?.tenant_id)

  const { count: pendingShipments } = await supabase
    .from('courier_dispatches')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', userData?.tenant_id)
    .eq('status', 'pending')

  const { count: deliveredShipments } = await supabase
    .from('courier_dispatches')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', userData?.tenant_id)
    .eq('status', 'delivered')

  const { data: codData } = await supabase
    .from('courier_dispatches')
    .select('cod_amount')
    .eq('tenant_id', userData?.tenant_id)
    .eq('status', 'delivered')

  const totalCOD = codData?.reduce((sum, item) => sum + (item.cod_amount || 0), 0) || 0

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Shipments"
          value={totalShipments || 0}
          icon={Package}
          trend={12.5}
        />
        <StatsCard
          title="Pending"
          value={pendingShipments || 0}
          icon={Truck}
        />
        <StatsCard
          title="Delivered"
          value={deliveredShipments || 0}
          icon={CheckCircle}
        />
        <StatsCard
          title="Total COD"
          value={`PKR ${totalCOD.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
          <p className="text-gray-400">No recent shipments</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/couriers" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Create New Shipment
            </a>
            <a href="/tracking" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Track Shipment
            </a>
            <a href="/sales/upload" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Upload Sales Data
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}