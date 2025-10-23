import { Card, SimpleGrid, Stack, Text } from "@kvib/react"
import { EmailTemplate, SmsTemplate } from "../../../types/types.ts"
import { formatDate } from "../../../utils/utils.ts"
import { OrderResponse } from "../api/types.ts"

type OrderSummaryProps = {
  order: OrderResponse
}

const NotificationDetails = ({
  emailTemplate,
  smsTemplate,
}: {
  emailTemplate?: EmailTemplate | null
  smsTemplate?: SmsTemplate | null
}) => {
  return (
    <>
      <Stack gap={6}>
        <div>
          <Text as="b">AVSENDER E-POST</Text>
          <Text>{emailTemplate?.fromAddress}</Text>
        </div>
        <div>
          <Text as="b">EMNE PÅ E-POST</Text>
          <Text>{emailTemplate?.subject}</Text>
        </div>
        <div>
          <Text as="b">MELDING PÅ E-POST</Text>
          <Text whiteSpace="pre-wrap">{emailTemplate?.body}</Text>
        </div>
      </Stack>
      <Stack gap={6}>
        <div>
          <Text as="b">AVSENDER SMS</Text>
          <Text>{smsTemplate?.senderNumber}</Text>
        </div>
        <div>
          <Text as="b">MELDING PÅ SMS</Text>
          <Text whiteSpace="pre-wrap">{smsTemplate?.body}</Text>
        </div>
      </Stack>
    </>
  )
}

export const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { emailTemplate, smsTemplate, notifications, notificationChannel, requestedSendTime } =
    order
  const isCancelled = order.orderStatus === "Cancelled"

  return (
    <Card variant="outline" py={8} px={12} gap={4} color={isCancelled ? "gray.500" : "inherit"}>
      <SimpleGrid autoColumns="1fr 1fr" gridAutoFlow="column" gap={6}>
        <Stack gap={6}>
          <div>
            <Text as="b">ANTALL MOTTAKERE</Text>
            <Text>{notifications.summary.count}</Text>
          </div>
          <div>
            <Text as="b">KANAL</Text>
            <Text>{notificationChannel}</Text>
          </div>
          <div>
            <Text as="b">TIDSPUNKT FOR UTSENDING</Text>
            <Text>{formatDate(requestedSendTime)}</Text>
          </div>
        </Stack>
        <NotificationDetails emailTemplate={emailTemplate} smsTemplate={smsTemplate} />
      </SimpleGrid>
    </Card>
  )
}
