import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { Eye, EyeOff } from "lucide-react"

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formErrors = { password: "", confirmPassword: "" }

    if (!validatePassword(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters long and include upper and lower case letters, numbers, and special characters."
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match."
    }

    if (formData.password == formData.confirmPassword) {
      setErrors(formErrors)
    }

    if (formErrors.password || formErrors.confirmPassword) {
      setErrors(formErrors)
      return
    }
  }

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible)

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img
          src={macburgerLogo}
          alt="mac-burger-logo"
          className="signup-logo"
        />
        <h6 className="signup-heading">Reset Password</h6>
        <span className="signup-subtext">
          Your new password must be different from the previously used password
        </span>

        <div className="form-group">
          <label htmlFor="password">New Password *</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
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
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <div className="password-input-container">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div
              className="password-toggle-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <EyeOff /> : <Eye />}
            </div>
          </div>
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
