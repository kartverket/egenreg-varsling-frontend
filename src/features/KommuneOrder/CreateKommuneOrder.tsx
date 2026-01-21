// eslint-disable-next-line no-restricted-imports
import { Combobox, Portal, useFilter, useListCollection } from "@chakra-ui/react"
import {
  Box,
  Button,
  Field,
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Flex,
  Input,
  NativeSelect,
  NativeSelectField,
  Text,
  Textarea,
  toaster,
} from "@kvib/react"
import { useMutation } from "@tanstack/react-query"
import { useActionState, useEffect, useMemo, useState } from "react"
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

  const kommuneItems = useMemo(
    () =>
      (kommuner ?? []).map(kommune => ({
        label: `${kommune.kommunenavnNorsk || kommune.kommunenavn} (${kommune.kommunenummer})`,
        value: kommune.kommunenummer,
      })),
    [kommuner],
  )

  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({ initialItems: kommuneItems, filter: contains })

  const [selectedEformidling, setSelectedEformidling] = useState<string>("")
  const [skipGardsnummer, setSkipGardsnummer] = useState<boolean>(false)
  const [kommunenummer, setKommunenummer] = useState<string>("")
  const [kommuneSearch, setKommuneSearch] = useState<string>("")

  const selectedKommuneLabel = useMemo(
    () => kommuneItems.find(item => item.value === kommunenummer)?.label ?? "",
    [kommuneItems, kommunenummer],
  )

  useEffect(() => {
    filter(kommuneSearch)
  }, [filter, kommuneItems, kommuneSearch])

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
              <Combobox.Root
                collection={collection}
                inputValue={kommuneSearch}
                value={kommunenummer ? [kommunenummer] : []}
                onInputValueChange={event => {
                  setKommuneSearch(event.inputValue)
                  filter(event.inputValue)
                }}
                onValueChange={details => {
                  const nextValue = Array.isArray(details.value)
                    ? (details.value[0] ?? "")
                    : ((details.value as string) ?? "")
                  setKommunenummer(nextValue)
                  const matched = kommuneItems.find(item => item.value === nextValue)
                  if (matched) {
                    setKommuneSearch(matched.label)
                  }
                }}
                width="100%"
              >
                <Combobox.Control>
                  <Combobox.Input placeholder={selectedKommuneLabel || "Søk etter kommune"} />
                  <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger
                      onClick={() => {
                        setKommuneSearch("")
                        setKommunenummer("")
                        filter("")
                      }}
                    />
                    <Combobox.Trigger />
                  </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Portal>
                  <Combobox.Positioner>
                    <Combobox.Content>
                      <Combobox.Empty>Fant ingen kommuner</Combobox.Empty>
                      {(kommuneItems.length ? collection.items : []).map(item => (
                        <Combobox.Item
                          key={item.value}
                          item={item}
                          onClick={() => {
                            setKommunenummer(item.value)
                            setKommuneSearch(item.label)
                          }}
                        >
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Portal>
              </Combobox.Root>

              <input type="hidden" name="kommunenummer" value={kommunenummer} />

              {state?.status === "error" && state.message === "Kommunenummer er påkrevd" && (
                <FieldErrorText>{state.message}</FieldErrorText>
              )}
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
