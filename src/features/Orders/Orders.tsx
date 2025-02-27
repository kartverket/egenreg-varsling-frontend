import { Box, Flex, Heading, SearchAsync } from "@kvib/react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { SENDERS_REF } from "../../App"
import { fetchOrderIds } from "./api/getOrders"
import { OrdersTable } from "./components/OrdersTable"

export const Orders = () => {
  const navigate = useNavigate()
  const { data } = useQuery(fetchOrderIds(SENDERS_REF))

  const defaultOptions = data?.map((opt: string) => ({
    label: opt,
    value: opt,
  }))

  const loadOptions = async (inputValue: string) => {
    const filteredOptions = defaultOptions?.filter(item =>
      item?.label.toLowerCase().includes(inputValue.toLowerCase()),
    )
    return new Promise(resolve => resolve(filteredOptions))
  }

  return (
    <Flex flexDirection="column" gap="8">
      <Heading size="xl">Oversikt over alle ordre</Heading>
      <Box maxW="md">
        <SearchAsync
          multi={false}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          onChange={e => navigate(`${e?.value}`)}
          placeholder="Søk etter ordre"
        />
      </Box>
      <OrdersTable type="active" />
      <OrdersTable type="planned" />
    </Flex>
  )
}
