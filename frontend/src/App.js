import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
