import React from "react"
import service from "./service"

const createAddressService = {
  create: (params, token) =>
    service.post("public/api/v1/dashboard/user/addresses", params, {
      headers: {
        Authorization: `${token}`,
      },
    }),
}

export default createAddressService
