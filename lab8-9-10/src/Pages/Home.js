
import React, { useState } from "react";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import { movies } from "../Data/movies";
import styles from "../Styles/Card.module.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Актуальні фільми</h1>
        <MovieList 
          movies={movies} 
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default Home;