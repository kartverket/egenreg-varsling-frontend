import { Flex, Heading, Spinner, Table } from "@kvib/react"
import { SENDERS_REF } from "../../../App.tsx"
import { CustomAlert } from "../../../components/Alert"
import { Pagination } from "../../../components/Pagination.tsx"
import { usePaginatedOrders } from "../api/getOrders.ts"
import { TableContent } from "./TableContent"

const typeTranslation = {
  planned: "planlagte ordre",
  active: "aktive ordre",
}

type OrdersTableProps = {
  type: "planned" | "active"
}

export const OrdersTable = ({ type }: OrdersTableProps) => {
  const { data, isPending, error, isError, isSuccess, fetchNextPage, isFetching, hasNextPage } =
    usePaginatedOrders(type)
  const typeLabel = typeTranslation[type]
  const heading = typeLabel[0].toUpperCase() + typeLabel.slice(1)

  const orders = data?.pages.flatMap(page => page.orders)
  const hasOrders = !!orders && orders.length > 0

  return (
    <Flex flexDirection="column">
      <Heading size="md">{heading}</Heading>
      {isPending && (
        <Flex justifyContent="center" alignItems="center" height="50%">
          <Spinner size="xl" />
        </Flex>
      )}
      {isError && <CustomAlert status="error" title="Feil" description={error.message} />}
      {isSuccess && !hasOrders && (
        <CustomAlert
          status="warning"
          title="Hmm..."
          description={`Fant ingen ${typeLabel} ordre for avsender ${SENDERS_REF}`}
        />
      )}

      {isSuccess && hasOrders && (
        <Table>
          <TableContent ordersFiltered={orders} />
          <Pagination
            current={orders ? orders.length : data.pages.length}
            total={data?.pages[0].numberOfOrders | 0}
            isFetching={isFetching}
            onShowMore={() => !isFetching && fetchNextPage()}
            isDisabled={!hasNextPage}
          />
        </Table>
      )}
    </Flex>
  )
}
