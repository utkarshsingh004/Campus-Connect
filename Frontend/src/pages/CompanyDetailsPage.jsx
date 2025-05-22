import { useState, useEffect } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { companies } from '../data/mockData'
import { FiArrowLeft, FiEdit2, FiExternalLink, FiMapPin, FiCalendar, FiBriefcase, FiDollarSign, FiCheckCircle, FiClock, FiList } from 'react-icons/fi'

function CompanyDetailsPage() {
  const { id } = useParams()
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isDashboard = location.pathname.includes('/dashboard')
  
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPosition, setSelectedPosition] = useState(null)
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundCompany = companies.find(c => c.id === id)
    
    if (foundCompany) {
      setCompany(foundCompany)
      setSelectedPosition(foundCompany.positions[0])
    } else {
      // Handle not found
      navigate(isDashboard ? '/dashboard/companies' : '/companies')
    }
    
    setLoading(false)
  }, [id, navigate, isDashboard])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (!company) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Company not found</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">The company you're looking for doesn't exist or has been removed.</p>
        <Link 
          to={isDashboard ? "/dashboard/companies" : "/companies"} 
          className="mt-4 btn btn-primary inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Companies
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Back button and actions */}
      <div className="flex items-center justify-between">
        <Link 
          to={isDashboard ? "/dashboard/companies" : "/companies"} 
          className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
        
        {isLoggedIn && isDashboard && (
          <Link 
            to={`/dashboard/companies/${id}/edit`} 
            className="btn btn-outline flex items-center space-x-2"
          >
            <FiEdit2 className="h-4 w-4" />
            <span>Edit Company</span>
          </Link>
        )}
      </div>
      
      {/* Company header */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-48 bg-neutral-200 relative dark:bg-neutral-700">
          <img 
            src={company.logo} 
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-white">{company.name}</h1>
              <p className="text-white/80 flex items-center mt-1">
                <FiMapPin className="mr-1 h-4 w-4" />
                {company.location}
              </p>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              company.status === 'Confirmed' 
                ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' 
                : company.status === 'Pending' 
                  ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300'
                  : company.status === 'In Progress'
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
            }`}>
              {company.status}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                {company.industry}
              </div>
              <div className="mt-2 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <FiCalendar className="mr-1 h-4 w-4" />
                <span>Visit Date: {new Date(company.visitDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Visit Website
              <FiExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="prose max-w-none dark:prose-invert">
            <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">About {company.name}</h2>
            <p className="text-neutral-700 dark:text-neutral-300">{company.description}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Positions and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Position list */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="font-semibold text-neutral-900 dark:text-white">Open Positions</h2>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {company.positions.map((position) => (
                <button
                  key={position.id}
                  className={`w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 ${
                    selectedPosition && selectedPosition.id === position.id 
                      ? 'bg-primary-50 dark:bg-primary-900/20' 
                      : ''
                  }`}
                  onClick={() => setSelectedPosition(position)}
                >
                  <h3 className={`font-medium ${
                    selectedPosition && selectedPosition.id === position.id 
                      ? 'text-primary-700 dark:text-primary-300' 
                      : 'text-neutral-900 dark:text-white'
                  }`}>
                    {position.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">
                    {position.department} • {position.openings} openings
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <FiDollarSign className="mr-1 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-neutral-700 dark:text-neutral-300">{position.ctc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Position details */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {selectedPosition && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{selectedPosition.title}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                    {selectedPosition.department}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                    {selectedPosition.type}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                    {selectedPosition.experience}
                  </span>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3 dark:text-neutral-400">
                    Position Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiBriefcase className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 dark:text-neutral-400" />
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Package</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedPosition.ctc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiCheckCircle className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 dark:text-neutral-400" />
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Eligibility</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">{selectedPosition.eligibility}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiClock className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 dark:text-neutral-400" />
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Application Deadline</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {new Date(selectedPosition.deadline).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3 dark:text-neutral-400">
                    Skills & Requirements
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiList className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 dark:text-neutral-400" />
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Required Skills</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedPosition.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-neutral-50 dark:bg-neutral-700/30">
                <h3 className="text-sm font-medium text-neutral-900 mb-3 dark:text-white">Selection Process</h3>
                <ol className="space-y-2">
                  {company.process.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-3 dark:bg-primary-900/20 dark:text-primary-300">
                        {index + 1}
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyDetailsPage