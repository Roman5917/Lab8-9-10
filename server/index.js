const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const bookingsPath = path.join(__dirname, 'bookings.json');

app.use(cors());
app.use(express.json());


app.get('/api/bookings', (req, res) => {
  if (!fs.existsSync(bookingsPath)) {
    return res.json([]);
  }
  const data = fs.readFileSync(bookingsPath);
  res.json(JSON.parse(data));
});


app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;

  let bookings = [];
  if (fs.existsSync(bookingsPath)) {
    bookings = JSON.parse(fs.readFileSync(bookingsPath));
  }

  bookings.push(newBooking);

  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
  res.status(201).json({ message: 'Бронювання збережено!' });
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
