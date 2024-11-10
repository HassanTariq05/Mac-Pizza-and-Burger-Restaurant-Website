import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { EyeOff, Eye } from "lucide-react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data:", formData)
  }

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img
          src={macburgerLogo}
          alt="mac-burger-logo"
          className="signup-logo"
        />
        <h6 className="signup-heading">Login to your account</h6>
        <span className="signup-subtext">Please Login to your account</span>

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

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>
        <span className="forgot-password-text"> Forgot Password? </span>

        <button type="submit" className="signup-button">
          Login
        </button>
        <div className="existingAccountLabel">
          <span>Don't have an account? </span>
          <span className="red-text"> Sign Up</span>
        </div>
      </form>
    </div>
  )
}

export default Login
