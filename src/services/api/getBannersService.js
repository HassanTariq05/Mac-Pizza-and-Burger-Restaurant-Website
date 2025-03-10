import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const getBannersService = {
  get: () => {
    return service.get(`${BASE_SERVICE_URL}/banners/paginate`)
  },
}

export default getBannersService
