import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };
  
  
  const handleSearchClick = () => {
    onSearch(searchTerm);
  };
  
  
  
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>Світ Фільмів</Link>
      </div>
      
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Головна</Link>
        <Link to="/upcoming" className={styles.navLink}>Скоро в прокаті</Link>
        <Link to="/about" className={styles.navLink}>Про нас</Link>
       
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Пошук фільму..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          
        />
        <button 
          type="button"
          className={styles.searchButton}
          onClick={handleSearchClick}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;