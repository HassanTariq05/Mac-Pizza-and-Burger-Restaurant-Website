import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const deleteAddressService = {
  delete: (id, body, token) =>
    service.delete(`${BASE_USER_URL}/addresses/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: body,
    }),
}

export default deleteAddressService
