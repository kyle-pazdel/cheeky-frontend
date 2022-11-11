import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/performers/:id" element={<PerformersShow />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<UsersShow />} />
          <Route path="/my-bookings" element={<BookingsIndex />} />
          <Route path="/bookings/:id" element={<BookingsShow />} />
          <Route path="/book" element={<BookingsNew />} />
          <Route path="/add-performer" element={<PerformersNew />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
