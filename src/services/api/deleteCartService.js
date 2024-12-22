import React from "react"
import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const deleteCartService = {
  delete: (headers) =>
    service.delete(`${BASE_USER_URL}/cart/my-delete`, {
      headers,
    }),
}

export default deleteCartService
