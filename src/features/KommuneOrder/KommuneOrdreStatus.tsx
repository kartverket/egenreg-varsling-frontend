import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  Tag,
  Text,
} from "@kvib/react"
import { useQuery } from "@tanstack/react-query"
import { getKommuneOrder, type KommuneOrder } from "./api/kommuneOrderApi"

const dateFormatter = (date: Date) =>
  new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date)

const KommuneOrdreStatus = () => {
  const { data: ordreStatus, isPending } = useQuery<KommuneOrder[]>({
    queryKey: ["kommuneOrderStatus"],
    queryFn: getKommuneOrder,
  })

  const hasOrders = (ordreStatus?.length ?? 0) > 0

  if (isPending) {
    return (
      <Flex alignItems="center" justifyContent="center" height="240px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (!hasOrders) {
    return (
      <Box borderWidth="1px" borderRadius="md" p={6} bg="white" shadow="sm">
        <Heading size="md" mb={2}>
          Kommuneordre status
        </Heading>
        <Text color="gray.600">Ingen kommuneordre å vise enda.</Text>
      </Box>
    )
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={6} bg="white" shadow="sm">
      <Heading size="md" mb={4}>
        Kommuneordre status
      </Heading>
      <Table size="md">
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Ordre ID</TableColumnHeader>
            <TableColumnHeader>Kommunenummer</TableColumnHeader>
            <TableColumnHeader>Gårdsnummer</TableColumnHeader>
            <TableColumnHeader>Totalt antall varslinger</TableColumnHeader>
            <TableColumnHeader>Sendt DPI</TableColumnHeader>
            <TableColumnHeader>Sendt SMS</TableColumnHeader>
            <TableColumnHeader>Ikke tilgjengelig</TableColumnHeader>
            <TableColumnHeader>Feilede</TableColumnHeader>
            <TableColumnHeader>Opprettet</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordreStatus?.map(ordre => (
            <TableRow key={ordre.ordreId}>
              <TableCell>{ordre.ordreId}</TableCell>
              <TableCell>{ordre.kommunenummer}</TableCell>
              <TableCell>{ordre.gardsnummer ?? "-"}</TableCell>
              <TableCell>{ordre.totaltAntallVarslinger}</TableCell>
              <TableCell>
                <Tag colorPalette="green" variant="subtle">
                  {ordre.sendtDPI}
                </Tag>
              </TableCell>
              <TableCell>
                <Tag colorPalette="blue" variant="subtle">
                  {ordre.sendtSMS}
                </Tag>
              </TableCell>
              <TableCell>
                <Tag colorPalette="gray" variant="outline">
                  {ordre.ikkeTilgjengelig}
                </Tag>
              </TableCell>
              <TableCell>
                <Tag colorPalette="red" variant="subtle">
                  {ordre.feilede}
                </Tag>
              </TableCell>
              <TableCell>{dateFormatter(new Date(ordre.startet))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default KommuneOrdreStatus
