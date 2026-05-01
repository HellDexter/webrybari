import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, first_name, last_name')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'administrator' && profile.role !== 'superuser')) {
    redirect('/')
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <AdminSidebar profile={profile} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
