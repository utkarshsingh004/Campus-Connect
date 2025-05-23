import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  // Register function with 3-second auto logout and no localStorage save
  const register = async ({ collageName, email, password }) => {
    try {
      const response = await axios.post('https://campus-connect-backend-0u6m.onrender.com/api/v1/users/register', {
        collageName,
        email,
        password,
      })

      if (response.data?.success) {
        const user = response.data.user || {
          id: response.data._id,
          collageName,
          email,
          role: response.data.role || 'user',
        }

        // Return a promise that resolves after 3 seconds with the success message
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, message: 'Registration successful!' })
          }, 3000)
        })
      }

      return { success: false, message: 'Registration failed. Please try again.' }
    } catch (err) {
      console.error('Registration failed:', err)
      return { success: false, message: 'An error occurred during registration.' }
    }
  }

  // login function
  const login = async (email, password) => {
    try {
      if (!email || !password) return false;
  
      const response = await axios.post('https://campus-connect-backend-0u6m.onrender.com/api/v1/users/login', {
        email,
        password,
      });
  
      if (response.data?.success) {
        const user = response.data.user || {
          id: response.data._id,
          name: response.data.name || 'User',
          email,
          role: response.data.role || 'user',
          college: response.data.collegeName || '',
        };
  
        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
  
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };
  

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  const value = {
    currentUser,
    isLoggedIn,
    loading,
    login,
    logout,
    register,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
