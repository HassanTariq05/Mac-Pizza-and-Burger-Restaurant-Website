import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import { useEffect } from 'react';

import './css/bootstrap.min.css';
import './css/flaticon.css';
import './css/menu.css';
import './css/magnific-popup.css';
import './css/flexslider.css';
import './css/owl.carousel.min.css';
import './css/owl.theme.default.min.css';
import './css/jquery.datetimepicker.min.css';
import Cart from './pages/Cart';
import DocumentTitle from './components/DocumentTitle';
import { useStateValue } from './components/StateProvider';
import ScrollToTop from './components/ScrollToTop';
import ProductView from './pages/ProductView';
import AddToCartReceipt from './pages/AddtoCartReceipt';
import ProductCheckout from './pages/ProductCheckout';
import Orders from './pages/Orders';
import Check from './components/Check';

function App() {
  const [{basket}, dispatch] = useStateValue('');

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
    console.log(basket);
  }, [basket]);

  console.log(localStorage)

  return (
    <Router>
      <Header />
      <ScrollToTop />
      <DocumentTitle /> 
      <Routes>
      <Route path="/check" element={<Check />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<ProductCheckout />} />
        <Route path="/checkout/order-received" element={<Orders />} />
        <Route path="/shop/add-to-cart/:title/" element={<AddToCartReceipt />} />
        <Route path="/shop/add-to-cart/:title/:size" element={<AddToCartReceipt />} />
        <Route path="/product/:uuid/:categoryUUID" element={<ProductView />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
