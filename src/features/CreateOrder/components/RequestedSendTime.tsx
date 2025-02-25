import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { FormValues } from "../formSchema";
import { parse } from "date-fns";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  getCurrentTime,
  Stack,
  Radio,
  FormHelperText,
  HStack,
  Box,
  Datepicker,
  Timepicker,
  FormErrorMessage,
} from "@kvib/react";
import { isInvalid } from "../utils";

export const RequestedSendTime = () => {
  const scrollToDatePick = useRef<HTMLDivElement | null>(null);

  const form = useFormikContext<FormValues>();
  useEffect(() => {
    scrollToDatePick.current?.scrollIntoView({ behavior: "smooth" });
  }, [form.values.sendTime]);

  return (
    <Box>
      <FormControl as="fieldset">
        <FormLabel as="legend">Når skal varselet sendes?</FormLabel>
        <RadioGroup
          defaultValue={form.values.sendTime}
          onChange={(e) => {
            form.setFieldValue("sendTime", e);
            if (e === "Now") {
              form.setFieldValue("date", new Date());
              form.setFieldValue("time", getCurrentTime());
            }
          }}
        >
          <Stack dir="column">
            <Radio value="Now">Nå</Radio>
            <Radio value="Later">Senere</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {form.values.sendTime !== "Now" && (
        <FormControl isInvalid={isInvalid(form, "date")}>
          <FormHelperText>
            Varsler på SMS sendes kun ut mellom klokken 09:00 og 17:00.
          </FormHelperText>
          <HStack ref={scrollToDatePick}>
            <Box w="80%">
              <Datepicker
                defaultSelected={new Date()}
                onChange={(e) =>
                  form.setFieldValue(
                    "date",
                    parse(e.target.value, "dd.MM.yyyy", new Date()),
                  )
                }
              />
            </Box>
            <Timepicker
              defaultValue={getCurrentTime()}
              onChange={(e) => form.setFieldValue("time", e)}
            />
          </HStack>
          <FormErrorMessage>{form.errors.date as string}</FormErrorMessage>
        </FormControl>
      )}
    </Box>
  );
};
