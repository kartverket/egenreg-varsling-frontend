import { PaginationOrder } from "./api/types";

export const getSuccessRate = (order: PaginationOrder) => {
  const { delivered, count } = order.notificationsSummary;
  if (order.orderStatus === "Scheduled" || order.orderStatus === "Cancelled")
    return "-";
  else return `${((delivered / count) * 100).toFixed(0)}%`;
};

export const filterOrdersById = (
  orderList: PaginationOrder[] | undefined,
  searchTerm: string,
) =>
  orderList?.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

export const getOrderStatusColorTag = (status: string): string => {
  switch (status) {
    case "Processing":
      return "blue";
    case "Completed":
      return "green";
    case "Failed":
      return "red";
    case "Cancelled":
      return "red";
    case "Scheduled":
      return "gray";
    default:
      throw new Error(`Invalid status: ${status}`);
  }
};
