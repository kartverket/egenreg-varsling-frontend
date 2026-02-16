import { Heading, Stack } from "@kvib/react"
import CreateKommuneOrder from "./CreateKommuneOrder"

const KommuneOrder = () => {
  const env = (): "dev" | "prod" | "localhost" | "unknown" => {
    const env = window.location.hostname

    if (env.includes("atgcp1-dev")) {
      return "dev"
    }
    if (env.includes("atgcp1-prod")) {
      return "prod"
    }

    if (env.includes("localhost")) {
      return "localhost"
    } else return "unknown"
  }

  return (
    <Stack align="center" justify="center" padding="4">
      <Heading color={env() != "prod" ? "blue" : "red"}>Du er nå i {env()}</Heading>
      <CreateKommuneOrder />
    </Stack>
  )
}

export default KommuneOrder
