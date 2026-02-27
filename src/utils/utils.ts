type Environment = "dev" | "prod" | "localhost" | "unknown"

export const getEnvironment = (): Environment => {
  const hostname = window.location.hostname

  if (hostname.includes("atgcp1-dev")) return "dev"
  if (hostname.includes("atgcp1-prod")) return "prod"
  if (hostname.includes("localhost")) return "localhost"

  return "unknown"
}
