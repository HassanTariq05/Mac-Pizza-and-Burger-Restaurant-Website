import React from "react"
import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const categoryService = {
  getAll: (params) =>
    service.get(`${BASE_SERVICE_URL}/categories/paginate`, { params }),
}

export default categoryService
