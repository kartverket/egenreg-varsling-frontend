import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  Tag,
} from "@kvib/react"
import { useNavigate } from "react-router-dom"
import { formatDate, statusTranslation } from "../../../utils/utils"
import { PaginationOrder } from "../api/types"
import { getOrderStatusColorTag, getSuccessRate } from "../utils"

type TableContentProps = {
  ordersFiltered: PaginationOrder[] | undefined
}

export const TableContent = ({ ordersFiltered }: TableContentProps) => {
  const navigate = useNavigate()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Ordre</TableColumnHeader>
          <TableColumnHeader>Utsending</TableColumnHeader>
          <TableColumnHeader>Antall varsler</TableColumnHeader>
          <TableColumnHeader>Suksessrate</TableColumnHeader>
          <TableColumnHeader width={200}>Status</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersFiltered?.map(order => (
          <TableRow
            key={order.id}
            onClick={() => navigate(`${order.id}`)}
            _hover={{
              backgroundColor: "gray.50",
              cursor: "pointer",
            }}
          >
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatDate(order.requestedSendTime)}</TableCell>
            <TableCell>{order.notificationsSummary.count}</TableCell>
            <TableCell>{getSuccessRate(order)}</TableCell>
            <TableCell>
              <Tag
                colorPalette={getOrderStatusColorTag(order.orderStatus)}
                variant={order.orderStatus === "Scheduled" ? "outline" : "subtle"}
               >
                {statusTranslation[order.orderStatus]}
              </Tag>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
