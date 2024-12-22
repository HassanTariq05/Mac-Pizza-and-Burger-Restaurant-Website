import React from "react"
import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const createAddressService = {
  create: (params, token) =>
    service.post(`${BASE_USER_URL}/addresses`, params, {
      headers: {
        Authorization: `${token}`,
      },
    }),
}

export default createAddressService
