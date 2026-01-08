const kommuneApiRoute = "/kommuneordre"

export const createKommuneOrder = async (kommuneOrder: KommuneOrder) => {
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

export interface KommuneOrder {
  kommunenr: string
  gardsnummer: number
  smsmelding: string
  dpimelding: {
    tittel: string
    body: string
  }
}
