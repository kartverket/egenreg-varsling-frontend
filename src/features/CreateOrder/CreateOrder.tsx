import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
  Grid,
} from "@kvib/react";
import { Form, Formik, FormikProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ChannelTooltip } from "./components/ChannelTooltip.tsx";
import { ConfirmDialog } from "./components/ConfirmDialog.tsx";
import { RequestedSendTime } from "./components/RequestedSendTime.tsx";
import { FormSchema, FormValues, initialValues } from "./formSchema.ts";
import { isInvalid } from "./utils.ts";

export const CreateOrder = () => {
  const {
    isOpen: isDialogOpen,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onOpenDialog}
      validationSchema={toFormikValidationSchema(FormSchema)}
    >
      {(form: FormikProps<FormValues>) => (
        <Form>
          <Container maxW="container.sm" display="grid" gap={8} p={0}>
            <Heading>Bestill utsending av varsel</Heading>
            <Stack gap={6}>
              <FormControl isInvalid={isInvalid(form, "recipients")}>
                <FormLabel>Mottakere av varselet</FormLabel>
                <FormHelperText>
                  Skriv inn fødselsnummer til mottaker. Flere mottakere skilles
                  med et komma.
                </FormHelperText>
                <Textarea
                  value={form.values.recipients}
                  onChange={form.handleChange("recipients")}
                />
                <FormErrorMessage>{form.errors.recipients}</FormErrorMessage>
              </FormControl>

              <FormControl as="fieldset">
                <Flex gap={1} display="flex" alignItems="center" height="24px">
                  <FormLabel as="legend">
                    Kanal
                    <ChannelTooltip />
                  </FormLabel>
                </Flex>
                <RadioGroup
                  defaultValue={form.values.channel}
                  onChange={form.handleChange("channel")}
                >
                  <Stack>
                    <Radio value="Email">E-post</Radio>
                    <Radio value="Sms">SMS</Radio>
                    <Radio value="EmailPreferred">Foretrekk e-post</Radio>
                    <Radio value="SmsPreferred">Foretrekk SMS</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {form.values.channel !== "Sms" && (
                <Grid gap={2}>
                  <FormControl isInvalid={isInvalid(form, "emailSubject")}>
                    <FormLabel>Emne på e-post</FormLabel>
                    <Input
                      value={form.values.emailSubject}
                      onChange={form.handleChange("emailSubject")}
                    />
                    <FormErrorMessage>
                      {form.errors.emailSubject}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={isInvalid(form, "emailBody")}>
                    <FormLabel>Melding på e-post</FormLabel>
                    <Textarea
                      value={form.values.emailBody}
                      onChange={form.handleChange("emailBody")}
                    />
                    <FormErrorMessage>{form.errors.emailBody}</FormErrorMessage>
                  </FormControl>
                </Grid>
              )}

              {form.values.channel !== "Email" && (
                <FormControl isInvalid={isInvalid(form, "smsBody")}>
                  <FormLabel>Melding på SMS</FormLabel>
                  <FormHelperText>Maks 157 tegn.</FormHelperText>
                  <Textarea
                    value={form.values.smsBody}
                    onChange={form.handleChange("smsBody")}
                  />
                  <FormErrorMessage>{form.errors.smsBody}</FormErrorMessage>
                </FormControl>
              )}
              <RequestedSendTime />
            </Stack>

            <Button type="submit" w="max-content" isLoading={form.isSubmitting}>
              Send varsel
            </Button>

            <ConfirmDialog isOpen={isDialogOpen} closeDialog={onCloseDialog} />
          </Container>
        </Form>
      )}
    </Formik>
  );
};
