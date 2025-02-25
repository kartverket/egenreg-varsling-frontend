import { Card, Flex, Icon, MaterialSymbol, Text } from "@kvib/react";
import { OrderResponse } from "../api/types.ts";
import { formatDate } from "../../../utils/utils.ts";

const getStatusMeta = (
  order: OrderResponse,
): {
  title: string;
  description: string;
  icon: MaterialSymbol;
  bg: string;
} => {
  switch (order.orderStatus) {
    case "Processing":
      return {
        title: "Prosesseres",
        description: "Bestillingen behandles av Altinn",
        icon: "rule_settings",
        bg: "blue.100",
      };
    case "Scheduled":
      return {
        title: "Planlagt",
        description: `Blir sendt ${formatDate(order.requestedSendTime)}`,
        icon: "schedule",
        bg: "gray.100",
      };
    case "Completed":
      return {
        title: "Fullført",
        description: `${order.notifications.summary.delivered}/${order.notifications.summary.count} varsler ble sendt vellykket`,
        icon: "check_circle",
        bg: "green.100",
      };
    case "Failed":
      return {
        title: "Feilet",
        description: "Alle varsler feilet",
        icon: "error",
        bg: "red.100",
      };
    case "Cancelled":
      return {
        title: "Kansellert",
        description: "Ordren ble kansellert av bruker",
        icon: "cancel",
        bg: "red.100",
      };
  }
};

type OrderStatusProps = {
  order: OrderResponse;
};

export const OrderStatus = ({ order }: OrderStatusProps) => {
  const { title, description, icon, bg } = getStatusMeta(order);

  return (
    <Card
      variant="filled"
      py={8}
      px={12}
      justifyContent="space-between"
      direction="row"
      bg={bg}
    >
      <Flex direction="column" justify="center" maxW="50%">
        <Text as="b">ORDRE-ID</Text>
        <Text>{order.id}</Text>
      </Flex>
      <Flex gap={3} align="center" textAlign="right">
        <div>
          <Text as="b">{title}</Text>
          <Text gridColumn={1}>{description}</Text>
        </div>
        <Icon size={48} icon={icon} />
      </Flex>
    </Card>
  );
};
