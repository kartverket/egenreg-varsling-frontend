import { Center } from "@kvib/react";
import { useRouteError } from "react-router-dom";
import { CustomAlert } from "./Alert.tsx";

export const ErrorElement = () => {
  const error = useRouteError();

  return (
    <Center>
      <CustomAlert
        maxW="container.md"
        status="error"
        title="Oi.. Noe har gått galt"
        description={`Tjenesten svarte med: "${error}". Prøv å laste inn siden på nytt eller ta kontakt med eierne av tjenesten dersom problemet vedvarer.`}
      />
    </Center>
  );
};
