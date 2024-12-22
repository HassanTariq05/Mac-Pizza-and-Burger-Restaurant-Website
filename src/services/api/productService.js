import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const productService = {
  getAll: (params) => {
    const { id, page } = params
    return service.get(
      `${BASE_SERVICE_URL}/products/category/${id}?page=${page}`
    )
  },
}

export default productService
