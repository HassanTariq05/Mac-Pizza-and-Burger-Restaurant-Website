import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import verifyOtpService from "../services/api/verifyOtpService"

const Otp = () => {
  const { email } = useParams()
  const [loading, setLoading] = useState(false)
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

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const otp = formData.otp.join("")
      const otpPayload = {
        email: email,
      }
      const response = await verifyOtpService.verify(otp, otpPayload)
      if (response.data.status) {
        setLoading(false)
        const token = "Bearer" + " " + response.data.data.token
        const user = response.data.data.user
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("isGuestUser", "false")
        localStorage.removeItem("guestAddresses")
        toast.success("Login Successful")
        navigate("/reset-password")
      }
    } catch (error) {
      toast.error("Invalid OTP")
      setLoading(false)
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
        <h6 className="signup-heading">Email Verification</h6>
        <span className="signup-subtext">
          Enter the verification code we sent to you on: {email}
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

        <button
          type="submit"
          className={`signup-button ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span className="button-text">Continue</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Otp
