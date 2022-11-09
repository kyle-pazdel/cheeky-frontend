import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UsersShow } from "./UsersShow";
import { BookingsIndex } from "./BookingsIndex";
import { BookingsNew } from "./BookingsNew";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<UsersShow />} />
          <Route path="/my-bookings" element={<BookingsIndex />} />
          <Route path="/book" element={<BookingsNew />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
