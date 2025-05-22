import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCheck, FiUsers, FiBarChart2, FiClock } from 'react-icons/fi'
import { testimonials } from '../data/mockData'

function HomePage() {
  const features = [
    {
      icon: <FiUsers className="h-6 w-6 text-accent-500" />,
      title: 'Company Management',
      description: 'Easily add, edit, and manage company profiles and placement opportunities for your students.'
    },
    {
      icon: <FiBarChart2 className="h-6 w-6 text-accent-500" />,
      title: 'Analytics Dashboard',
      description: 'Get insights into placement trends, student performance, and company participation.'
    },
    {
      icon: <FiClock className="h-6 w-6 text-accent-500" />,
      title: 'Streamlined Process',
      description: 'Simplify the entire placement process from company registration to offer management.'
    }
  ]

  const benefits = [
    'Centralized placement data management',
    'Real-time analytics and reporting',
    'Company profiles and history tracking',
    'Simplified communication between college and companies',
    'Improved placement rates and student outcomes',
    'Responsive design that works on all devices'
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Streamline Your College Placement Process
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Connect students with opportunities more efficiently with our comprehensive placement management platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/companies" className="btn bg-white text-primary-800 hover:bg-neutral-100">
                  Explore Companies
                </Link>
                <Link to="/login" className="btn border border-white text-white hover:bg-white/10">
                  College Login
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-5/12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden dark:bg-neutral-800">
                <div className="px-6 py-4 bg-primary-50 border-b border-primary-100 dark:bg-primary-900/20 dark:border-primary-900/30">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                    <div className="ml-3 text-sm font-medium text-primary-800 dark:text-primary-200">Placement Dashboard</div>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Recent Placements</h3>
                    <span className="badge badge-primary">This Week</span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between dark:bg-neutral-700/30">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                            {item}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">TechSoft Solutions</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Software Engineer</p>
                          </div>
                        </div>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">₹10-12 LPA</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Companies</p>
                      <p className="text-xl font-semibold text-neutral-900 dark:text-white">35</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Offers Made</p>
                      <p className="text-xl font-semibold text-neutral-900 dark:text-white">520</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Avg. Package</p>
                      <p className="text-xl font-semibold text-neutral-900 dark:text-white">₹12.5 LPA</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Powerful Features for Colleges</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto dark:text-neutral-300">
              Everything you need to manage your campus placement process efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center mb-4 dark:bg-accent-900/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Benefits for Your Institution</h2>
              <p className="text-lg text-neutral-600 mb-6 dark:text-neutral-300">
                Our platform helps colleges streamline their placement process and achieve better outcomes for their students.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FiCheck className="h-5 w-5 text-secondary-600 mt-0.5 mr-2" />
                    <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 dark:bg-neutral-800">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Placement Success Rate</h3>
                    <span className="badge badge-secondary">2024-25</span>
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-lg bg-neutral-50 p-4 dark:bg-neutral-700/30">
                    <div className="flex h-full flex-col">
                      <div className="flex items-baseline justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Placement Rate</p>
                          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">92.5%</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Improvement</p>
                          <p className="text-2xl font-semibold text-secondary-600 dark:text-secondary-400">+15%</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-1 items-end">
                        <div className="w-full flex space-x-2">
                          <div className="flex-1 flex flex-col items-center">
                            <div className="relative w-full">
                              <div className="h-32 bg-primary-200 rounded-t-md dark:bg-primary-900/50"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-[30%] bg-primary-500 rounded-t-md dark:bg-primary-700"></div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">2022</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="relative w-full">
                              <div className="h-32 bg-primary-200 rounded-t-md dark:bg-primary-900/50"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-[20%] bg-primary-500 rounded-t-md dark:bg-primary-700"></div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">2023</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="relative w-full">
                              <div className="h-32 bg-primary-200 rounded-t-md dark:bg-primary-900/50"></div>
                              <div className="absolute bottom-0 left-0 right-0 top-[10%] bg-primary-500 rounded-t-md dark:bg-primary-700"></div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-500 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary-500 rounded-full opacity-20 dark:opacity-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">What Colleges Are Saying</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto dark:text-neutral-300">
              Hear from the institutions that have transformed their placement process with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="card p-6 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.role}, {testimonial.college}</p>
                  </div>
                </div>
                <p className="text-neutral-600 italic dark:text-neutral-300">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Placement Process?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Join hundreds of colleges that are already using our platform to streamline their placement operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="btn bg-white text-primary-800 hover:bg-neutral-100">
              Get Started Today
            </Link>
            <a href="#" className="btn border border-white text-white hover:bg-white/10">
              Request Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage