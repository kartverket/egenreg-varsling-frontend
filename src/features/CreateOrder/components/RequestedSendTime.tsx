import {
  Box,
  Datepicker,
  Field,
  getCurrentTime,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Timepicker,
} from "@kvib/react"
import { parse } from "date-fns"
import { useFormikContext } from "formik"
import { useEffect, useRef } from "react"
import { FormValues } from "../formSchema"
import { isInvalid } from "../utils"

export const RequestedSendTime = () => {
  const scrollToDatePick = useRef<HTMLDivElement | null>(null)

  const form = useFormikContext<FormValues>()
  useEffect(() => {
    scrollToDatePick.current?.scrollIntoView({ behavior: "smooth" })
  }, [form.values.sendTime])

  return (
    <Box>
      <Field as="fieldset">
        <Field as="legend" label="Når skal varselet sendes?" />
        <RadioGroup
          defaultValue={form.values.sendTime}
          onValueChange={e => {
            form.setFieldValue("sendTime", e.value)
            if (e.value === "Now") {
              form.setFieldValue("date", new Date())
              form.setFieldValue("time", getCurrentTime())
            }
          }}
        >
          <Stack dir="column">
            <Radio value="Now">Nå</Radio>
            <Radio value="Later">Senere</Radio>
          </Stack>
        </RadioGroup>
      </Field>

      {form.values.sendTime !== "Now" && (
        <Field
          invalid={isInvalid(form, "date")}
          helperText="Varsler på SMS sendes kun ut mellom klokken 09:00 og 17:00."
          errorText={form.errors.date as string}
        >
          <HStack ref={scrollToDatePick}>
            <Box w="80%">
              <Datepicker
                defaultSelected={new Date()}
                onChange={e =>
                  form.setFieldValue("date", parse(e.target.value, "dd.MM.yyyy", new Date()))
                }
              />
            </Box>
            <Timepicker
              defaultValue={getCurrentTime()}
              onChange={e => form.setFieldValue("time", e)}
            />
          </HStack>
        </Field>
      )}
    </Box>
  )
}
