import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HostDashboardLayout from "./layouts/HostDashboardLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import AddCompanyPage from "./pages/AddCompanyPage";
import EditCompanyPage from "./pages/EditCompanyPage";
import StatsPage from "./pages/StatsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HostLoginPage from "./pages/HostLogin";
import CollegeContactForm from "./pages/CollegeRegistration";
import ThankYouPage from "./pages/Thankyou";
import HostDashboard from "./pages/HostDashboard";
import NewUser from "./pages/NewUserRequest";

// Components
import {
  ProtectedRoute,
  HostProtectedRoute,
} from "./components/ProtectedRoute";

function App() {
  const { darkMode } = useTheme();
  const { isLoggedIn, hostIsLoggedIn} = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="register" element={<RegisterPage />} /> */}
          <Route path="host/register-new-user" element={<RegisterPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="companies/:id" element={<CompanyDetailsPage />} />
          <Route path="hostlogin" element={<HostLoginPage />} />
          <Route
            path="college-registration-data"
            element={<CollegeContactForm />}
          />
          <Route path="thankyou" element={<ThankYouPage />} />
        </Route>

        {/* Protected routes for admin dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="companies/add" element={<AddCompanyPage />} />
          <Route path="companies/:id/edit" element={<EditCompanyPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>

        {/* Protected routes for host dashboard */}
        <Route
          path="/host/dashboard"
          element={
            <HostProtectedRoute isLoggedIn={hostIsLoggedIn}>
              <HostDashboardLayout />
            </HostProtectedRoute>
          }
        >
          <Route index element={<HostDashboard />} />
          <Route path="register-new-user" element={< NewUser/>} />
          
         
        </Route>

        {/* Host registration page (signup) */}
        <Route
          path="/register"
          element={
            <HostProtectedRoute isLoggedIn={hostIsLoggedIn}>
              <RegisterPage />
            </HostProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
