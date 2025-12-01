import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  toaster,
} from "@kvib/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormikContext } from "formik"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CustomAlert } from "../../../components/Alert.tsx"
import { EformidlingRequestDTO } from "../../../types/types.ts"
import { getEnvironment } from "../../../utils/utils.ts"
import { fetchOrderQueryOptions } from "../../OrderDetails/api/getOrder.ts"
import { postOrderToEformidling } from "../api/postEformidling.ts"
import { postOrder } from "../api/postOrder.ts"
import { OrderConfirmation, OrderRequest } from "../api/types.ts"
import { FormValues } from "../formSchema.ts"
import { getRecipientList, mapFormValuesToOrderRequest } from "../utils.ts"

type ConfirmDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  smsVarselstype: string
  emailVarselstype: string
  eFormidlingVarselstype: string
}

export const ConfirmDialog = ({
  isOpen,
  closeDialog,
  smsVarselstype,
  emailVarselstype,
  eFormidlingVarselstype,
}: ConfirmDialogProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const { values, setSubmitting } = useFormikContext<FormValues>()

  const {
    mutate,
    isError,
    isPending,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (body: OrderRequest) => postOrder(body),
  })

  const {
    mutate: sendVarslingTilEformidling,
    isError: isEformidlingError,
    isPending: isEformidlingPending,
  } = useMutation({
    mutationFn: (body: EformidlingRequestDTO) => postOrderToEformidling(body),
  })

  const onClose = () => {
    resetMutation()
    closeDialog()
    setSubmitting(false)
  }

  const onConfirm = () => {
    const orderRequest = mapFormValuesToOrderRequest(values)

    if (values.channel === "eFormidling") {
      sendVarslingTilEformidling(
        {
          identifikatorer: orderRequest.nationalIdentityNumbers,
          tittel: values.eFormidlingTittel!,
          melding: values.eFormidlingMelding!,
        },
        {
          onSuccess: () => {
            toaster.create({
              title: "Sendt melding til eFormidling",
              description: "Meldingen ble sendt til eFormidling.",
              type: "success",
              duration: 3000,
            })
            closeDialog()
            setSubmitting(false)
          },
          onError: () => setSubmitting(false),
        },
      )
    } else {
      mutate(orderRequest, {
        onSuccess: (res: OrderConfirmation) => {
          // prefetch detail page data
          queryClient.prefetchQuery(fetchOrderQueryOptions(res.id))
          navigate(`/orders/${res.id}`)
          setSubmitting(false)
        },
        onError: () => setSubmitting(false),
      })
    }
  }

  return (
    <Dialog motionPreset="slide-in-bottom" onOpenChange={onClose} open={isOpen} placement="center">
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>Bekreft utsending</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          Du er nå i ferd med å sende ut et varsel til {getRecipientList(values.recipients).length}{" "}
          mottaker(e) i <strong>{getEnvironment()}</strong>.
          <List>
            <ListItem>Kanal: {values.channel}</ListItem>
            <ListItem>Varslingstype SMS: {smsVarselstype}</ListItem>
            <ListItem>Varslingstype e-post: {emailVarselstype}</ListItem>
            <ListItem>Varslingstype Digital postkasse: {eFormidlingVarselstype}</ListItem>
          </List>
          {(isError || isEformidlingError) && (
            <CustomAlert
              status="error"
              mt={3}
              title="OBS, noe gikk galt!"
              description="Noe gikk galt med kommunikasjonen mellom Kartverket sine
                    tjenester og Altinn. Vennligst prøv igjen senere."
            />
          )}
        </DialogBody>
        <DialogFooter gap={3}>
          <Button onClick={onConfirm} loading={isPending || isEformidlingPending}>
            Bekreft og send
          </Button>
          <Button ref={cancelRef} variant="secondary" onClick={onClose}>
            Gå tilbake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
