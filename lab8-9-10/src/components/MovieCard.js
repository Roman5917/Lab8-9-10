
import React from "react";
import styles from "../Styles/Card.module.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} className={styles.image} />
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.description}>{movie.description}</p>
      <div className={styles.genreBadge}>{movie.genre}</div>
      <p className={styles.timeInfo}>Сеанс: {movie.time}</p>
      <Link to={`/booking/${movie.id}`} className={styles.link}>
        Забронювати
      </Link>
    </div>
  );
};

export default MovieCard;