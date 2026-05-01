'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutWrapper({ 
  children, 
  userProfile 
}: { 
  children: React.ReactNode
  userProfile: any 
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar userProfile={userProfile} />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!isAdminRoute && <Footer />}
    </div>
  )
}
