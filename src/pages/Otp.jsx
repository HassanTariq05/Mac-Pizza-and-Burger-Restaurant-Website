import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"

const Otp = () => {
  const [formData, setFormData] = useState({
    otp: ["", "", "", "", "", ""], // Array to store OTP values
  })

  const handleChange = (e, index) => {
    const { value } = e.target
    const updatedOtp = [...formData.otp]

    if (value.match(/[0-9]/) && value.length <= 1) {
      updatedOtp[index] = value
      setFormData({
        ...formData,
        otp: updatedOtp,
      })

      // Auto focus next field after entering a value
      if (index < 5 && value) {
        document.getElementById(`otp-${index + 1}`).focus()
      }
    }

    // If backspace is pressed (empty input), focus on the previous field
    if (value === "") {
      updatedOtp[index] = "" // Clear the value
      setFormData({
        ...formData,
        otp: updatedOtp,
      })

      // Focus on the previous field if backspace is pressed
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus()
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otp = formData.otp.join("") // Join OTP digits into a single string
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img
          src={macburgerLogo}
          alt="mac-burger-logo"
          className="signup-logo"
        />
        <h6 className="signup-heading">Email Verification</h6>
        <span className="signup-subtext">
          Enter the verification code we sent to you on:
          hassan.tarique05@gmail.com
        </span>

        <div className="otp-input-container">
          {formData.otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              placeholder="-"
              className="otp-input"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Otp
