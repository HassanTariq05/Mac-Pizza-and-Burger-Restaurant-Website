import React, { useState } from "react"
import authService from "./authService"

const useUser = () => {
  // Check if the user is logged in
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token")
    return !!token // Returns true if token exists
  }

  // Log in a guest user
  const loginGuestUser = async () => {
    try {
      const params = {
        email: "guestseller@macburger.kg",
        password: "12345678",
      }

      const response = await authService.authenticate(params)
      const token =
        response.data.data.token_type + " " + response.data.data.access_token

      localStorage.setItem("token", token)
      localStorage.setItem("isGuestUser", "true")

      const user = response.data.data.user
      localStorage.setItem("user", JSON.stringify(user))
      console.log("Guest login successful")
    } catch (error) {
      console.error("Error logging in as guest:", error)
    }
  }

  return {
    isUserLoggedIn,
    loginGuestUser,
  }
}

export default useUser
