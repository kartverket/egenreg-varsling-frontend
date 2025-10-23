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
} from "@kvib/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormikContext } from "formik"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CustomAlert } from "../../../components/Alert.tsx"
import { fetchOrderQueryOptions } from "../../OrderDetails/api/getOrder.ts"
import { postOrder } from "../api/postOrder.ts"
import { OrderConfirmation, OrderRequest } from "../api/types.ts"
import { FormValues } from "../formSchema.ts"
import { getRecipientList, mapFormValuesToOrderRequest } from "../utils.ts"
import { getEnvironment } from "../../../utils/utils.ts"

type ConfirmDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  smsVarselstype: string
  emailVarselstype: string
}

export const ConfirmDialog = ({
  isOpen,
  closeDialog,
  smsVarselstype,
  emailVarselstype,
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

  const onClose = () => {
    resetMutation()
    closeDialog()
    setSubmitting(false)
  }

  const onConfirm = () => {
    const orderRequest = mapFormValuesToOrderRequest(values)
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
          </List>
          {isError && (
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
          <Button onClick={onConfirm} loading={isPending}>
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
