import logo from './logo.svg';
import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './input.css';
import Navbar from './components/Navbar.jsx';
import Arrivals from './components/Arrivals.jsx';
import BestSelling from './components/BestSelling.jsx';
import Hero from './components/Hero.jsx';
import Insta from './components/Insta.jsx';
import Footer from './components/Footer.jsx';
import Extra from './components/Extra.jsx';
import Products from './components/products.jsx';
import Blog from './components/blog.jsx'; 
import Policy from './components/policy.jsx';
import Payment_test from './components/Payment_test.jsx';

function App() {
  useEffect(() => {
    const loadingScreen = document.querySelector(".loading");

    const handleAnimationEnd = () => {
      document.body.style.overflow = "auto"; // Reset overflow to auto
      loadingScreen.style.display = "none"; // Optionally hide the loading element
    };

    loadingScreen.addEventListener("animationend", handleAnimationEnd);

    return () => {
      loadingScreen.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  return (
    <Router>
      <div className="App overflow-x-hidden relative" style={{ background: "#F6E7E5" }}>
        <div className="loading"></div>

        <Navbar />
        
        <Routes>
          {/* Route for the homepage */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Arrivals />
                <BestSelling />
                <Extra />
                <Insta />
              </>
            }
          />

          {/* Route for the products page */}
          <Route path="/products" element={<Products />} />

          {/* Route for the blog page */}
          <Route path="/blog" element={<Blog />} />

          {/* Route for the policy page */}
          <Route path="/policy" element={<Policy />} /> 
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/payment" element={<Payment_test />} /> 

        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;