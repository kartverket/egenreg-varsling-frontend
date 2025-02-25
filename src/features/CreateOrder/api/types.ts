import { NotificationChannel, OrderStatus } from "../../../types/types";

export type OrderRequest = {
  nationalIdentityNumbers: string[];
  notificationChannel: NotificationChannel;
  requestedSendTime: Date | null;
  sendersReference: string;
  emailTemplate: {
    subject: string;
    body: string;
  } | null;
  smsTemplate: {
    body: string;
  } | null;
};

export type OrderConfirmation = {
  id: string;
  orderStatus: OrderStatus | null;
  recipientLookup: RecipientLookup | null;
  requestedSendTime: string | null;
  statusLink: string | null;
};

export type RecipientLookup = {
  recipientLookupStatus: "Success" | "PartialSuccess" | "Failed";
  validRecipients: string[] | null;
  reservedRecipients: string[] | null;
  missingContactRecipients: string[] | null;
};
