import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

function RegisterPage() {
  const [formData, setFormData] = useState({
    collageName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // When the component mounts, parse query params and set them to formData
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const emailParam = params.get('email');

    setFormData((prev) => ({
      ...prev,
      collageName: nameParam || '',
      email: emailParam || '',
    }));
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const { collageName, email, password, confirmPassword } = formData;

    if (!collageName || !email || !password || !confirmPassword) {
      return setError('Please fill in all required fields');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      const result = await register({ collageName, email, password });
      if (result.success) {
        setMessage(result.message);
        setError('');
        setTimeout(() => {
          navigate('/host/dashboard');
        }, 1000);
      } else {
        setError(result.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4 py-12">
      <motion.div
        className="max-w-2xl w-full bg-white dark:bg-neutral-800 p-16 rounded-2xl shadow-xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Add new user
          </h2>
        </div>

        {(error || message) && (
          <motion.div
            className={`p-4 border rounded-md flex items-center ${
              error
                ? 'bg-error-50 border-error-200 text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-400'
                : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiAlertCircle className="h-5 w-5 mr-3" />
            <span>{error || message}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithIcon
            label="College Name"
            type="text"
            placeholder="John Doe"
            icon={FiUser}
            value={formData.collageName}
            onChange={(e) =>
              setFormData({ ...formData, collageName: e.target.value })
            }
          />

          <InputWithIcon
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={FiMail}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <InputWithIcon
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={FiLock}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <InputWithIcon
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            icon={FiLock}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 text-lg"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function InputWithIcon({ label, type, placeholder, icon: Icon, ...props }) {
  return (
    <div>
      <label className="block text-base font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-6 w-6 text-neutral-400" />
        </div>
        <input
          type={type}
          className="input pl-12 py-3 text-base"
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
