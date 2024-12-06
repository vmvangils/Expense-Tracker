import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <button
            className={styles.sidebarToggleButton}
            onClick={toggleSidebar}
          >
            ☰
          </button>
          {isSidebarVisible && (
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <div className={styles.profile}>
                  <div className={styles.profileIcon}>CL</div>
                  <div>
                    <h3>Codinglab</h3>
                    <span>Web developer</span>
                  </div>
                </div>
              </div>

              <ul className={styles.sidebarMenu}>
                <li className={styles.menuItem}>
                  Dashboard
                </li>
                <li className={`${styles.menuItem} ${styles.active}`}>
                  Economy
                </li>
                <li className={styles.menuItem}>
                 Reports
                </li>
                <li className={styles.menuItem}>
                  Login
                </li>
              </ul>

              <div className={styles.sidebarFooter}>
                <button className={styles.logoutButton}>Logout</button>
                <div className={styles.darkModeToggle}>
                  <span>🌙</span>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          )}
          <span className={styles.title}>Dashboard</span>
        </div>
        <div className={styles.rightSection}>
          <button
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            &#x21bb;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
