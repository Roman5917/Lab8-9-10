import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { movies } from "../Data/movies";
import styles from "../Styles/Booking.module.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [bookingComplete, setBookingComplete] = useState(false);

  // Завантаження фільму
  useEffect(() => {
    const foundMovie = movies.find(m => m.id.toString() === id);
    setMovie(foundMovie);

    // Завантаження вже заброньованих місць з локалки
    const storedBookedSeats = localStorage.getItem(`bookedSeats_${id}`);
    if (storedBookedSeats) {
      setBookedSeats(JSON.parse(storedBookedSeats));
    }
  }, [id]);

  const handleSeatClick = (seatNumber) => {
    //заброньоване місце?
    if (bookedSeats.includes(seatNumber)) {
      return; // не дасть вибрати зайняті місця 
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleBookingSubmit = () => {
    if (!userData.name || !userData.email || !userData.phone) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Будь ласка, виберіть хоча б одне місце!");
      return;
    }

    // Об'єкт для броні
    const bookingData = {
      id: Date.now().toString(),
      movieId: id,
      movieTitle: movie.title,
      date: new Date().toISOString(),
      seats: selectedSeats,
      totalPrice: selectedSeats.length * 150,
      customer: userData
    };

    
    //сейв для всіх брон.
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

   
    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`bookedSeats_${id}`, JSON.stringify(updatedBookedSeats));
    setBookedSeats(updatedBookedSeats);

    // завантаження json
    const dataStr = JSON.stringify(bookingData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    
    const exportFileDefaultName = `booking_${bookingData.id}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    
    setSelectedSeats([]);
    setBookingComplete(true);
    
    // повернення на головну сторінку 
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

 
  const getSeatStyle = (seatNumber) => {
   //червоний для зайнятих 
    if (bookedSeats.includes(seatNumber)) {
      return { 
        backgroundColor: '#e50914', 
        color: 'white',
        cursor: 'not-allowed' 
      };
    }
    
    // зелений для вибраного
    if (selectedSeats.includes(seatNumber)) {
      return { 
        backgroundColor: '#0de509', 
        color: 'white' 
      };
    }
    
    
    return {};
  };

  if (!movie) {
    return (
      <div>
        <Navbar onSearch={() => {}} />
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Фільм не знайдено</h1>
          <Link to="/" className={styles.backButton}>Повернутися на головну</Link>
        </div>
      </div>
    );
  }

  // повідомлення про успішне брон.
  if (bookingComplete) {
    return (
      <div>
        <Navbar onSearch={() => {}} />
        <div className={styles.container}>
          <div className={styles.successMessage}>
            <h1>Красавчик!</h1>
            <p>твоє бронювання успішне</p>
            
            <p>За кілька секунд в лоббі</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onSearch={() => {}} />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Бронювання квитків</h1>
        
        <div className={styles.bookingContent}>
          <div className={styles.movieInfo}>
            <img src={movie.poster} alt={movie.title} className={styles.bookingPoster} />
            <div className={styles.movieDetails}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.movieDescription}>{movie.description}</p>
              <div className={styles.movieMeta}>
                <span className={styles.genreBadge}>{movie.genre}</span>
                <p className={styles.timeInfo}>Сеанс: {movie.time}</p>
              </div>
            </div>
          </div>
          
          {/* Інформація про заброньовані місця */}
          <div className={styles.bookedSeatsInfo}>
            <h3>Заброньовані місця: {bookedSeats.length > 0 ? bookedSeats.sort((a, b) => a - b).join(', ') : 'Немає'}</h3>
          </div>
          
          <div className={styles.seatSelection}>
            <h3 className={styles.sectionTitle}>Виберіть місця</h3>
            <div className={styles.screen}>Екран</div>
            
            <div className={styles.seatsContainer}>
              {Array.from({ length: 50 }, (_, i) => i + 1).map(seatNumber => (
                <div
                  key={seatNumber}
                  className={styles.seat}
                  style={getSeatStyle(seatNumber)}
                  onClick={() => handleSeatClick(seatNumber)}
                >
                  {seatNumber}
                </div>
              ))}
            </div>
            
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={styles.seat}></div>
                <span>Доступне</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.seat} style={{ backgroundColor: '#4CAF50', color: 'white' }}></div>
                <span>Вибране</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.seat} style={{ backgroundColor: '#ff4d4d', color: 'white' }}></div>
                <span>Зайняте</span>
              </div>
            </div>
            
            <div className={styles.bookingSummary}>
              <h3 className={styles.sectionTitle}>Інформація для бронювання</h3>
              
              <div className={styles.userInfoForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Ім'я:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={userData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={userData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Телефон:</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={userData.phone} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className={styles.bookingSummaryInfo}>
                <p>Вибрані місця: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Не вибрано'}</p>
                <p>Загальна вартість: {selectedSeats.length * 150} грн</p>
              </div>
              
              <button
                className={styles.bookButton}
                disabled={selectedSeats.length === 0}
                onClick={handleBookingSubmit}
              >
                Підтвердити бронювання
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;