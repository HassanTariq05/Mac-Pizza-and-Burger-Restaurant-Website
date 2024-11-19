import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  })
  const navigate = useNavigate() // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email validation
    if (emailRegex.test(formData.email)) {
      console.log("Form data:", formData)
      navigate("/otp-verification") // Redirect to /otp-verification if email is valid
    } else {
      alert("Please enter a valid email address.") // Show alert for invalid email
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img
          src={macburgerLogo}
          alt="mac-burger-logo"
          className="signup-logo"
        />
        <h6 className="signup-heading">Forgot Password?</h6>
        <span className="signup-subtext">
          Enter your email address and we'll send you a confirmation code to
          reset your password
        </span>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
