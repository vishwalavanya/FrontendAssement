import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Determine where to redirect based on authentication status
  const handleBack = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.logo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M7 15V9M12 15V7M17 15V11" />
            </svg>
          </div>
          <h1>Task Manager</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.errorBox}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorTitle}>Page not found</h2>
          <p className={styles.errorMessage}>
            The page you are looking for does not exist or was moved.
          </p>

          <button onClick={handleBack} className={styles.backButton}>
            Back to {isAuthenticated ? 'dashboard' : 'login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
