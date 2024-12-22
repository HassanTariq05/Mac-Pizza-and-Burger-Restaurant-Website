import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const deliveryPriceService = {
  getPrice: () => {
    return service.get(`${BASE_SERVICE_URL}/delivery-prices`)
  },
}

export default deliveryPriceService
