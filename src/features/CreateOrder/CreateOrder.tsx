import {
  Alert,
  Box,
  Button,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
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
import {
  førstegangsvarsling_epost_emnefelt,
  førstegangsvarsling_epost_emnefelt_2,
  førstegangsvarsling_epost_innhold,
  førstegangsvarsling_epost_innhold_2,
  førstegangsvarsling_sms_2,
  førstegangsvarsling_sms_standard,
  revarsling_epost_emnefelt,
  revarsling_epost_innhold,
  revarsling_sms_standard,
} from "../../utils/tekster.ts"
import { ChannelTooltip } from "./components/ChannelTooltip.tsx"
import { ConfirmDialog } from "./components/ConfirmDialog.tsx"
import { RequestedSendTime } from "./components/RequestedSendTime.tsx"
import { FormSchema, FormValues, initialValues } from "./formSchema.ts"
import { isInvalid } from "./utils.ts"

const smsOptions: Record<string, string> = {
  førstegangsvarsling: førstegangsvarsling_sms_standard,
  førstegangsvarsling_2: førstegangsvarsling_sms_2,
  revarsling: revarsling_sms_standard,
}

const emailOptions: Record<string, { subject: string; body: string }> = {
  førstegangsvarsling: {
    subject: førstegangsvarsling_epost_emnefelt,
    body: førstegangsvarsling_epost_innhold,
  },
  førstegangsvarsling_2: {
    subject: førstegangsvarsling_epost_emnefelt_2,
    body: førstegangsvarsling_epost_innhold_2,
  },
  revarsling: {
    subject: revarsling_epost_emnefelt,
    body: revarsling_epost_innhold,
  },
}

export const CreateOrder = () => {
  const { open: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        console.log("Payload til backend:", values)
        onOpenDialog()
        helpers.setSubmitting(false)
      }}
      validationSchema={toFormikValidationSchema(FormSchema)}
    >
      {(form: FormikProps<FormValues>) => (
        <Form>
          <Container maxW="container.sm" display="grid" gap={8} p={0}>
            <Heading>Bestill utsending av varsel</Heading>
            <Stack gap={6}>
              <Field invalid={isInvalid(form, "recipients")}>
                <Field label="Mottakere av varselet" />
                <Field helperText="Skriv inn fødselsnummer til mottaker. Flere mottakere skilles med et komma." />
                <Textarea
                  value={form.values.recipients}
                  onChange={form.handleChange("recipients")}
                />
                {form.errors.recipients && <Alert status="error" title={form.errors.recipients} />}
              </Field>

              {/* Kanal */}
              <Field as="fieldset">
                <Flex gap={1} alignItems="center" height="24px">
                  <Field
                    as="legend"
                    label={
                      <>
                        Kanal
                        <ChannelTooltip />
                      </>
                    }
                  />
                </Flex>
                <RadioGroup value={form.values.channel} onChange={form.handleChange("channel")}>
                  <Stack>
                    <Radio value="Sms">SMS</Radio>
                    <Radio value="Email">E-post</Radio>
                    <Radio value="EmailPreferred">Foretrekk e-post</Radio>
                    <Radio value="SmsPreferred">Foretrekk SMS</Radio>
                  </Stack>
                </RadioGroup>
              </Field>

              {/* E-post */}
              {form.values.channel !== "Sms" && (
                <Grid gap={2}>
                  <Field invalid={isInvalid(form, "emailBody")}>
                    <Field label="Velg epost-mal" />
                    <NativeSelect
                      defaultValue={form.values.emailBody}
                      onChange={event => {
                        const key = (event.target as HTMLSelectElement).value
                        form.setFieldValue("emailBody", emailOptions[key].body)
                        form.setFieldValue("emailSubject", emailOptions[key].subject)
                      }}
                    >
                      <NativeSelectField placeholder="Velg e-postmal">
                        <option value="førstegangsvarsling">
                          Førstegangsvarsling - 0 (standard)
                        </option>
                        <option value="førstegangsvarsling_2">
                          Førstegangsvarsling - E-post 2
                        </option>
                        <option value="revarsling">Re-varsling</option>
                      </NativeSelectField>
                    </NativeSelect>

                    {form.values.emailBody && (
                      <Box mt={4}>
                        <Text fontSize="sm" mb={2}>
                          Tekst som blir sendt i e-post:
                        </Text>
                        <Text as={"b"} fontSize="sm" mb={2}>
                          Emne: {form.values.emailSubject}
                        </Text>
                        <Box
                          my={4}
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
                          {form.values.emailBody}
                        </Box>
                      </Box>
                    )}
                  </Field>
                </Grid>
              )}

              {form.values.channel !== "Email" && (
                <Field invalid={isInvalid(form, "smsBody")}>
                  <Field label="Melding på SMS" />
                  <Field helperText="Velg en forhåndsdefinert melding." />
                  <NativeSelect
                    defaultValue={
                      Object.keys(smsOptions).find(
                        key => smsOptions[key] === form.values.smsBody,
                      ) || ""
                    }
                    onChange={event => {
                      const key = (event.target as HTMLSelectElement).value
                      form.setFieldValue("smsBody", smsOptions[key])
                    }}
                  >
                    <NativeSelectField placeholder="Velg SMS-mal">
                      <option value="førstegangsvarsling">
                        Førstegangsvarsling - 0 (standard)
                      </option>
                      <option value="førstegangsvarsling_2">Førstegangsvarsling - SMS 2</option>
                      <option value="revarsling">Re-varsling - (standard)</option>
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
