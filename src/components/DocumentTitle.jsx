import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const DocumentTitle = () => {
  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case "/about":
        document.title = "About | Mac Burger & Pizza"
        break
      case "/shop":
        document.title = "Shop | Mac Burger & Pizza"
        break
      case "/contact":
        document.title = "Contact | Mac Burger & Pizza"
        break
      case "/cart":
        document.title = "Cart | Mac Burger & Pizza"
        break
      case "/":
        document.title = "Home | Mac Burger & Pizza"
        break
      case "/checkout":
        document.title = "Checkout | Mac Burger & Pizza"
        break
      default:
        document.title = "Mac Burger & Pizza"
    }
  }, [location])

  return null
}

export default DocumentTitle
