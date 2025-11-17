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
import { useState } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import {
  førstegangsvarsling_epost_emnefelt,
  førstegangsvarsling_epost_innhold,
  førstegangsvarsling_sms,
  informasjonsbrev_epost_sandnes_emne,
  informasjonsbrev_epost_sandnes_innhold,
  revarsling_epost_emnefelt,
  revarsling_epost_innhold,
  revarsling_sms,
} from "../../utils/tekster.ts"
import { ChannelTooltip } from "./components/ChannelTooltip.tsx"
import { ConfirmDialog } from "./components/ConfirmDialog.tsx"
import { RequestedSendTime } from "./components/RequestedSendTime.tsx"
import { FormSchema, FormValues, initialValues } from "./formSchema.ts"
import { getRecipientList, isInvalid } from "./utils.ts"

const smsOptions: Record<string, string> = {
  førstegangsvarsling: førstegangsvarsling_sms,
  revarsling: revarsling_sms,
}

const emailOptions: Record<string, { subject: string; body: string }> = {
  førstegangsvarsling: {
    subject: førstegangsvarsling_epost_emnefelt,
    body: førstegangsvarsling_epost_innhold,
  },
  revarsling: {
    subject: revarsling_epost_emnefelt,
    body: revarsling_epost_innhold,
  },
  informasjonsbrev_sandnes: {
    subject: informasjonsbrev_epost_sandnes_emne,
    body: informasjonsbrev_epost_sandnes_innhold,
  },
}

export const CreateOrder = () => {
  const { open: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()
  const [smsVarselstype, setSmsVarselstype] = useState<string>("")
  const [emailVarselstype, setEmailVarselstype] = useState<string>("")

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
                <Field label={<strong>Mottakere av varselet</strong>} />
                <Field helperText="Skriv inn fødselsnummer til mottaker. Flere mottakere skilles med et komma." />
                <Textarea
                  value={form.values.recipients}
                  onChange={form.handleChange("recipients")}
                />
                {form.errors.recipients && <Alert status="error" title={form.errors.recipients} />}
                <Text>Antall mottakere: {getRecipientList(form.values.recipients).length}</Text>
              </Field>

              {/* Kanal */}
              <Field as="fieldset">
                <Flex gap={1} alignItems="center" height="24px">
                  <Field
                    as="legend"
                    label={
                      <>
                        <strong>Kanal</strong>
                        <ChannelTooltip />
                      </>
                    }
                  />
                </Flex>
                <RadioGroup value={form.values.channel} onChange={form.handleChange("channel")}>
                  <Stack>
                    <Radio value="SmsPreferred">Foretrekk SMS</Radio>
                    <Radio value="EmailPreferred">Foretrekk e-post</Radio>
                  </Stack>
                </RadioGroup>
              </Field>

              {/* SMS */}
              <Grid>
                <Field invalid={isInvalid(form, "smsBody")}>
                  <Field label={<strong>Melding på SMS</strong>} />
                  <Field helperText="Velg en forhåndsdefinert melding." />
                  <NativeSelect
                    defaultValue={form.values.smsBody}
                    onChange={event => {
                      const key = (event.target as HTMLSelectElement).value
                      form.setFieldValue("smsBody", smsOptions[key])
                      setSmsVarselstype(key)
                    }}
                  >
                    <NativeSelectField placeholder="Velg SMS-mal">
                      <option value="førstegangsvarsling">Førstegangsvarsling</option>
                      <option value="revarsling">Re-varsling </option>
                    </NativeSelectField>
                  </NativeSelect>
                  {form.errors.smsBody && <Alert status="error" title={form.errors.smsBody} />}

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
              </Grid>

              {/* E-post */}
              <Grid gap={2}>
                <Field invalid={isInvalid(form, "emailBody")}>
                  <Field label={<strong>Melding på e-post</strong>} />
                  <NativeSelect
                    defaultValue={form.values.emailBody}
                    onChange={event => {
                      const key = (event.target as HTMLSelectElement).value
                      form.setFieldValue("emailBody", emailOptions[key].body)
                      form.setFieldValue("emailSubject", emailOptions[key].subject)
                      setEmailVarselstype(key)
                    }}
                  >
                    <NativeSelectField placeholder="Velg e-post-mal">
                      <option value="førstegangsvarsling">Førstegangsvarsling</option>
                      <option value="revarsling">Re-varsling</option>
                      <option value="informasjonsbrev_sandnes">Informasjonsbrev Sandnes</option>
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

              <RequestedSendTime />
            </Stack>

            <Button type="submit" w="max-content" loading={form.isSubmitting}>
              Send varsel
            </Button>

            <ConfirmDialog
              isOpen={isDialogOpen}
              closeDialog={onCloseDialog}
              smsVarselstype={smsVarselstype}
              emailVarselstype={emailVarselstype}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
