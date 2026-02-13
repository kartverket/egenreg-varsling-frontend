import { Box, FieldLabel, Flex, Input } from "@kvib/react"

const Gårdsnummmerserie = ({ skipGardsnummer }: { skipGardsnummer: boolean }) => {
  return (
    <Flex gap={4}>
      <Box>
        <FieldLabel>Fra:</FieldLabel>
        <Input disabled={skipGardsnummer} name="fra" type="number" />
      </Box>

      <Box>
        <FieldLabel>Til:</FieldLabel>
        <Input disabled={skipGardsnummer} name="til" type="number" />
      </Box>
    </Flex>
  )
}

export default Gårdsnummmerserie
