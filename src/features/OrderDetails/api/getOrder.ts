import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { OrderResponse } from "./types";

export const getOrder = (id: string): Promise<OrderResponse> => {
  return api.get(`/orders/${id}`);
};

export const fetchOrderQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    refetchInterval: 1000 * 60 * 5, // every five minutes
  });
