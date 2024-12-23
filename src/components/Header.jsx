import { Home, ShoppingCart, Menu, UserCircle, Cross, X } from "lucide-react"
import { useEffect, useState } from "react"
import "../css/header.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../env/env"

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [profilePic, setProfilePic] = useState(null)

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev)
  }

  const navigate = useNavigate()
  const handleProfileButtonClick = () => {
    const user = localStorage.getItem("user")
    const isGuestUser = localStorage.getItem("isGuestUser")
    if (user && isGuestUser == "false") {
      navigate("/user-profile")
    } else {
      navigate("/login")
    }
  }

  const getProfilePic = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log("Here", user)
    console.log("Profile Pic", localStorage.getItem("profilePic"))
    const profileLocal = localStorage.getItem("profilePic")
    if (profileLocal) {
      return `${profileLocal}`
    }
    if (user.img) {
      return `${BASE_URL}/${user.img}`
    } else {
      return require("../images/default-user-pic.webp")
    }
  }
  return (
    <header className="header">
      <nav className="nav">
        {/* Left Section: Menu and Home Buttons */}
        <div className="nav-left">
          <button
            className="hamburger"
            onClick={toggleDrawer}
            aria-label="Open Menu"
          >
            <Menu size={28} className="icon" />
          </button>
          <Link to={"/"}>
            <a>
              <img
                className="home-icon"
                src={require("../images/home-icon.png")}
                alt="Mac Burger Logo"
              />
            </a>
          </Link>
        </div>

        {/* Navigation Links (Desktop View) */}
        <div className="nav-links">
          <Link to={"/about"}>
            <a>About</a>
          </Link>
          <Link to={"/menu"}>
            <a>Our Menu</a>
          </Link>
          <div className="logo-nav">
            <Link to={"/"}>
              <img
                className="logo-nav-img"
                src={require("../images/macburger-logo.png")}
                alt="Mac Burger Logo"
              />
            </Link>
          </div>
          <Link to={"/shop"}>
            <a>Shop</a>
          </Link>
          <Link to={"/contact"}>
            <a>Contact</a>
          </Link>
        </div>

        {/* Center Section: Logo */}
        <div className="logo">
          <img
            src={require("../images/macburger-logo.png")}
            alt="Mac Burger Logo"
          />
        </div>

        {/* Right Section: User and Cart Buttons */}
        <div className="nav-right">
          <Link to={"/cart"}>
            <i id="shopping-cart-icon" className="fas fa-shopping-cart"></i>
          </Link>

          {localStorage.getItem("user") !== null &&
          localStorage.getItem("isGuestUser") === "false" ? (
            <img
              onClick={handleProfileButtonClick}
              className="profile-icon-img"
              src={getProfilePic()}
              alt=""
            />
          ) : (
            <UserCircle
              onClick={handleProfileButtonClick}
              size={32}
              className="icon"
            />
          )}
        </div>
      </nav>

      {/* Drawer (For Mobile/Tablet Views) */}
      {isDrawerOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)} // Close drawer when clicking on overlay
        >
          <div
            className={`drawer ${isDrawerOpen ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
          >
            <button className="close-drawer" onClick={toggleDrawer}>
              <X size={18} />
            </button>
            <ul className="drawer-links">
              <li>
                <Link to={"/"}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to={"/about"}>
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link to={"/menu"}>
                  <a>Our Menu</a>
                </Link>
              </li>
              <li>
                <Link to={"/shop"}>
                  <a>Shop</a>
                </Link>
              </li>
              <li>
                <Link to={"/contact"}>
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
