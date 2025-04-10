import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import styles from "../Styles/Card.module.css";

const MovieList = ({ movies, searchTerm }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [activeGenre, setActiveGenre] = useState("all");
  
  //жанри отримані з масиву
  const genres = ["all", ...new Set(movies.map(movie => movie.genre))];
  
  // для фільтрації
  useEffect(() => {
    let result = movies;
    
    // Фільтрація за пошуком
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Фільтрація за жанром
    if (activeGenre !== "all") {
      result = result.filter(movie => movie.genre === activeGenre);
    }
    
    setFilteredMovies(result);
  }, [searchTerm, activeGenre, movies]);
  
  const handleGenreFilter = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        {genres.map(genre => (
          <button
            key={genre}
            className={`${styles.filterBtn} ${activeGenre === genre ? styles.filterBtnActive : ''}`}
            onClick={() => handleGenreFilter(genre)}
          >
            {genre === "all" ? "Всі жанри" : genre}
          </button>
        ))}
      </div>
      
      <div className={styles.cardc}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className={styles.noResults}>Нічого не знайдено</div>
        )}
      </div>
    </div>
  );
};

export default MovieList;