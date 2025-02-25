import { Table, Thead, Tr, Th, Tbody, Td, Tag } from "@kvib/react";
import { formatDate, statusTranslation } from "../../../utils/utils";
import { getSuccessRate, getOrderStatusColorTag } from "../utils";
import { PaginationOrder } from "../api/types";
import { useNavigate } from "react-router-dom";

type TableContentProps = {
  ordersFiltered: PaginationOrder[] | undefined;
};

export const TableContent = ({ ordersFiltered }: TableContentProps) => {
  const navigate = useNavigate();
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Ordre</Th>
          <Th>Utsending</Th>
          <Th>Antall varsler</Th>
          <Th>Suksessrate</Th>
          <Th width={200}>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ordersFiltered?.map((order) => (
          <Tr
            key={order.id}
            onClick={() => navigate(`${order.id}`)}
            _hover={{
              backgroundColor: "gray.50",
              cursor: "pointer",
            }}
          >
            <Td>{order.id}</Td>
            <Td>{formatDate(order.requestedSendTime)}</Td>
            <Td>{order.notificationsSummary.count}</Td>
            <Td>{getSuccessRate(order)}</Td>
            <Td>
              <Tag
                textColor={
                  order.orderStatus === "Scheduled" ? "Black" : undefined
                }
                variant={
                  order.orderStatus === "Scheduled" ? "outline" : "subtle"
                }
                colorScheme={getOrderStatusColorTag(order.orderStatus)}
              >
                {statusTranslation[order.orderStatus]}
              </Tag>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
