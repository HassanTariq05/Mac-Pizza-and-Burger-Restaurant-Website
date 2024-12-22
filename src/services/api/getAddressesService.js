import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const getAddressesService = {
  get: (token) => {
    return service.get(`${BASE_USER_URL}/addresses`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  },
}

export default getAddressesService
