import axios from "axios"

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8081"
    : "meldingstjeneste.atkv3-dev.kartverket-intern.cloud"

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`)
    }
    return Promise.reject(error)
  },
)
