import { Settings, User, Key, Database, FileText, Users } from 'lucide-react'
import Link from 'next/link'

const settingsItems = [
  { title: 'Account', description: 'Manage your profile', icon: User, href: '/settings/account' },
  { title: 'API Configuration', description: 'Configure courier APIs', icon: Key, href: '/settings/apis' },
  { title: 'Backup', description: 'Backup your data', icon: Database, href: '/settings/backup' },
  { title: 'Prompts', description: 'Customize AI prompts', icon: FileText, href: '/settings/prompts' },
  { title: 'Team', description: 'Manage team members', icon: Users, href: '/settings/team' },
]

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="card hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}