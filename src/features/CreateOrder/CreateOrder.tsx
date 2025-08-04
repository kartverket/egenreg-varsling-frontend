import {
  Alert,
  Box,
  Button,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Input,
  NativeSelect,
  NativeSelectField,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@kvib/react"
import { Form, Formik, FormikProps } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { ChannelTooltip } from "./components/ChannelTooltip.tsx"
import { ConfirmDialog } from "./components/ConfirmDialog.tsx"
import { RequestedSendTime } from "./components/RequestedSendTime.tsx"
import { FormSchema, FormValues, initialValues } from "./formSchema.ts"
import { isInvalid } from "./utils.ts"

export const CreateOrder = () => {
  const { open: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()

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
              <Field invalid={isInvalid(form, "recipients")}>
                <Field label="Mottakere av varselet" />
                <Field helperText=" Skriv inn fødselsnummer til mottaker. Flere mottakere skilles med et komma." />

                <Textarea
                  value={form.values.recipients}
                  onChange={form.handleChange("recipients")}
                />
                {form.errors.recipients && (
                  <Alert status={"error"} title={form.errors.recipients}></Alert>
                )}
              </Field>
              <Field as="fieldset">
                <Flex gap={1} display="flex" alignItems="center" height="24px">
                  <Field
                    as="legend"
                    label={
                      <>
                        Kanal
                        <ChannelTooltip />
                      </>
                    }
                  ></Field>
                </Flex>
                <RadioGroup
                  defaultValue={form.values.channel}
                  onChange={form.handleChange("channel")}
                >
                  <Stack>
                    <Radio value="Sms">SMS</Radio>
                    <Radio value="Email">E-post</Radio>
                    <Radio value="EmailPreferred">Foretrekk e-post</Radio>
                    <Radio value="SmsPreferred">Foretrekk SMS</Radio>
                  </Stack>
                </RadioGroup>
              </Field>
              {form.values.channel !== "Sms" && (
                <Grid gap={2}>
                  <Field invalid={isInvalid(form, "emailSubject")}>
                    <Field label="Emne på e-post" />
                    <Input
                      value={form.values.emailSubject}
                      onChange={form.handleChange("emailSubject")}
                    />
                    <Field errorText={form.errors.emailSubject} />
                  </Field>

                  <Field invalid={isInvalid(form, "emailBody")}>
                    <Field label="Melding på e-post" />
                    <Textarea
                      value={form.values.emailBody}
                      onChange={form.handleChange("emailBody")}
                    />
                    <Field errorText={form.errors.emailBody} />
                  </Field>
                </Grid>
              )}
              {form.values.channel !== "Email" && (
                <Field invalid={isInvalid(form, "smsBody")}>
                  <Field label="Melding på SMS" />
                  <Field helperText="Velg en forhåndsdefinert melding." />

                  <NativeSelect
                    defaultValue={form.values.smsBody}
                    onChange={event =>
                      form.setFieldValue("smsBody", (event.target as HTMLSelectElement).value)
                    }
                    size="sm"
                  >
                    <NativeSelectField placeholder="Velg meldingsvariant">
                      <option value="Ny tjeneste fra Kartverket - du kan nå oppdatere opplysninger om din eiendom. Logg inn på Eiendomsregisteret på Kartverkets nettsider.">
                        Førstegangsvarsling
                      </option>
                      <option value="Husk at du nå kan sjekke og oppdatere opplysninger om din eiendom. Logg inn på Eiendomsregisteret på Kartverkets nettsider.">
                        Re-varsling
                      </option>
                    </NativeSelectField>
                  </NativeSelect>

                  {form.values.smsBody && (
                    <Box mt={4}>
                      <Text fontSize="sm" mb={2}>
                        Tekst som blir sendt i SMS:
                      </Text>

                      <Box
                        maxW="320px"
                        p={4}
                        bg="gray.100"
                        borderRadius="lg"
                        boxShadow="md"
                        border="1px solid"
                        borderColor="gray.300"
                        fontSize="sm"
                        lineHeight="1.4"
                        whiteSpace="pre-wrap"
                      >
                        {form.values.smsBody}
                      </Box>
                    </Box>
                  )}

                  <Field errorText={form.errors.smsBody} />
                </Field>
              )}
              <RequestedSendTime />
            </Stack>

            <Button type="submit" w="max-content" loading={form.isSubmitting}>
              Send varsel
            </Button>

            <ConfirmDialog isOpen={isDialogOpen} closeDialog={onCloseDialog} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
