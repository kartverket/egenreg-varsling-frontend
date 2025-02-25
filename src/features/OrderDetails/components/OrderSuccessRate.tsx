import { Card, Divider, Heading } from "@kvib/react";
import { OrderResponse } from "../api/types.ts";
import DetailRow from "../../../components/DetailRow.tsx";

type OrderSuccessRateProps = {
  order: OrderResponse;
};

export const OrderSuccessRate = ({ order }: OrderSuccessRateProps) => {
  const {
    delivered,
    count: notifications,
    failed,
    notIdentified,
  } = order.notifications.summary;
  const isCancelled = order.orderStatus === "Cancelled";

  const successRate = (delivered / notifications) * 100;

  const totalFailed = failed + notIdentified;

  const totalFailedRate = (totalFailed / notifications) * 100;
  const notIdentifiedRate = (notIdentified / notifications) * 100;
  const otherFailuresRate = (failed / notifications) * 100;

  return (
    <Card
      variant="filled"
      py={8}
      px={12}
      gap={2}
      color={isCancelled ? "gray.500" : "inherit"}
    >
      <Heading as="h3" size="md" mb={2}>
        Suksessrate
      </Heading>
      <DetailRow label="Totalt" value={notifications.toString()} />
      <DetailRow
        label="Vellykket kontakt"
        value={
          delivered > 0
            ? `${delivered} (${successRate.toFixed(0)}%)`
            : delivered.toString()
        }
      />
      <DetailRow
        label="Totalt feilet"
        value={
          totalFailed > 0
            ? `${totalFailed} (${totalFailedRate.toFixed(0)}%)`
            : totalFailed.toString()
        }
      />
      <Divider color="gray.300" />
      <DetailRow
        label="Feilet i KRR (reservert eller mangler)"
        value={
          notIdentified > 0
            ? `${notIdentified} (${notIdentifiedRate.toFixed(0)}%)`
            : notIdentified.toString()
        }
      />
      <DetailRow
        label="Feilet av andre årsaker"
        value={
          failed > 0
            ? `${failed} (${otherFailuresRate.toFixed(0)}%)`
            : failed.toString()
        }
      />
    </Card>
  );
};
