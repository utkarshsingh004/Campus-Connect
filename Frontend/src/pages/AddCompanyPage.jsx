import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiTrash2, FiX, FiCheck } from 'react-icons/fi'

function AddCompanyPage() {
  const navigate = useNavigate()
  
  const [company, setCompany] = useState({
    name: '',
    logo: '',
    industry: '',
    description: '',
    website: '',
    location: '',
    positions: [
      {
        id: crypto.randomUUID(),
        title: '',
        department: '',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '',
        eligibility: '',
        skills: [],
        deadline: '',
        openings: 1
      }
    ],
    process: ['Online Aptitude Test', 'Technical Interview', 'HR Interview'],
    visitDate: '',
    status: 'Pending'
  })
  
  const [currentSkill, setCurrentSkill] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  // Update company info
  const handleChange = (e) => {
    const { name, value } = e.target
    setCompany({
      ...company,
      [name]: value
    })
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  // Update position info
  const handlePositionChange = (e, index) => {
    const { name, value } = e.target
    const updatedPositions = [...company.positions]
    updatedPositions[index] = {
      ...updatedPositions[index],
      [name]: value
    }
    
    setCompany({
      ...company,
      positions: updatedPositions
    })
    
    // Clear error for this field
    if (errors[`positions.${index}.${name}`]) {
      setErrors({
        ...errors,
        [`positions.${index}.${name}`]: ''
      })
    }
  }
  
  // Add skill to position
  const handleAddSkill = (index) => {
    if (!currentSkill.trim()) return
    
    const updatedPositions = [...company.positions]
    updatedPositions[index] = {
      ...updatedPositions[index],
      skills: [...updatedPositions[index].skills, currentSkill.trim()]
    }
    
    setCompany({
      ...company,
      positions: updatedPositions
    })
    
    setCurrentSkill('')
  }
  
  // Remove skill from position
  const handleRemoveSkill = (positionIndex, skillIndex) => {
    const updatedPositions = [...company.positions]
    updatedPositions[positionIndex].skills = updatedPositions[positionIndex].skills.filter((_, idx) => idx !== skillIndex)
    
    setCompany({
      ...company,
      positions: updatedPositions
    })
  }
  
  // Add new position
  const handleAddPosition = () => {
    setCompany({
      ...company,
      positions: [
        ...company.positions,
        {
          id: crypto.randomUUID(),
          title: '',
          department: '',
          type: 'Full-time',
          experience: 'Entry Level',
          ctc: '',
          eligibility: '',
          skills: [],
          deadline: '',
          openings: 1
        }
      ]
    })
  }
  
  // Remove position
  const handleRemovePosition = (index) => {
    if (company.positions.length === 1) {
      return // Keep at least one position
    }
    
    const updatedPositions = company.positions.filter((_, idx) => idx !== index)
    setCompany({
      ...company,
      positions: updatedPositions
    })
  }
  
  // Add or remove selection process step
  const handleProcessChange = (e, index) => {
    const value = e.target.value
    const updatedProcess = [...company.process]
    updatedProcess[index] = value
    
    setCompany({
      ...company,
      process: updatedProcess
    })
  }
  
  const handleAddProcessStep = () => {
    setCompany({
      ...company,
      process: [...company.process, '']
    })
  }
  
  const handleRemoveProcessStep = (index) => {
    if (company.process.length === 1) {
      return // Keep at least one step
    }
    
    const updatedProcess = company.process.filter((_, idx) => idx !== index)
    setCompany({
      ...company,
      process: updatedProcess
    })
  }
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {}
    
    // Validate company fields
    if (!company.name.trim()) {
      newErrors.name = 'Company name is required'
    }
    if (!company.logo.trim()) {
      newErrors.logo = 'Logo URL is required'
    }
    if (!company.industry.trim()) {
      newErrors.industry = 'Industry is required'
    }
    if (!company.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!company.location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (!company.visitDate) {
      newErrors.visitDate = 'Visit date is required'
    }
    
    // Validate each position
    company.positions.forEach((position, index) => {
      if (!position.title.trim()) {
        newErrors[`positions.${index}.title`] = 'Job title is required'
      }
      if (!position.department.trim()) {
        newErrors[`positions.${index}.department`] = 'Department is required'
      }
      if (!position.ctc.trim()) {
        newErrors[`positions.${index}.ctc`] = 'CTC is required'
      }
      if (!position.eligibility.trim()) {
        newErrors[`positions.${index}.eligibility`] = 'Eligibility criteria is required'
      }
      if (position.skills.length === 0) {
        newErrors[`positions.${index}.skills`] = 'At least one skill is required'
      }
      if (!position.deadline) {
        newErrors[`positions.${index}.deadline`] = 'Application deadline is required'
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // In a real app, this would be an API call
    console.log('Company data to submit:', company)
    
    // Show success message
    setSuccessMessage('Company added successfully!')
    
    // Clear form or redirect
    setTimeout(() => {
      navigate('/dashboard/companies')
    }, 2000)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard/companies" 
          className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Add New Company</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Enter the details of the company visiting for campus placements.
          </p>
        </div>
        
        {successMessage && (
          <motion.div
            className="m-6 p-4 bg-success-50 border border-success-200 rounded-md flex items-center text-success-700 dark:bg-success-900/20 dark:border-success-800 dark:text-success-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiCheck className="h-5 w-5 mr-3" />
            <span>{successMessage}</span>
          </motion.div>
        )}
        
        {Object.keys(errors).length > 0 && (
          <motion.div
            className="m-6 p-4 bg-error-50 border border-error-200 rounded-md text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center mb-2">
              <FiX className="h-5 w-5 mr-3" />
              <span className="font-medium">Please correct the following errors:</span>
            </div>
            <ul className="ml-8 list-disc space-y-1 text-sm">
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-8">
            {/* Company Information */}
            <div>
              <h2 className="text-lg font-medium text-neutral-900 mb-4 dark:text-white">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    className={`mt-1 input ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-error-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Logo URL*
                  </label>
                  <input
                    type="text"
                    id="logo"
                    name="logo"
                    value={company.logo}
                    onChange={handleChange}
                    className={`mt-1 input ${errors.logo ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="https://example.com/logo.png"
                  />
                  {errors.logo && <p className="mt-1 text-sm text-error-600">{errors.logo}</p>}
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Industry*
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={company.industry}
                    onChange={handleChange}
                    className={`mt-1 input ${errors.industry ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="e.g. Information Technology, Finance, etc."
                  />
                  {errors.industry && <p className="mt-1 text-sm text-error-600">{errors.industry}</p>}
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Website URL
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={company.website}
                    onChange={handleChange}
                    className="mt-1 input"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Location*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={company.location}
                    onChange={handleChange}
                    className={`mt-1 input ${errors.location ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="e.g. Bangalore, India"
                  />
                  {errors.location && <p className="mt-1 text-sm text-error-600">{errors.location}</p>}
                </div>
                
                <div>
                  <label htmlFor="visitDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Visit Date*
                  </label>
                  <input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={company.visitDate}
                    onChange={handleChange}
                    className={`mt-1 input ${errors.visitDate ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                  />
                  {errors.visitDate && <p className="mt-1 text-sm text-error-600">{errors.visitDate}</p>}
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={company.status}
                    onChange={handleChange}
                    className="mt-1 input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={company.description}
                  onChange={handleChange}
                  className={`mt-1 input ${errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                  placeholder="Brief description of the company..."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-error-600">{errors.description}</p>}
              </div>
            </div>
            
            {/* Selection Process */}
            <div>
              <h2 className="text-lg font-medium text-neutral-900 mb-4 dark:text-white">Selection Process</h2>
              
              {company.process.map((step, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-3 dark:bg-primary-900/20 dark:text-primary-300">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleProcessChange(e, index)}
                    className="input flex-1"
                    placeholder={`Selection step ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProcessStep(index)}
                    className="ml-2 p-2 text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleAddProcessStep}
                className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <FiPlus className="mr-1 h-4 w-4" />
                Add Step
              </button>
            </div>
            
            {/* Job Positions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Job Positions</h2>
                <button
                  type="button"
                  onClick={handleAddPosition}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <FiPlus className="mr-1 h-4 w-4" />
                  Add Position
                </button>
              </div>
              
              {company.positions.map((position, positionIndex) => (
                <div 
                  key={position.id} 
                  className="mb-8 p-6 border border-neutral-200 rounded-lg dark:border-neutral-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium text-neutral-900 dark:text-white">
                      Position {positionIndex + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(positionIndex)}
                      className="p-2 text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                      disabled={company.positions.length === 1}
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`title-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Job Title*
                      </label>
                      <input
                        type="text"
                        id={`title-${positionIndex}`}
                        name="title"
                        value={position.title}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className={`mt-1 input ${errors[`positions.${positionIndex}.title`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="e.g. Software Engineer"
                      />
                      {errors[`positions.${positionIndex}.title`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.title`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`department-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Department*
                      </label>
                      <input
                        type="text"
                        id={`department-${positionIndex}`}
                        name="department"
                        value={position.department}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className={`mt-1 input ${errors[`positions.${positionIndex}.department`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="e.g. Engineering, Finance"
                      />
                      {errors[`positions.${positionIndex}.department`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.department`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`type-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Employment Type
                      </label>
                      <select
                        id={`type-${positionIndex}`}
                        name="type"
                        value={position.type}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className="mt-1 input"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor={`experience-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Experience Level
                      </label>
                      <select
                        id={`experience-${positionIndex}`}
                        name="experience"
                        value={position.experience}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className="mt-1 input"
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Internship">Internship</option>
                        <option value="Mid Level">Mid Level</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor={`ctc-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        CTC/Package*
                      </label>
                      <input
                        type="text"
                        id={`ctc-${positionIndex}`}
                        name="ctc"
                        value={position.ctc}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className={`mt-1 input ${errors[`positions.${positionIndex}.ctc`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="e.g. 8-12 LPA"
                      />
                      {errors[`positions.${positionIndex}.ctc`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.ctc`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`openings-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Number of Openings
                      </label>
                      <input
                        type="number"
                        id={`openings-${positionIndex}`}
                        name="openings"
                        min="1"
                        value={position.openings}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`deadline-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Application Deadline*
                      </label>
                      <input
                        type="date"
                        id={`deadline-${positionIndex}`}
                        name="deadline"
                        value={position.deadline}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className={`mt-1 input ${errors[`positions.${positionIndex}.deadline`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                      />
                      {errors[`positions.${positionIndex}.deadline`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.deadline`]}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor={`eligibility-${positionIndex}`} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Eligibility Criteria*
                      </label>
                      <textarea
                        id={`eligibility-${positionIndex}`}
                        name="eligibility"
                        rows={2}
                        value={position.eligibility}
                        onChange={(e) => handlePositionChange(e, positionIndex)}
                        className={`mt-1 input ${errors[`positions.${positionIndex}.eligibility`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="e.g. B.Tech/M.Tech in CS/IT with min. 7.5 CGPA"
                      ></textarea>
                      {errors[`positions.${positionIndex}.eligibility`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.eligibility`]}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Required Skills*
                      </label>
                      
                      <div className="mt-1 flex">
                        <input
                          type="text"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(positionIndex))}
                          className={`input flex-1 ${errors[`positions.${positionIndex}.skills`] ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                          placeholder="Add a skill and press Enter"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkill(positionIndex)}
                          className="ml-2 btn btn-primary"
                        >
                          Add
                        </button>
                      </div>
                      
                      {errors[`positions.${positionIndex}.skills`] && (
                        <p className="mt-1 text-sm text-error-600">{errors[`positions.${positionIndex}.skills`]}</p>
                      )}
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {position.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(positionIndex, skillIndex)}
                              className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-100"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <Link 
                to="/dashboard/companies" 
                className="btn btn-outline mr-4"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Company
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCompanyPage