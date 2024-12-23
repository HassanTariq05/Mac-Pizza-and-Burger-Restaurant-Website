import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, allowedForGuests = false }) => {
  const isGuestUser = localStorage.getItem("isGuestUser") === "true"

  if (!allowedForGuests && isGuestUser) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
