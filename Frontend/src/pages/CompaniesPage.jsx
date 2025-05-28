import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiSearch, FiFilter, FiX, FiPlus, FiChevronDown, FiEdit2, FiEye } from 'react-icons/fi'

function CompaniesPage() {
  const { isLoggedIn, companies } = useAuth()
  const location = useLocation()
  const isDashboard = location.pathname.includes('/dashboard')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredCompanies, setFilteredCompanies] = useState([])
  
  // Extract unique industries for filter
  const industries = [...new Set(companies.map(company => company.industry))]
  
  // Apply filters
  useEffect(() => {
    let results = companies
    
    if (searchTerm) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (industryFilter) {
      results = results.filter(company => company.industry === industryFilter)
    }
    
    if (statusFilter) {
      results = results.filter(company => company.status === statusFilter)
    }
    
    setFilteredCompanies(results)
  }, [searchTerm, industryFilter, statusFilter])
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setIndustryFilter('')
    setStatusFilter('')
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Companies</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Browse and manage company listings for placement
          </p>
        </div>
        
        {isLoggedIn && isDashboard && (
          <div className="mt-4 sm:mt-0">
            <Link 
              to="/dashboard/companies/add" 
              className="btn btn-primary flex items-center space-x-2"
            >
              <FiPlus className="h-4 w-4" />
              <span>Add Company</span>
            </Link>
          </div>
        )}
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
              placeholder="Search companies..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center space-x-2"
            >
              <FiFilter className="h-4 w-4" />
              <span>Filters</span>
              <FiChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {(searchTerm || industryFilter || statusFilter) && (
              <button
                onClick={resetFilters}
                className="btn btn-outline flex items-center space-x-2 border-error-300 text-error-600 hover:bg-error-50 dark:border-error-700 dark:text-error-400 dark:hover:bg-error-900/20"
              >
                <FiX className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Expanded filters */}
        {showFilters && (
          <motion.div 
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label htmlFor="industry-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Industry
              </label>
              <select
                id="industry-filter"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="input mt-1"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input mt-1"
              >
                <option value="">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              className="card overflow-hidden hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="h-40 bg-neutral-200 relative overflow-hidden dark:bg-neutral-700">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                <h3 className="text-lg font-semibold text-neutral-900 mb-1 dark:text-white">{company.name}</h3>
                <p className="text-sm text-neutral-500 mb-3 dark:text-neutral-400">{company.industry}</p>
                
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2 dark:text-neutral-300">
                  {company.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 dark:text-neutral-400">Open Positions</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.positions.slice(0, 3).map((position) => (
                      <span 
                        key={position.id} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300"
                      >
                        {position.title}
                      </span>
                    ))}
                    {company.positions.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                        +{company.positions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {new Date(company.visitDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={isDashboard ? `/dashboard/companies/${company.id}` : `/companies/${company.id}`}
                      className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                      title="View Details"
                    >
                      <FiEye className="h-5 w-5" />
                    </Link>
                    
                    {isLoggedIn && isDashboard && (
                      <Link
                        to={`/dashboard/companies/${company.id}/edit`}
                        className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        title="Edit Company"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center dark:bg-neutral-800">
          <div className="mx-auto h-12 w-12 text-neutral-400">
            <FiSearch className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No companies found</h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={resetFilters}
              className="btn btn-outline"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompaniesPage
