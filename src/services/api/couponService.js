import React from "react"
import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const couponService = {
  check: (params, headers) =>
    service.post(`${BASE_SERVICE_URL}/coupons/check`, params, { headers }),
}

export default couponService
