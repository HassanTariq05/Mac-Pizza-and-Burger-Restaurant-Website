import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const getDeliveryPoints = {
  get: () => {
    return service.get(`${BASE_SERVICE_URL}/delivery-points?perPage=100`)
  },
}

export default getDeliveryPoints
