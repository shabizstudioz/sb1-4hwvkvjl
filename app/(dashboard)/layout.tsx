import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Package, 
  Truck, 
  BarChart3, 
  FileSpreadsheet, 
  Settings,
  LogOut 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Couriers', href: '/couriers', icon: Package },
  { name: 'Tracking', href: '/tracking', icon: Truck },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Sales Upload', href: '/sales/upload', icon: FileSpreadsheet },
  { name: 'Sales View', href: '/sales/view', icon: FileSpreadsheet },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-surface border-r border-white/10">
        <div className="p-6">
          <h2 className="text-xl font-bold">Lobocubs</h2>
        </div>
        
        <nav className="px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}