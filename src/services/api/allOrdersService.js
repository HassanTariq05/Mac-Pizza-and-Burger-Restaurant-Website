import { BASE_USER_URL } from "../../env/env"
import service from "../network/service"

const allOrdersService = {
  get: (token) => {
    return service.get(`${BASE_USER_URL}/orders/paginate`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": `multipart/form-data`,
      },
    })
  },
}

export default allOrdersService
