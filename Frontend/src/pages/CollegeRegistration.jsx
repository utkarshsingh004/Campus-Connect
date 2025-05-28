import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function CollegeContactForm() {
  const [collegeName, setCollegeName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerCollege } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!collegeName || !email) {
      return setError('Please fill in both College Name and Email.');
    }

    try {
      setLoading(true);
      const result = await registerCollege({
        collegeName,
        email,
        contactNumber,
        role,
        address,
        notes,
      });

      if (result.success) {
        setMessage('Done');
        setError('');
        setTimeout(() => {
          navigate('/thankyou');
        }, 1000);
      } else {
        setError(result.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-md dark:bg-black">
      <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
        College Contact Form
      </h2>

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}
      {message && (
        <p className="text-green-500 font-medium">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="collegeName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            College Name <span className="text-red-500">*</span>
          </label>
          <input
            id="collegeName"
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="Enter college name"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Your Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="e.g., Placement Officer, Admin"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="Enter college address"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="input mt-1 block w-full border border-neutral-300 rounded-md shadow-sm px-3 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
            placeholder="Any additional information"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-2"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CollegeContactForm;
