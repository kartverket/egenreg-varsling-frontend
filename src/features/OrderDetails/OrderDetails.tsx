import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kvib/react"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Link, useParams } from "react-router-dom"
import invariant from "tiny-invariant"
import { CustomAlert } from "../../components/Alert.tsx"
import { fetchOrderQueryOptions } from "./api/getOrder.ts"
import { CancelOrder } from "./components/CancelOrder.tsx"
import { DownloadRecipients } from "./components/DownloadRecipients.tsx"
import { NotificationsTable } from "./components/NotificationsTable.tsx"
import { OrderStatus } from "./components/OrderStatus.tsx"
import { OrderSuccessRate } from "./components/OrderSuccessRate.tsx"
import { OrderSummary } from "./components/OrderSummary.tsx"

export const OrderDetails = () => {
  const { id } = useParams()
  invariant(id, "ID is somehow wrong")

  const { data: order, isPending, error, isError } = useQuery(fetchOrderQueryOptions(id))

  if (isPending) {
    return (
      <Flex justifyContent="center" alignItems="center" height="50%">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (isError) {
    if ((error as AxiosError).status === 404) {
      return (
        <CustomAlert
          status="warning"
          title="Hmm..."
          description={`Ingen data funnet for denne ordren ${id}.`}
        />
      )
    }
    return <CustomAlert status="error" title="Feil" description={error.message} />
  }

  const isCancelled = order.orderStatus === "Cancelled"

  // Checks whether the requested send time is after now and that the orderstatus isn't already cancelled.
  const shouldRenderCancelButton = () => {
    const nowPlusFiveMinutes = new Date()
    nowPlusFiveMinutes.setMinutes(nowPlusFiveMinutes.getMinutes() + 5)
    return new Date(order.requestedSendTime.toString()) > nowPlusFiveMinutes && !isCancelled
  }

  return (
    <Container maxW="container.lg" display="grid" gap={8} p={0} position="relative">
      <Breadcrumb position="absolute" top="-40px">
        <BreadcrumbItem>
          <Link to="/orders">
            Oversikt
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Informasjon om ordren</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading size="xl">Informasjon om ordren</Heading>

      <Stack gap={4}>
        <OrderStatus order={order} />
        <Tabs size="md" w="100%" defaultValue="1">
          <TabsList>
            <TabsTrigger value="1">Oppsummering</TabsTrigger>
            <TabsTrigger value="2" disabled={isCancelled}>
              Varsler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" display="grid" gap={4} px={0}>
            <OrderSummary order={order} />
            <OrderSuccessRate order={order} />
            {shouldRenderCancelButton() && <CancelOrder orderID={order?.id} />}
          </TabsContent>
          <TabsContent value="2" display="grid" gap={2} px={0} py={9}>
            {order.notifications.summary.count &&
            order.notifications.notificationsList &&
            order.notifications.summary.count > 0 ? (
              <>
                <DownloadRecipients notifications={order.notifications.notificationsList} />
                <NotificationsTable notifications={order.notifications.notificationsList} />
              </>
            ) : (
              <CustomAlert
                status="warning"
                title="Ingen varsler generert"
                description="Det har ikke blitt generert noen varsler for denne ordren enda."
              />
            )}
          </TabsContent>
        </Tabs>
      </Stack>
    </Container>
  )
}
