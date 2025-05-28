import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { FiMenu, FiSun, FiMoon, FiBell, FiUser, FiLogOut } from 'react-icons/fi'

function DashboardHeader({ toggleSidebar }) {
  const { currentUser, hostLogout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()

  const handleLogout = () => {
    try {
      hostLogout(); // use hostLogout instead of logout
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <header className="bg-white shadow-sm dark:bg-neutral-800 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 md:ml-0 text-lg font-semibold text-neutral-900 dark:text-white">
              {currentUser?.college || 'College Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <button
              type="button"
              className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700 relative"
              aria-label="Notifications"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white dark:ring-neutral-800"></span>
            </button>
            
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <FiUser className="h-5 w-5" />
                </div>
                <span className="hidden md:block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {currentUser?.name || 'Admin'}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <FiLogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
    </header>
  )
}

export default DashboardHeader