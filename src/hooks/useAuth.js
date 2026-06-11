import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// This custom hook provides easy access to auth context throughout the application
// It handles the context consumer pattern for cleaner component code
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
