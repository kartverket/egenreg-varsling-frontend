import { Heading, Stack } from "@kvib/react"
import { getEnvironment } from "../../utils/utils"
import CreateKommuneOrder from "./CreateKommuneOrder"

const KommuneOrder = () => {
  return (
    <Stack align="center" justify="center" padding="4">
      <Heading color={getEnvironment() != "prod" ? "blue" : "red"}>
        Du er nå i {getEnvironment()}
      </Heading>
      <CreateKommuneOrder />
    </Stack>
  )
}

export default KommuneOrder
