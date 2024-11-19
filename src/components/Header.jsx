import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import logo from "../images/macburger-logo.png"
import "../css/style.css"
import "../css/responsive.css"
import { Link, useNavigate } from "react-router-dom"
import $ from "jquery"
import "../js/menu" // Adjust the path if necessary
import menu from "../assets/mac-burger-updated-menu.pdf"
import "../css/header.css"

function Header() {
  useEffect(() => {
    // Run the jQuery code once the component mounts
    $(document).ready(function () {
      // Your jQuery code from headerScript.js will automatically run
    })
  }, [])

  const navigate = useNavigate()
  const handleProfileButtonClick = () => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/user-profile")
    } else {
      navigate("/login")
    }
  }

  return (
    <header
      id="header-1"
      className="header navik-header header-shadow center-menu-1 header-transparent viewport-lg sticky"
      style={{ marginTop: "0px" }}
    >
      <div className="container">
        <div className="navik-header-container">
          <Link to="/home" className="header-home">
            <FontAwesomeIcon className="fas fa-home" icon={faHome} />
          </Link>
          <div className="callusbtn">
            <a href="tel:123456789">
              <i className="fas fa-phone"></i>
            </a>
          </div>
          <div className="logo">
            <Link to={"/home"}>
              <img src={logo} width="177" height="120" alt="header-logo" />
            </Link>
          </div>
          <div className="burger-menu">
            <div className="line-menu line-half first-line"></div>
            <div className="line-menu"></div>
            <div className="line-menu line-half last-line"></div>
          </div>
          <nav className="navik-menu menu-caret navik-yellow">
            <ul
              id="menu-header-menu1"
              className="top-list"
              style={{ width: "477.485px" }}
            >
              <li className="menu-item">
                <Link to="/about">About</Link>
              </li>
              <li className="menu-item">
                <a href={menu} target="_blank">
                  Our Menu
                </a>
              </li>
            </ul>
            <div className="logoCenter" style={{ width: "103.281px" }}>
              <div className="logo">
                <Link to="/home">
                  <img src={logo} width="177" height="120" alt="header-logo" />
                </Link>
              </div>
            </div>
            <ul id="menu-header-menu" style={{ width: "477.485px" }}>
              <li className="menu-item">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="menu-item current-menu-item">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="cart-profile-div">
            <div className="cart-btn">
              <Link to="/cart">
                <FontAwesomeIcon
                  className="fas fa-shopping-cart"
                  icon={faShoppingCart}
                />
              </Link>
            </div>
            <div className="profile-btn">
              <FontAwesomeIcon
                className="fas fa-user-circle"
                icon={faUserCircle}
                onClick={handleProfileButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="header-shadow-wrapper"></div>
    </header>
  )
}

export default Header
