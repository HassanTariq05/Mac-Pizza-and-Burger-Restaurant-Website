import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { EyeOff, Eye } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import authService from "../components/authService"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loginUser = async (email, password) => {
    try {
      setLoading(true)
      const params = {
        email: email,
        password: password,
      }

      const response = await authService.authenticate(params)
      const token =
        response.data.data.token_type + " " + response.data.data.access_token
      const user = response.data.data.user
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      if (response.data.status) {
        toast.success("Login Successful")
      }
      navigate("/home")
    } catch (error) {
      toast.error("Login Failed")
    } finally {
      setLoading(false)
    }
  }

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
    loginUser(formData.email, formData.password)
    console.log(localStorage)
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
        <Link to={"/forgot-password"}>
          <span className="forgot-password-text"> Forgot Password? </span>
        </Link>

        <button
          type="submit"
          className={`signup-button ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span className="button-text">Login</span>
          )}
        </button>

        <div className="existingAccountLabel">
          <span>Don't have an account? </span>
          <Link to={"/signup"}>
            <span className="red-text"> Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
