import { Link } from 'react-router-dom'
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white shadow-sm dark:bg-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-900 rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-secondary-900 rotate-45 transform"></div>
              </div>
              <span className="text-xl font-bold text-primary-900 dark:text-white">Campus Connect</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Bridging the gap between educational institutions and industry leaders to create better placement opportunities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                <FiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                <FiTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                <FiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                <FiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/companies" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Companies
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {currentYear} Campus Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer