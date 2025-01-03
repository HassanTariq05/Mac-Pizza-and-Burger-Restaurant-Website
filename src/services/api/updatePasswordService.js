import React from "react"
import service from "../network/service"
import { BASE_AUTH_URL, BASE_USER_URL } from "../../env/env"

const updatePasswordService = {
  update: (body, token) =>
    service.post(`${BASE_USER_URL}/profile/password/update`, body, {
      headers: {
        Authorization: `${token}`,
      },
    }),
}

export default updatePasswordService
