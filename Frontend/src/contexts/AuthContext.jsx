import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://campus-connect-backend-0u6m.onrender.com' 
      : 'http://localhost:9000';

  // 🔥 Helper function to fetch companies
  const fetchCompanies = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users/dashboard/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success && response.data?.data) {
        setCompanies(response.data.data);
      } else {
        console.log('Failed to fetch companies:', response.data?.message);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // 🔥 Load user & companies from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
        fetchCompanies(parsedUser.accessToken); // ⭐ fetch companies for this user
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  // 🔥 Register
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

  // 🔥 Login
  const login = async (email, password) => {
    try {
      if (!email || !password) return false;

      const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        email,
        password,
      });

      const resData = response?.data;

      if (resData?.success) {
        const { user, accessToken, refreshToken } = resData?.data;

        const loggedInUser = {
          id: user._id,
          name: user.collageName,
          email: user.email,
          accessToken,
          refreshToken,
        };

        setCurrentUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        // ⭐ Fetch companies after login
        await fetchCompanies(accessToken);

        return true;
      }

      return false;
    } catch (err) {
      console.error('Login failed:', err?.response?.data || err.message);
      return false;
    }
  };

  // 🔥 Send company data
  const sendCompanyData = async (companyData) => {
    try {
      if (!currentUser?.accessToken) {
        throw new Error('User is not authenticated');
      }

      const formData = new FormData();
      formData.append('logo', companyData.logo);
      formData.append('name', companyData.name);
      formData.append('location', companyData.location);
      formData.append('status', companyData.status);
      formData.append('industry', companyData.industry);
      formData.append('visitDate', companyData.visitDate);
      formData.append('website', companyData.website);
      formData.append('description', companyData.description);
      formData.append('process', JSON.stringify(companyData.process));
      formData.append('positions', JSON.stringify(companyData.positions));

      const response = await axios.post(
        `${BASE_URL}/api/v1/users/dashboard/companies/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      const companiesData = response?.data;

      if (companiesData?.success) {
        // ⭐ Instead of adding manually, re-fetch from server for fresh data
        await fetchCompanies(currentUser.accessToken);
        console.log('New company added and companies list refreshed!');
      } else {
        console.log('Invalid or incomplete data:', companiesData);
      }

      return companiesData;
    } catch (error) {
      console.error('Failed to send company data:', error);
      throw error;
    }
  };

  // 🔥 Logout
  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setCompanies([]); // clear companies on logout
  };

  const value = {
    currentUser,
    isLoggedIn,
    loading,
    login,
    logout,
    register,
    sendCompanyData,
    companies, // ⭐ companies available to context
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
