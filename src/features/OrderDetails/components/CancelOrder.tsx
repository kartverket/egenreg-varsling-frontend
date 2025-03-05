import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
  useDisclosure,
} from "@kvib/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { CustomAlert } from "../../../components/Alert"
import { cancelOrder } from "../api/cancelOrder"

type CancelOrderProps = {
  orderID: string
}

export const CancelOrder = ({ orderID }: CancelOrderProps) => {
  const queryClient = useQueryClient()
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
  })

  const { open, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleCancelOrder = () => {
    mutate(orderID, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["order", orderID] }),
    })
  }

  return (
    <>
      <Button
        leftIcon="cancel"
        variant="secondary"
        colorScheme="red"
        maxW="max-content"
        onClick={onOpen}
      >
        Kanseller ordren
      </Button>
      <Dialog open={open} onOpenChange={onClose} placement="center">
        <DialogBackdrop>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              Bekreft kansellering
            </DialogHeader>
            <DialogCloseTrigger />

            <DialogBody>
              Du er nå i ferd med å kansellere ordren.
              {isError && (
                <CustomAlert
                  status="error"
                  marginTop="5"
                  title="OBS, noe gikk galt!"
                  description="Noe gikk galt med kommunikasjonen mellom Kartverket sine
                    tjenester og Altinn. Vennligst prøv igjen senere."
                />
              )}
            </DialogBody>

            <DialogFooter>
              <Flex gap={2}>
                <Button
                  variant="secondary"
                  ref={cancelRef}
                  onClick={onClose}
                  colorScheme="red"
                  ml={3}
                >
                  Avbryt
                </Button>
                <Button colorScheme="red" loading={isPending} onClick={handleCancelOrder}>
                  Bekreft kansellering
                </Button>
              </Flex>
            </DialogFooter>
          </DialogContent>
        </DialogBackdrop>
      </Dialog>
    </>
  )
}
