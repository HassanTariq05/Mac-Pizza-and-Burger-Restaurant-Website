import service from "../network/service"
import { BASE_DASHBOARD_URL } from "../../env/env"

const imageUploadService = {
  uploadImage: (formData, token) =>
    service.post(`${BASE_DASHBOARD_URL}/galleries`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/form-data`,
      },
    }),
}

export default imageUploadService
