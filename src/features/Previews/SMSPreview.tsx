import { Box, Text } from "@kvib/react"

const SMSPreview = ({ smsText }: { smsText: string }) => (
  <Box mt={4}>
    <Text fontSize="sm" mb={2}>
      Tekst som blir sendt i SMS:
    </Text>
    <Box
      maxW="320px"
      p={4}
      bg="gray.100"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.300"
      fontSize="sm"
      lineHeight="1.4"
      whiteSpace="pre-wrap"
    >
      {smsText}
    </Box>
  </Box>
)

export default SMSPreview
