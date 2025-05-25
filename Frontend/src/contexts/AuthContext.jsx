// import { createContext, useContext, useState, useEffect } from 'react'
// import axios from 'axios'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [loading, setLoading] = useState(true)

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser))
//       setIsLoggedIn(true)
//     }
//     setLoading(false)
//   }, [])

//   // Register function with 3-second auto logout and no localStorage save
//   const register = async ({ collageName, email, password }) => {
//     try {
//       const response = await axios.post('https://campus-connect-backend-0u6m.onrender.com/api/v1/users/register', {
//         collageName,
//         email,
//         password,
//       })

//       if (response.data?.success) {
//         const user = response.data.user || {
//           id: response.data._id,
//           collageName,
//           email,
//           role: response.data.role || 'user',
//         }
//         console.log(user);
        

//         // Return a promise that resolves after 3 seconds with the success message
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             resolve({ success: true, message: 'Registration successful!' })
//           }, 3000)
//         })
//       }

//       return { success: false, message: 'Registration failed. Please try again.' }
//     } catch (err) {
//       console.error('Registration failed:', err)
//       return { success: false, message: 'An error occurred during registration.' }
//     }
//   }

//   // login function
//   const login = async (email, password) => {
//     try {
//       if (!email || !password) return false;
  
//       const response = await axios.post('http://localhost:9000/api/v1/users/login', {
//         email,
//         password,
//       });

//       console.log(response);
      
  
//       if (response.data?.success) {
//         const user =  {
//           id: response.data.data._id,
//           name: response.data.data.collageName,
//           email,
//           role: response.data.role ,
//           college: response.data.data.collageName,
//         };

//         console.log(user);
        
  
//         setCurrentUser(user);
//         setIsLoggedIn(true);
//         localStorage.setItem('user', JSON.stringify(user));
  
//         return true;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       return false;
//     }
//   };
  

//   // Logout function
//   const logout = () => {
//     setCurrentUser(null)
//     setIsLoggedIn(false)
//     localStorage.removeItem('user')
//   }

//   const value = {
//     currentUser,
//     isLoggedIn,
//     loading,
//     login,
//     logout,
//     register,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }



import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://your-production-api.com'
      : 'http://localhost:9000';

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const register = async ({ collageName, email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users/register`, {
        collageName,
        email,
        password,
      });

      if (response.data?.success) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, message: 'Registration successful!' });
          }, 3000);
        });
      }

      return { success: false, message: 'Registration failed. Please try again.' };
    } catch (err) {
      console.error('Registration failed:', err);
      return { success: false, message: 'An error occurred during registration.' };
    }
  };

  const login = async (email, password) => {

    try {
      if (!email || !password) return false;

      const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        email,
        password,
      });

      console.log(response);
      
      
      const resData = response?.data;
      

    // ✅ Check if success and user exist
    if (resData?.success) {
      const { user, accessToken, refreshToken } = resData?.data;

        const loggedInUser = {
          id: user._id,
          name: user.collageName ,
          email: user.email,
          accessToken,
          refreshToken,
        };

        console.log(loggedInUser);
        

        setCurrentUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        return true;
      }

      return false;
    } catch (err) {
      console.error('Login failed:', err?.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    isLoggedIn,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
