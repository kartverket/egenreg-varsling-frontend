import { FormikProps } from "formik";
import { SENDERS_REF } from "../../App.tsx";
import { OrderRequest } from "./api/types.ts";
import { FormValues } from "./formSchema.ts";

/**
 * Maps Formik state to FormControl validation
 * @param form - The Formik props.
 * @param fieldName - The name of the form field.
 * @returns boolean indicating if the field is invalid.
 */
export const isInvalid = (
  form: FormikProps<FormValues>,
  fieldName: keyof FormValues,
) => {
  return !!form.errors[fieldName] && !!form.touched[fieldName];
};

export const getRecipientList = (recipients: string) =>
  recipients
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

export const mapFormValuesToOrderRequest = (
  formValues: FormValues,
): OrderRequest => {
  return {
    nationalIdentityNumbers: getRecipientList(formValues.recipients),
    notificationChannel: formValues.channel,
    requestedSendTime: combineDateAndTime(
      formValues.date,
      formValues.time,
      formValues.sendTime,
    ),
    sendersReference: SENDERS_REF,
    emailTemplate:
      formValues.emailSubject &&
        formValues.emailBody
        ? { subject: formValues.emailSubject, body: formValues.emailBody }
        : null,
    smsTemplate:
      formValues.smsBody
        ? { body: formValues.smsBody }
        : null,
  };
};

const combineDateAndTime = (
  date: Date,
  time: string,
  sendTime: string,
): Date => {
  if (sendTime === "Now") return new Date();
  const [hours, minutes, seconds] = time.toString().split(":").map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes, seconds);
  return combinedDate;
};
