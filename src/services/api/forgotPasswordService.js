import React from "react"
import service from "../network/service"
import { BASE_AUTH_URL } from "../../env/env"

const forgotPasswordService = {
  request: (body) =>
    service.post(`${BASE_AUTH_URL}/forgot/email-password`, body),
}

export default forgotPasswordService
