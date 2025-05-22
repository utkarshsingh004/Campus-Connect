import { createContext, useContext, useState, useEffect } from 'react'

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

  // Login function
  const login = (email, password) => {
    // This is a mock login - in a real app, you would validate with a backend
    if (email && password) {
      const user = {
        id: '1',
        name: 'College Admin',
        email,
        role: 'admin',
        college: 'Demo University'
      }
      setCurrentUser(user)
      setIsLoggedIn(true)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

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
    logout
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