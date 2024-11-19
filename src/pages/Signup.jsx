import React, { useState } from "react"
import "../css/signup.css"
import macburgerLogo from "../images/macburger-logo.png"
import { EyeOff, Eye } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import authService from "../components/authService"
import toast from "react-hot-toast"

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState()
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    saveAddress: false,
  })
  const navigate = useNavigate()

  const registerUser = async (username, password, email, phone, name) => {
    try {
      setLoading(true)
      const params = {
        username: username,
        password: password,
        email: email,
        phone: phone,
        name: name,
      }

      const response = await authService.register(params)
      const token =
        response.data.data.token_type + " " + response.data.data.access_token
      const user = response.data.data.user
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      if (response.data.status) {
        toast.success("Signup Successful")
      }
      navigate("/home")
    } catch (error) {
      toast.error("Signup Failed")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data:", formData)
    registerUser(
      formData.firstName + " " + formData.lastName,
      formData.password,
      formData.email,
      formData.phone
    )
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img
          src={macburgerLogo}
          alt="mac-burger-logo"
          className="signup-logo"
        />
        <h6 className="signup-heading">Create your new account</h6>
        <span className="signup-subtext">
          Create an account to start looking for the food you like
        </span>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="saveAddress"
            name="saveAddress"
            checked={formData.saveAddress}
            onChange={handleChange}
          />
          <label htmlFor="saveAddress">Save address details</label>
        </div>
        <label className="agreeLabel" htmlFor="agreeLabel">
          I Agree with
          <Link to={"/about"}>
            <span className="red-text"> Terms of Service </span>
          </Link>
          and
          <Link to={"/about"}>
            <span className="red-text"> Privacy Policy</span>
          </Link>
        </label>
        <button
          type="submit"
          className={`signup-button ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span className="button-text">Sign Up</span>
          )}
        </button>
        <div className="existingAccountLabel">
          <span>Already have an account? </span>
          <Link to={"/login"}>
            <span className="red-text"> Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
