import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUsers, FiCalendar, FiPlusCircle, FiSettings, FiX } from 'react-icons/fi'

function HostSidebar({ open, toggleSidebar }) {
  const { currentHost } = useAuth()

  const navItems = [
    { path: '/host/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/host/dashboard/register-new-user', icon: <FiPlusCircle />, label: 'Add new user' },
  ]

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-black md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform dark:bg-neutral-800 md:translate-x-0 transition-transform ease-in-out duration-200 ${
            open ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:z-0`}
          initial={false}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-900 rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-secondary-900 rotate-45 transform"></div>
                </div>
                <span className="text-lg font-bold text-primary-900 dark:text-white">Host Portal</span>
              </div>
              <button
                className="md:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                onClick={toggleSidebar}
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Host info */}
            <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide dark:text-neutral-400">Host</p>
              <h2 className="mt-1 text-sm font-medium text-neutral-900 dark:text-white">{currentHost?.name || 'Host'}</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar()
                    }
                  }}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User info */}
            <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {currentHost?.name?.charAt(0) || 'H'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-800 dark:text-white">
                    { currentHost?.name || 'Host User'}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    { currentHost?.email || 'host@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  )
}

export default HostSidebar
