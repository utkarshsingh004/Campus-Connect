import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentHost, setCurrentHost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostIsLoggedIn, setHostIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://campus-connect-backend-0u6m.onrender.com'
      : 'http://localhost:9000';

  const fetchCompanies = async (token) => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/users/dashboard/companies`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.success && response.data?.data) {
        setCompanies(response.data.data);
        console.log('Fetched companies:', response.data.data);
      } else {
        console.log('Failed to fetch companies:', response.data?.message);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = currentHost?.accessToken;
      if (!token) throw new Error('Host is not authenticated');

      const response = await axios.get(`${BASE_URL}/api/v1/host/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && response.data?.data) {
        setAllUsers(response.data.data);
      } else {
        console.log('Failed to fetch users:', response.data?.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchNewUsers = async () => {
    try {
      const token = currentHost?.accessToken;
      if (!token) throw new Error('Host is not authenticated');

      const response = await axios.get(`${BASE_URL}/api/v1/host/new-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && response.data?.data) {
        setNewUsers(response.data.data);
        console.log('New users fetched successfully!');
      } else {
        console.log('Failed to fetch new users:', response.data?.message);
      }
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedHost = localStorage.getItem('host');

    try {
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
        setHostIsLoggedIn(false);
        fetchCompanies(parsedUser.accessToken);
      }

      if (storedHost && storedHost !== 'undefined') {
        const parsedHost = JSON.parse(storedHost);
        setCurrentHost(parsedHost);
        setIsLoggedIn(true);
        setHostIsLoggedIn(true);
        fetchCompanies(parsedHost.accessToken);
      }
    } catch (error) {
      console.error('Failed to parse stored user/host:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('host');
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
        return { success: true, message: 'Registration successful!' };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    } catch (err) {
      console.error('Registration failed:', err);
      return { success: false, message: 'An error occurred during registration.' };
    }
  };

  const registerCollege = async ({
    collegeName,
    email,
    contactNumber,
    role,
    address,
    notes,
  }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/college-registration-data`,
        {
          collegeName,
          email,
          contactNumber,
          role,
          address,
          notes,
        }
      );

      if (response.data?.success) {
        return { success: true, message: 'College registration successful!' };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    } catch (err) {
      console.error('College registration failed:', err);
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
        setHostIsLoggedIn(false);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.removeItem('host');
        setCurrentHost(null);

        await fetchCompanies(accessToken);

        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err?.response?.data || err.message);
      return false;
    }
  };

  const hostLogin = async (email, password) => {
    try {
      if (!email || !password) return false;

      const response = await axios.post(`${BASE_URL}/api/v1/host/login`, {
        email,
        password,
      });
      const resData = response?.data;

      if (resData?.success) {
        const { host, accessToken, refreshToken } = resData?.data;

        const loggedInHost = {
          id: host._id,
          name: host.name,
          email: host.email,
          accessToken,
          refreshToken,
        };

        setCurrentHost(loggedInHost);
        setIsLoggedIn(false);
        setHostIsLoggedIn(true);
        localStorage.setItem('host', JSON.stringify(loggedInHost));
        localStorage.removeItem('user');
        setCurrentUser(null);

        await fetchCompanies(accessToken);

        return true;
      }
      return false;
    } catch (err) {
      console.error('Host login failed:', err?.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setHostIsLoggedIn(false);
    localStorage.removeItem('user');
    setCompanies([]);
  };

  const hostLogout = () => {
    setCurrentHost(null);
    setIsLoggedIn(false);
    setHostIsLoggedIn(false);
    localStorage.removeItem('host');
    setCompanies([]);
  };

  const sendCompanyData = async (companyData) => {
    try {
      const token = currentUser?.accessToken || currentHost?.accessToken;
      if (!token) throw new Error('User or host is not authenticated');

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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const companiesData = response?.data;

      if (companiesData?.success) {
        await fetchCompanies(token);
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentHost,
        isLoggedIn,
        hostIsLoggedIn,
        loading,
        login,
        logout,
        register,
        sendCompanyData,
        companies,
        hostLogin,
        hostLogout,
        setCurrentHost,
        registerCollege,
        fetchAllUsers,
        allUsers,
        fetchNewUsers,
        newUsers,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
