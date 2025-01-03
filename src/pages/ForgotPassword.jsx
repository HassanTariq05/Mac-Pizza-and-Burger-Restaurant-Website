import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import forgotPasswordService from "../services/api/forgotPasswordService"
import toast from "react-hot-toast"
import { error } from "jquery"
import { faL } from "@fortawesome/free-solid-svg-icons"

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(formData.email)) {
        const payload = {
          email: formData.email,
        }
        const forgotPasswordResponse = await forgotPasswordService.request(
          payload
        )

        if (forgotPasswordResponse.data.status == 200) {
          setLoading(false)
          toast.success("Verification code sent")
          navigate(`/otp-verification/${formData.email}`)
        } else {
          throw error
        }
      }
    } catch (error) {
      setLoading(false)
      toast.error("Invalid email!")
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

export default ForgotPassword
