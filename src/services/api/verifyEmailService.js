import React from "react"
import service from "../network/service"
import { BASE_AUTH_URL } from "../../env/env"

const verifyEmailService = {
  verify: (code) => service.get(`${BASE_AUTH_URL}/verify/${code}`),
}

export default verifyEmailService
