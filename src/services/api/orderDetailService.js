import React from "react"
import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const orderDetailService = {
  getDetail: (id, headers) =>
    service.get(`${BASE_USER_URL}/orders/${id}`, { headers }),
}

export default orderDetailService
