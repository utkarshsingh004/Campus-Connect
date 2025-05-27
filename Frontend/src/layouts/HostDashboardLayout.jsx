import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HostSidebar from '../components/HostSidebar'
import HostHeader from '../components/HostDashboardHeader'

function HostDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      <HostSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HostDashboardLayout
