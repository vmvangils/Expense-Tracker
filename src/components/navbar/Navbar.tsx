import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

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
            ☰{/*De ☰ NIET VERWIJDEREN DAT IS DE HAMBURGER MENU KNOP*/}
          </button>
          {isSidebarVisible && (
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}></div>

              <ul className={styles.sidebarMenu}>
                <li className={styles.menuItem}>
                  <Link to="/">Dashboard</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="./components/economy/Economy">Economy</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/reports">Reports</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
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