
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Booking from "./Pages/Booking";
import About from "./Pages/About";
import Upcoming from "./Pages/Upcoming";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/upcoming" element={<Upcoming />} />
    </Routes>
  );
};

export default App;