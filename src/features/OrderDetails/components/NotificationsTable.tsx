import {
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@kvib/react";
import { useState } from "react";
import { Notification } from "../api/types.ts";
import { getNotificationChannelLabel } from "../utils.ts";
import { statusTranslation } from "../../../utils/utils.ts";

type NotificationsTableProps = {
  notifications: Notification[];
};

const PAGE_SIZE = 10;

export const NotificationsTable = ({
  notifications,
}: NotificationsTableProps) => {
  const [listSize, setListSize] = useState(PAGE_SIZE);
  const total = notifications.length;

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Mottaker</Th>
            <Th>Kanal</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications.slice(0, listSize).map((notification) => (
            <Tr key={crypto.randomUUID()}>
              <Td>
                {notification.recipient.nationalIdentityNumber ||
                  notification.recipient.emailAddress ||
                  notification.recipient.mobileNumber}
              </Td>
              <Td>{getNotificationChannelLabel(notification)}</Td>
              <Td>{statusTranslation[notification.status]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Stack direction="row" align="center">
        <Button
          isDisabled={listSize >= total}
          variant="tertiary"
          rightIcon="arrow_downward"
          onClick={() => setListSize((prev) => prev + PAGE_SIZE)}
        >
          Last inn flere varsler
        </Button>
        <Text color="gray.500" ml="auto">
          {Math.min(listSize, total)} av {total} er vist
        </Text>
      </Stack>
    </>
  );
};
