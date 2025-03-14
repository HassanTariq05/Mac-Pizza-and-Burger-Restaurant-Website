import React, { useEffect, useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { User, ArrowRight, LogOut, MapPin, Logs, Camera } from "lucide-react"
import defaultProfilePicture from "../images/default-user-pic.webp"
import imageUploadService from "../services/api/imageUploadService"
import "../css/UserProfile.css"
import { BASE_URL } from "../env/env"
import profileUpdateService from "../services/api/profileUpdateService"
import toast from "react-hot-toast"
import RecentOrder from "../components/RecentOrder"
import AddressModal from "../components/AddressModal"

const UserProfile = () => {
  const [email, setEmail] = useState("-")
  const [name, setName] = useState("-")
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || defaultProfilePicture
  )

  const [AddressModalOpen, setAddressModalOpen] = useState(false)
  const onClose = () => {
    setAddressModalOpen(false)
  }

  const handleAddressModalOpen = () => {
    setAddressModalOpen(true)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      // Redirect to login if token is not available
      navigate("/login", { replace: true })
      return
    }

    const getUserCredentials = () => {
      const userObj = JSON.parse(localStorage.getItem("user"))
      setEmail(userObj?.email || "-")
      setName(`${userObj?.firstname} ${userObj?.lastname}` || "-")

      let profileImage

      if (userObj?.img?.startsWith(BASE_URL)) {
        profileImage = userObj?.img
      } else {
        if (userObj?.img) {
          profileImage = `${BASE_URL}/${userObj?.img}`
        } else {
          profileImage = null
        }
      }

      if (localStorage.getItem("profilePic") || profileImage) {
        setProfilePic(localStorage.getItem("profilePic") || profileImage)
      } else {
        setProfilePic(defaultProfilePicture)
      }
    }
    getUserCredentials()
  }, [navigate])

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
    }
  }

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

      if (response) {
        try {
          const userObj = JSON.parse(localStorage.getItem("user"))

          const bodyData = {
            firstname: userObj?.firstname || "",
            lastname: userObj?.lastname || "",
            email: userObj?.email || "",
            phone: userObj?.phone || "",
            birthday: formatBirthday(userObj?.birthday) || "1999-01-01",
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
      toast.error("Error Updating Profile")
      console.error("Error:", error.response || error.message)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
    toast.success("Logged out successfully")
    localStorage.setItem("isGuestUser", "true")
    localStorage.removeItem("guestAddresses")
  }

  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="profile-container">
      <div className="profile-picture-container">
        <img src={profilePic} alt="User Profile" className="profile-picture" />
        <div
          className="edit-icon"
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

      <div>
        <span className="profileName">{name}</span>
      </div>
      <div>
        <span className="email">{email}</span>
      </div>

      <RecentOrder />

      <div className="profile-section">
        <h3 className="profile-heading">Profile</h3>
        <div className="profile-options">
          <Link
            to={"/user-profile/personal-data"}
            className="profile-option-link"
          >
            <button className="profile-option-button">
              <div className="profile-option-content">
                <User />
                <span>Personal Data</span>
              </div>
              <ArrowRight />
            </button>
          </Link>

          <button
            onClick={handleAddressModalOpen}
            className="profile-option-button"
          >
            <div className="profile-option-content">
              <MapPin />
              <span>My Addresses</span>
            </div>
            <ArrowRight />
          </button>
          <AddressModal isOpen={AddressModalOpen} onClose={onClose} />

          <Link to={"/orders"}>
            <button className="profile-option-button">
              <div className="profile-option-content">
                <Logs />
                <span>My Orders</span>
              </div>
              <ArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <button onClick={handleLogout} className="sign-out-button">
        <LogOut />
        <span>Log Out</span>
      </button>
    </div>
  )
}

export default UserProfile
