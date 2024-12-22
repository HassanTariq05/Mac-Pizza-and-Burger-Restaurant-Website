import axios from "axios"
import { BASE_URL } from "../../env/env"

const service = axios.create({
  BASE_URL: BASE_URL,
  timeout: 16000,
  withCredentials: false,
})

service.interceptors.response.use(
  (response) => {
    response.data.status = response.status
    return response
  },
  (error) => {
    if (error.response) {
      error.response.data.status = error.response.status
    }
    return Promise.reject(error)
  }
)

export default service
