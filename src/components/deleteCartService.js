import React from "react"
import service from "./service"

const deleteCartService = {
  delete: (headers) =>
    service.delete("public/api/v1/dashboard/user/cart/my-delete", {
      headers,
    }),
}

export default deleteCartService
