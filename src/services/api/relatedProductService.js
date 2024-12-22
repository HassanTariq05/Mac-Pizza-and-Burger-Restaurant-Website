import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const relatedProductService = {
  getAll: (params) => {
    const { uuid } = params
    return service.get(`${BASE_SERVICE_URL}/products/related/${uuid}`)
  },
}

export default relatedProductService
