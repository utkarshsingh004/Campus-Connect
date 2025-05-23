// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useAuth } from '../contexts/AuthContext'
// import { companies, placementStats } from '../data/mockData'
// import { FiPlus, FiArrowRight, FiUser, FiBriefcase, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
// import { Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// function DashboardPage() {
//   const { currentUser } = useAuth()
//   const [timeFilter, setTimeFilter] = useState('all')
  
//   // Chart data for companies and offers
//   const chartData = {
//     labels: placementStats.monthlyData.map(item => item.month),
//     datasets: [
//       {
//         label: 'Companies',
//         data: placementStats.monthlyData.map(item => item.companies),
//         backgroundColor: '#4338CA',
//         borderRadius: 4,
//       },
//       {
//         label: 'Offers',
//         data: placementStats.monthlyData.map(item => item.offers),
//         backgroundColor: '#0D9488',
//         borderRadius: 4,
//       },
//     ],
//   }
  
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//         },
//       },
//       tooltip: {
//         backgroundColor: '#1F2937',
//         titleColor: '#F9FAFB',
//         bodyColor: '#F3F4F6',
//         padding: 12,
//         boxPadding: 8,
//         cornerRadius: 8,
//         displayColors: true,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           color: '#E5E7EB',
//         },
//         ticks: {
//           precision: 0,
//         },
//       },
//     },
//   }
  
//   // Get upcoming companies (next 30 days)
//   const currentDate = new Date()
//   const upcomingCompanies = companies
//     .filter(company => {
//       const visitDate = new Date(company.visitDate)
//       const diffTime = visitDate - currentDate
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//       return diffDays > 0 && diffDays <= 30 && company.status !== 'Canceled'
//     })
//     .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
//     .slice(0, 5)
  
//   const recentCompanies = companies
//     .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
//     .slice(0, 5)
  
//   // Stats for cards
//   const stats = [
//     {
//       id: 1,
//       name: 'Total Companies',
//       value: placementStats.totalCompanies,
//       icon: <FiBriefcase className="h-6 w-6 text-primary-600" />,
//       bgColor: 'bg-primary-50',
//       iconColor: 'text-primary-600',
//       dark: {
//         bgColor: 'dark:bg-primary-900/20',
//         iconColor: 'dark:text-primary-400',
//       }
//     },
//     {
//       id: 2,
//       name: 'Total Offers',
//       value: placementStats.totalOffers,
//       icon: <FiUser className="h-6 w-6 text-secondary-600" />,
//       bgColor: 'bg-secondary-50',
//       iconColor: 'text-secondary-600',
//       dark: {
//         bgColor: 'dark:bg-secondary-900/20',
//         iconColor: 'dark:text-secondary-400',
//       }
//     },
//     {
//       id: 3,
//       name: 'Highest Package',
//       value: `₹${placementStats.highestPackage} LPA`,
//       icon: <FiDollarSign className="h-6 w-6 text-accent-600" />,
//       bgColor: 'bg-accent-50',
//       iconColor: 'text-accent-600',
//       dark: {
//         bgColor: 'dark:bg-accent-900/20',
//         iconColor: 'dark:text-accent-400',
//       }
//     },
//     {
//       id: 4,
//       name: 'Average Package',
//       value: `₹${placementStats.averagePackage} LPA`,
//       icon: <FiTrendingUp className="h-6 w-6 text-success-600" />,
//       bgColor: 'bg-success-50',
//       iconColor: 'text-success-600',
//       dark: {
//         bgColor: 'dark:bg-success-900/20',
//         iconColor: 'dark:text-success-400',
//       }
//     },
//   ]
  
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
//           <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
//             Welcome back, {currentUser?.name || 'Admin'}
//           </p>
//         </div>
        
//         <div className="mt-4 sm:mt-0">
//           <Link 
//             to="/dashboard/companies/add" 
//             className="btn btn-primary flex items-center space-x-2"
//           >
//             <FiPlus className="h-4 w-4" />
//             <span>Add Company</span>
//           </Link>
//         </div>
//       </div>
      
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <motion.div
//             key={stat.id}
//             className={`card p-6 hover:shadow-md ${stat.bgColor} ${stat.dark.bgColor}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: stat.id * 0.1 }}
//           >
//             <div className="flex items-center">
//               <div className={`p-3 rounded-lg ${stat.iconColor} ${stat.dark.iconColor}`}>
//                 {stat.icon}
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.name}</p>
//                 <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stat.value}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
      
//       {/* Chart */}
//       <motion.div
//         className="card p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.5 }}
//       >
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//           <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Placement Activity</h2>
          
//           <div className="mt-3 sm:mt-0 flex space-x-2">
//             <button
//               className={`px-3 py-1 text-sm rounded-md ${
//                 timeFilter === 'month' 
//                   ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
//                   : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
//               }`}
//               onClick={() => setTimeFilter('month')}
//             >
//               Month
//             </button>
//             <button
//               className={`px-3 py-1 text-sm rounded-md ${
//                 timeFilter === 'quarter' 
//                   ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
//                   : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
//               }`}
//               onClick={() => setTimeFilter('quarter')}
//             >
//               Quarter
//             </button>
//             <button
//               className={`px-3 py-1 text-sm rounded-md ${
//                 timeFilter === 'all' 
//                   ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
//                   : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
//               }`}
//               onClick={() => setTimeFilter('all')}
//             >
//               All
//             </button>
//           </div>
//         </div>
        
//         <div className="h-72">
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </motion.div>
      
//       {/* Upcoming & Recent Companies */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Upcoming Companies */}
//         <motion.div
//           className="card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.6 }}
//         >
//           <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
//             <div className="flex items-center justify-between">
//               <h2 className="font-semibold text-neutral-900 dark:text-white">Upcoming Companies</h2>
//               <Link 
//                 to="/dashboard/companies" 
//                 className="text-sm text-primary-600 hover:text-primary-500 flex items-center dark:text-primary-400 dark:hover:text-primary-300"
//               >
//                 View all
//                 <FiArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//           </div>
          
//           <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
//             {upcomingCompanies.length > 0 ? (
//               upcomingCompanies.map((company) => (
//                 <div key={company.id} className="px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                       <img 
//                         src={company.logo} 
//                         alt={company.name} 
//                         className="h-10 w-10 rounded-md object-cover"
//                       />
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{company.name}</h3>
//                       <p className="text-xs text-neutral-500 dark:text-neutral-400">
//                         {new Date(company.visitDate).toLocaleDateString('en-US', { 
//                           year: 'numeric', 
//                           month: 'short', 
//                           day: 'numeric' 
//                         })}
//                       </p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         company.status === 'Confirmed' 
//                           ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' 
//                           : company.status === 'Pending' 
//                             ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300'
//                             : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
//                       }`}>
//                         {company.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="px-6 py-8 text-center">
//                 <p className="text-neutral-500 dark:text-neutral-400">No upcoming companies in the next 30 days</p>
//               </div>
//             )}
//           </div>
//         </motion.div>
        
//         {/* Recent Companies */}
//         <motion.div
//           className="card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.7 }}
//         >
//           <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
//             <div className="flex items-center justify-between">
//               <h2 className="font-semibold text-neutral-900 dark:text-white">Recent Additions</h2>
//               <Link 
//                 to="/dashboard/companies" 
//                 className="text-sm text-primary-600 hover:text-primary-500 flex items-center dark:text-primary-400 dark:hover:text-primary-300"
//               >
//                 View all
//                 <FiArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//           </div>
          
//           <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
//             {recentCompanies.map((company) => (
//               <div key={company.id} className="px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img 
//                       src={company.logo} 
//                       alt={company.name} 
//                       className="h-10 w-10 rounded-md object-cover"
//                     />
//                   </div>
//                   <div className="ml-4 flex-1">
//                     <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{company.name}</h3>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {company.positions.slice(0, 2).map((position, index) => (
//                         <span 
//                           key={position.id} 
//                           className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300"
//                         >
//                           {position.title}
//                           {position.openings > 1 && ` (${position.openings})`}
//                         </span>
//                       ))}
//                       {company.positions.length > 2 && (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
//                           +{company.positions.length - 2} more
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex-shrink-0">
//                     <Link 
//                       to={`/dashboard/companies/${company.id}`} 
//                       className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
//                     >
//                       <FiArrowRight className="h-5 w-5" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default DashboardPage

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { companies, placementStats } from '../data/mockData'
import { FiPlus, FiArrowRight, FiUser, FiBriefcase, FiDollarSign, FiTrendingUp, FiLogOut } from 'react-icons/fi'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function DashboardPage() {
  const { currentUser, logout } = useAuth()
  const [timeFilter, setTimeFilter] = useState('all')
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setTimeout(() => {
      navigate('/login')
    }, 3000)
  }

  const chartData = {
    labels: placementStats.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Companies',
        data: placementStats.monthlyData.map(item => item.companies),
        backgroundColor: '#4338CA',
        borderRadius: 4,
      },
      {
        label: 'Offers',
        data: placementStats.monthlyData.map(item => item.offers),
        backgroundColor: '#0D9488',
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F3F4F6',
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: '#E5E7EB' },
        ticks: { precision: 0 },
      },
    },
  }

  const currentDate = new Date()
  const upcomingCompanies = companies
    .filter(company => {
      const visitDate = new Date(company.visitDate)
      const diffTime = visitDate - currentDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 && diffDays <= 30 && company.status !== 'Canceled'
    })
    .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
    .slice(0, 5)

  const recentCompanies = companies
    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
    .slice(0, 5)

  const stats = [
    {
      id: 1,
      name: 'Total Companies',
      value: placementStats.totalCompanies,
      icon: <FiBriefcase className="h-6 w-6 text-primary-600" />,
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      dark: {
        bgColor: 'dark:bg-primary-900/20',
        iconColor: 'dark:text-primary-400',
      }
    },
    {
      id: 2,
      name: 'Total Offers',
      value: placementStats.totalOffers,
      icon: <FiUser className="h-6 w-6 text-secondary-600" />,
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
      dark: {
        bgColor: 'dark:bg-secondary-900/20',
        iconColor: 'dark:text-secondary-400',
      }
    },
    {
      id: 3,
      name: 'Highest Package',
      value: `₹${placementStats.highestPackage} LPA`,
      icon: <FiDollarSign className="h-6 w-6 text-accent-600" />,
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      dark: {
        bgColor: 'dark:bg-accent-900/20',
        iconColor: 'dark:text-accent-400',
      }
    },
    {
      id: 4,
      name: 'Average Package',
      value: `₹${placementStats.averagePackage} LPA`,
      icon: <FiTrendingUp className="h-6 w-6 text-success-600" />,
      bgColor: 'bg-success-50',
      iconColor: 'text-success-600',
      dark: {
        bgColor: 'dark:bg-success-900/20',
        iconColor: 'dark:text-success-400',
      }
    },
  ]

  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back, {currentUser?.collageName || 'Admin'}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link 
            to="/dashboard/companies/add" 
            className="btn btn-primary flex items-center space-x-2"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Company</span>
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

      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className={`card p-6 hover:shadow-md ${stat.bgColor} ${stat.dark.bgColor}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.iconColor} ${stat.dark.iconColor}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.name}</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Chart */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Placement Activity</h2>
          
          <div className="mt-3 sm:mt-0 flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                timeFilter === 'month' 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setTimeFilter('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                timeFilter === 'quarter' 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setTimeFilter('quarter')}
            >
              Quarter
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                timeFilter === 'all' 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setTimeFilter('all')}
            >
              All
            </button>
          </div>
        </div>
        
        <div className="h-72">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>
      
      {/* Upcoming & Recent Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Companies */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900 dark:text-white">Upcoming Companies</h2>
              <Link 
                to="/dashboard/companies" 
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all
                <FiArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {upcomingCompanies.length > 0 ? (
              upcomingCompanies.map((company) => (
                <div key={company.id} className="px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{company.name}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(company.visitDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        company.status === 'Confirmed' 
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' 
                          : company.status === 'Pending' 
                            ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300'
                            : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
                      }`}>
                        {company.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">No upcoming companies in the next 30 days</p>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Recent Companies */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900 dark:text-white">Recent Additions</h2>
              <Link 
                to="/dashboard/companies" 
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all
                <FiArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {recentCompanies.map((company) => (
              <div key={company.id} className="px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{company.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {company.positions.slice(0, 2).map((position, index) => (
                        <span 
                          key={position.id} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300"
                        >
                          {position.title}
                          {position.openings > 1 && ` (${position.openings})`}
                        </span>
                      ))}
                      {company.positions.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">
                          +{company.positions.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link 
                      to={`/dashboard/companies/${company.id}`} 
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <FiArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </>
  )
}

export default DashboardPage
