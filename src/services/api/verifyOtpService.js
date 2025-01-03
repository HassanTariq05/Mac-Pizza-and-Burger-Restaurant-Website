import React from "react"
import service from "../network/service"
import { BASE_AUTH_URL } from "../../env/env"

const verifyOtpService = {
  verify: (code, body) =>
    service.post(`${BASE_AUTH_URL}/forgot/email-password/${code}`, body),
}

export default verifyOtpService
