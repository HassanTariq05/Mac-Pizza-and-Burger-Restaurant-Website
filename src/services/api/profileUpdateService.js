import service from "../network/service"
import { BASE_USER_URL } from "../../env/env"

const profileUpdateService = {
  updateProfile: (body, token) =>
    service.put(`${BASE_USER_URL}/profile/update`, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }),
}

export default profileUpdateService
