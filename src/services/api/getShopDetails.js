import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const getShopDetailsService = {
  get: () => {
    return service.get(`${BASE_SERVICE_URL}/shops/501`)
  },
}

export default getShopDetailsService
