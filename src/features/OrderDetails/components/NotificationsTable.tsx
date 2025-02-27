import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  Td,
  Text,
} from "@kvib/react"
import { useState } from "react"
import { statusTranslation } from "../../../utils/utils.ts"
import { Notification } from "../api/types.ts"
import { getNotificationChannelLabel } from "../utils.ts"

type NotificationsTableProps = {
  notifications: Notification[]
}

const PAGE_SIZE = 10

export const NotificationsTable = ({ notifications }: NotificationsTableProps) => {
  const [listSize, setListSize] = useState(PAGE_SIZE)
  const total = notifications.length

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Mottaker</TableColumnHeader>
            <TableColumnHeader>Kanal</TableColumnHeader>
            <TableColumnHeader>Status</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.slice(0, listSize).map(notification => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell>
                {notification.recipient.nationalIdentityNumber ||
                  notification.recipient.emailAddress ||
                  notification.recipient.mobileNumber}
              </TableCell>
              <TableCell>{getNotificationChannelLabel(notification)}</TableCell>
              <Td>{statusTranslation[notification.status]}</Td>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction="row" align="center">
        <Button
          disabled={listSize >= total}
          variant="tertiary"
          rightIcon="arrow_downward"
          onClick={() => setListSize(prev => prev + PAGE_SIZE)}
        >
          Last inn flere varsler
        </Button>
        <Text color="gray.500" ml="auto">
          {Math.min(listSize, total)} av {total} er vist
        </Text>
      </Stack>
    </>
  )
}
