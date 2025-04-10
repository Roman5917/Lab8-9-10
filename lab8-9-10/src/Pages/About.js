
import React from "react";
import Navbar from "../components/Navbar";
import styles from "../Styles/Card.module.css";

const About = () => {
  return (
    <div>
      <Navbar onSearch={() => {}} />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Про нас</h1>
        <div className={styles.card} style={{ width: "100%", padding: "30px" }}>
          <h2 className={styles.title}>Світ фільмів</h2>
          <p className={styles.description}>
            Мій кінотеатр імба 
          </p>
          <h3 className={styles.title} style={{ fontSize: "16px" }}>Наші переваги:</h3>
          <ul className={styles.description} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Сучасні зали з комфортними кріслами</li>
            <li>Найновіші фільми </li>
            <li>Зручна система бронювання квитків онлайн</li>
            <li>Якісний звук та зображення</li>
          </ul>
          <p className={styles.description}>
           Класні фільми у прокаті та класні ціни для тебе
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;