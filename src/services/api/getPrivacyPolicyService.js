import service from "../network/service"
import { BASE_SERVICE_URL } from "../../env/env"

const getPrivacyPolicyService = {
  get: () => {
    return service.get(`${BASE_SERVICE_URL}/policy`)
  },
}

export default getPrivacyPolicyService
