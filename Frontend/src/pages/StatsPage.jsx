import { useState } from 'react'
import { motion } from 'framer-motion'
import { placementStats } from '../data/mockData'
import { FiDownload, FiArrowUp, FiArrowDown, FiBarChart2, FiDollarSign, FiUsers } from 'react-icons/fi'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function StatsPage() {
  const [yearFilter, setYearFilter] = useState('2024-25')
  
  // Colors for charts
  const chartColors = {
    primary: '#4338CA',
    secondary: '#0D9488',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    neutralLight: '#F3F4F6',
    neutralDark: '#4B5563',
  }
  
  // Chart data for monthly tracking
  const monthlyChartData = {
    labels: placementStats.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Companies',
        data: placementStats.monthlyData.map(item => item.companies),
        backgroundColor: chartColors.primary,
        borderRadius: 4,
      },
      {
        label: 'Offers',
        data: placementStats.monthlyData.map(item => item.offers),
        backgroundColor: chartColors.secondary,
        borderRadius: 4,
      },
    ],
  }
  
  // Chart data for sector distribution
  const sectorChartData = {
    labels: placementStats.sectorData.map(item => item.sector),
    datasets: [
      {
        data: placementStats.sectorData.map(item => item.percentage),
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent,
          chartColors.success,
          chartColors.error,
        ],
        borderWidth: 0,
      },
    ],
  }
  
  // Chart data for department placement rates
  const departmentChartData = {
    labels: placementStats.departmentData.map(item => item.department),
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: placementStats.departmentData.map(item => item.placed),
        backgroundColor: chartColors.accent,
        borderColor: chartColors.accent,
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  }
  
  // Chart options
  const barChartOptions = {
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          precision: 0,
        },
      },
    },
  }
  
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F3F4F6',
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
  }
  
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F3F4F6',
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          precision: 0,
        },
        min: 50,
      },
    },
  }
  
  // Key metrics
  const metrics = [
    {
      name: 'Total Companies',
      value: placementStats.totalCompanies,
      change: '+15%',
      trend: 'up',
      icon: <FiUsers className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    },
    {
      name: 'Total Offers',
      value: placementStats.totalOffers,
      change: '+23%',
      trend: 'up',
      icon: <FiBarChart2 className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />,
    },
    {
      name: 'Highest Package',
      value: `₹${placementStats.highestPackage} LPA`,
      change: '+8%',
      trend: 'up',
      icon: <FiDollarSign className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
    },
    {
      name: 'Average Package',
      value: `₹${placementStats.averagePackage} LPA`,
      change: '+5%',
      trend: 'up',
      icon: <FiDollarSign className="h-6 w-6 text-success-600 dark:text-success-400" />,
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Placement Statistics</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Analytics and insights for your college placements
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input py-1.5 text-sm"
            >
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
          
          <button className="btn btn-outline flex items-center space-x-2">
            <FiDownload className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                {metric.icon}
              </div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center ${
                metric.trend === 'up' 
                  ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300' 
                  : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300'
              }`}>
                {metric.trend === 'up' ? (
                  <FiArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <FiArrowDown className="mr-1 h-3 w-3" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{metric.name}</p>
              <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Monthly Tracking Chart */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-6 dark:text-white">Monthly Placement Activity</h2>
        <div className="h-80">
          <Bar data={monthlyChartData} options={barChartOptions} />
        </div>
      </motion.div>
      
      {/* Sector and Department Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-6 dark:text-white">Placements by Sector</h2>
          <div className="h-64">
            <Pie data={sectorChartData} options={pieChartOptions} />
          </div>
        </motion.div>
        
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-6 dark:text-white">Department-wise Placement Rate</h2>
          <div className="h-64">
            <Line data={departmentChartData} options={lineChartOptions} />
          </div>
        </motion.div>
      </div>
      
      {/* Top Companies Table */}
      <motion.div
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Top Recruiting Companies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
                  Offers
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
                  Highest Package
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200 dark:bg-neutral-800 dark:divide-neutral-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/15013204/pexels-photo-15013204.jpeg" alt="TechSoft" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">TechSoft Solutions</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">Information Technology</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">35</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">₹12 LPA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg" alt="Global Finance" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">Global Finance Inc.</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">Finance</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">28</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">₹18 LPA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                    In Progress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg" alt="InnovateTech" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">InnovateTech</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">Technology</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">20</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">₹16 LPA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" alt="ConsultEdge" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">ConsultEdge</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">Consulting</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">15</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">₹16 LPA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg" alt="EcoSmart" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">EcoSmart Solutions</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">Renewable Energy</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">12</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">₹13 LPA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                    Confirmed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default StatsPage