import React, { useState } from "react"
import authService from "./authService"

const useUser = () => {
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token")
    return !!token
  }

  const userToken = () => {
    const token = localStorage.getItem("token")
    return token || ""
  }

  return {
    isUserLoggedIn,
    userToken,
  }
}

export default useUser
