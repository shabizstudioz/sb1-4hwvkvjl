import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, Building, Activity, DollarSign } from 'lucide-react'
import StatsCard from '@/components/StatsCard'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== 'shoaiblilcubspk@gmail.com') {
    redirect('/dashboard')
  }

  const { count: totalTenants } = await supabase
    .from('tenants')
    .select('*', { count: 'exact', head: true })

  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const { count: totalShipments } = await supabase
    .from('courier_dispatches')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Tenants"
          value={totalTenants || 0}
          icon={Building}
        />
        <StatsCard
          title="Total Users"
          value={totalUsers || 0}
          icon={Users}
        />
        <StatsCard
          title="Total Shipments"
          value={totalShipments || 0}
          icon={Activity}
        />
        <StatsCard
          title="Revenue"
          value="PKR 0"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Tenants</h2>
          <p className="text-gray-400">No recent tenants</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">System Activity</h2>
          <p className="text-gray-400">No recent activity</p>
        </div>
      </div>
    </div>
  )
}