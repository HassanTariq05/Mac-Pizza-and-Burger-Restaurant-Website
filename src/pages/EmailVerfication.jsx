import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import verifyEmailService from "../services/api/verifyEmailService"

const EmailVerification = () => {
  const { email } = useParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    otp: ["", "", "", "", "", ""],
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

      if (index < 5 && value) {
        document.getElementById(`otp-${index + 1}`).focus()
      }
    }

    if (value === "") {
      updatedOtp[index] = ""
      setFormData({
        ...formData,
        otp: updatedOtp,
      })

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
      const response = await verifyEmailService.verify(otp)
      if (response.data.status) {
        setLoading(false)
        toast.success("Email verified successfully")
        navigate("/")
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
            <span className="button-text">Verify</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default EmailVerification
