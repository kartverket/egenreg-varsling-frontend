import { Notification } from "./api/types.ts";

export const getNotificationChannelLabel = (notification: Notification) => {
  if (notification.recipient.emailAddress) {
    return "e-post";
  }
  if (notification.recipient.mobileNumber) {
    return "SMS";
  }
  return "-";
};

export const getRecipients = (notifications: Notification[]) =>
  notifications
    .filter((notification) => notification.status === "Delivered")
    .map(
      (notification) =>
        notification.recipient.nationalIdentityNumber ||
        notification.recipient.emailAddress ||
        notification.recipient.mobileNumber,
    );
