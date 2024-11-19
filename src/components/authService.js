import service from "../components/service"

const authService = {
  authenticate: (params) => service.post("public/api/v1/auth/login", params),
  register: (params) => service.post("public/api/v1/auth/register", params),
}

export default authService
