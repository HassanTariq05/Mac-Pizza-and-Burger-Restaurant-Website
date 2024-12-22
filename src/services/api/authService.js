import { BASE_AUTH_URL } from "../../env/env"
import service from "../network/service"

const authService = {
  authenticate: (params) => service.post(`${BASE_AUTH_URL}/login`, params),
  register: (params) => service.post(`${BASE_AUTH_URL}/register`, params),
}

export default authService
