import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiPlus, FiLogOut } from 'react-icons/fi'

function HostDashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setTimeout(() => navigate('/login'), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Host Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back, {currentUser?.name || 'Host'}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link to="/dashboard/events/create" className="btn btn-primary flex items-center space-x-2">
            <FiPlus className="h-4 w-4" />
            <span>Add Event</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <motion.div
        className="card p-6 text-center text-neutral-500 dark:text-neutral-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>No data to display. Please add events to see your dashboard in action.</p>
      </motion.div>
    </div>
  )
}

export default HostDashboard
