import React from "react"
import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const createCartService = {
  create: (params, headers) =>
    service.post(`${BASE_USER_URL}/cart/insert-product`, params, {
      headers,
    }),
}

export default createCartService
