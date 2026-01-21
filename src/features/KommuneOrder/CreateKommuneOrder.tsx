import {
  Box,
  Button,
  Field,
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Flex,
  Input,
  InputGroup,
  NativeSelect,
  NativeSelectField,
  Text,
  Textarea,
  toaster,
} from "@kvib/react"
import { useMutation } from "@tanstack/react-query"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { informasjonsbrev_innhold, informasjonsbrev_tittel } from "../../utils/tekster"
import HtmlPreview from "../CreateOrder/components/Preview"
import { createKommuneOrder } from "./api/kommuneOrderApi"
import ForhåndsvisDigitalPost from "./ForhåndsvisDigitalPost"
import useKommuner from "./hooks/useKommuner"

type FormState = { status: "idle" | "success" | "error"; message?: string }

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Sender..." : "Send varslinger"}
    </Button>
  )
}

const CreateKommuneOrder = () => {
  const eFormidlingOptions: Record<string, { tittel: string; body: string }> = {
    førstegangsvarsling: {
      tittel: informasjonsbrev_tittel,
      body: informasjonsbrev_innhold,
    },
  }

  const { data: kommuner } = useKommuner()

  const [selectedEformidling, setSelectedEformidling] = useState<string>("")
  const [skipGardsnummer, setSkipGardsnummer] = useState<boolean>(false)
  const [kommunenummer, setKommunenummer] = useState<string>("")

  const { mutateAsync } = useMutation({
    mutationFn: createKommuneOrder,
    onSuccess: () => {
      toaster.create({ type: "success", title: "Opprettet ordre med kommunenummer" })
    },
    onError: () => {
      toaster.create({ type: "error", title: "Feil ved opprettelse av ordre med kommunenummer" })
    },
  })
  const [state, action] = useActionState<FormState, FormData>(
    async (_previousState: FormState, formData: FormData): Promise<FormState> => {
      const kommunenummer = formData.get("kommunenummer")?.toString().trim() ?? ""
      const ignoreGardsnummer = formData.get("ignoreGardsnummer")?.toString() === "on"
      const gardsnummerRaw = ignoreGardsnummer
        ? null
        : formData.get("gardsnummer")?.toString().trim()
      const smsMelding = formData.get("sms")?.toString().trim() ?? ""

      if (!kommunenummer) {
        return { status: "error", message: "Kommunenummer er påkrevd" }
      }

      if (!ignoreGardsnummer && !gardsnummerRaw) {
        return { status: "error", message: "Gårdsnummer er påkrevd" }
      }

      const gardsnummer = gardsnummerRaw ? Number(gardsnummerRaw) : null

      if (!ignoreGardsnummer && gardsnummerRaw && Number.isNaN(gardsnummer)) {
        return { status: "error", message: "Gårdsnummer må være et tall" }
      }

      try {
        const data = {
          kommunenr: kommunenummer,
          gardsnummer,
          smsmelding: smsMelding,
          dpimelding: eFormidlingOptions[selectedEformidling],
        }
        await mutateAsync(data)

        console.log("data", data)

        return { status: "success" }
      } catch (error) {
        console.error("Failed to create kommune order", error)
        return { status: "error", message: "Kunne ikke opprette ordre med kommunenummer" }
      }
    },
    { status: "idle" },
  )

  return (
    <Box maxW="900px" mx="auto" p={{ base: 4, md: 8 }}>
      <Text as="h1" fontSize="xl" fontWeight="semibold" mb={2}>
        Opprett varsling med kommunenummer
      </Text>
      <Text color="gray.600" fontSize="sm" mb={6}>
        Fyll ut informasjonen under for å sende varsler til innbyggere. Velg malverk for digital
        post og legg inn alternativ SMS-tekst.
      </Text>

      <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md" borderWidth="1px">
        <form action={action}>
          <Flex direction="column" gap={6}>
            <FieldRoot>
              <FieldLabel>Kommunenummer</FieldLabel>
              <InputGroup
                endElement={kommuner?.find(k => k.kommunenummer === kommunenummer)?.kommunenavn}
              >
                <Input
                  maxLength={4}
                  name="kommunenummer"
                  required
                  onChange={e => setKommunenummer(e.target.value)}
                />
              </InputGroup>
              {state?.status === "error" && state.message === "Kommunenummer er påkrevd" && (
                <FieldErrorText>{state.message}</FieldErrorText>
              )}

              <Text></Text>
            </FieldRoot>

            <FieldRoot>
              <FieldLabel>Gårdsnummer</FieldLabel>
              <Flex alignItems="center" gap={4} wrap="wrap">
                <Input
                  name="gardsnummer"
                  type="number"
                  disabled={skipGardsnummer}
                  required={!skipGardsnummer}
                />
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="ignoreGardsnummer"
                    checked={skipGardsnummer}
                    onChange={event => setSkipGardsnummer(event.target.checked)}
                    style={{ accentColor: "#16a34a", width: "16px", height: "16px" }}
                  />
                  <span>Ikke bruk gårdsnummer</span>
                </label>
              </Flex>
              {!skipGardsnummer &&
                state?.status === "error" &&
                (state.message === "Gårdsnummer må være et tall" ||
                  state.message === "Gårdsnummer er påkrevd") && (
                  <FieldErrorText>{state.message}</FieldErrorText>
                )}
            </FieldRoot>

            <FieldRoot>
              <FieldLabel>
                <Text fontWeight="medium" mb={1}>
                  SMS-varsling
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Systemet forsøker først digital post. Hvis oppslaget feiler sendes SMS i stedet.
                </Text>
              </FieldLabel>

              <Textarea required name="sms" minH="140px" />
            </FieldRoot>

            <FieldRoot invalid={state.status === "error"}>
              <Field label={<strong>Melding gjennom Digital postkasse</strong>} />
              <NativeSelect
                defaultValue=""
                onChange={event =>
                  setSelectedEformidling((event.target as HTMLSelectElement).value)
                }
              >
                <NativeSelectField placeholder="Velg malverk">
                  {Object.entries(eFormidlingOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.tittel}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelect>
            </FieldRoot>
            {selectedEformidling && (
              <Box bg="gray.50" borderRadius="md" borderWidth="1px" p={4}>
                <Flex alignItems="center" justifyContent="space-between" gap={4} mb={3}>
                  <Text as="b" fontSize="sm">
                    Emne: {eFormidlingOptions[selectedEformidling]?.tittel}
                  </Text>

                  <ForhåndsvisDigitalPost
                    tittel={"Emne: " + eFormidlingOptions[selectedEformidling]?.tittel}
                  >
                    <HtmlPreview
                      html={eFormidlingOptions[selectedEformidling]?.body ?? ""}
                      title="Forhåndsvisning av eFormidling"
                    />
                  </ForhåndsvisDigitalPost>
                </Flex>
              </Box>
            )}

            <Flex justifyContent="flex-end">
              <SubmitButton />
            </Flex>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}

export default CreateKommuneOrder
