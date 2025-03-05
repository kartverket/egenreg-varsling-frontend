import { api } from "../../../lib/api"

export const cancelOrder = async (id: string): Promise<number> => {

  const response = await api.put(`/orders/${id}/cancel`)
  return response.status
}
