import { OrderStatus } from "../../../types/types";
import { NotificationsSummary } from "../../OrderDetails/api/types";

export type PaginationOrders = {
  orders: PaginationOrder[];
  isLastPage: boolean;
  numberOfOrders: number;
  nextPageNumber: number;
};

export type PaginationOrder = {
  id: string;
  orderStatus: OrderStatus;
  requestedSendTime: string;
  notificationsSummary: NotificationsSummary;
};
