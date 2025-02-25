import { AltinnCancelOrderResponse } from "./types";
import { api } from "../../../lib/api";

export const cancelOrder = (id: string): Promise<AltinnCancelOrderResponse> => {
  return api.put(`/notifications/api/v1/orders/${id}/cancel`);
};
