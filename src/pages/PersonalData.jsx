import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../services/api/authService"
import toast from "react-hot-toast"
import { Camera } from "lucide-react"
import defaultProfilePicture from "../images/default-user-pic.webp"
import imageUploadService from "../services/api/imageUploadService"
import profileUpdateService from "../services/api/profileUpdateService"
import { BASE_URL } from "../env/env"
import { useEffect } from "react"
import "../css/PersonalData.css"

function PersonalData() {
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || defaultProfilePicture
  )

  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [loading, setLoading] = useState()

  const [formData, setFormData] = useState({
    phone: "",
    email: email,
    firstName: name,
    lastName: "",
    dateOfBirth: "",
    gender: "",
  })

  useEffect(() => {
    const getUserCredentials = () => {
      const userObj = JSON.parse(localStorage.getItem("user"))
      const email = userObj?.email || ""
      const firstName = userObj?.firstname || ""
      const lastName = userObj?.lastname || ""
      const phone = userObj?.phone || ""
      const dateOfBirth = userObj?.birthday
        ? formatBirthday(userObj.birthday)
        : ""
      const gender = userObj?.gender || ""

      setEmail(email)
      setName(`${firstName} ${lastName}`)

      setFormData({
        email,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        gender,
      })

      const profileImage = userObj?.img?.startsWith(BASE_URL)
        ? userObj?.img
        : `${BASE_URL}/${userObj?.img}`
      setProfilePic(localStorage.getItem("profilePic") || profileImage)
    }
    getUserCredentials()
  }, [])

  const formatBirthday = (birthday) => {
    if (!birthday) return ""

    const date = new Date(birthday)
    return date.toISOString().split("T")[0]
  }

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("image", file)
    formData.append("type", "users")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const response = await imageUploadService.uploadImage(formData, token)
      const imageUrl = response.data?.data?.title
      console.log("Image:", imageUrl)

      if (response) {
        try {
          const userObj = JSON.parse(localStorage.getItem("user"))

          const bodyData = {
            firstname: userObj?.firstname || "",
            lastname: userObj?.lastname || "",
            email: userObj?.email || "",
            phone: userObj?.phone || "",
            birthday: formatBirthday(userObj?.birthday) || "",
            gender: userObj?.gender || "",
            images: [imageUrl],
          }
          const profileUpdateResponse =
            await profileUpdateService.updateProfile(bodyData, token)

          const extractedImage = profileUpdateResponse.data?.data?.img
          const fullImageUrl = imageUrl
            ? `${BASE_URL}/${extractedImage}`
            : URL.createObjectURL(file)
          localStorage.setItem("profilePic", fullImageUrl)

          setProfilePic(fullImageUrl)
          toast.success("Profile updated successfully")
        } catch (error) {
          toast.error("Error Updating Profile")
        }
      }
    } catch (error) {
      console.error("Error:", error.response || error.message)
    }
  }

  const updateProfile = async (formData) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      try {
        const bodyData = {
          firstname: formData.firstName || "",
          lastname: formData.lastName || "",
          email: formData.email || "",
          phone: formData.phone || "",
          birthday: formatBirthday(formData.dateOfBirth) || "",
          gender: formData.gender || "",
          images: [localStorage.getItem("profilePic") || profilePic],
        }

        const profileUpdateResponse = await profileUpdateService.updateProfile(
          bodyData,
          token
        )
        const updatedUserData = profileUpdateResponse.data?.data

        if (updatedUserData) {
          localStorage.setItem("user", JSON.stringify(updatedUserData))
        }

        toast.success("Profile updated successfully")
        setLoading(false)
      } catch (error) {
        toast.error("Error Updating Profile")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error.response || error.message)
      setLoading(false)
    }
  }

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
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
    updateProfile(formData)
  }
  return (
    <div>
      <div className="data-container">
        <form className="data-form" onSubmit={handleSubmit}>
          <div className="profile-picture-container">
            <img
              src={profilePic}
              alt="User Profile"
              className="profile-picture"
            />
            <div
              className="camera-icon"
              role="button"
              tabIndex="0"
              aria-label="Change Profile Picture"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Camera />
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
          </div>
          <h6 className="data-heading">Personal Data</h6>

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
            <div className="date-of-birth-container">
              <label htmlFor="firstName">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Enter Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
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

          <button
            type="submit"
            className={`data-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <div className="loader"></div>
            ) : (
              <span className="button-text">Save</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PersonalData
