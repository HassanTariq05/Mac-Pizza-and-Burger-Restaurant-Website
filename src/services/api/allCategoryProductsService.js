import { BASE_SERVICE_URL } from "../../env/env"
import service from "../network/service"

const allCategoryProductService = {
  get: (params) => {
    const { id, page } = params
    return service.get(`${BASE_SERVICE_URL}/products/shop/${id}?page=${page}`)
  },
}

export default allCategoryProductService
