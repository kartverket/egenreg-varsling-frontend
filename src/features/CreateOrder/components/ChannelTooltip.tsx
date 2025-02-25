import { IconButton, Stack, Text, Tooltip } from "@kvib/react";

export const ChannelTooltip = () => {
  return (
    <Tooltip
      placement="right"
      label={
        <Stack>
          <Text as="b">Kun e-post / SMS</Text>
          <Text>
            Varselet sendes kun på den valgte kanalen. Hvis mottakeren mangler
            kontaktinformasjon for denne kanalen i KRR, vil varselet ikke bli
            sendt.
          </Text>
          <Text as="b">Foretrekk e-post / SMS</Text>
          <Text>
            Varselet sendes på den foretrukne kanalen hvis kontaktinformasjon er
            tilgjengelig. Hvis ikke, forsøker systemet å sende via den andre
            kanalen.
          </Text>
        </Stack>
      }
      hasArrow
      p={5}
      borderRadius="md"
    >
      <IconButton
        aria-label="IconButton information"
        icon="info"
        colorScheme="blue"
        size="sm"
        variant="ghost"
      />
    </Tooltip>
  );
};
