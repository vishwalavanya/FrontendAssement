import { useState } from 'react';

// Custom hook to handle API calls consistently across the application
// Manages loading state, error state, and response data
export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic fetch function that can be reused for any API endpoint
  // Handles request/response lifecycle and error management
  const callApi = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  return { callApi, isLoading, error };
};
