import { IconButton, Stack, Text, Tooltip } from "@kvib/react"

export const ChannelTooltip = () => {
  return (
    <Tooltip
      showArrow
      content={
        <Stack>
          <Text as="b">Foretrekk kanal</Text>
          <Text>
            Varselet sendes på den foretrukne kanalen hvis kontaktinformasjon er tilgjengelig. Hvis
            ikke, forsøker systemet å sende via den andre kanalen.
          </Text>
        </Stack>
      }
    >
      <IconButton
        aria-label="IconButton information"
        icon="info"
        colorScheme="blue"
        size="sm"
        variant="ghost"
      />
    </Tooltip>
  )
}
