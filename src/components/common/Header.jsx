import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle logout action
  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 15V9M12 15V7M17 15V11" />
          </svg>
        </div>
        <span className={styles.appName}>Task Manager</span>
      </div>

      <div className={styles.rightSection}>
        {/* User profile dropdown menu */}
        <div className={styles.userMenu}>
          <button
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <div className={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className={styles.userName}>{user?.name || 'User'}</span>
            <span className={styles.menuIcon}>▼</span>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className={styles.dropdown}>
              <div className={styles.userInfo}>
                <p className={styles.userNameDropdown}>{user?.name}</p>
                <p className={styles.userEmail}>{user?.email}</p>
              </div>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showUserMenu && (
        <div
          className={styles.overlay}
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
