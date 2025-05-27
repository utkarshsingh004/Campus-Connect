import React from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
          Thank You!
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          We will connect soon.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary px-6 py-2"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ThankYouPage;
