import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { SENDERS_REF } from "../../../App.tsx";
import { PaginationOrders } from "./types";
import { api } from "../../../lib/api";

export const getPaginatedOrders = ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}): Promise<PaginationOrders> => {
  const sendersRef = queryKey[1] || SENDERS_REF; // Use the second element in queryKey as sendersReference
  const type = queryKey[2] || "active"; // Use the third element in queryKey as type

  return api.get(
    `orders?type=${type}&sendersReference=${sendersRef}&index=${pageParam}`,
  );
};

export const usePaginatedOrders = (type: "planned" | "active") => {
  return useInfiniteQuery({
    queryKey: ["planned-orders", SENDERS_REF, type],
    queryFn: getPaginatedOrders,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.isLastPage ? null : lastPage.nextPageNumber,
    refetchOnWindowFocus: false,
  });
};

export const fetchOrderIds = (sendersRef: string) =>
  queryOptions({
    queryKey: ["order", sendersRef],
    queryFn: () => getOrderIds(sendersRef),
    refetchInterval: 1000 * 60 * 5, // every five minutes
  });

export const getOrderIds = (sendersRef: string): Promise<string[]> => {
  return api.get(`orders/ids/${sendersRef}`);
};
