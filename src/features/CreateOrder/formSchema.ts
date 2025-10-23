import { z } from "zod"
import { getRecipientList } from "./utils.ts"

/**
 * Validates a comma-separated list of recipients, checking if each is a valid 11-digit number.
 * It trims whitespace and ignores empty entries.
 * @param {string} recipients - A comma-separated string of recipient identifiers.
 * @returns {boolean} - Returns `true` if all recipients are valid 11-digit numbers, otherwise `false`.
 */
const validateRecipients = (recipients: string): boolean => {
  const recipientList = getRecipientList(recipients)
  const invalidRecipients = recipientList.filter(r => !r.match(/^[0-9]{11}$/))
  return invalidRecipients.length === 0
}

/**
 * Validates if a date and time is in the future or not.
 * @param {Date} date - The send date.
 * @param {string} time - The send time.
 * @returns {boolean} - Returns `true` if the send time is in the future, otherwise `false`.
 */
const validateDate = (date: Date, time: string, sendTime: string): boolean => {
  if (sendTime === "Now") return true

  const [hours, minutes] = time.toString().split(":").map(Number)
  const combinedDateTime = new Date(date)
  combinedDateTime.setHours(hours, minutes, 0, 0)
  const nowMinusOneMinute = new Date(Date.now() - 60 * 1000)

  return combinedDateTime >= nowMinusOneMinute
}

export const FormSchema = z
  .object({
    channel: z.union([
      z.literal("EmailPreferred"),
      z.literal("SmsPreferred"),
    ]),
    recipients: z.string().refine(validateRecipients, "Ugyldig fødselsnummer"),
    sendTime: z.union([z.literal("Now"), z.literal("Later")]),
    date: z.date(),
    time: z.custom(),
    emailSubject: z.string().optional(),
    emailBody: z.string().optional(),
    smsBody: z
      .string()
      .max(157, { message: "SMS-meldinger kan ikke overstige 157 tegn" })
      .optional(),
  })
  .refine(
    data =>
      data.channel === "EmailPreferred"
        ? data.emailSubject && data.emailBody
        : data.channel === "SmsPreferred"
          ? data.smsBody
          : true,
    {
      message: "Nødvendige felter mangler basert på valgt kanal",
      path: ["channel"],
    },
  )
  .refine(data => validateDate(new Date(data.date), data.time, data.sendTime), {
    message: "Sendetid må være i fremtiden",
    path: ["date"],
  })

export type FormValues = z.infer<typeof FormSchema>

export const initialValues: FormValues = {
  channel: "SmsPreferred",
  emailSubject: "",
  emailBody: "",
  smsBody: "",
  recipients: "",
  sendTime: "Now",
  date: new Date(),
  time: new Date().toLocaleTimeString("en-GB"),
}
