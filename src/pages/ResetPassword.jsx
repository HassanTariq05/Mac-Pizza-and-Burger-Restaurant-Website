import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { Eye, EyeOff } from "lucide-react"
import updatePasswordService from "../services/api/updatePasswordService"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { error } from "jquery"

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let formErrors = { password: "", confirmPassword: "" }

    if (!validatePassword(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters long and include upper and lower case letters, numbers, and special characters."
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match."
    }

    if (formErrors.password || formErrors.confirmPassword) {
      setErrors(formErrors)
      return
    }

    setErrors({})
    try {
      const updatePasswordPayload = {
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      }
      const token = localStorage.getItem("token")
      const updatePasswordServiceResponse = await updatePasswordService.update(
        updatePasswordPayload,
        token
      )
      console.log("response: ", updatePasswordServiceResponse)
      if (updatePasswordServiceResponse.status) {
        setLoading(false)
        navigate("/")
        toast.success("Password updated successfully")
      } else {
        throw error
      }
    } catch (error) {
      toast.error("Password update failed!")
      setLoading(false)
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

export default ResetPassword
