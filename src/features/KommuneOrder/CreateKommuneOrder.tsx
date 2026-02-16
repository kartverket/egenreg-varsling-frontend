/* eslint-disable no-restricted-imports */
import { Combobox, Heading, Portal, useFilter, useListCollection } from "@chakra-ui/react"
import {
  Box,
  Button,
  Field,
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Flex,
  NativeSelect,
  NativeSelectField,
  Text,
  toaster,
} from "@kvib/react"
import { useMutation } from "@tanstack/react-query"
import { useActionState, useEffect, useMemo, useState } from "react"
import { useFormStatus } from "react-dom"
import { informasjonsbrev_innhold, informasjonsbrev_tittel } from "../../utils/tekster"
import HtmlPreview from "../CreateOrder/components/Preview"
import SMSPreview from "../Previews/SMSPreview"
import { createKommuneOrder } from "./api/kommuneOrderApi"
import ForhåndsvisDigitalPost from "./ForhåndsvisDigitalPost"
import Gårdsnummmerserie from "./Gårdsnummerserie"
import useKommuner from "./hooks/useKommuner"

type FormState = {
  status: "idle" | "success" | "error"
  fieldErrors?: {
    kommunenummer?: string
    gardsnummer?: string
    dpimelding?: string
    sms?: string
  }
}

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

  const smsOptions: Record<string, string> = {
    førstegangsvarsling:
      "Hei! Vi kan ha mangelfulle opplysninger om din bolig eller fritidsbolig. Du kan enkelt se og registrere dem på våre nettsider. Hilsen Kartverket",
  }

  const [selectedSms, setSelectedSms] = useState("")

  const { data: kommuner } = useKommuner()

  const kommuneItems = useMemo<{ label: string; value: string }[]>(
    () =>
      (kommuner ?? []).map(kommune => ({
        label: `${kommune.kommunenavnNorsk || kommune.kommunenavn} (${kommune.kommunenummer})`,
        value: kommune.kommunenummer,
      })),
    [kommuner],
  )

  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter, set } = useListCollection<{ label: string; value: string }>({
    initialItems: [],
    filter: contains,
  })

  useEffect(() => {
    set(kommuneItems)
  }, [kommuneItems, set])

  const [selectedEformidling, setSelectedEformidling] = useState<string>("")
  const [skipGardsnummer, setSkipGardsnummer] = useState<boolean>(false)
  const [kommunenummer, setKommunenummer] = useState<string>("")
  const [kommuneSearch, setKommuneSearch] = useState<string>("")

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
    async (_, formData) => {
      const fieldErrors: FormState["fieldErrors"] = {}

      const kommunenummer = formData.get("kommunenummer")?.toString().trim() ?? ""
      const ignoreGardsnummer = formData.get("ignoreGardsnummer")?.toString() === "on"
      const gardsnummerStartRaw = ignoreGardsnummer ? null : formData.get("fra")?.toString().trim()
      const gardsnummerEndRaw = ignoreGardsnummer ? null : formData.get("til")?.toString().trim()

      const selectedSmsKey = formData.get("sms")?.toString().trim() ?? ""
      const selectedDpiKey = formData.get("dpimelding")?.toString().trim() ?? ""

      if (!kommunenummer) {
        fieldErrors.kommunenummer = "Kommunenummer er påkrevd"
      }

      if (!ignoreGardsnummer && (!gardsnummerStartRaw || !gardsnummerEndRaw)) {
        fieldErrors.gardsnummer = "Gårdsnummer fra og til er påkrevd"
      }

      const gardsnummerStart = gardsnummerStartRaw ? Number(gardsnummerStartRaw) : null
      const gardsnummerEnd = gardsnummerEndRaw ? Number(gardsnummerEndRaw) : null

      if (!ignoreGardsnummer && (Number.isNaN(gardsnummerStart) || Number.isNaN(gardsnummerEnd))) {
        fieldErrors.gardsnummer = "Gårdsnummer må være et tall"
      }

      if (!selectedDpiKey) {
        fieldErrors.dpimelding = "Digital post-mal må velges"
      }

      if (!selectedSmsKey) {
        fieldErrors.sms = "SMS-mal må velges"
      }

      if (Object.keys(fieldErrors).length > 0) {
        return { status: "error", fieldErrors }
      }

      if (
        !ignoreGardsnummer &&
        gardsnummerStart !== null &&
        gardsnummerEnd !== null &&
        (gardsnummerStart < 0 || gardsnummerEnd < 0)
      ) {
        return {
          status: "error",
          fieldErrors: { gardsnummer: "Gårdsnummer kan ikke være negativt" },
        }
      }

      if (
        !ignoreGardsnummer &&
        gardsnummerStart !== null &&
        gardsnummerEnd !== null &&
        gardsnummerStart > gardsnummerEnd
      ) {
        return {
          status: "error",
          fieldErrors: { gardsnummer: "Startnummer kan ikke være større enn sluttnummer" },
        }
      }

      try {
        await mutateAsync({
          kommunenr: kommunenummer,
          gardsnummer: ignoreGardsnummer ? null : { fra: gardsnummerStart!, til: gardsnummerEnd! },
          smsmelding: smsOptions[selectedSmsKey],
          dpimelding: eFormidlingOptions[selectedDpiKey],
        })

        return { status: "success" }
      } catch {
        return {
          status: "error",
          fieldErrors: {
            kommunenummer: "Kunne ikke opprette ordre",
          },
        }
      }
    },
    { status: "idle" },
  )

  return (
    <Box maxW="900px" mx="auto" p={{ base: 4, md: 8 }}>
      <Flex flexDir={"column"} gap={2} mb={4}>
        <Heading> Send varsler til innbyggere i ønsket kommune</Heading>
        <Text fontSize={"sm"}>
          Fyll ut informasjonen under for å sende varsler til innbyggere som eier i gitt kommune.
          Velg malverk for digital post og SMS.
        </Text>
      </Flex>
      <Box p={8} borderRadius="lg" boxShadow="md">
        <form action={action}>
          <Flex direction="column" gap={2}>
            <Flex direction="column" gap={4} my={6}>
              <FieldRoot invalid={!!state.fieldErrors?.kommunenummer}>
                <FieldLabel>Kommunenummer</FieldLabel>

                <Combobox.Root
                  collection={collection}
                  inputValue={kommuneSearch}
                  value={kommunenummer ? [kommunenummer] : []}
                  onInputValueChange={e => {
                    setKommuneSearch(e.inputValue)
                    filter(e.inputValue)
                  }}
                  onValueChange={details => {
                    const next = Array.isArray(details.value)
                      ? (details.value[0] ?? "")
                      : (details.value ?? "")
                    setKommunenummer(next)
                  }}
                >
                  <Combobox.Control>
                    <Combobox.Input placeholder="Søk etter kommune" />
                    <Combobox.Trigger />
                  </Combobox.Control>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content>
                        {collection.items.map(item => (
                          <Combobox.Item key={item.value} item={item}>
                            {item.label}
                          </Combobox.Item>
                        ))}
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>

                <input type="hidden" name="kommunenummer" value={kommunenummer} />
                {state.fieldErrors?.kommunenummer && (
                  <FieldErrorText>{state.fieldErrors.kommunenummer}</FieldErrorText>
                )}
              </FieldRoot>

              <FieldRoot invalid={!!state.fieldErrors?.gardsnummer}>
                <FieldLabel>Gårdsnummer</FieldLabel>
                <Gårdsnummmerserie skipGardsnummer={skipGardsnummer} />
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="ignoreGardsnummer"
                    checked={skipGardsnummer}
                    onChange={event => setSkipGardsnummer(event.target.checked)}
                    style={{ accentColor: "#16a34a", width: "16px", height: "16px" }}
                  />
                  Ikke bruk gårdsnummer
                </label>
                {state.fieldErrors?.gardsnummer && (
                  <FieldErrorText>{state.fieldErrors.gardsnummer}</FieldErrorText>
                )}
              </FieldRoot>
            </Flex>
            <Flex direction="column" gap={4} my={6}>
              <FieldRoot invalid={!!state.fieldErrors?.dpimelding}>
                <Field label={<strong>Melding gjennom Digital postkasse</strong>} />
                <NativeSelect>
                  <NativeSelectField
                    name="dpimelding"
                    value={selectedEformidling}
                    onChange={e => setSelectedEformidling(e.target.value)}
                  >
                    <option value="">Velg eFormidling-mal</option>
                    {Object.entries(eFormidlingOptions).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.tittel}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelect>
                {state.fieldErrors?.dpimelding && (
                  <FieldErrorText>{state.fieldErrors.dpimelding}</FieldErrorText>
                )}
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

              <FieldRoot invalid={!!state.fieldErrors?.sms}>
                <Field label={<strong>SMS-varsling</strong>} />
                <NativeSelect>
                  <NativeSelectField
                    name="sms"
                    value={selectedSms}
                    onChange={e => setSelectedSms(e.target.value)}
                  >
                    <option value="">Velg SMS-mal</option>
                    {Object.entries(smsOptions).map(([key]) => (
                      <option key={key} value={key}>
                        Førstegangsvarsling
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelect>
                {state.fieldErrors?.sms && <FieldErrorText>{state.fieldErrors.sms}</FieldErrorText>}
              </FieldRoot>

              {smsOptions[selectedSms] && <SMSPreview smsText={smsOptions[selectedSms]} />}
            </Flex>
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
