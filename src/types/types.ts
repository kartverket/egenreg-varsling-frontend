export type EmailTemplate = {
  fromAddress: string;
  subject: string;
  body: string;
  contentType: string;
};

export type SmsTemplate = {
  senderNumber: string;
  body: string;
};

export type NotificationChannel =
  | "Email"
  | "Sms"
  | "EmailPreferred"
  | "SmsPreferred";

export type OrderStatus =
  | "Processing"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | "Scheduled";

export type NotificationStatus = "Processing" | "Delivered" | "Failed";
