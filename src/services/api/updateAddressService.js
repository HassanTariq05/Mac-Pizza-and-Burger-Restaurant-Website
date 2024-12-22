import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const updateAddressService = {
  update: (id, body, token) =>
    service.put(`${BASE_USER_URL}/addresses/${id}`, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }),
}

export default updateAddressService
