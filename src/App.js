import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

import './css/bootstrap.min.css';
import './css/flaticon.css';
import './css/menu.css';
import './css/magnific-popup.css';
import './css/flexslider.css';
import './css/owl.carousel.min.css';
import './css/owl.theme.default.min.css';
import './css/jquery.datetimepicker.min.css';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
