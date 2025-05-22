import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <motion.div 
        className="max-w-lg w-full px-4 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary-900 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-secondary-900 rounded-full"></div>
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-accent-500 rounded-full"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-900 mb-4 dark:text-white">Page Not Found</h1>
        <p className="text-neutral-600 mb-8 dark:text-neutral-300">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="btn btn-primary flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2" />
            Go to Home
          </Link>
          <Link 
            to="/companies" 
            className="btn btn-outline flex items-center justify-center"
          >
            View Companies
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage