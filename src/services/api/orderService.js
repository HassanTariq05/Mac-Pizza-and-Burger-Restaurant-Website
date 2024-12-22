import React from "react"
import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const orderService = {
  create: (params, headers) =>
    service.post(`${BASE_USER_URL}/orders`, params, { headers }),
}

export default orderService
