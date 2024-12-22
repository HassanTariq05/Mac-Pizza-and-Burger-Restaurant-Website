import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const singleProductService = {
  getAll: (params) => {
    const { id } = params
    return service.get(`${BASE_SERVICE_URL}/products/${id}`)
  },
}

export default singleProductService
