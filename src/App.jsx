import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Import pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import TaskDetail from './pages/TaskDetail/TaskDetail';
import NotFound from './pages/NotFound/NotFound';

// Protected Route wrapper component
// This component ensures that only authenticated users can access certain routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route wrapper component
// This component redirects authenticated users away from login page to dashboard
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public login route - redirects to dashboard if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected dashboard route - shows all tasks */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected task detail route - shows individual task details */}
      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        }
      />

      {/* Root path - redirect to dashboard if authenticated, login if not */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Not Found - catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
