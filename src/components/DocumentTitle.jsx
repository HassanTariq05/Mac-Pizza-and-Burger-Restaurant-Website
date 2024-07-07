import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/about':
        document.title = 'About | Mac Pizza & Burger';
        break;
      case '/shop':
        document.title = 'Shop | Mac Pizza & Burger';
        break;
      case '/contact':
        document.title = 'Contact | Mac Pizza & Burger';
        break;
      case '/cart':
        document.title = 'Cart | Mac Pizza & Burger';
        break;
      case '/home':
        document.title = 'Home | Mac Pizza & Burger';
        break;
      default:
        document.title = 'Mac Pizza & Burger';
    }
  }, [location]);

  return null;
};

export default DocumentTitle;
