import axios from "axios"
import { getAccessToken } from "../features/Orders/api/getToken"

export const apiRoute = "/api"

export const api = axios.create({
  baseURL: apiRoute,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(async config => {
  const token = await getAccessToken()
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data)
    }
    return Promise.reject(error)
  },
)
