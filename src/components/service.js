import axios from "axios"

const service = axios.create({
  baseURL: "https://api.macburger.kg",
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

export const baseURL = "https://api.macburger.kg/public"
export const GOOGLE_MAPS_API_KEY = "AIzaSyBiohy_1HfSjWgJBKgAs57BAHguyjH6bIU"
