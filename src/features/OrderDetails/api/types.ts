import {
  EmailTemplate,
  NotificationChannel,
  NotificationStatus,
  OrderStatus,
  SmsTemplate,
} from "../../../types/types";

export type OrderResponse = {
  id: string;
  orderStatus: OrderStatus;
  notifications: Notifications;
  sendersReference: string | null;
  requestedSendTime: string;
  created: string;
  notificationChannel: NotificationChannel;
  emailTemplate: EmailTemplate | null;
  smsTemplate: SmsTemplate | null;
};

export type Notifications = {
  notificationsList: Notification[] | null;
  summary: NotificationsSummary;
};

export type Notification = {
  status: NotificationStatus;
  description: string;
  recipient: Recipient;
  lastUpdate: string;
};

export type Recipient = {
  emailAddress: string | null;
  nationalIdentityNumber: string | null;
  mobileNumber: string | null;
  organizationNumber: string | null;
};

export type NotificationsSummary = {
  count: number;
  delivered: number;
  failed: number;
  notIdentified: number;
};
