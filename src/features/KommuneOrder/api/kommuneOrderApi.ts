const kommuneApiRoute = "/kommuneordre"

export const createKommuneOrder = async (kommuneOrder: CreateKommuneOrderDTO) => {
  const response = await fetch(`${kommuneApiRoute}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kommuneOrder),
  })

  if (!response.ok) {
    throw new Error("Failed to create kommune order")
  }

  return response.status === 202
}

export const getKommuneOrder = async () => {
  const response = await fetch(`${kommuneApiRoute}/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch kommune orders")
  }

  const data: KommuneOrder[] = await response.json()
  return data
}

export interface CreateKommuneOrderDTO {
  kommunenr: string
  gardsnummer: number
  smsmelding: string
  dpimelding: {
    tittel: string
    body: string
  }
}

export interface KommuneOrder {
  ordreId: string
  kommunenummer: string
  gardsnummer: number
  totaltAntallVarslinger: number
  sendtDPI: number
  sendtSMS: number
  ikkeTilgjengelig: number
  feilede: number
  startet: string
}
