import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  useDisclosure,
} from "@kvib/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { CustomAlert } from "../../../components/Alert";
import { cancelOrder } from "../api/cancelOrder";
import { OrderResponse } from "../api/types";

type CancelOrderProps = {
  order: OrderResponse;
};

export const CancelOrder = ({ order }: CancelOrderProps) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleCancelOrder = () => {
    mutate(order.id, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["order", order.id] }),
    });
  };

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Bekreft kansellering
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
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
            </AlertDialogBody>

            <AlertDialogFooter>
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
                <Button
                  colorScheme="red"
                  isLoading={isPending}
                  onClick={handleCancelOrder}
                >
                  Bekreft kansellering
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
