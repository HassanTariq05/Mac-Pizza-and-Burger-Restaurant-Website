import React, { useState } from "react"

const useUser = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const token = localStorage.getItem("token")

  if (token) {
    setLoggedIn(true)
  }

  return {
    loggedIn,
  }
}

export default useUser
