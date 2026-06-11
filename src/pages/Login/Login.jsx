import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError('');

  const errors = validateForm();
  setValidationErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  try {
    // Only allow this email and password
    if (
      email !== 'sara@example.com' ||
      password !== 'user123'
    ) {
      setApiError('Invalid email or password');
      return;
    }

    const mockUser = {
      id: 101,
      name: 'Sara',
      email: 'sara@example.com',
    };

    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMX0.mock_token';

    login(mockToken, mockUser);

    setEmail('');
    setPassword('');

    navigate('/dashboard');
  } catch (err) {
    setApiError(err.message || 'Login failed. Please try again.');
  }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.sidebar}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M7 15V9M12 15V7M17 15V11" />
            </svg>
          </div>
          <h1>Task Manager</h1>
          <p>Sign in to open your project dashboard.</p>
        </div>

        <ul className={styles.features}>
          <li>Plan work across To Do, In Progress, and Done</li>
          <li>Track priorities and deadlines in one place</li>
          <li>Your board is saved in this browser</li>
        </ul>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <h2>Welcome back</h2>
          <p className={styles.subtitle}>
            Use your account email and password to continue.
          </p>

          {apiError && <div className={styles.errorMessage}>{apiError}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={validationErrors.email ? styles.inputError : ''}
              />
              {validationErrors.email && (
                <span className={styles.fieldError}>{validationErrors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">PASSWORD</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={validationErrors.password ? styles.inputError : ''}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.password && (
                <span className={styles.fieldError}>{validationErrors.password}</span>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;