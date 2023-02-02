import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UsersShow } from "./UsersShow";
import { BookingsIndex } from "./BookingsIndex";
import { BookingsShow } from "./BookingsShow";
import { BookingsNew } from "./BookingsNew";
import { PerformersShow } from "./PerformersShow";
import { PerformersNew } from "./PerformersNew";
import { ProfileImageNew } from "./ProfileImageNew";
import { PaymentProcessing } from "./PaymentProcessing";
import { PerformersBookings } from "./PerformersBookings";
import { PerformersBookingsShow } from "./PerformersBookingsShow";

function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
  // axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://52.38.153.86" : null;

  const [colorChange, setColorChange] = useState(false);

  const changeNavbarColor = () => {
    if (location.pathname !== "/") {
      setColorChange(true);
    } else if (window.scrollY >= 924 && location.pathname === "/") {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  const handleNavHome = () => {
    setColorChange(false);
  };

  const handleNavOther = () => {
    setColorChange(true);
  };

  window.addEventListener("scroll", changeNavbarColor);
  window.addEventListener("load", changeNavbarColor);

  return (
    <BrowserRouter>
      <div>
        <Header colorChange={colorChange} onNavHome={handleNavHome} onNavOther={handleNavOther} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/performers/:id" element={<PerformersShow />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<UsersShow />} />
          <Route path="/my-events" element={<BookingsIndex />} />
          <Route path="/bookings/:id" element={<BookingsShow />} />
          <Route path="/process-payment/:id" element={<PaymentProcessing />} />
          <Route path="/book" element={<BookingsNew />} />
          <Route path="/add-performer" element={<PerformersNew />} />
          <Route path="/profile-image/:id" element={<ProfileImageNew />} />
          <Route path="/my-bookings/:id" element={<PerformersBookings />} />
          <Route path="/my-bookings/:id/:id" element={<PerformersBookingsShow />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
