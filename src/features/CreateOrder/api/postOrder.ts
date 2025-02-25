import { OrderConfirmation, OrderRequest } from "./types.ts";
import { api } from "../../../lib/api.ts";

export const postOrder = (body: OrderRequest): Promise<OrderConfirmation> => {
  return api.post("/orders", body);
};
