import { KommuneOrder } from "../features/KommuneOrder/api/kommuneOrderApi.ts"

export const exportToCsv = (orders: KommuneOrder[], kommuner?: any[]) => {
  const headers = [
    "ID",
    "Knr",
    "Gnr",
    "Kommune",
    "Innbyggere forsøkt varslet",
    "Matrikkelenheter forsøkt varslet",
    "Sendt DPI",
    "Sendt SMS",
    "Ikke tilgjengelig",
    "Opprettet",
    "Status",
  ]

  const rows = orders.map(ordre => {
    const kommuneNavn =
      kommuner?.find(k => k.kommunenummer === ordre.kommunenummer)
        ?.kommunenavnNorsk ?? ""

    return [
      ordre.ordreId,
      ordre.kommunenummer,
      ordre.gardsnummer
        ? `${ordre.gardsnummer.fra}-${ordre.gardsnummer.til}`
        : "-",
      kommuneNavn,
      ordre.totaltAntallVarslinger,
      ordre.antallMatrikkelenheterForsoktVarslet ?? "-",
      ordre.sendtDPI,
      ordre.sendtSMS,
      ordre.ikkeTilgjengelig,
      dateFormatter(ordre.startet),
      ordre.status,
    ]
  })

  const csvContent =
    [headers, ...rows]
      .map(row => row.map(value => `"${value}"`).join(","))
      .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "kommuneordre.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const dateFormatter = (value: string | Date | null | undefined) => {
  if (!value) return "-"

  const date = value instanceof Date ? value : new Date(value)

  if (isNaN(date.getTime())) return "-"

  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date)
}
