import React from "react"
import service from "./service"

const createCartService = {
  create: (params, headers) =>
    service.post("public/api/v1/dashboard/user/cart/insert-product", params, {
      headers,
    }),
}

export default createCartService
